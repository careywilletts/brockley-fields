import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

/**
 * Drop-in gallery.
 *
 * Photographs live in `public/images/gallery/<section>/`. Each sub-folder is a
 * section on the page, and every image inside it appears automatically — no
 * code change needed to add or remove a photo. Files are shown in filename
 * order, so a numeric prefix (01-, 02-, …) controls the sequence.
 *
 * This runs at build time: the gallery page is fully static, so the filesystem
 * read and the sharp dimension probe happen during prerender, never per request.
 *
 * Two things are curated on top of the auto-load, both optional:
 *   - SECTION_TITLES  — a nice heading for a folder slug (else it's humanised).
 *   - ALT             — real alt text per "<section>/<file>" (else a fallback).
 * A freshly dropped-in photo therefore still renders and is still accessible;
 * it just gets a generic description until its line is added below.
 */

export type GalleryImage = { src: string; alt: string; width: number; height: number }
export type GallerySection = { slug: string; title: string; images: GalleryImage[] }

const GALLERY_DIR = path.join(process.cwd(), 'public/images/gallery')
const IMAGE_RE = /\.(jpe?g|png|webp|avif)$/i

const SECTION_TITLES: Record<string, string> = {
  'brockley-fields-studios': 'Brockley Fields Studios',
  'studio-1': 'Studio 1',
  'studio-2': 'Studio 2',
  'the-yard': 'The Yard',
}

