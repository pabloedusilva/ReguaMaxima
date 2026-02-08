import { useState, useCallback, useRef, useEffect } from 'react';

export const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  const openDrawer = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    if (drawerRef.current) {
      drawerRef.current.style.transform = '';
    }
    currentYRef.current = 0;
    setDragging(false);
    setTimeout(() => {
      document.body.style.overflow = '';
    }, 220);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setDragging(true);
    startYRef.current = e.clientY;
    if (drawerRef.current) {
      drawerRef.current.style.transition = 'none';
    }
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!dragging || !drawerRef.current) return;
      currentYRef.current = Math.max(0, e.clientY - startYRef.current);
      drawerRef.current.style.transform = `translateY(${currentYRef.current}px)`;
    },
    [dragging]
  );

  const handlePointerUp = useCallback(() => {
    if (!dragging || !drawerRef.current) return;
    drawerRef.current.style.transition = '';
    if (currentYRef.current >= 100) {
      closeDrawer();
    } else {
      drawerRef.current.style.transform = '';
    }
    setDragging(false);
  }, [dragging, closeDrawer]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [dragging, handlePointerMove, handlePointerUp]);

  return {
    isOpen,
    drawerRef,
    openDrawer,
    closeDrawer,
    handlePointerDown,
  };
};
