import React, { useState } from 'react'
import type { PendingMatchDto } from '../../../types'

interface Props {
  pendingMatches: PendingMatchDto[]
  isLoading:      boolean
}

const PatientList: React.FC<Props> = ({ pendingMatches, isLoading }) => {
  const [accepted, setAccepted] = useState<string[]>([])
  const [declined, setDeclined] = useState<string[]>([])

  if (isLoading) return (
    <div style={{ textAlign: 'center', padding: 40, color: 'var(--n-400)' }}>Loading requests…</div>
  )

  if (pendingMatches.length === 0) return (
    <div className="card" style={{ padding: '48px 32px', textAlign: 'center' }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
      <h4 style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>All clear</h4>
      <p style={{ color: 'var(--n-400)', fontSize: 13 }}>No pending patient requests right now.</p>
    </div>
  )

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>New Patient Requests</h3>
        <p style={{ color: 'var(--n-400)', fontSize: 13 }}>Review patient narratives and accept or decline matches.</p>
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Narrative</th>
              <th>Match</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingMatches.map(m => {
              const isAcc = accepted.includes(m.matchId)
              const isDec = declined.includes(m.matchId)
              return (
                <tr key={m.matchId} style={{ opacity: isAcc || isDec ? 0.45 : 1 }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(57,120,106,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, color: 'var(--forest)' }}>
                        {m.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{m.patientName}</div>
                        <div style={{ fontSize: 11, color: 'var(--n-400)' }}>{m.requestedSlot}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ maxWidth: 360 }}>
                    <p style={{ fontSize: 12, color: 'var(--n-500)', fontStyle: 'italic', lineHeight: 1.6 }}>
                      "{m.patientNarrativeSnippet}"
                    </p>
                    {m.matchReason && <p style={{ fontSize: 11, color: 'var(--n-400)', marginTop: 4 }}>Reason: {m.matchReason}</p>}
                  </td>
                  <td>
                    {/* matchScore is 0.0–1.0 from backend */}
                    <span className="badge badge-live" style={{ fontSize: 11 }}>
                      {Math.round(m.matchScore * 100)}% Match
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {isAcc ? (
                      <span className="badge badge-live" style={{ padding: '8px 14px' }}>✓ Accepted</span>
                    ) : isDec ? (
                      <span className="badge badge-red" style={{ padding: '8px 14px' }}>✕ Declined</span>
                    ) : (
                      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                        <button className="btn btn-outline btn-sm" onClick={() => setDeclined(p => [...p, m.matchId])}>Decline</button>
                        <button className="btn btn-forest btn-sm" onClick={() => setAccepted(p => [...p, m.matchId])}>Accept</button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PatientList
