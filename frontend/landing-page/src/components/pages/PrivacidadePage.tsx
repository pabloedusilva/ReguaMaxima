import { useNavigate } from 'react-router-dom';
const logoImg = '/imagens/logos/logo.png';

export const PrivacidadePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-[110] flex items-center justify-between px-4 py-2 backdrop-blur-[8px] bg-bg-soft/80 border-b border-border md:px-5">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 inline-flex items-center justify-center w-9 h-9 rounded-[10px] bg-[#141414] border border-border text-text-dim transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#171717] hover:text-text hover:border-[#2e2e2e]"
          aria-label="Voltar para a página anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="h-14" />
      </header>

      <main className="max-w-[900px] mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-3 mb-4 text-center">
          <img src={logoImg} alt="Régua Máxima" className="w-[180px] h-auto" />
          <h1 className="font-display text-gold text-[clamp(2rem,4vw,2.6rem)] m-0 mt-2">Política de Privacidade</h1>
          <p className="text-text-dim my-0 mb-4">Aplicativo Régua Máxima — proteção e transparência</p>
        </div>

        <article className="bg-[#141414] border border-border rounded-2xl p-5 shadow-custom">
          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4">1. Dados que Coletamos</h2>
          <ul className="list-disc pl-5 text-text-dim leading-relaxed mb-4">
            <li>Informações de cadastro: nome, telefone, e-mail (opcional).</li>
            <li>Dados de agendamentos: serviços, horários e preferências.</li>
            <li>Dados técnicos: logs de acesso e métricas de uso para melhorias.</li>
          </ul>

          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4 mt-4">2. Uso dos Dados</h2>
          <ul className="list-disc pl-5 text-text-dim leading-relaxed mb-4">
            <li>Viabilizar agendamentos e comunicações com barbearias.</li>
            <li>Personalizar a experiência e melhorar funcionalidades.</li>
            <li>Garantir segurança, detectar abusos e cumprir obrigações legais.</li>
          </ul>

          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4 mt-4">3. Compartilhamento</h2>
          <p className="text-text-dim leading-relaxed mb-4">
            Não vendemos dados. Compartilhamos apenas quando necessário para operação do aplicativo (por exemplo, provedores de infraestrutura) ou em cumprimento de exigências legais.
          </p>

          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4 mt-4">4. Segurança</h2>
          <p className="text-text-dim leading-relaxed mb-4">
            Adotamos medidas técnicas e organizacionais para proteger sua informação. Embora nos esforcemos pela máxima segurança, nenhum sistema é infalível.
          </p>

          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4 mt-4">5. Seus Direitos</h2>
          <ul className="list-disc pl-5 text-text-dim leading-relaxed mb-4">
            <li>Acessar, corrigir ou atualizar seus dados.</li>
            <li>Solicitar exclusão de informações conforme legislação aplicável.</li>
            <li>Revogar consentimentos que sejam base de tratamento.</li>
          </ul>

          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4 mt-4">6. Retenção</h2>
          <p className="text-text-dim leading-relaxed mb-4">
            Manteremos seus dados pelo tempo necessário para cumprir as finalidades descritas e obrigações legais, podendo ser anonimizados para análises.
          </p>

          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4 mt-4">7. Contato</h2>
          <p className="text-text-dim leading-relaxed mb-4">
            Em caso de dúvidas ou solicitações relacionadas à privacidade, entre em contato via WhatsApp disponível no site ou por e-mail de suporte.
          </p>

          <div className="mt-5 text-[0.9rem] text-muted">Última atualização: 28/11/2025</div>
        </article>
      </main>
    </div>
  );
};
