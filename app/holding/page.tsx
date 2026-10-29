import type { Metadata } from 'next'
import Image from 'next/image'
import { Logo } from '@/components/brand'
import { ActionLink } from '@/components/primitives'
import { site, waitingListHref } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: `${site.fullName} — Studios in Brockley, SE4` },
  description:
    'Soundproofed, acoustically treated studios and private offices in Brockley, southeast London. Our full website is on its way — join the waiting list in the meantime.',
}

export default function HoldingPage() {
  return (
    // Fixed overlay so the page stands alone even where the site header and footer still render.
    <div className="paper-grain bg-background text-foreground fixed inset-0 z-50 overflow-y-auto">
      <div className="mx-auto flex min-h-full max-w-[1180px] flex-col px-5 sm:px-8">
        <header className="border-foreground/85 flex items-center justify-between gap-4 border-b py-4">
          <Logo priority className="h-12 sm:h-16" />
          <p className="type-label hidden sm:block">{site.location}</p>
        </header>

        <section className="flex flex-1 flex-col gap-10 py-12 sm:py-16 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-col gap-6 lg:w-1/2">
            <p className="type-label type-eyebrow">Website coming soon</p>
            <h1 className="type-display text-4xl text-balance sm:text-5xl lg:text-6xl">
              Studios for people who make things.{' '}
              <span className="text-primary">Almost ready.</span>
            </h1>
            <div className="flex max-w-[34rem] flex-col gap-4 text-[16px] leading-relaxed text-pretty">
              <p>
                Brockley Fields is a building of soundproofed, acoustically treated studios and
                private offices in the heart of southeast London &mdash; home to songwriters,
                producers, mixers, arrangers and managers working side by side.
              </p>
              <p>
                We&apos;re putting the finishing touches to our full website. Every room is currently
                occupied, so if you&apos;d like to be first in line when one comes free, join the
                waiting list.
              </p>
            </div>
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6">
              <ActionLink href={waitingListHref} className="px-7 py-4">
                Join the waiting list
              </ActionLink>
              <a
                href={`mailto:${site.email}`}
                className="type-label-ink decoration-foreground/40 hover:text-primary underline underline-offset-4 transition-colors"
              >
                {site.email}
              </a>
            </div>
          </div>

          <figure className="lg:w-1/2">
            <div className="border-foreground/85 relative aspect-[4/5] overflow-hidden border sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src="/images/home-hero.jpg"
                alt="Inside one of the finished studios at Brockley Fields"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </section>

        <footer className="border-foreground/85 flex flex-col gap-2 border-t py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-label">
            {'© '}
            {new Date().getFullYear()} {site.fullName}
          </p>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="type-label-ink hover:text-primary transition-colors"
          >
            {site.instagram}
          </a>
        </footer>
      </div>
    </div>
  )
}
