import { useState } from 'react'
import { applyAndPersistAppIcon, getSelectedAppIcon } from '@barber/lib/appIcon'
import { useNavbarPreference, type NavbarStyle } from '../../hooks/useNavbarPreference'

// ─── Constants ────────────────────────────────────────────────────────────────

const APP_ICON_OPTIONS = [
  '/assets/images/logoSelect/1.jpg',
  '/assets/images/logoSelect/2.jpg',
  '/assets/images/logoSelect/3.jpg',
  '/assets/images/logoSelect/4.jpg',
  '/assets/images/logoSelect/5.jpg',
]

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

  return (
    <div className="grid gap-10">

      {/* ── Header ── */}
      <div className="animate-fade-in">
        <h1 className="font-display text-4xl md:text-5xl text-gold mb-2">Personalizar</h1>
        <p className="text-text-dim">Ajuste o visual e a experiência do app do seu jeito</p>
      </div>

      {/* ── Ícone do App (PWA) ── */}
      <section className="animate-fade-in-delayed">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-text mb-1">Ícone do App</h2>
          <p className="text-sm text-text-dim">
            Escolha qual logo será usada como ícone do app instalado (PWA). A seleção fica salva neste dispositivo.
          </p>
        </div>

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

      {/* ─── Divider ─────────────────────────────────────────────────────────── */}
      <div className="h-px bg-border/60 -mt-2" />

      {/* ── Estilo da Navegação ── */}
      <NavbarStyleSection />

    </div>
  )
}
