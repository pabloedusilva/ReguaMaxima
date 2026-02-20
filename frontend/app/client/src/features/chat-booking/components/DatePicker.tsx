import { useRef, useState, useEffect, useCallback } from 'react'
import type { DateOption } from '../types'

interface Props {
  dates: DateOption[]
  onSelect: (iso: string) => void
  onBack?: () => void
}

const PT_DAY = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
const PT_MON = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']

function generateDatesAfter(lastISO: string, count = 7): DateOption[] {
  const [y, m, d] = lastISO.split('-').map(Number)
  const cursor = new Date(y, m - 1, d + 1)
  const result: DateOption[] = []
  while (result.length < count) {
    const dow = cursor.getDay()
    if (dow !== 0) {
      const iso = cursor.toISOString().split('T')[0]
      result.push({
        iso,
        dayName:   PT_DAY[dow],
        dayNum:    String(cursor.getDate()),
        monthName: PT_MON[cursor.getMonth()],
        isToday:   false,
      })
    }
    cursor.setDate(cursor.getDate() + 1)
  }
  return result
}

export default function DatePicker({ dates: initialDates, onSelect, onBack }: Props) {
  const scrollRef           = useRef<HTMLDivElement>(null)
  const [dates, setDates]   = useState<DateOption[]>(initialDates)
  const [atStart, setAtStart] = useState(true)
  const [atEnd,   setAtEnd]   = useState(false)

  const updateEdges = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 8)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateEdges()
    el.addEventListener('scroll', updateEdges, { passive: true })
    return () => el.removeEventListener('scroll', updateEdges)
  }, [updateEdges, dates])

  const goBack = () => {
    scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
  }

  const loadMore = () => {
    const last = dates[dates.length - 1].iso
    const more = generateDatesAfter(last, 7)
    setDates(prev => [...prev, ...more])
    // scroll to reveal new dates after render
    setTimeout(() => {
      const el = scrollRef.current
      if (el) el.scrollBy({ left: 220, behavior: 'smooth' })
    }, 50)
  }

  return (
    <div className="action-block">
      <p className="text-xs text-muted mb-3 text-center">Escolha uma data</p>

      <div className="flex items-center gap-1">
        {/* Left arrow — only when scrolled away from start */}
        <button
          onClick={goBack}
          aria-label="Datas anteriores"
          className={`flex-shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center transition-all active:scale-90
            border-border bg-surface text-muted hover:border-gold/50 hover:text-gold
            ${atStart ? 'invisible pointer-events-none' : 'visible'}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide flex-1"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {dates.map(d => (
            <button
              key={d.iso}
              onClick={() => onSelect(d.iso)}
              className={`snap-start flex-shrink-0 flex flex-col items-center justify-center w-[68px] h-[80px] rounded-2xl border transition-all active:scale-95
                ${d.isToday
                  ? 'border-gold bg-gold/10 hover:bg-gold/20'
                  : 'border-border bg-surface hover:border-gold/50 hover:bg-surface/80'
                }`}
            >
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${d.isToday ? 'text-gold' : 'text-muted'}`}>
                {d.isToday ? 'Hoje' : d.dayName}
              </span>
              <span className={`text-2xl font-display leading-tight ${d.isToday ? 'text-gold' : 'text-text'}`}>
                {d.dayNum}
              </span>
              <span className="text-[10px] text-muted">{d.monthName}</span>
            </button>
          ))}
        </div>

        {/* Right arrow — only when at the last visible date */}
        <button
          onClick={loadMore}
          aria-label="Próximas datas"
          className={`flex-shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center transition-all active:scale-90
            border-border bg-surface text-muted hover:border-gold/50 hover:text-gold
            ${atEnd ? 'visible' : 'invisible pointer-events-none'}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {onBack && <BackButton onClick={onBack} />}
    </div>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-3 w-full h-10 rounded-xl border border-border/60 text-[13px] text-muted hover:text-text hover:border-border transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 5l-7 7 7 7" />
      </svg>
      Voltar
    </button>
  )
}


