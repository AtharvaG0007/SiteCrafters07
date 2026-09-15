import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getCareerRole } from '@/lib/careers'

export function generateStaticParams() {
  return ['website-developer', 'ui-ux-designer', 'video-editor', 'social-media-manager'].map((jobSlug) => ({ jobSlug }))
}

export default async function CareerDetailPage({ params }: { params: Promise<{ jobSlug: string }> }) {
  const { jobSlug } = await params
  const role = getCareerRole(jobSlug)
  if (!role) notFound()

  return <main className="inner-page container"><Link className="back-link" href="/careers"><ArrowLeft size={15} /> Back to careers</Link><header className="detail-hero"><p className="eyebrow">Careers · {role.status}</p><h1>{role.title}</h1><p>{role.description}</p><dl className="detail-meta"><div><dt>Status</dt><dd>{role.status}</dd></div><div><dt>Type</dt><dd>{role.type}</dd></div><div><dt>Location</dt><dd>{role.location}</dd></div></dl>{role.status === 'Freelance / contract' ? <Link className="button button-dark" href={`/careers?role=${role.slug}#apply`}>Apply for this role <ArrowUpRight size={17} /></Link> : <p className="closed-role" role="status">Applications aren&apos;t open for this role yet.</p>}</header><section className="detail-content"><article><h2>About the role</h2><p>{role.about}</p></article><article><h2>Responsibilities</h2><ul>{role.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></article><article><h2>Required skills</h2><ul>{role.requirements.map((item) => <li key={item}>{item}</li>)}</ul></article><article><h2>Good to have</h2><ul>{role.goodToHave.map((item) => <li key={item}>{item}</li>)}</ul></article><article><h2>What you&apos;ll work on</h2><ul>{role.workOn.map((item) => <li key={item}>{item}</li>)}</ul></article></section></main>
}
