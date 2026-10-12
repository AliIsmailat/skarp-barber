import { useEffect, useState } from 'react'
import logoUrl from '../assets/logo.svg'
import { logo, site } from '../content'
import { BookButton } from './BookButton'

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
    >
      {open ? <path d="M5 5L19 19M19 5L5 19" /> : <path d="M3 7H21M3 12H21M3 17H21" />}
    </svg>
  )
}

export function Header() {
  const { nav } = site
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (desktop.matches) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onChange)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onChange)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line bg-ink/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <a href="#top" className="shrink-0" onClick={() => setOpen(false)}>
            <img src={logoUrl} alt={logo.alt} width={36} height={36} className="h-9 w-auto" />
          </a>

          <nav aria-label={nav.label} className="hidden lg:block">
            <ul role="list" className="flex items-center gap-8">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold uppercase tracking-[0.2em] text-bone-muted transition-colors hover:text-brass"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <BookButton size="sm" />
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobilmeny"
              aria-label={open ? nav.closeLabel : nav.openLabel}
              onClick={() => setOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center border border-line text-bone transition-colors hover:border-brass hover:text-brass lg:hidden"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>
      </header>

      <nav
        id="mobilmeny"
        aria-label={nav.label}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-20 overflow-y-auto bg-ink lg:hidden"
      >
        <ul role="list" className="mx-auto max-w-6xl px-6 py-4">
          {nav.links.map((link) => (
            <li key={link.href} className="border-b border-line">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-5 font-display text-4xl font-bold uppercase tracking-wide transition-colors hover:text-brass"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
