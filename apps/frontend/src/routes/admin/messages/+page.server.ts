import type { Actions, PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'
import { fail } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ locals }) => {
  const res = await adminApi.messages.list(locals.token ?? '').catch(() => ({ data: [], total: 0, page: 1, per_page: 20, total_pages: 1 }))
  return { messages: res.data, total: res.total }
}

export const actions: Actions = {
  markRead: async ({ request, locals }) => {
    const form = await request.formData()
    const id = form.get('id')?.toString() ?? ''
    try {
      await adminApi.messages.markRead(locals.token ?? '', id)
      return { success: true }
    } catch {
      return fail(500, { error: 'Failed to mark as read.' })
    }
  },
  delete: async ({ request, locals }) => {
    const form = await request.formData()
    const id = form.get('id')?.toString() ?? ''
    try {
      await adminApi.messages.delete(locals.token ?? '', id)
      return { success: true }
    } catch {
      return fail(500, { error: 'Failed to delete message.' })
    }
  },
}
