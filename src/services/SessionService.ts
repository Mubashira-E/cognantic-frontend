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
