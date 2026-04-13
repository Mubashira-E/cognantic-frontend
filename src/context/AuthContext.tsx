
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import authService from '../services/AuthService'
import type { AuthUser, ForgotPasswordResponse } from '../types'

export const setToken   = (t: string) => localStorage.setItem('cognantic_token', t)
export const clearToken = () => {
  ['cognantic_token','cognantic_user','userId','patientId','clinicianId'].forEach(k =>
    localStorage.removeItem(k))
}

interface AuthState {
  user:      AuthUser | null
  isLoading: boolean
  error:     string | null
}

interface AuthContextValue extends AuthState {
  isAuthenticated: boolean
  login:           (email: string, password: string) => Promise<AuthUser>
  register:        (fullName: string, email: string, password: string, role: string) => Promise<AuthUser>
  logout:          () => void
  forgotPassword:  (email: string) => Promise<ForgotPasswordResponse>
  resetPassword:   (email: string, token: string, newPassword: string) => Promise<void>
  clearError:      () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
const USER_KEY    = 'cognantic_user'

function restoreUser(): AuthUser | null {
  try { return JSON.parse(localStorage.getItem(USER_KEY) ?? '') as AuthUser } catch { return null }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({ user: restoreUser(), isLoading: false, error: null })

  useEffect(() => {
    if (state.user) localStorage.setItem(USER_KEY, JSON.stringify(state.user))
    else            localStorage.removeItem(USER_KEY)
  }, [state.user])

  const login = useCallback(async (email: string, password: string): Promise<AuthUser> => {
    setState(s => ({ ...s, isLoading: true, error: null }))
    try {
      const res  = await authService.login(email, password)
      setToken(res.token)
      const user: AuthUser = {
        id: res.user.id, name: res.user.name,
        email: res.user.email, role: res.user.role, avatarUrl: res.user.avatarUrl,
      }
      // Store IDs so all services can read them
      localStorage.setItem('userId', user.id)
      if (user.role === 'patient')   localStorage.setItem('patientId',   user.id)
      if (user.role === 'therapist') localStorage.setItem('clinicianId', user.id)
      setState({ user, isLoading: false, error: null })
      return user
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed'
      setState(s => ({ ...s, isLoading: false, error: msg }))
      throw err
    }
  }, [])

  const register = useCallback(async (
    fullName: string, email: string, password: string, role: string,
  ): Promise<AuthUser> => {
    setState(s => ({ ...s, isLoading: true, error: null }))
    try {
      await authService.register(fullName, email, password, role)
      return await login(email, password)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration failed'
      setState(s => ({ ...s, isLoading: false, error: msg }))
      throw err
    }
  }, [login])

  const logout = useCallback(() => { clearToken(); setState({ user: null, isLoading: false, error: null }) }, [])

  const forgotPassword = useCallback(async (email: string): Promise<ForgotPasswordResponse> => {
    setState(s => ({ ...s, isLoading: true, error: null }))
    try {
      const res = await authService.forgotPassword(email)
      setState(s => ({ ...s, isLoading: false }))
      return res
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Request failed'
      setState(s => ({ ...s, isLoading: false, error: msg }))
      throw err
    }
  }, [])

  const resetPassword = useCallback(async (email: string, token: string, newPassword: string): Promise<void> => {
    setState(s => ({ ...s, isLoading: true, error: null }))
    try {
      await authService.resetPassword(email, token, newPassword)
      setState(s => ({ ...s, isLoading: false }))
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Reset failed'
      setState(s => ({ ...s, isLoading: false, error: msg }))
      throw err
    }
  }, [])

  const clearError = useCallback(() => setState(s => ({ ...s, error: null })), [])

  return (
    <AuthContext.Provider value={{
      ...state, isAuthenticated: !!state.user,
      login, register, logout, forgotPassword, resetPassword, clearError,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
