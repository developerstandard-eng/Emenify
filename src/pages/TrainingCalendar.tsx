import { CalendarDays, ChevronLeft, ChevronRight, Clock, List, MapPin, Users } from 'lucide-react'
import { lazy, Suspense, useMemo, useState, type ReactNode } from 'react'
import { PageHero } from '@/components/sections/PageHero'
import { Badge, Button, Modal } from '@/components/ui'
import { events, type EventMode, type TrainingEvent } from '@/data/events'
import { pageMeta } from '@/data/site'
import { cn } from '@/lib/cn'
import { dateRange, fmt, monthFromKey, monthKey, sameDay, spansDay } from '@/lib/dates'
import { useDocumentTitle } from '@/lib/useDocumentTitle'

/*
 * Training calendar, modelled on The Events Calendar (WordPress) list and month views.
 * HOW TO ADD EVENTS: see the comment block at the top of src/data/events.ts.
 */

const TrainingEnquiryForm = lazy(() => import('@/components/forms/TrainingEnquiryForm').then((m) => ({ default: m.TrainingEnquiryForm })))

type View = 'list' | 'month'
type ModeFilter = 'All' | EventMode
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const sorted = [...events]
  .map((e) => ({ ...e, startDate: new Date(e.start), endDate: new Date(e.end) }))
  .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
type CalEvent = (typeof sorted)[number]

const eventMonths = Array.from(new Set(sorted.map((e) => monthKey(e.startDate))))

export default function TrainingCalendar() {
  useDocumentTitle(pageMeta.training)
  const today = useMemo(() => new Date(), [])
  const [view, setView] = useState<View>('list')
  const [mode, setMode] = useState<ModeFilter>('All')
  const [month, setMonth] = useState<string>('all')
  const [shownMonth, setShownMonth] = useState(() => {
    const upcoming = sorted.find((e) => e.endDate >= today)
    return monthKey(upcoming?.startDate ?? today)
  })
  const [selected, setSelected] = useState<TrainingEvent | null>(null)

  const byMode = sorted.filter((e) => mode === 'All' || e.mode === mode)
  const listEvents = byMode.filter((e) => e.endDate >= today && (month === 'all' || monthKey(e.startDate) === month))

  const changeMonth = (key: string) => {
    setMonth(key)
    if (key !== 'all') setShownMonth(key)
  }
  const stepMonth = (delta: number) => {
    const d = monthFromKey(shownMonth)
    const next = monthKey(new Date(d.getFullYear(), d.getMonth() + delta, 1))
    setShownMonth(next)
    if (month !== 'all') setMonth(eventMonths.includes(next) ? next : 'all')
  }

  const resultCount = view === 'list' ? listEvents.length : byMode.filter((e) => monthKey(e.startDate) === shownMonth).length

  return (
    <>
      <PageHero
        eyebrow="Training calendar"
        title="Upcoming courses and workshops"
        body="Public courses run online and in our training centres. Every course can also be delivered privately for your team, on your dates."
      />

      <section className="pb-16 lg:pb-28" aria-labelledby="calendar-title">
        <h2 id="calendar-title" className="sr-only">
          Course schedule
        </h2>
        <div className="container-site">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 rounded-card border border-line bg-white p-3 shadow-soft md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Segmented
                label="Filter by mode"
                options={['All', 'Online', 'Offline'] as const}
                value={mode}
                onChange={setMode}
              />
              <label className="relative flex items-center">
                <span className="sr-only">Filter by month</span>
                <CalendarDays className="pointer-events-none absolute left-3.5 h-4 w-4 text-body" strokeWidth={1.5} aria-hidden />
                <select
                  value={month}
                  onChange={(e) => changeMonth(e.target.value)}
                  className="h-11 w-full appearance-none rounded-full border border-line bg-white pl-10 pr-10 font-heading text-[0.875rem] font-semibold text-navy hover:border-[#CBD5E1] focus:border-accent focus:shadow-focus focus:outline-none sm:w-auto"
                >
                  <option value="all">All months</option>
                  {eventMonths.map((k) => (
                    <option key={k} value={k}>
                      {fmt.monthYear(monthFromKey(k))}
                    </option>
                  ))}
                </select>
                <ChevronRight className="pointer-events-none absolute right-3.5 h-4 w-4 rotate-90 text-body" strokeWidth={1.75} aria-hidden />
              </label>
            </div>
            <Segmented
              label="View"
              options={['list', 'month'] as const}
              value={view}
              onChange={setView}
              render={(v) => (
                <>
                  {v === 'list' ? <List className="h-4 w-4" strokeWidth={1.75} aria-hidden /> : <CalendarDays className="h-4 w-4" strokeWidth={1.75} aria-hidden />}
                  {v === 'list' ? 'List' : 'Month'}
                </>
              )}
            />
          </div>

          <p className="mt-6 text-[0.875rem] text-body" aria-live="polite">
            {resultCount} {resultCount === 1 ? 'course' : 'courses'}
            {view === 'month' ? ` in ${fmt.monthYear(monthFromKey(shownMonth))}` : month !== 'all' ? ` in ${fmt.monthYear(monthFromKey(month))}` : ' scheduled'}
            {mode !== 'All' && ` · ${mode} only`}
          </p>

          {view === 'list' ? (
            <ListView events={listEvents} onSelect={setSelected} />
          ) : (
            <MonthView monthKey={shownMonth} events={byMode} today={today} onStep={stepMonth} onSelect={setSelected} />
          )}
        </div>
      </section>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? `Register for ${selected.title}` : ''}
        description={selected ? `${dateRange(new Date(selected.start), new Date(selected.end))} · ${selected.mode}` : undefined}
      >
        <Suspense fallback={<div className="h-[480px]" aria-busy="true" />}>{selected && <TrainingEnquiryForm defaultEvent={selected.id} />}</Suspense>
      </Modal>
    </>
  )
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  render,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (v: T) => void
  render?: (v: T) => ReactNode
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full bg-mist p-1">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={cn(
            'inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-full px-4 font-heading text-[0.8125rem] font-semibold transition-colors sm:flex-none',
            value === o ? 'bg-white text-navy shadow-soft' : 'text-body hover:text-navy',
          )}
        >
          {render ? render(o) : o}
        </button>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="mt-6 rounded-card border border-dashed border-[#CBD5E1] bg-mist px-6 py-14 text-center">
      <p className="font-heading text-[1.0625rem] font-semibold text-navy">No courses match these filters</p>
      <p className="mt-2 text-[0.9375rem]">Try another month, or ask us about a private session for your team.</p>
    </div>
  )
}

