import type { PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'

export const load: PageServerLoad = async ({ locals }) => {
  const res = await adminApi.works.list(locals.token ?? '').catch(() => ({ data: [], total: 0, page: 1, per_page: 20, total_pages: 1 }))
  return { works: res.data, total: res.total }
}
