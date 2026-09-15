import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services — Website Design, Social Media & Video',
  description: 'Explore SiteCrafters services: website design and development, social media management, and professional video editing for businesses and brands.',
  alternates: { canonical: '/services' },
}

const services = [
  { href: '/services/web-design', number: '01', title: 'Website Design & Development', text: 'Modern, responsive websites designed around your business and your customers.' },
  { href: '/services/social-media', number: '02', title: 'Social Media Management', text: 'Consistent content planning and creative support for a professional social presence.' },
  { href: '/services/video-editing', number: '03', title: 'Video Editing', text: 'Polished reels, shorts, and promotional content ready to publish.' },
]

export default function ServicesPage() {
  return <main className="inner-page container"><a className="back-link" href="/">← SiteCrafters</a><header className="inner-hero"><p className="eyebrow">Services · Websites · Social · Video</p><h1>Three ways to build<br /><em>your presence.</em></h1><p>One creative direction for the places your business is discovered, understood, and remembered.</p></header><section className="service-cards">{services.map((service) => <a className="service-card" href={service.href} key={service.href}><span>{service.number}</span><h2>{service.title}</h2><p>{service.text}</p><strong>Explore service <ArrowUpRight size={17} /></strong></a>)}</section><footer className="inner-footer"><a href="/inquiry">Start a project <ArrowUpRight size={15} /></a><a href="/">Back home</a></footer></main>
}
