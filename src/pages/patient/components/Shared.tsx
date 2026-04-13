// ─────────────────────────────────────────────────────────────────
// src/pages/patient/components/shared.tsx
// Shared UI primitives + types used across all patient sub-components.
// ─────────────────────────────────────────────────────────────────

import React from 'react'

// ── Types ─────────────────────────────────────────────────────────
export type FinderStep  = 1 | 2 | 3 | 4 | 5 | 6 | 7
export type SessionMode = 'video' | 'voice' | 'chat'
export type PayMethod   = 'UPI' | 'Card' | 'NetBanking' | 'Wallet'

export const STEP_LABELS: Record<FinderStep, string> = {
  1: 'Preferences', 2: 'Concerns', 3: 'Matches', 4: 'Schedule',
  5: 'Payment', 6: 'Booking', 7: 'Confirmed',
}

export const STEP_PCT: Record<FinderStep, number> = {
  1: 15, 2: 30, 3: 45, 4: 60, 5: 75, 6: 90, 7: 100,
}

export const initials = (name?: string) =>
  (name ?? '??').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

export const fmtSlot = (iso?: string) => {
  if (!iso) return { dateShort: '', date: '', time: '' }
  const d = new Date(iso)
  return {
    dateShort: d.toLocaleDateString([], { month: 'short', day: 'numeric' }),
    date:      d.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' }),
    time:      d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
}

export function timeUntil(iso: string): string {
  const ms    = new Date(iso).getTime() - Date.now()
  if (ms <= 0) return 'Now'
  const mins  = Math.floor(ms / 60_000)
  const hours = Math.floor(mins / 60)
  return hours > 0 ? `Starts in ${hours}h ${mins % 60}m` : `Starts in ${mins}m`
}

// Today as YYYY-MM-DD in local time
export const todayStr = (() => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
})()

// Convert a local date string (YYYY-MM-DD) to full ISO for backend date param
export const dateToISO = (s: string) => new Date(s + 'T00:00:00.000Z').toISOString()

export const BackBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: 40, height: 40, borderRadius: '50%',
      border: '1.5px solid var(--n-200)', background: 'white',
      cursor: 'pointer', fontSize: 16, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
    onMouseOver={e => (e.currentTarget.style.borderColor = 'var(--forest)')}
    onMouseOut={e  => (e.currentTarget.style.borderColor = 'var(--n-200)')}
  >←</button>
)

export const Avatar: React.FC<{ name: string; size?: number; src?: string }> = ({ name, size = 64, src }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%', flexShrink: 0,
    background: 'linear-gradient(135deg, rgba(154,165,123,0.35), rgba(57,120,106,0.25))',
    border: '2px solid rgba(57,120,106,0.25)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: size * 0.32, fontWeight: 700, color: 'var(--forest)',
    fontFamily: 'var(--font-display)', overflow: 'hidden',
  }}>
    {src && src !== '/images/default-avatar.png'
      ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      : initials(name)
    }
  </div>
)

export const Stars: React.FC<{ v?: number }> = ({ v = 4.8 }) => (
  <span style={{ color: '#f5a623', fontSize: 13, fontWeight: 700 }}>★ {v.toFixed(1)}</span>
)

export const Pill: React.FC<{ text: string }> = ({ text }) => (
  <span style={{
    display: 'inline-block', padding: '4px 12px', borderRadius: 20,
    fontSize: 11, fontWeight: 600,
    background: 'rgba(154,165,123,0.18)', color: '#6b7a55',
    border: '1px solid rgba(154,165,123,0.28)',
  }}>{text}</span>
)

export const StepBar: React.FC<{ step: FinderStep }> = ({ step }) =>
  step !== 7 ? (
    <div style={{ marginBottom: 44 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--forest)' }}>
          Step {step} of 5 · {STEP_LABELS[step]}
        </span>
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--n-400)' }}>
          🔒 Encrypted
        </span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${STEP_PCT[step]}%` }} />
      </div>
    </div>
  ) : null
