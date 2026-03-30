import type { PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'

export const load: PageServerLoad = async ({ locals }) => {
  const token = locals.token ?? ''

  try {
    const response = await adminApi.visitors.list(token, 1, 10)
    return {
      visitors: response.data,
      total: response.total,
      token // Pass token for client-side infinite scroll fetching
    }
  } catch (err) {
    console.error('Failed to load visitors:', err)
    return {
      visitors: [],
      total: 0,
      token
    }
  }
}
