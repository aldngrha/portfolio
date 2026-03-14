import type { PageServerLoad } from './$types'
import { api } from '$lib/api/client'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params }) => {
  try {
    const res = await api.labs.get(params.slug)
    return { lab: res.data }
  } catch {
    throw error(404, 'Lab not found')
  }
}
