import { mockShop } from '@data/mockShop'
import type { ChatMessage } from '../types'

interface ChatBubbleProps {
  message: ChatMessage
  showAvatar?: boolean
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

// Render **bold** and *italic* markdown-lite
function renderText(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return <strong key={i}>{part.slice(1, -1)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

export default function ChatBubble({ message, showAvatar = true }: ChatBubbleProps) {
  const isBot = message.from === 'bot'

  if (isBot) {
    return (
      <div className="flex items-end gap-2 mb-1">
        {/* Bot avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-surface ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src={mockShop.barberImage}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>

        <div className="bubble-bot">
          <p className="text-[14px] leading-[1.5] text-text">{renderText(message.text)}</p>
          <p className="text-[10px] text-muted mt-1 text-right">{formatTime(message.timestamp)}</p>
        </div>
      </div>
    )
  }

  // User bubble
  return (
    <div className="flex justify-end mb-1">
      <div className="bubble-user">
        <p className="text-[14px] leading-[1.5]">{message.text}</p>
        <div className="flex items-center justify-end gap-1 mt-1">
          <p className="text-[10px] text-[#1b1408]/60">{formatTime(message.timestamp)}</p>
          {/* Double check */}
          <svg className="w-3.5 h-3.5 text-[#1b1408]/60" viewBox="0 0 16 11" fill="none">
            <path d="M1 5.5L5 9.5L15 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 9.5L15 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(-3.5,0)"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
