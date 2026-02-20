import type { BookingItem } from '../types'

interface Props {
  bookings: BookingItem[]
  onNewBooking?: () => void
  onCancelBooking?: (id: string) => void
}

const STATUS_MAP: Record<BookingItem['status'], { label: string; dot: string; text: string; bg: string; border: string }> = {
  scheduled: { label: 'Agendado',  dot: 'bg-[#25D366]', text: 'text-[#25D366]', bg: 'bg-[#25D366]/8',  border: 'border-[#25D366]/25' },
  completed: { label: 'Concluído', dot: 'bg-muted',      text: 'text-muted',    bg: 'bg-surface',       border: 'border-border' },
  cancelled: { label: 'Cancelado', dot: 'bg-red-400',    text: 'text-red-400',  bg: 'bg-red-500/8',    border: 'border-red-500/25' },
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const PT_MON = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
  const PT_DAY = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
  const date = new Date(y, m - 1, d)
  return `${PT_DAY[date.getDay()]}, ${d} de ${PT_MON[m - 1]}`
}

function BookingCard({ b, onCancel }: { b: BookingItem; onCancel?: (id: string) => void }) {
  const s     = STATUS_MAP[b.status]
  const price = b.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className={`rounded-2xl border ${s.border} ${s.bg} overflow-hidden`}>
      {/* Service name + professional */}
      <div className="px-3 pt-3 pb-2">
        <p className="text-[13px] font-bold text-text leading-tight">{b.serviceName}</p>
        <p className="text-[11px] text-muted mt-0.5">{b.professionalName}</p>
      </div>

      {/* Divider */}
      <div className="mx-3 border-t border-border/40" />

      {/* Date / time row */}
      <div className="flex items-center gap-2 px-3 pt-2.5 pb-1">
        <span className="text-muted flex-shrink-0" style={{ lineHeight: 0 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </span>
        <span className="text-[11px] text-muted">{formatDate(b.date)}</span>
        <span className="text-muted flex-shrink-0" style={{ lineHeight: 0 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </span>
        <span className="text-[11px] text-muted">{b.time}</span>
      </div>

      {/* Status badge + price row */}
      <div className="flex items-center justify-between px-3 pb-3 pt-1">
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${s.border} ${s.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {s.label}
        </span>
        <span className={`text-[14px] font-bold ${s.text}`}>{price}</span>
      </div>

      {/* Cancel */}
      {b.status === 'scheduled' && onCancel && (
        <div className="px-3 pb-3">
          <div className="border-t border-border/40 mb-3" />
          <button
            onClick={() => onCancel(b.id)}
            className="w-full h-10 rounded-xl border border-red-400/30 text-red-400 text-[13px] font-semibold hover:bg-red-400/10 hover:border-red-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            Cancelar agendamento
          </button>
        </div>
      )}
    </div>
  )
}

export default function BookingsList({ bookings, onNewBooking, onCancelBooking }: Props) {
  const scheduled = bookings.filter(b => b.status === 'scheduled')
  const past      = bookings.filter(b => b.status !== 'scheduled')

  return (
    <div className="action-block p-0 overflow-hidden">
      {/* ── Header ── */}
      <div className="relative px-4 pt-4 pb-3 border-b border-border/60">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold via-gold/60 to-transparent rounded-t-2xl" />
        <p className="font-display text-xl tracking-wide text-gold leading-none">Agendamentos</p>
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
