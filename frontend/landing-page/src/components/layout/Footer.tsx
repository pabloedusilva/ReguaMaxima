import { Link } from 'react-router-dom';
import { MailIcon, InstagramIcon, WhatsAppIcon } from '@/components/icons';
const logoImg = '/imagens/logos/logo.png';

export const Footer = () => {
  return (
    <footer id="contato" className="border-t border-border bg-[#101010]">
      <div className="max-w-[1100px] mx-auto px-4 py-8 grid gap-4">
        <div className="flex justify-center items-center">
          <img src={logoImg} alt="Régua Máxima" className="w-[110px] h-auto" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-muted text-sm">&copy; Régua Máxima todos os direitos reservados 2026</span>
            <nav className="flex gap-4 items-center" aria-label="Links legais">
              <Link to="/termos" className="text-text-dim text-[0.92rem] hover:text-text">
                Termos de uso
              </Link>
              <Link to="/privacidade" className="text-text-dim text-[0.92rem] hover:text-text">
                Política de Privacidade
              </Link>
              <Link to="/sobre" className="text-text-dim text-[0.92rem] hover:text-text">
                Sobre
              </Link>
            </nav>
          </div>

          <div className="flex gap-3 items-center" aria-label="Redes e contato">
            <a
              href="mailto:contato@naregua.app"
              aria-label="Enviar e-mail"
              className="inline-flex items-center justify-center w-9 h-9 rounded-[10px] bg-[#141414] border border-border text-text-dim transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#171717] hover:text-text hover:border-[#2e2e2e]"
            >
              <MailIcon className="w-[22px] h-[22px]" />
            </a>
            <a
              href="https://instagram.com/naregua.app"
              target="_blank"
              rel="noopener"
              aria-label="Abrir Instagram"
              className="inline-flex items-center justify-center w-9 h-9 rounded-[10px] bg-[#141414] border border-border text-text-dim transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#171717] hover:text-text hover:border-[#2e2e2e]"
            >
              <InstagramIcon className="w-[22px] h-[22px]" />
            </a>
            <a
              href="https://wa.me/5531985079718"
              target="_blank"
              rel="noopener"
              aria-label="Abrir WhatsApp"
              className="inline-flex items-center justify-center w-9 h-9 rounded-[10px] bg-[#141414] border border-border text-text-dim transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#171717] hover:text-text hover:border-[#2e2e2e]"
            >
              <WhatsAppIcon className="w-[22px] h-[22px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
