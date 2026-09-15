import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start a Project',
  description: 'Tell SiteCrafters about your website, social media, or video project and start a conversation about what you need.',
  alternates: { canonical: '/inquiry' },
  openGraph: {
    title: 'Start a Project with SiteCrafters',
    description: 'Tell us what you want to build, improve, or create for your business.',
    url: '/inquiry',
    type: 'website',
  },
}

export default function InquiryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
