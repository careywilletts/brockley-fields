import type { Metadata } from 'next'
import { site } from '@/lib/site'
import { places } from '@/lib/places'
import { ActionLink, Container, PageHeader, Photo, Section } from '@/components/primitives'
import { PlaceCard } from '@/components/place-card'

export const metadata: Metadata = {
  title: 'Community',
  description: `Brockley Fields Studios sits in Brockley, ${site.location} — the neighbourhood, the extended family of writers and producers who pass through, and the wider community around the building.`,
}

export default function CommunityPage() {
  return (
    <>
      {/*
        The page opens on the neighbourhood itself. The residents are not listed
        here any more: their full bios live on Part of the Family, linked below.
      */}
      <PageHeader
        title={
          <>
            Brockley
            <span className="text-primary block">The best place in London</span>
          </>
        }
        intro={
          <>
            <p>
              Southeast London, fifteen minutes from London Bridge, on a street where the loudest
              thing most afternoons is somebody&apos;s extension being built. There is a park at the
              end of the road and enough cafés to argue about.
            </p>
            <p>
              We do not publish the address. Applicants get it by email, and everybody who has been
              here once knows exactly which door it is.
            </p>
          </>
        }
      />

      {/* Both images are close to square, so an equal pair keeps the murals
          intact rather than cropping them to a wider ratio. */}
      <Container className="pb-14 sm:pb-20">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Photo
            src="/images/brockley-bridge.jpg"
            alt="The railway bridge in Brockley, with a blue and yellow BROCKLEY mural painted on the brick arch beneath it"
            className="border-foreground/20 aspect-square border"
            sizes="(min-width: 640px) 45vw, 100vw"
            priority
          />
          <Photo
            src="/images/se4.jpg"
            alt="A green corner shop in Brockley beside gates painted with a large blue SE4 mural"
            className="border-foreground/20 aspect-square border"
            sizes="(min-width: 640px) 45vw, 100vw"
          />
        </div>
      </Container>

      <section id="extended-family" className="border-foreground/20 border-t">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
            <div>
              <p className="type-label">Extended family</p>
              <h2 className="type-display mt-3 max-w-[28rem] text-[26px] text-balance sm:text-[34px]">
                Everybody here is part of the family.
              </h2>
            </div>
            <ActionLink href="/part-of-the-family" className="shrink-0">
              Part of the Family
            </ActionLink>
          </div>
        </Container>
      </section>

      {/* Places come from lib/places.ts, so adding a neighbour there puts it here. */}
      <Section
        id="wider-community"
        title="The wider community"
        intro={
          <p>
            The building does not stand on its own. These are the places around it that make this
            part of London what it is.
          </p>
        }
      >
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((place, i) => (
            <PlaceCard key={place.name} place={place} priority={i === 0} />
          ))}
        </div>
      </Section>
    </>
  )
}
