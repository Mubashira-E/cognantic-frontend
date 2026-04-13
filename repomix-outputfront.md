This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.env.example
.gitignore
index.html
package.json
public/favicon.svg
public/index.html
README.md
src/App.tsx
src/components/AuthModal.tsx
src/components/EmptyState.tsx
src/components/Header.tsx
src/components/LoadingSpinner.tsx
src/components/Toast.tsx
src/context/AuthContext.tsx
src/hooks/index.ts
src/hooks/useApi.ts
src/hooks/useAuth.ts
src/lib/api/apiClient.ts
src/main.tsx
src/pages/admin/AdminPage.tsx
src/pages/admin/components/AdminStatsBar.tsx
src/pages/admin/components/AuditLogTab.tsx
src/pages/admin/components/PerformanceTab.tsx
src/pages/admin/components/VettingPanel.tsx
src/pages/admin/components/WithdrawalRequestPanel.tsx
src/pages/HomePage.tsx
src/pages/patient/components/DashboardView.tsx
src/pages/patient/components/FinderFlow.tsx
src/pages/patient/components/FinderSteps.tsx
src/pages/patient/components/Shared.tsx
src/pages/patient/components/WalletCard.tsx
src/pages/patient/PatientPage.tsx
src/pages/therapist/components/ClinicianPatientRequests.tsx
src/pages/therapist/components/ClinicianRegistrationForm.tsx
src/pages/therapist/components/EarningsView.tsx
src/pages/therapist/components/PatientList.tsx
src/pages/therapist/components/ScheduleManager.tsx
src/pages/therapist/components/StatsOverView.tsx
src/pages/therapist/TherapistPage.tsx
src/services/AdminService.ts
src/services/AuthService.ts
src/services/ClinicianService.ts
src/services/PatientService.ts
src/services/SessionService.ts
src/services/WalletService.ts
src/styles/global.css
src/types/app.ts
src/types/index.ts
tsconfig.json
tsconfig.node.json
vite.config.ts
```

# Files

## File: .env.example
````
# ─────────────────────────────────────────────────────────────────
# Cognantic Frontend – Environment Variables
# Copy to .env.local and fill in your values
# ─────────────────────────────────────────────────────────────────

# Base URL of your .NET backend API
VITE_API_URL=https://localhost:7208/api/v1

# Optional: Set to "production" for live deployment
VITE_ENV=development
````

## File: .gitignore
````
node_modules
dist
dist-ssr
*.local
.env.local
.env.production
.DS_Store
Thumbs.db
````

## File: index.html
````html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#39786A" />
    <meta name="description" content="Cognantic — Science-based mental health care platform" />
    <title>Cognantic | Mental Wellness Platform</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
````

## File: package.json
````json
{
  "name": "cognantic",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "axios": "^1.13.6",
    "install": "^0.13.0",
    "npm": "^11.12.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.13.2"
  },
  "devDependencies": {
    "@types/node": "^25.5.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.0",
    "vite": "^8.0.0"
  }
}
````

## File: public/favicon.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="8" fill="#39786A"/>
  <circle cx="19" cy="9" r="5" fill="white"/>
  <rect x="4" y="14" width="24" height="3" rx="1.5" fill="white"/>
  <circle cx="13" cy="24" r="6" fill="white"/>
</svg>
````

## File: public/index.html
````html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#39786A" />
    <meta name="description" content="Cognantic — Science-based mental health care platform" />
    <title>Cognantic | Mental Wellness Platform</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
````

## File: README.md
````markdown
# Cognantic – Frontend (React + TypeScript)

Science-based mental health platform UI. Built with **React 18 + TypeScript + Vite**.

---

## Project Structure

```
src/
├── App.tsx                  # Root component, view routing, auth state
├── main.tsx                 # Vite entry point
├── components/
│   ├── Header.tsx           # Fixed nav with Cognantic logo + nav pills
│   ├── AuthModal.tsx        # Login / Register / Forgot Password modal
│   ├── LoadingSpinner.tsx   # Reusable loading indicator
│   ├── EmptyState.tsx       # Reusable empty-state placeholder
│   └── Toast.tsx            # Toast notification component
├── pages/
│   ├── HomePage.tsx         # Landing: hero, portal cards, stats, philosophy
│   ├── PatientPage.tsx      # Dashboard + 5-step intake/booking flow
│   ├── TherapistPage.tsx    # Schedule planner, patient requests, earnings
│   └── AdminPage.tsx        # Vetting pipeline, performance, audit log
├── hooks/
│   ├── useAuth.ts           # Login / register / logout state
│   ├── useApi.ts            # Generic data-fetching hook
│   └── index.ts
├── services/
│   └── api.ts               # Full API client (auth, patient, therapist, admin, matching)
├── types/
│   └── index.ts             # All shared TypeScript interfaces
└── styles/
    └── global.css           # Design tokens, utilities, component base styles
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env.local
# Edit VITE_API_URL to point at your .NET backend
```

### 3. Run dev server
```bash
npm run dev
# → http://localhost:5173
```

### 4. Build for production
```bash
npm run build
# Output in /dist
```

---

## Brand Colors

| Token          | Hex       | Usage                        |
|----------------|-----------|------------------------------|
| `--forest`     | `#39786A` | Primary CTA, active states   |
| `--sage`       | `#9AA57B` | Accents, borders, badges     |
| `--sage-light` | `#D6EEF0` | Light backgrounds            |
| `--cream`      | `#DFD8BE` | Warm surface tones           |
| `--cream-bg`   | `#F7F6F2` | Page background              |
| `--charcoal`   | `#1C1C1E` | Primary text, dark cards     |

Typography: **Sora** (body) + **DM Serif Display** (headings/display)

---

## Connecting to .NET Backend

All API calls route through `src/services/api.ts`. The service layer is organised into:

- `authApi`      → `/api/auth/*`
- `patientApi`   → `/api/patients/*` + `/api/sessions/*`
- `therapistApi` → `/api/therapists/*`
- `adminApi`     → `/api/admin/*`
- `matchingApi`  → `/api/matching/*`

The `useAuth` hook manages JWT token storage and provides `login`, `register`, `logout`, and `forgotPassword` methods ready to wire into the `AuthModal`.

The `useApi<T>` hook handles loading/error/data state for any endpoint.

---

## Pages

| Route (view state) | Page            | Access        |
|--------------------|-----------------|---------------|
| `home`             | `HomePage`      | Public        |
| `patient`          | `PatientPage`   | Patient auth  |
| `therapist`        | `TherapistPage` | Therapist auth|
| `admin`            | `AdminPage`     | Admin auth    |

Routing is handled via a `view` state in `App.tsx`. Replace with **React Router** when wiring up real auth guards.

---

## Next Steps (Backend Integration)

1. **Replace `alert()` calls** in `PatientPage`, `TherapistPage`, `AdminPage` with real API calls from `src/services/api.ts`
2. **Wire `useAuth`** into `AuthModal.tsx` — replace the `setTimeout` mock with real `login()` / `register()` calls
3. **Add React Router** for deep-linking and protected route guards
4. **Add context / Zustand** for global auth state so all pages can access the current user
5. **Implement real file downloads** (Care Plan PDF, Earnings Report) via the Blob API handlers in `patientApi` and `therapistApi`
````

## File: src/App.tsx
````typescript
import React, { useState } from 'react'
import Header       from './components/Header'
import AuthModal    from './components/AuthModal'
import HomePage     from './pages/HomePage'
import PatientPage  from './pages/patient/PatientPage'
import TherapistPage from './pages/therapist/TherapistPage'
import AdminPage    from './pages/admin/AdminPage'
import { useAuth }  from './context/AuthContext'
import type { ViewType, AuthRole } from './types/app'
import './styles/global.css'

export type { ViewType, AuthRole }

