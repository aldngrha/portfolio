import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { visitorStore } from '$lib/api/visitor-store'

const visitorHandler: Handle = async ({ event, resolve }) => {
  // Ambil IP asli dari header Nginx Proxy Manager (NPM) atau Cloudflare
  const ip = event.request.headers.get('cf-connecting-ip') ||
             event.request.headers.get('x-real-ip') ||
             event.request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
             '127.0.0.1';

  const ua = event.request.headers.get('user-agent') ?? ''

  // Jalankan request di dalam "ruang lingkup" visitorStore
  return visitorStore.run({ ua, ip }, () => resolve(event))
}

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

export const handle = sequence(visitorHandler, themeHandler, authGuard)
