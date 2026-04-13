import React, { useState, useEffect } from 'react'
import clinicianService from '../../../services/ClinicianService'
import sessionService   from '../../../services/SessionService'
import LoadingSpinner   from '../../../components/LoadingSpinner'
import type { PlannerResponse, PlannerSessionDto } from '../../../types'

const BRAND = { forest: '#39786A', warning: '#f59e0b', success: '#10b981' } as const

function getStyle(status: string) {
  if (status === 'Cancelled')  return { bg: 'rgba(226,232,240,0.3)', border: '#e2e8f0',                  timeColor: '#94a3b8', nameColor: '#94a3b8' }
  if (status === 'Completed')  return { bg: 'rgba(16,185,129,0.06)',  border: 'rgba(16,185,129,0.18)',   timeColor: BRAND.success, nameColor: '#1e293b' }
  if (status === 'InProgress') return { bg: 'rgba(245,158,11,0.06)',  border: 'rgba(245,158,11,0.25)',   timeColor: BRAND.warning, nameColor: '#1e293b' }
  return { bg: 'rgba(57,120,106,0.07)', border: 'rgba(57,120,106,0.18)', timeColor: BRAND.forest, nameColor: '#1e293b' }
}

const minutesUntil = (iso: string) => Math.floor((new Date(iso).getTime() - Date.now()) / 60_000)
const isJoinable   = (iso: string) => { const m = minutesUntil(iso); return m <= 15 && m >= -30 }
const countdown    = (iso: string) => {
  const min = minutesUntil(iso)
  if (min < -30) return null
  if (min < 0)   return 'In progress'
  if (min < 60)  return `Starts in ${min}m`
  const h = Math.floor(min / 60), m = min % 60
  return `Starts in ${h}h${m > 0 ? ` ${m}m` : ''}`
}

const BlockModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
    <div className="animate-scale-in" style={{ background: 'white', borderRadius: 28, padding: '48px', width: '100%', maxWidth: 440, boxShadow: '0 40px 96px -20px rgba(28,28,30,0.28)' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 8 }}>Manage Availability</h3>
      <p style={{ color: 'var(--n-400)', fontSize: 13, marginBottom: 28 }}>Prevent patients from booking specific time slots.</p>
      <div className="form-group" style={{ marginBottom: 18 }}>
        <label className="label">Date</label>
        <input className="input" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
      </div>
      <div className="form-group" style={{ marginBottom: 24 }}>
        <label className="label">Reason</label>
        <select className="input">
          <option>Personal Time</option><option>External Clinical Work</option>
          <option>Training / CPD</option><option>Holiday</option>
        </select>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
        <button className="btn btn-danger" style={{ flex: 2, borderRadius: 18 }} onClick={() => { alert('Slot blocked.'); onClose() }}>Confirm Block</button>
      </div>
    </div>
  </div>
)

interface Props {
  clinicianId:      string
  onPlannerLoad:    (p: PlannerResponse | null) => void
  setSessionResult: (r: any) => void
}

