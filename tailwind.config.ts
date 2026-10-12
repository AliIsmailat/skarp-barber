import type { Config } from 'tailwindcss'
import { theme } from './src/content.ts'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: theme.colors.ink,
        surface: theme.colors.surface,
        line: theme.colors.line,
        bone: theme.colors.bone,
        'bone-muted': theme.colors.boneMuted,
        brass: theme.colors.brass,
      },
      fontFamily: {
        display: [`"${theme.fonts.display.family}"`, 'Impact', 'system-ui', 'sans-serif'],
        sans: [`"${theme.fonts.body.family}"`, 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        ui: theme.radius.ui,
      },
    },
  },
} satisfies Config
