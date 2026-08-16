/**
 * Grades the site's photography so a mixed set of sources sits together.
 *
 *   node scripts/grade-photos.mjs --dry-run     # report what would change
 *   node scripts/grade-photos.mjs               # write graded files
 *   node scripts/grade-photos.mjs --restore     # put the originals back
 *
 * The target is derived from the photos already on the site rather than being
 * hardcoded, so newly added photos are matched to the established look instead
 * of the look drifting toward whatever was added last.
 *
 * Every source file is copied to `_originals/` before it is overwritten, which
 * makes the command safe to run repeatedly: grading always starts from the
 * untouched original, so corrections never compound.
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import {
  ORIGINALS_DIRNAME,
  collectPhotos,
  deriveTarget,
  fileExists,
  formatMeasurement,
  gradeToBuffer,
  measurePhoto,
  planCorrection,
} from './photo-grade-lib.mjs'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const restore = args.includes('--restore')
/**
 * `--only a.jpg,b.jpg` grades just those photos while still measuring the whole
 * set to find the target.
 *
 * This is the usual case: the established photography is the reference, and
 * newly added photos are brought to it. Grading everything would instead move
 * the settled look toward whatever was added most recently.
 */
const onlyArg = args.find((a) => a.startsWith('--only'))
const onlyList = onlyArg
  ? (onlyArg.includes('=') ? onlyArg.split('=')[1] : args[args.indexOf(onlyArg) + 1])
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  : null

/**
 * The directory to scan. When `--only` takes its value as a separate argument,
 * that value is not the directory — so it is excluded here, otherwise
 * `--only photo.jpg` would try to scan `photo.jpg` as a folder.
 */
const onlyValueIndex =
  onlyArg && !onlyArg.includes('=') ? args.indexOf(onlyArg) + 1 : -1
const root =
  args.find((a, i) => !a.startsWith('--') && i !== onlyValueIndex) ?? 'public/images'

const originalFor = (file) => {
  const relative = path.relative(root, file)
  return path.join(root, ORIGINALS_DIRNAME, relative)
}

const files = await collectPhotos(root)
if (files.length === 0) {
  console.log(`No photos found under ${root}.`)
  process.exit(0)
}

if (restore) {
  let restored = 0
  for (const file of files) {
    const original = originalFor(file)
    if (await fileExists(original)) {
      await copyFile(original, file)
      restored += 1
    }
  }
  console.log(`Restored ${restored} photo(s) from ${path.join(root, ORIGINALS_DIRNAME)}.`)
  process.exit(0)
}

/**
 * Measurement always reads the original where one exists. Re-running the
 * command then re-grades from the untouched file rather than piling a second
 * correction on top of the first.
 */
const sources = new Map()
for (const file of files) {
  const original = originalFor(file)
  sources.set(file, (await fileExists(original)) ? original : file)
}

const measurements = []
for (const file of files) measurements.push(await measurePhoto(sources.get(file)))

const target = deriveTarget(measurements)

/** Matching on basename too, so a bare filename works as well as a full path. */
const isSelected = (file) =>
  !onlyList ||
  onlyList.some(
    (entry) =>
      file === entry ||
      file.endsWith(`/${entry}`) ||
      path.relative(root, file) === entry ||
      path.basename(file) === path.basename(entry),
  )

const selected = files.filter(isSelected)

console.log(
  `\n${dryRun ? 'Would grade' : 'Grading'} ${selected.length} photo(s), ` +
    `measured against ${files.length} under ${root}`,
)
console.log(`Target (median of the set): ${formatMeasurement(target)}\n`)

let changed = 0
let monochrome = 0

for (const measurement of measurements) {
  const file = files[measurements.indexOf(measurement)]
  if (!isSelected(file)) continue
  const source = sources.get(file)
  const correction = planCorrection(measurement, target)
  const name = path.relative(root, file)

  // Corrections below a couple of percent are invisible; skipping them avoids
  // re-encoding a file (and losing a little quality) for no visible gain.
  const negligible =
    Math.abs(correction.brightness - 1) < 0.02 &&
    Math.abs(correction.contrast - 1) < 0.02 &&
    Math.abs(correction.saturation - 1) < 0.02 &&
    Math.abs(correction.redFactor - 1) < 0.01 &&
    Math.abs(correction.blueFactor - 1) < 0.01

  if (negligible) {
    console.log(`  ${name.padEnd(42)} already on look`)
    continue
  }

  const parts = [
    `exposure ${(correction.brightness * 100 - 100).toFixed(0).padStart(3)}%`,
    `contrast ${(correction.contrast * 100 - 100).toFixed(0).padStart(3)}%`,
  ]
  if (correction.monochrome) {
    parts.push('mono: tone only')
    monochrome += 1
  } else {
    parts.push(`saturation ${(correction.saturation * 100 - 100).toFixed(0).padStart(3)}%`)
    parts.push(`balance ${correction.redFactor > 1 ? 'warmer' : 'cooler'}`)
  }
  console.log(`  ${name.padEnd(42)} ${parts.join('  ')}`)

  if (dryRun) {
    changed += 1
    continue
  }

  const buffer = await gradeToBuffer(source, correction)

  if (source === file) {
    const original = originalFor(file)
    await mkdir(path.dirname(original), { recursive: true })
    await copyFile(file, original)
  }

  await writeFile(file, buffer)
  changed += 1
}

console.log(
  `\n${dryRun ? 'Would change' : 'Graded'} ${changed} of ${selected.length} photo(s)` +
    (monochrome > 0 ? ` (${monochrome} monochrome, matched on tone only)` : ''),
)
if (!dryRun && changed > 0) {
  console.log(`Originals kept in ${path.join(root, ORIGINALS_DIRNAME)} — --restore puts them back.`)
}
console.log()
