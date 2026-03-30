import type { LayoutServerLoad } from './$types'
import { ssrContext } from '$lib/api/client'

export const load: LayoutServerLoad = async ({ event }) => {
  // Set global context for API calls during SSR
  ssrContext.ua = event.request.headers.get('user-agent') ?? ''

  try {
    ssrContext.ip = event.getClientAddress()
  } catch {
    ssrContext.ip = '127.0.0.1'
  }

  return {}
}
