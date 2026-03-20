import type { Actions, PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'
import { fail, redirect, isRedirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.token) throw redirect(303, '/admin')
  return {}
}

export const actions: Actions = {
  default: async ({ request, cookies, url }) => {
    const form = await request.formData()
    const email    = form.get('email')?.toString() ?? ''
    const password = form.get('password')?.toString() ?? ''

    if (!email || !password) {
      return fail(400, { error: 'Email and password are required.' })
    }

    try {
      const res = await adminApi.auth.login(email, password)
      cookies.set('admin_token', res.data.token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(res.data.expires_at),
      })

      const redirectTo = url.searchParams.get('redirect') ?? '/admin'
      redirect(303, redirectTo)
    } catch (err: unknown) {
      if (isRedirect(err)) throw err
      return fail(401, { error: 'Invalid email or password.' })
    }
  },
}
