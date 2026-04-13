import React, { useState } from 'react'
import { useAuth }              from '../../context/AuthContext'
import type { PlannerResponse } from '../../types'
import StatsOverview            from './components/StatsOverView'
import ScheduleManager          from './components/ScheduleManager'
import PatientList              from './components/PatientList'
import EarningsView             from './components/EarningsView'
import ClinicianPatientRequests from '../therapist/components/ClinicianPatientRequests'

type Tab = 'schedule' | 'requests' | 'my-requests' | 'earnings'

const TherapistPage: React.FC<{ setView?: (v: string) => void }> = ({ setView }) => {
  const { user } = useAuth()
  const [tab,           setTab]           = useState<Tab>('schedule')
  const [planner,       setPlanner]       = useState<PlannerResponse | null>(null)
  const [sessionResult, setSessionResult] = useState<any>(null)

  const clinicianId =
    user?.id ??
    localStorage.getItem('clinicianId') ??
    localStorage.getItem('userId') ??
    ''

  return (
    <div className="page animate-fade-up">
      <StatsOverview
        planner={planner}
        clinicianName={planner?.clinicianName ?? user?.name ?? ''}
      />

      {/* ── Tabs ────────────────────────────────────────────────── */}
      <div className="tab-nav">
        {(['schedule', 'requests', 'my-requests', 'earnings'] as Tab[]).map(t => (
          <button
            key={t}
            className={`tab-btn ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t === 'requests' ? (
              <>
                Patient Requests
                {(planner?.pendingRequestCount ?? 0) > 0 && (
                  <span className="badge badge-blue" style={{ marginLeft: 8 }}>
                    {planner!.pendingRequestCount}
                  </span>
                )}
              </>
            ) : t === 'my-requests' ? (
              'My Assignments'
            ) : (
              t.charAt(0).toUpperCase() + t.slice(1)
            )}
          </button>
        ))}
      </div>

      {/* ── Schedule ──────────────────────────────────────────────── */}
      {tab === 'schedule' && (
        <ScheduleManager
          clinicianId={clinicianId}
          onPlannerLoad={setPlanner}
          setSessionResult={setSessionResult}
        />
      )}

      {/* ── Match requests from patients (accept/decline match) ───── */}
      {tab === 'requests' && (
        <PatientList
          pendingMatches={planner?.pendingMatches ?? []}
          isLoading={!planner}
        />
      )}

      {/* ── Patient assignment requests (admin-routed) ─────────────── */}
      {tab === 'my-requests' && (
        <ClinicianPatientRequests clinicianId={clinicianId} />
      )}

      {/* ── Earnings ──────────────────────────────────────────────── */}
      {tab === 'earnings' && <EarningsView clinicianId={clinicianId} />}

      {/* ── Session End modal ─────────────────────────────────────── */}
      {sessionResult && (
        <div className="overlay" onClick={() => setSessionResult(null)}>
          <div
            className="animate-scale-in"
            style={{
              background: 'white', borderRadius: 'var(--r-xl)',
              padding: '48px 44px', width: '100%', maxWidth: 440,
              boxShadow: '0 32px 80px -16px rgba(28,28,30,0.22)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em', marginBottom: 8 }}>
              Session Ended
            </h3>
            <div style={{ fontSize: 14, color: 'var(--n-500)', marginBottom: 24 }}>
              {sessionResult.overtimeMinutes > 0 ? (
                <>
                  <p style={{ marginBottom: 8 }}>
                    Overtime: <strong>{sessionResult.overtimeMinutes} min</strong> —
                    additional charge of <strong>₹{sessionResult.overtimeCharged}</strong>
                  </p>
                  <p>Total charged: <strong>₹{sessionResult.totalCharged}</strong></p>
                </>
              ) : (
                <p>{sessionResult.message ?? 'Session completed successfully.'}</p>
              )}
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setSessionResult(null)}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TherapistPage
