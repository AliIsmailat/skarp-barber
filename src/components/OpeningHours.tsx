import { useState } from 'react'
import { site } from '../content'
import { SectionHeading } from './SectionHeading'

export function OpeningHours() {
  const { openingHours } = site
  const [todayIndex] = useState(() => (new Date().getDay() + 6) % 7)

  return (
    <section
      id="oppettider"
      aria-labelledby="oppettider-rubrik"
      className="border-t border-line bg-surface py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <SectionHeading
            id="oppettider-rubrik"
            eyebrow={openingHours.eyebrow}
            title={openingHours.title}
          />
          <p className="mt-6 max-w-sm text-bone-muted">{openingHours.note}</p>
        </div>

        <table className="w-full self-start text-left text-lg sm:text-xl">
          <caption className="sr-only">{openingHours.title} per veckodag</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">Dag</th>
              <th scope="col">Tid</th>
            </tr>
          </thead>
          <tbody>
            {openingHours.days.map((row, index) => {
              const isToday = index === todayIndex
              const isClosed = row.open === null
              return (
                <tr
                  key={row.day}
                  className={`border-b border-line ${isToday ? 'font-semibold' : ''} ${isClosed ? 'text-bone-muted' : ''}`}
                >
                  <th scope="row" className="py-4 pr-4 font-[inherit]">
                    {row.day}
                    {isToday && (
                      <span className="mt-1 block w-fit border border-brass px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-brass sm:ml-3 sm:mt-0 sm:inline-block sm:align-middle">
                        {openingHours.todayLabel}
                      </span>
                    )}
                  </th>
                  <td className="py-4 text-right tabular-nums">
                    {isClosed ? openingHours.closedLabel : `${row.open}-${row.close}`}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
