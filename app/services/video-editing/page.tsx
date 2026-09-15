import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Video Editing',
  description: 'Professional video editing for Instagram Reels, YouTube Shorts, promotional videos, product videos, captions, transitions, and motion graphics.',
  alternates: { canonical: '/services/video-editing' },
}

export default function VideoEditingPage() { return <main className="inner-page container"><a className="back-link" href="/services">← All services</a><header className="inner-hero"><p className="eyebrow">03 · Video Editing</p><h1>Make people<br /><em>stop scrolling.</em></h1><p>Polished short-form content for businesses with footage, ideas, and a story to share.</p></header><section className="detail-grid"><article><span>01</span><p>Instagram Reels, YouTube Shorts, promotional videos, product and service videos, captions, transitions, and motion graphics.</p></article><article><span>02</span><p>You provide the footage, brief, and brand direction. We shape the edit, pacing, captions, and finishing details.</p></article><article><span>03</span><p>The result is content ready to publish across the channels where your audience already spends time.</p></article></section><a className="button button-dark" href="/inquiry">Discuss a video project <ArrowUpRight size={17} /></a></main> }
