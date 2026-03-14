import type { PageServerLoad } from './$types'
import { api } from '$lib/api/client'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params }) => {
  try {
    const res = await api.posts.get(params.slug)
    return { post: res.data }
  } catch {
    throw error(404, 'Post not found')
  }
}
