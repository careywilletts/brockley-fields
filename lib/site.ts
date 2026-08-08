export const site = {
  name: 'Brockley Fields',
  fullName: 'Brockley Fields Studios',
  tagline: 'Studios for people who make things, in the heart of southeast London.',
  mission: 'Brockley Fields was built on a simple belief: people matter.',
  // Address is deliberately never published. Shared privately with applicants only.
  location: 'Brockley, SE4, Southeast London',
  email: 'hello@brockleyfields.com',
  instagram: '@brockleyfields',
  instagramUrl: 'https://instagram.com/brockleyfields',
} as const

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Studios', href: '/studios' },
  { label: 'Part of the Family', href: '/part-of-the-family' },
  { label: 'Community', href: '/community' },
  { label: 'Music', href: '/music' },
  { label: 'Events & News', href: '/events-and-news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
] as const

export const waitingListHref = '/waiting-list'
