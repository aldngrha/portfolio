import type { Actions, PageServerLoad } from './$types'
import { api } from '$lib/api/client'
import { fail } from '@sveltejs/kit'

export const load: PageServerLoad = async () => ({})

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData()

    const name    = form.get('name')?.toString().trim() ?? ''
    const email   = form.get('email')?.toString().trim() ?? ''
    const subject = form.get('subject')?.toString().trim() ?? ''
    const message = form.get('message')?.toString().trim() ?? ''

    if (!name || !email || !subject || !message) {
      return fail(400, { error: 'All fields are required.', name, email, subject, message })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return fail(400, { error: 'Invalid email address.', name, email, subject, message })
    }

    try {
      await api.contact.send({ name, email, subject, message })
      return { success: true }
    } catch {
      return fail(500, { error: 'Failed to send message. Please try again.', name, email, subject, message })
    }
  },
}
