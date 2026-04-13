import React, { useState, useEffect } from 'react'
import clinicianService from '../../../services/ClinicianService'
import LoadingSpinner from '../../../components/LoadingSpinner'
import EmptyState from '../../../components/EmptyState'
import type { ClinicianPatientRequest } from '../../../types'

interface Props {
  clinicianId: string
}

const ClinicianPatientRequests: React.FC<Props> = ({ clinicianId }) => {
  const [requests,      setRequests]      = useState<ClinicianPatientRequest[]>([])
  const [isLoading,     setIsLoading]     = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [messages,      setMessages]      = useState<Record<string, string>>({})

  const load = () => {
    setIsLoading(true)
    clinicianService.getPatientRequests(clinicianId)
      .then(r  => { setRequests(r); setIsLoading(false) })
      .catch(() => setIsLoading(false))
  }

  useEffect(() => { if (clinicianId) load() }, [clinicianId])

  const handleAction = async (req: ClinicianPatientRequest, action: 'accept' | 'decline') => {
    setActionLoading(req.requestId)
    try {
      await clinicianService.handlePatientRequest(req.requestId, action)
      setMessages(m => ({
        ...m,
        [req.requestId]: action === 'accept'
          ? '✅ Patient accepted successfully.'
          : '↩️ Declined — returned to Admin for reassignment.',
      }))
      // refresh after short delay
      setTimeout(load, 1800)
    } catch (err) {
      setMessages(m => ({
        ...m,
        [req.requestId]: err instanceof Error ? err.message : 'Action failed.',
      }))
    } finally {
      setActionLoading(null)
    }
  }

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
      <LoadingSpinner />
    </div>
  )

  const pending = requests.filter(r => r.status === 'Pending')

  if (pending.length === 0) return (
    <div className="card animate-fade-up" style={{ padding: '48px 32px', textAlign: 'center' }}>
      <EmptyState
        icon="✅"
        title="No pending requests"
        subtitle="You'll be notified when new patient requests arrive."
      />
    </div>
  )

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>
          Patient Requests
        </h3>
        <p style={{ color: 'var(--n-400)', fontSize: 13 }}>
          Review and respond to new patient assignments. Declined requests are sent back to admin.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {pending.map(req => {
          const isBusy    = actionLoading === req.requestId
          const msgText   = messages[req.requestId]
          const isAccepted = req.status === 'Accepted'
          const isDeclined = req.status === 'Declined'

          return (
            <div
              key={req.requestId}
              className="card"
              style={{
                padding: '28px 32px',
                opacity: isAccepted || isDeclined ? 0.55 : 1,
                transition: 'opacity 0.3s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                {/* Avatar */}
                <div style={{
                  flexShrink: 0, width: 52, height: 52,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(57,120,106,0.15), rgba(57,120,106,0.05))',
                  border: '2px solid rgba(57,120,106,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 16, color: 'var(--forest)',
                }}>
                  {req.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--charcoal)' }}>
                      {req.patientName}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--n-400)' }}>{req.patientEmail}</span>
                    <span style={{
                      padding: '3px 10px', borderRadius: 'var(--r-full)',
                      background: 'rgba(57,120,106,0.08)',
                      color: 'var(--forest)', fontSize: 10, fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>
                      Pending
                    </span>
                  </div>

                  <p style={{
                    fontSize: 13, color: 'var(--n-500)', fontStyle: 'italic',
                    lineHeight: 1.65, marginBottom: 16,
                    borderLeft: '2px solid var(--sage)', paddingLeft: 14,
                  }}>
                    "{req.narrative}"
                  </p>

                  <div style={{
                    fontSize: 11, color: 'var(--n-300)',
                    textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20,
                  }}>
                    Received {new Date(req.requestedAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })}
                  </div>

                  {msgText ? (
                    <div style={{
                      fontSize: 13, color: msgText.startsWith('✅') ? 'var(--success)' : 'var(--n-500)',
                      fontWeight: 600,
                    }}>
                      {msgText}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button
                        className="btn btn-primary"
                        style={{ padding: '10px 24px', fontSize: 11, minWidth: 120 }}
                        onClick={() => handleAction(req, 'accept')}
                        disabled={isBusy}
                      >
                        {isBusy ? <LoadingSpinner size={14} /> : 'Accept'}
                      </button>
                      <button
                        className="btn btn-ghost"
                        style={{ padding: '10px 24px', fontSize: 11, minWidth: 120 }}
                        onClick={() => handleAction(req, 'decline')}
                        disabled={isBusy}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ClinicianPatientRequests