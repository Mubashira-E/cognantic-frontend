import React from 'react'

const TOP_THERAPISTS = [
  { initials: 'SV', name: 'Dr. Sarah Vance', score: 9.8, sessions: 1240 },
  { initials: 'MR', name: 'Dr. Madhavan R',  score: 9.4, sessions: 980  },
  { initials: 'PR', name: 'Dr. Priya Rao',   score: 9.1, sessions: 760  },
  { initials: 'AK', name: 'Dr. Arun Kumar',  score: 8.9, sessions: 540  },
]

const CHART_DATA = [
  { month: 'Sep', pct: 38 }, { month: 'Oct', pct: 52 },
  { month: 'Nov', pct: 64 }, { month: 'Dec', pct: 48 },
  { month: 'Jan', pct: 78 }, { month: 'Feb', pct: 70 },
  { month: 'Mar', pct: 100 },
]

const PerformanceTab: React.FC = () => (
  // grid-2 collapses to 1-col on mobile via global.css
  <div className="animate-fade-up grid-2">

    {/* Session Volume Chart */}
    <div className="card" style={{ padding: '36px' }}>
      <h4 style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', marginBottom: 6 }}>
        Session Volume
      </h4>
      <p style={{ fontSize: 12, color: 'var(--n-400)', marginBottom: 32, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Past 7 months
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 140 }}>
        {CHART_DATA.map(d => (
          <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: '100%', borderRadius: '6px 6px 0 0',
              height: `${d.pct * 1.4}px`,
              background: d.pct === 100
                ? 'var(--forest)'
                : `rgba(57,120,106,${0.25 + d.pct * 0.005})`,
              transition: 'height 0.6s cubic-bezier(0.4,0,0.2,1)',
            }} />
            <span style={{ fontSize: 10, color: 'var(--n-400)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {d.month}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Top Clinicians Leaderboard */}
    <div className="card" style={{ padding: '36px' }}>
      <h4 style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', marginBottom: 28 }}>
        Top Clinicians
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {TOP_THERAPISTS.map((t, i) => (
          <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{
              flexShrink: 0, width: 24, textAlign: 'center',
              fontSize: 13, fontWeight: 800,
              color: i === 0 ? 'var(--warning)' : 'var(--n-300)',
            }}>
              #{i + 1}
            </span>
            <div style={{
              flexShrink: 0, width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(57,120,106,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 13, color: 'var(--forest)',
            }}>
              {t.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {t.name}
              </div>
              <div style={{ fontSize: 11, color: 'var(--n-400)' }}>{t.sessions} sessions</div>
            </div>
            <div style={{
              flexShrink: 0, padding: '4px 12px',
              borderRadius: 'var(--r-full)',
              background: 'rgba(57,120,106,0.08)',
              color: 'var(--forest)', fontSize: 13, fontWeight: 800,
            }}>
              {t.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default PerformanceTab