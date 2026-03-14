import { writable, derived } from 'svelte/store'
import { browser } from '$app/environment'
import type { Theme, Locale } from '$lib/types'

// ─── Theme Store ─────────────────────────────────────────────────────────────

function createThemeStore() {
  const initial: Theme = browser
    ? (localStorage.getItem('theme') as Theme) ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : 'light'

  const { subscribe, set, update } = writable<Theme>(initial)

  return {
    subscribe,
    toggle() {
      update((t) => {
        const next: Theme = t === 'light' ? 'dark' : 'light'
        if (browser) {
          localStorage.setItem('theme', next)
          document.documentElement.setAttribute('data-theme', next)
        }
        return next
      })
    },
    set(theme: Theme) {
      if (browser) {
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
      }
      set(theme)
    },
  }
}

export const theme = createThemeStore()
export const isDark = derived(theme, ($t) => $t === 'dark')

// ─── Auth Store (Admin) ───────────────────────────────────────────────────────

interface AuthState {
  token: string | null
  expiresAt: string | null
}

function createAuthStore() {
  const initial: AuthState = browser
    ? {
        token: localStorage.getItem('admin_token'),
        expiresAt: localStorage.getItem('admin_token_expires'),
      }
    : { token: null, expiresAt: null }

  const { subscribe, set, update } = writable<AuthState>(initial)

  return {
    subscribe,
    login(token: string, expiresAt: string) {
      if (browser) {
        localStorage.setItem('admin_token', token)
        localStorage.setItem('admin_token_expires', expiresAt)
      }
      set({ token, expiresAt })
    },
    logout() {
      if (browser) {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_token_expires')
      }
      set({ token: null, expiresAt: null })
    },
    get token() {
      let t: string | null = null
      subscribe((s) => (t = s.token))()
      return t
    },
  }
}

export const auth = createAuthStore()
export const isAuthenticated = derived(
  auth,
  ($auth) => !!$auth.token && new Date($auth.expiresAt ?? 0) > new Date()
)
