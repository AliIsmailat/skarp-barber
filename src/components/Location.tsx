import { site } from "../content";
import { SectionHeading } from "./SectionHeading";

const DELTA = 0.0045;

export function Location() {
  const { location } = site;
  const { lat, lon } = location.map;

  const bbox = [
    lon - DELTA * 2,
    lat - DELTA,
    lon + DELTA * 2,
    lat + DELTA,
  ].join("%2C");
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  const largeMapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`;

  return (
    <section
      id="hitta-hit"
      aria-labelledby="hitta-hit-rubrik"
      className="border-t border-line bg-ink py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            id="hitta-hit-rubrik"
            eyebrow={location.eyebrow}
            title={location.title}
          />
          <address className="mt-8 font-display text-3xl font-bold uppercase not-italic tracking-wide sm:text-4xl">
            {location.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-6 max-w-md text-lg text-bone-muted">
            {location.description}
          </p>
          <a
            href={largeMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block font-semibold text-brass underline decoration-1 underline-offset-4 hover:text-bone"
          >
            {location.mapLinkLabel}
            <span className="sr-only"> (öppnas i ny flik)</span>
          </a>
        </div>

        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-ui border border-line bg-surface">
            <iframe
              src={embedUrl}
              title={location.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full border-0"
            />
          </div>
          <p className="mt-3 text-sm text-bone-muted">{location.mapNote}</p>
        </div>
      </div>
    </section>
  );
}
