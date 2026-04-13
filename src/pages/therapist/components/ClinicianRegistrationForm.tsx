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