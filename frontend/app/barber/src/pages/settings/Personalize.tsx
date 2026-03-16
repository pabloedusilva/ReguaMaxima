import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { applyAndPersistAppIcon, getSelectedAppIcon } from '@barber/lib/appIcon'
import { useNavbarPreference, type NavbarStyle } from '../../hooks/useNavbarPreference'
import { usePWAInstall } from '@barber/hooks/usePWAInstall'
import { isIOS } from '@barber/utils/pwa'
import InstallPWAModal from '@barber/components/dialogs/InstallPWAModal'

// ─── Constants ────────────────────────────────────────────────────────────────

const APP_ICON_OPTIONS = [
  '/assets/images/logoSelect/1.jpg',
  '/assets/images/logoSelect/2.jpg',
  '/assets/images/logoSelect/3.jpg',
  '/assets/images/logoSelect/4.jpg',
  '/assets/images/logoSelect/5.jpg',
]

// ─── Booking Mode Section ─────────────────────────────────────────────────────

type BookingMode = 'simplified' | 'pro'
const BOOKING_MODE_KEY = 'bookingMode'
const BOOKING_BG_KEY   = 'bookingBackground'

const BOOKING_BG_OPTIONS: { id: string; label: string; src?: string; color?: string }[] = [
  { id: 'bg1',   src: '/assets/images/chat-bg/1.jpg', label: 'Clássico'    },
  { id: 'bg2',   src: '/assets/images/chat-bg/2.jpg', label: 'Moderno'     },
  { id: 'bg3',   src: '/assets/images/chat-bg/3.jpg', label: 'Minimalista' },
  { id: 'black', color: '#0a0a0a',  label: 'Preto'   },
  { id: 'gray',  color: '#3a3a3a',  label: 'Cinza'   },
  { id: 'white', color: '#f5f5f5',  label: 'Branco'  },
  { id: 'gold',  color: '#c9953b',  label: 'Dourado' },
]

function useBookingMode() {
  const [mode, setModeState] = useState<BookingMode>(() => {
    return (localStorage.getItem(BOOKING_MODE_KEY) as BookingMode) || 'simplified'
  })
  const setMode = (m: BookingMode) => {
    setModeState(m)
    localStorage.setItem(BOOKING_MODE_KEY, m)
  }
  return { mode, setMode }
}

function useBookingBackground() {
  const [bg, setBgState] = useState<string>(() => {
    return localStorage.getItem(BOOKING_BG_KEY) || BOOKING_BG_OPTIONS[0].id
  })
  const setBg = (id: string) => {
    setBgState(id)
    localStorage.setItem(BOOKING_BG_KEY, id)
  }
  return { bg, setBg }
}

const BOOKING_OPTIONS: { id: BookingMode; label: string; description: string; videoSrc: string }[] = [
  {
    id: 'simplified',
    label: 'Simplificado',
    description: 'Agendamento por chat, guiado e intuitivo.',
    videoSrc: '/assets/videos/booking-chat.mp4',
  },
  {
    id: 'pro',
    label: 'Pro',
    description: 'Formulário completo com todas as opções.',
    videoSrc: '/assets/videos/booking-pro.mp4',
  },
]

