'use client'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="inner-page container" role="alert"><section className="inner-hero"><p className="eyebrow">SiteCrafters</p><h1>Something went<br /><em>wrong.</em></h1><p>We couldn't load this page correctly. Please try again or return to the homepage.</p><div className="hero-actions"><button className="button button-dark" onClick={() => reset()}>Try again</button><a className="text-link" href="/">Back home</a></div></section></main>
}
