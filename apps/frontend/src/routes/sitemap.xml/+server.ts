import { api } from '$lib/api/client'

export const GET = async () => {
  const domain = 'https://aldinugraha.me'

  // Fetch dynamic slugs from backend
  const [works, labs, posts] = await Promise.all([
    api.works.list({ page: 1, perPage: 1000 }),
    api.labs.list({ page: 1, perPage: 1000 }),
    api.posts.list({ page: 1, perPage: 1000 })
  ])

  const staticPages = [
    '',
    '/about',
    '/works',
    '/labs',
    '/writing',
    '/contact'
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(path => `
  <url>
    <loc>${domain}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === '' ? '1.0' : '0.8'}</priority>
  </url>`)
    .join('')}

  ${works.data
    .map(w => `
  <url>
    <loc>${domain}/works/${w.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)
    .join('')}

  ${labs.data
    .map(l => `
  <url>
    <loc>${domain}/labs/${l.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`)
    .join('')}

  ${posts.data
    .map(p => `
  <url>
    <loc>${domain}/writing/${p.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)
    .join('')}
</urlset>`

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  })
}
