/**
 * The wider community — the places around the building that make this part of
 * London what it is.
 *
 * Real places only, same rule as lib/people.ts: no invented neighbours and no
 * placeholder photography. Add an entry here and it appears on the Community
 * page automatically. `photo` and `handle` are both optional, so a place can go
 * in as soon as we have its name and one line about it.
 */

export type Place = {
  name: string
  /** One line. What the place is, in the way you would actually describe it. */
  blurb: string
  /** Instagram handle, without the @. Undefined for places that have none. */
  handle?: string
  photo?: { src: string; alt: string }
}

export const places: Place[] = [
  {
    name: 'Water into Beer',
    blurb: 'Best bottle shop in London.',
    handle: 'waterintobeer',
    photo: {
      src: '/images/water-into-beer.png',
      alt: 'Inside Water into Beer: blue shelves of craft beer cans and bottles, glass-fronted fridges and a few small tables',
    },
  },
  {
    name: 'Browns of Brockley',
    blurb: 'Best coffee in London.',
    handle: 'brownsofbrockley',
    photo: {
      src: '/images/browns-of-brockley.jpg',
      alt: 'The navy shopfront of Browns of Brockley with gold signage, pavement tables out front and a muralled building next door',
    },
  },
  {
    name: 'Brockley Brewery',
    blurb: 'Best taproom in London.',
    handle: 'brockleybrewery',
    photo: {
      src: '/images/brockley-brewery.png',
      alt: 'The Brockley Brewing Company frontage: painted signage on brick above bright yellow mural doors showing a blossom tree, a parakeet and a fox',
    },
  },
  {
    name: 'Good as Gold',
    blurb: 'Best cafe in London.',
    handle: 'goodasgoldldn',
    photo: {
      src: '/images/good-as-gold.png',
      alt: 'The white corner frontage of Good as Gold in the sun, with people sitting at pavement tables outside',
    },
  },
  {
    name: 'Parlez',
    blurb: 'Best brunch in London.',
    handle: 'parlezlocal',
    photo: {
      src: '/images/parlez.jpg',
      alt: 'The terrace outside Parlez at golden hour, busy with people at tables under green parasols',
    },
  },
  {
    name: 'Joyce',
    blurb: 'Best bar in London.',
    handle: 'joyce.brockley',
    photo: {
      src: '/images/joyce.png',
      alt: 'The dark grey corner frontage of Joyce, with hanging baskets, festoon lights and people at pavement tables',
    },
  },
  {
    name: 'Skehans',
    blurb: 'Best pub in London.',
    handle: 'skehansfreehouse',
    photo: {
      src: '/images/skehans.png',
      alt: 'Two pints of Guinness held up outside Skehans, with the red-brick pub and its hanging flower baskets behind',
    },
  },
  {
    name: 'The Broca Café',
    blurb: 'Best vegan café in London.',
    handle: 'thebrocacafe',
    photo: {
      src: '/images/broca-cafe.jpg',
      alt: 'A small dog in a yellow knitted jumper sitting on a stool outside The Broca Café, under its yellow frontage and white lettering',
    },
  },
  {
    name: 'Mauby',
    blurb: 'Best Caribbean small plates in London.',
    handle: 'maubybrockley',
    photo: {
      src: '/images/mauby.jpg',
      alt: 'The window of Mauby at dusk, warmly lit inside with MAUBY lettered on the wall and festoon lights above the shopfront',
    },
  },
  {
    name: 'Ellary’s',
    blurb: 'Best family run restaurant in London.',
    handle: 'ellarysbrockley',
    photo: {
      src: '/images/ellarys.jpg',
      alt: 'The coral orange frontage of Ellary’s, with white lettering above an awning and a small table and chairs on the pavement',
    },
  },
  {
    name: 'Telegraph Hill',
    blurb: 'The best view of London.',
    handle: 'telegraphhillpark',
    photo: {
      src: '/images/telegraph-hill.jpg',
      alt: 'People sitting on the grass slope of Telegraph Hill Park at dusk, looking out over rooftops and trees to the London skyline',
    },
  },
  {
    name: 'Hilly Fields',
    blurb: 'The hardest park run in London.',
    handle: 'hilly_fields_se4',
    photo: {
      src: '/images/hilly-fields.jpg',
      alt: 'The stone circle on Hilly Fields: rounded standing stones set in bright green grass with a row of trees behind',
    },
  },
]