const ScheduleManager: React.FC<Props> = ({ clinicianId, onPlannerLoad, setSessionResult }) => {
  const [showBlock,     setShowBlock]     = useState(false)
  const [planner,       setPlanner]       = useState<PlannerResponse | null>(null)
  const [isLoading,     setIsLoading]     = useState(true)
  const [error,         setError]         = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [editLinkFor,   setEditLinkFor]   = useState<string | null>(null)
  const [linkValue,     setLinkValue]     = useState('')

  // Tick every minute for live countdowns
  const [, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 60_000)
    return () => clearInterval(t)
  }, [])

  const fetchPlanner = () => {
    if (!clinicianId) return
    setIsLoading(true); setError(null)
    // GET /api/v1/Clinician/planner/{clinicianId}
    // clinicianId = User.Id; handler resolves to Clinician via UserId or Id
    clinicianService.getPlanner(clinicianId)
      .then(data => { setPlanner(data); onPlannerLoad(data); setIsLoading(false) })
      .catch(err  => { setError(err instanceof Error ? err.message : 'Failed'); onPlannerLoad(null); setIsLoading(false) })
  }

  useEffect(() => { fetchPlanner() }, [clinicianId])

  const handleAction = async (sessionId: string, action: 'start' | 'end') => {
    setActionLoading(sessionId + action)
    try {
      if (action === 'start') {
        // POST /Sessions/{id}/start  body: { clinicianId }
        await sessionService.startSession(sessionId, clinicianId)
      } else {
        // POST /Sessions/{id}/end    body: { clinicianId } → Session_EndResponse
        const result = await sessionService.endSession(sessionId, clinicianId)
        setSessionResult(result)
      }
      fetchPlanner()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Action failed')
    } finally { setActionLoading(null) }
  }

  // todaysSchedule is the correct field from GetPlannerResponse
  const schedule = planner?.todaysSchedule ?? []

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>Today's Planner</h3>
          <p style={{ color: 'var(--n-400)', fontSize: 13 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <button className="btn btn-forest" onClick={() => setShowBlock(true)}>+ Block Personal Time</button>
      </div>

      {isLoading && <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><LoadingSpinner /></div>}

      {!isLoading && error && (
        <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 16, padding: '28px 32px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 28 }}>⏳</span>
          <div>
            <h4 style={{ fontWeight: 800, color: 'var(--charcoal)', marginBottom: 6 }}>Application Pending Review</h4>
            <p style={{ fontSize: 13, color: 'var(--n-400)', lineHeight: 1.6 }}>
              Your clinician profile is awaiting admin approval. Once verified you'll be visible to patients and your schedule will appear here.
            </p>
          </div>
        </div>
      )}

      {!isLoading && !error && schedule.length === 0 && (
        <div className="card" style={{ padding: '48px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📅</div>
          <h4 style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>No sessions today</h4>
          <p style={{ color: 'var(--n-400)', fontSize: 13 }}>Your schedule is clear. Patient requests will appear in the Requests tab.</p>
        </div>
      )}

      {!isLoading && !error && schedule.length > 0 && (
        <div className="card" style={{ overflow: 'hidden' }}>
          {schedule.map((s: PlannerSessionDto, i) => {
            const sty      = getStyle(s.status)
            // s.time is the session DateTime ISO string
            const timeStr  = new Date(s.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            const joinable = isJoinable(s.time)
            const cd       = countdown(s.time)
            const isPast   = minutesUntil(s.time) < -30
            // meetLink may have been added via PATCH
            const meetLink = (s as any).meetLink as string | null | undefined

            return (
              <div key={s.sessionId}
                style={{
                  display: 'flex', alignItems: 'center', gap: 20,
                  padding: '20px 32px',
                  borderBottom: i < schedule.length - 1 ? '1px solid var(--n-100)' : 'none',
                  background: joinable ? 'rgba(57,120,106,0.06)' : sty.bg,
                  borderLeft: joinable ? '3px solid var(--forest)' : undefined,
                  opacity: isPast ? 0.45 : 1,
                  transition: 'opacity 0.5s ease, background 0.3s',
                }}
              >
                {/* Time + countdown */}
                <div style={{ minWidth: 90 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: sty.timeColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>
                    {timeStr}
                  </div>
                  {cd && (
                    <div style={{ fontSize: 9, fontWeight: 700, color: joinable ? 'var(--forest)' : 'var(--n-400)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {joinable && <span style={{ width: 6, height: 6, background: 'var(--forest)', borderRadius: '50%', display: 'inline-block', animation: 'pulseDot 2s ease infinite' }} />}
                      {cd}
                    </div>
                  )}
                </div>

                {/* Avatar */}
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(57,120,106,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: 'var(--forest)', flexShrink: 0 }}>
                  {s.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>

                {/* Patient info */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: sty.nameColor, marginBottom: 3 }}>{s.patientName}</div>
                  <div style={{ fontSize: 11, color: 'var(--n-400)' }}>{s.sessionType}</div>
                  {s.notes && <div style={{ fontSize: 11, color: 'var(--n-300)', marginTop: 2, fontStyle: 'italic' }}>{s.notes}</div>}
                </div>

                {/* Status badge */}
                <span className={`badge ${s.status === 'Scheduled' ? 'badge-live' : s.status === 'Completed' ? 'badge-forest' : s.status === 'InProgress' ? 'badge-amber' : 'badge-red'}`}>
                  {s.status}
                </span>

                {/* Actions: Start / End + Zoom */}
                {s.status !== 'Cancelled' && s.status !== 'Completed' && (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                    {s.status === 'Scheduled' && (
                      <button className="btn btn-forest btn-sm" disabled={!!actionLoading}
                        onClick={() => handleAction(s.sessionId, 'start')}>
                        {actionLoading === s.sessionId + 'start' ? '…' : '▶ Start'}
                      </button>
                    )}
                    {s.status === 'InProgress' && (
                      <button className="btn btn-danger btn-sm" disabled={!!actionLoading}
                        onClick={() => handleAction(s.sessionId, 'end')}>
                        {actionLoading === s.sessionId + 'end' ? '…' : '⏹ End'}
                      </button>
                    )}

                    {/* Zoom link — from real Zoom API or PATCH */}
                    {meetLink ? (
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        <a href={meetLink} target="_blank" rel="noreferrer"
                          style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '8px 16px', borderRadius: 12, fontSize: 11, fontWeight: 800,
                            letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
                            background: joinable ? 'var(--forest)' : 'transparent',
                            color:      joinable ? 'white' : 'var(--forest)',
                            border:     joinable ? 'none' : '1.5px solid var(--forest)',
                            transition: 'all 0.2s',
                          }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
                          </svg>
                          {joinable ? 'Join Now' : 'Zoom'}
                        </a>
                        <button title="Copy Zoom link"
                          onClick={() => { navigator.clipboard?.writeText(meetLink); alert('Zoom link copied!') }}
                          style={{ width: 32, height: 32, borderRadius: 10, border: '1.5px solid var(--n-200)', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--n-500)' }}>
                          📋
                        </button>
                      </div>
                    ) : (
                      <button className="btn btn-outline btn-sm" style={{ padding: '0 10px', fontSize: 16 }}
                        onClick={() => { setEditLinkFor(s.sessionId); setLinkValue('') }}
                        title="Add Zoom link">🔗</button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Inline meet-link editor */}
      {editLinkFor && (
        <div className="card" style={{ padding: 24, marginTop: 16 }}>
          <label className="label" style={{ marginBottom: 8 }}>
            Add Zoom / Meet Link
          </label>
          <div style={{ display: 'flex', gap: 10 }}>
            <input className="input" placeholder="https://zoom.us/j/..."
              value={linkValue} onChange={e => setLinkValue(e.target.value)} style={{ flex: 1 }} />
            <button className="btn btn-forest btn-sm"
              onClick={async () => {
                if (!editLinkFor) return
                try {
                  // PATCH /Sessions/{id}/meet-link  body: { meetLink }
                  await sessionService.updateMeetLink(editLinkFor, linkValue)
                  setEditLinkFor(null)
                  fetchPlanner()
                } catch { alert('Failed to update link') }
              }}>Save</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setEditLinkFor(null)}>Cancel</button>
          </div>
        </div>
      )}

      {showBlock && <BlockModal onClose={() => setShowBlock(false)} />}
    </div>
  )
}

export default ScheduleManager
