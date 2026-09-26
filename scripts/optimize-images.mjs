import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const inputDir = path.resolve('public/images/uploads')
const outputDir = path.resolve('public/images/optimized')
const widths = [640, 1024, 1600]

const files = (await fs.readdir(inputDir))
    .filter(file => /\.jpe?g$/i.test(file))
    .sort()

await fs.rm(outputDir, { recursive: true, force: true })
await fs.mkdir(outputDir, { recursive: true })

for (const file of files) {
    const input = path.join(inputDir, file)
    const base = file.replace(/\.jpe?g$/i, '')
    const pipeline = sharp(input)

    await Promise.all(widths.flatMap(width => [
        pipeline.clone().resize({ width, withoutEnlargement: true }).avif({ quality: 50, effort: 4 }).toFile(path.join(outputDir, `${base}-${width}.avif`)),
        pipeline.clone().resize({ width, withoutEnlargement: true }).webp({ quality: 75, effort: 4 }).toFile(path.join(outputDir, `${base}-${width}.webp`))
    ]))
}

console.log(`Optimized ${files.length} recipe image(s) into AVIF and WebP responsive variants.`)
