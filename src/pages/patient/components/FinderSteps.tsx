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