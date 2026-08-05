import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Work_Sans } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { site } from '@/lib/site'
import './globals.css'

const _archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const _workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: `${site.fullName} — Studios in Brockley, SE4`,
    template: `%s — ${site.fullName}`,
  },
  description:
    'Five soundproofed, acoustically treated studios and two private offices in southeast London. Songwriters, producers, mixers, arrangers and managers working side by side.',
  generator: 'v0.app',
  metadataBase: new URL('https://brockleyfields.com'),
  openGraph: {
    title: `${site.fullName} — Studios in Brockley, SE4`,
    description:
      'Five soundproofed studios and two private offices in southeast London. A place where you actually want to spend your day.',
    siteName: site.fullName,
    locale: 'en_GB',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f8efde',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" className="bg-background">
      <body className="paper-grain bg-background text-foreground font-sans antialiased">
        <a
          href="#main"
          className="type-label-ink sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
