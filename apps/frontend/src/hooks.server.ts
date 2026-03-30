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

  if (isLoginRoute) {
    const token = event.cookies.get('admin_token')
    if (token) throw redirect(303, '/admin')
  }

  return resolve(event)
}

export const handle = sequence(themeHandler, authGuard)
