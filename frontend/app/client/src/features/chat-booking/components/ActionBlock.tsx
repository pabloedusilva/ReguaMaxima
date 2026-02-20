import type { ChatAction, ButtonColor } from '../types'
import ProfessionalPicker from './ProfessionalPicker'
import ServiceCarousel    from './ServiceCarousel'
import DatePicker         from './DatePicker'
import TimePicker         from './TimePicker'
import ReviewCard         from './ReviewCard'
import BookingsList       from './BookingsList'

// ── Button icons ─────────────────────────────────────────────────────────────
const ICONS: Record<string, JSX.Element> = {
  'calendar': (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  'calendar-plus': (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="19"/><line x1="9.5" y1="16.5" x2="14.5" y2="16.5"/>
    </svg>
  ),
  'list': (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  'whatsapp': (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a9.93 9.93 0 0 0-8.48 15.34L2 22l4.78-1.49A10 10 0 1 0 12 2Zm5.44 14.35c-.23.64-1.14 1.17-1.77 1.25-.47.06-1.08.09-1.75-.11-.41-.13-.94-.31-1.62-.61-2.84-1.24-4.68-4.17-4.82-4.37-.14-.2-1.16-1.55-1.16-2.96 0-1.41.73-2.09 1-2.38.27-.29.59-.36.79-.36.2 0 .4 0 .57.01.18.01.43-.07.68.52.23.55.77 1.9.84 2.04.07.14.12.3.02.49-.1.2-.16.32-.3.49-.14.17-.3.38-.43.51-.14.14-.3.29-.13.57.16.29.71 1.17 1.52 1.9 1.04.93 1.92 1.22 2.2 1.36.27.14.43.12.59-.07.16-.18.68-.79.86-1.06.18-.27.37-.23.62-.14.25.09 1.59.75 1.86.89.27.14.45.21.52.33.07.12.07.68-.16 1.32Z"/>
    </svg>
  ),
  'check': (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  'x-circle': (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
}

interface Props {
  action: ChatAction
  onSelect: (value: string, label: string) => void
  onBack?: () => void
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

const COLOR_CLASS: Record<ButtonColor, string> = {
  default: 'border-border bg-surface text-text hover:border-gold/50 hover:text-gold',
  gold:    'border-gold bg-gold/10 text-gold hover:bg-gold/20',
  green:   'border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20',
  red:     'border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20',
}

export default function ActionBlock({ action, onSelect, onBack }: Props) {
  switch (action.kind) {
    case 'buttons':
      return (
        <div className="action-block">
          <div className="flex flex-col gap-2">
            {action.options.map(opt => (
              <button
                key={opt.value}
                onClick={() => onSelect(opt.value, opt.label)}
                className={`w-full h-12 rounded-xl border text-[14px] font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${COLOR_CLASS[opt.color ?? 'default']}`}
              >
                {opt.icon && ICONS[opt.icon] && (
                  <span className="flex-shrink-0">{ICONS[opt.icon]}</span>
                )}
                {opt.label}
              </button>
            ))}
          </div>
          {onBack && <BackButton onClick={onBack} />}
        </div>
      )

    case 'professional-picker':
      return (
        <ProfessionalPicker
          professionals={action.professionals}
          onSelect={(id, name) => onSelect(id, name)}
          onBack={onBack}
        />
      )

    case 'service-carousel':
      return (
        <ServiceCarousel
          services={action.services}
          onSelect={(id, name) => onSelect(id, name)}
          onBack={onBack}
        />
      )

    case 'date-picker':
      return (
        <DatePicker
          dates={action.dates}
          onSelect={(iso) => onSelect(iso, iso)}
          onBack={onBack}
        />
      )

    case 'time-picker':
      return (
        <TimePicker
          slots={action.slots}
          onSelect={(time) => onSelect(time, time)}
          onBack={onBack}
        />
      )

    case 'review':
      return (
        <ReviewCard
          booking={action.booking}
          onConfirm={() => onSelect('confirm', 'Confirmar agendamento')}
          onBack={onBack ?? (() => onSelect('cancel', 'Cancelar'))}
        />
      )

    case 'bookings-list':
      return (
        <BookingsList
          bookings={action.bookings}
          onNewBooking={() => onSelect('new-booking', 'Fazer novo agendamento')}
          onCancelBooking={(id) => onSelect(`cancel-booking:${id}`, 'Cancelar agendamento')}
        />
      )

    default:
      return null
  }
}
