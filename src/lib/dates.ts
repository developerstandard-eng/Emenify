/** Date helpers for the training calendar. Locale is fixed for consistent output. */
const LOCALE = 'en-GB'
/** Times are shown in venue time and labelled "(GST)". TODO(client): per-event time zone if venues outside the Gulf are added. */
export const EVENT_TIME_ZONE = 'Asia/Dubai'

export const fmt = {
  day: (d: Date) => d.toLocaleDateString(LOCALE, { day: '2-digit' }),
  monthShort: (d: Date) => d.toLocaleDateString(LOCALE, { month: 'short' }),
  monthYear: (d: Date) => d.toLocaleDateString(LOCALE, { month: 'long', year: 'numeric' }),
  weekday: (d: Date) => d.toLocaleDateString(LOCALE, { weekday: 'short' }),
  long: (d: Date) => d.toLocaleDateString(LOCALE, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  time: (d: Date) => d.toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit', timeZone: EVENT_TIME_ZONE }),
}

export const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`

export function monthFromKey(key: string) {
  const [y, m] = key.split('-').map(Number)
  return new Date(y, m - 1, 1)
}

export function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function dateRange(start: Date, end: Date) {
  if (sameDay(start, end)) return fmt.long(start)
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
  const s = start.toLocaleDateString(LOCALE, sameMonth ? { day: 'numeric' } : { day: 'numeric', month: 'long' })
  return `${s} – ${end.toLocaleDateString(LOCALE, { day: 'numeric', month: 'long', year: 'numeric' })}`
}

/** True if the day falls within [start, end], compared by calendar day. */
export function spansDay(start: Date, end: Date, day: Date) {
  const toDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  const d = toDay(day)
  return d >= toDay(start) && d <= toDay(end)
}
