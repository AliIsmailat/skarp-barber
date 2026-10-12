const base =
  'inline-flex items-center justify-center border font-display font-bold uppercase tracking-[0.18em] transition-colors rounded-ui'

const variants = {
  solid: 'border-brass bg-brass text-ink hover:border-bone hover:bg-bone',
  outline: 'border-brass bg-transparent text-brass hover:bg-brass hover:text-ink',
} as const

const sizes = {
  sm: 'px-4 py-2.5 text-base',
  lg: 'px-9 py-4 text-xl',
} as const

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes

export const buttonClasses = (variant: ButtonVariant = 'solid', size: ButtonSize = 'lg') =>
  `${base} ${variants[variant]} ${sizes[size]}`
