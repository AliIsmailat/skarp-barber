import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { imagetools } from 'vite-imagetools'
import { site, theme } from './src/content.ts'

const escapeHtml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')

const fontsUrl =
  'https://fonts.googleapis.com/css2?' +
  Object.values(theme.fonts)
    .map((font) => `family=${font.family.replaceAll(' ', '+')}:wght@${font.weights.join(';')}`)
    .join('&') +
  '&display=swap'

const htmlFromContent = (): Plugin => {
  const values: Record<string, string> = {
    title: site.meta.title,
    description: site.meta.description,
    themeColor: theme.colors.ink,
    fontsUrl,
  }

  return {
    name: 'html-from-content',
    transformIndexHtml: (html) =>
      html.replace(/\{\{(\w+)\}\}/g, (match, key: string) =>
        key in values ? escapeHtml(values[key]) : match,
      ),
  }
}

export default defineConfig({
  plugins: [
    react(),
    imagetools({ include: /^[^?]+\.(avif|gif|heif|jpeg|jpg|png|tiff|webp)(\?.*)?$/i }),
    htmlFromContent(),
  ],
})