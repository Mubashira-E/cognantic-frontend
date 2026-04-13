// src/pages/admin/components/AdminStatsBar.tsx
// Top stat cards for AdminPage — extracted for component-based architecture.

import React from 'react'
import type { AdminStatsResponse } from '../../../types'

interface Props {
  stats:     AdminStatsResponse | null
  isLoading: boolean
}

const fmtRevenue = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n}`

const Shimmer: React.FC = () => (
  <div style={{
    height: 40, borderRadius: 8,
    background: 'linear-gradient(90deg, var(--n-100) 25%, var(--n-50) 50%, var(--n-100) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.4s ease infinite',
  }} />
)

const AdminStatsBar: React.FC<Props> = ({ stats, isLoading }) => {
  const STATS = [
    {
      label:  'Total Patients',
      value:  isLoading ? null : String(stats?.totalPatients  ?? '—'),
      accent: 'var(--forest)',
    },
    {
      label:  'Total Clinicians',
      value:  isLoading ? null : String(stats?.totalClinicians ?? '—'),
      accent: 'var(--purple)',
    },
    {
      label:  'Total Sessions',
      value:  isLoading ? null : String(stats?.totalSessions  ?? '—'),
      accent: 'var(--info)',
    },
    {
      label:  'Platform Revenue',
      value:  isLoading ? null : fmtRevenue(stats?.totalRevenue ?? 0),
      dark:   true,
    },
  ]

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 44 }}>
        {STATS.map(s => (
          <div
            key={s.label}
            className={`card ${s.dark ? 'card-dark' : ''}`}
            style={{
              padding: '28px 32px',
              borderLeft: s.dark ? 'none' : `4px solid ${s.accent}`,
            }}
          >
            <div
              className="label"
              style={{ color: s.dark ? 'rgba(255,255,255,0.35)' : undefined, marginBottom: 10 }}
            >
              {s.label}
            </div>
            {s.value === null ? (
              <Shimmer />
            ) : (
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 40,
                color: s.dark ? 'white' : 'var(--charcoal)', lineHeight: 1,
              }}>
                {s.value}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminStatsBar