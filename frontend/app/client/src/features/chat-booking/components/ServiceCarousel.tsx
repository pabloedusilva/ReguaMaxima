import { useRef } from 'react'
import type { ServiceOption } from '../types'

interface Props {
  services: ServiceOption[]
  onSelect: (id: string, name: string) => void
  onBack?: () => void
}

export default function ServiceCarousel({ services, onSelect, onBack }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className="action-block">
      <p className="text-xs text-muted mb-3 text-center">Deslize e escolha um serviço</p>
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide pl-1 pr-1"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {services.map(s => {
          const price = s.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id, s.name)}
              className="snap-start flex-shrink-0 w-[120px] rounded-2xl overflow-hidden border border-border bg-surface hover:border-gold/60 hover:shadow-lg hover:shadow-gold/10 active:scale-95 transition-all group"
            >
              {/* Image */}
              <div className="w-full aspect-square overflow-hidden bg-[#0f0f10]">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => { e.currentTarget.style.opacity = '0.3' }}
                />
              </div>
              {/* Info */}
              <div className="p-2 text-left">
                <p className="text-[12px] font-semibold text-text leading-tight line-clamp-2">{s.name}</p>
                <p className="text-gold font-bold text-[13px] mt-1">{price}</p>
                <p className="text-muted text-[10px]">{s.duration} min</p>
              </div>
            </button>
          )
        })}
      </div>
      {/* Scroll hint */}
      <div className="flex justify-center mt-1 gap-1">
        {services.map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-border" />
        ))}
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
