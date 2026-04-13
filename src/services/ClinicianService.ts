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
