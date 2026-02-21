import type { BookingItem } from '../types'

interface Props {
  bookings: BookingItem[]
  onNewBooking?: () => void
  onCancelBooking?: (id: string) => void
}

const STATUS_MAP: Record<BookingItem['status'], { label: string; dot: string; text: string; bg: string; border: string }> = {
  scheduled: { label: 'Agendado',  dot: 'bg-blue-400',  text: 'text-blue-400',  bg: 'bg-blue-400/15',  border: 'border-blue-400/30' },
  completed: { label: 'Concluído', dot: 'bg-green-400', text: 'text-green-400', bg: 'bg-green-400/15', border: 'border-green-400/30' },
  cancelled: { label: 'Cancelado', dot: 'bg-red-400',   text: 'text-red-400',   bg: 'bg-red-400/15',  border: 'border-red-400/30' },
}

function BookingCard({ b, onCancel }: { b: BookingItem; onCancel?: (id: string) => void }) {
  const s     = STATUS_MAP[b.status]
  const price = b.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const dateObj = new Date(b.date + 'T' + b.time)
  const formattedDate = dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="card p-4 min-w-0 hover:border-gold/30 transition">
      <div className="grid gap-3 min-w-0">
        {/* Time + date + status badge */}
        <div className="flex items-start justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <div className="text-lg font-semibold text-text">{b.time}</div>
            <div className="text-sm text-text/70 capitalize truncate">{formattedDate}</div>
          </div>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border whitespace-nowrap flex-shrink-0 ${s.bg} ${s.border} ${s.text}`}>
            {s.label}
          </span>
        </div>

        {/* Detail rows */}
        <div className="grid gap-1.5 text-sm min-w-0">
          <div className="flex justify-between gap-2 min-w-0">
            <span className="text-text/70 flex-shrink-0">Profissional:</span>
            <span className="text-text font-medium text-right truncate">{b.professionalName}</span>
          </div>
          <div className="flex justify-between gap-2 min-w-0">
            <span className="text-text/70 flex-shrink-0">Serviço:</span>
            <span className="text-text font-medium text-right truncate">{b.serviceName}</span>
          </div>
          <div className="flex justify-between gap-2 min-w-0">
            <span className="text-text/70 flex-shrink-0">Valor:</span>
            <span className="text-gold font-semibold text-right">{price}</span>
          </div>
        </div>

        {/* Cancel */}
        {b.status === 'scheduled' && onCancel && (
          <div className="pt-2 border-t border-border">
            <button
              onClick={() => onCancel(b.id)}
              className="w-full h-10 rounded-xl border border-red-400/30 text-red-400 text-[13px] font-semibold hover:bg-red-400/10 hover:border-red-400 active:scale-[0.98] transition-all flex items-center justify-center"
            >
              Cancelar agendamento
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BookingsList({ bookings, onNewBooking, onCancelBooking }: Props) {
  const scheduled = bookings.filter(b => b.status === 'scheduled')
  const past      = bookings.filter(b => b.status !== 'scheduled')

  return (
    <div className="action-block p-0 overflow-hidden">
      {/* ── Header ── */}
      <div className="px-4 pt-4 pb-3 border-b border-border/60">
        <p className="text-[14px] font-semibold text-gold leading-[1.5]">Agendamentos</p>
        <p className="text-[11px] text-muted mt-0.5">{bookings.length} encontrado{bookings.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="p-3 flex flex-col gap-3">
        {/* Upcoming */}
        {scheduled.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.1em] px-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
              Próximos
            </p>
            {scheduled.map(b => <BookingCard key={b.id} b={b} onCancel={onCancelBooking} />)}
          </div>
        )}

        {/* Past */}
        {past.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.1em] px-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-muted inline-block" />
              Histórico
            </p>
            {past.map(b => <BookingCard key={b.id} b={b} />)}
          </div>
        )}

        {bookings.length === 0 && (
          <p className="text-center text-muted text-sm py-6">Nenhum agendamento encontrado.</p>
        )}

        {/* CTA */}
        {onNewBooking && (
          <button
            onClick={onNewBooking}
            className="w-full h-11 rounded-xl bg-gold text-[#1b1408] text-[13px] font-bold hover:bg-gold/90 active:scale-95 transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2 mt-1"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>
            </svg>
            Novo agendamento
          </button>
        )}
      </div>
    </div>
  )
}
