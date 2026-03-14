import type { PageServerLoad } from './$types'
import { adminApi } from '$lib/api/client'

export const load: PageServerLoad = async ({ locals }) => {
  const token = locals.token ?? ''

  const [works, labs, posts, messages] = await Promise.allSettled([
    adminApi.works.list(token),
    adminApi.labs.list(token),
    adminApi.posts.list(token),
    adminApi.messages.list(token),
  ])

  return {
    stats: {
      works:           works.status === 'fulfilled' ? works.value.total : 0,
      labs:            labs.status === 'fulfilled' ? labs.value.total : 0,
      posts:           posts.status === 'fulfilled' ? posts.value.total : 0,
      unread_messages: messages.status === 'fulfilled'
        ? messages.value.data.filter((m) => !m.read).length
        : 0,
    },
  }
}
