import type { Actions, PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'
import { error, fail, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, locals }) => {
  try {
    const res = await adminApi.works.list(locals.token ?? '')
    const work = res.data.find((w) => w.id === params.id)
    if (!work) throw error(404, 'Work not found')
    return { work }
  } catch {
    throw error(404, 'Work not found')
  }
}

export const actions: Actions = {
  save: async ({ request, locals, params }) => {
    const form = await request.formData()
    const token = locals.token ?? ''

    const thumbnailFile = form.get('thumbnail') as File | null
    let thumbnail_url: string | undefined

    if (thumbnailFile && thumbnailFile.size > 0) {
      try {
        const up = await adminApi.upload.file(token, thumbnailFile, 'works')
        thumbnail_url = up.data.url
      } catch {
        return fail(500, { error: 'Failed to upload thumbnail.' })
      }
    }

    const body = {
      title:        form.get('title')?.toString() ?? '',
      tagline:      form.get('tagline')?.toString() ?? '',
      description:  form.get('description')?.toString() ?? '',
      category:     form.get('category')?.toString() ?? 'web_app',
      status:       form.get('status')?.toString() ?? 'wip',
      year:         Number(form.get('year')),
      role:         form.get('role')?.toString() ?? '',
      live_url:     form.get('live_url')?.toString() || null,
      github_url:   form.get('github_url')?.toString() || null,
      tech_stack:   form.get('tech_stack')?.toString().split(',').map((s) => s.trim()).filter(Boolean),
      tags:         form.get('tags')?.toString().split(',').map((s) => s.trim()).filter(Boolean),
      featured:     form.get('featured') === 'on',
      sort_order:   Number(form.get('sort_order') ?? 0),
      ...(thumbnail_url ? { thumbnail_url } : {}),
    }

    try {
      await adminApi.works.update(token, params.id, body)
      throw redirect(303, '/admin/works')
    } catch (err: unknown) {
      if (err instanceof Response) throw err
      return fail(500, { error: 'Failed to update work.' })
    }
  },

  delete: async ({ locals, params }) => {
    try {
      await adminApi.works.delete(locals.token ?? '', params.id)
      throw redirect(303, '/admin/works')
    } catch (err: unknown) {
      if (err instanceof Response) throw err
      return fail(500, { error: 'Failed to delete work.' })
    }
  },
}
