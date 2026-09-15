import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SiteCrafters — Websites, Social Media & Video',
  description: 'SiteCrafters is a digital creative agency for website design, website development, social media management, and video editing in India.',
  keywords: ['Website Design', 'Website Development', 'Social Media Management', 'Video Editing', 'Web Design India', 'Digital Creative Agency'],
  openGraph: { title: 'SiteCrafters — Websites, Social Media & Video', description: 'Build your online presence with websites, social media, and video content.', type: 'website' },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#09090b',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
