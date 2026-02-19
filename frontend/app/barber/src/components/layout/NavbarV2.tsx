import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Footer from '@barber/components/layout/Footer'
import InstallPWAModal from '@barber/components/dialogs/InstallPWAModal'
import { usePWAInstall } from '@barber/hooks/usePWAInstall'
import { useOfflineDetection } from '@barber/hooks/useOfflineDetection'
import NotificationsBell from '@barber/components/notifications/NotificationsBell'
import NotificationsPanel from '@barber/components/notifications/NotificationsPanel'
import { useNotifications } from '@barber/features/notifications/hooks/useNotifications'
import { currentSubscription } from '@barber/data/mockSubscriptions'
import { handleImageError } from '@barber/utils/imageHelpers'

// ── NavItem definition ────────────────────────────────────────────────────────
interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'Agendamentos',
    path: '/agendamentos',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Serviços',
    path: '/servicos',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
  },
  {
    label: 'Profissionais',
    path: '/profissionais',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    label: 'Horários',
    path: '/horarios',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Promoções',
    path: '/promocoes',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    label: 'Configurações',
    path: '/configuracoes',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Personalizar',
    path: '/personalizar',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3a9 9 0 100 18 3 3 0 003-3 1 1 0 011-1h.5a3.5 3.5 0 000-7H15A9 9 0 0012 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6.5 11.5m-1 0a1 1 0 102 0 1 1 0 10-2 0" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.5 7.5m-1 0a1 1 0 102 0 1 1 0 10-2 0" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.5 7m-1 0a1 1 0 102 0 1 1 0 10-2 0" />
      </svg>
    ),
  },
  {
    label: 'Figurinhas',
    path: '/figurinhas',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Assinaturas',
    path: '/assinaturas',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
]

// ─── Profile helpers ──────────────────────────────────────────────────────────
function getProfile() {
  try {
    return JSON.parse(localStorage.getItem('barbershop_profile') || '{}')
  } catch {
    return {}
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// NavbarV2 – drawer-style sidebar layout
// ═══════════════════════════════════════════════════════════════════════════════
export default function NavbarV2() {
  const navigate = useNavigate()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showPWAModal, setShowPWAModal] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const { count: notificationsCount } = useNotifications()
  const subscription = currentSubscription
  const isTrial = subscription.status === 'trial'
  const { canInstall, promptInstall } = usePWAInstall()

  useOfflineDetection()

  const [profile, setProfile] = useState(() => getProfile())

  // Sync profile when sidebar opens (picks up any unsaved changes)
  useEffect(() => {
    if (sidebarOpen) setProfile(getProfile())
  }, [sidebarOpen])

  // Close sidebar when route changes
  const location = useLocation()
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('barber_auth_demo')
    localStorage.removeItem('barber_remember')
    navigate('/login')
  }

  const handleInstallPWA = async () => {
    const installed = await promptInstall()
    if (installed) setShowPWAModal(false)
  }

  const logoSrc = profile?.logo || '/assets/images/logos/logo.png'
  const shopName = profile?.name || 'Régua Máxima'
  const shopEmail = profile?.email || 'email@exemplo.com'

  return (
    <div className="navv2-shell">
      {/* ── Sidebar ── */}
      <aside className={`navv2-sidebar${sidebarOpen ? ' open' : ''}`}>

        {/* Close button (mobile only) */}
        <div className="flex items-center justify-between gap-3 mb-5 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            className="navv2-hamburger-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}>
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {/* Profile header (avatar + name) */}
        <div className="flex items-center gap-3 mb-4">
          <div className="navv2-avatar-btn flex-shrink-0">
            <img
              src={logoSrc}
              alt={shopName}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text truncate leading-tight font-sans">
              {shopName}
            </p>
            <p className="text-[0.65rem] text-muted truncate leading-tight mt-0.5">{shopEmail}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/70 mb-3" />

        {/* Navigation */}
        <nav className="flex flex-col gap-[5px] flex-1 overflow-y-auto overflow-x-hidden py-1 scrollbar-hide">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `navv2-menu-item${isActive ? ' active' : ''}`
              }
            >
              <span className="navv2-menu-icon">{item.icon}</span>
              <span className="navv2-menu-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer – Logout */}
        <div className="pt-4 mt-2 border-t border-border/80">
          <button type="button" className="navv2-logout-btn" onClick={handleLogout}>
            <span className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7}>
                <path d="M10 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4M14 17l5-5-5-5M19 12H9" />
              </svg>
            </span>
            <span className="navv2-logout-label">Sair</span>
          </button>
        </div>
      </aside>

      {/* ── Main column ── */}
      <div className="navv2-main-col">

        {/* Click-catcher: closes sidebar when user taps the tilted content area */}
        {sidebarOpen && (
          <div
            className="absolute inset-0 z-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Top bar */}
        <header className="flex-none z-30 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-border pt-safe">
          <div className="flex items-center gap-3 px-4 md:px-6 py-4">
            {/* Hamburger (mobile/tablet) */}
            <button
              type="button"
              aria-label="Abrir menu"
              className={`navv2-hamburger-btn lg:hidden ${sidebarOpen ? 'is-hidden' : ''}`}
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}>
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            </button>

            {/* Notifications – always visible in topbar, aligned right */}
            <div className="ml-auto flex items-center">
              <NotificationsBell
                count={notificationsCount}
                onClick={() => { setShowNotifications(true) }}
              />
            </div>
          </div>

          {/* Trial banner */}
          {isTrial && (
            <div className="border-t border-gold/25 bg-gradient-to-r from-gold/15 via-gold/5 to-transparent px-4 md:px-6 py-2">
              <div className="flex flex-row items-center justify-between gap-2 text-[11px] sm:text-xs md:text-sm">
                <div className="flex items-center gap-2 text-text">
                  <svg className="w-4 h-4 mt-0.5 sm:mt-0 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="leading-snug">
                    Seu teste grátis termina em{' '}
                    <span className="font-semibold text-gold">
                      {subscription.daysRemaining} {subscription.daysRemaining === 1 ? 'dia' : 'dias'}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/assinaturas')}
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[11px] font-semibold text-gold hover:text-gold hover:bg-gold/10 transition-colors whitespace-nowrap"
                >
                  Ver planos
                  <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Page content */}
        <main data-app-scroll className="scroll-container flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>

        {/* Footer (desktop only) */}
        <div className="hidden lg:block flex-none">
          <Footer />
        </div>

        {/* PWA Install Modal */}
        <InstallPWAModal
          isOpen={showPWAModal}
          onClose={() => setShowPWAModal(false)}
          onInstall={handleInstallPWA}
          canInstall={canInstall}
        />

        <NotificationsPanel
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      </div>

      {/* Dark overlay (mobile) – clicking outside closes sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
