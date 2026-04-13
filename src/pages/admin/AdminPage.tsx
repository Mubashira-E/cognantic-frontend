
import React, { useState, useEffect } from 'react'
import adminService from '../../services/AdminService'
import AdminStatsBar          from './components/AdminStatsBar'
import VettingPanel           from './components/VettingPanel'
import WithdrawalRequestsPanel from '../admin/components/WithdrawalRequestPanel'
import PerformanceTab         from '../admin/components/PerformanceTab'
import AuditLogTab            from '../admin/components/AuditLogTab'
import type { AdminStatsResponse, VettingItem } from '../../types'

type Tab = 'vetting' | 'withdrawals' | 'performance' | 'audit'

const fmtRevenue = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n}`

const AdminPage: React.FC = () => {
  const [tab,           setTab]          = useState<Tab>('vetting')
  const [stats,         setStats]        = useState<AdminStatsResponse | null>(null)
  const [vettingList,   setVettingList]  = useState<VettingItem[]>([])
  const [statsLoading,  setStatsLoading] = useState(true)
  const [vetLoading,    setVetLoading]   = useState(true)
  const [actionLoading, setActionLoading]= useState<string | null>(null)
  const [showOnboard,   setShowOnboard]  = useState(false)

  useEffect(() => {
    adminService.getStats()
      .then(s  => { setStats(s); setStatsLoading(false) })
      .catch(() => setStatsLoading(false))
  }, [])

  const loadVetting = () => {
    setVetLoading(true)
    adminService.getVettingList(true)
      .then(list => { setVettingList(list); setVetLoading(false) })
      .catch(() => setVetLoading(false))
  }
  useEffect(() => { loadVetting() }, [])

  const handleVettingAction = async (item: VettingItem, approve: boolean) => {
    setActionLoading(item.clinicianId)
    try {
      await adminService.processVettingAction(item.clinicianId, approve)
      await loadVetting()
    } catch (e: any) {
      alert(`Action failed: ${e.message}`)
    } finally {
      setActionLoading(null)
    }
  }

  const pendingVetting = vettingList.filter(v => v.vettingStatus === 'Pending').length

  const accentMap: Record<string, string> = {
    forest: 'var(--forest)', purple: 'var(--purple)', success: 'var(--success)',
  }

  const STATS_DISPLAY = [
    {
      label:     'Total Patients',
      value:     statsLoading ? '…' : String(stats?.totalPatients ?? 0),
      accent:    'forest',
      note:      `${stats?.newUsersThisMonth ?? 0} new this month`,
      noteColor: 'var(--success)',
    },
    {
      label:     'Active Clinicians',
      value:     statsLoading ? '…' : String(stats?.totalClinicians ?? 0),
      accent:    'purple',
      note:      `${pendingVetting} Pending Vetting`,
      noteColor: 'var(--n-400)',
    },
    {
      label:     'Platform Revenue',
      value:     statsLoading ? '…' : fmtRevenue(Number(stats?.totalRevenue ?? 0)),
      accent:    'success',
      note:      `${stats?.totalSessions ?? 0} sessions total`,
      noteColor: 'var(--forest)',
    },
    {
      label:     'Avg Match Score',
      value:     statsLoading ? '…' : `${Math.round((stats?.averageMatchScore ?? 0) * 100)}%`,
      dark:      true,
      note:      'AI precision',
      noteColor: 'var(--sage)',
    },
  ]

  return (
    <div className="page animate-fade-up">

      {/* ── Stats bar ─────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 44 }}>
        {STATS_DISPLAY.map(s => (
          <div key={s.label} className={`card ${s.dark ? 'card-dark' : ''}`} style={{
            padding: '28px 32px',
            borderLeft: s.dark ? 'none' : `4px solid ${accentMap[s.accent ?? ''] ?? 'var(--sage)'}`,
          }}>
            <div className="label" style={{ color: s.dark ? 'rgba(255,255,255,0.35)' : undefined, marginBottom: 10 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: s.dark ? 'white' : 'var(--charcoal)', lineHeight: 1, marginBottom: 10 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, color: s.noteColor, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {s.note}
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs ──────────────────────────────────────────────────── */}
      <div className="tab-nav">
        <button className={`tab-btn ${tab === 'vetting' ? 'active' : ''}`} onClick={() => setTab('vetting')}>
          Therapist Vetting
          {pendingVetting > 0 && (
            <span className="badge badge-blue" style={{ marginLeft: 8 }}>{pendingVetting}</span>
          )}
        </button>
        <button className={`tab-btn ${tab === 'withdrawals' ? 'active' : ''}`} onClick={() => setTab('withdrawals')}>
          Withdrawals
        </button>
        <button className={`tab-btn ${tab === 'performance' ? 'active' : ''}`} onClick={() => setTab('performance')}>
          Clinical Performance
        </button>
        <button className={`tab-btn ${tab === 'audit' ? 'active' : ''}`} onClick={() => setTab('audit')}>
          System Logs
        </button>
      </div>

      {/* ── Vetting tab ───────────────────────────────────────────── */}
      {tab === 'vetting' && (
        <div className="animate-fade-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h3 style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em', marginBottom: 4 }}>
                Onboarding Pipeline
              </h3>
              <p style={{ color: 'var(--n-400)', fontSize: 13 }}>
                Review credentials and approve or decline applicants.
              </p>
            </div>
            <button className="btn btn-primary" onClick={() => setShowOnboard(true)}>
              + Onboard Clinician Manually
            </button>
          </div>
          <VettingPanel
            vettingList={vettingList}
            isLoading={vetLoading}
            actionLoading={actionLoading}
            onAction={handleVettingAction}
          />
        </div>
      )}

      {/* ── Withdrawals tab ───────────────────────────────────────── */}
      {tab === 'withdrawals' && <WithdrawalRequestsPanel />}

      {/* ── Performance tab ───────────────────────────────────────── */}
      {tab === 'performance' && <PerformanceTab />}

      {/* ── Audit tab ─────────────────────────────────────────────── */}
      {tab === 'audit' && <AuditLogTab />}

      {/* ── Manual Onboard Modal ──────────────────────────────────── */}
      {showOnboard && (
        <div className="overlay" onClick={e => { if (e.target === e.currentTarget) setShowOnboard(false) }}>
          <div
            className="animate-scale-in"
            style={{
              background: 'white', borderRadius: 'var(--r-xl)',
              padding: '48px 44px', width: '100%', maxWidth: 480,
              boxShadow: '0 32px 80px -16px rgba(28,28,30,0.22)',
            }}
          >
            <h3 style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em', marginBottom: 8 }}>
              Onboard Clinician
            </h3>
            <p style={{ color: 'var(--n-400)', fontSize: 13, marginBottom: 32 }}>
              Manually add a verified clinician to the platform.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
              {[
                { label: 'Full Name',      placeholder: 'Dr. First Last',       type: 'text'  },
                { label: 'Email Address',  placeholder: 'doctor@email.com',     type: 'email' },
                { label: 'License Number', placeholder: 'e.g. MH/2024/001234', type: 'text'  },
              ].map(f => (
                <div className="form-group" key={f.label}>
                  <label className="label">{f.label}</label>
                  <input className="input" type={f.type} placeholder={f.placeholder} />
                </div>
              ))}
              <div className="form-group">
                <label className="label">Specialization</label>
                <select className="input">
                  <option>Clinical Psychology</option>
                  <option>Psychiatry</option>
                  <option>Cognitive Behavioural Therapy</option>
                  <option>Trauma-Focused Therapy</option>
                  <option>Mindfulness-Based Therapy</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowOnboard(false)}>
                Cancel
              </button>
              <button className="btn btn-forest" style={{ flex: 2, borderRadius: 18 }} onClick={() => setShowOnboard(false)}>
                Send Invite & Onboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage