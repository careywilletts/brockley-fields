/**
 * Shared measurement and grading maths for the site's photography.
 *
 * Kept separate from the two entry points (measure / apply) so that the numbers
 * reported by a measure run are guaranteed to be the same numbers an apply run
 * acts on. If these ever diverged, the tool would grade toward a target the
 * report never showed anyone.
 */

import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

export const PHOTO_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

/**
 * Photos live alongside art that must not be touched. Logos, elevations, icons
 * and floorplans are flat graphics: "correcting" their exposure would wreck
 * them, so whole directories are excluded rather than relying on the caller to
 * remember which paths are safe.
 */
const EXCLUDED_DIRECTORIES = new Set(['brand', 'floorplans'])

/**
 * Logos that happen to live among the photographs. They are artwork with their
 * own fixed colours, so they are matched to nothing.
 */
const EXCLUDED_FILES = new Set(['brockley-brewery.png'])

/**
 * Below this saturation a photo is taken to be deliberately black and white
 * rather than badly white-balanced. Such photos get exposure and contrast
 * matched but no colour correction at all — nudging their channels apart would
 * tint a monochrome portrait, which is far worse than leaving it be.
 */
export const MONOCHROME_SATURATION = 0.02

/** Grading a file twice compounds the correction, so originals are set aside. */
export const ORIGINALS_DIRNAME = '_originals'

export async function collectPhotos(root) {
  const found = []

  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (EXCLUDED_DIRECTORIES.has(entry.name) || entry.name === ORIGINALS_DIRNAME) continue
        await walk(full)
        continue
      }
      if (EXCLUDED_FILES.has(entry.name)) continue
      if (PHOTO_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) found.push(full)
    }
  }

  await walk(root)
  return found.sort()
}

/**
 * Measures a photo on the four axes that make a mixed set look mismatched:
 * overall lightness, how much tonal spread it has, how colourful it is, and
 * which way its neutrals lean.
 *
 * Measured on a downscaled copy — grading decisions come from the broad
 * character of an image, and sampling every pixel of a 4000px photo costs time
 * without changing the averages.
 */
