'use client'

import { ArrowUpRight, Menu, MessageCircle, Play, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const services = [
  { number: '01', title: 'Website design & development', description: 'Modern, responsive websites designed around your business, customers, and the action you want visitors to take.', href: '/services/web-design' },
  { number: '02', title: 'Social media management', description: 'Content planning, creative support, and consistent publishing that keeps your brand active and recognisable.', href: '/services/social-media' },
  { number: '03', title: 'Video editing', description: 'Polished reels, shorts, and promotional content built to communicate quickly and look professional.', href: '/services/video-editing' },
]
const process = [
  { number: '01', title: 'Tell us what you need', description: 'We learn about your business, audience, goals, and the work that needs doing.' },
  { number: '02', title: 'Plan & design', description: 'We shape the direction, priorities, content, and a practical project plan.' },
  { number: '03', title: 'Build & refine', description: 'We create, review, and refine the website, content, or video with care.' },
  { number: '04', title: 'Launch & support', description: 'We prepare the final details, launch confidently, and explain what comes next.' },
]
const faqs = [
  ['How much does a website cost?', 'Every project depends on its scope, pages, content, and functionality. We provide a clear proposal after understanding what you need.'],
  ['How long does it take?', 'A focused website project usually depends on the number of pages and how quickly content and feedback are available. We agree on a realistic schedule before starting.'],
  ['Do you redesign existing websites?', 'Yes. We can improve structure, content clarity, visual design, mobile experience, performance, or development of an existing website.'],
  ['Do you provide social media management?', 'Yes. We can help with practical content direction, planning, creative support, and consistent management for your social presence.'],
  ['Do you provide video editing?', 'Yes. We edit short-form and branded videos for social media, promotions, and other content needs.'],
]

const premiumResponsiveStyles = `
  .site-shell { min-width: 0; }
  .container { width: min(1180px, calc(100% - 64px)); }
  .nav { position: relative; z-index: 20; }
  .nav-links a, .nav-cta, .button, .service-row a, .project, .footer a { -webkit-tap-highlight-color: transparent; }
  .service-row h3, .service-row p, .project h3, .footer p, .footer-email { min-width: 0; overflow-wrap: anywhere; }
  .service-row h3 { line-height: 1.12; }
  .service-row p { line-height: 1.6; }
  .project { display: block; min-width: 0; }
  .project-visual { border-radius: 0; }
  .project-static-preview { position: absolute; inset: 42px 18px 18px; padding: 34px; display: flex; flex-direction: column; justify-content: center; background: #fff; color: #111; box-shadow: 0 18px 50px rgba(0,0,0,.16); }
  .preview-kicker { font-size: 10px; text-transform: uppercase; letter-spacing: .14em; font-weight: 800; color: #ff4657; }
  .project-static-preview strong { margin-top: 12px; font-size: clamp(28px, 4vw, 52px); line-height: .95; letter-spacing: -.06em; }
  .preview-url { margin-top: auto; font-size: 9px; letter-spacing: .1em; text-transform: uppercase; color: #777; }
  .faq-list { margin-top: 48px; border-top: 1px solid var(--line); }
  .faq-row { border-bottom: 1px solid var(--line); }
  .faq-row > button { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 25px 0; border: 0; background: transparent; color: var(--ink); text-align: left; cursor: pointer; }
  .faq-row > button h3 { margin: 0; font-size: clamp(17px, 2vw, 22px); letter-spacing: -.03em; line-height: 1.2; }
  .faq-row > button span { flex: 0 0 auto; width: 34px; height: 34px; display: grid; place-items: center; border: 1px solid var(--line); border-radius: 50%; font-size: 20px; font-weight: 300; }
  .faq-answer { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .28s ease; }
  .faq-answer p { min-height: 0; overflow: hidden; margin: 0; max-width: 720px; color: var(--muted); line-height: 1.65; font-size: 14px; }
  .faq-row-open .faq-answer { grid-template-rows: 1fr; }
  .faq-row-open .faq-answer p { padding: 0 0 25px; }
  .footer-nav { display: flex; flex-wrap: wrap; gap: 16px 22px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }
  .footer-nav a:hover { color: var(--coral); }
  .floating-whatsapp { z-index: 50; }
  @media (max-width: 900px) {
    .container { width: min(100% - 40px, 720px); }
    .nav { min-height: 76px; }
    .nav-links { display: none; position: absolute; top: 68px; left: 0; right: 0; margin: 0; padding: 18px; flex-direction: column; gap: 0; background: rgba(9,9,11,.97); border: 1px solid var(--line); border-radius: 18px; box-shadow: 0 24px 70px rgba(0,0,0,.35); }
    .nav-links-open { display: flex; }
    .nav-links a { padding: 15px 8px; border-bottom: 1px solid var(--line); }
    .nav-links a:last-child { border-bottom: 0; }
    .nav-cta { display: none; }
    .menu-button { display: grid; place-items: center; color: var(--ink); cursor: pointer; padding: 8px; }
    .hero { grid-template-columns: 1fr; gap: 42px; min-height: auto; padding: 54px 0 70px; }
    .hero h1 { font-size: clamp(58px, 16vw, 92px); }
    .hero-art { height: min(72vw, 430px); }
    .intro, .services, .founder { padding: 82px 0; }
    .intro-content { grid-template-columns: 1fr; gap: 32px; padding-top: 42px; }
    .intro-content > div { max-width: 620px; }
    .service-list { margin-top: 34px; }
    .service-row { grid-template-columns: 44px minmax(0, 1fr) 38px; gap: 14px; padding: 24px 0; }
    .service-row h3 { font-size: clamp(18px, 4vw, 23px); }
    .service-row p { grid-column: 2 / 3; grid-row: 2; margin-top: -4px; }
    .service-row > a { grid-column: 3; grid-row: 1 / span 2; align-self: center; }
    .work { padding: 34px 0 82px; }
    .project-grid { grid-template-columns: 1fr; gap: 34px; margin-top: 34px; }
    .project-visual { height: min(76vw, 400px); }
    .results { padding: 72px 0 78px; }
    .results-grid { grid-template-columns: 1fr; gap: 42px; margin-top: 46px; }
    .founder { grid-template-columns: 1fr; gap: 48px; }
    .founder-photo, .founder-photo video { min-height: min(105vw, 520px); }
    .founder-copy h2 { margin-top: 32px; }
    .contact { padding-bottom: 52px; }
    .contact-inner { padding: 70px 22px 76px; }
    .footer { min-height: auto; padding: 34px 0; flex-wrap: wrap; align-items: flex-start; }
    .footer-brand { width: 100%; flex-wrap: wrap; }
    .footer-nav { order: 3; width: 100%; }
    .footer p { order: 4; width: 100%; }
    .socials { margin-left: auto; }
  }
  @media (max-width: 560px) {
    .container { width: min(100% - 28px, 520px); }
    .hero { padding-top: 38px; }
    .hero h1 { font-size: clamp(52px, 17vw, 78px); }
    .hero-description { font-size: 14px; }
    .hero-actions { align-items: stretch; flex-direction: column; gap: 18px; }
    .hero-actions .button { width: 100%; }
    .hero-actions .text-link { justify-content: center; }
    .hero-art { height: 74vw; min-height: 260px; }
    .section-label { gap: 12px; font-size: 9px; }
    .intro, .services, .founder { padding: 68px 0; }
    .intro h2, .contact h2 { font-size: clamp(42px, 13vw, 64px); }
    .service-row { grid-template-columns: 32px minmax(0,1fr) 34px; gap: 10px; }
    .service-number { font-size: 9px; }
    .service-row h3 { font-size: 18px; }
    .service-row p { font-size: 13px; }
    .project-visual { height: 78vw; min-height: 270px; }
    .project-static-preview { inset: 38px 12px 12px; padding: 22px; }
    .project-sticker { width: 58px; height: 58px; left: 15px; top: 44px; font-size: 11px; }
    .project-tag { left: 15px; bottom: 14px; font-size: 8px; }
    .project-browser-bar { font-size: 7px; padding: 9px 10px; }
    .faq-row > button { padding: 21px 0; }
    .faq-row > button h3 { font-size: 17px; }
    .founder-photo, .founder-photo video { min-height: 92vw; }
    .contact-inner { padding: 62px 18px 68px; }
    .footer-brand { gap: 14px; }
    .footer-email { font-size: 10px; }
    .footer-nav { gap: 13px 17px; font-size: 9px; }
    .floating-whatsapp { right: 16px !important; bottom: 16px !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  }
`

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const founderVideoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = founderVideoRef.current
    if (!video) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => undefined)
      else video.pause()
    }, { threshold: 0.55 })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])
  return (
    <main className="site-shell">
      <style>{premiumResponsiveStyles}</style>
      <nav className="nav container" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="SiteCrafters home"><img className="brand-logo" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dhZVabMRvDh6Pi5SloFCu1tGOOfzc5.png" alt="SiteCrafters" /><span>sitecrafters<span className="brand-dot">.</span></span></a>
        <div className={menuOpen ? 'nav-links nav-links-open' : 'nav-links'}><a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="/services" onClick={() => setMenuOpen(false)}>Services</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="/careers" onClick={() => setMenuOpen(false)}>Careers</a><a href="/inquiry" onClick={() => setMenuOpen(false)}>Contact</a></div>
        <a className="nav-cta" href="/inquiry">Start a project <ArrowUpRight size={16} /></a>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>
      <section className="hero container" id="top"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line" />Web · Social · Video</p><h1>Build your<br /><em>presence.</em></h1><p className="hero-description">SiteCrafters helps businesses build their online presence through modern websites, social media management, and engaging video content.</p><div className="hero-actions"><a className="button button-dark" href="/inquiry">Start a project <ArrowUpRight size={17} /></a><a className="text-link" href="#work"><span className="play-icon"><Play size={11} fill="currentColor" /></span> View our work</a></div></div><div className="hero-art"><video className="hero-video" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mp4-gjjX8cgF4XSSbqmY8LPTn0vULss2Tj.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="SiteCrafters brand film" /><span className="hero-video-label">SiteCrafters / 01</span></div></section>
      <section className="marquee" aria-label="Our capabilities"><div className="marquee-track"><span>WEBSITES · SOCIAL MEDIA · VIDEO · WEBSITES · SOCIAL MEDIA · VIDEO ·</span><span aria-hidden="true">WEBSITES · SOCIAL MEDIA · VIDEO · WEBSITES · SOCIAL MEDIA · VIDEO ·</span></div></section>
      <section className="intro container" id="about"><div className="section-label"><span>01</span> A better website starts with clarity</div><div className="intro-content"><h2>Make your business<br /><span>easier to trust.</span></h2><div><p>SiteCrafters helps small businesses, startups, local businesses, professionals, and personal brands build websites that explain what they do, look credible, and make the next step simple.</p><p>Outdated design, slow pages, confusing navigation, and weak mobile experiences can quietly cost you enquiries. We fix the details that help your website work harder.</p><a className="text-link arrow-link" href="#services">Explore our services <ArrowUpRight size={17} /></a></div></div></section>
      <section className="services container" id="services"><div className="section-label"><span>02</span> What we do</div><div className="service-list">{services.map((service) => <article className="service-row" key={service.number}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><a href={service.href} aria-label={`Learn more about ${service.title}`}><ArrowUpRight /></a></article>)}</div></section>
      <section className="work container" id="work"><div className="work-heading"><div className="section-label"><span>03</span> Selected work</div><a className="text-link arrow-link" href="/work">View all projects <ArrowUpRight size={17} /></a></div><div className="project-grid"><a className="project project-large" href="https://bca-vault.portalbcavault.workers.dev" target="_blank" rel="noreferrer"><div className="project-visual visual-coral project-browser"><div className="project-static-preview" aria-label="Static preview of the BCA Vault website"><span className="preview-kicker">BCA Vault</span><strong>Organise your<br />study life.</strong><span className="preview-url">portalbcavault.workers.dev</span></div><div className="project-browser-bar"><span>portalbcavault.workers.dev</span><span className="project-browser-status">View live project</span></div><span className="project-sticker">Featured<br />work</span><span className="project-tag">Web design · Development</span></div><h3>BCA Vault · Student resource portal <ArrowUpRight size={17} /></h3></a><a className="project" href="/inquiry"><div className="project-visual visual-lilac"><div className="lilac-shape">S</div><span className="project-tag">SiteCrafters</span></div><h3>Have a project in mind? <ArrowUpRight size={17} /></h3></a></div></section>
      <section className="results"><div className="container"><div className="section-label light"><span>04</span> What you get</div><div className="results-grid"><div className="result"><strong>Clear</strong><span>business message</span><p>Pages that help visitors understand what you offer and who it is for.</p></div><div className="result"><strong>Responsive</strong><span>customer experience</span><p>A thoughtful experience across the screens your customers actually use.</p></div><div className="result"><strong>Ready</strong><span>for the next step</span><p>A practical foundation for enquiries, future updates, and ongoing growth.</p></div></div></div></section>
      <section className="services container" id="process"><div className="section-label"><span>05</span> How a project works</div><div className="service-list">{process.map((step) => <article className="service-row" key={step.number}><span className="service-number">{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></section>
      <section className="intro container" id="fit"><div className="section-label"><span>06</span> Built around your business</div><div className="intro-content"><h2>Not a template.<br /><span>A useful website.</span></h2><div><p>We combine business-first thinking, clean design, user-focused structure, responsive development, performance awareness, and SEO-ready foundations.</p><p>You get direct communication, an honest process, and a website shaped around your goals instead of a one-size-fits-all package.</p></div></div></section>
      <section className="founder container" id="founder"><div className="founder-photo"><video ref={founderVideoRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Create_a_realistic_cinematic_f-ZYSqdoDFj4dha1mu0OUmWMXdbXOYRS.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Cinematic video introducing Atharva Gogawale, founder of SiteCrafters" /><span>Meet the founder</span></div><div className="founder-copy"><div className="section-label"><span>07</span> About the founder</div><h2>Meet <span>Atharva</span></h2><p className="founder-lead">I&apos;m Atharva Gogawale, a BCA second-year student and the founder of SiteCrafters.</p><p>I started SiteCrafters with a simple idea — businesses deserve websites that are more than attractive. They should be fast, easy to use, mobile-friendly, and genuinely useful.</p><p>My work and learning focus on web design, development, UI/UX, performance, and SEO. I have also completed a one-month digital marketing course and a one-month internship at MyCaptain.</p><p className="founder-signoff">“My aim is to turn your idea into a website you&apos;re proud to share.”</p><a className="text-link arrow-link" href="/inquiry">Start a conversation <ArrowUpRight size={17} /></a></div></section>
      <section className="services container" id="faq"><div className="section-label"><span>08</span> Common questions</div><div className="faq-list">{faqs.map(([question, answer], index) => <article className={openFaq === index ? 'faq-row faq-row-open' : 'faq-row'} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><h3>{question}</h3><span aria-hidden="true">{openFaq === index ? '−' : '+'}</span></button><div className="faq-answer"><p>{answer}</p></div></article>)}</div></section>
      <section className="contact container" id="contact"><div className="contact-inner"><p className="eyebrow">Ready to build a better online presence?</p><h2>Let&apos;s build<br /><em>what&apos;s next.</em></h2><p className="contact-note">Whether you need a website, consistent social media, or better video content, let&apos;s talk about what you&apos;re building.</p><a className="button button-light" href="/inquiry">Start a project <ArrowUpRight size={17} /></a></div></section>
      <footer className="footer container"><div className="footer-brand"><a className="brand" href="#top" aria-label="SiteCrafters home"><img className="brand-logo" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dhZVabMRvDh6Pi5SloFCu1tGOOfzc5.png" alt="SiteCrafters" /><span>sitecrafters<span className="brand-dot">.</span></span></a><a className="footer-email" href="mailto:sitecrafters07@gmail.com">sitecrafters07@gmail.com</a></div><nav className="footer-nav" aria-label="Footer navigation"><a href="/careers">Careers</a><a href="/inquiry">Contact</a><a href="/services">Services</a><a href="/work">Work</a><a href="#about">About</a></nav><p>© 2026 SiteCrafters. We build brands online.</p><div className="socials"><a href="https://instagram.com/sitecrafters07" target="_blank" rel="noreferrer" aria-label="Instagram"><span aria-hidden="true" className="instagram-mark">ig</span></a><a href="https://linkedin.com/in/atharva-gogawale-259173354" target="_blank" rel="noreferrer" aria-label="LinkedIn"><span aria-hidden="true" className="linkedin-mark">in</span></a><a href="https://wa.me/919326342123" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle aria-hidden="true" /></a></div></footer>
      <a className="floating-whatsapp" href="https://wa.me/919326342123?text=Hi%20SiteCrafters%21%20I%27m%20interested%20in%20your%20services." target="_blank" rel="noreferrer" aria-label="Chat with SiteCrafters on WhatsApp"><MessageCircle size={21} /></a>
    </main>
  )
}
