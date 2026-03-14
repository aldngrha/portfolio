import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

// ─── Auth Guard ───────────────────────────────────────────────────────────────

const authGuard: Handle = async ({ event, resolve }) => {
  const isAdminRoute = event.url.pathname.startsWith('/admin')
  const isLoginRoute = event.url.pathname === '/admin/login'

  if (isAdminRoute && !isLoginRoute) {
    const token = event.cookies.get('admin_token')
    if (!token) {
      throw redirect(303, `/admin/login?redirect=${event.url.pathname}`)
    }
    event.locals.token = token
  }

  return resolve(event)
}

// ─── Theme ────────────────────────────────────────────────────────────────────

const themeHandler: Handle = async ({ event, resolve }) => {
  const theme = event.cookies.get('theme') ?? 'light'

  return resolve(event, {
    transformPageChunk({ html }) {
      return html.replace('%theme%', theme)
    },
  })
}

export const handle = sequence(themeHandler, authGuard)
