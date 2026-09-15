import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sitecrafters-five.vercel.app'
  const routes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/services/web-design', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/services/social-media', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/services/video-editing', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/work', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/careers', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/inquiry', priority: 0.7, changeFrequency: 'monthly' as const },
  ]

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date('2026-09-15'),
    changeFrequency,
    priority,
  }))
}
