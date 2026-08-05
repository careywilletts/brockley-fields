import type { Metadata } from 'next'
import { Container, InlineLink, PageHeader, Rule } from '@/components/primitives'
import { WaitingListForm } from '@/components/waiting-list-form'
import { getRoom, studioCount, officeCount } from '@/lib/rooms'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Waiting List',
  description:
    'Every room at Brockley Fields is currently occupied. Join the waiting list and we will come to you before anything is advertised.',
}

export default async function WaitingListPage({
  searchParams,
}: {
  searchParams: Promise<{ room?: string }>
}) {
  const { room } = await searchParams
  // Only pre-select a room we actually publish.
  const requested = room ? getRoom(room) : undefined

  return (
    <main>
      <PageHeader
        label="Waiting List"
        title="All studios are currently occupied."
        intro={
          <>
            <p>
              That is the honest position and it does not change often — people tend to stay. When a
              room does come free, we go to this list first and it is usually taken before it reaches
              the internet.
            </p>
            <p>
              Tell us what you make and which room you have your eye on &mdash; {studioCount}{' '}
              studios and {officeCount} offices, all told. We read everything ourselves.
            </p>
          </>
        }
      />

      <section className="border-foreground/20 border-t py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="lg:w-[58%] lg:shrink-0">
              {requested && (
                <div className="border-foreground/25 mb-8 border-l-2 pl-4">
                  <p className="type-label">Pre-selected</p>
                  <p className="mt-1 text-[16px] leading-relaxed">
                    {requested.name} — {requested.area}. Change it below if you meant another room.
                  </p>
                </div>
              )}
              <WaitingListForm defaultRoomSlug={requested?.slug} />
            </div>

            <aside className="lg:pt-2">
              <h2 className="type-label">What happens next</h2>
              <Rule />
              <ol className="mt-5 flex max-w-[24rem] flex-col gap-5">
                {[
                  {
                    title: 'We read it',
                    body: 'Rob reads every application. There is no form-filtering software between you and us.',
                  },
                  {
                    title: 'We might invite you in',
                    body: 'Open days rather than viewings. You meet whoever is around and see how the building actually feels.',
                  },
                  {
                    title: 'A room comes free',
                    body: 'We come to the list, in the order that makes sense for the room and for the corridor.',
                  },
                ].map((step, index) => (
                  <li key={step.title} className="border-foreground/20 border-t pt-4">
                    <p className="type-label-ink">
                      {index + 1}. {step.title}
                    </p>
                    <p className="text-muted-foreground mt-2 text-[15px] leading-relaxed">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>

              <p className="mt-8 max-w-[24rem] text-[15px] leading-relaxed">
                Would rather just talk? Write to{' '}
                <InlineLink href={`mailto:${site.email}`} external>
                  {site.email}
                </InlineLink>
                , or look at{' '}
                <InlineLink href="/studios">the rooms</InlineLink> first.
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  )
}
