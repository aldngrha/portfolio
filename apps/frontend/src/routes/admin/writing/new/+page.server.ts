import type { Actions, PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'
import { fail, redirect } from '@sveltejs/kit'
import { readTime } from '$lib/utils'

export const load: PageServerLoad = async () => ({})

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData()
    const token = locals.token ?? ''
    const content = form.get('content')?.toString() ?? ''

    const body = {
      title:      form.get('title')?.toString() ?? '',
      excerpt:    form.get('excerpt')?.toString() ?? '',
      content,
      category:   form.get('category')?.toString() ?? 'general',
      tags:       form.get('tags')?.toString().split(',').map((s) => s.trim()).filter(Boolean),
      published:  form.get('published') === 'on',
      read_time:  readTime(content),
    }

    try {
      await adminApi.posts.create(token, body)
      throw redirect(303, '/admin/writing')
    } catch (err: unknown) {
      if (err instanceof Response) throw err
      return fail(500, { error: 'Failed to create post.' })
    }
  },
}