const App: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth()

  const [view,        setView]        = useState<ViewType>('home')
  const [authOpen,    setAuthOpen]    = useState(false)
  const [pendingRole, setPendingRole] = useState<AuthRole>('patient')

  const openAuth = (role: AuthRole) => {
    setPendingRole(role)
    setAuthOpen(true)
  }

  const handleAuthSuccess = (role: string) => {
    setAuthOpen(false)
    setView(role === 'therapist' ? 'therapist' : 'patient')
  }

  const handleLogout = () => {
    logout()
    setView('home')
  }

  const renderView = () => {
    switch (view) {
      case 'patient':    return <PatientPage />
      case 'therapist':  return <TherapistPage setView={setView} />
      case 'admin':      return <AdminPage />
      default:           return <HomePage openAuth={openAuth} setView={setView} />
    }
  }

  return (
    <div className="app-root">
      <Header
        view={view}
        setView={setView}
        openAuth={openAuth}
        isAuthenticated={isAuthenticated}
        userName={user?.name}
        onLogout={handleLogout}
      />
      <main className="content-viewport" key={view}>
        {renderView()}
      </main>
      {authOpen && (
        <AuthModal
          role={pendingRole}
          onClose={() => setAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  )
}

export default App
````

## File: src/components/AuthModal.tsx
````typescript
// ─────────────────────────────────────────────────────────────────
// Cognantic – AuthModal.tsx
// Forgot password flow (real email via SMTP):
//   Step 1 → enter email  → POST /auth/forgot-password → OTP sent to inbox
//   Step 2 → enter OTP    → client passes to step 3
//   Step 3 → new password → POST /auth/reset-password  → success → login
// ─────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { AuthRole } from '../types/app'
import { useAuth } from '../context/AuthContext'

type AuthMode   = 'login' | 'register' | 'forgot'
type ForgotStep = 1 | 2 | 3

interface Props {
  role:      AuthRole
  onClose:   () => void
  onSuccess: (role: string) => void
}

const LogoMark: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <circle cx="18" cy="7"  r="5"    fill="white" />
    <rect   x="2"  y="12" width="24" height="3.5" rx="1.75" fill="white" />
    <circle cx="12" cy="22" r="6"   fill="white" />
  </svg>
)

const Spinner: React.FC = () => (
  <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
    <span style={{
      width: 14, height: 14,
      border: '2px solid rgba(255,255,255,0.3)',
      borderTopColor: 'white', borderRadius: '50%',
      animation: 'spin 0.7s linear infinite', display: 'inline-block',
    }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    Processing...
  </span>
)

const AuthModal: React.FC<Props> = ({ role, onClose, onSuccess }) => {
  const { login, register, forgotPassword, resetPassword, isLoading, error, clearError } = useAuth()

  const [mode,        setMode]        = useState<AuthMode>('login')
  const [forgotStep,  setForgotStep]  = useState<ForgotStep>(1)

  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [name,        setName]        = useState('')
  const [otp,         setOtp]         = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPw,   setConfirmPw]   = useState('')

  const [successMsg,  setSuccessMsg]  = useState<string | null>(null)
  const [localError,  setLocalError]  = useState<string | null>(null)
  const [resendCool,  setResendCool]  = useState(0)   // seconds remaining on resend cooldown

  const switchMode = (m: AuthMode) => {
    clearError(); setSuccessMsg(null); setLocalError(null)
    setForgotStep(1); setOtp(''); setNewPassword(''); setConfirmPw('')
    setMode(m)
  }

  // ── Resend cooldown timer ─────────────────────────────────────
  const startCooldown = () => {
    setResendCool(60)
    const t = setInterval(() => {
      setResendCool(s => {
        if (s <= 1) { clearInterval(t); return 0 }
        return s - 1
      })
    }, 1000)
  }

  // ── Handlers ──────────────────────────────────────────────────
  const handleLogin = async () => {
    clearError(); setLocalError(null)
    try { const u = await login(email, password); onSuccess(u.role) } catch {}
  }

  const handleRegister = async () => {
    clearError(); setLocalError(null)
    try { const u = await register(name, email, password, role); onSuccess(u.role) } catch {}
  }

  // Step 1 — send OTP email
  const handleForgotRequest = async () => {
    if (!email.trim()) { setLocalError('Please enter your email address.'); return }
    clearError(); setLocalError(null)
    try {
      await forgotPassword(email)
      setSuccessMsg(`A 6-digit reset code has been sent to ${email}. Check your inbox (and spam folder).`)
      setForgotStep(2)
      startCooldown()
    } catch {}
  }

  // Resend OTP
  const handleResend = async () => {
    if (resendCool > 0) return
    clearError(); setSuccessMsg(null); setLocalError(null)
    try {
      await forgotPassword(email)
      setSuccessMsg('A new reset code has been sent.')
      startCooldown()
    } catch {}
  }

  // Step 2 — verify OTP (client-side format check only; server validates on step 3)
  const handleVerifyOtp = () => {
    setLocalError(null)
    if (!otp.trim() || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setLocalError('Please enter the 6-digit code from your email.')
      return
    }
    setSuccessMsg(null)
    setForgotStep(3)
  }

  // Step 3 — reset password
  const handleResetPassword = async () => {
    setLocalError(null)
    if (newPassword.length < 6) { setLocalError('Password must be at least 6 characters.'); return }
    if (newPassword !== confirmPw) { setLocalError('Passwords do not match.'); return }
    clearError()
    try {
      await resetPassword(email, otp, newPassword)
      setSuccessMsg('Password reset successfully! Redirecting to sign in…')
      setTimeout(() => switchMode('login'), 2000)
    } catch {}
  }

  const handleSubmit = () => {
    if (mode === 'login')    return handleLogin()
    if (mode === 'register') return handleRegister()
    if (mode === 'forgot') {
      if (forgotStep === 1) return handleForgotRequest()
      if (forgotStep === 2) return handleVerifyOtp()
      if (forgotStep === 3) return handleResetPassword()
    }
  }

  const title = () => {
    if (mode === 'login')    return role === 'therapist' ? 'Clinician Suite' : 'Patient Gateway'
    if (mode === 'register') return 'Create Account'
    if (forgotStep === 1)    return 'Reset Access'
    if (forgotStep === 2)    return 'Check Your Email'
    return 'Set New Password'
  }

  const subtitle = () => {
    if (mode === 'login')    return 'Secure entry to your care architecture.'
    if (mode === 'register') return 'Initialize your secure clinical profile.'
    if (forgotStep === 1)    return 'Enter your registered email to receive a reset code.'
    if (forgotStep === 2)    return `We sent a 6-digit code to ${email}`
    return 'Choose a strong new password for your account.'
  }

  const btnLabel = () => {
    if (mode === 'login')    return 'Sign In'
    if (mode === 'register') return 'Create Account'
    if (forgotStep === 1)    return 'Send Reset Code'
    if (forgotStep === 2)    return 'Verify Code →'
    return 'Set New Password'
  }

  const showError = error || localError

  return (
    <div className="overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div
        className="animate-scale-in"
        style={{
          background: 'white', borderRadius: 'var(--r-xl)',
          padding: '52px 48px', width: '100%', maxWidth: 440,
          position: 'relative', boxShadow: '0 40px 96px -20px rgba(28,28,30,0.28)',
        }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 24, right: 28, background: 'none', border: 'none', fontSize: 20, color: 'var(--n-300)', cursor: 'pointer' }}>✕</button>

        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, background: 'var(--forest)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(57,120,106,0.3)' }}>
            <LogoMark />
          </div>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 400, color: 'var(--charcoal)', marginBottom: 8 }}>
            {title()}
          </h3>
          <p style={{ color: 'var(--n-400)', fontSize: 13, lineHeight: 1.5 }}>{subtitle()}</p>
        </div>

        {/* Step dots for forgot flow */}
        {mode === 'forgot' && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{
                width: s === forgotStep ? 28 : 8, height: 8, borderRadius: 4,
                background: s < forgotStep ? 'var(--success)' : s === forgotStep ? 'var(--forest)' : 'var(--n-200)',
                transition: 'all 0.35s',
              }} />
            ))}
          </div>
        )}

        {/* Error */}
        {showError && (
          <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#dc2626', fontWeight: 600 }}>
            {showError}
          </div>
        )}

        {/* Success */}
        {successMsg && (
          <div style={{ background: 'rgba(57,120,106,0.08)', border: '1px solid rgba(57,120,106,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: 'var(--forest)', fontWeight: 600 }}>
            {successMsg}
          </div>
        )}

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} onKeyDown={e => e.key === 'Enter' && handleSubmit()}>

          {/* Register name */}
          {mode === 'register' && (
            <div className="form-group">
              <label className="label">Full Name</label>
              <input className="input" type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}

          {/* Email — login, register, forgot step 1 */}
          {(mode !== 'forgot' || forgotStep === 1) && (
            <div className="form-group">
              <label className="label">Email Address</label>
              <input className="input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          )}

          {/* Password — login / register */}
          {mode !== 'forgot' && (
            <div className="form-group">
              <label className="label">Password</label>
              <input className="input" type="password" placeholder="••••••••••" value={password} onChange={e => setPassword(e.target.value)} />
              {mode === 'login' && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                  <button onClick={() => switchMode('forgot')} style={{ background: 'none', border: 'none', fontSize: 10, fontWeight: 700, color: 'var(--n-400)', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer' }}>
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Forgot step 2: OTP */}
          {mode === 'forgot' && forgotStep === 2 && (
            <div className="form-group">
              <label className="label">6-Digit Reset Code</label>
              <input
                className="input"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="_ _ _ _ _ _"
                value={otp}
                autoFocus
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                style={{ textAlign: 'center', fontSize: 28, letterSpacing: '0.35em', fontWeight: 800 }}
              />
              {/* Resend link */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                <button
                  onClick={handleResend}
                  disabled={resendCool > 0}
                  style={{
                    background: 'none', border: 'none',
                    fontSize: 11, fontWeight: 700, cursor: resendCool > 0 ? 'not-allowed' : 'pointer',
                    color: resendCool > 0 ? 'var(--n-300)' : 'var(--forest)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {resendCool > 0 ? `Resend in ${resendCool}s` : 'Resend Code'}
                </button>
              </div>
            </div>
          )}

          {/* Forgot step 3: new password + confirm */}
          {mode === 'forgot' && forgotStep === 3 && (
            <>
              <div className="form-group">
                <label className="label">New Password</label>
                <input className="input" type="password" placeholder="Min. 6 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} autoFocus />
              </div>
              <div className="form-group">
                <label className="label">Confirm Password</label>
                <input
                  className="input" type="password" placeholder="Repeat new password"
                  value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
                  style={{ borderColor: confirmPw && confirmPw !== newPassword ? '#dc2626' : undefined }}
                />
                {confirmPw && confirmPw !== newPassword && (
                  <p style={{ fontSize: 11, color: '#dc2626', marginTop: 4 }}>Passwords don't match</p>
                )}
              </div>
            </>
          )}

          {/* Submit */}
          <button
            className="btn btn-forest btn-full btn-lg"
            onClick={handleSubmit}
            disabled={isLoading}
            style={{ marginTop: 8, borderRadius: 22 }}
          >
            {isLoading ? <Spinner /> : btnLabel()}
          </button>

          {/* Back to forgot step 1 from step 2 */}
          {mode === 'forgot' && forgotStep === 2 && (
            <button
              onClick={() => { setForgotStep(1); setOtp(''); setSuccessMsg(null) }}
              style={{ background: 'none', border: 'none', color: 'var(--n-400)', fontSize: 12, cursor: 'pointer', textAlign: 'center' }}
            >
              ← Change email address
            </button>
          )}

          {/* Footer nav */}
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, color: 'var(--n-400)', marginTop: 4 }}>
            {mode === 'login' ? (
              <>
                New to Cognantic?{' '}
                <button onClick={() => switchMode('register')} style={{ background: 'none', border: 'none', color: 'var(--forest)', fontWeight: 800, cursor: 'pointer', fontSize: 12 }}>
                  Create Account
                </button>
              </>
            ) : (
              <button onClick={() => switchMode('login')} style={{ background: 'none', border: 'none', color: 'var(--forest)', fontWeight: 800, cursor: 'pointer', fontSize: 12 }}>
                ← Back to Sign In
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
````

## File: src/components/EmptyState.tsx
````typescript
import React from 'react'

interface Props {
  icon?:    string
  title:    string
  subtitle?: string
  message?: string
  action?:  React.ReactNode
}

const EmptyState: React.FC<Props> = ({ icon = '📭', title, subtitle, action }) => (
  <div style={{
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '64px 32px', textAlign: 'center',
  }}>
    <div style={{ fontSize: 48, marginBottom: 20 }}>{icon}</div>
    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 8, fontWeight: 400 }}>
      {title}
    </h4>
    {subtitle && (
      <p style={{ color: 'var(--n-400)', fontSize: 14, maxWidth: 320, lineHeight: 1.6, marginBottom: 28 }}>
        {subtitle}
      </p>
    )}
    {action}
  </div>
)

export default EmptyState
````

## File: src/components/Header.tsx
````typescript
import React from 'react'
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
  const handleNav = (id: string) => {
    if (id === 'patient-auth') {
      isAuthenticated ? setView('patient') : openAuth('patient')
    } else if (id === 'therapist-auth') {
      isAuthenticated ? setView('therapist') : openAuth('therapist')
    } else {
      setView(id as ViewType)
    }
  }

  const isActive = (id: string) => {
    if (id === 'patient-auth')   return view === 'patient'
    if (id === 'therapist-auth') return view === 'therapist'
    return view === id
  }

  return (
    <header
      className="glass-header"
      style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        padding: '0 40px', height: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      <button
        onClick={() => setView('home')}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}
      >
        <div style={{
          width: 42, height: 42, background: 'var(--forest)', borderRadius: 13,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(57,120,106,0.35)',
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

      <nav style={{
        display: 'flex', background: 'rgba(154,165,123,0.08)',
        padding: '5px', borderRadius: 18, gap: 3,
        border: '1px solid rgba(154,165,123,0.15)',
      }}>
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

      {isAuthenticated ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {userName && (
            <span style={{
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
        </div>
      ) : (
        <button
          className="btn btn-forest"
          onClick={() => openAuth('patient')}
          style={{ padding: '11px 26px' }}
        >
          Get Started
        </button>
      )}
    </header>
  )
}

export default Header
````

## File: src/components/LoadingSpinner.tsx
````typescript
import React from 'react'

interface Props {
  size?: number
  color?: string
  label?: string
}

const LoadingSpinner: React.FC<Props> = ({
  size  = 32,
  color = 'var(--forest)',
  label = 'Loading…',
}) => (
  <div style={{
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: 16, padding: '48px',
  }}>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
    `}</style>
    <div style={{
      width: size, height: size,
      border: `3px solid ${color}22`,
      borderTopColor: color,
      borderRadius: '50%',
      animation: 'spin 0.75s linear infinite',
    }} />
    {label && (
      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--n-400)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
        {label}
      </span>
    )}
  </div>
)

export default LoadingSpinner
````

## File: src/components/Toast.tsx
````typescript
import React, { useEffect } from 'react'

export type ToastVariant = 'success' | 'error' | 'info' | 'warning'

interface Props {
  message:  string
  variant?: ToastVariant
  onClose:  () => void
  duration?: number
}

const COLORS: Record<ToastVariant, { bg: string; icon: string }> = {
  success: { bg: 'var(--forest)', icon: '✓' },
  error:   { bg: 'var(--danger)', icon: '✕' },
  warning: { bg: 'var(--warning)', icon: '⚠' },
  info:    { bg: 'var(--info)',    icon: 'ℹ' },
}

const Toast: React.FC<Props> = ({ message, variant = 'success', onClose, duration = 3500 }) => {
  useEffect(() => {
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [onClose, duration])

  const { bg, icon } = COLORS[variant]

  return (
    <div style={{
      position: 'fixed', bottom: 32, right: 32, zIndex: 3000,
      display: 'flex', alignItems: 'center', gap: 12,
      background: bg, color: 'white',
      padding: '14px 20px', borderRadius: 'var(--r-md)',
      boxShadow: '0 8px 24px rgba(28,28,30,0.2)',
      animation: 'fadeUp 0.3s ease',
      maxWidth: 360,
    }}>
      <span style={{ fontWeight: 800, fontSize: 14 }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 500 }}>{message}</span>
      <button onClick={onClose} style={{
        background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)',
        cursor: 'pointer', marginLeft: 8, fontSize: 16, lineHeight: 1,
      }}>✕</button>
    </div>
  )
}

export default Toast
````

## File: src/context/AuthContext.tsx
````typescript
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import authService from '../services/AuthService'
import type { AuthUser, ForgotPasswordResponse } from '../types'

export const setToken   = (t: string) => localStorage.setItem('cognantic_token', t)
export const clearToken = () => {
  ['cognantic_token','cognantic_user','userId','patientId','clinicianId'].forEach(k =>
    localStorage.removeItem(k))
}

interface AuthState {
  user:      AuthUser | null
  isLoading: boolean
  error:     string | null
}

interface AuthContextValue extends AuthState {
  isAuthenticated: boolean
  login:           (email: string, password: string) => Promise<AuthUser>
  register:        (fullName: string, email: string, password: string, role: string) => Promise<AuthUser>
  logout:          () => void
  forgotPassword:  (email: string) => Promise<ForgotPasswordResponse>
  resetPassword:   (email: string, token: string, newPassword: string) => Promise<void>
  clearError:      () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
const USER_KEY    = 'cognantic_user'

function restoreUser(): AuthUser | null {
  try { return JSON.parse(localStorage.getItem(USER_KEY) ?? '') as AuthUser } catch { return null }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({ user: restoreUser(), isLoading: false, error: null })

  useEffect(() => {
    if (state.user) localStorage.setItem(USER_KEY, JSON.stringify(state.user))
    else            localStorage.removeItem(USER_KEY)
  }, [state.user])

  const login = useCallback(async (email: string, password: string): Promise<AuthUser> => {
    setState(s => ({ ...s, isLoading: true, error: null }))
    try {
      const res  = await authService.login(email, password)
      setToken(res.token)
      const user: AuthUser = {
        id: res.user.id, name: res.user.name,
        email: res.user.email, role: res.user.role, avatarUrl: res.user.avatarUrl,
      }
      // Store IDs so all services can read them
      localStorage.setItem('userId', user.id)
      if (user.role === 'patient')   localStorage.setItem('patientId',   user.id)
      if (user.role === 'therapist') localStorage.setItem('clinicianId', user.id)
      setState({ user, isLoading: false, error: null })
      return user
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed'
      setState(s => ({ ...s, isLoading: false, error: msg }))
      throw err
    }
  }, [])

  const register = useCallback(async (
    fullName: string, email: string, password: string, role: string,
  ): Promise<AuthUser> => {
    setState(s => ({ ...s, isLoading: true, error: null }))
    try {
      await authService.register(fullName, email, password, role)
      return await login(email, password)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration failed'
      setState(s => ({ ...s, isLoading: false, error: msg }))
      throw err
    }
  }, [login])

  const logout = useCallback(() => { clearToken(); setState({ user: null, isLoading: false, error: null }) }, [])

  const forgotPassword = useCallback(async (email: string): Promise<ForgotPasswordResponse> => {
    setState(s => ({ ...s, isLoading: true, error: null }))
    try {
      const res = await authService.forgotPassword(email)
      setState(s => ({ ...s, isLoading: false }))
      return res
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Request failed'
      setState(s => ({ ...s, isLoading: false, error: msg }))
      throw err
    }
  }, [])

  const resetPassword = useCallback(async (email: string, token: string, newPassword: string): Promise<void> => {
    setState(s => ({ ...s, isLoading: true, error: null }))
    try {
      await authService.resetPassword(email, token, newPassword)
      setState(s => ({ ...s, isLoading: false }))
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Reset failed'
      setState(s => ({ ...s, isLoading: false, error: msg }))
      throw err
    }
  }, [])

  const clearError = useCallback(() => setState(s => ({ ...s, error: null })), [])

  return (
    <AuthContext.Provider value={{
      ...state, isAuthenticated: !!state.user,
      login, register, logout, forgotPassword, resetPassword, clearError,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
````

## File: src/hooks/index.ts
````typescript
export { useAuth } from '../context/AuthContext'
export { useApi  } from './useApi'
````

## File: src/hooks/useApi.ts
````typescript
// ─────────────────────────────────────────────────────────────────
// Cognantic – useApi generic data-fetching hook
// ─────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseApiState<T> {
  data:      T | null
  isLoading: boolean
  error:     string | null
}

export function useApi<T>(
  fetcher: () => Promise<{ data: T }>,
  deps: unknown[] = [],
) {
  const [state, setState] = useState<UseApiState<T>>({
    data:      null,
    isLoading: true,
    error:     null,
  })

  const mounted = useRef(true)

  const execute = useCallback(async () => {
    setState(s => ({ ...s, isLoading: true, error: null }))
    try {
      const res = await fetcher()
      if (mounted.current) setState({ data: res.data, isLoading: false, error: null })
    } catch (err) {
      if (mounted.current) {
        const msg = err instanceof Error ? err.message : 'Request failed'
        setState({ data: null, isLoading: false, error: msg })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    mounted.current = true
    execute()
    return () => { mounted.current = false }
  }, [execute])

  return { ...state, refetch: execute }
}
````

## File: src/hooks/useAuth.ts
````typescript
export { useAuth } from '../context/AuthContext'
````

## File: src/lib/api/apiClient.ts
````typescript
// src/lib/api/apiClient.ts
// Every backend endpoint returns: { isSuccess, data, error?, message? }
// The interceptor unwraps .data on success so callers receive T directly.

import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

export interface ApiResult<T = unknown> {
  isSuccess: boolean
  data:      T
  message?:  string
  error?:    string
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://localhost:7208/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT on every request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('cognantic_token')
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  err => Promise.reject(err),
)

// Unwrap Result<T> → T, or reject with the backend error message
apiClient.interceptors.response.use(
  (res: AxiosResponse<ApiResult>) => {
    const envelope = res.data
    if (envelope && envelope.isSuccess === false) {
      return Promise.reject(new Error(envelope.error ?? envelope.message ?? 'Request failed'))
    }
    return (envelope?.data ?? envelope) as any
  },
  (err: AxiosError<ApiResult>) => {
    const status = err.response?.status
    const msg =
      err.response?.data?.error ??
      err.response?.data?.message ??
      err.message ??
      'An unexpected error occurred'
    if (status === 401) {
      localStorage.removeItem('cognantic_token')
      localStorage.removeItem('cognantic_user')
    }
    return Promise.reject(new Error(msg))
  },
)

export default apiClient
````

## File: src/main.tsx
````typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
````

## File: src/pages/admin/AdminPage.tsx
````typescript
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
````

## File: src/pages/admin/components/AdminStatsBar.tsx
````typescript
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
````

## File: src/pages/admin/components/AuditLogTab.tsx
````typescript
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
````

## File: src/pages/admin/components/PerformanceTab.tsx
````typescript
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
  <div className="animate-fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

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
            {/* Rank */}
            <span style={{
              flexShrink: 0, width: 24, textAlign: 'center',
              fontSize: 13, fontWeight: 800,
              color: i === 0 ? 'var(--warning)' : 'var(--n-300)',
            }}>
              #{i + 1}
            </span>
            {/* Avatar */}
            <div style={{
              flexShrink: 0, width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(57,120,106,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 13, color: 'var(--forest)',
            }}>
              {t.initials}
            </div>
            {/* Name + sessions */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {t.name}
              </div>
              <div style={{ fontSize: 11, color: 'var(--n-400)' }}>{t.sessions} sessions</div>
            </div>
            {/* Score */}
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
````

## File: src/pages/admin/components/VettingPanel.tsx
````typescript
// src/pages/admin/components/VettingPanel.tsx
// Clinician vetting queue — approve / reject onboarding applications.
// Extracted from AdminPage for component-based architecture.

import React from 'react'
import LoadingSpinner from '../../../components/LoadingSpinner'
import EmptyState from '../../../components/EmptyState'
import type { VettingItem } from '../../../types'

interface Props {
  vettingList:   VettingItem[]
  isLoading:     boolean
  actionLoading: string | null
  onAction:      (item: VettingItem, approve: boolean) => void
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const statusColor: Record<string, string> = {
  Pending:  'var(--warning)',
  Approved: 'var(--success)',
  Rejected: 'var(--danger)',
}

const VettingPanel: React.FC<Props> = ({ vettingList, isLoading, actionLoading, onAction }) => {
  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
      <LoadingSpinner />
    </div>
  )

  const pending = vettingList.filter(v => v.vettingStatus === 'Pending')

  if (pending.length === 0) return (
    <div className="card" style={{ padding: '48px 32px', textAlign: 'center' }}>
      <EmptyState
        icon="✅"
        title="All clear"
        subtitle="No clinician applications pending review."
      />
    </div>
  )

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>
          Clinician Applications
        </h3>
        <p style={{ color: 'var(--n-400)', fontSize: 13 }}>
          Review clinician credentials and approve or reject onboarding.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {pending.map(item => {
          const isBusy = actionLoading === item.clinicianId
          return (
            <div
              key={item.clinicianId}
              className="card"
              style={{ padding: '28px 32px', display: 'flex', gap: 24, alignItems: 'flex-start' }}
            >
              {/* Avatar */}
              <div style={{
                flexShrink: 0, width: 52, height: 52, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(57,120,106,0.15), rgba(57,120,106,0.05))',
                border: '2px solid rgba(57,120,106,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 16, color: 'var(--forest)',
              }}>
                {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                  <span style={{ fontWeight: 800, fontSize: 15 }}>{item.name}</span>
                  <span style={{
                    padding: '3px 10px', borderRadius: 'var(--r-full)',
                    background: `${statusColor[item.vettingStatus] ?? 'var(--n-200)'}18`,
                    color: statusColor[item.vettingStatus] ?? 'var(--n-500)',
                    fontSize: 10, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>
                    {item.vettingStatus}
                  </span>
                </div>

                <p style={{ fontSize: 13, color: 'var(--n-500)', marginBottom: 4 }}>
                  {item.email}
                </p>
                <p style={{ fontSize: 13, color: 'var(--n-500)', marginBottom: 4 }}>
                  <strong>Specialty:</strong> {item.specialization}
                  {item.credential && <> &nbsp;·&nbsp; <strong>Credential:</strong> {item.credential}</>}
                </p>
                <p style={{ fontSize: 12, color: 'var(--n-400)', marginBottom: 20 }}>
                  Applied {fmtDate(item.appliedDate)}
                  {item.documentsUrl && (
                    <>
                      &nbsp;·&nbsp;
                      <a
                        href={item.documentsUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--forest)', textDecoration: 'underline', textUnderlineOffset: 2 }}
                      >
                        View Documents ↗
                      </a>
                    </>
                  )}
                </p>

                {item.vettingStatus === 'Pending' && (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '10px 24px', fontSize: 11, minWidth: 120 }}
                      onClick={() => onAction(item, true)}
                      disabled={isBusy}
                    >
                      {isBusy ? <LoadingSpinner size={14} /> : 'Approve'}
                    </button>
                    <button
                      className="btn btn-ghost"
                      style={{ padding: '10px 24px', fontSize: 11, minWidth: 120, color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.3)' }}
                      onClick={() => onAction(item, false)}
                      disabled={isBusy}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VettingPanel
````

## File: src/pages/admin/components/WithdrawalRequestPanel.tsx
````typescript
// src/pages/admin/components/WithdrawalRequestsPanel.tsx
// Admin view of clinician withdrawal requests — approve or reject.
// API: GET /api/v1/Admin/withdrawal-requests, POST /api/v1/Admin/withdrawal-action

import React, { useState, useEffect } from 'react'
import adminService from '../../../services/AdminService'
import LoadingSpinner from '../../../components/LoadingSpinner'
import EmptyState from '../../../components/EmptyState'
import type { WithdrawalRequestDto } from '../../../types'

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const fmtAmount = (n: number) =>
  `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const STATUS_COLOR: Record<string, string> = {
  Pending:     'var(--warning)',
  Transferred: 'var(--success)',
  Rejected:    'var(--danger)',
}

const WithdrawalRequestsPanel: React.FC = () => {
  const [requests,      setRequests]      = useState<WithdrawalRequestDto[]>([])
  const [isLoading,     setIsLoading]     = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [notes,         setNotes]         = useState<Record<string, string>>({})
  const [messages,      setMessages]      = useState<Record<string, { text: string; ok: boolean }>>({})
  const [showAll,       setShowAll]       = useState(false)

  const load = () => {
    setIsLoading(true)
    adminService.getWithdrawalRequests(!showAll)
      .then(r  => { setRequests(r); setIsLoading(false) })
      .catch(() => setIsLoading(false))
  }

  useEffect(() => { load() }, [showAll])

  const handleAction = async (req: WithdrawalRequestDto, approve: boolean) => {
    setActionLoading(req.withdrawalId)
    try {
      await adminService.processWithdrawalAction(req.withdrawalId, approve, notes[req.withdrawalId])
      setMessages(m => ({
        ...m,
        [req.withdrawalId]: {
          text: approve
            ? `✅ Withdrawal of ${fmtAmount(req.amount)} approved and marked as transferred.`
            : `❌ Withdrawal rejected. Funds returned to clinician wallet.`,
          ok: approve,
        },
      }))
      setTimeout(load, 1800)
    } catch (err) {
      setMessages(m => ({
        ...m,
        [req.withdrawalId]: {
          text: err instanceof Error ? err.message : 'Action failed.',
          ok: false,
        },
      }))
    } finally {
      setActionLoading(null) }
  }

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
      <LoadingSpinner />
    </div>
  )

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>
            Withdrawal Requests
          </h3>
          <p style={{ color: 'var(--n-400)', fontSize: 13 }}>
            Review and approve clinician payout requests.
          </p>
        </div>
        <button
          className="btn btn-ghost"
          style={{ fontSize: 11, padding: '9px 20px' }}
          onClick={() => setShowAll(v => !v)}
        >
          {showAll ? 'Show Pending Only' : 'Show All'}
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="card" style={{ padding: '48px 32px', textAlign: 'center' }}>
          <EmptyState
            icon="💸"
            title="No withdrawal requests"
            subtitle={showAll ? 'No requests found.' : 'No pending withdrawal requests at this time.'}
          />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {requests.map(req => {
            const isBusy  = actionLoading === req.withdrawalId
            const msg     = messages[req.withdrawalId]
            const isPending = req.status === 'Pending' && !msg

            return (
              <div
                key={req.withdrawalId}
                className="card"
                style={{
                  padding: '28px 32px',
                  opacity: !isPending && !msg ? 0.6 : 1,
                  transition: 'opacity 0.3s',
                }}
              >
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                  {/* Avatar */}
                  <div style={{
                    flexShrink: 0, width: 48, height: 48, borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(57,120,106,0.15), rgba(57,120,106,0.05))',
                    border: '2px solid rgba(57,120,106,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 15, color: 'var(--forest)',
                  }}>
                    {req.clinicianName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontWeight: 800, fontSize: 15 }}>{req.clinicianName}</span>
                      <span style={{
                        padding: '3px 10px', borderRadius: 'var(--r-full)',
                        background: `${STATUS_COLOR[req.status] ?? 'var(--n-200)'}18`,
                        color: STATUS_COLOR[req.status] ?? 'var(--n-500)',
                        fontSize: 10, fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                      }}>
                        {req.status}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: 32, marginBottom: 14, flexWrap: 'wrap' }}>
                      <div>
                        <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--n-400)', marginBottom: 2 }}>Amount</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--charcoal)', lineHeight: 1 }}>
                          {fmtAmount(req.amount)}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--n-400)', marginBottom: 4 }}>Payout Method</p>
                        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--charcoal)' }}>{req.payoutMethod}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--n-400)', marginBottom: 4 }}>Payout Details</p>
                        <p style={{ fontSize: 13, color: 'var(--n-500)', fontFamily: 'monospace' }}>{req.payoutDetails}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--n-400)', marginBottom: 4 }}>Requested</p>
                        <p style={{ fontSize: 13, color: 'var(--n-500)' }}>{fmtDate(req.createdTime)}</p>
                      </div>
                    </div>

                    {req.adminNotes && (
                      <p style={{ fontSize: 12, color: 'var(--n-400)', fontStyle: 'italic', marginBottom: 14 }}>
                        Admin note: {req.adminNotes}
                      </p>
                    )}

                    {/* Action area */}
                    {msg ? (
                      <p style={{ fontSize: 13, fontWeight: 600, color: msg.ok ? 'var(--success)' : 'var(--danger)' }}>
                        {msg.text}
                      </p>
                    ) : isPending ? (
                      <div>
                        <input
                          style={{
                            width: '100%', maxWidth: 420,
                            padding: '10px 14px', marginBottom: 14,
                            border: '1.5px solid var(--n-200)', borderRadius: 'var(--r-sm)',
                            fontFamily: 'var(--font-sans)', fontSize: 13,
                            color: 'var(--charcoal)', background: 'var(--white)',
                            outline: 'none',
                          }}
                          placeholder="Admin notes (optional)…"
                          value={notes[req.withdrawalId] ?? ''}
                          onChange={e => setNotes(n => ({ ...n, [req.withdrawalId]: e.target.value }))}
                        />
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button
                            className="btn btn-primary"
                            style={{ padding: '10px 24px', fontSize: 11, minWidth: 120 }}
                            onClick={() => handleAction(req, true)}
                            disabled={isBusy}
                          >
                            {isBusy ? <LoadingSpinner size={14} /> : 'Approve Transfer'}
                          </button>
                          <button
                            className="btn btn-ghost"
                            style={{ padding: '10px 24px', fontSize: 11, minWidth: 120, color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.3)' }}
                            onClick={() => handleAction(req, false)}
                            disabled={isBusy}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default WithdrawalRequestsPanel
````

## File: src/pages/HomePage.tsx
````typescript
import React from 'react'
import type { ViewType, AuthRole } from '../types/app'

interface Props {
  openAuth: (role: AuthRole) => void
  setView:  (v: ViewType) => void
}

const STATS = [
  { label: 'Precision Matches',   value: '98.4%',  sub: '↑ 2.1% this week',       subColor: 'var(--success)', accent: 'var(--forest)' },
  { label: 'Network Growth',      value: '12.4K+', sub: 'Verified Identity Nodes', subColor: 'var(--n-400)',   accent: 'var(--sage)'   },
  { label: 'Settlements Cleared', value: '$1.2M+', sub: 'Processed & Verified',    subColor: 'var(--sage)',    dark: true              },
]

const FEATURES = [
  { icon: '🧠', title: 'CBT-Aligned Matching',   desc: 'Algorithm cross-references therapist specialisation with patient narrative vectors.' },
  { icon: '🔒', title: 'Clinical-Grade Privacy', desc: 'All sessions and data are E2E encrypted. Fully HIPAA-aligned architecture.' },
  { icon: '💳', title: 'Automated Settlements',  desc: 'Therapists receive automated weekly payouts. Zero manual billing overhead.' },
  { icon: '📊', title: 'Progress Tracking',      desc: 'Real-time resilience scoring and session analytics for both patient and clinician.' },
]

const HomePage: React.FC<Props> = ({ openAuth, setView }) => (
  <div className="page">

    {/* HERO */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginBottom: 100 }}>
      <div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '7px 16px', borderRadius: 'var(--r-full)',
          background: 'rgba(57,120,106,0.1)', color: 'var(--forest)',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
          marginBottom: 32,
        }}>
          <span className="pulse" style={{ width: 8, height: 8, background: 'var(--forest)', borderRadius: '50%', display: 'inline-block' }} />
          Platform Active
        </span>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px, 6.5vw, 84px)',
          lineHeight: 0.88, letterSpacing: '-0.01em',
          marginBottom: 28, color: 'var(--charcoal)',
        }}>
          Mental care,<br />
          <em style={{ color: 'var(--forest)', fontStyle: 'italic' }}>reimagined.</em>
        </h1>

        <p style={{ color: 'var(--n-500)', fontSize: 17, fontWeight: 400, lineHeight: 1.75, maxWidth: 420, marginBottom: 44 }}>
          The architected platform for clinical excellence, automated
          settlements, and high-precision therapist matching.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button className="btn btn-forest btn-lg" onClick={() => openAuth('patient')}>Get Started</button>
          <button className="btn btn-outline btn-lg" onClick={() => setView('admin')}>System Health</button>
        </div>
      </div>

      {/* Portal cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {([
          { role: 'patient'   as AuthRole, icon: '👤', label: 'Patient Portal',  sub: 'Access your care roadmap & matched therapist.' },
          { role: 'therapist' as AuthRole, icon: '🩺', label: 'Clinician Suite', sub: 'Manage your practice & automated billing.' },
        ]).map(item => (
          <button
            key={item.role}
            className="card hoverable"
            onClick={() => openAuth(item.role)}
            style={{ padding: '28px 32px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 24, border: 'none', textAlign: 'left', width: '100%', background: 'white' }}
          >
            <div style={{
              width: 68, height: 68, flexShrink: 0,
              background: item.role === 'patient' ? 'rgba(57,120,106,0.1)' : 'rgba(154,165,123,0.12)',
              borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30,
            }}>
              {item.icon}
            </div>
            <div>
              <h3 style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', marginBottom: 5, textTransform: 'uppercase' }}>{item.label}</h3>
              <p style={{ color: 'var(--n-400)', fontSize: 13, fontWeight: 400 }}>{item.sub}</p>
            </div>
          </button>
        ))}
      </div>
    </div>

    {/* STATS */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 64 }}>
      {STATS.map(s => (
        <div key={s.label} className={`card ${s.dark ? 'card-dark' : ''}`} style={{ padding: '36px 40px', borderLeft: s.dark ? undefined : `4px solid ${s.accent}` }}>
          <div className="label" style={{ color: s.dark ? 'rgba(255,255,255,0.35)' : undefined, marginBottom: 14 }}>{s.label}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: s.dark ? 'white' : 'var(--charcoal)', lineHeight: 1 }}>{s.value}</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: s.subColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 14 }}>{s.sub}</div>
        </div>
      ))}
    </div>

    {/* FEATURES */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 64 }}>
      {FEATURES.map(f => (
        <div key={f.title} className="card" style={{ padding: '32px 28px' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
          <h4 style={{ fontWeight: 800, fontSize: 15, marginBottom: 10, letterSpacing: '-0.01em' }}>{f.title}</h4>
          <p style={{ color: 'var(--n-400)', fontSize: 13, lineHeight: 1.6, fontWeight: 400 }}>{f.desc}</p>
        </div>
      ))}
    </div>

    {/* PHILOSOPHY */}
    <div className="card" style={{ padding: '72px 60px', textAlign: 'center', background: 'rgba(154,165,123,0.05)', borderStyle: 'dashed', borderColor: 'rgba(154,165,123,0.4)' }}>
      <p className="label" style={{ display: 'flex', justifyContent: 'center', marginBottom: 28, letterSpacing: '0.5em' }}>System Philosophy</p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.8vw, 36px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--charcoal)', maxWidth: 700, margin: '0 auto', lineHeight: 1.4 }}>
        "The architecture of care is the foundation of recovery."
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 48 }}>
        <button className="btn btn-forest btn-lg" onClick={() => openAuth('patient')}>Begin Your Journey</button>
        <button className="btn btn-outline btn-lg" onClick={() => openAuth('therapist')}>Join as Clinician</button>
      </div>
    </div>

  </div>
)

