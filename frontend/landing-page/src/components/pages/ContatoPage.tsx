import { useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useGlobalScrollReveal } from '@/hooks/useScrollReveal';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactForm } from '@/components/sections/ContactForm';

export const ContatoPage = () => {
  useSmoothScroll();
  useGlobalScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="pt-8">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};
