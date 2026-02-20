import type { ReviewBooking } from '../types'

interface Props {
  booking: ReviewBooking
  onConfirm: () => void
  onBack: () => void
}

function ScissorsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/>
      <line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  )
}
function BrushIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 3a3 3 0 0 0-3 3l-7 7a3 3 0 0 0 0 6 3 3 0 0 0 3-3l7-7a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
    </svg>
  )
}
function CoinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v2m0 8v2m-3-6h6"/>
    </svg>
  )
}
function CalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}
function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.77a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

const ROWS = [
  { icon: <ScissorsIcon />, label: 'Profissional', key: 'professionalName' as const },
  { icon: <BrushIcon />,    label: 'Serviço',      key: 'serviceName'      as const },
  { icon: <CoinIcon />,     label: 'Valor',         key: 'price'            as const },
  { icon: <CalIcon />,      label: 'Data',          key: 'dateLabel'        as const },
  { icon: <ClockIcon />,    label: 'Horário',       key: 'time'             as const },
  { icon: <UserIcon />,     label: 'Nome',          key: 'clientName'       as const },
  { icon: <PhoneIcon />,    label: 'Telefone',      key: 'clientPhone'      as const },
]

export default function ReviewCard({ booking, onConfirm, onBack }: Props) {
  const price = booking.servicePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const values: Record<string, string> = {
    professionalName: booking.professionalName,
    serviceName:      booking.serviceName,
    price,
    dateLabel:        booking.dateLabel,
    time:             booking.time,
    clientName:       booking.clientName,
    clientPhone:      booking.clientPhone,
  }

  return (
    <div className="action-block p-0 overflow-hidden">
      {/* ── Header ── */}
      <div className="relative px-4 pt-4 pb-3 border-b border-border/60">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold via-gold/60 to-transparent rounded-t-2xl" />
        <p className="font-display text-xl tracking-wide text-gold leading-none">Resumo</p>
        <p className="text-[11px] text-muted mt-0.5">Confira os dados antes de confirmar</p>
      </div>

      {/* ── Rows ── */}
      <div className="px-4 py-2">
        {ROWS.map(r => (
          <div key={r.label} className="flex items-center gap-3 py-2.5 border-b border-border/30 last:border-0">
            <span className="text-gold/70 flex-shrink-0">{r.icon}</span>
            <span className="text-[11px] text-muted w-[74px] flex-shrink-0">{r.label}</span>
            <span className="text-[13px] font-semibold text-text flex-1 text-right">{values[r.key]}</span>
          </div>
        ))}
      </div>

      {/* ── Actions ── */}
      <div className="flex gap-2 px-4 pb-4 pt-2">
        <button
          onClick={onBack}
          className="flex-1 h-10 rounded-xl border border-border/60 text-[13px] text-muted hover:text-text hover:border-border active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Voltar
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 h-10 rounded-xl bg-gold text-[#1b1408] text-[13px] font-bold hover:bg-gold/90 active:scale-[0.98] transition-all shadow-lg shadow-gold/25 flex items-center justify-center gap-1.5"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Confirmar
        </button>
      </div>
    </div>
  )
}
