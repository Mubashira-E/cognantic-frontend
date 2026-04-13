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