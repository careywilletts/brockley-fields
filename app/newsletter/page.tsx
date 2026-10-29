import type { Metadata } from 'next'
import { Container, PageHeader } from '@/components/primitives'
import { NewsletterForm } from '@/components/newsletter-form'

export const metadata: Metadata = {
  title: 'Newsletter',
  description:
    "Carey's newsletter, including all things Brockley Fields Studios. Occasional, and you can unsubscribe from any email.",
}

export default function NewsletterPage() {
  return (
    <main>
      <PageHeader
        label="Newsletter"
        title="Carey's newsletter."
        intro={<p>Including all things Brockley Fields Studios.</p>}
      />
      <section className="border-foreground/20 border-t py-14 sm:py-20">
        <Container>
          <NewsletterForm />
        </Container>
      </section>
    </main>
  )
}
