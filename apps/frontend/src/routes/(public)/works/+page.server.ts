import type { PageServerLoad } from './$types'
import { api } from '$lib/api/client'

export const load: PageServerLoad = async ({ url }) => {
  const category = url.searchParams.get('category') ?? undefined

  const res = await api.works.list({ category }).catch(() => ({ data: [], total: 0, page: 1, per_page: 20, total_pages: 1 }))

  return {
    works: res.data,
    category: category ?? 'all',
  }
}
