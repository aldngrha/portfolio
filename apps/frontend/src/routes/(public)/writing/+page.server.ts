import type { PageServerLoad } from './$types'
import { api } from '$lib/api/client'

export const load: PageServerLoad = async ({ url }) => {
  const page = Number(url.searchParams.get('page') ?? 1)
  const res = await api.posts.list({ page }).catch(() => ({ data: [], total: 0, page: 1, per_page: 10, total_pages: 1 }))
  return { posts: res.data, total: res.total, totalPages: res.total_pages, currentPage: res.page }
}
