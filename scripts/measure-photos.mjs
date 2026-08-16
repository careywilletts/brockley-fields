/**
 * Reports how each photo sits against the house look, and changes nothing.
 *
 * Run this before grading to see which photos are actually out of step, and
 * after grading to confirm the spread has closed up:
 *   node scripts/measure-photos.mjs [dir]
 */

import path from 'node:path'
import {
  collectPhotos,
  deriveTarget,
  formatMeasurement,
  measurePhoto,
} from './photo-grade-lib.mjs'

const root = process.argv[2] ?? 'public/images'

const files = await collectPhotos(root)
if (files.length === 0) {
  console.log(`No photos found under ${root}.`)
  process.exit(0)
}

const measurements = []
for (const file of files) measurements.push(await measurePhoto(file))

const target = deriveTarget(measurements)

console.log(`\nMeasured ${measurements.length} photos under ${root}\n`)
console.log(`House look (median): ${formatMeasurement(target)}\n`)

// Sorted by how far each photo sits from the target, so the images actually
// worth looking at appear first rather than being buried in alphabetical order.
const scored = measurements
  .map((m) => ({
    m,
    drift:
      Math.abs(m.brightness - target.brightness) / 8 +
      Math.abs(m.contrast - target.contrast) / 8 +
      Math.abs(m.saturation - target.saturation) * 40 +
      Math.abs(m.warmth - target.warmth) / 6,
  }))
  .sort((a, b) => b.drift - a.drift)

console.log('Furthest from the house look:')
for (const { m, drift } of scored.slice(0, 12)) {
  const name = path.relative(root, m.file)
  console.log(`  ${name.padEnd(42)} ${formatMeasurement(m)}  drift ${drift.toFixed(1)}`)
}

const spread = (key) => {
  const values = measurements.map((m) => m[key])
  return Math.max(...values) - Math.min(...values)
}

console.log('\nSpread across the set (smaller is more consistent):')
console.log(`  brightness ${spread('brightness').toFixed(1)}`)
console.log(`  contrast   ${spread('contrast').toFixed(1)}`)
console.log(`  saturation ${spread('saturation').toFixed(3)}`)
console.log(`  warmth     ${spread('warmth').toFixed(1)}\n`)