const ALT: Record<string, string> = {
  'brockley-fields-studios/01-kitchen-diner.jpg':
    'The communal kitchen and dining area at Brockley Fields Studios: a reclaimed-wood bench table on a metal frame, green shaker units with timber worktops and a Belfast sink, and an oxblood leather chair beside a double bass at the window onto the courtyard.',
  'brockley-fields-studios/02-chair-and-bass.jpg':
    'A quiet corner of the communal area: a button-tufted oxblood leather swivel chair and an upright double bass on a stand, set against the full-height window looking onto the ivy-covered light well.',
  'brockley-fields-studios/03-sink-and-shelf.jpg':
    'A detail of the kitchen: a butler sink with a gooseneck tap and metro-tiled splashback, below a reclaimed-timber shelf holding storage jars, chopping boards, glasses and a vintage Spruce Cleaning Services sign.',
  'brockley-fields-studios/04-desk-nook.jpg':
    'A writing nook in the communal area: a vintage school desk and matching bench with a grey steel frame, an articulated task lamp on the wall and a printer\u2019s tray of small curios above.',
  'brockley-fields-studios/06-gig-poster.jpg':
    'A framed 2005 Bright Eyes gig poster with a blue toy-robot illustration, hung on a pink plaster wall between two green-painted doorways in the communal hallway.',
  'brockley-fields-studios/07-studio-doorway.jpg':
    'A view from the communal hallway through an open acoustic door into one of the control rooms, showing studio monitors, racks of outboard equipment, a bass guitar and a chair on a rug amid blue acoustic panelling.',
  'brockley-fields-studios/08-kitchen-window.jpg':
    'A wide view across the communal kitchen and dining area, with exposed silver ductwork overhead, the bench table on the left and the oxblood chair and double bass framed by the window onto the courtyard.',
  'the-yard/01-dining-room.jpg':
    'The communal dining area at the Yard: a plywood-topped table with red-framed vintage school chairs beneath caged industrial pendants and an exposed black steel beam, with framed music prints on the wall and the kitchen run beyond.',
  'the-yard/02-lounge-sofa.jpg':
    'A sunlit lounge corner at the Yard: a mustard sofa piled with yellow velvet cushions beside a large monstera and a full-height window, with a green vintage step-ladder and a yellow floor lamp against the kitchen units.',
  'the-yard/03-kitchen-run.jpg':
    'The kitchen run at the Yard: white cabinetry with an oak worktop, a sink, kettle and wine cooler, framed indie gig prints on the wall and mesh wire shelves holding trailing pothos, a clock and bottles.',
  'the-yard/04-kitchen-detail.jpg':
    'A detail of the Yard kitchen: a framed Sparklehorse \u201cGood Morning Spider\u201d print beside mesh wire shelves with trailing pothos, a clock and glass bottles, above an oak worktop with a kettle, chopping board and microwave.',
  'the-yard/06-glazed-partition.jpg':
    'A threshold in the Yard\u2019s communal area: a black Crittall-style glazed partition and door opening onto the wood-floored hallway, lit by a caged pendant, with a framed \u201chumble\u201d print and the dining table edge in view.',
  'studio-1/01-live-room.jpg':
    'Studio 1 set up to work in: dark acoustic-fabric walls and a suspended grey ceiling cloud with downlights, racks of synths and outboard gear beside studio monitors on stands, an upright piano in the foreground, a rolling sit-stand desk with a DAW open on screen, a mustard-yellow armchair and a grey sofa, lit by a paper-lantern lamp and a full-height window onto the trees.',
  'studio-1/02-empty-room.jpg':
    'Studio 1 empty and finished: dark grey acoustic-fabric wall panels and a black-trimmed ceiling cloud with recessed downlights, a warm reclaimed-oak floor, a low black-topped plinth to one side and a full-height window looking onto greenery.',
  'studio-1/03-window-wall.jpg':
    'A detail of Studio 1\u2019s window wall: a tall black-framed glazed window onto sunlit trees, flanked by grey fabric acoustic panels over warm plaster, above the reclaimed-oak floor.',
  'studio-2/01-live-room.jpg':
    'A wide view of Studio 2 at Brockley Fields Studios: reclaimed oak floors and warm plaster walls, a green mid-century armchair by the full-height windows onto the trees, a dracaena plant, a red accordion, and the black upright piano in the corner.',
  'studio-2/02-piano-corner.jpg':
    'The piano corner of Studio 2: a black Kawai upright beneath a shelf of framed gold and platinum discs and the neon \u201cBrockley Fields Studios\u201d sign, with a fringed vintage lamp, a dracaena and a red accordion on the oak floor by the window.',
  'studio-2/03-piano-and-guitars.jpg':
    'Studio 2\u2019s upright piano seen front-on with its top open, flanked by a Gibson semi-hollow guitar on a stand and an archtop guitar resting on the rug, below the framed discs, neon sign and fringed lamp.',
  'studio-2/04-piano-mic.jpg':
    'A moody, warmly-lit view of Studio 2\u2019s upright piano set up for recording, with a pair of condenser microphones over the open lid, a classical guitar leaning against the stool and the neon sign glowing behind.',
  'studio-2/05-drum-kit.jpg':
    'A vintage silver-sparkle drum kit in Studio 2, its bass drum bearing a hand-painted swan logo, set on a patterned rug in front of a Fender and a VOX amplifier, with a green mid-century armchair beside the window.',
  'studio-2/06-drums-and-piano.jpg':
    'Studio 2 bathed in sunlight: the sparkle drum kit and ride cymbal in the foreground by the full-height windows, with the black upright piano, neon sign and framed discs across the room.',
  'studio-2/07-amp-stack.jpg':
    'A corner of Studio 2 with a Fender Deluxe and a VOX amplifier stacked on reclaimed-timber shelving, a sunburst semi-hollow guitar leaning beside them and a green mid-century armchair at the full-height window.',
  'studio-2/08-awards-shelf.jpg':
    'A detail in Studio 2 of the framed gold and platinum record awards on a timber shelf above the neon \u201cBrockley Fields Studios\u201d sign, official chart trophies and a fringed vintage lamp.',
}

function humanize(slug: string) {
  return slug
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export async function getGallery(): Promise<GallerySection[]> {
  if (!fs.existsSync(GALLERY_DIR)) return []

  const dirs = fs
    .readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))

  const sections: GallerySection[] = []

  for (const dir of dirs) {
    const files = fs
      .readdirSync(path.join(GALLERY_DIR, dir))
      .filter((file) => IMAGE_RE.test(file))
      .sort((a, b) => a.localeCompare(b))

    const images: GalleryImage[] = []
    for (const file of files) {
      const meta = await sharp(path.join(GALLERY_DIR, dir, file)).metadata()
      const key = `${dir}/${file}`
      images.push({
        src: `/images/gallery/${dir}/${file}`,
        alt: ALT[key] ?? `A photograph of ${SECTION_TITLES[dir] ?? humanize(dir)}.`,
        width: meta.width ?? 1600,
        height: meta.height ?? 1200,
      })
    }

    if (images.length > 0) {
      sections.push({ slug: dir, title: SECTION_TITLES[dir] ?? humanize(dir), images })
    }
  }

  return sections
}
