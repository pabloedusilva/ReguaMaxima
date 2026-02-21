import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@/components/icons';
import { useAuth } from '@/auth/context/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

export const MobileMenu = ({
  isOpen,
  closeMenu,
}: MobileMenuProps) => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className={`fixed left-0 right-0 bottom-0 bg-[#0a0a0a] z-[100] transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ top: 'var(--header-height, 56px)' }}
    >
      <div className="flex flex-col h-full">
        {/* Lista de Links - Scrollable */}
        <div className="flex-1 overflow-y-auto py-2">
          {/* Início */}
          <Link
            to="/"
            onClick={closeMenu}
            className={`flex items-center justify-between px-5 py-3.5 hover:bg-[#1a1a1a] transition-all duration-200 ${
              isActive('/') ? 'text-gold bg-[#1a1a1a]' : 'text-text'
            }`}
          >
            <span>Início</span>
            <ChevronRightIcon className={`w-4 h-4 ${isActive('/') ? 'text-gold' : 'text-text-dim'}`} />
          </Link>

          {/* Recursos */}
          <Link
            to="/recursos"
            onClick={closeMenu}
            className={`flex items-center justify-between px-5 py-3.5 hover:bg-[#1a1a1a] transition-all duration-200 ${
              isActive('/recursos') ? 'text-gold bg-[#1a1a1a]' : 'text-text'
            }`}
          >
            <span>Recursos</span>
            <ChevronRightIcon className={`w-4 h-4 ${isActive('/recursos') ? 'text-gold' : 'text-text-dim'}`} />
          </Link>

          {/* Cliente */}
          <Link
            to="/cliente"
            onClick={closeMenu}
            className={`flex items-center justify-between px-5 py-3.5 hover:bg-[#1a1a1a] transition-all duration-200 ${
              isActive('/cliente') ? 'text-gold bg-[#1a1a1a]' : 'text-text'
            }`}
          >
            <span>Cliente</span>
            <ChevronRightIcon className={`w-4 h-4 ${isActive('/cliente') ? 'text-gold' : 'text-text-dim'}`} />
          </Link>

          {/* Barbeiro */}
          <Link
            to="/barbeiro"
            onClick={closeMenu}
            className={`flex items-center justify-between px-5 py-3.5 hover:bg-[#1a1a1a] transition-all duration-200 ${
              isActive('/barbeiro') ? 'text-gold bg-[#1a1a1a]' : 'text-text'
            }`}
          >
            <span>Barbeiro</span>
            <ChevronRightIcon className={`w-4 h-4 ${isActive('/barbeiro') ? 'text-gold' : 'text-text-dim'}`} />
          </Link>

          {/* Preços */}
          <Link
            to="/precos"
            onClick={closeMenu}
            className={`flex items-center justify-between px-5 py-3.5 hover:bg-[#1a1a1a] transition-all duration-200 ${
              isActive('/precos') ? 'text-gold bg-[#1a1a1a]' : 'text-text'
            }`}
          >
            <span>Preços</span>
            <ChevronRightIcon className={`w-4 h-4 ${isActive('/precos') ? 'text-gold' : 'text-text-dim'}`} />
          </Link>

          {/* Contato */}
          <Link
            to="/contato"
            onClick={closeMenu}
            className={`flex items-center justify-between px-5 py-3.5 hover:bg-[#1a1a1a] transition-all duration-200 ${
              isActive('/contato') ? 'text-gold bg-[#1a1a1a]' : 'text-text'
            }`}
          >
            <span>Contato</span>
            <ChevronRightIcon className={`w-4 h-4 ${isActive('/contato') ? 'text-gold' : 'text-text-dim'}`} />
          </Link>

          {/* Botão CTA / Botão de Sair */}
          <div className="px-5 mt-4 mb-6">
            {!isAuthenticated ? (
              <Link
                to="/register"
                onClick={closeMenu}
                className="flex items-center justify-center w-full px-6 py-3.5 bg-gold text-background font-semibold rounded-lg hover:bg-gold/90 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Criar uma conta
              </Link>
            ) : (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                  navigate('/');
                }}
                className="flex items-center justify-center w-full px-6 py-3.5 border border-red-500/60 bg-transparent text-red-500 font-semibold rounded-lg hover:bg-red-500/10 hover:border-red-500 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Sair
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
