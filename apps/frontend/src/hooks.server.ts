import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const themeHandler: Handle = async ({ event, resolve }) => {
  const theme = event.cookies.get('theme') ?? 'light'
  return resolve(event, {
    transformPageChunk({ html }) {
      return html.replace('%theme%', theme)
    },
  })
}

const authGuard: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginRoute = pathname === '/login'

  if (isAdminRoute) {
    const token = event.cookies.get('admin_token')
    if (!token) {
      throw redirect(303, `/login?redirect=${encodeURIComponent(pathname)}`)
    }
    event.locals.token = token
  }

  // Redirect logged-in user away from login page
  if (isLoginRoute) {
    const token = event.cookies.get('admin_token')
    if (token) throw redirect(303, '/admin')
  }

  return resolve(event)
}

export const handleFetch = async ({ event, request, fetch }) => {
  const url = new URL(request.url)
  // Check if it's our backend API
  const isApiCall = url.href.includes('/api/v1')

  if (isApiCall) {
    const ua = event.request.headers.get('user-agent')
    let ip = ''
    try { ip = event.getClientAddress() } catch { ip = '127.0.0.1' }

    if (ua) {
      request.headers.set('X-Visitor-User-Agent', ua)
      // Log for debugging
      // console.log(`[SSR Fetch] Forwarding UA: ${ua.substring(0, 20)}... to ${url.pathname}`)
    }
    if (ip) {
      request.headers.set('X-Visitor-IP', ip)
    }
  }

  return fetch(request)
}

export const handle = sequence(themeHandler, authGuard)
