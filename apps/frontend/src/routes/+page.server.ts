import type { PageServerLoad } from './$types'
import { api } from '$lib/api/client'

export const load: PageServerLoad = async () => {
  const [worksRes, labsRes, postsRes] = await Promise.allSettled([
    api.works.list({ featured: true }),
    api.labs.list(),
    api.posts.list({ page: 1 }),
  ])

  return {
    works: worksRes.status === 'fulfilled' ? worksRes.value.data.slice(0, 4) : [],
    labs:  labsRes.status === 'fulfilled'  ? labsRes.value.data.slice(0, 3)  : [],
    posts: postsRes.status === 'fulfilled' ? postsRes.value.data.slice(0, 4) : [],
  }
}
