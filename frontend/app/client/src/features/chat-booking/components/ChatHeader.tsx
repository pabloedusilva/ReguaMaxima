import { mockShop, isShopOpen } from '@data/mockShop'

interface ChatHeaderProps {
  onBack?: () => void
}

export default function ChatHeader({ onBack }: ChatHeaderProps) {
  const open = isShopOpen()
  return (
    <div className="chat-header">
      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors flex-shrink-0 mr-1"
          aria-label="Voltar"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 bg-surface">
          <img
            src={mockShop.barberImage}
            alt={mockShop.barberName}
            className="w-full h-full object-cover"
            onError={(e) => {
              const t = e.currentTarget
              t.style.display = 'none'
              t.parentElement!.innerHTML = `<span class="w-full h-full flex items-center justify-center text-gold font-display text-lg">${mockShop.barberName[0]}</span>`
            }}
          />
        </div>
        {/* Online indicator */}
        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black/30 ${open ? 'bg-emerald-400' : 'bg-red-500'}`} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 ml-3">
        <p className="font-semibold text-white text-[15px] leading-tight truncate">{mockShop.barberName}</p>
        <p className={`text-[11px] leading-tight font-medium ${open ? 'text-emerald-400' : 'text-red-400'}`}>
          {open ? 'Barbearia aberta' : 'Barbearia fechada'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
        <a
          href={`https://wa.me/${mockShop.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          aria-label="Abrir WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white/80">
            <path d="M12 2a9.93 9.93 0 0 0-8.48 15.34L2 22l4.78-1.49A10 10 0 1 0 12 2Zm5.44 14.35c-.23.64-1.14 1.17-1.77 1.25-.47.06-1.08.09-1.75-.11-.41-.13-.94-.31-1.62-.61-2.84-1.24-4.68-4.17-4.82-4.37-.14-.2-1.16-1.55-1.16-2.96 0-1.41.73-2.09 1-2.38.27-.29.59-.36.79-.36.2 0 .4 0 .57.01.18.01.43-.07.68.52.23.55.77 1.9.84 2.04.07.14.12.3.02.49-.1.2-.16.32-.3.49-.14.17-.3.38-.43.51-.14.14-.3.29-.13.57.16.29.71 1.17 1.52 1.9 1.04.93 1.92 1.22 2.2 1.36.27.14.43.12.59-.07.16-.18.68-.79.86-1.06.18-.27.37-.23.62-.14.25.09 1.59.75 1.86.89.27.14.45.21.52.33.07.12.07.68-.16 1.32Z" />
          </svg>
        </a>
        <a
          href={`https://instagram.com/${mockShop.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          aria-label="Abrir Instagram"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.6">
            <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
            <circle cx="12" cy="12" r="3.5" />
            <circle cx="17.3" cy="6.7" r="1" fill="rgba(255,255,255,0.8)" stroke="none" />
          </svg>
        </a>
      </div>
    </div>
  )
}
