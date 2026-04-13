// src/pages/admin/components/AuditLogTab.tsx
// Audit log tab for AdminPage.
// Extracted for component-based architecture; UI identical to original.

import React from 'react'

const AUDIT_LOGS = [
  { time: '2026-03-26 11:34', type: 'AUTH',  color: 'var(--forest)',  msg: 'Admin session initialized.' },
  { time: '2026-03-26 10:12', type: 'PAY',   color: 'var(--success)', msg: 'Automated payout triggered for Batch #401.' },
  { time: '2026-03-25 16:45', type: 'VET',   color: 'var(--purple)',  msg: 'New clinician application submitted for vetting.' },
  { time: '2026-03-25 09:00', type: 'SYS',   color: 'var(--info)',    msg: 'System health check passed. All services nominal.' },
  { time: '2026-03-24 14:22', type: 'AUTH',  color: 'var(--forest)',  msg: 'New admin user onboarded.' },
  { time: '2026-03-24 08:50', type: 'PAY',   color: 'var(--success)', msg: 'Monthly reconciliation complete.' },
  { time: '2026-03-23 17:10', type: 'ALERT', color: 'var(--warning)', msg: 'Unusual login attempt flagged.' },
]

const AuditLogTab: React.FC = () => (
  <div className="animate-fade-up">
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--n-100)' }}>
        <h4 style={{ fontWeight: 800, fontSize: 17 }}>System Audit Log</h4>
        <p style={{ fontSize: 12, color: 'var(--n-400)', marginTop: 4 }}>
          Immutable record of platform-level events.
        </p>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Type</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {AUDIT_LOGS.map((log, i) => (
            <tr key={i}>
              <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--n-400)', whiteSpace: 'nowrap' }}>
                {log.time}
              </td>
              <td>
                <span style={{
                  padding: '3px 10px', borderRadius: 'var(--r-full)',
                  background: `${log.color}18`,
                  color: log.color,
                  fontSize: 10, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>
                  {log.type}
                </span>
              </td>
              <td style={{ fontSize: 13, color: 'var(--n-600)' }}>{log.msg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default AuditLogTab