

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
