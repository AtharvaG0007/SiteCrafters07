import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers at SiteCrafters',
  description: 'Explore creative and technical opportunities at SiteCrafters across website development, UI/UX design, video editing, and social media.',
  alternates: { canonical: '/careers' },
  openGraph: {
    title: 'Careers at SiteCrafters',
    description: 'Explore opportunities to build websites, design experiences, edit video, and create social content with SiteCrafters.',
    url: '/careers',
    type: 'website',
  },
}

export default function CareersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