function PhoneMockup({
  videoSrc,
  isSelected,
  onClick,
}: {
  videoSrc: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative flex flex-col w-full overflow-hidden cursor-pointer
        transition-all duration-200 shadow-lg
        rounded-[2rem] border-[3px] bg-[#090909]
        ${isSelected
          ? 'border-gold shadow-gold/20 scale-[1.02]'
          : 'border-border hover:border-gold/40 hover:scale-[1.01]'}
      `}
      style={{ aspectRatio: '9/19' }}
      aria-label={isSelected ? 'Modo selecionado' : 'Selecionar modo'}
    >
      {/* Speaker notch */}
      <div className="flex-shrink-0 flex items-center justify-center py-[6px] bg-[#090909]">
        <div className="w-[36%] h-[5px] rounded-full bg-[#1e1e1e]" />
      </div>

      {/* Screen — video fills it entirely */}
      <div className="flex-1 overflow-hidden bg-[#0f0f10] select-none" style={{ pointerEvents: 'none' }}>
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          className="w-full h-full object-cover"
          style={{ pointerEvents: 'none' }}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      {/* Home indicator */}
      <div className="flex-shrink-0 flex items-center justify-center py-[6px] bg-[#090909]">
        <div className="w-[44%] h-[4px] rounded-full bg-[#2a2a2a]" />
      </div>

      {/* Selected glow ring */}
      {isSelected && (
        <div className="absolute inset-0 rounded-[1.85rem] ring-[1.5px] ring-gold/30 pointer-events-none" />
      )}
    </button>
  )
}

function BgScroller({
  bg,
  setBg,
  isLocked,
}: {
  bg: string
  setBg: (id: string) => void
  isLocked: boolean
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd,   setAtEnd]   = useState(false)

  const updateEdges = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 8)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    // pequeno delay para medir após render
    const t = setTimeout(updateEdges, 50)
    el.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      clearTimeout(t)
      el.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [updateEdges])

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 220 : -220, behavior: 'smooth' })
  }

  return (
    <div className="w-full min-w-0 flex items-center gap-1.5">
      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scroll('left')}
        aria-label="Rolar para esquerda"
        className={`flex-shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center transition-all active:scale-90
          border-border bg-surface text-muted hover:border-gold/50 hover:text-gold
          ${atStart ? 'invisible pointer-events-none' : 'visible'}`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Scroll container — min-w-0 + overflow-x-auto prevents page stretch */}
      <div className="min-w-0 flex-1 overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide pb-1"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {BOOKING_BG_OPTIONS.map(opt => {
            const isSelected = bg === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => !isLocked && setBg(opt.id)}
                aria-label={`Plano de fundo ${opt.label}`}
                className={`snap-start flex-shrink-0 relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-200 active:scale-95
                  w-[72px] md:w-[100px] lg:w-[120px]
                  ${isSelected && !isLocked
                    ? 'border-gold shadow-lg shadow-gold/20 scale-[1.03]'
                    : 'border-border hover:border-gold/40 hover:scale-[1.01]'}
                `}
              >
                {/* Preview square */}
                <div className="relative overflow-hidden w-full aspect-square">
                  {opt.src ? (
                    <>
                      <img
                        src={opt.src}
                        alt={opt.label}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          ;(e.currentTarget.nextElementSibling as HTMLElement | null)?.classList.remove('hidden')
                        }}
                      />
                      <div className="hidden absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                        <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                        </svg>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full" style={{ backgroundColor: opt.color }} />
                  )}
                </div>

                {/* Label */}
                <div className="px-1 py-1.5 md:py-2 bg-[#111111] w-full">
                  <p className={`text-[10px] md:text-xs font-medium text-center leading-tight truncate
                    ${isSelected && !isLocked ? 'text-gold' : 'text-text-dim'}`}>
                    {opt.label}
                  </p>
                </div>

                {/* Selected check */}
                {isSelected && !isLocked && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gold flex items-center justify-center shadow">
                    <svg className="w-2.5 h-2.5 text-[#1b1408]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scroll('right')}
        aria-label="Rolar para direita"
        className={`flex-shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center transition-all active:scale-90
          border-border bg-surface text-muted hover:border-gold/50 hover:text-gold
          ${atEnd ? 'invisible pointer-events-none' : 'visible'}`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}

// ─── Booking Preview Modal ─────────────────────────────────────────────────────────────────────────────

function BookingPreviewModal({ onClose }: { onClose: () => void }) {
  const url = 'https://app.reguamaxima.com.br/#/chat'

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[2147483646] flex items-center justify-center p-4 sm:p-6"
      style={{
        background: 'rgba(6, 6, 7, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Pré-visualização – Modo Simplificado"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Card container */}
      <div className="relative flex flex-col w-full max-w-sm bg-[#111112] border border-border rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)]" style={{ height: 'min(85dvh, 720px)' }}>

        {/* Header */}
        <div className="flex-none flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/60">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-0.5">Pré-visualização</p>
            <h3 className="text-base font-bold text-text leading-tight">Modo Simplificado</h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar pré-visualização"
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-text hover:bg-surface transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* iframe + protection overlay */}
        <div className="relative flex-1 overflow-hidden bg-[#0a0a0a]">
          <iframe
            src={url}
            title="Pré-visualização Modo Simplificado"
            className="absolute inset-0 w-full h-full border-0"
            allow=""
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
          {/* Protective film — blocks all pointer events on the iframe */}
          <div
            className="absolute inset-0 z-10"
            aria-hidden="true"
            style={{ cursor: 'default' }}
          />
        </div>

        {/* Footer hint */}
        <div className="flex-none px-5 py-3 border-t border-border/60 bg-[#0d0d0e]">
          <p className="text-[11px] text-muted text-center leading-snug">
            Apenas leitura
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ─── Booking Mode Section ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

function BookingModeSection() {
  const { mode, setMode } = useBookingMode()
  const { bg, setBg }     = useBookingBackground()
  const isLocked = mode === 'pro'
  const [showPreview, setShowPreview] = useState(false)

  return (
    <section className="animate-fade-in-delayed min-w-0 overflow-hidden">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-text mb-1">Modo de Agendamento</h2>
        <p className="text-sm text-text-dim">
          Escolha como seus clientes vão realizar o agendamento. A preferência é salva neste dispositivo.
        </p>
      </div>

      {/* Phones grid — centered, max width keeps phones compact */}
      <div className="mx-auto w-full max-w-[300px] sm:max-w-[380px] md:max-w-[440px]">
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {BOOKING_OPTIONS.map(opt => {
            const isSelected = mode === opt.id
            return (
              <div key={opt.id} className="flex flex-col items-center gap-3">
                <PhoneMockup
                  videoSrc={opt.videoSrc}
                  isSelected={isSelected}
                  onClick={() => setMode(opt.id)}
                />

                {/* Label + description */}
                <div className="text-center">
                  <p className={`text-sm font-semibold leading-tight ${isSelected ? 'text-gold' : 'text-text'}`}>
                    {opt.label}
                  </p>
                  <p className="text-[11px] text-text-dim mt-0.5 leading-snug">{opt.description}</p>
                </div>

                {/* Radio dot */}
                <button
                  type="button"
                  onClick={() => setMode(opt.id)}
                  aria-label={`Selecionar ${opt.label}`}
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    transition-all duration-200
                    ${isSelected
                      ? 'border-gold bg-gold'
                      : 'border-border hover:border-gold/50'}
                  `}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-[#1b1408]" />
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Plano de Fundo do Chat ── */}
      <div className={`mt-6 min-w-0 overflow-hidden transition-opacity duration-300 ${isLocked ? 'opacity-40 pointer-events-none select-none' : 'opacity-100'}`}>
        <p className="text-sm font-semibold text-text mb-3">Plano de Fundo</p>
        <BgScroller bg={bg} setBg={setBg} isLocked={isLocked} />
      </div>

      {/* Visualizar button — active only in simplified mode */}
      <div className={`mt-4 flex justify-center transition-opacity duration-300 ${isLocked ? 'opacity-40 pointer-events-none select-none' : 'opacity-100'}`}>
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          disabled={isLocked}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-border bg-surface/60 text-text-dim hover:text-text hover:border-gold/40 hover:bg-gold/5 transition-all duration-200 disabled:cursor-not-allowed"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Visualizar
        </button>
      </div>

      <p className="text-xs text-muted mt-5 flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        A mudança será aplicada imediatamente para novos clientes.
      </p>

      {showPreview && (
        <BookingPreviewModal onClose={() => setShowPreview(false)} />
      )}
    </section>
  )
}

