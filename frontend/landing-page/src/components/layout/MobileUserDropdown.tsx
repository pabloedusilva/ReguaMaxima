import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/context/AuthContext';

interface MobileUserDropdownProps {
  closeMenu?: () => void;
}

export const MobileUserDropdown = ({ closeMenu }: MobileUserDropdownProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsExpanded(false);
    navigate('/');
    closeMenu?.();
  };

  if (!user) return null;

  return (
    <div className="border-t border-border bg-[#0d0d0d]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-text hover:bg-[#1a1a1a] transition-all duration-200"
      >
        <span className="font-medium">{user.name}</span>
        <svg
          className={`w-4 h-4 text-text-dim transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="bg-[#0a0a0a] animate-in slide-in-from-top-2 duration-200">
          <div className="px-5 py-3.5 border-b border-border">
            <div className="flex items-center gap-3">
              <img
                src="/imagens/exemplo/profile1.jpg"
                alt={user.name}
                className="flex-shrink-0 w-10 h-10 rounded-full object-cover ring-2 ring-gold/30"
              />
              <div className="min-w-0 flex-1">
                <p className="text-text font-medium text-sm truncate leading-tight">
                  {user.name}
                </p>
                <p className="text-muted text-xs truncate leading-tight mt-0.5">{user.email}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsExpanded(false);
              navigate('/configuracoes');
              closeMenu?.();
            }}
            className="w-full flex items-center gap-3 px-5 py-3.5 text-left text-text hover:bg-[#1a1a1a] transition-all duration-200"
          >
            <svg
              className="w-4 h-4 text-text-dim"
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
            className="w-full flex items-center gap-3 px-5 py-3.5 text-left text-text hover:bg-[#1a1a1a] transition-all duration-200"
          >
            <svg
              className="w-4 h-4 text-text-dim"
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
      )}
    </div>
  );
};
