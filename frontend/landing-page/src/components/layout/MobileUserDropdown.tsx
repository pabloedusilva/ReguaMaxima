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
          <div className="px-5 py-3 border-b border-border">
            <p className="text-text-dim text-xs truncate">{user.email}</p>
          </div>

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
