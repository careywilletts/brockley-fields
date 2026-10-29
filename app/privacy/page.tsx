import type { Metadata } from 'next'
import { Container, InlineLink, PageHeader } from '@/components/primitives'

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'How Brockley Fields Studios collects, uses and looks after your personal data, and how to get it removed.',
}

const EMAIL = 'carey@careywilletts.com'

function Email() {
  return (
    <InlineLink href={`mailto:${EMAIL}`} external>
      {EMAIL}
    </InlineLink>
  )
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-foreground/20 flex flex-col gap-4 border-t pt-6">
      <h2 className="type-display text-[22px] text-balance sm:text-[26px]">{title}</h2>
      <div className="flex flex-col gap-4 text-[16px] leading-relaxed">{children}</div>
    </section>
  )
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-primary">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

export default function PrivacyPage() {
  return (
    <main>
      <PageHeader
        label="Privacy"
        title="How we look after your data"
        intro={
          <>
            <p className="type-label">Last updated October 2026</p>
            <p>
              This covers brockleyfields.com and careywilletts.com. Here&apos;s exactly what we
              collect, why, where it lives and how to get it removed.
            </p>
          </>
        }
      />

      <Container className="pb-8">
        <div className="flex max-w-[46rem] flex-col gap-10">
          <PolicySection title="Who we are">
            <p>
              Both sites are run by Brockley Fields Studios Ltd, South East London, which is
              responsible for any personal data collected through them. For anything about your
              data, email <Email />.
            </p>
          </PolicySection>

          <PolicySection title="What we collect and why">
            <Bullets
              items={[
                "Studio waiting list: your name, email, phone number if you give it, and what kind of room you're looking for. Used only to contact you when a room comes up.",
                'Newsletters: your email address, and your name if you give it. There are two, and you choose each one separately: Brockley Fields news (new rooms, events and news from the building), and Carey\u2019s newsletter (notes on songwriting, producing and the music industry, plus Talkett beta news). You only get one if you sign up or tick its box, and you can unsubscribe from any email.',
                "Free call form: your name, email, what your project is about, any link you share and your timing. Used only to reply to you and, if it's a fit, book a call.",
                'Emails you send us: kept so we can reply and keep track of the conversation.',
                'Bookings and payments (when added): handled by the payment provider. We never see or store your card details. Invoices are kept for six years because HMRC requires it.',
              ]}
            />
          </PolicySection>

          <PolicySection title="Waiting list and newsletters are separate">
            <p>
              Joining the studio waiting list doesn&apos;t sign you up to either newsletter.
              Each one has its own box, and both are unticked unless you tick them.
            </p>
          </PolicySection>

          <PolicySection title="The legal bit, briefly">
            <p>
              The newsletters are based on your consent, which you can withdraw at any time. The
              waiting list, call form and emails are based on legitimate interests, or steps
              you&apos;ve asked us to take before working together. Invoices are kept because the
              law requires it.
            </p>
          </PolicySection>

          <PolicySection title="Where it's kept">
            <Bullets
              items={[
                'Airtable: the studio waiting list and free call requests.',
                'MailerLite: newsletter subscribers.',
                'Google (Gmail): email, received through Cloudflare email routing.',
                'Cloudflare and Vercel: host the websites. Like any web host they process your IP address to deliver pages and keep the sites secure.',
              ]}
            />
            <p>
              Some of these companies store data outside the UK, mainly in the US. They use the
              standard legal safeguards for international transfers.
            </p>
          </PolicySection>

          <PolicySection title="Who sees it">
            <p>
              Only Carey and the Brockley Fields team, and only for the reason you gave it to us.
              We don&apos;t sell, rent or share your details with anyone else, including our other
              companies. If you ask about co-writing or production, you contact Jax Management
              directly and their own privacy policy applies.
            </p>
          </PolicySection>

          <PolicySection title="How long we keep it">
            <Bullets
              items={[
                'Studio waiting list: until you get a room or ask to come off the list. We check it at least once a year.',
                'Newsletters: until you unsubscribe.',
                'Call requests: 12 months, then deleted, unless we end up working together.',
                "Emails: as long as they're useful for our work together.",
                'Invoices: six years.',
              ]}
            />
          </PolicySection>

          <PolicySection title="Cookies">
            <p>
              These sites don&apos;t use advertising or tracking cookies, so there&apos;s no cookie
              banner. Any visitor statistics are cookie-free.
            </p>
          </PolicySection>

          <PolicySection title="Your rights">
            <p>
              You can ask for a copy of what we hold about you, ask us to correct it or delete it,
              or object to how we use it. Email <Email /> and we&apos;ll reply within a month,
              usually much sooner.
            </p>
            <p>
              If you&apos;re unhappy with how we&apos;ve handled your data, you can complain to the
              Information Commissioner&apos;s Office at{' '}
              <InlineLink href="https://ico.org.uk" external>
                ico.org.uk
              </InlineLink>
              .
            </p>
          </PolicySection>
        </div>
      </Container>
    </main>
  )
}
