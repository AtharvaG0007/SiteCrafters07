'use client'

import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { FormEvent, useState } from 'react'

const services = ['Website', 'Social media management', 'Video editing', 'Multiple services', 'Not sure yet']

export default function InquiryPage() {
  const [submission, setSubmission] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const servicesSelected = form.getAll('services')
    if (!form.get('name') || !form.get('business') || !form.get('email') || !form.get('details') || !servicesSelected.length) {
      setSubmission('error')
      setMessage('Please complete your name, business, email, service, and project details.')
      return
    }

    setSubmission('sending')
    setMessage('')
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'), business: form.get('business'), email: form.get('email'), phone: form.get('phone'),
          services: servicesSelected, details: form.get('details'), budget: form.get('budget'), timeline: form.get('timeline'), presence: form.get('presence'), website_url: form.get('website_url'),
        }),
      })
      const result = await response.json() as { success?: boolean; message?: string }
      if (!response.ok || !result.success) throw new Error(result.message || 'Unable to send enquiry.')
      setSubmission('success')
      setMessage("Thanks for reaching out. We'll get back to you soon.")
    } catch (error) {
      setSubmission('error')
      setMessage(error instanceof Error && error.message !== 'Unable to send enquiry.' ? error.message : 'Something went wrong while sending your enquiry. Please try again or contact us directly.')
    }
  }

  return (
    <main className="inquiry-page">
      <nav className="nav container" aria-label="Inquiry navigation">
        <a className="brand" href="/" aria-label="SiteCrafters home"><span>sitecrafters<span className="brand-dot">.</span></span></a>
        <a className="text-link arrow-link inquiry-back" href="/"><ArrowLeft size={17} /> Back to site</a>
      </nav>
      <section className="inquiry-hero container">
        <div><p className="eyebrow"><span className="eyebrow-line" />Start a project</p><h1>Let&apos;s build something<br /><em>for your business.</em></h1><p className="inquiry-intro">Have a website idea, need help with social media, or have videos that need editing? Tell us what you&apos;re looking for. We&apos;ll take it from there.</p></div>
        <div className="inquiry-note"><span>01</span><p>No commitment. Just a conversation.</p></div>
      </section>
      <section className="inquiry-form-wrap container" aria-labelledby="inquiry-form-title">
        <div className="section-label"><span>02</span> Project enquiry</div>
        <form className="inquiry-form" onSubmit={handleSubmit}>
          <h2 id="inquiry-form-title">A few details to get started</h2>
          <div className="honeypot" aria-hidden="true"><label>Website<input name="website_url" tabIndex={-1} autoComplete="off" /></label></div>
          <fieldset><legend>Your details</legend><div className="form-grid"><label>Name *<input name="name" type="text" placeholder="Your name" required /></label><label>Business / brand name *<input name="business" type="text" placeholder="Your business or brand" required /></label><label>Email *<input name="email" type="email" placeholder="you@example.com" required /></label><label>WhatsApp / phone<input name="phone" type="tel" placeholder="+91 00000 00000" /></label></div></fieldset>
          <fieldset><legend>What do you need?</legend><div className="choice-grid">{services.map((service) => <label className="choice" key={service}><input type="checkbox" name="services" value={service} /><span>{service}</span></label>)}</div></fieldset>
          <label>Project details *<textarea name="details" placeholder="Tell us a little about your business and what you&apos;d like to build or improve." rows={6} required /></label>
          <div className="form-grid"><label>Budget <span className="field-note">Optional</span><input name="budget" placeholder="A range is helpful, but not required" /></label><label>Timeline <span className="field-note">Optional</span><input name="timeline" placeholder="When would you like to start?" /></label><label>Existing website or social link <span className="field-note">Optional</span><input name="presence" type="url" placeholder="https://" /></label></div>
          <div className="inquiry-submit-row"><button className="button button-dark" type="submit" disabled={submission === 'sending'}>{submission === 'sending' ? 'Sending...' : 'Send project enquiry'} <ArrowUpRight size={17} /></button><span>We&apos;ll reply to your submitted email.</span></div>
          {message && <p className={submission === 'error' ? 'form-error' : 'form-success'} role={submission === 'error' ? 'alert' : 'status'}>{submission === 'success' && <CheckCircle2 size={17} />}{message}</p>}
        </form>
      </section>
      <section className="after-enquiry container"><div className="section-label"><span>03</span> What happens next</div><div className="after-grid">{['We review your enquiry', 'We contact you', 'We understand your requirements', 'We discuss the project'].map((step, index) => <div className="after-step" key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}</div><p>Not sure exactly what you need? That&apos;s okay. You don&apos;t need a perfect brief before contacting us.</p></section>
      <section className="direct-contact container"><div><p className="eyebrow">Prefer a quick conversation?</p><h2>We&apos;re easy to reach.</h2></div><div className="direct-links"><a href="#inquiry-form-title">Use the enquiry form <ArrowUpRight size={16} /></a><a href="https://wa.me/919326342123" target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight size={16} /></a><a href="https://instagram.com/sitecrafters07" target="_blank" rel="noreferrer">Message on Instagram <ArrowUpRight size={16} /></a></div></section>
    </main>
  )
}
