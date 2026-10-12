import { buttonClasses, type ButtonSize, type ButtonVariant } from '../buttonStyles'
import { site } from '../content'

interface BookButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export function BookButton({ variant = 'solid', size = 'lg', className = '' }: BookButtonProps) {
  return (
    <a href={site.booking.href} className={`${buttonClasses(variant, size)} ${className}`}>
      {site.booking.buttonLabel}
    </a>
  )
}
