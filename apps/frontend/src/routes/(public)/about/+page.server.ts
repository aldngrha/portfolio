import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  // Static for now — can be made dynamic via API later
  return {}
}
