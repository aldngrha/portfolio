import type { Actions, PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'
import { fail, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async () => ({})

export const actions: Actions = {
  create: async ({ request, locals, fetch }) => { // Tambahkan fetch dari parameter
    const form = await request.formData()
    const token = locals.token ?? ''

    // 1. Handle thumbnail upload
    const thumbnailFile = form.get('file') as File | null
    let thumbnail_url: string | null = null

    if (thumbnailFile && thumbnailFile.size > 0) {
      if (thumbnailFile.size > 2 * 1024 * 1024) {
        return fail(400, { error: 'File too large. Max 2MB.' })
      }
      try {
        const up = await adminApi.upload.file(token, thumbnailFile, 'works')
        thumbnail_url = up.data.url
      } catch (e) {
        console.error('Thumbnail upload failed:', e)
        return fail(400, { error: 'Failed to upload image. Please try again.' })
      }
    }

    // Handle gallery images
    const imageFiles = form.getAll('images') as File[]
    const images: string[] = []

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        try {
          const up = await adminApi.upload.file(token, file, 'works')
          images.push(up.data.url)
        } catch (e) {
          console.error('Gallery image upload failed:', e)
        }
      }
    }

    // 2. Helper untuk membersihkan input string (Tech Stack & Tags)
    const parseCSV = (val: FormDataEntryValue | null) =>
      val?.toString().split(',').map((s) => s.trim()).filter(Boolean) ?? []

    // 3. Extract data dengan default value yang aman
    const payload = {
      title:        form.get('title')?.toString() || '',
      tagline:      form.get('tagline')?.toString() || '',
      description:  form.get('description')?.toString() || '',
      category:     form.get('category')?.toString() || 'web_app',
      status:       form.get('status')?.toString() || 'wip',
      year:         Number(form.get('year')) || new Date().getFullYear(),
      role:         form.get('role')?.toString() || '',
      live_url:     form.get('live_url')?.toString() || null,
      github_url:   form.get('github_url')?.toString() || null,
      tech_stack:   parseCSV(form.get('tech_stack')),
      tags:         parseCSV(form.get('tags')),
      featured:     form.get('featured') === 'on',
      sort_order:   Number(form.get('sort_order')) || 0,
      thumbnail_url: thumbnail_url,
      images:       images,
    }

    if (!payload.title) {
      return fail(400, { error: 'Title is required.' })
    }

    // 4. Kirim ke Backend Go
    try {
      await adminApi.works.create(token, payload)
    } catch (err: any) {
      console.error('Create work error:', err)
      return fail(500, { error: err.message || 'Failed to create work.' })
    }

    throw redirect(303, '/admin/works')
  },
}
