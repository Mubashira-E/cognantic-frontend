// src/pages/patient/components/DashboardView.tsx
// API: GET /Patient/dashboard/{userId}, GET /Sessions/upcoming/{patientId}, GET /Wallet/balance/{userId}

import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../../context/AuthContext'
import patientService from '../../../services/PatientService'
import sessionService from '../../../services/SessionService'
import walletService from '../../../services/WalletService'
import LoadingSpinner from '../../../components/LoadingSpinner'
import WalletCard from './WalletCard'
import { fmtSlot, timeUntil, initials } from './Shared'
import type { DashboardResponse, UpcomingSession, WalletBalance } from '../../../types'

// ── Upcoming session card ─────────────────────────────────────────
const UpcomingSessionCard: React.FC<{ session: UpcomingSession }> = ({ session }) => {
  const { dateShort, time } = fmtSlot(session.sessionDate)
  const msUntil  = new Date(session.sessionDate).getTime() - Date.now()
  const minUntil = Math.floor(msUntil / 60_000)
  const joinable = minUntil <= 15 && minUntil >= -30
  const countdown = timeUntil(session.sessionDate)

  return (
    <div style={{
      flexShrink: 0, padding: '20px 24px', borderRadius: 20,
      border: joinable ? '2px solid var(--forest)' : '1.5px solid rgba(57,120,106,0.22)',
      background: joinable ? 'rgba(57,120,106,0.08)' : 'rgba(57,120,106,0.04)',
      minWidth: 240,
    }}>
      <div style={{ fontSize: 9, fontWeight: 800, marginBottom: 8, color: joinable ? 'var(--forest)' : 'var(--n-400)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: 6 }}>
        {joinable && <span style={{ width: 7, height: 7, background: 'var(--forest)', borderRadius: '50%', display: 'inline-block', animation: 'pulseDot 2s ease infinite' }} />}
        {countdown}
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--forest)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
        {dateShort.toUpperCase()}, {time}
      </div>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{session.clinicianName}</div>
      <div style={{ fontSize: 11, color: 'var(--n-400)', marginBottom: 14 }}>
        {session.sessionType} · ${session.amount}
      </div>
      {session.meetLink ? (
        <div>
          <a
            href={session.meetLink}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '10px 16px', borderRadius: 14, fontSize: 11, fontWeight: 800,
              letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
              background: joinable ? 'var(--forest)' : 'transparent',
              color:      joinable ? 'white' : 'var(--forest)',
              border:     joinable ? 'none' : '1.5px solid var(--forest)',
              transition: 'all 0.2s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
            {joinable ? 'Join Session Now' : 'Join via Zoom'}
          </a>
          {session.meetLink && (
            <button
              onClick={() => navigator.clipboard?.writeText(session.meetLink!)}
              style={{ width: '100%', marginTop: 6, background: 'none', border: 'none', fontSize: 10, color: 'var(--n-400)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            >
              📋 Copy link
            </button>
          )}
        </div>
      ) : (
        <div style={{ fontSize: 11, color: 'var(--n-300)', textAlign: 'center', padding: '8px 0' }}>
          Meeting link coming soon
        </div>
      )}
    </div>
  )
}

// ── DashboardView ─────────────────────────────────────────────────
interface Props { onFindNew: () => void; refreshKey: number }

const DashboardView: React.FC<Props> = ({ onFindNew, refreshKey }) => {
  const { user } = useAuth()
  const [dashboard,        setDashboard]        = useState<DashboardResponse | null>(null)
  const [upcomingSessions, setUpcomingSessions] = useState<UpcomingSession[]>([])
  const [wallet,           setWallet]           = useState<WalletBalance | null>(null)
  const [isLoading,        setIsLoading]        = useState(true)
  const [walletLoading,    setWalletLoading]    = useState(true)
  const [error,            setError]            = useState<string | null>(null)
  const [energy,           setEnergy]           = useState(72)
  const [showTopUp,        setShowTopUp]        = useState(false)
  const [topUpAmount,      setTopUpAmount]      = useState('')
  const [topUpLoading,     setTopUpLoading]     = useState(false)

  const userId = user?.id ?? localStorage.getItem('userId') ?? ''

  const fetchAll = useCallback(async () => {
    if (!userId) { setError('Session expired. Please sign in again.'); setIsLoading(false); return }
    setIsLoading(true); setError(null)
    try {
      const [dash, sessions] = await Promise.all([
        patientService.getDashboard(userId).catch(e => { setError(e.message); return null }),
        sessionService.getUpcoming(userId).catch(() => [] as UpcomingSession[]),
      ])
      setDashboard(dash)
      setUpcomingSessions(sessions as UpcomingSession[])
    } finally { setIsLoading(false) }

    setWalletLoading(true)
    walletService.getBalance(userId)
      .then(setWallet).catch(() => setWallet(null))
      .finally(() => setWalletLoading(false))
  }, [userId, refreshKey])

  useEffect(() => { fetchAll() }, [fetchAll])

  const handleTopUp = async (method: string) => {
    if (!topUpAmount || Number(topUpAmount) <= 0 || !userId) return
    setTopUpLoading(true)
    try {
      const res = await walletService.topUp({ userId, amount: Number(topUpAmount), paymentMethod: method })
      setWallet(prev => prev ? { ...prev, balance: res.newBalance, available: res.newBalance - (prev.escrowBalance ?? 0) } : prev)
      setShowTopUp(false); setTopUpAmount('')
    } catch (err) { alert(err instanceof Error ? err.message : 'Top-up failed') }
    finally { setTopUpLoading(false) }
  }

  if (isLoading) return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
      <LoadingSpinner />
    </div>
  )

  if (error && !dashboard) return (
    <div className="page animate-fade-up" style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center', paddingTop: 80 }}>
      <div style={{ fontSize: 52, marginBottom: 16 }}>⚠️</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>Profile Not Found</h3>
      <p style={{ color: 'var(--n-400)', fontSize: 14, marginBottom: 28 }}>{error}</p>
      <button className="btn btn-forest" onClick={onFindNew}>Begin Intake →</button>
    </div>
  )

  const firstName = user?.name?.split(' ')[0] ?? 'there'

  return (
    <div className="page animate-fade-up">
      {/* ── Header row ── */}
      {/* flex-between-stack stacks to column on mobile */}
      <div className="flex-between-stack" style={{ marginBottom: 44 }}>
        <div>
          <h2 className="display-heading-lg" style={{ color: 'var(--charcoal)', marginBottom: 8 }}>
            Hello, {firstName}
          </h2>
          {dashboard && (
            <p style={{ color: 'var(--n-400)', fontSize: 15, fontWeight: 400 }}>
              Resilience score: <strong style={{ color: 'var(--forest)' }}>{dashboard.resilienceScore}</strong>
              {' · '}{dashboard.currentStep}
            </p>
          )}
        </div>
        <div className="flex-row-stack">
          <button className="btn btn-outline">Care Plan PDF</button>
          <button className="btn btn-forest" onClick={onFindNew}>Find New Clinician</button>
        </div>
      </div>

      {/* ── Main grid: 2fr 1fr → collapses to 1-col on tablet ── */}
      <div className="grid-dashboard-main" style={{ marginBottom: 28 }}>
        {/* Active Care Roadmap */}
        <div className="card card-dark" style={{ padding: '40px', color: 'white' }}>
          <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.35, marginBottom: 28 }}>Active Care Roadmap</div>
          {dashboard?.activeClinician ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40, flexWrap: 'wrap' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', border: '3px solid rgba(154,165,123,0.4)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.08)', fontWeight: 800, fontSize: 18, flexShrink: 0 }}>
                  {dashboard.activeClinician.avatarUrl && dashboard.activeClinician.avatarUrl !== '/images/default-avatar.png'
                    ? <img src={dashboard.activeClinician.avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : initials(dashboard.activeClinician.clinicianName)
                  }
                </div>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 5 }}>{dashboard.activeClinician.clinicianName}</h3>
                  <p style={{ color: 'var(--sage)', fontSize: 13, fontWeight: 600 }}>
                    {dashboard.activeClinician.nextSessionDate
                      ? `Next: ${fmtSlot(dashboard.activeClinician.nextSessionDate).dateShort}, ${fmtSlot(dashboard.activeClinician.nextSessionDate).time}`
                      : dashboard.activeClinician.specialty
                    }
                  </p>
                </div>
              </div>
              {/* 3-col inside dark card → wraps naturally on small screens */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 28 }}>
                {[
                  { l: 'Specialty', v: dashboard.activeClinician.specialty },
                  { l: 'Module',    v: dashboard.currentStep },
                  { l: 'Type',      v: dashboard.activeClinician.sessionType },
                ].map(({ l, v }) => (
                  <div key={l}>
                    <div style={{ fontSize: 9, textTransform: 'uppercase', opacity: 0.35, fontWeight: 700, marginBottom: 6, letterSpacing: '0.15em' }}>{l}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>{v}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: 20 }}>
              <p style={{ opacity: 0.5, marginBottom: 24, lineHeight: 1.6 }}>No clinician matched yet.<br />Complete your intake to find your care architect.</p>
              <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} onClick={onFindNew}>Begin Intake →</button>
            </div>
          )}
        </div>

        {/* Daily Check-in */}
        <div className="card" style={{ padding: '32px' }}>
          <h3 style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em', marginBottom: 8 }}>Daily Check-in</h3>
          <p style={{ color: 'var(--n-400)', fontSize: 13, marginBottom: 28 }}>How are your energy levels today?</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--n-50)', padding: '18px 20px', borderRadius: 20, border: '1px solid var(--n-100)' }}>
            <span style={{ fontSize: 26 }}>🔋</span>
            <input type="range" min={0} max={100} value={energy} onChange={e => setEnergy(Number(e.target.value))} style={{ flex: 1, accentColor: 'var(--forest)' }} />
            <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--forest)', minWidth: 36 }}>{energy}%</span>
          </div>
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Resilience Score', value: String(dashboard?.resilienceScore ?? '—'), color: 'var(--forest)'  },
              { label: 'MR Number',        value: dashboard?.mrNo ?? '—',                    color: 'var(--n-600)'   },
              { label: 'Care Step',        value: dashboard?.currentStep ?? '—',             color: 'var(--warning)' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--n-400)', fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Upcoming Sessions ── */}
      <div className="card" style={{ padding: '28px 32px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
          <h4 style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.01em' }}>Upcoming Sessions</h4>
          <span className="badge badge-live">{upcomingSessions.length > 0 ? `${upcomingSessions.length} scheduled` : 'None'}</span>
        </div>
        {upcomingSessions.length === 0 ? (
          <p style={{ color: 'var(--n-400)', fontSize: 13 }}>
            No upcoming sessions.{' '}
            <button onClick={onFindNew} style={{ background: 'none', border: 'none', color: 'var(--forest)', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>Book one →</button>
          </p>
        ) : (
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto' }} className="scrollbar-hide">
            {upcomingSessions.map(s => <UpcomingSessionCard key={s.sessionId} session={s} />)}
          </div>
        )}
      </div>

      {/* ── Past sessions ── */}
      {(dashboard?.pastSessions?.length ?? 0) > 0 && (
        <div className="card" style={{ padding: '28px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
            <h4 style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.01em' }}>Previous Sessions</h4>
            <span className="badge badge-sage">{dashboard!.pastSessions.length} completed</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {dashboard!.pastSessions.map(s => (
              <div key={s.sessionId} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--n-100)', flexWrap: 'wrap' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, background: s.status === 'Cancelled' ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  {s.status === 'Cancelled' ? '✕' : '✓'}
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{s.clinicianName}</div>
                  <div style={{ fontSize: 11, color: 'var(--n-400)' }}>{s.sessionType}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'var(--n-500)', fontWeight: 600 }}>{fmtSlot(s.sessionDate).dateShort}</div>
                  <span className={`badge ${s.status === 'Cancelled' ? 'badge-red' : 'badge-live'}`} style={{ fontSize: 9, marginTop: 4 }}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Wallet ── */}
      <WalletCard
        wallet={wallet} isLoading={walletLoading}
        showTopUp={showTopUp} setShowTopUp={setShowTopUp}
        topUpAmount={topUpAmount} setTopUpAmount={setTopUpAmount}
        topUpLoading={topUpLoading} handleTopUp={handleTopUp}
      />
    </div>
  )
}

export default DashboardView