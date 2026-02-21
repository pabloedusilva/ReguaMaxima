import { useState, useCallback } from 'react';

export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : '';
      return newState;
    });
    setExpandedSubmenu(null);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
    setExpandedSubmenu(null);
  }, []);

  const toggleSubmenu = useCallback((key: string) => {
    setExpandedSubmenu((prev) => (prev === key ? null : key));
  }, []);

  return {
    isOpen,
    expandedSubmenu,
    toggleMenu,
    closeMenu,
    toggleSubmenu,
  };
};
