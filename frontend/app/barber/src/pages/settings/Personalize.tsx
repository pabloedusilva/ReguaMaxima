import { useState } from 'react'
import { Download } from 'lucide-react'
import { applyAndPersistAppIcon, getSelectedAppIcon } from '@barber/lib/appIcon'
import { usePWAInstall } from '../../hooks/usePWAInstall'
import InstallPWAModal from '../../components/dialogs/InstallPWAModal'
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
        <div className="w-full h-full flex flex-col justify-end overflow-hidden rounded-lg bg-[#0f0f10]">
          <div className="flex-1 p-2 flex flex-col gap-1.5">
            <div className="h-2 w-3/4 rounded bg-gold/20" />
            <div className="h-1.5 w-1/2 rounded bg-white/10" />
            <div className="h-1.5 w-2/3 rounded bg-white/10" />
          </div>
          <div className="bg-black/95 border-t border-gold/20 px-2 py-2 flex items-center justify-around gap-1">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <div className={`w-3.5 h-3.5 rounded ${i === 0 ? 'bg-gold' : 'bg-white/20'}`} />
                <div className={`h-0.5 w-4 rounded ${i === 0 ? 'bg-gold' : 'bg-white/10'}`} />
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
          <div className="w-[38%] bg-[#0a0a0a] border-r border-[#2a2a2a] flex flex-col p-1.5 gap-1">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gold/80 to-gold/30 flex-shrink-0" />
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <div className="h-1 w-full rounded bg-white/30" />
                <div className="h-0.5 w-2/3 rounded bg-white/15" />
              </div>
            </div>
            <div className="h-px bg-[#2a2a2a] mb-0.5" />
            {[true, false, false, false, false].map((active, i) => (
              <div key={i} className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full ${active ? 'bg-gold/15' : ''}`}>
                <div className={`w-2 h-2 rounded-sm flex-shrink-0 ${active ? 'bg-gold' : 'bg-white/20'}`} />
                <div className={`h-0.5 flex-1 rounded ${active ? 'bg-gold/70' : 'bg-white/15'}`} />
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col">
            <div className="bg-[#0a0a0a]/80 border-b border-[#2a2a2a] px-2 py-1.5 flex items-center gap-1.5">
              <div className="w-2.5 h-2 flex flex-col gap-0.5 justify-center">
                <div className="h-0.5 w-full rounded bg-white/40" />
                <div className="h-0.5 w-3/4 rounded bg-white/30" />
              </div>
              <div className="h-1.5 w-8 rounded bg-gold/40" />
            </div>
            <div className="flex-1 p-2 flex flex-col gap-1.5">
              <div className="h-2 w-3/4 rounded bg-white/15" />
              <div className="h-1.5 w-1/2 rounded bg-white/10" />
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
              <div className="w-full h-[120px] p-2 bg-[#0c0c0c]">
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
  const [showInstallModal, setShowInstallModal] = useState(false)
  const { canInstall, promptInstall } = usePWAInstall()

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
          {/* Install button */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-text">Instalar App</p>
                <p className="text-xs text-text-dim">Adicionar à tela inicial do dispositivo</p>
              </div>
            </div>

            <button
              onClick={() => setShowInstallModal(true)}
              className="group shrink-0"
              title="Instalar App"
              aria-label="Instalar App"
            >
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/20 to-gold/5 hover:from-gold/30 hover:to-gold/10 transition-all overflow-hidden flex items-center justify-center shadow-lg shadow-black/30 group-hover:shadow-gold/20">
                <Download className="w-5 h-5 sm:w-6 sm:h-6 text-gold group-hover:brightness-125 transition-all" />
              </div>
            </button>
          </div>

          {/* Icon grid */}
          <div className="max-w-[280px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[560px]">
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

      {/* Install PWA Modal */}
      <InstallPWAModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        onInstall={async () => {
          const installed = await promptInstall()
          if (installed) setShowInstallModal(false)
        }}
        canInstall={canInstall}
        selectedAppIcon={selectedAppIcon}
      />
    </div>
  )
}
