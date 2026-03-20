import { writable, derived } from 'svelte/store'
import { browser } from '$app/environment'
import type { Theme } from '$lib/types'

// ─── Theme Store ─────────────────────────────────────────────────────────────

function createThemeStore() {
  const initial: Theme = browser
    ? (document.documentElement.getAttribute('data-theme') as Theme) ?? 'light'
    : 'light'

  const { subscribe, set, update } = writable<Theme>(initial)

  function applyTheme(t: Theme) {
    if (!browser) return
    document.documentElement.setAttribute('data-theme', t)
    // Sync to cookie so server picks it up on next request
    document.cookie = `theme=${t};path=/;max-age=31536000;samesite=lax`
  }

  return {
    subscribe,
    toggle() {
      update((t) => {
        const next: Theme = t === 'light' ? 'dark' : 'light'
        applyTheme(next)
        return next
      })
    },
    set(theme: Theme) {
      applyTheme(theme)
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
  const { subscribe, set } = writable<AuthState>({ token: null, expiresAt: null })

  return {
    subscribe,
    // After login, SvelteKit server action sets the cookie
    // This store just tracks client-side state for UI
    logout() {
      // Clear cookie
      if (browser) {
        document.cookie = 'admin_token=;path=/;max-age=0'
      }
      set({ token: null, expiresAt: null })
    },
  }
}

export const auth = createAuthStore()
export const isAuthenticated = derived(auth, ($auth) => !!$auth.token)
