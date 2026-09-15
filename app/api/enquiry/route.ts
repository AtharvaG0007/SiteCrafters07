import { Resend } from 'resend'

export const runtime = 'nodejs'

const allowedServices = new Set(['Website', 'Social media management', 'Video editing', 'Multiple services', 'Not sure yet'])
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const requests = new Map<string, { count: number; resetAt: number }>()

function text(value: unknown, maxLength: number) { return typeof value === 'string' ? value.trim().slice(0, maxLength) : '' }
function validUrl(value: string) { if (!value) return true; try { return ['http:', 'https:'].includes(new URL(value).protocol) } catch { return false } }
function escapeHtml(value: string) { return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character) }
function optionalRows(fields: Array<[string, string]>) { return fields.filter(([, value]) => value).map(([label, value]) => `<tr><td style="padding:12px 0;color:#aaa3ad;font-size:12px;width:180px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:12px 0;color:#f7f4f1;font-size:14px;line-height:1.5">${escapeHtml(value)}</td></tr>`).join('') }
function rateLimited(key: string) { const now = Date.now(); const current = requests.get(key); if (!current || current.resetAt <= now) { requests.set(key, { count: 1, resetAt: now + 60 * 60 * 1000 }); return false }; if (current.count >= 5) return true; current.count += 1; return false }

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (rateLimited(ip)) return Response.json({ success: false, message: 'Too many enquiries. Please try again later.' }, { status: 429 })
    const body = await request.json() as Record<string, unknown>
    const name = text(body.name, 120), business = text(body.business, 160), email = text(body.email, 254), phone = text(body.phone, 40), details = text(body.details, 5000), budget = text(body.budget, 120), timeline = text(body.timeline, 120), presence = text(body.presence, 500)
    const services = Array.isArray(body.services) ? body.services.filter((value): value is string => typeof value === 'string' && allowedServices.has(value)).slice(0, 5) : []
    if (text(body.website_url, 200)) return Response.json({ success: false, message: 'Unable to send enquiry.' }, { status: 400 })
    if (!name || !business || !email || !details || !services.length) return Response.json({ success: false, message: 'Please complete the required enquiry fields.' }, { status: 400 })
    if (!emailPattern.test(email)) return Response.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 })
    if (phone && !/^[+\d][\d\s().-]{6,}$/.test(phone)) return Response.json({ success: false, message: 'Please enter a valid phone number.' }, { status: 400 })
    if (!validUrl(presence)) return Response.json({ success: false, message: 'Please enter a valid website or social link.' }, { status: 400 })
    const inbox = process.env.SITECRAFTERS_INBOX_EMAIL, from = process.env.RESEND_FROM_EMAIL, apiKey = process.env.RESEND_API_KEY
    if (!inbox || !from || !apiKey) return Response.json({ success: false, message: 'Enquiries are temporarily unavailable. Please try again later.' }, { status: 503 })
    const serviceLabel = services.length > 1 ? 'Multiple Services' : services[0]
    const subject = `New Project Enquiry - ${name} - ${serviceLabel}`
    const optional = optionalRows([['WhatsApp / Phone', phone], ['Existing website / social', presence], ['Budget', budget], ['Timeline', timeline]])
    const textContent = ['NEW PROJECT ENQUIRY', '', `Name: ${name}`, `Business / Brand: ${business}`, `Email: ${email}`, `Service: ${serviceLabel}`, phone && `WhatsApp / Phone: ${phone}`, `Project Details: ${details}`, presence && `Existing website / social: ${presence}`, budget && `Budget: ${budget}`, timeline && `Timeline: ${timeline}`, '', 'Reply directly to this email to contact the client.', 'SiteCrafters', 'We build brands online'].filter(Boolean).join('\n')
    const html = `<div style="background:#09090b;color:#f7f4f1;padding:32px 20px;font-family:Arial,Helvetica,sans-serif"><div style="max-width:640px;margin:0 auto;border:1px solid #29262d;padding:28px"><p style="margin:0 0 8px;color:#ff4657;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">New project enquiry</p><h1 style="margin:0 0 28px;font-size:26px;font-weight:700">A new enquiry came through SiteCrafters.</h1><h2 style="margin:0;padding:14px 0;border-top:1px solid #29262d;color:#ff4657;font-size:12px;letter-spacing:1px;text-transform:uppercase">Client details</h2><table role="presentation" style="width:100%;border-collapse:collapse"><tr><td style="padding:12px 0;color:#aaa3ad;font-size:12px;width:180px">Name</td><td style="padding:12px 0;color:#f7f4f1;font-size:14px">${escapeHtml(name)}</td></tr><tr><td style="padding:12px 0;color:#aaa3ad;font-size:12px">Business / Brand</td><td style="padding:12px 0;color:#f7f4f1;font-size:14px">${escapeHtml(business)}</td></tr><tr><td style="padding:12px 0;color:#aaa3ad;font-size:12px">Email</td><td style="padding:12px 0;color:#f7f4f1;font-size:14px">${escapeHtml(email)}</td></tr>${optionalRows([['Service', serviceLabel]])}${optional}</table><h2 style="margin:26px 0 0;padding:14px 0;border-top:1px solid #29262d;color:#ff4657;font-size:12px;letter-spacing:1px;text-transform:uppercase">Project details</h2><p style="margin:0;white-space:pre-wrap;color:#f7f4f1;font-size:14px;line-height:1.6">${escapeHtml(details)}</p><p style="margin:30px 0 0;padding-top:20px;border-top:1px solid #29262d;color:#aaa3ad;font-size:12px;line-height:1.6">Reply directly to this email to contact the client.</p><p style="margin:20px 0 0;color:#f7f4f1;font-size:12px;font-weight:700">SiteCrafters<br /><span style="color:#aaa3ad;font-weight:400">We build brands online</span></p></div></div>`
    const result = await new Resend(apiKey).emails.send({ from, to: [inbox], replyTo: email, subject, html, text: textContent })
    if (result.error) { console.error('Resend enquiry error', result.error); return Response.json({ success: false, message: 'Unable to send enquiry right now.' }, { status: 502 }) }
    return Response.json({ success: true, message: 'Enquiry sent successfully.' })
  } catch (error) { console.error('Enquiry API error', error); return Response.json({ success: false, message: 'Unable to process this enquiry right now.' }, { status: 500 }) }
}
