import { useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useGlobalScrollReveal } from '@/hooks/useScrollReveal';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  ClientDashboard,
  ClientExperience,
  ScreenReview,
} from '@/components/sections/ClientBarber';

export const ClientePage = () => {
  useSmoothScroll();
  useGlobalScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="pt-8">
        <ClientDashboard />
        <ClientExperience />
        <ScreenReview
          title="Review de Telas - Cliente"
          screens={['Agenda', 'Barbers', 'Perfil', 'Promoções']}
          id="screens"
        />
      </main>
      <Footer />
    </div>
  );
};
