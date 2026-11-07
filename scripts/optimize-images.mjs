import { mkdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const sourceDirectory = fileURLToPath(new URL('../src/assets/originals/', import.meta.url))
const outputDirectory = fileURLToPath(new URL('../public/images/', import.meta.url))

const imageJobs = [
  {
    name: 'alpha-vision-logo',
    source: 'alpha-vision-logo.png',
    widths: [480, 960, 1440],
  },
  {
    name: 'eyeglasses',
    source: 'eyeglasses-product.jpg',
    widths: [480, 768, 1080, 1440],
  },
  {
    name: 'sunglasses',
    source: 'sunglasses-product.jpg',
    widths: [400, 640, 960],
  },
  {
    name: 'optometrist',
    source: 'optometrist-portrait.png',
    widths: [360, 540, 780],
  },
]

await mkdir(outputDirectory, { recursive: true })

for (const job of imageJobs) {
  const sourcePath = path.join(sourceDirectory, job.source)
  const sourceInfo = await stat(sourcePath)
  const source = sharp(sourcePath, { failOn: 'error' })
  const metadata = await source.metadata()

  if (!metadata.width || !metadata.height || !sourceInfo.size) {
    throw new Error(`Could not read dimensions for ${job.source}`)
  }

  for (const width of job.widths) {
    if (width > metadata.width) continue

    const baseName = `${job.name}-${width}`
    const resized = sharp(sourcePath).resize({ width, withoutEnlargement: true })

    await Promise.all([
      resized
        .clone()
        .webp({ quality: 80, effort: 5 })
        .toFile(path.join(outputDirectory, `${baseName}.webp`)),
      resized
        .clone()
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(path.join(outputDirectory, `${baseName}.jpg`)),
    ])
  }

  console.log(`Optimized ${job.name} from ${sourceInfo.size.toLocaleString()} bytes`)
}
