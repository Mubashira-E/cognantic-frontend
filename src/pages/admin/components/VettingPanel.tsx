// src/pages/admin/components/VettingPanel.tsx
// Clinician vetting queue — approve / reject onboarding applications.
// Extracted from AdminPage for component-based architecture.

import React from 'react'
import LoadingSpinner from '../../../components/LoadingSpinner'
import EmptyState from '../../../components/EmptyState'
import type { VettingItem } from '../../../types'

interface Props {
  vettingList:   VettingItem[]
  isLoading:     boolean
  actionLoading: string | null
  onAction:      (item: VettingItem, approve: boolean) => void
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const statusColor: Record<string, string> = {
  Pending:  'var(--warning)',
  Approved: 'var(--success)',
  Rejected: 'var(--danger)',
}

const VettingPanel: React.FC<Props> = ({ vettingList, isLoading, actionLoading, onAction }) => {
  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
      <LoadingSpinner />
    </div>
  )

  const pending = vettingList.filter(v => v.vettingStatus === 'Pending')

  if (pending.length === 0) return (
    <div className="card" style={{ padding: '48px 32px', textAlign: 'center' }}>
      <EmptyState
        icon="✅"
        title="All clear"
        subtitle="No clinician applications pending review."
      />
    </div>
  )

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>
          Clinician Applications
        </h3>
        <p style={{ color: 'var(--n-400)', fontSize: 13 }}>
          Review clinician credentials and approve or reject onboarding.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {pending.map(item => {
          const isBusy = actionLoading === item.clinicianId
          return (
            <div
              key={item.clinicianId}
              className="card"
              style={{ padding: '28px 32px', display: 'flex', gap: 24, alignItems: 'flex-start' }}
            >
              {/* Avatar */}
              <div style={{
                flexShrink: 0, width: 52, height: 52, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(57,120,106,0.15), rgba(57,120,106,0.05))',
                border: '2px solid rgba(57,120,106,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 16, color: 'var(--forest)',
              }}>
                {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                  <span style={{ fontWeight: 800, fontSize: 15 }}>{item.name}</span>
                  <span style={{
                    padding: '3px 10px', borderRadius: 'var(--r-full)',
                    background: `${statusColor[item.vettingStatus] ?? 'var(--n-200)'}18`,
                    color: statusColor[item.vettingStatus] ?? 'var(--n-500)',
                    fontSize: 10, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>
                    {item.vettingStatus}
                  </span>
                </div>

                <p style={{ fontSize: 13, color: 'var(--n-500)', marginBottom: 4 }}>
                  {item.email}
                </p>
                <p style={{ fontSize: 13, color: 'var(--n-500)', marginBottom: 4 }}>
                  <strong>Specialty:</strong> {item.specialization}
                  {item.credential && <> &nbsp;·&nbsp; <strong>Credential:</strong> {item.credential}</>}
                </p>
                <p style={{ fontSize: 12, color: 'var(--n-400)', marginBottom: 20 }}>
                  Applied {fmtDate(item.appliedDate)}
                  {item.documentsUrl && (
                    <>
                      &nbsp;·&nbsp;
                      <a
                        href={item.documentsUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--forest)', textDecoration: 'underline', textUnderlineOffset: 2 }}
                      >
                        View Documents ↗
                      </a>
                    </>
                  )}
                </p>

                {item.vettingStatus === 'Pending' && (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '10px 24px', fontSize: 11, minWidth: 120 }}
                      onClick={() => onAction(item, true)}
                      disabled={isBusy}
                    >
                      {isBusy ? <LoadingSpinner size={14} /> : 'Approve'}
                    </button>
                    <button
                      className="btn btn-ghost"
                      style={{ padding: '10px 24px', fontSize: 11, minWidth: 120, color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.3)' }}
                      onClick={() => onAction(item, false)}
                      disabled={isBusy}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VettingPanel