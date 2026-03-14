import type { ApiError, ApiResponse, PaginatedResponse } from '$lib/types'

// ─── Config ──────────────────────────────────────────────────────────────────

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

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
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
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
    list: (params?: { category?: string; featured?: boolean }) =>
      request<PaginatedResponse<import('$lib/types').Work>>(
        `/api/v1/works?${new URLSearchParams(params as Record<string, string>)}`
      ),
    get: (slug: string) =>
      request<ApiResponse<import('$lib/types').Work>>(`/api/v1/works/${slug}`),
  },

  labs: {
    list: (params?: { category?: string }) =>
      request<PaginatedResponse<import('$lib/types').Lab>>(
        `/api/v1/labs?${new URLSearchParams(params as Record<string, string>)}`
      ),
    get: (slug: string) =>
      request<ApiResponse<import('$lib/types').Lab>>(`/api/v1/labs/${slug}`),
  },

  posts: {
    list: (params?: { category?: string; page?: number }) =>
      request<PaginatedResponse<import('$lib/types').Post>>(
        `/api/v1/posts?${new URLSearchParams(params as Record<string, string>)}`
      ),
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
    file: (token: string, file: File, bucket: 'works' | 'resume' | 'profile') => {
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
}

export { ApiClientError }
