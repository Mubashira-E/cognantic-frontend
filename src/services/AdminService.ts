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