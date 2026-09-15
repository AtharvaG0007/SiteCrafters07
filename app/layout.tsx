import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = 'https://sitecrafters-five.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'SiteCrafters — Websites, Social Media & Video',
  description: 'SiteCrafters is a digital creative agency for website design, website development, social media management, and video editing in India.',
  keywords: ['Website Design', 'Website Development', 'Social Media Management', 'Video Editing', 'Web Design India', 'Digital Creative Agency'],
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: ['/icon.svg'],
    apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  openGraph: { title: 'SiteCrafters — Websites, Social Media & Video', description: 'Build your online presence with websites, social media, and video content.', type: 'website', url: siteUrl, siteName: 'SiteCrafters' },
  twitter: { card: 'summary_large_image', title: 'SiteCrafters — Websites, Social Media & Video', description: 'Build your online presence with websites, social media, and video content.' },
  generator: 'v0.app',
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#09090b' }

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
  return <html lang="en"><body>{children}<script dangerouslySetInnerHTML={{ __html: founderVideoScript }} />{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
