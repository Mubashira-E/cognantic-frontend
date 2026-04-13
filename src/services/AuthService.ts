// src/services/AuthService.ts
// Routes: api/v1/Auth/*  (AuthController)
//
// POST /api/v1/Auth/login          { email, password }
// POST /api/v1/Auth/register       { fullName, email, password, role }
// POST /api/v1/Auth/forgot-password { email }  → OTP sent by email; token NOT in response
// POST /api/v1/Auth/reset-password  { email, token, newPassword }

import apiClient from '../lib/api/apiClient'
import type {
  LoginResponse,
  RegisterResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from '../types'

const authService = {
  login: (email: string, password: string): Promise<LoginResponse> =>
    apiClient.post('/Auth/login', { email, password }),

  register: (
    fullName: string,
    email:    string,
    password: string,
    role:     string,
  ): Promise<RegisterResponse> =>
    apiClient.post('/Auth/register', { fullName, email, password, role }),

  forgotPassword: (email: string): Promise<ForgotPasswordResponse> =>
    apiClient.post('/Auth/forgot-password', { email }),

  resetPassword: (
    email:       string,
    token:       string,
    newPassword: string,
  ): Promise<ResetPasswordResponse> =>
    apiClient.post('/Auth/reset-password', { email, token, newPassword }),
}

export default authService
