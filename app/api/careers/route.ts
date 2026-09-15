import { Resend } from 'resend'

export const runtime = 'nodejs'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const allowedRoles = new Set(['website-developer', 'ui-ux-designer', 'video-editor', 'social-media-manager'])
const requests = new Map<string, { count: number; resetAt: number }>()

function text(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function validUrl(value: string) {
  if (!value) return true
  try { return ['http:', 'https:'].includes(new URL(value).protocol) } catch { return false }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[c] ?? c)
}

function rateLimited(key: string) {
  const now = Date.now()
  const current = requests.get(key)
  if (!current || current.resetAt <= now) {
    requests.set(key, { count: 1, resetAt: now + 60 * 60 * 1000 })
    return false
  }
  if (current.count >= 3) return true
  current.count += 1
  return false
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (rateLimited(forwarded)) return Response.json({ success: false, message: 'Too many applications. Please try again later.' }, { status: 429 })

    const form = await request.formData()
    const name = text(form.get('name'), 120)
    const email = text(form.get('email'), 254)
    const phone = text(form.get('phone'), 40)
    const role = text(form.get('role'), 80)
    const portfolio = text(form.get('portfolio'), 500)
    const linkedin = text(form.get('linkedin'), 500)
    const github = text(form.get('github'), 500)
    const why = text(form.get('why'), 3000)
    const availability = text(form.get('availability'), 500)
    const resume = form.get('resume')

    if (!name || !email || !role || !why || !availability) return Response.json({ success: false, message: 'Please complete all required application fields.' }, { status: 400 })
    if (!allowedRoles.has(role)) return Response.json({ success: false, message: 'Please select a valid role.' }, { status: 400 })
    if (!emailPattern.test(email)) return Response.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 })
    if (phone && !/^\+?[\d\s().-]{7,}$/.test(phone)) return Response.json({ success: false, message: 'Please enter a valid phone number.' }, { status: 400 })
    if (!validUrl(portfolio) || !validUrl(linkedin) || !validUrl(github)) return Response.json({ success: false, message: 'Please enter valid portfolio, LinkedIn, or GitHub links.' }, { status: 400 })

    let attachment: { filename: string; content: string } | undefined
    if (resume instanceof File && resume.size > 0) {
      if (resume.size > 5 * 1024 * 1024 || resume.type !== 'application/pdf') return Response.json({ success: false, message: 'Resume must be a PDF smaller than 5 MB.' }, { status: 400 })
      attachment = { filename: resume.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120), content: Buffer.from(await resume.arrayBuffer()).toString('base64') }
    }

    const inbox = process.env.SITECRAFTERS_INBOX_EMAIL
    const from = process.env.RESEND_FROM_EMAIL
    const apiKey = process.env.RESEND_API_KEY
    if (!inbox || !from || !apiKey) return Response.json({ success: false, message: 'Applications are temporarily unavailable. Please try again later.' }, { status: 503 })

    const roleNames: Record<string, string> = {
      'website-developer': 'Website Developer',
      'ui-ux-designer': 'Website / UI/UX Designer',
      'video-editor': 'Video Editor',
      'social-media-manager': 'Social Media Manager',
    }
    const roleName = roleNames[role]
    const subject = `New Career Application - ${roleName} - ${name}`
    const rows = [
      ['Name', name], ['Email', email], ['Phone / WhatsApp', phone], ['Role', roleName],
      ['Portfolio', portfolio], ['LinkedIn', linkedin], ['GitHub', github], ['Availability', availability], ['Why SiteCrafters', why],
    ].filter(([, value]) => value).map(([label, value]) => `<tr><td style="padding:9px 0;color:#999;font-size:12px;width:150px;vertical-align:top">${label}</td><td style="padding:9px 0;color:#f7f4f1;font-size:14px;line-height:1.5">${escapeHtml(value)}</td></tr>`).join('')
    const html = `<div style="background:#09090b;color:#f7f4f1;padding:32px 20px;font-family:Arial,Helvetica,sans-serif"><div style="max-width:640px;margin:auto;border:1px solid #29262d;padding:28px"><p style="color:#ff4657;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Career application</p><h1 style="font-size:25px">${escapeHtml(roleName)}</h1><table role="presentation" style="width:100%;border-collapse:collapse">${rows}</table><p style="margin-top:24px;color:#999;font-size:12px">Reply directly to this email to contact the applicant.</p><p style="font-weight:700">SiteCrafters<br/><span style="color:#999;font-weight:400">We build brands online</span></p></div></div>`
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({ from, to: [inbox], replyTo: email, subject, html, text: `Career application\n\nName: ${name}\nEmail: ${email}\nRole: ${roleName}\nPhone: ${phone || 'Not provided'}\nPortfolio: ${portfolio || 'Not provided'}\nLinkedIn: ${linkedin || 'Not provided'}\nGitHub: ${github || 'Not provided'}\nAvailability: ${availability}\n\nWhy SiteCrafters:\n${why}`, ...(attachment ? { attachments: [attachment] } : {}) })
    if (result.error) return Response.json({ success: false, message: 'Unable to submit application right now.' }, { status: 502 })
    return Response.json({ success: true, message: 'Application submitted successfully.' })
  } catch (error) {
    console.error('Career application error', error)
    return Response.json({ success: false, message: 'Unable to submit application right now.' }, { status: 500 })
  }
}