export async function measurePhoto(file) {
  const image = sharp(file).rotate()
  const metadata = await image.metadata()

  const { data, info } = await image
    .clone()
    .resize(200, 200, { fit: 'inside', withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const channels = info.channels
  const pixels = info.width * info.height

  let sumL = 0
  let sumSqL = 0
  let sumSat = 0
  let sumR = 0
  let sumG = 0
  let sumB = 0

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    // Rec. 601 luma: cheap, and close enough to perceived brightness for grading.
    const l = 0.299 * r + 0.587 * g + 0.114 * b
    sumL += l
    sumSqL += l * l

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    // HSL saturation is undefined for pure black; treat it as neutral.
    sumSat += max === 0 ? 0 : (max - min) / max

    sumR += r
    sumG += g
    sumB += b
  }

  const meanL = sumL / pixels
  const variance = Math.max(0, sumSqL / pixels - meanL * meanL)

  return {
    file,
    width: metadata.width,
    height: metadata.height,
    /** 0–255. */
    brightness: meanL,
    /** Standard deviation of luma. Low means flat, high means punchy. */
    contrast: Math.sqrt(variance),
    /** 0–1. */
    saturation: sumSat / pixels,
    /**
     * Positive means the image leans warm (red over blue), negative cool.
     * This is what makes one photo look yellow next to another's blue cast.
     */
    warmth: (sumR - sumB) / pixels,
    greenTint: (sumG - (sumR + sumB) / 2) / pixels,
  }
}

export function median(values) {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
}

/**
 * Builds the grading target from the photos already on the site.
 *
 * The median is used rather than the mean so that one very dark or very
 * saturated outlier cannot drag the whole set toward itself — the target should
 * describe the typical photo, not be skewed by the worst one.
 */
export function deriveTarget(measurements) {
  return {
    brightness: median(measurements.map((m) => m.brightness)),
    contrast: median(measurements.map((m) => m.contrast)),
    saturation: median(measurements.map((m) => m.saturation)),
    warmth: median(measurements.map((m) => m.warmth)),
    greenTint: median(measurements.map((m) => m.greenTint)),
  }
}

/**
 * How far a correction is allowed to go. A "natural, just consistent" grade
 * should nudge a photo toward the house look, never restyle it — so each axis
 * is clamped, and the strength dials the whole correction down to leave some of
 * the original character intact.
 */
export const LIMITS = {
  brightness: { min: 0.82, max: 1.22 },
  contrast: { min: 0.85, max: 1.18 },
  saturation: { min: 0.8, max: 1.25 },
  /** Per-channel multipliers for white balance; tighter, as casts show fast. */
  channel: { min: 0.9, max: 1.1 },
  strength: 0.75,
}

const clamp = (value, { min, max }) => Math.min(max, Math.max(min, value))

/** Pulls a ratio partway back toward 1 (no change) according to strength. */
const ease = (ratio, strength) => 1 + (ratio - 1) * strength

/**
 * Works out the correction that moves one photo toward the target, expressed as
 * multipliers sharp can apply in a single pipeline.
 */
export function planCorrection(measurement, target, strength = LIMITS.strength) {
  const brightness = clamp(
    ease(target.brightness / Math.max(1, measurement.brightness), strength),
    LIMITS.brightness,
  )
  const contrast = clamp(
    ease(target.contrast / Math.max(1, measurement.contrast), strength),
    LIMITS.contrast,
  )
  // A deliberately monochrome photo is matched on tone only. Its saturation is
  // left exactly where it is and its channels are held together, so it stays
  // neutral instead of picking up a cast from the colour target.
  if (measurement.saturation < MONOCHROME_SATURATION) {
    return {
      brightness,
      contrast,
      saturation: 1,
      redFactor: 1,
      greenFactor: 1,
      blueFactor: 1,
      monochrome: true,
    }
  }

  const saturation = clamp(
    ease(target.saturation / Math.max(0.01, measurement.saturation), strength),
    LIMITS.saturation,
  )

  // White balance is corrected as a red/blue split around the midpoint: an
  // image that is too warm gets red pulled down and blue lifted, and vice
  // versa. Working in deltas keeps overall exposure unchanged.
  const warmthError = (measurement.warmth - target.warmth) * strength
  const redFactor = clamp(1 - warmthError / 512, LIMITS.channel)
  const blueFactor = clamp(1 + warmthError / 512, LIMITS.channel)

  const greenError = (measurement.greenTint - target.greenTint) * strength
  const greenFactor = clamp(1 - greenError / 512, LIMITS.channel)

  return { brightness, contrast, saturation, redFactor, greenFactor, blueFactor }
}

/**
 * Applies a correction and returns the encoded buffer.
 *
 * Order matters: white balance and saturation are set first via `modulate` and
 * `tint`-free channel maths, then contrast is applied last as a linear ramp
 * about mid-grey so it does not re-introduce a colour shift.
 */
export async function gradeToBuffer(sourceFile, correction) {
  const { brightness, contrast, saturation, redFactor, greenFactor, blueFactor } = correction
  const format = path.extname(sourceFile).toLowerCase()

  // A linear ramp `a * x + b` about mid-grey: scaling around 128 rather than 0
  // changes tonal spread without also changing overall lightness.
  const contrastOffset = 128 * (1 - contrast)

  const slopes = [contrast * redFactor, contrast * greenFactor, contrast * blueFactor]
  const offsets = [contrastOffset, contrastOffset, contrastOffset]

  // `linear` maps over every channel it is given, alpha included. Cut-outs must
  // keep their transparency exactly, so alpha is passed through untouched
  // rather than being dragged along by the contrast ramp.
  const { hasAlpha } = await sharp(sourceFile).metadata()
  if (hasAlpha) {
    slopes.push(1)
    offsets.push(0)
  }

  let pipeline = sharp(sourceFile)
    .rotate()
    .modulate({ brightness, saturation })
    .linear(slopes, offsets)

  if (format === '.png') pipeline = pipeline.png({ compressionLevel: 9 })
  else if (format === '.webp') pipeline = pipeline.webp({ quality: 90 })
  else if (format === '.avif') pipeline = pipeline.avif({ quality: 80 })
  else pipeline = pipeline.jpeg({ quality: 92, mozjpeg: true })

  return pipeline.toBuffer()
}

export async function fileExists(file) {
  try {
    await stat(file)
    return true
  } catch {
    return false
  }
}

export const formatMeasurement = (m) =>
  [
    `brightness ${m.brightness.toFixed(1).padStart(5)}`,
    `contrast ${m.contrast.toFixed(1).padStart(5)}`,
    `saturation ${m.saturation.toFixed(3)}`,
    `warmth ${m.warmth >= 0 ? '+' : ''}${m.warmth.toFixed(1)}`,
  ].join('  ')
