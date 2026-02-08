import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useGlobalScrollReveal } from '@/hooks/useScrollReveal';
import { Header } from '@/components/layout/Header';
import { Pricing } from '@/components/sections/Pricing';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { WhatsAppIcon } from '@/components/icons';

export const PricingPage = () => {
  useSmoothScroll();
  useGlobalScrollReveal();

  return (
    <div className="min-h-screen bg-bg">
      <Header />

      <main className="max-w-[1200px] mx-auto px-4 py-12">
        <Pricing />

        <div className="mt-16 text-center reveal">
          <div className="bg-gradient-to-br from-[#141414] to-[#0d0d0d] border border-border rounded-2xl p-8 max-w-[800px] mx-auto shadow-custom">
            <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4">
              Dúvidas sobre os planos?
            </h2>
            <p className="text-text-dim leading-relaxed mb-6">
              Entre em contato conosco pelo WhatsApp e nossa equipe terá prazer em ajudar você a escolher o melhor plano para sua barbearia.
            </p>
            <a
              href={buildWhatsAppUrl('pricing')}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold border transition-all duration-150 hover:-translate-y-0.5 hover:brightness-105 bg-[#131f18] border-wa/35 text-wa shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:bg-wa hover:text-bg text-sm tracking-wide"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Enviar pelo WhatsApp</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
