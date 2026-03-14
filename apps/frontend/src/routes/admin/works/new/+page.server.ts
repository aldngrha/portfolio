import type { Actions, PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'
import { fail, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async () => ({})

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData()
    const token = locals.token ?? ''

    // Handle thumbnail upload first
    const thumbnailFile = form.get('thumbnail') as File | null
    let thumbnail_url: string | null = null

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
      tech_stack:   form.get('tech_stack')?.toString().split(',').map((s) => s.trim()).filter(Boolean) ?? [],
      tags:         form.get('tags')?.toString().split(',').map((s) => s.trim()).filter(Boolean) ?? [],
      featured:     form.get('featured') === 'on',
      sort_order:   Number(form.get('sort_order') ?? 0),
      thumbnail_url,
    }

    try {
      await adminApi.works.create(token, body)
      throw redirect(303, '/admin/works')
    } catch (err: unknown) {
      if (err instanceof Response) throw err
      return fail(500, { error: 'Failed to create work.' })
    }
  },
}
