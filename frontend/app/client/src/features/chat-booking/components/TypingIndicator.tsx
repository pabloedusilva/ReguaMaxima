import { mockShop } from '@data/mockShop'

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-2">
      <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-surface">
        <img src={mockShop.barberImage} alt="" className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none' }} />
      </div>
      <div className="bubble-bot py-3 px-4">
        <div className="flex items-center gap-1">
          <span className="typing-dot" style={{ animationDelay: '0ms' }} />
          <span className="typing-dot" style={{ animationDelay: '180ms' }} />
          <span className="typing-dot" style={{ animationDelay: '360ms' }} />
        </div>
      </div>
    </div>
  )
}
