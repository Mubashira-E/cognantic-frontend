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
