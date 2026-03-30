import type { PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'

export const load: PageServerLoad = async ({ locals }) => {
  const token = locals.token ?? ''

  try {
    const stats = await adminApi.stats.get(token)
    return {
      stats: stats.counts,
      visitors: stats.visitors,
      recent_visitors: stats.recent_visitors,
      daily_stats: stats.daily_stats,
    }
  } catch (err) {
    console.error('Failed to fetch stats:', err)
    return {
      stats: {
        works: 0,
        labs: 0,
        posts: 0,
        unread_messages: 0,
      },
      visitors: {
        total_hits: 0,
        unique_visitors: 0,
        hits_last_24h: 0,
        unique_last_24h: 0,
      },
      recent_visitors: [],
      daily_stats: [],
    }
  }
}
