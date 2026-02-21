import { useRef } from 'react'
import type { ProfessionalOption } from '../types'

interface Props {
  professionals: ProfessionalOption[]
  onSelect: (id: string, name: string) => void
  onBack?: () => void
}

function initials(name: string) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

export default function ProfessionalPicker({ professionals, onSelect, onBack }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className="action-block">
      <p className="text-xs text-muted mb-3 text-center">Escolha um profissional</p>
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide justify-center pl-1 pr-1"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {professionals.map(p => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id, p.name)}
            className="snap-start flex-shrink-0 w-[120px] rounded-2xl overflow-hidden border border-border bg-surface hover:border-gold/60 hover:shadow-lg hover:shadow-gold/10 active:scale-95 transition-all group"
          >
            {/* Image */}
            <div className="w-full aspect-square overflow-hidden bg-[#0f0f10]">
              {p.avatar ? (
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold/30 to-gold/10">
                  <span className="font-display text-2xl text-gold">{initials(p.name)}</span>
                </div>
              )}
            </div>
            {/* Info */}
            <div className="p-2 text-left">
              <p className="text-[12px] font-semibold text-text leading-tight line-clamp-2 group-hover:text-gold transition-colors">
                {p.name}
              </p>
              {p.specialty && (
                <p className="text-muted text-[10px] mt-0.5">{p.specialty}</p>
              )}
            </div>
          </button>
        ))}
      </div>
      {professionals.length > 1 && (
        <div className="flex justify-center mt-1 gap-1">
          {professionals.map((_, i) => (
            <span key={i} className="w-1 h-1 rounded-full bg-border" />
          ))}
        </div>
      )}
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

