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