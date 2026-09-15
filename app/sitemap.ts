import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sitecrafters-five.vercel.app'
  const routes = ['', '/services', '/services/web-design', '/services/social-media', '/services/video-editing', '/careers', '/inquiry']
  return routes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: 'monthly', priority: route === '' ? 1 : 0.8 }))
}
