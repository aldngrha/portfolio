import type { Actions, PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'
import { error, fail, redirect } from '@sveltejs/kit'
import { readTime } from '$lib/utils'

export const load: PageServerLoad = async ({ params, locals }) => {
  try {
    const res = await adminApi.posts.list(locals.token ?? '')
    const post = res.data.find((p) => p.id === params.id)
    if (!post) throw error(404, 'Post not found')
    return { post }
  } catch {
    throw error(404, 'Post not found')
  }
}

export const actions: Actions = {
  save: async ({ request, locals, params }) => {
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
      await adminApi.posts.update(token, params.id, body)
      throw redirect(303, '/admin/writing')
    } catch (err: unknown) {
      if (err instanceof Response) throw err
      return fail(500, { error: 'Failed to update post.' })
    }
  },

  delete: async ({ locals, params }) => {
    try {
      await adminApi.posts.delete(locals.token ?? '', params.id)
      throw redirect(303, '/admin/writing')
    } catch (err: unknown) {
      if (err instanceof Response) throw err
      return fail(500, { error: 'Failed to delete post.' })
    }
  },
}
