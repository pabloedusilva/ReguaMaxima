import { useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useGlobalScrollReveal } from '@/hooks/useScrollReveal';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  BarberDashboard,
  BarberExperience,
  ScreenReview,
} from '@/components/sections/ClientBarber';

export const BarbeiroPage = () => {
  useSmoothScroll();
  useGlobalScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="pt-8">
        <BarberDashboard />
        <BarberExperience />
        <ScreenReview
          title="Review de Telas — Barbeiro"
          screens={['Painel', 'Usuários', 'Relatórios', 'Configurações']}
          id="screens-barber"
        />
      </main>
      <Footer />
    </div>
  );
};
