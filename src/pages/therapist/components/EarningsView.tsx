
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
    // GET /api/v1/Sessions/earnings/{clinicianId}
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
      // POST /api/v1/Wallet/withdraw  { clinicianId, amount, payoutMethod, payoutDetails }
      await walletService.requestWithdrawal({ clinicianId, amount, payoutMethod, payoutDetails })
      setWithdrawSuccess(true); setShowWithdraw(false)
      setWithdrawAmount(''); setPayoutDetails('')
      // Refresh earnings balance
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
    <div className="animate-fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

      {/* This Month Breakdown */}
      <div className="card" style={{ padding: '36px' }}>
        <h4 style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', marginBottom: 28 }}>This Month</h4>
        {withdrawSuccess && (
          <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>
            ✓ Withdrawal request submitted. Admin will process within 2–3 business days.
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { label: 'Gross Earnings',     value: `₹${grossEarned.toFixed(2)}`, color: 'var(--forest)'  },
            { label: 'Platform Fee (10%)', value: `−₹${platformFee.toFixed(2)}`, color: 'var(--danger)'  },
            { label: 'Net Payout',         value: `₹${netPayout.toFixed(2)}`,   color: 'var(--charcoal)'},
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--n-100)' }}>
              <span style={{ fontSize: 13, color: 'var(--n-500)', fontWeight: 500 }}>{r.label}</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: r.color }}>{r.value}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <button className="btn btn-forest btn-full" onClick={() => { setShowWithdraw(!showWithdraw); setWithdrawError(null) }}>
            💸 Request Payout
          </button>
        </div>

        {showWithdraw && (
          <div style={{ marginTop: 20, padding: 20, background: 'var(--n-50)', borderRadius: 16, border: '1px solid var(--n-100)' }}>
            <h4 style={{ fontWeight: 800, marginBottom: 16, fontSize: 15 }}>Request Withdrawal</h4>
            {withdrawError && (
              <div style={{ background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 10, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#dc2626' }}>
                {withdrawError}
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <label className="label">Amount (₹)</label>
                <input className="input" type="number" min="1" placeholder="Amount"
                  value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} />
              </div>
              <div>
                <label className="label">Method</label>
                <select className="input" value={payoutMethod} onChange={e => setPayoutMethod(e.target.value)}>
                  <option value="UPI">UPI</option>
                  <option value="BankTransfer">Bank Transfer</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label className="label">UPI ID / Account Number</label>
              <input className="input" placeholder="yourname@upi" value={payoutDetails} onChange={e => setPayoutDetails(e.target.value)} />
            </div>
            <button className="btn btn-forest btn-full"
              disabled={withdrawing || !withdrawAmount || !payoutDetails}
              onClick={handleWithdraw}>
              {withdrawing ? 'Submitting…' : 'Submit Request'}
            </button>
          </div>
        )}
      </div>

      {/* Payout status card */}
      <div className="card card-dark" style={{ padding: '36px' }}>
        <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.35, marginBottom: 20 }}>Payout Status</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: 'white', lineHeight: 1, marginBottom: 8 }}>
          ₹{netPayout.toFixed(0)}
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 32 }}>
          Processing · Next Friday
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { l: 'Sessions',    v: String(earnings?.transactions?.length ?? 0)  },
            { l: 'Avg/Session', v: '₹150' },
            { l: 'Completion',  v: '96%'  },
            { l: 'Rating',      v: '4.9/5'},
          ].map(k => (
            <div key={k.l} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.06)', borderRadius: 16 }}>
              <div style={{ fontSize: 9, opacity: 0.4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>{k.l}</div>
              <div style={{ fontWeight: 800, fontSize: 18, color: 'white' }}>{k.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Session Wallet Ledger — real credit transactions from GET /Sessions/earnings */}
      <div className="card" style={{ padding: '32px 36px', gridColumn: '1 / -1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h4 style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em', marginBottom: 4 }}>Session Wallet</h4>
            <p style={{ fontSize: 12, color: 'var(--n-400)' }}>Live ledger · session payouts credited after completion · 10% platform fee</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--n-400)', marginBottom: 4 }}>Available Payout</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: (earnings?.available ?? 0) > 0 ? 'var(--forest)' : 'var(--n-400)', lineHeight: 1 }}>
              ₹{earnings?.available?.toFixed(0) ?? '0'}
            </div>
          </div>
        </div>

        {!earnings?.transactions || earnings.transactions.length === 0 ? (
          <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--n-400)', fontSize: 13 }}>No sessions yet — ledger is empty.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--n-100)', paddingTop: 16 }}>
            {earnings.transactions.map((t, i) => (
              <div key={t.transactionId ?? i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--n-50)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>↑</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 1 }}>{t.description ?? t.transactionType}</div>
                    {t.createdTime && <div style={{ fontSize: 11, color: 'var(--n-400)' }}>{new Date(t.createdTime).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</div>}
                  </div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--success)' }}>+₹{t.amount.toFixed(2)}</div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 0', marginTop: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--n-600)' }}>Total Earned</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--forest)' }}>₹{earnings.balance.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => alert('Payout history export coming in Phase 2.')}>
            Export Ledger
          </button>
          <button className="btn btn-forest" style={{ flex: 2, borderRadius: 18 }}
            onClick={() => alert('Auto-settlement is active. Earnings are processed every Friday.')}>
            💳 Auto-Settlement: Active
          </button>
        </div>
      </div>
    </div>
  )
}

export default EarningsView
