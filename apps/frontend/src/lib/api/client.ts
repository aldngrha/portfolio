import type { ApiError, ApiResponse, PaginatedResponse } from '$lib/types'
import { browser } from '$app/environment'
import { PUBLIC_API_URL } from '$env/static/public'

// ─── Config ──────────────────────────────────────────────────────────────────

// Server-side: use BACKEND_URL env (private, for internal Docker/network calls)
// Client-side: use VITE_API_URL (public, for browser calls)
const API_BASE = browser
  ? (PUBLIC_API_URL ?? 'http://localhost:8080')
  : (process.env.BACKEND_URL ?? PUBLIC_API_URL ?? 'http://localhost:8080')

// ─── Core Fetcher ────────────────────────────────────────────────────────────

class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string | undefined,
    message: string
  ) {
    super(message)
    this.name = 'ApiClientError'
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  // Cek apakah body yang dikirim adalah FormData
  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    // Hanya set JSON jika bukan FormData
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers as Record<string, string>),
  }

  // Forward User Agent if we're on the server (SSR)
  if (!browser && typeof process !== 'undefined') {
    // This part requires us to pass the UA from hooks or page load
    // For now, we'll check if a global UA is set or handled via options
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })

  if (!res.ok) {
    const err: ApiError = await res.json().catch(() => ({
      error: 'Unknown error',
      status: res.status,
    }))
    throw new ApiClientError(res.status, err.code, err.error)
  }

  return res.json() as Promise<T>
}

// ─── Public API ──────────────────────────────────────────────────────────────

export const api = {
  works: {
    list: (params?: { category?: string; featured?: boolean; page?: number }) => {
      const search = new URLSearchParams()
      if (params?.category) search.set('category', params.category)
      if (params?.featured) search.set('featured', 'true')
      if (params?.page) search.set('page', params.page.toString())
      return request<PaginatedResponse<import('$lib/types').Work>>(`/api/v1/works?${search.toString()}`)
    },
    get: (slug: string) =>
      request<ApiResponse<import('$lib/types').Work>>(`/api/v1/works/${slug}`),
  },

  labs: {
    list: (params?: { category?: string; page?: number }) => {
      const search = new URLSearchParams()
      if (params?.category) search.set('category', params.category)
      if (params?.page) search.set('page', params.page.toString())
      return request<PaginatedResponse<import('$lib/types').Lab>>(`/api/v1/labs?${search.toString()}`)
    },
    get: (slug: string) =>
      request<ApiResponse<import('$lib/types').Lab>>(`/api/v1/labs/${slug}`),
  },

  posts: {
    list: (params?: { category?: string; page?: number }) => {
      const search = new URLSearchParams()
      if (params?.category) search.set('category', params.category)
      if (params?.page) search.set('page', params.page.toString())
      return request<PaginatedResponse<import('$lib/types').Post>>(`/api/v1/posts?${search.toString()}`)
    },
    get: (slug: string) =>
      request<ApiResponse<import('$lib/types').Post>>(`/api/v1/posts/${slug}`),
  },

  contact: {
    send: (body: { name: string; email: string; subject: string; message: string }) =>
      request<ApiResponse<{ id: string }>>('/api/v1/contact', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  },
}

// ─── Admin API (requires auth token) ─────────────────────────────────────────

export const adminApi = {
  works: {
    list: (token: string) =>
      request<PaginatedResponse<import('$lib/types').Work>>('/api/v1/admin/works', {}, token),
    create: (token: string, body: unknown) =>
      request<ApiResponse<import('$lib/types').Work>>('/api/v1/admin/works', {
        method: 'POST',
        body: JSON.stringify(body),
      }, token),
    update: (token: string, id: string, body: unknown) =>
      request<ApiResponse<import('$lib/types').Work>>(`/api/v1/admin/works/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      }, token),
    delete: (token: string, id: string) =>
      request<ApiResponse<null>>(`/api/v1/admin/works/${id}`, { method: 'DELETE' }, token),
  },

  labs: {
    list: (token: string) =>
      request<PaginatedResponse<import('$lib/types').Lab>>('/api/v1/admin/labs', {}, token),
    create: (token: string, body: unknown) =>
      request<ApiResponse<import('$lib/types').Lab>>('/api/v1/admin/labs', {
        method: 'POST',
        body: JSON.stringify(body),
      }, token),
    update: (token: string, id: string, body: unknown) =>
      request<ApiResponse<import('$lib/types').Lab>>(`/api/v1/admin/labs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      }, token),
    delete: (token: string, id: string) =>
      request<ApiResponse<null>>(`/api/v1/admin/labs/${id}`, { method: 'DELETE' }, token),
  },

  posts: {
    list: (token: string) =>
      request<PaginatedResponse<import('$lib/types').Post>>('/api/v1/admin/posts', {}, token),
    create: (token: string, body: unknown) =>
      request<ApiResponse<import('$lib/types').Post>>('/api/v1/admin/posts', {
        method: 'POST',
        body: JSON.stringify(body),
      }, token),
    update: (token: string, id: string, body: unknown) =>
      request<ApiResponse<import('$lib/types').Post>>(`/api/v1/admin/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      }, token),
    delete: (token: string, id: string) =>
      request<ApiResponse<null>>(`/api/v1/admin/posts/${id}`, { method: 'DELETE' }, token),
  },

  messages: {
    list: (token: string) =>
      request<PaginatedResponse<import('$lib/types').ContactMessage>>('/api/v1/admin/messages', {}, token),
    markRead: (token: string, id: string) =>
      request<ApiResponse<null>>(`/api/v1/admin/messages/${id}/read`, { method: 'PATCH' }, token),
    delete: (token: string, id: string) =>
      request<ApiResponse<null>>(`/api/v1/admin/messages/${id}`, { method: 'DELETE' }, token),
  },

  auth: {
    login: (email: string, password: string) =>
      request<ApiResponse<{ token: string; expires_at: string }>>('/api/v1/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
  },

  upload: {
    file: (token: string, file: File, bucket: 'works' | 'resume' | 'profile' | 'labs') => {
      const form = new FormData()
      form.append('file', file)
      form.append('bucket', bucket)
      return request<ApiResponse<{ url: string }>>('/api/v1/admin/upload', {
        method: 'POST',
        body: form,
        headers: {},
      }, token)
    },
  },

  stats: {
    get: (token: string) =>
      request<import('$lib/types').AdminStats>('/api/v1/admin/stats', {}, token),
  },

  visitors: {
    list: (token: string, page = 1, perPage = 20) =>
      request<PaginatedResponse<import('$lib/types').Visitor>>(`/api/v1/admin/visitors?page=${page}&per_page=${perPage}`, {}, token),
  },
}

export { ApiClientError }
