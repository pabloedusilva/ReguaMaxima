import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import { useAuth } from '@/auth/context/AuthContext';
import { UserDropdown } from './UserDropdown';
const logoImg = '/imagens/logos/logo.png';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
  const location = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);
  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-[110] px-4 py-3 backdrop-blur-[8px] border-b border-border md:px-5 md:py-2 lg:py-1.5 ${
        isOpen ? 'bg-[#0a0a0a]' : 'bg-bg-soft/80'
      }`}
      >
        <div className="relative max-w-[1400px] mx-auto">
          {/* Layout Mobile - Logo centralizada com absolute */}
          <div className="flex items-center justify-between md:hidden">
            {/* Hamburguer */}
            <button
              className="grid gap-[5px] bg-transparent border-none cursor-pointer p-1.5 transition-transform duration-200 hover:scale-105 relative z-[140]"
              aria-label="Abrir menu"
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <span
                className={`w-[22px] h-[2px] bg-text block rounded-sm transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-x-[5px] translate-y-[5px]' : ''
                }`}
              />
              <span
                className={`w-[22px] h-[2px] bg-text block rounded-sm transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-[22px] h-[2px] bg-text block rounded-sm transition-all duration-300 ${
                  isOpen ? '-rotate-45 translate-x-[6px] -translate-y-[6px]' : ''
                }`}
              />
            </button>

            {/* Spacer invisível para manter altura */}
            <div className="invisible w-[110px]">
              <img src={logoImg} alt="" className="w-[110px] h-auto" />
            </div>

            {/* Logo centralizada absolutamente */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link to="/" aria-label="Régua Máxima" className="flex items-center">
                <img src={logoImg} alt="Régua Máxima" className="w-[110px] h-auto object-contain brand-logo" />
              </Link>
            </div>

            {/* Dropdown/Login */}
            <div className="shrink-0">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-[10px] border border-gold/60 bg-transparent text-gold text-[0.8rem] font-medium whitespace-nowrap transition-all duration-200 hover:bg-gold hover:text-bg"
                >
                  Entrar
                </Link>
              ) : (
                <UserDropdown compact />
              )}
            </div>
          </div>

          {/* Layout Desktop */}
          <div className="hidden md:flex items-center justify-between">
            <Link to="/" aria-label="Régua Máxima" className="flex items-center">
              <img src={logoImg} alt="Régua Máxima" className="lg:w-[105px] h-auto object-contain brand-logo" />
            </Link>

            {/* Navegação desktop centralizada (absoluta) */}
            <nav className="absolute left-1/2 -translate-x-1/2 flex gap-3 lg:gap-4 items-center text-[0.88rem] lg:text-[0.9rem]">
            <Link
              to="/"
              className={`opacity-90 transition-all duration-200 hover:opacity-100 hover:text-gold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 ${
                isActive('/') ? 'text-gold after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Início
            </Link>
            <Link
              to="/recursos"
              className={`opacity-90 transition-all duration-200 hover:opacity-100 hover:text-gold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 ${
                isActive('/recursos') ? 'text-gold after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Recursos
            </Link>
            <Link
              to="/cliente"
              className={`opacity-90 transition-all duration-200 hover:opacity-100 hover:text-gold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 ${
                isActive('/cliente') ? 'text-gold after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Cliente
            </Link>
            <Link
              to="/barbeiro"
              className={`opacity-90 transition-all duration-200 hover:opacity-100 hover:text-gold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 ${
                isActive('/barbeiro') ? 'text-gold after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Barbeiro
            </Link>
            <Link
              to="/precos"
              className={`opacity-90 transition-all duration-200 hover:opacity-100 hover:text-gold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 ${
                isActive('/precos') ? 'text-gold after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Preços
            </Link>
            <Link
              to="/contato"
              className={`opacity-90 transition-all duration-200 hover:opacity-100 hover:text-gold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 ${
                isActive('/contato') ? 'text-gold after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Contato
            </Link>
          </nav>

          {/* Ações desktop à direita (absoluta) */}
          <div className="absolute right-0 flex gap-3 lg:gap-4 items-center">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-[0.9rem] font-medium text-text hover:text-gold transition-colors duration-200"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2.5 rounded-[10px] border border-gold/70 bg-transparent text-gold text-[0.9rem] font-semibold whitespace-nowrap transition-all duration-200 hover:bg-gold hover:text-bg"
                >
                  Criar uma conta
                </Link>
              </>
            ) : (
              <UserDropdown />
            )}
          </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isOpen}
        closeMenu={closeMenu}
      />
    </>
  );
};
