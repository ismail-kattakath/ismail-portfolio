import { MetadataRoute } from 'next'

// Required for static export
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/resume/edit/', '/cover-letter/edit/', '/resume.json/'],
    },
    sitemap: 'https://ismail.kattakath.com/sitemap.xml',
  }
}
