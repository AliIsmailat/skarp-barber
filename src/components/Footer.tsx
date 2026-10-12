import { images, site } from '../content'

export function Footer() {
  const credits = [images.hero, images.about, ...images.gallery]
    .map((image) => image.photographer.trim())
    .filter((name, index, all) => name !== '' && all.indexOf(name) === index)

  return (
    <footer className="border-t border-line bg-surface py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-display text-3xl font-bold uppercase tracking-wide">{site.name}</p>
        <p className="mt-2 text-lg text-bone-muted">{site.footerText}</p>
        {credits.length > 0 && (
          <p className="mt-6 text-sm text-bone-muted">Foto: {credits.join(', ')}</p>
        )}
      </div>
    </footer>
  )
}
