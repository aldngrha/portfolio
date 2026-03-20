import type { Actions, PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'
import { fail } from '@sveltejs/kit'
import fs from 'node:fs'
import path from 'node:path'

const SETTINGS_FILE = 'src/lib/server/settings.json'

function loadSettings() {
  try {
    const filePath = path.resolve(SETTINGS_FILE)
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
  } catch (err) {
    console.error('Failed to load settings', err)
  }
  return { avatarUrl: '', resumeUrl: '' }
}

function saveSettings(settings: any) {
  try {
    const filePath = path.resolve(SETTINGS_FILE)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2))
  } catch (err) {
    console.error('Failed to save settings', err)
  }
}

export const load: PageServerLoad = async () => {
  return { settings: loadSettings() }
}

export const actions: Actions = {
  uploadAvatar: async ({ request, locals }) => {
    const form = await request.formData()
    const token = locals.token ?? ''
    const file = form.get('avatar') as File | null

    if (!file || file.size === 0) {
      return fail(400, { error: 'Please select an image file.' })
    }

    try {
      const up = await adminApi.upload.file(token, file, 'profile')
      const url = up.data.url

      const settings = loadSettings()
      settings.avatarUrl = url
      saveSettings(settings)

      return { success: true, url, type: 'avatar' }
    } catch (err: any) {
      console.error('Avatar upload failed:', err)
      return fail(500, { error: err.message || 'Failed to upload avatar.' })
    }
  },

  uploadResume: async ({ request, locals }) => {
    const form = await request.formData()
    const token = locals.token ?? ''
    const file = form.get('resume') as File | null

    if (!file || file.size === 0) {
      return fail(400, { error: 'Please select a PDF file.' })
    }

    try {
      const up = await adminApi.upload.file(token, file, 'resume')
      const url = up.data.url

      const settings = loadSettings()
      settings.resumeUrl = url
      saveSettings(settings)

      return { success: true, url, type: 'resume' }
    } catch (err: any) {
      console.error('Resume upload failed:', err)
      return fail(500, { error: err.message || 'Failed to upload resume.' })
    }
  },
}
