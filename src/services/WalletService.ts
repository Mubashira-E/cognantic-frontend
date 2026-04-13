
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
