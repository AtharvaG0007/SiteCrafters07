import Link from 'next/link'

export default function NotFound() {
  return <main className="inner-page container not-found-page"><Link className="back-link" href="/">← SiteCrafters</Link><section className="not-found-content"><p className="eyebrow">404 · Page not found</p><h1>That page<br /><em>doesn&apos;t exist.</em></h1><p>Try returning to Careers or head back to the SiteCrafters homepage.</p><div className="success-actions"><Link className="button button-dark" href="/careers">Back to careers</Link><Link className="text-link" href="/">View SiteCrafters</Link></div></section></main>
}
