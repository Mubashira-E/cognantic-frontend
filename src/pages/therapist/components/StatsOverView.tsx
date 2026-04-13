import React from 'react'
import type { PlannerResponse } from '../../../types'

const BRAND = { forest: '#39786A', warning: '#f59e0b', success: '#10b981', sage: '#9AA57B' } as const
type BKey = keyof typeof BRAND

interface Props { planner: PlannerResponse | null; clinicianName: string }

const StatsOverview: React.FC<Props> = ({ planner, clinicianName }) => {
  const STATS: { label: string; value: string; accent?: BKey; dark?: boolean }[] = [
    { label: "Today's Sessions", value: planner ? String(planner.todaysSchedule.length)  : '—', accent: 'forest'  },
    { label: 'Pending Requests', value: planner ? String(planner.pendingRequestCount)    : '—', accent: 'warning' },
    { label: 'Weekly Payout',    value: '—',                                                    accent: 'success' },
    { label: 'Avg. Match Score', value: '94%',                                                   dark: true        },
  ]
  return (
    <>
      {clinicianName && (
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--charcoal)', marginBottom: 8 }}>
            Welcome, {clinicianName}
          </h2>
          <p style={{ color: 'var(--n-400)', fontSize: 15 }}>
            {planner?.specialty ?? ''}
          </p>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 44 }}>
        {STATS.map(s => (
          <div key={s.label} className={`card ${s.dark ? 'card-dark' : ''}`}
            style={{ padding: '28px 32px', borderLeft: s.dark ? 'none' : `4px solid ${BRAND[s.accent ?? 'sage']}` }}>
            <div className="label" style={{ color: s.dark ? 'rgba(255,255,255,0.35)' : undefined, marginBottom: 10 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: s.dark ? 'white' : 'var(--charcoal)', lineHeight: 1 }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default StatsOverview
