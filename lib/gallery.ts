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
  'brockley-fields-studios/05-kitchen-run.jpg':
    'The kitchen run at Brockley Fields Studios: green shaker cabinetry with timber worktops, a Belfast sink and integrated appliances, a tall cupboard topped with a film reel, and the seating corner by the window beyond.',
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
  'the-yard/05-shelves-and-microwave.jpg':
    'A close view of the Yard\u2019s wire wall-shelves styled with a beige vase, a clock, a reed diffuser, bottles and trailing pothos, above an oak worktop with a wooden board, salt and pepper grinders and a stainless microwave.',
  'the-yard/06-glazed-partition.jpg':
    'A threshold in the Yard\u2019s communal area: a black Crittall-style glazed partition and door opening onto the wood-floored hallway, lit by a caged pendant, with a framed \u201chumble\u201d print and the dining table edge in view.',
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
