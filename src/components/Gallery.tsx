import { images, site } from '../content'
import { Picture } from './Picture'
import { SectionHeading } from './SectionHeading'

export function Gallery() {
  const { gallery } = site

  return (
    <section
      id="galleri"
      aria-labelledby="galleri-rubrik"
      className="border-t border-line bg-surface py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="galleri-rubrik" eyebrow={gallery.eyebrow} title={gallery.title} />
        <p className="mt-6 max-w-xl text-lg text-bone-muted">{gallery.intro}</p>

        <ul role="list" className="mt-12 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
          {images.gallery.map((image) => (
            <li key={image.file} className="aspect-[4/5] overflow-hidden rounded-ui bg-ink">
              <Picture image={image} sizes="(min-width: 768px) 33vw, 50vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
