'use client'

import { ArrowUpRight } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import { careerRoles } from '@/lib/careers'

type FormValues = {
  name: string
  email: string
  phone: string
  role: string
  portfolio: string
  linkedin: string
  github: string
  resume: File | null
  why: string
  availability: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = { name: '', email: '', phone: '', role: '', portfolio: '', linkedin: '', github: '', resume: null, why: '', availability: '' }

function validUrl(value: string) {
  if (!value) return true
  try { return ['http:', 'https:'].includes(new URL(value).protocol) } catch { return false }
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Please enter a valid email address.'
  if (values.phone && !/^[+\d][\d\s().-]{6,}$/.test(values.phone)) errors.phone = 'Please enter a valid phone number.'
  if (!values.role) errors.role = 'Please select a role.'
  if (!validUrl(values.portfolio)) errors.portfolio = 'Please enter a valid portfolio URL.'
  if (!validUrl(values.linkedin)) errors.linkedin = 'Please enter a valid LinkedIn URL.'
  if (!validUrl(values.github)) errors.github = 'Please enter a valid GitHub URL.'
  if (values.resume && values.resume.size > 5 * 1024 * 1024) errors.resume = 'Please choose a file smaller than 5 MB.'
  else if (values.resume && values.resume.type !== 'application/pdf') errors.resume = 'Please choose a PDF resume.'
  if (!values.why.trim()) errors.why = 'Please tell us why you would like to join.'
  if (!values.availability.trim()) errors.availability = 'Please share your availability.'
  return errors
}

export function ApplicationForm({ selectedRole = '' }: { selectedRole?: string }) {
  const [values, setValues] = useState<FormValues>({ ...initialValues, role: selectedRole })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'preparing' | 'ready'>('idle')

  useEffect(() => { setValues((current) => ({ ...current, role: selectedRole })) }, [selectedRole])

  function update(name: keyof FormValues, value: string | File | null) {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    if (status === 'ready') setStatus('idle')
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setStatus('preparing')
    const role = careerRoles.find((item) => item.slug === values.role)?.title ?? values.role
    const body = [
      `Full name: ${values.name}`, `Email: ${values.email}`, `Phone / WhatsApp: ${values.phone || 'Not provided'}`,
      `Role: ${role}`, `Portfolio: ${values.portfolio || 'Not provided'}`, `LinkedIn: ${values.linkedin || 'Not provided'}`,
      `GitHub: ${values.github || 'Not provided'}`, `Resume: ${values.resume ? `${values.resume.name} (please attach it in your email app)` : 'Not provided'}`,
      `Why join: ${values.why}`, `Availability: ${values.availability}`,
    ].join('\n')
    window.location.href = `mailto:sitecrafters07@gmail.com?subject=${encodeURIComponent(`Application for ${role}`)}&body=${encodeURIComponent(body)}`
    setStatus('ready')
  }

  if (status === 'ready') return <div className="application-success" role="status"><span className="success-mark" aria-hidden="true">✓</span><h3>Your application is ready</h3><p>Your email app should open with the application details. Please attach your resume there if you selected one.</p><div className="success-actions"><a className="button button-dark" href="/careers">Back to careers</a><a className="text-link" href="/">View SiteCrafters <ArrowUpRight size={16} /></a></div></div>

  return <form className="career-form" onSubmit={submit} noValidate aria-describedby="application-note"><p id="application-note" className="form-note">There is no application backend yet. This form prepares an email in your email app; no application is marked as received until you send it.</p><div className="form-grid"><Field label="Full name" name="name" value={values.name} error={errors.name} required onChange={(value) => update('name', value)} /><Field label="Email" name="email" type="email" value={values.email} error={errors.email} required onChange={(value) => update('email', value)} /><Field label="Phone / WhatsApp" name="phone" type="tel" value={values.phone} error={errors.phone} onChange={(value) => update('phone', value)} /><label>Role *<select name="role" value={values.role} onChange={(event) => update('role', event.target.value)} aria-invalid={Boolean(errors.role)}><option value="">Select a role</option>{careerRoles.map((role) => <option key={role.slug} value={role.slug}>{role.title}</option>)}</select>{errors.role && <span className="field-error" role="alert">{errors.role}</span>}</label><Field label="Portfolio / website" name="portfolio" type="url" value={values.portfolio} error={errors.portfolio} onChange={(value) => update('portfolio', value)} /><Field label="LinkedIn" name="linkedin" type="url" value={values.linkedin} error={errors.linkedin} onChange={(value) => update('linkedin', value)} /><Field label="GitHub" name="github" type="url" value={values.github} error={errors.github} onChange={(value) => update('github', value)} /><label>Resume / CV <span className="field-note">PDF, max 5 MB</span><input name="resume" type="file" accept="application/pdf,.pdf" onChange={(event) => update('resume', event.target.files?.[0] ?? null)} aria-invalid={Boolean(errors.resume)} />{errors.resume && <span className="field-error" role="alert">{errors.resume}</span>}</label></div><Field label="Why do you want to join SiteCrafters?" name="why" value={values.why} error={errors.why} required textarea onChange={(value) => update('why', value)} /><Field label="Availability" name="availability" value={values.availability} error={errors.availability} required placeholder="For example: 10 hours a week from October" onChange={(value) => update('availability', value)} /><button className="button button-dark" type="submit" disabled={status === 'preparing'}>{status === 'preparing' ? 'Preparing application...' : 'Apply for this role'} <ArrowUpRight size={17} /></button></form>
}

function Field({ label, name, type = 'text', value, error, required = false, textarea = false, placeholder, onChange }: { label: string; name: string; type?: string; value: string; error?: string; required?: boolean; textarea?: boolean; placeholder?: string; onChange: (value: string) => void }) {
  const id = `career-${name}`
  return <label htmlFor={id}>{label}{required && ' *'}{textarea ? <textarea id={id} name={name} value={value} placeholder={placeholder} rows={5} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} /> : <input id={id} name={name} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} />}{error && <span className="field-error" role="alert">{error}</span>}</label>
}
