import type { Actions, PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'
import { fail, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async () => ({})

export const actions: Actions = {
  default: async ({ request, locals }) => {
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
      await adminApi.labs.create(token, body)
      throw redirect(303, '/admin/labs')
    } catch (err: unknown) {
      if (err instanceof Response) throw err
      return fail(500, { error: 'Failed to create lab.' })
    }
  },
}
