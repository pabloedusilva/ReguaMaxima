import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Footer from '@barber/components/layout/Footer'
import InstallPWAModal from '@barber/components/dialogs/InstallPWAModal'
import { usePWAInstall } from '@barber/hooks/usePWAInstall'
import { useOfflineDetection } from '@barber/hooks/useOfflineDetection'
import NotificationsBell from '@barber/components/notifications/NotificationsBell'
import NotificationsPanel from '@barber/components/notifications/NotificationsPanel'
import { useNotifications } from '@barber/features/notifications/hooks/useNotifications'
import { currentSubscription } from '@barber/data/mockSubscriptions'
import { useNavbarPreference } from '@barber/hooks/useNavbarPreference'
import NavbarV2 from '@barber/components/layout/NavbarV2'

export default function DashboardLayout() {
  const { navbarStyle } = useNavbarPreference()
  const navigate = useNavigate()
  const [showLogoutMenu, setShowLogoutMenu] = useState(false)
  const [showPWAModal, setShowPWAModal] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const { count: notificationsCount } = useNotifications()
  const subscription = currentSubscription
  const isTrial = subscription.status === 'trial'
  const isExpired = subscription.status === 'expired'
  const isExpiringSoon = subscription.status === 'expiring_soon'
  
  const { canInstall, promptInstall } = usePWAInstall()
  
  // Detecta quando o usuário fica offline
  useOfflineDetection()

  const handleInstallPWA = async () => {
    const installed = await promptInstall();
    if (installed) {
      setShowPWAModal(false);
    }
  };

  const handleClosePWAModal = () => {
    setShowPWAModal(false);
  }

  const handleLogout = () => {
    // TODO: Backend integration - Call logout API
    // DELETE /api/auth/session or POST /api/auth/logout
    localStorage.removeItem('barber_auth_demo')
    localStorage.removeItem('barber_remember')
    navigate('/login')
  }

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      label: 'Agendamentos',
      path: '/agendamentos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: 'Serviços',
      path: '/servicos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
        </svg>
      )
    },
    {
      label: 'Profissionais',
      path: '/profissionais',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      label: 'Horários',
      path: '/horarios',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Promoções',
      path: '/promocoes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    },
    {
      label: 'Configurações',
      path: '/configuracoes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
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
      )
    },
    {
      label: 'Figurinhas',
      path: '/figurinhas',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: 'Assinaturas',
      path: '/assinaturas',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    }
  ]

  // iOS PWA: BODY/#root não rolam; apenas o <main data-app-scroll> é o container de scroll.
  // Delegate rendering to NavbarV2 when Option 2 is selected
  if (navbarStyle === 'option2') {
    return <NavbarV2 />
  }

  return (
    <div className="h-[100dvh] bg-gradient-to-b from-bg to-bg-soft overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-[#0a0a0a] border-r border-border z-50">
        <div className="flex flex-col h-full w-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/logos/logo.png"
                alt="Régua Máxima"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h2 className="font-display text-gold text-xl">Régua Máxima</h2>
                <p className="text-text-dim text-xs">Dashboard Barbeiro</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gold text-[#1b1408] font-semibold shadow-lg shadow-gold/20'
                          : 'text-text-dim hover:text-text hover:bg-surface'
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 w-full transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Column */}
      <div className="lg:ml-64 flex h-full flex-col">
        {/* Top Bar */}
        <header className="flex-none z-30 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-border pt-safe">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            {/* Logo for Mobile (fixed to assets logo) */}
            <div className="flex items-center gap-3 lg:hidden">
              <img
                src="/assets/images/logos/logo.png"
                alt="Régua Máxima"
                className="w-8 h-8 object-contain"
              />
              <div className="hidden lg:block">
                <h2 className="font-display text-gold text-sm">Régua Máxima</h2>
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">

              <NotificationsBell
                count={notificationsCount}
                onClick={() => {
                  setShowLogoutMenu(false)
                  setShowNotifications(true)
                }}
              />
              <div className="relative">
              <button
                onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                className="relative w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-gold/20 hover:scale-105 transition-transform border-2 border-gold/30"
              >
                <img
                  src={(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('barbershop_profile') || '{}')?.logo) || '/assets/images/logos/logo.png'}
                  alt={(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('barbershop_profile') || '{}')?.name) || 'Régua Máxima'}
                  className="w-full h-full object-cover"
                />
              </button>
              
              {/* Logout Menu Dropdown */}
              {showLogoutMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-[199]"
                    onClick={() => setShowLogoutMenu(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 w-[220px] bg-[#141414] border border-border rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-2 z-[200] animate-fade-in">
                    <div className="px-4 py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <img
                          src={(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('barbershop_profile') || '{}')?.logo) || '/assets/images/logos/logo.png'}
                          alt={(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('barbershop_profile') || '{}')?.name) || 'Régua Máxima'}
                          className="flex-shrink-0 w-9 h-9 rounded-full object-cover ring-2 ring-gold/30"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-text font-medium truncate leading-tight">
                            {(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('barbershop_profile') || '{}')?.name) || 'Régua Máxima'}
                          </p>
                          <p className="text-muted text-[0.7rem] truncate leading-tight mt-0.5">
                            {(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('barbershop_profile') || '{}')?.email) || 'email@exemplo.com'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowLogoutMenu(false)
                        navigate('/configuracoes')
                      }}
                      className="group w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left text-text-dim hover:text-text transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 text-text-dim group-hover:text-text transition-colors duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Configurações</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="group w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left text-red-500 hover:text-red-600 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 text-red-500 group-hover:text-red-600 transition-colors duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Sair</span>
                    </button>
                  </div>
                </>
              )}
              </div>
            </div>
          </div>

          {(isTrial || isExpired || isExpiringSoon) && (
            <div className={`border-t px-4 md:px-6 py-2 ${
              isExpired
                ? 'border-red-500/25 bg-gradient-to-r from-red-500/15 via-red-500/5 to-transparent'
                : isExpiringSoon
                ? 'border-orange-500/25 bg-gradient-to-r from-orange-500/15 via-orange-500/5 to-transparent'
                : 'border-gold/25 bg-gradient-to-r from-gold/15 via-gold/5 to-transparent'
            }`}>
              <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 text-[11px] sm:text-xs md:text-sm max-w-6xl mx-auto">
                <div className="flex items-center gap-2 text-text">
                  {isExpired ? (
                    <svg className="w-4 h-4 mt-0.5 sm:mt-0 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : isExpiringSoon ? (
                    <svg className="w-4 h-4 mt-0.5 sm:mt-0 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 mt-0.5 sm:mt-0 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <p className="leading-snug">
                    {isExpired ? (
                      <>Assinatura expirada há{' '}
                        <span className="font-semibold text-red-400">
                          {subscription.daysExpired ?? 0} {(subscription.daysExpired ?? 0) === 1 ? 'dia' : 'dias'}
                        </span>
                      </>
                    ) : isExpiringSoon ? (
                      <>Assinatura expira em{' '}
                        <span className="font-semibold text-orange-400">
                          {subscription.daysRemaining} {subscription.daysRemaining === 1 ? 'dia' : 'dias'}
                        </span>
                      </>
                    ) : (
                      <>Seu teste grátis termina em{' '}
                        <span className="font-semibold text-gold">
                          {subscription.daysRemaining} {subscription.daysRemaining === 1 ? 'dia' : 'dias'}
                        </span>
                      </>
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/assinaturas')}
                  className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors whitespace-nowrap ${
                    isExpired
                      ? 'text-red-400 hover:bg-red-500/10'
                      : isExpiringSoon
                      ? 'text-orange-400 hover:bg-orange-500/10'
                      : 'text-gold hover:bg-gold/10'
                  }`}
                >
                  {isExpired ? 'Renovar' : isExpiringSoon ? 'Renovar' : 'Ver planos'}
                  <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Page Content (única área rolável) */}
        <main data-app-scroll className="scroll-container flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation (sem position:fixed; evita bugs de touch/scroll no iOS) */}
        <nav className="lg:hidden flex-none z-40 bottom-nav">
          <div className="relative bg-black/95 backdrop-blur-xl">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
            
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1 px-4 py-4 pb-safe min-w-max">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="flex-1 min-w-[75px]"
                  >
                    {({ isActive }) => (
                      <div className="relative">
                        {isActive && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gold rounded-full"></div>
                        )}
                        <div className="flex flex-col items-center gap-2 py-2.5">
                          <div className={`transition-all duration-300 text-xl ${
                            isActive ? 'text-gold scale-110' : 'text-text-dim'
                          }`}>
                            {item.icon}
                          </div>
                          <span className={`text-[9px] font-semibold tracking-tight transition-colors duration-300 ${
                            isActive ? 'text-gold' : 'text-text-dim/70'
                          }`}>
                            {item.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Footer (desktop only) */}
        <div className="hidden lg:block flex-none">
          <Footer />
        </div>

        {/* PWA Install Modal */}
        <InstallPWAModal
          isOpen={showPWAModal}
          onClose={handleClosePWAModal}
          onInstall={handleInstallPWA}
          canInstall={canInstall}
        />

        <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      </div>
    </div>
  )
}

