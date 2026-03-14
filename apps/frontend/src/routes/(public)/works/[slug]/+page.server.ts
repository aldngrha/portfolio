import type { PageServerLoad } from './$types'
import { api } from '$lib/api/client'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params }) => {
  try {
    const res = await api.works.get(params.slug)
    return { work: res.data }
  } catch {
    throw error(404, 'Project not found')
  }
}