// ─── Navbar Style Section ─────────────────────────────────────────────────────

function NavbarStyleSection() {
  const { navbarStyle, setNavbarStyle } = useNavbarPreference()

  const options: { id: NavbarStyle; label: string; description: string; preview: React.ReactNode }[] = [
    {
      id: 'option1',
      label: 'Barra inferior',
      description: 'Navegação compacta na parte inferior da tela, estilo app mobile clássico.',
      preview: (
        <div className="w-full h-full flex flex-col overflow-hidden rounded-lg bg-[#0f0f10]">
          {/* Top bar */}
          <div className="bg-[#0a0a0a] border-b border-[#1e1e1e] px-3 py-2 flex items-center justify-between">
            <div className="h-2 w-16 rounded bg-gold/50" />
            <div className="w-3 h-3 rounded-full bg-gold/30 border border-gold/40" />
          </div>
          {/* Content */}
          <div className="flex-1 px-3 py-2 flex flex-col gap-2 overflow-hidden">
            <div className="grid grid-cols-3 gap-1.5">
              {[true, false, false].map((accent, i) => (
                <div key={i} className={`rounded-md p-1.5 flex flex-col gap-1 ${accent ? 'bg-gold/10 border border-gold/20' : 'bg-white/5 border border-white/[0.08]'}`}>
                  <div className={`h-1.5 w-5 rounded ${accent ? 'bg-gold/70' : 'bg-white/20'}`} />
                  <div className={`h-1 w-3 rounded ${accent ? 'bg-gold/40' : 'bg-white/10'}`} />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {[1, 0.6, 0.4].map((op, i) => (
                <div key={i} className="flex items-center gap-1.5 py-0.5 border-b border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold/20 flex-shrink-0" />
                  <div className="h-1 flex-1 rounded bg-white/15" style={{ opacity: op }} />
                  <div className="h-1 w-4 rounded bg-white/10" style={{ opacity: op }} />
                </div>
              ))}
            </div>
          </div>
          {/* Bottom nav – ícones reais */}
          <div className="bg-[#080808] border-t border-[#2a2a2a] px-1 py-1.5 flex items-center justify-around">
            {[
              { active: true,  d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { active: false, d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { active: false, d: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z' },
              { active: false, d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { active: false, d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5 px-1.5 py-0.5">
                <svg className={`w-3.5 h-3.5 ${item.active ? 'text-gold' : 'text-white/25'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.d} />
                </svg>
                <div className={`h-0.5 w-3 rounded-full ${item.active ? 'bg-gold' : 'bg-transparent'}`} />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'option2',
      label: 'Menu lateral',
      description: 'Sidebar deslizante com animação de inclinação, estilo app premium.',
      preview: (
        <div className="w-full h-full flex overflow-hidden rounded-lg bg-[#0f0f10]">
          {/* Sidebar – ícones reais */}
          <div className="w-[36%] bg-[#090909] border-r border-[#1e1e1e] flex flex-col">
            <div className="px-2 pt-2 pb-1.5 flex items-center gap-1.5 border-b border-[#1e1e1e]">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gold to-yellow-700 flex-shrink-0 shadow-sm shadow-gold/30" />
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <div className="h-1 w-full rounded bg-white/35" />
                <div className="h-0.5 w-2/3 rounded bg-white/15" />
              </div>
            </div>
            <div className="flex flex-col gap-0.5 p-1.5 flex-1">
              {[
                { active: true,  d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                { active: false, d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                { active: false, d: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z' },
                { active: false, d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                { active: false, d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-1 px-1.5 py-1 rounded-lg ${item.active ? 'bg-gold/15' : ''}`}>
                  <svg className={`w-2.5 h-2.5 flex-shrink-0 ${item.active ? 'text-gold' : 'text-white/25'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.d} />
                  </svg>
                  <div className={`h-0.5 flex-1 rounded ${item.active ? 'bg-gold/60' : 'bg-white/12'}`} />
                </div>
              ))}
            </div>
          </div>
          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="bg-[#0a0a0a]/90 border-b border-[#1e1e1e] px-2 py-1.5 flex items-center gap-1.5">
              <div className="flex flex-col gap-0.5 w-3">
                <div className="h-0.5 w-full rounded bg-white/40" />
                <div className="h-0.5 w-3/4 rounded bg-white/25" />
                <div className="h-0.5 w-1/2 rounded bg-white/15" />
              </div>
              <div className="h-2 w-10 rounded bg-gold/45 ml-0.5" />
              <div className="ml-auto w-3 h-3 rounded-full bg-white/10 border border-white/15" />
            </div>
            <div className="flex-1 p-2 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-1">
                <div className="rounded-md bg-gold/10 border border-gold/20 p-1.5 flex flex-col gap-1">
                  <div className="h-1.5 w-5 rounded bg-gold/60" />
                  <div className="h-1 w-3 rounded bg-gold/30" />
                </div>
                <div className="rounded-md bg-white/5 border border-white/[0.08] p-1.5 flex flex-col gap-1">
                  <div className="h-1.5 w-4 rounded bg-white/25" />
                  <div className="h-1 w-3 rounded bg-white/12" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {[1, 0.7, 0.4].map((op, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-gold/20 flex-shrink-0" style={{ opacity: op }} />
                    <div className="h-0.5 flex-1 rounded bg-white/15" style={{ opacity: op }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section className="animate-fade-in-delayed">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-text mb-1">Estilo da Navegação</h2>
        <p className="text-sm text-text-dim">
          Escolha o estilo de menu que prefere. A preferência é salva neste dispositivo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map(opt => {
          const isSelected = navbarStyle === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setNavbarStyle(opt.id)}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-200
                hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40
                ${isSelected
                  ? 'border-gold shadow-lg shadow-gold/20 bg-gradient-to-b from-[#1e1a10] to-[#141414]'
                  : 'border-border bg-surface hover:border-gold/40'
                }`}
            >
              {/* Preview area */}
              <div className="w-full h-[160px] p-2 bg-[#0c0c0c]">
                {opt.preview}
              </div>

              {/* Info row */}
              <div className="flex items-start justify-between gap-3 p-4">
                <div className="flex-1 min-w-0">
                  <p className={`font-display text-base uppercase tracking-wider leading-tight ${isSelected ? 'text-gold' : 'text-text'}`}>
                    {opt.label}
                  </p>
                  <p className="text-xs text-text-dim mt-1 leading-snug">{opt.description}</p>
                </div>

                {/* Check indicator */}
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                  ${isSelected ? 'border-gold bg-gold' : 'border-border bg-transparent group-hover:border-gold/50'}`}>
                  {isSelected && (
                    <svg className="w-3.5 h-3.5 text-[#1b1408]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Selected badge */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-gold text-[#1b1408] text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Ativo
                </div>
              )}
            </button>
          )
        })}
      </div>

      <p className="text-xs text-muted mt-3 flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        A mudança é aplicada imediatamente ao navegar para outra página.
      </p>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// Personalize Page
// ═══════════════════════════════════════════════════════════════════════════════

export default function Personalize() {
  const [selectedAppIcon, setSelectedAppIconState] = useState(() => {
    const stored = typeof window !== 'undefined' ? getSelectedAppIcon() : null
    return stored || APP_ICON_OPTIONS[0]
  })
  const [isApplyingAppIcon, setIsApplyingAppIcon] = useState(false)
  const [showPWAModal, setShowPWAModal] = useState(false)
  const { canInstall, promptInstall } = usePWAInstall()

  const handleInstallPWA = async () => {
    const installed = await promptInstall()
    if (installed) setShowPWAModal(false)
  }

  return (
    <div className="grid gap-10">

      {/* ── Header ── */}
      <div className="animate-fade-in">
        <h1 className="font-display text-4xl md:text-5xl text-gold mb-2">Personalizar</h1>
        <p className="text-text-dim">Ajuste o visual e a experiência do app do seu jeito</p>
      </div>

      {/* ── Modo de Agendamento ── */}
      <BookingModeSection />

      {/* ─── Divider ─────────────────────────────────────────────────────────── */}
      <div className="h-px bg-border/60 -mt-2" />

      {/* ── Estilo da Navegação ── */}
      <NavbarStyleSection />

      {/* ─── Divider ─────────────────────────────────────────────────────────── */}
      <div className="h-px bg-border/60 -mt-2" />

      {/* ── Ícone do App (PWA) ── */}
      <section className="animate-fade-in-delayed">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-text mb-1">Ícone do App</h2>
            <p className="text-sm text-text-dim">
              Escolha qual logo será usada como ícone do app instalado (PWA). A seleção fica salva neste dispositivo.
            </p>
          </div>

          {/* PWA Install button */}
          <button
            type="button"
            onClick={() => setShowPWAModal(true)}
            className="relative flex-shrink-0 flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-xl border border-gold/30 bg-gradient-to-br from-gold/10 to-gold/5 hover:from-gold/15 hover:to-gold/8 hover:border-gold/50 text-gold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/15"
          >
            {isIOS() && !canInstall ? (
              <span className="material-symbols-outlined text-[20px] leading-none">ios_share</span>
            ) : (
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                <path d="M12 16l-4-4m4 4l4-4m-4 4V4M4 20h16" />
              </svg>
            )}
            <span className="text-sm font-semibold">Instalar App</span>
          </button>
        </div>

        <InstallPWAModal
          isOpen={showPWAModal}
          onClose={() => setShowPWAModal(false)}
          onInstall={handleInstallPWA}
          canInstall={canInstall}
          selectedAppIcon={selectedAppIcon}
        />

        <div className="card">
          {/* Icon grid */}
          <div className="max-w-[280px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[560px] mx-auto">
            <div className="grid grid-cols-5 gap-2 sm:gap-3 md:gap-3.5 lg:gap-4">
              {APP_ICON_OPTIONS.map((icon) => {
                const isSelected = icon === selectedAppIcon
                return (
                  <button
                    key={icon}
                    type="button"
                    onClick={async () => {
                      if (isApplyingAppIcon) return
                      setIsApplyingAppIcon(true)
                      setSelectedAppIconState(icon)
                      try {
                        await applyAndPersistAppIcon(icon)
                      } finally {
                        setIsApplyingAppIcon(false)
                      }
                    }}
                    className={`relative aspect-square rounded-xl sm:rounded-2xl border transition-all overflow-hidden bg-surface hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 ${
                      isSelected
                        ? 'border-gold shadow-lg shadow-gold/20'
                        : 'border-border hover:border-gold/50'
                    } ${isApplyingAppIcon ? 'opacity-80 cursor-not-allowed' : ''}`}
                    aria-label={isSelected ? 'Ícone selecionado' : 'Selecionar ícone'}
                    title={isSelected ? 'Selecionado' : 'Selecionar'}
                  >
                    <img
                      src={icon}
                      alt="Opção de ícone"
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-gold/15 flex items-center justify-center">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-bg/70 border border-gold/30 flex items-center justify-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <p className="text-xs text-text-dim mt-4 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Para refletir o novo ícone no app instalado, pode ser necessário reinstalar o PWA.
          </p>
        </div>
      </section>

    </div>
  )
}
