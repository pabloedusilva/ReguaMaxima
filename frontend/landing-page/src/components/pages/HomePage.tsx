import { useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useGlobalScrollReveal } from '@/hooks/useScrollReveal';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import {
  ClientDashboard,
  ClientExperience,
  BarberDashboard,
  BarberExperience,
  ScreenReview,
} from '@/components/sections/ClientBarber';
import { ContactForm } from '@/components/sections/ContactForm';

export const HomePage = () => {
  useSmoothScroll();
  useGlobalScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <ClientDashboard />
      <ClientExperience />
      <ScreenReview
        title="Review de Telas - Cliente"
        screens={['Agenda', 'Barbers', 'Perfil', 'Promoções']}
        id="screens"
      />
      <BarberDashboard />
      <BarberExperience />
      <ScreenReview
        title="Review de Telas — Barbeiro"
        screens={['Painel', 'Usuários', 'Relatórios', 'Configurações']}
        id="screens-barber"
      />
      <ContactForm />
      <Footer />
    </div>
  );
};
