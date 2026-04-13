// src/lib/api/apiClient.ts
// Every backend endpoint returns: { isSuccess, data, error?, message? }
// The interceptor unwraps .data on success so callers receive T directly.

import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

export interface ApiResult<T = unknown> {
  isSuccess: boolean
  data:      T
  message?:  string
  error?:    string
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://localhost:7208/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT on every request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('cognantic_token')
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  err => Promise.reject(err),
)

// Unwrap Result<T> → T, or reject with the backend error message
apiClient.interceptors.response.use(
  (res: AxiosResponse<ApiResult>) => {
    const envelope = res.data
    if (envelope && envelope.isSuccess === false) {
      return Promise.reject(new Error(envelope.error ?? envelope.message ?? 'Request failed'))
    }
    return (envelope?.data ?? envelope) as any
  },
  (err: AxiosError<ApiResult>) => {
    const status = err.response?.status
    const msg =
      err.response?.data?.error ??
      err.response?.data?.message ??
      err.message ??
      'An unexpected error occurred'
    if (status === 401) {
      localStorage.removeItem('cognantic_token')
      localStorage.removeItem('cognantic_user')
    }
    return Promise.reject(new Error(msg))
  },
)

export default apiClient
