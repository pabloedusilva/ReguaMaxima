import { useRef, useState } from 'react'

interface Props {
  placeholder?: string
  onSubmit: (value: string) => void
}

export default function ChatInput({ placeholder = 'Digite sua mensagem...', onSubmit }: Props) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    onSubmit(trimmed)
    setValue('')
    inputRef.current?.focus()
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit()
  }

  return (
    <div className="chat-input-bar">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-[14px] text-text placeholder:text-muted"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      <button
        onClick={submit}
        disabled={!value.trim()}
        className="w-10 h-10 rounded-full bg-gold flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:bg-border active:scale-95 transition-all shadow-md shadow-gold/20"
        aria-label="Enviar"
      >
        <svg className="w-5 h-5 text-[#1b1408]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </div>
  )
}
