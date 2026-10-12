import { images, site } from '../content'
import { BookButton } from './BookButton'
import { Picture } from './Picture'

export function Hero() {
  const { hero } = site

  return (
    <section
      id="top"
      aria-labelledby="hero-rubrik"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 -z-20">
        <Picture image={images.hero} sizes="100vw" eager />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/40"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-24 sm:pb-24">
        <p className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.25em] text-brass">
          <span aria-hidden="true" className="h-px w-10 bg-brass" />
          {hero.label}
        </p>
        <h1
          id="hero-rubrik"
          className="mt-6 text-[clamp(3rem,min(13vw,14vh),9rem)] leading-[0.9]"
        >
          {hero.heading}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-bone-muted sm:text-xl">{hero.subheading}</p>
        <div className="mt-10">
          <BookButton />
        </div>
      </div>
    </section>
  )
}
