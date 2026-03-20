import type { Actions, PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'
import { fail, redirect, isRedirect } from '@sveltejs/kit'

export const load: PageServerLoad = async () => ({})

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const form = await request.formData()
    const token = locals.token ?? ''

    // Handle gallery images
    const imageFiles = form.getAll('images') as File[]
    const images: string[] = []

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        try {
          const up = await adminApi.upload.file(token, file, 'labs')
          images.push(up.data.url)
        } catch (e) {
          console.error('Gallery image upload failed:', e)
        }
      }
    }

    const payload = {
      title:       form.get('title')?.toString() ?? '',
      description: form.get('description')?.toString() ?? '',
      category:    form.get('category')?.toString() ?? 'other',
      status:      form.get('status')?.toString() ?? 'wip',
      github_url:  form.get('github_url')?.toString() || null,
      demo_url:    form.get('demo_url')?.toString() || null,
      tags:        form.get('tags')?.toString().split(',').map((s) => s.trim()).filter(Boolean),
      sort_order:  Number(form.get('sort_order') ?? 0),
      images:      images,
    }

    try {
      await adminApi.labs.create(token, payload)
      redirect(303, '/admin/labs')
    } catch (err: unknown) {
      if (isRedirect(err)) throw err
      return fail(500, { error: 'Failed to create lab.' })
    }
  },
}
