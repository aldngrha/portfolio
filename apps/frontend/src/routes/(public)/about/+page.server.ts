import type { PageServerLoad } from './$types'
import fs from 'node:fs'
import path from 'node:path'

export const load: PageServerLoad = async () => {
  let settings = {
    avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocICvuHzhHQjZ_24PcQxwZyxK109oqVr7UPpumM0mwZhIPWBT0QTwg=s576-c-no',
    resumeUrl: '/resume.pdf'
  }

  try {
    const filePath = path.resolve('src/lib/server/settings.json')
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8')
      settings = JSON.parse(data)
    }
  } catch (err) {
    console.error('Failed to load settings', err)
  }

  return { settings }
}
