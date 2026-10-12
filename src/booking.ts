import { site } from './content'

export const ANY_BARBER = 'any'

export interface Slot {
  time: string
  available: boolean
}

const pad = (value: number) => String(value).padStart(2, '0')

export const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export const toTime = (total: number) => `${pad(Math.floor(total / 60))}:${pad(total % 60)}`

export const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

export const parseDateKey = (key: string) => {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const addDays = (date: Date, days: number) => {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export const getHours = (key: string) =>
  site.openingHours.days[(parseDateKey(key).getDay() + 6) % 7]

const hash = (value: string) => {
  let result = 0
  for (let index = 0; index < value.length; index += 1) {
    result = (result * 31 + value.charCodeAt(index)) >>> 0
  }
  return result
}

const isTaken = (key: string, time: string, barber: string) =>
  hash(`${key}|${time}|${barber}`) % 100 < site.booking.takenPercent

export function getSlots(
  key: string,
  duration: number,
  barber: string,
  now: Date,
  people = 1,
): Slot[] {
  const hours = getHours(key)
  if (!hours.open || !hours.close) return []

  const open = toMinutes(hours.open)
  const close = toMinutes(hours.close)
  const isToday = key === toDateKey(now)
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  const names = site.about.barbers.map((barberItem) => barberItem.name)
  const slots: Slot[] = []

  for (let start = open; start + duration <= close; start += site.booking.slotInterval) {
    const time = toTime(start)
    const free =
      barber === ANY_BARBER
        ? names.filter((name) => !isTaken(key, time, name)).length >= people
        : !isTaken(key, time, barber)
    slots.push({ time, available: free && !(isToday && start <= nowMinutes) })
  }

  return slots
}