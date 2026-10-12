import { site } from '../content'
import { SectionHeading } from './SectionHeading'

export function Services() {
  const { services } = site

  return (
    <section
      id="tjanster"
      aria-labelledby="tjanster-rubrik"
      className="border-t border-line bg-ink py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="tjanster-rubrik" eyebrow={services.eyebrow} title={services.title} />
        <p className="mt-6 max-w-xl text-lg text-bone-muted">{services.intro}</p>

        <ul role="list" className="mt-12 divide-y divide-line border-y border-line lg:max-w-4xl">
          {services.items.map((item) => (
            <li key={item.name} className="flex items-start justify-between gap-6 py-6">
              <div>
                <h3 className="text-3xl sm:text-4xl">{item.name}</h3>
                <p className="mt-2 max-w-md text-bone-muted">{item.description}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-bone-muted">
                  {item.duration} min
                </p>
              </div>
              <p className="shrink-0 whitespace-nowrap font-display text-3xl font-bold tracking-wide text-brass sm:text-4xl">
                {item.price} kr
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
