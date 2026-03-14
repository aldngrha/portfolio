import type { Actions, PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'
import { error, fail, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, locals }) => {
  try {
    const res = await adminApi.labs.list(locals.token ?? '')
    const lab = res.data.find((l) => l.id === params.id)
    if (!lab) throw error(404, 'Lab not found')
    return { lab }
  } catch {
    throw error(404, 'Lab not found')
  }
}

export const actions: Actions = {
  save: async ({ request, locals, params }) => {
    const form = await request.formData()
    const token = locals.token ?? ''

    const body = {
      title:       form.get('title')?.toString() ?? '',
      description: form.get('description')?.toString() ?? '',
      category:    form.get('category')?.toString() ?? 'other',
      status:      form.get('status')?.toString() ?? 'wip',
      github_url:  form.get('github_url')?.toString() || null,
      demo_url:    form.get('demo_url')?.toString() || null,
      tags:        form.get('tags')?.toString().split(',').map((s) => s.trim()).filter(Boolean),
      sort_order:  Number(form.get('sort_order') ?? 0),
    }

    try {
      await adminApi.labs.update(token, params.id, body)
      throw redirect(303, '/admin/labs')
    } catch (err: unknown) {
      if (err instanceof Response) throw err
      return fail(500, { error: 'Failed to update lab.' })
    }
  },

  delete: async ({ locals, params }) => {
    try {
      await adminApi.labs.delete(locals.token ?? '', params.id)
      throw redirect(303, '/admin/labs')
    } catch (err: unknown) {
      if (err instanceof Response) throw err
      return fail(500, { error: 'Failed to delete lab.' })
    }
  },
}
