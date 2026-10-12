interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
}

export function SectionHeading({ id, eyebrow, title }: SectionHeadingProps) {
  return (
    <div>
      <p className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.25em] text-brass">
        <span aria-hidden="true" className="h-px w-10 bg-brass" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 text-[clamp(2.25rem,12vw,3rem)] leading-none [overflow-wrap:anywhere] sm:text-7xl"
      >
        {title}
      </h2>
    </div>
  )
}
