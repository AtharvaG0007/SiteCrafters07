import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = 'https://sitecrafters-five.vercel.app'
const socialImage = `${siteUrl}/og-image.svg`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SiteCrafters — Website Design, Social Media & Video',
    template: '%s | SiteCrafters',
  },
  description: 'SiteCrafters helps businesses in India build a stronger online presence through website design and development, social media management, and video editing.',
  applicationName: 'SiteCrafters',
  creator: 'SiteCrafters',
  publisher: 'SiteCrafters',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: ['/icon.svg'],
    apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'SiteCrafters — Website Design, Social Media & Video',
    description: 'Build your online presence with websites, social media, and video content.',
    type: 'website',
    url: siteUrl,
    siteName: 'SiteCrafters',
    images: [{ url: socialImage, width: 1200, height: 630, alt: 'SiteCrafters — Website Design, Social Media and Video' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiteCrafters — Website Design, Social Media & Video',
    description: 'Build your online presence with websites, social media, and video content.',
    images: [socialImage],
  },
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#09090b' }

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'SiteCrafters',
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  email: 'sitecrafters07@gmail.com',
  description: 'Digital creative agency for website design and development, social media management, and video editing.',
  founder: {
    '@type': 'Person',
    name: 'Atharva Gogawale',
  },
  sameAs: [
    'https://linkedin.com/in/atharva-gogawale-259173354',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: 'SiteCrafters',
  url: siteUrl,
  publisher: { '@id': `${siteUrl}/#organization` },
  description: 'Website design, social media management, and video editing by SiteCrafters.',
}

const founderVideoScript = `
(function () {
  function initFounderVideo() {
    var video = document.querySelector('.founder-photo video');
    if (!video) return;
    var soundUnlocked = false;
    var visible = false;

    function playVideo() {
      if (!visible) return;
      if (soundUnlocked) {
        video.muted = false;
        video.volume = 1;
      }
      video.play().catch(function () {
        video.muted = true;
        video.play().catch(function () {});
      });
    }

    function unlockSound() {
      soundUnlocked = true;
      if (visible) playVideo();
      document.removeEventListener('pointerdown', unlockSound);
      document.removeEventListener('keydown', unlockSound);
      document.removeEventListener('touchstart', unlockSound);
    }

    document.addEventListener('pointerdown', unlockSound, { passive: true });
    document.addEventListener('keydown', unlockSound);
    document.addEventListener('touchstart', unlockSound, { passive: true });

    var observer = new IntersectionObserver(function (entries) {
      var entry = entries[0];
      visible = entry.isIntersecting;
      if (visible) playVideo();
      else video.pause();
    }, { threshold: 0.55 });

    observer.observe(video);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initFounderVideo);
  else initFounderVideo();
})();
`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script dangerouslySetInnerHTML={{ __html: founderVideoScript }} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
