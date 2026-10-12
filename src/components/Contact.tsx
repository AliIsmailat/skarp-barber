import { site } from '../content'
import { SectionHeading } from './SectionHeading'

const linkClass =
  'inline-block py-1 font-display text-3xl font-bold tracking-wide transition-colors [overflow-wrap:anywhere] hover:text-brass sm:text-5xl'

const labelClass = 'text-sm font-semibold uppercase tracking-[0.25em] text-bone-muted'

export function Contact() {
  const { contact } = site

  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-rubrik"
      className="border-t border-line bg-surface py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="kontakt-rubrik" eyebrow={contact.eyebrow} title={contact.title} />
        <p className="mt-6 max-w-xl text-lg text-bone-muted">{contact.intro}</p>

        <address className="mt-12 not-italic">
          <ul role="list" className="divide-y divide-line border-y border-line lg:max-w-4xl">
            <li className="py-6">
              <p className={labelClass}>{contact.phoneLabel}</p>
              <a href={contact.phoneHref} className={`${linkClass} uppercase`}>
                {contact.phoneDisplay}
              </a>
            </li>
            <li className="py-6">
              <p className={labelClass}>{contact.emailLabel}</p>
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
            </li>
            <li className="py-6">
              <p className={labelClass}>{contact.instagramLabel}</p>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {contact.instagramHandle}
                <span className="sr-only"> (öppnas i ny flik)</span>
              </a>
            </li>
          </ul>
        </address>
      </div>
    </section>
  )
}