function ListView({ events, onSelect }: { events: CalEvent[]; onSelect: (e: TrainingEvent) => void }) {
  if (!events.length) return <EmptyState />
  const groups = events.reduce<Record<string, CalEvent[]>>((acc, e) => {
    ;(acc[monthKey(e.startDate)] ??= []).push(e)
    return acc
  }, {})

  return (
    <div className="mt-4 space-y-12">
      {Object.entries(groups).map(([key, list]) => (
        <div key={key}>
          <h3 className="flex items-center gap-4 font-heading text-[0.875rem] font-semibold uppercase tracking-[0.08em] text-body">
            {fmt.monthYear(monthFromKey(key))}
            <span aria-hidden className="h-px flex-1 bg-line" />
          </h3>
          <ul className="mt-2 divide-y divide-line">
            {list.map((e) => (
              <EventRow key={e.id} event={e} onSelect={onSelect} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function EventRow({ event: e, onSelect, compact }: { event: CalEvent; onSelect: (e: TrainingEvent) => void; compact?: boolean }) {
  return (
    <li className={cn('grid grid-cols-[4rem_1fr] gap-x-5 gap-y-4 sm:gap-x-8', compact ? 'py-5' : 'py-7 md:grid-cols-[5rem_1fr_auto] md:items-center')}>
      <div className="flex flex-col items-center self-start rounded-card border border-line bg-white py-2.5 text-center shadow-soft">
        <span className="font-heading text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-body">{fmt.weekday(e.startDate)}</span>
        <span className="font-heading text-[1.625rem] font-bold leading-tight text-navy">{fmt.day(e.startDate)}</span>
        <span className="font-heading text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-body">{fmt.monthShort(e.startDate)}</span>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={e.mode === 'Online' ? 'online' : 'offline'}>{e.mode}</Badge>
          <Badge>{e.category}</Badge>
        </div>
        <h4 className="mt-2.5 font-heading text-[1.125rem] font-semibold leading-snug text-navy sm:text-[1.25rem]">{e.title}</h4>
        <dl className="mt-2 flex flex-col gap-1.5 text-[0.875rem] text-body sm:flex-row sm:flex-wrap sm:gap-x-5">
          <div className="flex items-start gap-2">
            <dt className="sr-only">Date and time</dt>
            <Clock className="mt-[3px] h-4 w-4 shrink-0 text-cobalt" strokeWidth={1.5} aria-hidden />
            <dd>
              {dateRange(e.startDate, e.endDate)} · {fmt.time(e.startDate)}–{fmt.time(e.endDate)} (GST)
            </dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="sr-only">Location</dt>
            <MapPin className="mt-[3px] h-4 w-4 shrink-0 text-cobalt" strokeWidth={1.5} aria-hidden />
            <dd>{e.location}</dd>
          </div>
          {e.seats && (
            <div className="flex items-start gap-2">
              <dt className="sr-only">Seats</dt>
              <Users className="mt-[3px] h-4 w-4 shrink-0 text-cobalt" strokeWidth={1.5} aria-hidden />
              <dd>{e.seats} seats</dd>
            </div>
          )}
        </dl>
        {!compact && <p className="mt-3 max-w-prose text-[0.9375rem]">{e.summary}</p>}
      </div>
      <div className={cn('col-start-2', !compact && 'md:col-start-3')}>
        <Button size="sm" variant={compact ? 'secondary' : 'primary'} onClick={() => onSelect(e)}>
          Register / Enquire<span className="sr-only">: {e.title}</span>
        </Button>
      </div>
    </li>
  )
}

function MonthView({
  monthKey: key,
  events,
  today,
  onStep,
  onSelect,
}: {
  monthKey: string
  events: CalEvent[]
  today: Date
  onStep: (delta: number) => void
  onSelect: (e: TrainingEvent) => void
}) {
  const first = monthFromKey(key)
  const lead = (first.getDay() + 6) % 7 // Monday-first
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  const cells = Array.from({ length: Math.ceil((lead + daysInMonth) / 7) * 7 }, (_, i) => {
    const day = i - lead + 1
    return day >= 1 && day <= daysInMonth ? new Date(first.getFullYear(), first.getMonth(), day) : null
  })
  const inMonth = events.filter((e) => monthKey(e.startDate) === key || monthKey(e.endDate) === key)

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-[1.375rem] font-bold">{fmt.monthYear(first)}</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onStep(-1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-navy transition-colors hover:border-navy"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-navy transition-colors hover:border-navy"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-card border border-line">
        <div className="grid grid-cols-7 border-b border-line bg-mist" aria-hidden>
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-3 text-center font-heading text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-body">
              <span className="sm:hidden">{d[0]}</span>
              <span className="hidden sm:inline">{d}</span>
            </div>
          ))}
        </div>
        <ol className="grid grid-cols-7 gap-px bg-line">
          {cells.map((date, i) => {
            if (!date) return <li key={i} className="min-h-[52px] bg-mist/60 md:min-h-[120px]" aria-hidden />
            const dayEvents = inMonth.filter((e) => spansDay(e.startDate, e.endDate, date))
            const isToday = sameDay(date, today)
            return (
              <li key={i} className="min-h-[52px] bg-white p-1.5 md:min-h-[120px] md:p-2.5">
                <span
                  className={cn(
                    'grid h-7 w-7 place-items-center rounded-full font-heading text-[0.8125rem] font-semibold',
                    isToday ? 'bg-navy text-white' : 'text-navy',
                  )}
                >
                  <span className="sr-only">{fmt.long(date)}</span>
                  <span aria-hidden>{date.getDate()}</span>
                </span>
                {dayEvents.length > 0 && (
                  <>
                    <span className="mt-1 flex gap-1 pl-1.5 md:hidden" aria-hidden>
                      {dayEvents.map((e) => (
                        <span key={e.id} className={cn('h-1.5 w-1.5 rounded-full', e.mode === 'Online' ? 'bg-cobalt' : 'bg-accent')} />
                      ))}
                    </span>
                    <ul className="mt-1.5 hidden space-y-1 md:block">
                      {dayEvents.map((e) => (
                        <li key={e.id}>
                          <button
                            type="button"
                            onClick={() => onSelect(e)}
                            className={cn(
                              'block w-full truncate rounded-md border-l-2 px-2 py-1 text-left text-[0.75rem] font-medium leading-snug text-navy transition-colors',
                              e.mode === 'Online' ? 'border-cobalt bg-tint hover:bg-[#DCE8F8]' : 'border-accent bg-accent-soft hover:bg-[#FBE5CC]',
                            )}
                          >
                            {e.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-4 flex items-center gap-5 text-meta text-body">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cobalt" aria-hidden /> Online
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden /> Offline
        </span>
      </div>

      {/* Mobile: the grid only shows dots, so list this month's events below it. */}
      <div className="mt-6 md:hidden">
        {inMonth.length ? (
          <ul className="divide-y divide-line border-t border-line">
            {inMonth.map((e) => (
              <EventRow key={e.id} event={e} onSelect={onSelect} compact />
            ))}
          </ul>
        ) : (
          <EmptyState />
        )}
      </div>
      {!inMonth.length && (
        <div className="hidden md:block">
          <EmptyState />
        </div>
      )}
    </div>
  )
}
