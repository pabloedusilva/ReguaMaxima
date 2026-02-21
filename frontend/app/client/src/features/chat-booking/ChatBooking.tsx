import { useEffect, useRef } from 'react'
import { mockShop } from '@data/mockShop'
import { useChatFlow }     from './hooks/useChatFlow'
import ChatHeader          from './components/ChatHeader'
import ChatBubble          from './components/ChatBubble'
import TypingIndicator     from './components/TypingIndicator'
import ActionBlock         from './components/ActionBlock'
import ChatInput           from './components/ChatInput'

interface Props {
  onBack?: () => void
}

export default function ChatBooking({ onBack }: Props) {
  const {
    messages,
    isTyping,
    currentAction,
    step,
    showInput,
    inputPlaceholder,
    handleTextSubmit,
    handleActionSelect,
    handleGoBack,
  } = useChatFlow(mockShop.barberName)

  const CAN_GO_BACK: string[] = ['CHOOSE_PROFESSIONAL', 'CHOOSE_SERVICE', 'CHOOSE_DATE', 'CHOOSE_TIME', 'REVIEW']

  // Auto-scroll to bottom on new message / typing
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, currentAction])

  return (
    <div className="chat-shell">
      {/* ── Header ── */}
      <ChatHeader onBack={onBack} />

      {/* ── Messages area ── */}
      <div className="chat-messages">
        {/* Date badge */}
        <div className="flex justify-center mb-4">
          <span className="px-3 py-1 rounded-full bg-[#1a2a1e]/80 text-[#9ecea7] text-[11px] font-medium shadow-sm">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
        </div>

        {/* Messages */}
        {messages.map((msg, i) => {
          const prev = messages[i - 1]
          const showAvatar = !prev || prev.from !== 'bot' || msg.from !== 'bot'
          return <ChatBubble key={msg.id} message={msg} showAvatar={showAvatar} />
        })}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}

        {/* Current interactive action */}
        {!isTyping && currentAction && (
          <div className="mt-1 mb-2 px-1">
            <ActionBlock
                action={currentAction}
                onSelect={handleActionSelect}
                onBack={CAN_GO_BACK.includes(step) ? handleGoBack : undefined}
              />
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={bottomRef} className="h-2" />
      </div>

      {/* ── Input bar ── */}
      {showInput && (
        <ChatInput
          placeholder={inputPlaceholder}
          onSubmit={handleTextSubmit}
        />
      )}
    </div>
  )
}
