'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ApplicationForm } from '@/components/careers/application-form'
import { careerRoles } from '@/lib/careers'

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState('')

  useEffect(() => {
    const role = new URLSearchParams(window.location.search).get('role')
    if (role && careerRoles.some((item) => item.slug === role)) setSelectedRole(role)
  }, [])

  return <main className="inner-page container"><Link className="back-link" href="/">← SiteCrafters</Link><header className="inner-hero"><p className="eyebrow">Careers · Build with us</p><h1>Build with<br /><em>us.</em></h1><p>SiteCrafters is growing, and we are always interested in meeting people who love building, designing, and creating.</p></header><section className="roles" aria-labelledby="opportunities-title"><div className="section-label"><span>01</span> Opportunities</div><h2 id="opportunities-title" className="sr-only">Opportunities at SiteCrafters</h2><p className="roles-intro">We are not actively hiring for every role right now, but we are always open to meeting talented people.</p><div className="role-list">{careerRoles.map((role, index) => <article className="role-card" key={role.slug}><span>0{index + 1}</span><div><div className="role-heading"><h2>{role.title}</h2><b>{role.status}</b></div><p>{role.description}</p><dl className="role-summary"><div><dt>Type</dt><dd>{role.type}</dd></div><div><dt>Location</dt><dd>{role.location}</dd></div></dl><Link className="text-link role-link" href={`/careers/${role.slug}`}>View role <span aria-hidden="true">→</span></Link></div></article>)}</div></section><section className="careers-note"><p className="eyebrow">A thoughtful start</p><h2>Learn by building, work on real projects, and grow your portfolio across design, technology, and digital content.</h2></section><section className="application-panel" id="apply" aria-labelledby="application-title"><p className="eyebrow">02 · Application</p><h2 id="application-title">Tell us what you do.</h2><ApplicationForm selectedRole={selectedRole} /></section></main>
}
