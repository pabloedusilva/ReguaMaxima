interface Props {
  slots: string[]
  onSelect: (time: string) => void
  onBack?: () => void
}

export default function TimePicker({ slots, onSelect, onBack }: Props) {
  if (slots.length === 0) {
    return (
      <div className="action-block text-center">
        <p className="text-muted text-sm">Nenhum horário disponível nesta data.</p>
        {onBack && <BackButton onClick={onBack} />}
      </div>
    )
  }

  return (
    <div className="action-block">
      <p className="text-xs text-muted mb-3 text-center">Escolha um horário</p>
      <div className="grid grid-cols-4 gap-2">
        {slots.map(slot => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className="h-[42px] rounded-xl border border-border bg-surface text-[13px] font-semibold text-text hover:border-gold hover:text-gold hover:bg-gold/5 active:scale-95 transition-all"
          >
            {slot}
          </button>
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
