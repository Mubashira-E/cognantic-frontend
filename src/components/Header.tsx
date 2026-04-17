import React, { useState, useEffect } from 'react'
import type { ViewType, AuthRole } from '../types/app'

interface Props {
  view:             ViewType
  setView:          (v: ViewType) => void
  openAuth:         (role: AuthRole) => void
  isAuthenticated?: boolean
  userName?:        string
  onLogout?:        () => void
}

const LogoMark: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <circle cx="18" cy="7"  r="5"    fill="white" />
    <rect   x="2"  y="12" width="24" height="3.5" rx="1.75" fill="white" />
    <circle cx="12" cy="22" r="6"   fill="white" />
  </svg>
)

const NAV_ITEMS: { id: ViewType | 'patient-auth' | 'therapist-auth'; label: string }[] = [
  { id: 'home',           label: 'Network'  },
  { id: 'patient-auth',   label: 'Patient'  },
  { id: 'therapist-auth', label: 'Clinician'},
  { id: 'admin',          label: 'Admin'    },
]

const Header: React.FC<Props> = ({
  view, setView, openAuth,
  isAuthenticated = false, userName, onLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close drawer on resize back to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Close drawer when view changes (user tapped a nav item)
  useEffect(() => { setMenuOpen(false) }, [view])

  const handleNav = (id: string) => {
    if (id === 'patient-auth') {
      isAuthenticated ? setView('patient') : openAuth('patient')
    } else if (id === 'therapist-auth') {
      isAuthenticated ? setView('therapist') : openAuth('therapist')
    } else {
      setView(id as ViewType)
    }
    setMenuOpen(false)
  }

  const isActive = (id: string) => {
    if (id === 'patient-auth')   return view === 'patient'
    if (id === 'therapist-auth') return view === 'therapist'
    return view === id
  }

  return (
    <>
      <header className="glass-header" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <div className="header-inner">

          {/* ── Logo ── */}
          <button className="header-logo" onClick={() => handleNav('home')}>
            <div style={{
              width: 42, height: 42, background: 'var(--forest)', borderRadius: 13,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(57,120,106,0.35)',
              flexShrink: 0,
            }}>
              <LogoMark size={22} />
            </div>
            <span style={{
              fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 17,
              letterSpacing: '-0.02em', color: 'var(--charcoal)',
            }}>
              COGNANTIC
            </span>
          </button>

          {/* ── Desktop Nav ── */}
          <nav className="header-nav-wrap">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                style={{
                  padding: '9px 20px', borderRadius: 13, border: 'none',
                  fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 11,
                  letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: isActive(item.id) ? 'var(--charcoal)' : 'transparent',
                  color:      isActive(item.id) ? 'white' : 'var(--n-500)',
                  boxShadow:  isActive(item.id) ? '0 3px 10px rgba(28,28,30,0.18)' : 'none',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="header-actions">
            {isAuthenticated ? (
              <>
                {userName && (
                  <span className="user-name" style={{
                    fontSize: 13, fontWeight: 600, color: 'var(--n-600)',
                    maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {userName}
                  </span>
                )}
                <button
                  className="btn btn-outline"
                  onClick={onLogout}
                  style={{ padding: '9px 20px', fontSize: 11 }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                className="btn btn-forest"
                onClick={() => openAuth('patient')}
                style={{ padding: '11px 26px' }}
              >
                Get Started
              </button>
            )}

            {/* ── Hamburger (mobile only) ── */}
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`mobile-nav-btn ${isActive(item.id) ? 'active' : ''}`}
            onClick={() => handleNav(item.id)}
          >
            {item.label}
          </button>
        ))}

        <div className="mobile-drawer-divider" />

        <div className="mobile-drawer-cta">
          {isAuthenticated ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {userName && (
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--n-600)', paddingLeft: 4 }}>
                  {userName}
                </p>
              )}
              <button className="btn btn-outline btn-full" onClick={() => { onLogout?.(); setMenuOpen(false) }}>
                Sign Out
              </button>
            </div>
          ) : (
            <button
              className="btn btn-forest btn-full"
              onClick={() => { openAuth('patient'); setMenuOpen(false) }}
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Header