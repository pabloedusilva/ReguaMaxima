import { useEffect, RefObject } from 'react';

interface UseScrollRevealOptions {
  rootMargin?: string;
  threshold?: number;
}

export const useScrollReveal = (
  ref: RefObject<HTMLElement>,
  options: UseScrollRevealOptions = {}
) => {
  useEffect(() => {
    const { rootMargin = '0px 0px -10% 0px', threshold = 0.12 } = options;
    const element = ref.current;
    
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, options]);
};

// Hook para observar automaticamente todos os elementos com classe 'reveal'
export const useGlobalScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12,
      }
    );

    // Observar todos os elementos com classe 'reveal'
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};