export default HomePage
````

## File: src/pages/patient/components/DashboardView.tsx
````typescript
// src/pages/patient/components/DashboardView.tsx
// API: GET /Patient/dashboard/{userId}, GET /Sessions/upcoming/{patientId}, GET /Wallet/balance/{userId}
// UI is identical to original; only data source changed to real APIs.

import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../../context/AuthContext'
import patientService from '../../../services/PatientService'
import sessionService from '../../../services/SessionService'
import walletService from '../../../services/WalletService'
import LoadingSpinner from '../../../components/LoadingSpinner'
import WalletCard from './WalletCard'
import { fmtSlot, timeUntil, initials } from './Shared'
import type { DashboardResponse, UpcomingSession, WalletBalance } from '../../../types'

// ── Upcoming session card (Zoom link from real backend) ───────────
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

      {/* meetLink comes from real Zoom API (auto-created on booking) */}
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
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, flexWrap: 'wrap', gap: 20 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: 'var(--charcoal)', marginBottom: 8 }}>
            Hello, {firstName}
          </h2>
          {dashboard && (
            <p style={{ color: 'var(--n-400)', fontSize: 15, fontWeight: 400 }}>
              Resilience score: <strong style={{ color: 'var(--forest)' }}>{dashboard.resilienceScore}</strong>
              {' · '}{dashboard.currentStep}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-outline">Care Plan PDF</button>
          <button className="btn btn-forest" onClick={onFindNew}>Find New Clinician</button>
        </div>
      </div>


      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 28 }}>
        {/* Active Care Roadmap — activeClinician from backend */}
        <div className="card card-dark" style={{ padding: '40px', color: 'white' }}>
          <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.35, marginBottom: 28 }}>Active Care Roadmap</div>
          {dashboard?.activeClinician ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', border: '3px solid rgba(154,165,123,0.4)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.08)', fontWeight: 800, fontSize: 18 }}>
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

      {/* Upcoming Sessions */}
      <div className="card" style={{ padding: '28px 32px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
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

      {/* Past sessions */}
      {(dashboard?.pastSessions?.length ?? 0) > 0 && (
        <div className="card" style={{ padding: '28px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h4 style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.01em' }}>Previous Sessions</h4>
            <span className="badge badge-sage">{dashboard!.pastSessions.length} completed</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {dashboard!.pastSessions.map(s => (
              <div key={s.sessionId} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--n-100)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, background: s.status === 'Cancelled' ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  {s.status === 'Cancelled' ? '✕' : '✓'}
                </div>
                <div style={{ flex: 1 }}>
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
      
      {/* Wallet */}
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
````

## File: src/pages/patient/components/FinderFlow.tsx
````typescript
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import patientService from '../../../services/PatientService'
import sessionService from '../../../services/SessionService'
import walletService from '../../../services/WalletService'
import {StepBar, type FinderStep, type SessionMode, type PayMethod,todayStr, dateToISO,} from './Shared'
import {
  Step1Preferences,
  Step2Narrative,
  Step3Matches,
  Step4SlotPicker,
  Step5Payment,
  Step7Success,
} from './FinderSteps'
import type { MatchResult, SlotResponse, BookingResponse, WalletBalance } from '../../../types'

interface Props { onBack: () => void }

const FinderFlow: React.FC<Props> = ({ onBack }) => {
  const { user } = useAuth()
  const [step,              setStep]              = useState<FinderStep>(1)
  const [matches,           setMatches]           = useState<MatchResult[]>([])
  const [availableSlots,    setAvailableSlots]    = useState<SlotResponse[]>([])
  const [selectedClinician, setSelectedClinician] = useState<MatchResult | null>(null)
  const [selectedSlot,      setSelectedSlot]      = useState<string | null>(null)
  const [selectedMode,      setSelectedMode]      = useState<SessionMode>('video')
  const [concernNote,       setConcernNote]       = useState('')
  const [narrative,         setNarrative]         = useState('')
  const [meetLinkInput,     setMeetLinkInput]     = useState('')
  const [bookingResult,     setBookingResult]     = useState<BookingResponse | null>(null)
  const [isLoading,         setIsLoading]         = useState(false)
  const [walletBalance,     setWalletBalance]     = useState<WalletBalance | null>(null)
  const [loadingSlots,      setLoadingSlots]      = useState(false)
  const [selectedDate,      setSelectedDate]      = useState(todayStr)
  const [apiError,          setApiError]          = useState<string | null>(null)
  const [formData, setFormData] = useState({ ageGroup: '26 – 40', language: 'English', location: '' })

  // User.Id stored by AuthContext after login
  const patientId = user?.id ?? localStorage.getItem('userId') ?? ''

  useEffect(() => {
    if (!patientId) return
    walletService.getBalance(patientId).then(setWalletBalance).catch(() => setWalletBalance(null))
  }, [patientId])

  const goStep = (s: FinderStep) => { setApiError(null); setStep(s); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  // ── Step 2 → 3 ────────────────────────────────────────────────
  const handleMatch = async () => {
    if (!concernNote.trim() || !patientId) return
    setIsLoading(true); setApiError(null)
    try {
      // 1. Save intake (narrative + profile)
      await patientService.submitIntake({
        id:                     patientId,
        narrative:              [concernNote, narrative].filter(Boolean).join('\n\n'),
        initialResilienceScore: 50,
        language:               formData.language,
        ageGroup:               formData.ageGroup,
        location:               formData.location,
        sessionMode:            selectedMode,
      })
      // 2. Get matches — score is 0.0–1.0 double
      const results = await patientService.findMatches(patientId)
      setMatches(results)
      goStep(3)
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Could not analyze. Please try again.')
    } finally { setIsLoading(false) }
  }

  // ── Fetch slots for a date ────────────────────────────────────
  // date param must be full ISO string for the backend DateTime
  const fetchSlots = async (clinicianId: string, dateStr: string) => {
    return patientService.getClinicianSlots(clinicianId, dateToISO(dateStr))
  }

  // ── Step 3 → 4 ────────────────────────────────────────────────
  const handleSelectClinician = async (c: MatchResult) => {
    setSelectedClinician(c); setLoadingSlots(true); setSelectedSlot(null); setApiError(null)
    try {
      const slots = await fetchSlots(c.clinicianId, todayStr)
      const avail = slots.filter(s => s.isAvailable)
      if (avail.length === 0) {
        // Auto-advance to tomorrow
        const d = new Date(); d.setDate(d.getDate() + 1)
        const tomorrow = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
        setSelectedDate(tomorrow)
        setAvailableSlots(await fetchSlots(c.clinicianId, tomorrow))
      } else {
        setSelectedDate(todayStr); setAvailableSlots(slots)
      }
    } catch { setAvailableSlots([]) }
    finally { setLoadingSlots(false); goStep(4) }
  }

  const handleDateChange = async (dateStr: string) => {
    if (!selectedClinician) return
    setSelectedDate(dateStr); setSelectedSlot(null); setLoadingSlots(true)
    try { setAvailableSlots(await fetchSlots(selectedClinician.clinicianId, dateStr)) }
    catch { setAvailableSlots([]) }
    finally { setLoadingSlots(false) }
  }

  // ── Step 5 → book ─────────────────────────────────────────────
  const handlePaymentConfirm = async (payMethod: PayMethod) => {
    if (!selectedSlot || !selectedClinician || !patientId) return
    const amount = Math.round(selectedClinician.score * 12)   // score 0-1 → INR amount
    if (payMethod === 'Wallet' && (walletBalance?.available ?? 0) < amount) {
      setApiError(`Insufficient wallet balance. Top up first.`); return
    }
    setIsLoading(true); setApiError(null)
    try {
      const result = await sessionService.book({
        patientId,
        clinicianId: selectedClinician.clinicianId,
        sessionDate: selectedSlot,   // ISO from slot.startTime
        amount,
        notes: [concernNote, narrative, `Mode: ${selectedMode}`, `Pay: ${payMethod}`].filter(Boolean).join(' | '),
        meetLink: meetLinkInput.trim() || undefined,  // blank → Zoom auto-created by backend
      })
      setBookingResult(result); goStep(7)
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Booking failed.')
    } finally { setIsLoading(false) }
  }

  return (
    <div className="page animate-fade-up" style={{ maxWidth: 640, margin: '0 auto' }}>
      <StepBar step={step} />

      {apiError && (
        <div style={{ background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 14, padding: '14px 20px', marginBottom: 24, fontSize: 13, color: '#dc2626', fontWeight: 600 }}>
          {apiError}
        </div>
      )}

      {step === 1 && <Step1Preferences formData={formData} setFormData={setFormData} selectedMode={selectedMode} setSelectedMode={setSelectedMode} onBack={onBack} onNext={() => goStep(2)} />}
      {step === 2 && <Step2Narrative concernNote={concernNote} setConcernNote={setConcernNote} narrative={narrative} setNarrative={setNarrative} isLoading={isLoading} onBack={() => goStep(1)} onMatch={handleMatch} />}
      {step === 3 && <Step3Matches matches={matches} onBack={() => goStep(2)} onSelectClinician={handleSelectClinician} />}
      {step === 4 && selectedClinician && (
        <Step4SlotPicker
          selectedClinician={selectedClinician}
          availableSlots={availableSlots}
          selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot}
          selectedDate={selectedDate} loadingSlots={loadingSlots}
          onBack={() => goStep(3)} onDateChange={handleDateChange} onNext={() => goStep(5)}
        />
      )}
      {step === 5 && selectedClinician && selectedSlot && (
        <Step5Payment
          clinician={selectedClinician} slot={selectedSlot} mode={selectedMode}
          meetLinkInput={meetLinkInput} onMeetLinkChange={setMeetLinkInput}
          onConfirm={handlePaymentConfirm} isLoading={isLoading}
          walletBalance={walletBalance} onBack={() => goStep(4)}
        />
      )}
      {step === 7 && bookingResult && selectedClinician && (
        <Step7Success bookingResult={bookingResult} selectedClinician={selectedClinician} onBack={onBack} />
      )}
    </div>
  )
}

export default FinderFlow
````

## File: src/pages/patient/components/FinderSteps.tsx
````typescript
import React, { useState } from 'react'
import type { MatchResult, SlotResponse } from '../../../types'
import type { BookingResponse } from '../../../types'
import type { WalletBalance } from '../../../types'
import LoadingSpinner from '../../../components/LoadingSpinner'
import {
  BackBtn, Avatar, Stars, Pill,
  type SessionMode, type PayMethod,
  fmtSlot, todayStr,
} from './Shared'

// ═══════════════════════════════════════════════════════════════════
// STEP 1 – Profile Preferences
// ═══════════════════════════════════════════════════════════════════
interface Step1PreferencesProps {
  formData:       { ageGroup: string; language: string; location: string }
  setFormData:    React.Dispatch<React.SetStateAction<{ ageGroup: string; language: string; location: string }>>
  selectedMode:   SessionMode
  setSelectedMode:(m: SessionMode) => void
  onBack:         () => void
  onNext:         () => void
}

export const Step1Preferences: React.FC<Step1PreferencesProps> = ({
  formData, setFormData, selectedMode, setSelectedMode, onBack, onNext,
}) => (
  <div className="animate-fade-up">
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 36 }}>
      <BackBtn onClick={onBack} />
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 38, color: 'var(--charcoal)' }}>
        Tell us about yourself
      </h2>
    </div>
    <p style={{ color: 'var(--n-400)', fontSize: 14, marginBottom: 36 }}>
      This helps us find the best match for your needs.
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
      <div className="form-group">
        <label className="label">Age Group</label>
        <select
          className="input"
          value={formData.ageGroup}
          onChange={e => setFormData(p => ({ ...p, ageGroup: e.target.value }))}
        >
          {['18 – 25', '26 – 40', '41 – 60', '60+'].map(o => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="label">Preferred Language</label>
        <select
          className="input"
          value={formData.language}
          onChange={e => setFormData(p => ({ ...p, language: e.target.value }))}
        >
          {['English', 'Malayalam', 'Arabic', 'Hindi', 'Tamil'].map(o => <option key={o}>{o}</option>)}
        </select>
      </div>
    </div>

    <div className="form-group" style={{ marginBottom: 28 }}>
      <label className="label">Location</label>
      <input
        className="input"
        type="text"
        placeholder="e.g. Kochi, Kerala"
        value={formData.location}
        onChange={e => setFormData(p => ({ ...p, location: e.target.value }))}
      />
    </div>

    <div className="form-group" style={{ marginBottom: 36 }}>
      <label className="label">Preferred Session Mode</label>
      <div style={{ display: 'flex', gap: 10 }}>
        {[
          { val: 'video' as SessionMode, label: '📹 Video' },
          { val: 'voice' as SessionMode, label: '📞 Voice' },
          { val: 'chat'  as SessionMode, label: '💬 Chat'  },
        ].map(m => (
          <button
            key={m.val}
            onClick={() => setSelectedMode(m.val)}
            style={{
              flex: 1, padding: '12px 8px', borderRadius: 14, cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
              border: `2px solid ${selectedMode === m.val ? 'var(--forest)' : 'var(--n-200)'}`,
              background: selectedMode === m.val ? 'rgba(57,120,106,0.08)' : 'white',
              color: selectedMode === m.val ? 'var(--forest)' : 'var(--n-500)',
              transition: 'all 0.18s',
            }}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>

    <button className="btn btn-forest btn-full btn-lg" onClick={onNext} style={{ borderRadius: 22 }}>
      Continue →
    </button>
  </div>
)

// ═══════════════════════════════════════════════════════════════════
// STEP 2 – Concern Narrative
// ═══════════════════════════════════════════════════════════════════
interface Step2NarrativeProps {
  concernNote:    string
  setConcernNote: (v: string) => void
  narrative:      string
  setNarrative:   (v: string) => void
  isLoading:      boolean
  onBack:         () => void
  onMatch:        () => void
}

export const Step2Narrative: React.FC<Step2NarrativeProps> = ({
  concernNote, setConcernNote, narrative, setNarrative, isLoading, onBack, onMatch,
}) => (
  <div className="animate-fade-up">
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
      <BackBtn onClick={onBack} />
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36 }}>
          What's on your mind?
        </h2>
        <p style={{ color: 'var(--n-400)', fontSize: 13, marginTop: 4 }}>
          Private · used only for clinician matching
        </p>
      </div>
    </div>

    <div className="form-group" style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <label className="label">Describe the concern you are facing</label>
        <span style={{ fontSize: 11, color: 'var(--n-400)' }}>{concernNote.length}/500</span>
      </div>
      <textarea
        className="input"
        style={{ height: 140, resize: 'none', padding: '16px', borderRadius: 20, lineHeight: 1.7, fontSize: 14 }}
        placeholder="Tell us what brings you here — thoughts, feelings, or anything you'd want your clinician to know beforehand..."
        value={concernNote}
        onChange={e => e.target.value.length <= 500 && setConcernNote(e.target.value)}
      />
    </div>

    <div className="form-group" style={{ marginBottom: 32 }}>
      <label className="label">Additional narrative (optional)</label>
      <textarea
        className="input"
        style={{ height: 110, resize: 'none', padding: '16px', borderRadius: 20, lineHeight: 1.7, fontSize: 14 }}
        placeholder="Share more context about what you're hoping to work through..."
        value={narrative}
        onChange={e => setNarrative(e.target.value)}
      />
    </div>

    <button
      className="btn btn-forest btn-full btn-lg"
      onClick={onMatch}
      disabled={!concernNote.trim() || isLoading}
      style={{ borderRadius: 22 }}
    >
      {isLoading ? 'Finding Matches...' : 'Analyze & Match →'}
    </button>
  </div>
)

// ═══════════════════════════════════════════════════════════════════
// STEP 3 – Clinician Match Cards
// ═══════════════════════════════════════════════════════════════════

// ── Right-side profile drawer — identical to original repomix ─────
const ProfileDrawer: React.FC<{
  match:      MatchResult
  submitting: boolean
  onClose:    () => void
  onBook:     (m: MatchResult) => void
}> = ({ match, submitting, onClose, onBook }) => (
  <div
    className="overlay"
    style={{ justifyContent: 'flex-end', padding: 0, alignItems: 'stretch' }}
    onClick={e => { if (e.target === e.currentTarget) onClose() }}
  >
    <div
      className="animate-slide-right"
      style={{
        background: 'white',
        width: '100%',
        maxWidth: 520,
        overflowY: 'auto',
        padding: '48px 44px',
      }}
    >
      {/* Back link */}
      <button
        onClick={onClose}
        style={{
          background: 'none', border: 'none',
          fontSize: 10, fontWeight: 700,
          color: 'var(--n-400)', textTransform: 'uppercase', letterSpacing: '0.2em',
          cursor: 'pointer', marginBottom: 40, display: 'block',
        }}
      >
        ← Back to Matches
      </button>

      {/* Avatar + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36 }}>
        <div style={{
          width: 100, height: 100,
          background: 'rgba(57,120,106,0.1)',
          borderRadius: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 48, overflow: 'hidden',
        }}>
          {match.avatarUrl && match.avatarUrl !== '/images/default-avatar.png'
            ? (
              <img
                src={match.avatarUrl}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            )
            : '👩‍⚕️'
          }
        </div>
        <div>
          <span className="badge badge-live" style={{ marginBottom: 10, display: 'inline-block' }}>
            Available Today
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--charcoal)', marginBottom: 5 }}>
            {match.clinicianName}
          </h2>
          <p style={{ color: 'var(--n-400)', fontWeight: 600, fontSize: 13 }}>
            {match.specialty}
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { l: 'Match Score', v: `${Math.round(match.score * 100)}%` },
          { l: 'Specialty',   v: match.specialty },
        ].map(s => (
          <div
            key={s.l}
            style={{ background: 'var(--n-50)', padding: '18px 16px', borderRadius: 20, textAlign: 'center' }}
          >
            <div className="label" style={{ marginBottom: 6 }}>{s.l}</div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Why this match */}
      {match.reason && (
        <div style={{ marginBottom: 32 }}>
          <h4 style={{ fontWeight: 800, fontSize: 16, marginBottom: 10 }}>Why this match</h4>
          <p style={{ color: 'var(--n-500)', lineHeight: 1.7, fontSize: 14 }}>
            {match.reason}
          </p>
        </div>
      )}

      {/* CTA */}
      <div style={{
        padding: '24px 28px',
        background: 'rgba(57,120,106,0.07)',
        borderRadius: 24,
        border: '1px solid rgba(57,120,106,0.18)',
      }}>
        <h4 style={{ fontWeight: 800, fontSize: 16, color: 'var(--forest)', marginBottom: 8 }}>
          Ready to start?
        </h4>
        <button
          className="btn btn-forest btn-full"
          style={{ padding: '15px', borderRadius: 18 }}
          onClick={() => { onClose(); onBook(match) }}
          disabled={submitting}
        >
          {submitting ? 'Loading slots…' : 'View Availability'}
        </button>
      </div>
    </div>
  </div>
)

// ── Single card — exact layout from original repomix ─────────────
// justify-content: space-between pushes the button group to the far right.
const ClinicianCard: React.FC<{
  match:         MatchResult
  isTop?:        boolean
  submitting:    boolean
  onViewProfile: (m: MatchResult) => void
  onBook:        (m: MatchResult) => void
}> = ({ match, isTop, submitting, onViewProfile, onBook }) => {
  const scorePct       = Math.round(match.score * 100)
  const specialtyLabel = (match.specialty || 'General').split(/[,/]/)[0].trim().toUpperCase()

  return (
    <div
      className="card"
      style={{
        padding: '24px 32px',
        borderLeft: isTop ? '5px solid var(--forest)' : '1px solid var(--n-100)',
        // ↓ key layout: left group + right buttons
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20,
        opacity: isTop ? 1 : 0.78,
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Best-match ribbon */}
      {isTop && (
        <div style={{
          position: 'absolute', top: 16, right: -8,
          background: 'var(--forest)', color: 'white',
          fontSize: 9, fontWeight: 800, letterSpacing: '0.12em',
          textTransform: 'uppercase', padding: '4px 20px 4px 12px',
          borderRadius: '4px 0 0 4px',
        }}>
          Best Match
        </div>
      )}

      {/* ── LEFT: avatar + name/meta ──────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* Avatar — rounded square, photo or emoji fallback */}
        <div style={{
          width: 60, height: 60, borderRadius: 18, flexShrink: 0,
          background: isTop ? 'rgba(57,120,106,0.1)' : 'rgba(154,165,123,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, overflow: 'hidden',
        }}>
          {match.avatarUrl && match.avatarUrl !== '/images/default-avatar.png'
            ? (
              <img
                src={match.avatarUrl}
                alt={match.clinicianName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            )
            : '👩‍⚕️'
          }
        </div>

        {/* Name + match % · specialty */}
        <div>
          <h4 style={{ fontWeight: 800, fontSize: 19, marginBottom: 4 }}>
            {match.clinicianName}
          </h4>
          <p className="label" style={{ marginBottom: 0 }}>
            {scorePct}% Match · {specialtyLabel}
          </p>
        </div>
      </div>

      {/* ── RIGHT: VIEW PROFILE + BOOK NOW ────────────────────── */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => onViewProfile(match)}
        >
          View Profile
        </button>
        <button
          className="btn btn-forest btn-sm"
          disabled={submitting}
          onClick={() => onBook(match)}
        >
          {submitting ? 'Loading…' : 'Book Now'}
        </button>
      </div>
    </div>
  )
}

// ── Step 3 root ──────────────────────────────────────────────────
export const Step3Matches: React.FC<{
  matches:           MatchResult[]
  onBack:            () => void
  onSelectClinician: (m: MatchResult) => void
}> = ({ matches, onBack, onSelectClinician }) => {
  const [profileMatch, setProfileMatch] = useState<MatchResult | null>(null)
  const [submitting,   setSubmitting]   = useState(false)

  const handleBook = (m: MatchResult) => {
    setSubmitting(true)
    onSelectClinician(m)
  }

  return (
    <>
      <div className="animate-fade-up">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <BackBtn onClick={onBack} />
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 42, color: 'var(--charcoal)', marginBottom: 4 }}>
              Top Matches
            </h2>
            <p style={{ color: 'var(--n-400)', fontSize: 13 }}>
              Based on your profile and assessment.
            </p>
          </div>
        </div>

        {/* Card list */}
        <div style={{ marginTop: 32 }}>
          {matches.length > 0
            ? matches.map((m, i) => (
                <ClinicianCard
                  key={m.clinicianId}
                  match={m}
                  isTop={i === 0}
                  submitting={submitting}
                  onViewProfile={setProfileMatch}
                  onBook={handleBook}
                />
              ))
            : (
              <div style={{ textAlign: 'center', padding: '56px 0', color: 'var(--n-400)' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <p>No verified clinicians found right now. Try again shortly.</p>
              </div>
            )
          }
        </div>
      </div>

      {/* Profile drawer — slides in from the right */}
      {profileMatch && (
        <ProfileDrawer
          match={profileMatch}
          submitting={submitting}
          onClose={() => setProfileMatch(null)}
          onBook={handleBook}
        />
      )}
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════
// STEP 4 – Slot Picker
// ═══════════════════════════════════════════════════════════════════
export const Step4SlotPicker: React.FC<{
  selectedClinician: MatchResult; availableSlots: SlotResponse[]
  selectedSlot: string | null; setSelectedSlot: (v: string) => void
  selectedDate: string; loadingSlots: boolean
  onBack: () => void; onDateChange: (d: string) => void; onNext: () => void
}> = ({ selectedClinician, availableSlots, selectedSlot, setSelectedSlot, selectedDate, loadingSlots, onBack, onDateChange, onNext }) => (
  <div className="animate-fade-up">
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
      <BackBtn onClick={onBack} />
      <Avatar name={selectedClinician.clinicianName} size={48} src={selectedClinician.avatarUrl} />
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 2 }}>
          {selectedClinician.clinicianName}
        </h3>
        <p style={{ fontSize: 12, color: 'var(--n-400)' }}>
          {selectedClinician.specialty} · Select a time slot
        </p>
      </div>
    </div>

    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--charcoal)' }}>Select date</label>
        <span style={{ fontSize: 11, color: 'var(--n-400)', background: 'var(--n-50)', padding: '4px 10px', borderRadius: 8, border: '1px solid var(--n-100)' }}>🕐 IST (UTC +5:30)</span>
      </div>
      <input
        type="date" value={selectedDate} min={todayStr}
        onChange={e => onDateChange(e.target.value)}
        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--r-md)', border: '1.5px solid var(--n-200)', fontFamily: 'var(--font-sans)', fontSize: 14, outline: 'none', background: 'white', color: 'var(--charcoal)', cursor: 'pointer', boxSizing: 'border-box' }}
        onFocus={e => (e.target.style.borderColor = 'var(--forest)')}
        onBlur={e  => (e.target.style.borderColor = 'var(--n-200)')}
      />
    </div>

    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 16 }}>Available Slots</p>

    {loadingSlots ? (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><LoadingSpinner /></div>
    ) : availableSlots.filter(s => s.isAvailable).length > 0 ? (
      <>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
          {availableSlots.filter(s => s.isAvailable).map(slot => {
            const time  = new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            const isSel = selectedSlot === slot.startTime
            return (
              <button key={slot.startTime} className={`slot-btn ${isSel ? 'active' : ''}`}
                onClick={() => setSelectedSlot(slot.startTime)}>
                {time}
              </button>
            )
          })}
        </div>
        <details style={{ background: 'var(--n-50)', borderRadius: 16, padding: '14px 18px', border: '1px solid var(--n-100)', marginBottom: 24 }}>
          <summary style={{ fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Session Guidelines & Policies</summary>
          <ul style={{ fontSize: 12, color: 'var(--n-500)', marginTop: 12, paddingLeft: 20, lineHeight: 2.2 }}>
            <li>Sessions are 60 minutes unless otherwise specified</li>
            <li>Cancellations must be made 24 hours in advance</li>
            <li>Confidentiality is maintained per professional standards</li>
          </ul>
        </details>
        <button className="btn btn-forest btn-full btn-lg" onClick={onNext} disabled={!selectedSlot} style={{ padding: '22px', borderRadius: 24, fontSize: 13 }}>
          Proceed to Payment →
        </button>
      </>
    ) : (
      <div style={{ padding: '32px', textAlign: 'center', borderRadius: 20, background: 'var(--n-50)', color: 'var(--n-400)', marginBottom: 24 }}>
        No available slots on this day. Try another date.
        <div style={{ marginTop: 16 }}>
          <button className="btn btn-outline btn-sm" onClick={onBack}>Choose Another Clinician</button>
        </div>
      </div>
    )}
  </div>
)

// ═══════════════════════════════════════════════════════════════════
// STEP 5 – Payment
// ═══════════════════════════════════════════════════════════════════
export const Step5Payment: React.FC<{
  clinician: MatchResult; slot: string; mode: SessionMode
  meetLinkInput: string; onMeetLinkChange: (v: string) => void
  onConfirm: (m: PayMethod) => void; isLoading: boolean
  walletBalance?: WalletBalance | null; onBack: () => void
}> = ({ clinician, slot, mode, meetLinkInput, onMeetLinkChange, onConfirm, isLoading, walletBalance, onBack }) => {
  const [method, setMethod] = useState<PayMethod | null>(null)
  const [upiId,  setUpiId]  = useState('')
  const { time, date } = fmtSlot(slot)
  const amount = Math.round(clinician.score * 12)
  const MODES: Record<SessionMode, string> = { video: '📹 Video Call', voice: '📞 Voice Call', chat: '💬 Chat' }
  const OPTS: { id: PayMethod; icon: string; label: string; desc: string }[] = [
    { id: 'UPI',        icon: '⚡', label: 'UPI',                 desc: 'Instant via UPI ID'      },
    { id: 'Card',       icon: '💳', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
    { id: 'NetBanking', icon: '🏦', label: 'Net Banking',         desc: 'All major banks'         },
    { id: 'Wallet',     icon: '👜', label: 'Cognantic Wallet',
      desc: walletBalance ? `Bal: ₹${walletBalance.available.toFixed(0)}` : 'No wallet found' },
  ]

  const ProceedStepper = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
      {(['Clinician Profile', 'Booking Details', 'Payment'] as const).map((label, i) => (
        <React.Fragment key={label}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white' }}>{i < 2 ? '✓' : '3'}</div>
            <span style={{ fontSize: 12, fontWeight: i === 2 ? 700 : 500, color: i === 2 ? 'var(--charcoal)' : 'var(--n-400)' }}>{label}</span>
          </div>
          {i < 2 && <div style={{ width: 36, height: 2, background: 'var(--forest)' }} />}
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
        <BackBtn onClick={onBack} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36 }}>Payment Details</h2>
      </div>
      <ProceedStepper />

      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
          <Avatar name={clinician.clinicianName} size={56} src={clinician.avatarUrl} />
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 2 }}>{clinician.clinicianName}</h3>
            <p style={{ fontSize: 13, color: 'var(--n-500)' }}>{clinician.specialty}</p>
          </div>
        </div>
        <div style={{ background: 'var(--n-50)', borderRadius: 14, padding: '16px 18px' }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--n-400)', marginBottom: 12 }}>Booking Summary</p>
          {[{ l: 'Date', v: date }, { l: 'Time', v: time }, { l: 'Mode', v: MODES[mode] }, { l: 'Duration', v: '60 min' }].map(r => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: 'var(--n-500)' }}>{r.l}</span>
              <span style={{ fontWeight: 600, color: 'var(--charcoal)' }}>{r.v}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--n-200)', marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Total</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--forest)' }}>₹{amount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <label className="label" style={{ marginBottom: 10, display: 'block' }}>🔗 Meeting Link (Optional)</label>
        <input className="input" placeholder="https://zoom.us/j/... — leave blank for auto Zoom link"
          value={meetLinkInput} onChange={e => onMeetLinkChange(e.target.value)} />
        <p style={{ fontSize: 11, color: 'var(--n-300)', marginTop: 6 }}>If blank, a real Zoom link is auto-generated and appears in your dashboard.</p>
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 16 }}>Payment Method</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
          {OPTS.map(opt => {
            const walletInsuff = opt.id === 'Wallet' && (walletBalance?.available ?? 0) < amount
            return (
              <button key={opt.id} onClick={() => setMethod(opt.id)} style={{
                padding: '14px', borderRadius: 16, cursor: 'pointer', fontFamily: 'var(--font-sans)', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 10,
                border: `2px solid ${method === opt.id ? 'var(--forest)' : 'var(--n-200)'}`,
                background: method === opt.id ? 'rgba(57,120,106,0.06)' : 'white', transition: 'all 0.18s',
              }}>
                <span style={{ fontSize: 22 }}>{opt.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: method === opt.id ? 'var(--forest)' : 'var(--charcoal)' }}>{opt.label}</div>
                  <div style={{ fontSize: 11, marginTop: 1, color: walletInsuff ? 'var(--danger)' : 'var(--n-400)' }}>{opt.desc}</div>
                </div>
                {method === opt.id && <div style={{ marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%', background: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white', flexShrink: 0 }}>✓</div>}
              </button>
            )
          })}
        </div>
        {method === 'UPI' && (
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="label">Enter UPI ID</label>
            <input className="input" placeholder="yourname@upi" value={upiId} onChange={e => setUpiId(e.target.value)} />
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(57,120,106,0.06)', border: '1px solid rgba(57,120,106,0.14)', borderRadius: 12, padding: '12px 16px', fontSize: 12, color: 'var(--forest)' }}>
          <span style={{ fontSize: 16 }}>🔒</span>
          <span>Secured by <strong>256-bit SSL</strong>. Cognantic never stores card details.</span>
        </div>
      </div>

      <button className="btn btn-forest btn-full btn-lg" style={{ borderRadius: 22, letterSpacing: '0.1em', marginTop: 20 }}
        disabled={isLoading || !method || (method === 'Wallet' && (walletBalance?.available ?? 0) < amount)}
        onClick={() => method && onConfirm(method)}>
        {isLoading ? 'Processing...' : 'Confirm & Pay'}
      </button>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// STEP 7 – Success
// ═══════════════════════════════════════════════════════════════════
export const Step7Success: React.FC<{
  bookingResult: BookingResponse; selectedClinician: MatchResult; onBack: () => void
}> = ({ bookingResult, selectedClinician, onBack }) => (
  <div className="animate-scale-in" style={{ textAlign: 'center', paddingTop: 48 }}>
    <div style={{ width: 96, height: 96, background: 'rgba(57,120,106,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, margin: '0 auto 28px' }}>✓</div>
    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--charcoal)', marginBottom: 12 }}>Confirmed!</h3>
    <p style={{ color: 'var(--n-500)', fontSize: 15, maxWidth: 380, margin: '0 auto 12px', lineHeight: 1.65 }}>
      Your session with <strong>{selectedClinician.clinicianName}</strong> has been booked.
    </p>
    {bookingResult.confirmationCode && (
      <p style={{ fontSize: 12, color: 'var(--n-400)', marginBottom: 28 }}>
        Confirmation: <code style={{ fontWeight: 800, background: 'var(--n-50)', padding: '2px 8px', borderRadius: 6 }}>{bookingResult.confirmationCode}</code>
      </p>
    )}
    <div style={{ background: 'linear-gradient(135deg, rgba(57,120,106,0.08), rgba(57,120,106,0.04))', border: '1.5px solid rgba(57,120,106,0.2)', borderRadius: 24, padding: '28px 32px', maxWidth: 420, margin: '0 auto 32px', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div style={{ width: 48, height: 48, borderRadius: 16, background: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/></svg>
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--charcoal)', marginBottom: 2 }}>Zoom Session Link</div>
          <div style={{ fontSize: 12, color: 'var(--n-400)' }}>
            {bookingResult.meetLink ? 'Click "Join Session" when your session starts' : 'Available 15 mins before session starts'}
          </div>
        </div>
      </div>
      {bookingResult.meetLink ? (
        <>
          <div style={{ background: 'white', borderRadius: 14, padding: '12px 16px', marginBottom: 16, border: '1px solid var(--n-100)', fontFamily: 'monospace', fontSize: 12, color: 'var(--forest)', wordBreak: 'break-all' }}>
            {bookingResult.meetLink}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href={bookingResult.meetLink} target="_blank" rel="noreferrer"
              style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 16, fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', background: 'var(--forest)', color: 'white' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/></svg>
              Join Session
            </a>
            <button onClick={() => navigator.clipboard?.writeText(bookingResult.meetLink!)}
              style={{ flex: 1, padding: '13px', borderRadius: 16, fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', border: '1.5px solid var(--n-200)', color: 'var(--n-600)', cursor: 'pointer' }}>
              Copy
            </button>
          </div>
        </>
      ) : (
        <p style={{ fontSize: 12, color: 'var(--n-400)', textAlign: 'center', padding: '8px 0' }}>
          Your clinician will add the meeting link before the session.
        </p>
      )}
    </div>
    <button className="btn btn-primary btn-lg" onClick={onBack}>Go to Dashboard</button>
  </div>
)
````

## File: src/pages/patient/components/Shared.tsx
````typescript
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
````

## File: src/pages/patient/components/WalletCard.tsx
````typescript
import React from 'react'
import type {WalletBalance  } from '../../../types'
interface WalletCardProps {
  wallet: WalletBalance | null
  isLoading: boolean
  showTopUp: boolean
  setShowTopUp: (v: boolean) => void
  topUpAmount: string
  setTopUpAmount: (v: string) => void
  topUpLoading: boolean
  handleTopUp: (method: string) => void
}

const WalletCard: React.FC<WalletCardProps> = ({
  wallet, isLoading,
  showTopUp, setShowTopUp,
  topUpAmount, setTopUpAmount,
  topUpLoading, handleTopUp,
}) => {
  if (isLoading) return (
    <div className="card" style={{ padding: '20px 32px', marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--n-400)', fontSize: 13 }}>
        <div style={{ width: 18, height: 18, border: '2px solid var(--n-200)', borderTopColor: 'var(--forest)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        Loading wallet…
      </div>
    </div>
  )

  return (
    <div className="card" style={{ padding: '28px 32px', marginBottom: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h4 style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.01em', marginBottom: 4 }}>Session Wallet</h4>
          <p style={{ fontSize: 12, color: 'var(--n-400)' }}>
            {wallet ? 'Live balance · Escrow held for upcoming sessions' : 'No wallet yet — add funds to create one'}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--n-400)', marginBottom: 4 }}>Available Balance</p>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 36, lineHeight: 1,
            color: wallet ? (wallet.available >= 0 ? 'var(--forest)' : 'var(--danger)') : 'var(--n-300)',
            fontWeight: 800,
          }}>
            ${wallet ? wallet.available.toFixed(2) : '0.00'}
          </p>
        </div>
      </div>

      {/* Balance pills */}
      {wallet && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Total',    value: `$${wallet.balance.toFixed(2)}`,       color: 'var(--charcoal)' },
            { label: 'Escrow',   value: `$${wallet.escrowBalance.toFixed(2)}`, color: 'var(--warning)'  },
            { label: 'Available',value: `$${wallet.available.toFixed(2)}`,     color: 'var(--forest)'   },
          ].map(k => (
            <div key={k.label} style={{ flex: 1, background: 'var(--n-50)', borderRadius: 14, padding: '12px 16px', border: '1px solid var(--n-100)' }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--n-400)', marginBottom: 4 }}>{k.label}</p>
              <p style={{ fontWeight: 800, fontSize: 17, color: k.color }}>{k.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Transactions from real backend (recentTransactions[]) */}
      {wallet && wallet.recentTransactions.length > 0 && (
        <div style={{ borderTop: '1px solid var(--n-100)', paddingTop: 16, marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--n-400)', marginBottom: 12 }}>
            Recent Transactions
          </p>
          {wallet.recentTransactions.slice(0, 5).map((t, i) => (
            <div key={t.transactionId ?? i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--n-50)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: t.direction === 'Credit' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                  {t.direction === 'Credit' ? '↑' : '↓'}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 1 }}>{t.description ?? t.transactionType}</div>
                  <div style={{ fontSize: 11, color: 'var(--n-400)' }}>
                    {new Date(t.createdTime).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
              <span style={{ fontWeight: 700, fontSize: 14, color: t.direction === 'Credit' ? 'var(--success)' : 'var(--danger)' }}>
                {t.direction === 'Credit' ? '+' : '−'}${t.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      {wallet && wallet.recentTransactions.length === 0 && (
        <p style={{ fontSize: 13, color: 'var(--n-400)', textAlign: 'center', padding: '12px 0', marginBottom: 16 }}>No transactions yet.</p>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowTopUp(!showTopUp)}>+ Add Funds</button>
        <button className="btn btn-forest" style={{ flex: 2, borderRadius: 18 }}>💳 Auto-Pay: Active</button>
      </div>

      {/* Inline top-up */}
      {showTopUp && (
        <div style={{ marginTop: 16, padding: 20, background: 'var(--n-50)', borderRadius: 16, border: '1px solid var(--n-100)' }}>
          <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Add Funds to Wallet</p>
          <input className="input" type="number" min="1" placeholder="Amount (e.g. 500)"
            value={topUpAmount} onChange={e => setTopUpAmount(e.target.value)}
            style={{ marginBottom: 10 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 10 }}>
            {['UPI', 'Card', 'NetBanking'].map(m => (
              <button key={m} className="btn btn-outline btn-sm"
                disabled={topUpLoading || !topUpAmount || Number(topUpAmount) <= 0}
                onClick={() => handleTopUp(m)}>
                {topUpLoading ? '…' : m}
              </button>
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'var(--n-400)' }}>🔒 Secured by 256-bit SSL. Cognantic never stores card details.</p>
        </div>
      )}
    </div>
  )
}

export default WalletCard
````

## File: src/pages/patient/PatientPage.tsx
````typescript
// ─────────────────────────────────────────────────────────────────
// src/pages/patient/PatientPage.tsx
// Root – switches between Dashboard and Finder flow.
// ─────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import DashboardView from './components/DashboardView'
import FinderFlow    from './components/FinderFlow'

type Screen = 'dashboard' | 'finder'

const PatientPage: React.FC = () => {
  const [screen,     setScreen]     = useState<Screen>('dashboard')
  const [refreshKey, setRefreshKey] = useState(0)

  const handleBookingComplete = () => {
    setScreen('dashboard')
    setRefreshKey(k => k + 1)
  }

  if (screen === 'finder') {
    return <FinderFlow onBack={handleBookingComplete} />
  }

  return (
    <DashboardView
      onFindNew={() => setScreen('finder')}
      refreshKey={refreshKey}
    />
  )
}

export default PatientPage
````

## File: src/pages/therapist/components/ClinicianPatientRequests.tsx
````typescript
import React, { useState, useEffect } from 'react'
import clinicianService from '../../../services/ClinicianService'
import LoadingSpinner from '../../../components/LoadingSpinner'
import EmptyState from '../../../components/EmptyState'
import type { ClinicianPatientRequest } from '../../../types'

interface Props {
  clinicianId: string
}

const ClinicianPatientRequests: React.FC<Props> = ({ clinicianId }) => {
  const [requests,      setRequests]      = useState<ClinicianPatientRequest[]>([])
  const [isLoading,     setIsLoading]     = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [messages,      setMessages]      = useState<Record<string, string>>({})

  const load = () => {
    setIsLoading(true)
    clinicianService.getPatientRequests(clinicianId)
      .then(r  => { setRequests(r); setIsLoading(false) })
      .catch(() => setIsLoading(false))
  }

  useEffect(() => { if (clinicianId) load() }, [clinicianId])

  const handleAction = async (req: ClinicianPatientRequest, action: 'accept' | 'decline') => {
    setActionLoading(req.requestId)
    try {
      await clinicianService.handlePatientRequest(req.requestId, action)
      setMessages(m => ({
        ...m,
        [req.requestId]: action === 'accept'
          ? '✅ Patient accepted successfully.'
          : '↩️ Declined — returned to Admin for reassignment.',
      }))
      // refresh after short delay
      setTimeout(load, 1800)
    } catch (err) {
      setMessages(m => ({
        ...m,
        [req.requestId]: err instanceof Error ? err.message : 'Action failed.',
      }))
    } finally {
      setActionLoading(null)
    }
  }

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
      <LoadingSpinner />
    </div>
  )

  const pending = requests.filter(r => r.status === 'Pending')

  if (pending.length === 0) return (
    <div className="card animate-fade-up" style={{ padding: '48px 32px', textAlign: 'center' }}>
      <EmptyState
        icon="✅"
        title="No pending requests"
        subtitle="You'll be notified when new patient requests arrive."
      />
    </div>
  )

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>
          Patient Requests
        </h3>
        <p style={{ color: 'var(--n-400)', fontSize: 13 }}>
          Review and respond to new patient assignments. Declined requests are sent back to admin.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {pending.map(req => {
          const isBusy    = actionLoading === req.requestId
          const msgText   = messages[req.requestId]
          const isAccepted = req.status === 'Accepted'
          const isDeclined = req.status === 'Declined'

          return (
            <div
              key={req.requestId}
              className="card"
              style={{
                padding: '28px 32px',
                opacity: isAccepted || isDeclined ? 0.55 : 1,
                transition: 'opacity 0.3s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                {/* Avatar */}
                <div style={{
                  flexShrink: 0, width: 52, height: 52,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(57,120,106,0.15), rgba(57,120,106,0.05))',
                  border: '2px solid rgba(57,120,106,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 16, color: 'var(--forest)',
                }}>
                  {req.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--charcoal)' }}>
                      {req.patientName}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--n-400)' }}>{req.patientEmail}</span>
                    <span style={{
                      padding: '3px 10px', borderRadius: 'var(--r-full)',
                      background: 'rgba(57,120,106,0.08)',
                      color: 'var(--forest)', fontSize: 10, fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>
                      Pending
                    </span>
                  </div>

                  <p style={{
                    fontSize: 13, color: 'var(--n-500)', fontStyle: 'italic',
                    lineHeight: 1.65, marginBottom: 16,
                    borderLeft: '2px solid var(--sage)', paddingLeft: 14,
                  }}>
                    "{req.narrative}"
                  </p>

                  <div style={{
                    fontSize: 11, color: 'var(--n-300)',
                    textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20,
                  }}>
                    Received {new Date(req.requestedAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })}
                  </div>

                  {msgText ? (
                    <div style={{
                      fontSize: 13, color: msgText.startsWith('✅') ? 'var(--success)' : 'var(--n-500)',
                      fontWeight: 600,
                    }}>
                      {msgText}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button
                        className="btn btn-primary"
                        style={{ padding: '10px 24px', fontSize: 11, minWidth: 120 }}
                        onClick={() => handleAction(req, 'accept')}
                        disabled={isBusy}
                      >
                        {isBusy ? <LoadingSpinner size={14} /> : 'Accept'}
                      </button>
                      <button
                        className="btn btn-ghost"
                        style={{ padding: '10px 24px', fontSize: 11, minWidth: 120 }}
                        onClick={() => handleAction(req, 'decline')}
                        disabled={isBusy}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ClinicianPatientRequests
````

## File: src/pages/therapist/components/ClinicianRegistrationForm.tsx
````typescript
import React, { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import clinicianService from '../../../services/ClinicianService'
import LoadingSpinner from '../../../components/LoadingSpinner'

interface Props {
  onSuccess?: () => void
}

interface FormState {
  name:               string
  registrationNumber: string
  specialty:          string
  credential:         string
  experienceInYears:  string
  hourlyRate:         string
  bio:                string
  documentsUrl:       string
}

const SPECIALTIES = [
  'Clinical Psychology',
  'Cognitive Behavioural Therapy',
  'Psychiatry',
  'Counselling Psychology',
  'Child & Adolescent Psychology',
  'Neuropsychology',
  'Trauma & PTSD',
  'Addiction Counselling',
  'Other',
]

const CREDENTIALS = ['MD', 'PhD', 'MSc', 'MA', 'MPhil', 'PsyD', 'MBBS', 'Other']

const ClinicianRegistrationForm: React.FC<Props> = ({ onSuccess }) => {
  const { user } = useAuth()

  const [form, setForm] = useState<FormState>({
    name:               user?.name ?? '',
    registrationNumber: '',
    specialty:          '',
    credential:         '',
    experienceInYears:  '',
    hourlyRate:         '',
    bio:                '',
    documentsUrl:       '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error,     setError]     = useState<string | null>(null)
  const [success,   setSuccess]   = useState(false)

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async () => {
    setError(null)

    if (!form.name.trim())               return setError('Full name is required.')
    if (!form.registrationNumber.trim()) return setError('Registration number is required.')
    if (!form.specialty)                 return setError('Please select a specialty.')
    if (!form.credential)                return setError('Please select a credential.')
    if (!form.experienceInYears.trim())  return setError('Years of experience is required.')
    if (!form.hourlyRate.trim() || isNaN(Number(form.hourlyRate)) || Number(form.hourlyRate) <= 0)
      return setError('Enter a valid hourly rate.')
    if (!user?.id) return setError('You must be logged in.')

    setIsLoading(true)
    try {
      await clinicianService.register({
        userId:            user.id,
        name:              form.name.trim(),
        registrationNumber: form.registrationNumber.trim(),
        specialty:         form.specialty,
        credential:        form.credential,
        experienceInYears: form.experienceInYears.trim(),
        hourlyRate:        Number(form.hourlyRate),
        bio:               form.bio.trim() || undefined,
        documentsUrl:      form.documentsUrl.trim() || undefined,
      })
      setSuccess(true)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="card animate-scale-in" style={{ padding: '56px 48px', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
        <div style={{ fontSize: 52, marginBottom: 20 }}>🎉</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--charcoal)', marginBottom: 12 }}>
          Application Submitted
        </h3>
        <p style={{ color: 'var(--n-500)', fontSize: 14, lineHeight: 1.7, maxWidth: 380, margin: '0 auto 28px' }}>
          Your registration request has been sent to the admin team for review. You will be notified once your onboarding is approved.
        </p>
        <div style={{
          background: 'rgba(57,120,106,0.07)', borderRadius: 'var(--r-md)',
          padding: '16px 24px', border: '1px solid rgba(57,120,106,0.18)',
        }}>
          <p style={{ fontSize: 12, color: 'var(--forest)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Status: Pending Admin Approval
          </p>
        </div>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px',
    border: '1.5px solid var(--n-200)', borderRadius: 'var(--r-sm)',
    fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--charcoal)',
    background: 'var(--white)', outline: 'none',
    transition: 'border-color 0.2s',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 11, fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.1em',
    color: 'var(--n-500)', marginBottom: 8,
  }

  return (
    <div className="card animate-fade-up" style={{ padding: '44px 48px', maxWidth: 680, margin: '0 auto' }}>
      <div style={{ marginBottom: 36 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--charcoal)', marginBottom: 8 }}>
          Clinician Registration
        </h3>
        <p style={{ color: 'var(--n-400)', fontSize: 14 }}>
          Submit your details for admin review. Onboarding is completed once approved.
        </p>
      </div>

      {error && (
        <div style={{
          background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: 'var(--r-sm)', padding: '12px 16px',
          color: 'var(--danger)', fontSize: 13, marginBottom: 24,
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 24px' }}>

        {/* Full Name */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Full Name</label>
          <input
            style={inputStyle}
            value={form.name}
            onChange={set('name')}
            placeholder="Dr. Jane Smith"
          />
        </div>

        {/* Registration Number */}
        <div>
          <label style={labelStyle}>Registration Number</label>
          <input
            style={inputStyle}
            value={form.registrationNumber}
            onChange={set('registrationNumber')}
            placeholder="MCI-2024-XXXXX"
          />
        </div>

        {/* Credential */}
        <div>
          <label style={labelStyle}>Credential</label>
          <select style={inputStyle} value={form.credential} onChange={set('credential')}>
            <option value="">Select credential…</option>
            {CREDENTIALS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Specialty */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Specialty</label>
          <select style={inputStyle} value={form.specialty} onChange={set('specialty')}>
            <option value="">Select specialty…</option>
            {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Experience */}
        <div>
          <label style={labelStyle}>Years of Experience</label>
          <input
            style={inputStyle}
            type="number"
            min="0"
            value={form.experienceInYears}
            onChange={set('experienceInYears')}
            placeholder="e.g. 8"
          />
        </div>

        {/* Hourly Rate */}
        <div>
          <label style={labelStyle}>Hourly Rate (₹)</label>
          <input
            style={inputStyle}
            type="number"
            min="0"
            step="50"
            value={form.hourlyRate}
            onChange={set('hourlyRate')}
            placeholder="e.g. 2500"
          />
        </div>

        {/* Bio */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Bio / About (optional)</label>
          <textarea
            style={{ ...inputStyle, resize: 'vertical', minHeight: 96 }}
            value={form.bio}
            onChange={set('bio')}
            placeholder="Brief professional introduction…"
          />
        </div>

        {/* Documents URL */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Documents / Portfolio URL (optional)</label>
          <input
            style={inputStyle}
            value={form.documentsUrl}
            onChange={set('documentsUrl')}
            placeholder="https://drive.google.com/…"
          />
        </div>
      </div>

      {/* Notice */}
      <div style={{
        marginTop: 28, marginBottom: 28,
        background: 'rgba(57,120,106,0.06)', borderRadius: 'var(--r-sm)',
        padding: '14px 18px', border: '1px solid rgba(57,120,106,0.15)',
        display: 'flex', gap: 12, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 16, lineHeight: 1.3 }}>ℹ️</span>
        <p style={{ fontSize: 12, color: 'var(--n-600)', lineHeight: 1.65 }}>
          Your application will be reviewed by the Cognantic admin team. This includes credential
          verification and specialty vetting. You'll receive an email once the decision is made.
        </p>
      </div>

      <button
        className="btn btn-primary"
        style={{ width: '100%', padding: '15px 32px', fontSize: 12 }}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner size={16} /> : 'Submit Registration Request'}
      </button>
    </div>
  )
}

export default ClinicianRegistrationForm
````

## File: src/pages/therapist/components/EarningsView.tsx
````typescript
import React, { useState, useEffect } from 'react'
import sessionService  from '../../../services/SessionService'
import type {EarningsSummary } from '../../../types'
import walletService from '../../../services/WalletService'
import LoadingSpinner from '../../../components/LoadingSpinner'

interface Props { clinicianId: string }

const EarningsView: React.FC<Props> = ({ clinicianId }) => {
  const [earnings,        setEarnings]        = useState<EarningsSummary | null>(null)
  const [isLoading,       setIsLoading]       = useState(true)
  const [showWithdraw,    setShowWithdraw]    = useState(false)
  const [withdrawAmount,  setWithdrawAmount]  = useState('')
  const [payoutMethod,    setPayoutMethod]    = useState('UPI')
  const [payoutDetails,   setPayoutDetails]   = useState('')
  const [withdrawing,     setWithdrawing]     = useState(false)
  const [withdrawError,   setWithdrawError]   = useState<string | null>(null)
  const [withdrawSuccess, setWithdrawSuccess] = useState(false)

  useEffect(() => {
    if (!clinicianId) { setIsLoading(false); return }
    // GET /api/v1/Sessions/earnings/{clinicianId}
    sessionService.getEarnings(clinicianId)
      .then(e => { setEarnings(e); setIsLoading(false) })
      .catch(() => setIsLoading(false))
  }, [clinicianId])

  const handleWithdraw = async () => {
    if (!withdrawAmount || !payoutDetails || !clinicianId) return
    const amount = Number(withdrawAmount)
    if (amount <= 0) { setWithdrawError('Amount must be greater than zero.'); return }
    if ((earnings?.available ?? 0) < amount) {
      setWithdrawError(`Insufficient available balance (₹${earnings?.available?.toFixed(2) ?? 0}).`); return
    }
    setWithdrawing(true); setWithdrawError(null)
    try {
      // POST /api/v1/Wallet/withdraw  { clinicianId, amount, payoutMethod, payoutDetails }
      await walletService.requestWithdrawal({ clinicianId, amount, payoutMethod, payoutDetails })
      setWithdrawSuccess(true); setShowWithdraw(false)
      setWithdrawAmount(''); setPayoutDetails('')
      // Refresh earnings balance
      sessionService.getEarnings(clinicianId).then(setEarnings).catch(() => {})
    } catch (err) {
      setWithdrawError(err instanceof Error ? err.message : 'Withdrawal request failed.')
    } finally { setWithdrawing(false) }
  }

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><LoadingSpinner /></div>

  const grossEarned = earnings?.balance ?? 0
  const platformFee = Math.round(grossEarned * 0.1)
  const netPayout   = grossEarned - platformFee

  return (
    <div className="animate-fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

      {/* This Month Breakdown */}
      <div className="card" style={{ padding: '36px' }}>
        <h4 style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', marginBottom: 28 }}>This Month</h4>
        {withdrawSuccess && (
          <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>
            ✓ Withdrawal request submitted. Admin will process within 2–3 business days.
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { label: 'Gross Earnings',     value: `₹${grossEarned.toFixed(2)}`, color: 'var(--forest)'  },
            { label: 'Platform Fee (10%)', value: `−₹${platformFee.toFixed(2)}`, color: 'var(--danger)'  },
            { label: 'Net Payout',         value: `₹${netPayout.toFixed(2)}`,   color: 'var(--charcoal)'},
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--n-100)' }}>
              <span style={{ fontSize: 13, color: 'var(--n-500)', fontWeight: 500 }}>{r.label}</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: r.color }}>{r.value}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <button className="btn btn-forest btn-full" onClick={() => { setShowWithdraw(!showWithdraw); setWithdrawError(null) }}>
            💸 Request Payout
          </button>
        </div>

        {showWithdraw && (
          <div style={{ marginTop: 20, padding: 20, background: 'var(--n-50)', borderRadius: 16, border: '1px solid var(--n-100)' }}>
            <h4 style={{ fontWeight: 800, marginBottom: 16, fontSize: 15 }}>Request Withdrawal</h4>
            {withdrawError && (
              <div style={{ background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 10, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#dc2626' }}>
                {withdrawError}
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <label className="label">Amount (₹)</label>
                <input className="input" type="number" min="1" placeholder="Amount"
                  value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} />
              </div>
              <div>
                <label className="label">Method</label>
                <select className="input" value={payoutMethod} onChange={e => setPayoutMethod(e.target.value)}>
                  <option value="UPI">UPI</option>
                  <option value="BankTransfer">Bank Transfer</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label className="label">UPI ID / Account Number</label>
              <input className="input" placeholder="yourname@upi" value={payoutDetails} onChange={e => setPayoutDetails(e.target.value)} />
            </div>
            <button className="btn btn-forest btn-full"
              disabled={withdrawing || !withdrawAmount || !payoutDetails}
              onClick={handleWithdraw}>
              {withdrawing ? 'Submitting…' : 'Submit Request'}
            </button>
          </div>
        )}
      </div>

      {/* Payout status card */}
      <div className="card card-dark" style={{ padding: '36px' }}>
        <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.35, marginBottom: 20 }}>Payout Status</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: 'white', lineHeight: 1, marginBottom: 8 }}>
          ₹{netPayout.toFixed(0)}
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 32 }}>
          Processing · Next Friday
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { l: 'Sessions',    v: String(earnings?.transactions?.length ?? 0)  },
            { l: 'Avg/Session', v: '₹150' },
            { l: 'Completion',  v: '96%'  },
            { l: 'Rating',      v: '4.9/5'},
          ].map(k => (
            <div key={k.l} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.06)', borderRadius: 16 }}>
              <div style={{ fontSize: 9, opacity: 0.4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>{k.l}</div>
              <div style={{ fontWeight: 800, fontSize: 18, color: 'white' }}>{k.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Session Wallet Ledger — real credit transactions from GET /Sessions/earnings */}
      <div className="card" style={{ padding: '32px 36px', gridColumn: '1 / -1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h4 style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em', marginBottom: 4 }}>Session Wallet</h4>
            <p style={{ fontSize: 12, color: 'var(--n-400)' }}>Live ledger · session payouts credited after completion · 10% platform fee</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--n-400)', marginBottom: 4 }}>Available Payout</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: (earnings?.available ?? 0) > 0 ? 'var(--forest)' : 'var(--n-400)', lineHeight: 1 }}>
              ₹{earnings?.available?.toFixed(0) ?? '0'}
            </div>
          </div>
        </div>

        {!earnings?.transactions || earnings.transactions.length === 0 ? (
          <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--n-400)', fontSize: 13 }}>No sessions yet — ledger is empty.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--n-100)', paddingTop: 16 }}>
            {earnings.transactions.map((t, i) => (
              <div key={t.transactionId ?? i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--n-50)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>↑</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 1 }}>{t.description ?? t.transactionType}</div>
                    {t.createdTime && <div style={{ fontSize: 11, color: 'var(--n-400)' }}>{new Date(t.createdTime).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</div>}
                  </div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--success)' }}>+₹{t.amount.toFixed(2)}</div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 0', marginTop: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--n-600)' }}>Total Earned</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--forest)' }}>₹{earnings.balance.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => alert('Payout history export coming in Phase 2.')}>
            Export Ledger
          </button>
          <button className="btn btn-forest" style={{ flex: 2, borderRadius: 18 }}
            onClick={() => alert('Auto-settlement is active. Earnings are processed every Friday.')}>
            💳 Auto-Settlement: Active
          </button>
        </div>
      </div>
    </div>
  )
}

export default EarningsView
````

## File: src/pages/therapist/components/PatientList.tsx
````typescript
import React, { useState } from 'react'
import type { PendingMatchDto } from '../../../types'

interface Props {
  pendingMatches: PendingMatchDto[]
  isLoading:      boolean
}

const PatientList: React.FC<Props> = ({ pendingMatches, isLoading }) => {
  const [accepted, setAccepted] = useState<string[]>([])
  const [declined, setDeclined] = useState<string[]>([])

  if (isLoading) return (
    <div style={{ textAlign: 'center', padding: 40, color: 'var(--n-400)' }}>Loading requests…</div>
  )

  if (pendingMatches.length === 0) return (
    <div className="card" style={{ padding: '48px 32px', textAlign: 'center' }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
      <h4 style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>All clear</h4>
      <p style={{ color: 'var(--n-400)', fontSize: 13 }}>No pending patient requests right now.</p>
    </div>
  )

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', marginBottom: 4 }}>New Patient Requests</h3>
        <p style={{ color: 'var(--n-400)', fontSize: 13 }}>Review patient narratives and accept or decline matches.</p>
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Narrative</th>
              <th>Match</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingMatches.map(m => {
              const isAcc = accepted.includes(m.matchId)
              const isDec = declined.includes(m.matchId)
              return (
                <tr key={m.matchId} style={{ opacity: isAcc || isDec ? 0.45 : 1 }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(57,120,106,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, color: 'var(--forest)' }}>
                        {m.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{m.patientName}</div>
                        <div style={{ fontSize: 11, color: 'var(--n-400)' }}>{m.requestedSlot}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ maxWidth: 360 }}>
                    <p style={{ fontSize: 12, color: 'var(--n-500)', fontStyle: 'italic', lineHeight: 1.6 }}>
                      "{m.patientNarrativeSnippet}"
                    </p>
                    {m.matchReason && <p style={{ fontSize: 11, color: 'var(--n-400)', marginTop: 4 }}>Reason: {m.matchReason}</p>}
                  </td>
                  <td>
                    {/* matchScore is 0.0–1.0 from backend */}
                    <span className="badge badge-live" style={{ fontSize: 11 }}>
                      {Math.round(m.matchScore * 100)}% Match
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {isAcc ? (
                      <span className="badge badge-live" style={{ padding: '8px 14px' }}>✓ Accepted</span>
                    ) : isDec ? (
                      <span className="badge badge-red" style={{ padding: '8px 14px' }}>✕ Declined</span>
                    ) : (
                      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                        <button className="btn btn-outline btn-sm" onClick={() => setDeclined(p => [...p, m.matchId])}>Decline</button>
                        <button className="btn btn-forest btn-sm" onClick={() => setAccepted(p => [...p, m.matchId])}>Accept</button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PatientList
````

## File: src/pages/therapist/components/ScheduleManager.tsx
````typescript
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
````

## File: src/pages/therapist/components/StatsOverView.tsx
````typescript
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
````

## File: src/pages/therapist/TherapistPage.tsx
````typescript
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
````

## File: src/services/AdminService.ts
````typescript
import apiClient from '../lib/api/apiClient'
import type {
  AdminStatsResponse,
  VettingItem,
  VettingActionResponse,
  WithdrawalRequestDto,
  WithdrawalActionResponse,
} from '../types'

const adminService = {
  getStats: (): Promise<AdminStatsResponse> =>
    apiClient.get('/Admin/stats'),

  getVettingList: (pendingOnly = true): Promise<VettingItem[]> =>
    apiClient.get('/Admin/vetting-list', { params: { pendingOnly } }),

  processVettingAction: (
    clinicianId: string,
    approve:     boolean,
    remarks?:    string,
  ): Promise<VettingActionResponse> =>
    apiClient.post('/Admin/vetting-action', { clinicianId, approve, remarks }),

  // ── Withdrawal request management ─────────────────────────────
  getWithdrawalRequests: (pendingOnly = true): Promise<WithdrawalRequestDto[]> =>
    apiClient.get('/Admin/withdrawal-requests', { params: { pendingOnly } }),

  processWithdrawalAction: (
    withdrawalId: string,
    approve:      boolean,
    adminNotes?:  string,
  ): Promise<WithdrawalActionResponse> =>
    apiClient.post('/Admin/withdrawal-action', { withdrawalId, approve, adminNotes }),
}

export default adminService
````

## File: src/services/AuthService.ts
````typescript
// src/services/AuthService.ts
// Routes: api/v1/Auth/*  (AuthController)
//
// POST /api/v1/Auth/login          { email, password }
// POST /api/v1/Auth/register       { fullName, email, password, role }
// POST /api/v1/Auth/forgot-password { email }  → OTP sent by email; token NOT in response
// POST /api/v1/Auth/reset-password  { email, token, newPassword }

import apiClient from '../lib/api/apiClient'
import type {
  LoginResponse,
  RegisterResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from '../types'

const authService = {
  login: (email: string, password: string): Promise<LoginResponse> =>
    apiClient.post('/Auth/login', { email, password }),

  register: (
    fullName: string,
    email:    string,
    password: string,
    role:     string,
  ): Promise<RegisterResponse> =>
    apiClient.post('/Auth/register', { fullName, email, password, role }),

  forgotPassword: (email: string): Promise<ForgotPasswordResponse> =>
    apiClient.post('/Auth/forgot-password', { email }),

  resetPassword: (
    email:       string,
    token:       string,
    newPassword: string,
  ): Promise<ResetPasswordResponse> =>
    apiClient.post('/Auth/reset-password', { email, token, newPassword }),
}

export default authService
````

## File: src/services/ClinicianService.ts
````typescript
// src/services/ClinicianService.ts
//
// ClinicianController → api/v1/Clinician
//   GET  /api/v1/Clinician/{id}/slots?date=           → List<AvailableSlotResponse>
//   GET  /api/v1/Clinician/planner/{id}               → GetPlannerResponse
//   POST /api/v1/Clinician/register                   → ClinicianRegistrationResponse
//   GET  /api/v1/Clinician/{id}/patient-requests      → ClinicianPatientRequest[]
//   POST /api/v1/Clinician/request-action             → ClinicianRequestActionResponse

import apiClient from '../lib/api/apiClient'
import type {
  SlotResponse,
  PlannerResponse,
  ClinicianRegistrationRequest,
  ClinicianRegistrationResponse,
  ClinicianPatientRequest,
  ClinicianRequestActionResponse,
} from '../types'

const clinicianService = {
  getSlots: (clinicianId: string, date: string): Promise<SlotResponse[]> =>
    apiClient.get(`/Clinician/${clinicianId}/slots`, { params: { date } }),

  getPlanner: (clinicianId: string): Promise<PlannerResponse> =>
    apiClient.get(`/Clinician/planner/${clinicianId}`),

  // ── Registration ──────────────────────────────────────────────
  register: (body: ClinicianRegistrationRequest): Promise<ClinicianRegistrationResponse> =>
    apiClient.post('/Clinician/register', body),

  // ── Patient requests assigned to this clinician ────────────────
  getPatientRequests: (clinicianId: string): Promise<ClinicianPatientRequest[]> =>
    apiClient.get(`/Clinician/${clinicianId}/patient-requests`),

  // action: 'accept' | 'decline'
  handlePatientRequest: (
    requestId: string,
    action:    'accept' | 'decline',
  ): Promise<ClinicianRequestActionResponse> =>
    apiClient.post('/Clinician/request-action', { requestId, action }),
}

export default clinicianService
````

## File: src/services/PatientService.ts
````typescript
// src/services/PatientService.ts
//
// PatientController  → api/v1/Patient
//   POST /api/v1/Patient/intake              { id, language, ageGroup, location, sessionMode, narrative, initialResilienceScore }
//   GET  /api/v1/Patient/dashboard/{userId}
//
// MatchController    → api/v1/Match
//   POST /api/v1/Match/find                  { patientId }  → List<MatchResponse>
//
// ClinicianController → api/v1/Clinician
//   GET  /api/v1/Clinician/{id}/slots?date=  → List<AvailableSlotResponse>
//   Note: date param must be a full ISO DateTime string

import apiClient from '../lib/api/apiClient'
import type {
  IntakeRequest,
  IntakeResponse,
  DashboardResponse,
  MatchResult,
  SlotResponse,
} from '../types'

const patientService = {
  getDashboard: (userId: string): Promise<DashboardResponse> =>
    apiClient.get(`/Patient/dashboard/${userId}`),

  submitIntake: (payload: IntakeRequest): Promise<IntakeResponse> =>
    apiClient.post('/Patient/intake', payload),

  // patientId = User.Id (backend resolves to Patient.Id internally)
  findMatches: (patientId: string): Promise<MatchResult[]> =>
    apiClient.post('/Match/find', { patientId }),

  // date must be a full ISO datetime string e.g. "2026-04-03T00:00:00.000Z"
  getClinicianSlots: (clinicianId: string, date: string): Promise<SlotResponse[]> =>
    apiClient.get(`/Clinician/${clinicianId}/slots`, { params: { date } }),
}

export default patientService
````

## File: src/services/SessionService.ts
````typescript
import apiClient from '../lib/api/apiClient'
import type {
  BookingRequest,
  BookingResponse,
  UpcomingSession,
  SessionEndResult,
  EarningsSummary,
} from '../types'

const sessionService = {
  // Backend auto-creates Zoom link if meetLink is absent
  book: (body: BookingRequest): Promise<BookingResponse> =>
    apiClient.post('/Sessions/book', {
      patientId:   body.patientId,
      clinicianId: body.clinicianId,
      sessionDate: body.sessionDate,
      amount:      body.amount,
      notes:       body.notes ?? null,
      meetLink:    body.meetLink ?? null,
    }),

  getUpcoming: (patientId: string): Promise<UpcomingSession[]> =>
    apiClient.get(`/Sessions/upcoming/${patientId}`),

  // PATCH body: { meetLink }
  updateMeetLink: (sessionId: string, meetLink: string): Promise<void> =>
    apiClient.patch(`/Sessions/${sessionId}/meet-link`, { meetLink }),

  // POST body: { clinicianId }
  startSession: (sessionId: string, clinicianId: string): Promise<void> =>
    apiClient.post(`/Sessions/${sessionId}/start`, { clinicianId }),

  // POST body: { clinicianId }
  endSession: (sessionId: string, clinicianId: string): Promise<SessionEndResult> =>
    apiClient.post(`/Sessions/${sessionId}/end`, { clinicianId }),

  getEarnings: (clinicianId: string): Promise<EarningsSummary> =>
    apiClient.get(`/Sessions/earnings/${clinicianId}`),
}

export default sessionService
````

## File: src/services/WalletService.ts
````typescript
import apiClient from '../lib/api/apiClient'
import type { WalletBalance, TopUpResponse, WithdrawResponse } from '../types'

const walletService = {
  getBalance: (userId: string): Promise<WalletBalance> =>
    apiClient.get(`/Wallet/balance/${userId}`),

  topUp: (body: {
    userId:            string
    amount:            number
    paymentMethod:     string
    gatewayReference?: string
  }): Promise<TopUpResponse> =>
    apiClient.post('/Wallet/topup', body),

  requestWithdrawal: (body: {
    clinicianId:   string
    amount:        number
    payoutMethod:  string
    payoutDetails: string
  }): Promise<WithdrawResponse> =>
    apiClient.post('/Wallet/withdraw', body),
}

export default walletService
````

## File: src/styles/global.css
````css
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');

/* ───────────────────────────── DESIGN TOKENS */
:root {
  /* Brand */
  --sage:        #9AA57B;
  --sage-light:  #D6EEF0;
  --forest:      #39786A;
  --forest-dark: #2a5f54;
  --cream:       #DFD8BE;
  --cream-bg:    #F7F6F2;
  --white:       #FFFFFF;
  --charcoal:    #1C1C1E;

  /* Neutrals */
  --n-50:  #F8FAFC;
  --n-100: #F1F5F9;
  --n-200: #E2E8F0;
  --n-300: #CBD5E1;
  --n-400: #94A3B8;
  --n-500: #64748B;
  --n-600: #475569;
  --n-700: #334155;
  --n-900: #0F172A;

  /* Semantic */
  --success: #10B981;
  --warning: #F59E0B;
  --danger:  #EF4444;
  --info:    #3B82F6;
  --purple:  #8B5CF6;

  /* Typography */
  --font-sans:    'Sora', sans-serif;
  --font-display: 'DM Serif Display', serif;

  /* Radii */
  --r-sm:  10px;
  --r-md:  18px;
  --r-lg:  28px;
  --r-xl:  40px;
  --r-full: 9999px;

  /* Shadows */
  --shadow-sm:  0 1px 4px rgba(28,28,30,0.06);
  --shadow-md:  0 4px 16px rgba(28,28,30,0.08);
  --shadow-lg:  0 12px 40px rgba(28,28,30,0.12);
  --shadow-forest: 0 8px 24px -4px rgba(57,120,106,0.35);
}

/* ───────────────────────────── RESET */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: var(--font-sans);
  background-color: var(--cream-bg);
  color: var(--charcoal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
}

/* ───────────────────────────── LAYOUT */
.app-root { min-height: 100vh; }

.content-viewport {
  padding-top: 80px;
  min-height: 100vh;
  animation: fadeUp 0.35s ease;
}

.page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 52px 44px 96px;
}

@media (max-width: 1024px) { .page { padding: 40px 28px 80px; } }
@media (max-width: 640px)  { .page { padding: 28px 16px 60px; } }

/* ───────────────────────────── ANIMATIONS */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.94); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes pulseDot {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.25; }
}

.animate-fade-up     { animation: fadeUp 0.35s ease both; }
.animate-fade-in     { animation: fadeIn 0.25s ease both; }
.animate-scale-in    { animation: scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both; }
.animate-slide-right { animation: slideInRight 0.35s cubic-bezier(0.16,1,0.3,1) both; }
.pulse               { animation: pulseDot 2s ease infinite; }

/* ───────────────────────────── GLASS HEADER */
.glass-header {
  background: rgba(247, 246, 242, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(154, 165, 123, 0.18);
}

/* ───────────────────────────── CARD */
.card {
  background: var(--white);
  border: 1px solid var(--n-200);
  border-radius: var(--r-lg);
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1),
              box-shadow 0.3s cubic-bezier(0.4,0,0.2,1),
              border-color 0.3s ease;
}
.card.hoverable:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: var(--sage);
}

/* ───────────────────────────── BUTTONS */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: var(--r-md);
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  padding: 13px 28px;
}
.btn:disabled { opacity: 0.35; cursor: not-allowed; pointer-events: none; }

.btn-primary {
  background: var(--charcoal);
  color: var(--white);
}
.btn-primary:hover {
  background: var(--forest);
  transform: translateY(-1px);
  box-shadow: var(--shadow-forest);
}

.btn-forest {
  background: var(--forest);
  color: var(--white);
}
.btn-forest:hover {
  background: var(--forest-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-forest);
}

.btn-outline {
  background: transparent;
  color: var(--n-600);
  border: 1.5px solid var(--n-200);
}
.btn-outline:hover {
  border-color: var(--sage);
  color: var(--forest);
  background: rgba(154,165,123,0.06);
}

.btn-ghost {
  background: transparent;
  color: var(--n-400);
  padding: 10px 16px;
}
.btn-ghost:hover { color: var(--charcoal); }

.btn-danger {
  background: var(--danger);
  color: var(--white);
}
.btn-danger:hover { background: #dc2626; transform: translateY(-1px); }

.btn-lg { padding: 18px 44px; font-size: 12px; border-radius: 24px; }
.btn-sm { padding: 9px 18px; font-size: 10px; border-radius: 12px; }
.btn-full { width: 100%; }

/* ───────────────────────────── FORM */
.input {
  width: 100%;
  padding: 15px 20px;
  border-radius: var(--r-md);
  background: var(--n-50);
  border: 1.5px solid var(--n-100);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--charcoal);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  appearance: none;
}
.input:focus {
  border-color: var(--forest);
  box-shadow: 0 0 0 4px rgba(57,120,106,0.1);
  background: var(--white);
}
.input::placeholder { color: var(--n-400); font-weight: 400; }

.label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--n-400);
  margin-bottom: 8px;
}

.form-group { display: flex; flex-direction: column; gap: 6px; }

/* ───────────────────────────── OVERLAY */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(28, 28, 30, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 24px;
  animation: fadeIn 0.2s ease;
}

/* ───────────────────────────── TABS */
.tab-nav {
  display: flex;
  align-items: center;
  border-bottom: 1.5px solid var(--n-200);
  margin-bottom: 40px;
  overflow-x: auto;
}
.tab-nav::-webkit-scrollbar { display: none; }

.tab-btn {
  flex-shrink: 0;
  padding: 0 0 18px 0;
  margin-right: 36px;
  background: none;
  border: none;
  border-bottom: 2.5px solid transparent;
  margin-bottom: -1.5px;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 700;
  color: var(--n-400);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.tab-btn:hover { color: var(--charcoal); }
.tab-btn.active { color: var(--forest); border-bottom-color: var(--forest); }

/* ───────────────────────────── BADGES */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.badge-forest  { background: rgba(57,120,106,0.12); color: var(--forest); }
.badge-sage    { background: rgba(154,165,123,0.18); color: #6b7a55; }
.badge-amber   { background: rgba(245,158,11,0.12);  color: #92400e; }
.badge-red     { background: rgba(239,68,68,0.1);    color: #b91c1c; }
.badge-blue    { background: rgba(59,130,246,0.1);   color: #1d4ed8; }
.badge-purple  { background: rgba(139,92,246,0.1);   color: #6d28d9; }
.badge-live    { background: rgba(16,185,129,0.12);  color: #065f46; }

/* ───────────────────────────── DATA TABLE */
.data-table { width: 100%; border-collapse: collapse; }
.data-table thead tr { background: var(--n-50); }
.data-table th {
  padding: 14px 28px;
  text-align: left;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--n-400);
}
.data-table tbody tr { border-top: 1px solid var(--n-100); transition: background 0.15s; }
.data-table tbody tr:hover { background: rgba(154,165,123,0.04); }
.data-table td { padding: 24px 28px; vertical-align: middle; }

/* ───────────────────────────── PROGRESS */
.progress-bar { height: 6px; background: var(--n-100); border-radius: var(--r-full); overflow: hidden; }
.progress-fill { height: 100%; background: var(--forest); border-radius: var(--r-full); transition: width 0.7s cubic-bezier(0.4,0,0.2,1); }

/* ───────────────────────────── SLOT BUTTON */
.slot-btn {
  padding: 18px 12px;
  border-radius: 20px;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 14px;
  border: 2px solid var(--n-100);
  background: var(--n-50);
  color: var(--n-600);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}
.slot-btn:hover  { border-color: var(--forest); color: var(--forest); background: rgba(57,120,106,0.04); }
.slot-btn.active { border-color: var(--forest); background: var(--forest); color: white; box-shadow: 0 6px 18px -4px rgba(57,120,106,0.45); }

/* ───────────────────────────── DAY PILL */
.day-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 10px;
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1.5px solid var(--n-200);
  background: var(--white);
  min-width: 72px;
}
.day-pill:hover  { border-color: var(--sage); }
.day-pill.active { background: var(--forest); border-color: var(--forest); }

/* ───────────────────────────── STAT CARD ACCENTS */
.accent-forest { border-left: 4px solid var(--forest) !important; }
.accent-sage   { border-left: 4px solid var(--sage) !important; }
.accent-warning{ border-left: 4px solid var(--warning) !important; }
.accent-success{ border-left: 4px solid var(--success) !important; }
.accent-purple { border-left: 4px solid var(--purple) !important; }
.card-dark     { background: var(--charcoal) !important; border-color: var(--charcoal) !important; }

/* ───────────────────────────── SCROLLBAR HIDE */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

/* ───────────────────────────── DIVIDER */
.divider { height: 1px; background: var(--n-100); margin: 0; }

/* ───────────────────────────── MONO LOG */
.log-line {
  display: flex;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--n-50);
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: var(--n-500);
  align-items: flex-start;
}
.log-time { min-width: 148px; color: var(--n-400); }
.log-type { min-width: 48px; font-weight: 800; }
````

## File: src/types/app.ts
````typescript
export type ViewType = 'home' | 'patient' | 'therapist' | 'admin'
export type AuthRole = 'patient' | 'therapist'
export type AuthMode = 'login' | 'register' | 'forgot'
````

## File: src/types/index.ts
````typescript
// ── Auth ──────────────────────────────────────────────────────────
export interface UserProfileDto {
  id:        string
  name:      string
  email:     string
  role:      string
  avatarUrl?: string | null
}
export interface LoginResponse   { token: string; refreshToken: string; user: UserProfileDto }
export interface RegisterResponse { id: string; message: string }
export interface ForgotPasswordResponse { message: string }
export interface ResetPasswordResponse  { message: string }
export interface AuthUser { id: string; name: string; email: string; role: string; avatarUrl?: string | null }

// ── Patient Dashboard ──────────────────────────────────────────────
export interface ActiveClinicianDto {
  clinicianId:     string
  clinicianName:   string
  specialty:       string
  avatarUrl:       string
  sessionType:     string
  nextSessionDate: string | null
}
export interface SessionSummaryDto {
  sessionId:     string
  clinicianName: string
  sessionType:   string
  sessionDate:   string
  status:        string
}
export interface DashboardMatchDto {
  clinicianId:   string
  clinicianName: string
  matchScore:    number
  specialty:     string
  avatarUrl:     string
}
export interface DashboardResponse {
  fullName:         string
  mrNo:             string
  currentStep:      string
  resilienceScore:  number
  activeClinician:  ActiveClinicianDto | null
  upcomingSessions: SessionSummaryDto[]
  pastSessions:     SessionSummaryDto[]
  recentMatches:    DashboardMatchDto[]
}

// ── Intake ────────────────────────────────────────────────────────
export interface IntakeRequest {
  id:                     string
  language:               string
  ageGroup:               string
  location:               string
  sessionMode:            string
  narrative:              string
  initialResilienceScore: number
}
export interface IntakeResponse {
  patientId:   string
  mrNo:        string
  status:      string
  submittedAt: string
}

// ── Matching ──────────────────────────────────────────────────────
export interface MatchResult {
  matchId:       string
  clinicianId:   string
  clinicianName: string
  specialty:     string
  avatarUrl:     string
  score:         number
  reason:        string
}

// ── Slots ─────────────────────────────────────────────────────────
export interface SlotResponse {
  startTime:   string
  endTime:     string
  isAvailable: boolean
  isBooked:    boolean
}

// ── Session Booking ───────────────────────────────────────────────
export interface BookingRequest {
  patientId:   string
  clinicianId: string
  sessionDate: string
  amount:      number
  notes?:      string
  meetLink?:   string
}
export interface BookingResponse {
  sessionId:        string
  status:           string
  confirmationCode: string
  meetLink?:        string | null
}

// ── Upcoming Sessions ─────────────────────────────────────────────
export interface UpcomingSession {
  sessionId:         string
  sessionDate:       string
  sessionType:       string
  status:            string
  meetLink?:         string | null
  confirmationCode?: string | null
  clinicianName:     string
  amount:            number
}

// ── Session End ───────────────────────────────────────────────────
export interface SessionEndResult {
  sessionId:       string
  overtimeMinutes: number
  overtimeCharged: number
  baseAmount:      number
  totalCharged:    number
  message:         string
}

// ── Clinician Planner ─────────────────────────────────────────────
export interface PlannerSessionDto {
  sessionId:   string
  patientName: string
  time:        string
  sessionType: string
  status:      string
  notes:       string | null
}
export interface PendingMatchDto {
  matchId:                 string
  patientId:               string
  patientName:             string
  patientNarrativeSnippet: string
  matchScore:              number
  matchReason:             string
  requestedSlot:           string
}
export interface PlannerResponse {
  clinicianId:         string
  clinicianName:       string
  specialty:           string
  totalSessionsToday:  number
  pendingRequestCount: number
  todaysSchedule:      PlannerSessionDto[]
  pendingMatches:      PendingMatchDto[]
}

// ── Wallet ────────────────────────────────────────────────────────
export interface WalletTransactionDto {
  transactionId:   string
  transactionType: string
  direction:       string
  amount:          number
  balanceAfter:    number
  description:     string | null
  createdTime:     string
}
export interface WalletBalance {
  walletId:           string
  balance:            number
  escrowBalance:      number
  available:          number
  recentTransactions: WalletTransactionDto[]
}
export interface TopUpResponse {
  walletId:      string
  newBalance:    number
  transactionId: string
}
export interface WithdrawResponse {
  withdrawalId: string
  amount:       number
  status:       string
  message:      string
}

// ── Earnings ──────────────────────────────────────────────────────
export interface EarningTransactionDto {
  transactionId:   string
  transactionType: string
  amount:          number
  description:     string | null
  createdTime:     string
}
export interface EarningsSummary {
  balance:       number
  escrowBalance: number
  available:     number
  transactions:  EarningTransactionDto[]
}

// ── Admin ─────────────────────────────────────────────────────────
export interface AdminStatsResponse {
  totalPatients:     number
  totalClinicians:   number
  totalSessions:     number
  totalRevenue:      number
  newUsersThisMonth: number
  averageMatchScore: number
  sessionsByStatus:  Record<string, number>
}
export interface VettingItem {
  clinicianId:    string
  name:           string
  email:          string
  specialization: string
  credential:     string
  documentsUrl:   string
  appliedDate:    string
  vettingStatus:  string
  isVetted:       boolean
}
export interface VettingActionResponse {
  status:      string
  processedAt: string
}

// ── Clinician Registration ────────────────────────────────────────
export interface ClinicianRegistrationRequest {
  userId:            string
  name:              string
  registrationNumber: string
  specialty:         string
  credential:        string
  experienceInYears: string
  hourlyRate:        number
  bio?:              string
  documentsUrl?:     string
}
export interface ClinicianRegistrationResponse {
  clinicianId: string
  status:      string
  message:     string
}

// ── Clinician Request (patient → clinician assignment) ────────────
export interface ClinicianPatientRequest {
  requestId:    string
  patientId:    string
  patientName:  string
  patientEmail: string
  narrative:    string
  requestedAt:  string
  status:       string   // "Pending" | "Accepted" | "Declined"
}
export interface ClinicianRequestActionResponse {
  requestId:   string
  status:      string
  processedAt: string
}

// ── Withdrawal Request (Admin view) ──────────────────────────────
export interface WithdrawalRequestDto {
  withdrawalId:   string
  clinicianId:    string
  clinicianName:  string
  amount:         number
  payoutMethod:   string
  payoutDetails:  string
  status:         string   // "Pending" | "Transferred" | "Rejected"
  adminNotes?:    string
  processedAt?:   string
  createdTime:    string
}
export interface WithdrawalActionResponse {
  withdrawalId: string
  status:       string
  processedAt:  string
}

// ── App-level types ───────────────────────────────────────────────
export type ViewType = 'home' | 'patient' | 'therapist' | 'admin'
export type AuthRole = 'patient' | 'therapist'
````

## File: tsconfig.json
````json
{
  "compilerOptions": {
    "types": ["node","vite/client"],
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
````

## File: tsconfig.node.json
````json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
````

## File: vite.config.ts
````typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
````
