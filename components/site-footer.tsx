import Link from 'next/link'
import { nav, site, waitingListHref } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="border-foreground/85 mt-24 border-t">
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-[26rem]">
            <p className="type-display text-[19px]">Brockley Fields</p>
            <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">
              {site.tagline}
            </p>
            <p className="type-label mt-6">Get in touch</p>
            <ul className="mt-2 flex flex-col gap-1 text-[15px]">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-primary underline decoration-current/30 underline-offset-4 transition-colors"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary underline decoration-current/30 underline-offset-4 transition-colors"
                >
                  {site.instagram}
                </a>
              </li>
              <li className="text-muted-foreground">{site.location}</li>
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="type-label">Pages</p>
            <ul className="mt-2 flex flex-col gap-1 text-[15px] sm:columns-2 sm:gap-x-12">
              {[...nav, { label: 'Waiting List', href: waitingListHref }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-foreground/20 mt-12 flex flex-col gap-2 border-t pt-5 sm:flex-row sm:justify-between">
          <p className="type-label">
            &copy; {new Date().getFullYear()} {site.fullName}
          </p>
          <p className="type-label">
            Full address shared privately with applicants
          </p>
        </div>
      </div>
    </footer>
  )
}
