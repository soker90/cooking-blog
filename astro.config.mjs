import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import svelte from '@astrojs/svelte'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  site: 'https://recetas.eduardoparra.es/',
  integrations: [
    mdx(),
    svelte(),
    sitemap()
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '$': path.resolve(__dirname, './src'),
      },
    },
  }
});
