// src/pages/admin/components/WithdrawalRequestsPanel.tsx
// Admin view of clinician withdrawal requests — approve or reject.
// API: GET /api/v1/Admin/withdrawal-requests, POST /api/v1/Admin/withdrawal-action

import React, { useState, useEffect } from 'react'
import adminService from '../../../services/AdminService'
import LoadingSpinner from '../../../components/LoadingSpinner'
import EmptyState from '../../../components/EmptyState'
import type { WithdrawalRequestDto } from '../../../types'

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const fmtAmount = (n: number) =>
  `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const STATUS_COLOR: Record<string, string> = {
  Pending:     'var(--warning)',
  Transferred: 'var(--success)',
  Rejected:    'var(--danger)',
}

const WithdrawalRequestsPanel: React.FC = () => {
  const [requests,      setRequests]      = useState<WithdrawalRequestDto[]>([])
  const [isLoading,     setIsLoading]     = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [notes,         setNotes]         = useState<Record<string, string>>({})
  const [messages,      setMessages]      = useState<Record<string, { text: string; ok: boolean }>>({})
  const [showAll,       setShowAll]       = useState(false)

  const load = () => {
    setIsLoading(true)
    adminService.getWithdrawalRequests(!showAll)
      .then(r  => { setRequests(r); setIsLoading(false) })
      .catch(() => setIsLoading(false))
  }

  useEffect(() => { load() }, [showAll])

  const handleAction = async (req: WithdrawalRequestDto, approve: boolean) => {
    setActionLoading(req.withdrawalId)
    try {
      await adminService.processWithdrawalAction(req.withdrawalId, approve, notes[req.withdrawalId])
      setMessages(m => ({
        ...m,
        [req.withdrawalId]: {
          text: approve
            ? `✅ Withdrawal of ${fmtAmount(req.amount)} approved and marked as transferred.`
            : `❌ Withdrawal rejected. Funds returned to clinician wallet.`,
          ok: approve,
        },
      }))
      setTimeout(load, 1800)
    } catch (err) {
      setMessages(m => ({
        ...m,
        [req.withdrawalId]: {
          text: err instanceof Error ? err.message : 'Action failed.',
          ok: false,
        },
      }))
    } finally {
      setActionLoading(null) }
  }

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
      <LoadingSpinner />
    </div>
  )

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>
            Withdrawal Requests
          </h3>
          <p style={{ color: 'var(--n-400)', fontSize: 13 }}>
            Review and approve clinician payout requests.
          </p>
        </div>
        <button
          className="btn btn-ghost"
          style={{ fontSize: 11, padding: '9px 20px' }}
          onClick={() => setShowAll(v => !v)}
        >
          {showAll ? 'Show Pending Only' : 'Show All'}
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="card" style={{ padding: '48px 32px', textAlign: 'center' }}>
          <EmptyState
            icon="💸"
            title="No withdrawal requests"
            subtitle={showAll ? 'No requests found.' : 'No pending withdrawal requests at this time.'}
          />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {requests.map(req => {
            const isBusy  = actionLoading === req.withdrawalId
            const msg     = messages[req.withdrawalId]
            const isPending = req.status === 'Pending' && !msg

            return (
              <div
                key={req.withdrawalId}
                className="card"
                style={{
                  padding: '28px 32px',
                  opacity: !isPending && !msg ? 0.6 : 1,
                  transition: 'opacity 0.3s',
                }}
              >
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                  {/* Avatar */}
                  <div style={{
                    flexShrink: 0, width: 48, height: 48, borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(57,120,106,0.15), rgba(57,120,106,0.05))',
                    border: '2px solid rgba(57,120,106,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 15, color: 'var(--forest)',
                  }}>
                    {req.clinicianName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontWeight: 800, fontSize: 15 }}>{req.clinicianName}</span>
                      <span style={{
                        padding: '3px 10px', borderRadius: 'var(--r-full)',
                        background: `${STATUS_COLOR[req.status] ?? 'var(--n-200)'}18`,
                        color: STATUS_COLOR[req.status] ?? 'var(--n-500)',
                        fontSize: 10, fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                      }}>
                        {req.status}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: 32, marginBottom: 14, flexWrap: 'wrap' }}>
                      <div>
                        <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--n-400)', marginBottom: 2 }}>Amount</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--charcoal)', lineHeight: 1 }}>
                          {fmtAmount(req.amount)}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--n-400)', marginBottom: 4 }}>Payout Method</p>
                        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--charcoal)' }}>{req.payoutMethod}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--n-400)', marginBottom: 4 }}>Payout Details</p>
                        <p style={{ fontSize: 13, color: 'var(--n-500)', fontFamily: 'monospace' }}>{req.payoutDetails}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--n-400)', marginBottom: 4 }}>Requested</p>
                        <p style={{ fontSize: 13, color: 'var(--n-500)' }}>{fmtDate(req.createdTime)}</p>
                      </div>
                    </div>

                    {req.adminNotes && (
                      <p style={{ fontSize: 12, color: 'var(--n-400)', fontStyle: 'italic', marginBottom: 14 }}>
                        Admin note: {req.adminNotes}
                      </p>
                    )}

                    {/* Action area */}
                    {msg ? (
                      <p style={{ fontSize: 13, fontWeight: 600, color: msg.ok ? 'var(--success)' : 'var(--danger)' }}>
                        {msg.text}
                      </p>
                    ) : isPending ? (
                      <div>
                        <input
                          style={{
                            width: '100%', maxWidth: 420,
                            padding: '10px 14px', marginBottom: 14,
                            border: '1.5px solid var(--n-200)', borderRadius: 'var(--r-sm)',
                            fontFamily: 'var(--font-sans)', fontSize: 13,
                            color: 'var(--charcoal)', background: 'var(--white)',
                            outline: 'none',
                          }}
                          placeholder="Admin notes (optional)…"
                          value={notes[req.withdrawalId] ?? ''}
                          onChange={e => setNotes(n => ({ ...n, [req.withdrawalId]: e.target.value }))}
                        />
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button
                            className="btn btn-primary"
                            style={{ padding: '10px 24px', fontSize: 11, minWidth: 120 }}
                            onClick={() => handleAction(req, true)}
                            disabled={isBusy}
                          >
                            {isBusy ? <LoadingSpinner size={14} /> : 'Approve Transfer'}
                          </button>
                          <button
                            className="btn btn-ghost"
                            style={{ padding: '10px 24px', fontSize: 11, minWidth: 120, color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.3)' }}
                            onClick={() => handleAction(req, false)}
                            disabled={isBusy}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default WithdrawalRequestsPanel