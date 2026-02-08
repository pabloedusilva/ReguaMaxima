import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/context/AuthContext';

interface UserDropdownProps {
  compact?: boolean;
}

export const UserDropdown = ({ compact = false }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  if (!user) return null;

  const firstName = user.name.split(' ')[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-lg text-text hover:bg-[#1a1a1a] transition-colors duration-200 ${
          compact ? 'px-2 py-1.5' : 'px-3 py-2'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className={`font-medium ${compact ? 'text-[0.8rem]' : 'text-[0.9rem]'}`}>
          {firstName}
        </span>
        <svg
          className={`text-text-dim transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          } ${compact ? 'w-3 h-3' : 'w-4 h-4'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 bg-[#141414] border border-border rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-2 z-[200] animate-in fade-in slide-in-from-top-2 duration-200 ${
          compact ? 'w-[180px]' : 'w-[200px]'
        }`}>
          <div className="px-4 py-2 border-b border-border">
            <p className={`text-text font-medium truncate ${compact ? 'text-xs' : 'text-sm'}`}>
              {user.name}
            </p>
            <p className="text-text-dim text-xs truncate">{user.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className={`group w-full flex items-center gap-3 px-4 text-left transition-colors duration-200 ${
              compact 
                ? 'py-2 text-xs text-red-500 hover:text-red-600' 
                : 'py-2.5 text-sm text-red-500 hover:text-red-600'
            }`}
          >
            <svg
              className={`text-red-500 group-hover:text-red-600 transition-colors duration-200 ${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'}`}
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
