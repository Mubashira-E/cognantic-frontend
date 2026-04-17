import React, { useState, useEffect } from 'react'
import sessionService  from '../../../services/SessionService'
import type {EarningsSummary } from '../../../types'
import walletService from '../../../services/WalletService'
import LoadingSpinner from '../../../components/LoadingSpinner'

interface Props { clinicianId: string }

const EarningsView: React.FC<Props> = ({ clinicianId }) => {
  const [earnings,        setEarnings]        = useState<EarningsSummary | null>(null)
  const [isLoading,       setIsLoading]       = useState(true)
  const [showWithdraw,    setShowWithdraw]    = useState(false)
  const [withdrawAmount,  setWithdrawAmount]  = useState('')
  const [payoutMethod,    setPayoutMethod]    = useState('UPI')
  const [payoutDetails,   setPayoutDetails]   = useState('')
  const [withdrawing,     setWithdrawing]     = useState(false)
  const [withdrawError,   setWithdrawError]   = useState<string | null>(null)
  const [withdrawSuccess, setWithdrawSuccess] = useState(false)

  useEffect(() => {
    if (!clinicianId) { setIsLoading(false); return }
    sessionService.getEarnings(clinicianId)
      .then(e => { setEarnings(e); setIsLoading(false) })
      .catch(() => setIsLoading(false))
  }, [clinicianId])

  const handleWithdraw = async () => {
    if (!withdrawAmount || !payoutDetails || !clinicianId) return
    const amount = Number(withdrawAmount)
    if (amount <= 0) { setWithdrawError('Amount must be greater than zero.'); return }
    if ((earnings?.available ?? 0) < amount) {
      setWithdrawError(`Insufficient available balance (₹${earnings?.available?.toFixed(2) ?? 0}).`); return
    }
    setWithdrawing(true); setWithdrawError(null)
    try {
      await walletService.requestWithdrawal({ clinicianId, amount, payoutMethod, payoutDetails })
      setWithdrawSuccess(true); setShowWithdraw(false)
      setWithdrawAmount(''); setPayoutDetails('')
      sessionService.getEarnings(clinicianId).then(setEarnings).catch(() => {})
    } catch (err) {
      setWithdrawError(err instanceof Error ? err.message : 'Withdrawal request failed.')
    } finally { setWithdrawing(false) }
  }

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><LoadingSpinner /></div>

  const grossEarned = earnings?.balance ?? 0
  const platformFee = Math.round(grossEarned * 0.1)
  const netPayout   = grossEarned - platformFee

  return (
    // earnings-grid collapses to 1-col on tablet/mobile via global.css
    <div className="animate-fade-up earnings-grid">

      {/* This Month Breakdown */}
      <div className="card" style={{ padding: '36px' }}>
        <h4 style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', marginBottom: 28 }}>This Month</h4>
        {withdrawSuccess && (
          <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>
            ✅ Withdrawal request submitted successfully.
          </div>
        )}
        {[
          { label: 'Gross Earned',  value: `₹${grossEarned.toFixed(2)}`,  color: 'var(--charcoal)' },
          { label: 'Platform Fee',  value: `−₹${platformFee.toFixed(2)}`, color: 'var(--danger)'   },
          { label: 'Net Payout',    value: `₹${netPayout.toFixed(2)}`,    color: 'var(--forest)'   },
          { label: 'In Escrow',     value: `₹${(earnings?.escrowBalance ?? 0).toFixed(2)}`, color: 'var(--warning)' },
          { label: 'Available Now', value: `₹${(earnings?.available ?? 0).toFixed(2)}`,     color: 'var(--success)' },
        ].map(r => (
          <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--n-100)' }}>
            <span style={{ fontSize: 13, color: 'var(--n-500)' }}>{r.label}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: r.color, fontWeight: 800 }}>{r.value}</span>
          </div>
        ))}

        <button
          className="btn btn-forest btn-full"
          style={{ marginTop: 28, borderRadius: 18 }}
          onClick={() => setShowWithdraw(v => !v)}
        >
          {showWithdraw ? 'Cancel' : 'Request Withdrawal'}
        </button>

        {showWithdraw && (
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {withdrawError && (
              <p style={{ fontSize: 13, color: 'var(--danger)', fontWeight: 600 }}>{withdrawError}</p>
            )}
            <div className="form-group">
              <label className="label">Amount (₹)</label>
              <input className="input" type="number" min="0" placeholder="e.g. 5000"
                value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="label">Payout Method</label>
              <select className="input" value={payoutMethod} onChange={e => setPayoutMethod(e.target.value)}>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>
            <div className="form-group">
              <label className="label">Payout Details</label>
              <input className="input" placeholder="UPI ID / Account number"
                value={payoutDetails} onChange={e => setPayoutDetails(e.target.value)} />
            </div>
            <button className="btn btn-primary btn-full" style={{ borderRadius: 18 }}
              onClick={handleWithdraw} disabled={withdrawing}>
              {withdrawing ? 'Submitting…' : 'Submit Request'}
            </button>
          </div>
        )}
      </div>

      {/* Transaction History */}
      <div className="card" style={{ padding: '36px' }}>
        <h4 style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', marginBottom: 28 }}>Transaction History</h4>
        {!earnings || earnings.transactions.length === 0 ? (
          <p style={{ color: 'var(--n-400)', fontSize: 13 }}>No transactions yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {earnings.transactions.slice(0, 10).map(t => (
              <div key={t.transactionId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--n-50)', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {t.description ?? t.transactionType}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--n-400)' }}>
                    {new Date(t.createdTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, flexShrink: 0,
                  color: t.amount >= 0 ? 'var(--success)' : 'var(--danger)',
                }}>
                  {t.amount >= 0 ? '+' : ''}₹{Math.abs(t.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EarningsView