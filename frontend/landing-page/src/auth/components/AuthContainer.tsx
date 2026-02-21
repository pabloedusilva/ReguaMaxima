import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface AuthContainerProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  showBackButton?: boolean;
  withSideImage?: boolean;
  sideImage?: string;
}

export const AuthContainer = ({ 
  children, 
  title, 
  subtitle, 
  showBackButton = true,
  withSideImage = false,
  sideImage
}: AuthContainerProps) => {
  const navigate = useNavigate();

  // Layout com imagem lateral (para registro)
  if (withSideImage && sideImage) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-bg relative">
        {/* Botão de Voltar */}
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="fixed left-4 top-4 lg:left-6 lg:top-6 inline-flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-[10px] bg-[#141414] border border-border text-text-dim transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#171717] hover:text-text hover:border-[#2e2e2e] z-50"
            aria-label="Voltar para a página anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Lado Esquerdo - Imagem (Desktop) / Topo (Mobile) */}
        <div className="w-full lg:w-1/2 lg:h-screen relative bg-gradient-to-br from-[#0a0a0a] via-bg to-bg-soft">
          <div className="h-[300px] lg:h-full lg:sticky lg:top-0 relative overflow-hidden">
            {/* Imagem de fundo */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${sideImage})` }}
            >
              {/* Overlay com múltiplas camadas para efeito profissional */}
              <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-bg/70 via-bg/50 to-bg/30"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Efeito de brilho sutil */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent"></div>
            </div>
            
            {/* Conteúdo sobre a imagem */}
            <div className="relative h-full flex flex-col justify-center items-start p-8 lg:p-12">
              <div className="max-w-md">
                {/* Logo - apenas desktop */}
                <div className="hidden lg:block mb-8">
                  <img 
                    src="/imagens/logos/logo.png" 
                    alt="Régua Máxima" 
                    className="h-56 w-56 xl:h-64 xl:w-64 object-contain drop-shadow-2xl"
                  />
                </div>
                
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 lg:mb-6 drop-shadow-2xl">
                  Crie sua conta grátis
                </h2>
                <p className="text-base lg:text-lg text-gray-100/90 drop-shadow-lg leading-relaxed">
                  Explore recursos essenciais para barbeiros e salões profissionais.
                </p>
                
                {/* Linha decorativa */}
                <div className="w-20 h-1 bg-gold/80 mt-6 rounded-full shadow-lg shadow-gold/30"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="w-full lg:w-1/2 lg:h-screen lg:overflow-y-auto flex items-start justify-center px-4 sm:px-6 lg:px-12 py-8 lg:py-12 bg-bg">
          {/* Logo centralizada na divisória - apenas mobile */}
          <div className="absolute left-1/2 top-[280px] -translate-x-1/2 -translate-y-1/2 z-10 lg:hidden">
            <img 
              src="/imagens/logos/logo.png" 
              alt="Régua Máxima" 
              className="h-32 w-32 sm:h-36 sm:w-36 object-contain drop-shadow-2xl"
            />
          </div>

          <div className="w-full max-w-[480px] mt-8 lg:mt-0 lg:my-auto">
            {/* Título e subtítulo */}
            <div className="text-center mb-8">
              <h1 className="font-display text-gold text-[1.75rem] sm:text-[2rem] mb-2 mt-8 lg:mt-0">
                {title}
              </h1>
              <p className="text-text-dim text-[0.9rem] sm:text-[0.95rem]">
                {subtitle}
              </p>
            </div>

            {/* Form Content */}
            <div className="w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Layout padrão (para login)
  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-1 bg-gradient-to-b from-bg to-bg-soft">
      {/* Botão de Voltar */}
      {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="fixed left-4 top-4 lg:left-6 lg:top-6 inline-flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-[10px] bg-[#141414] border border-border text-text-dim transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#171717] hover:text-text hover:border-[#2e2e2e] z-50"
          aria-label="Voltar para a página anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <div className="flex-1 flex items-center lg:items-start justify-center lg:pt-4">
        <div className="w-full max-w-[520px] lg:max-w-[600px]">
          {/* Logo */}
          <div className="text-center mb-6 lg:mb-4">
              <a href="/" className="inline-block">
              <img 
                src="/imagens/logos/logo.png" 
                alt="Régua Máxima" 
                className="h-32 sm:h-36 lg:h-40 mx-auto mb-4 lg:mb-6"
              />
            </a>
            <h1 className="font-display text-gold text-[2rem] sm:text-[2.2rem] lg:text-[2.6rem] mb-2 lg:mb-3">
              {title}
            </h1>
            <p className="text-text-dim text-[0.9rem] sm:text-[0.95rem] lg:text-[1.05rem] mb-6 lg:mb-4">
              {subtitle}
            </p>
          </div>

          {/* Form Content */}
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>

      {/* Footer de links legais (login) */}
      <footer className="mt-10 md:mt-12 lg:mt-16 pb-4">
        <nav
          className="flex flex-row gap-4 items-center justify-center flex-wrap text-center"
          aria-label="Links legais"
        >
          <Link
            to="/termos"
            className="text-text-dim text-[0.9rem] sm:text-[0.92rem] hover:text-text transition-colors"
          >
            Termos de uso
          </Link>
          <Link
            to="/privacidade"
            className="text-text-dim text-[0.9rem] sm:text-[0.92rem] hover:text-text transition-colors"
          >
            Política de Privacidade
          </Link>
          <Link
            to="/sobre"
            className="text-text-dim text-[0.9rem] sm:text-[0.92rem] hover:text-text transition-colors"
          >
            Sobre
          </Link>
        </nav>
      </footer>
    </div>
  );
};
