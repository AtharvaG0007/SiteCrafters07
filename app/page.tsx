'use client'

import { ArrowUpRight, Menu, MessageCircle, Play, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const services = [
  { number: '01', title: 'Website design & development', description: 'Modern, responsive websites designed around your business and your customers.', href: '/services/web-design' },
  { number: '02', title: 'Social media management', description: 'Content planning, creative support, and consistency for a professional social presence.', href: '/services/social-media' },
  { number: '03', title: 'Video editing', description: 'Polished reels, shorts, and promotional content ready to publish.', href: '/services/video-editing' },
]

const process = [
  { number: '01', title: 'Tell us what you need', description: 'We learn about your business, audience, goals, and the work that needs doing.' },
  { number: '02', title: 'Plan & design', description: 'We shape the direction, priorities, content, and a practical project plan.' },
  { number: '03', title: 'Build & refine', description: 'We create, review, and refine the website, content, or video with care.' },
  { number: '04', title: 'Launch & support', description: 'We prepare the final details, launch confidently, and explain what comes next.' },
]

const faqs = [
  ['How much does a website cost?', 'Every project depends on its scope, pages, content, and functionality. We provide a clear proposal after understanding what you need.'],
  ['How long does it take?', 'A focused website project usually depends on the number of pages and how quickly content and feedback are available. We will agree on a realistic schedule before starting.'],
  ['Do you redesign existing websites?', 'Yes. We can improve the structure, content clarity, visual design, mobile experience, or development of an existing website.'],
  ['Do you provide social media management?', 'Yes. We can help with practical content direction, planning, and consistent management for your social presence.'],
  ['Do you provide video editing?', 'Yes. We edit short-form and branded videos for social media, promotions, and other content needs.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const founderVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = founderVideoRef.current
    if (!video) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.muted = false
        video.play().catch(() => undefined)
      } else {
        video.pause()
      }
    }, { threshold: 0.55 })

    observer.observe(video)
    return () => observer.disconnect()
  }, [])


  return (
    <main className="site-shell">
      <nav className="nav container" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="SiteCrafters home"><img className="brand-logo" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dhZVabMRvDh6Pi5SloFCu1tGOOfzc5.png" alt="" /><span>sitecrafters<span className="brand-dot">.</span></span></a>
        <div className={menuOpen ? 'nav-links nav-links-open' : 'nav-links'}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="/services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/careers" onClick={() => setMenuOpen(false)}>Careers</a>
          <a href="/inquiry" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <a className="nav-cta" href="/inquiry">Start a project <ArrowUpRight size={16} /></a>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section className="hero container" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />Web · Social · Video</p>
          <h1>Build your<br /><em>presence.</em></h1>
          <p className="hero-description">SiteCrafters helps businesses build their online presence through modern websites, social media management, and engaging video content.</p>
          <div className="hero-actions"><a className="button button-dark" href="/inquiry">Start a project <ArrowUpRight size={17} /></a><a className="text-link" href="#work"><span className="play-icon"><Play size={11} fill="currentColor" /></span> View our work</a></div>
        </div>
        <div className="hero-art">
          <video className="hero-video" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mp4-gjjX8cgF4XSSbqmY8LPTn0vULss2Tj.mp4" autoPlay muted loop playsInline preload="auto" aria-label="SiteCrafters brand film" />
          <span className="hero-video-label">SiteCrafters / 01</span>
        </div>
      </section>

      <section className="marquee" aria-label="Our capabilities"><div className="marquee-track"><span>WEBSITES · SOCIAL MEDIA · VIDEO · WEBSITES · SOCIAL MEDIA · VIDEO ·</span><span aria-hidden="true">WEBSITES · SOCIAL MEDIA · VIDEO · WEBSITES · SOCIAL MEDIA · VIDEO ·</span></div></section>

      <section className="intro container" id="about">
        <div className="section-label"><span>01</span> A better website starts with clarity</div>
        <div className="intro-content"><h2>Make your business<br /><span>easier to trust.</span></h2><div><p>SiteCrafters helps small businesses, startups, local businesses, professionals, and personal brands build websites that explain what they do, look credible, and make the next step simple.</p><p>Outdated design, slow pages, confusing navigation, and weak mobile experiences can quietly cost you enquiries. We fix the details that help your website work harder.</p><a className="text-link arrow-link" href="#services">Explore our services <ArrowUpRight size={17} /></a></div></div>
      </section>

      <section className="services container" id="services">
        <div className="section-label"><span>02</span> What we do</div>
        <div className="service-list">{services.map((service) => <article className="service-row" key={service.number}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><a href={service.href} aria-label={`Learn more about ${service.title}`}><ArrowUpRight /></a></article>)}</div>
      </section>

      <section className="work container" id="work">
        <div className="work-heading"><div className="section-label"><span>03</span> Selected work</div><a className="text-link arrow-link" href="#contact">View all projects <ArrowUpRight size={17} /></a></div>
        <div className="project-grid"><a className="project project-large" href="https://bca-vault.portalbcavault.workers.dev" target="_blank" rel="noreferrer"><div className="project-visual visual-coral project-browser"><div className="project-static-preview" aria-label="Static preview of the BCA Vault website"><span className="preview-kicker">BCA Vault</span><strong>Organise your<br />study life.</strong><span className="preview-url">portalbcavault.workers.dev</span></div><div className="project-browser-bar"><span>portalbcavault.workers.dev</span><span className="project-browser-status">View live project</span></div><span className="project-sticker">Featured<br />work</span><span className="project-tag">Web design · Development</span></div><h3>BCA Vault · Student resource portal <ArrowUpRight size={17} /></h3></a><a className="project" href="#contact"><div className="project-visual visual-lilac"><div className="lilac-shape">A</div><span className="project-tag">Campaign · 2024</span></div><h3>Alba · Find your frequency</h3></a></div>
      </section>

      <section className="results"><div className="container"><div className="section-label light"><span>04</span> What you get</div><div className="results-grid"><div className="result"><strong>Clear</strong><span>business message</span><p>Pages that help visitors understand what you offer and who it is for.</p></div><div className="result"><strong>Responsive</strong><span>customer experience</span><p>A thoughtful experience across the screens your customers actually use.</p></div><div className="result"><strong>Ready</strong><span>for the next step</span><p>A practical foundation for enquiries, future updates, and ongoing growth.</p></div></div></div></section>

      <section className="services container" id="process">
        <div className="section-label"><span>05</span> How a project works</div>
        <div className="service-list">{process.map((step) => <article className="service-row" key={step.number}><span className="service-number">{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div>
      </section>

      <section className="intro container" id="fit">
        <div className="section-label"><span>06</span> Built around your business</div>
        <div className="intro-content"><h2>Not a template.<br /><span>A useful website.</span></h2><div><p>We combine business-first thinking, clean design, user-focused structure, responsive development, performance awareness, and SEO-ready foundations.</p><p>You get direct communication, an honest process, and a website shaped around your goals instead of a one-size-fits-all package.</p></div></div>
      </section>

      <section className="founder container" id="founder"><div className="founder-photo"><video ref={founderVideoRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Create_a_realistic_cinematic_f-ZYSqdoDFj4dha1mu0OUmWMXdbXOYRS.mp4" autoPlay loop playsInline preload="auto" aria-label="Cinematic video introducing Atharva Gogawale, founder of SiteCrafters" /><span>Meet the founder</span></div><div className="founder-copy"><div className="section-label"><span>07</span> About the founder</div><h2>Meet <span>Atharva</span></h2><p className="founder-lead">I&apos;m Atharva Gogawale, a BCA second-year student and the founder of SiteCrafters.</p><p>I started SiteCrafters with a simple idea — businesses deserve websites that are more than attractive. They should be fast, easy to use, mobile-friendly, and genuinely useful.</p><p>My work and learning focus on web design, development, UI/UX, performance, and SEO. I have also completed a one-month digital marketing course and a one-month internship at MyCaptain.</p><p className="founder-signoff">“My aim is to turn your idea into a website you&apos;re proud to share.”</p><a className="text-link arrow-link" href="#contact">Start a conversation <ArrowUpRight size={17} /></a></div></section>

      <section className="services container" id="faq"><div className="section-label"><span>08</span> Common questions</div><div className="faq-list">{faqs.map(([question, answer], index) => <article className={openFaq === index ? 'faq-row faq-row-open' : 'faq-row'} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><h3>{question}</h3><span aria-hidden="true">{openFaq === index ? '−' : '+'}</span></button><div className="faq-answer"><p>{answer}</p></div></article>)}</div></section>

      <section className="contact container" id="contact"><div className="contact-inner"><p className="eyebrow">Ready to build a better online presence?</p><h2>Let&apos;s build<br /><em>what&apos;s next.</em></h2><p className="contact-note">Whether you need a website, consistent social media, or better video content, let&apos;s talk about what you&apos;re building.</p><a className="button button-light" href="/inquiry">Start a project <ArrowUpRight size={17} /></a></div></section>

      <footer className="footer container"><div className="footer-brand"><a className="brand" href="#top" aria-label="SiteCrafters home"><img className="brand-logo" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dhZVabMRvDh6Pi5SloFCu1tGOOfzc5.png" alt="" /><span>sitecrafters<span className="brand-dot">.</span></span></a><a className="footer-email" href="mailto:sitecrafters07@gmail.com">sitecrafters07@gmail.com</a></div><nav className="footer-nav" aria-label="Footer navigation"><a href="/careers">Careers</a><a href="/inquiry">Contact</a><a href="/services">Services</a><a href="#work">Work</a><a href="#about">About</a></nav><p>© 2026 SiteCrafters. We build brands online.</p><div className="socials"><a href="https://instagram.com/sitecrafters07" target="_blank" rel="noreferrer" aria-label="Instagram"><span aria-hidden="true" className="instagram-mark">ig</span></a><a href="https://linkedin.com/in/atharva-gogawale-259173354" target="_blank" rel="noreferrer" aria-label="LinkedIn"><span aria-hidden="true" className="linkedin-mark">in</span></a><a href="https://wa.me/919326342123" target="_blank" rel="noreferrer" aria-label="WhatsApp +91 93263 42123"><MessageCircle aria-hidden="true" /></a></div></footer>
      <a className="floating-whatsapp" href="https://wa.me/919326342123?text=Hi%20SiteCrafters%21%20I%27m%20interested%20in%20your%20services." target="_blank" rel="noreferrer" aria-label="Chat with SiteCrafters on WhatsApp"><MessageCircle size={21} /></a>
    </main>
  )
}
