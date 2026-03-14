import type { PageServerLoad } from './$types'
import { api } from '$lib/api/client'

export const load: PageServerLoad = async ({ url }) => {
  const category = url.searchParams.get('category') ?? undefined
  const res = await api.labs.list({ category }).catch(() => ({ data: [], total: 0, page: 1, per_page: 20, total_pages: 1 }))
  return { labs: res.data, category: category ?? 'all' }
}
