import { images, site } from '../content'
import { Picture } from './Picture'
import { SectionHeading } from './SectionHeading'

export function About() {
  const { about } = site

  return (
    <section
      id="om-oss"
      aria-labelledby="om-oss-rubrik"
      className="border-t border-line bg-ink py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="om-oss-rubrik" eyebrow={about.eyebrow} title={about.title} />
        <p className="mt-6 max-w-2xl text-lg text-bone-muted">{about.text}</p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="aspect-[4/5] overflow-hidden rounded-ui bg-surface sm:aspect-[4/3] lg:aspect-[4/5]">
            <Picture image={images.about} sizes="(min-width: 1024px) 560px, 100vw" />
          </div>

          <ul
            role="list"
            aria-label={about.barbersLabel}
            className="divide-y divide-line border-y border-line"
          >
            {about.barbers.map((barber, index) => (
              <li key={barber.name} className="flex items-baseline gap-6 py-6">
                <span className="font-display text-xl font-bold tracking-wide text-brass">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-3xl sm:text-4xl">{barber.name}</h3>
                  <p className="mt-1 text-bone-muted">{barber.specialty}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
