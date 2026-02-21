import { useNavigate } from 'react-router-dom';
const logoImg = '/imagens/logos/logo.png';

export const TermosPage = () => {
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
          <h1 className="font-display text-gold text-[clamp(2rem,4vw,2.6rem)] m-0 mt-2">Termos de Uso</h1>
          <p className="text-text-dim my-0 mb-4">Aplicativo Régua Máxima — agendamentos para barbearias</p>
        </div>

        <article className="bg-[#141414] border border-border rounded-2xl p-5 shadow-custom">
          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4">1. Aceitação dos Termos</h2>
          <p className="text-text-dim leading-relaxed mb-4">
            Ao acessar ou utilizar o Régua Máxima, você concorda com estes Termos de Uso. Se não concordar com alguma condição, recomendamos não utilizar o serviço.
          </p>

          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4 mt-4">2. Descrição do Serviço</h2>
          <p className="text-text-dim leading-relaxed mb-4">
            O Régua Máxima é uma plataforma que facilita agendamentos entre clientes e barbearias, oferecendo funcionalidades de gestão, comunicação e lembretes.
          </p>

          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4 mt-4">3. Cadastro e Conta</h2>
          <ul className="list-disc pl-5 text-text-dim leading-relaxed mb-4">
            <li>Você é responsável pela veracidade das informações cadastradas.</li>
            <li>Não compartilhe suas credenciais; mantenha sua conta segura.</li>
            <li>Podemos suspender contas em caso de uso indevido ou violação destes termos.</li>
          </ul>

          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4 mt-4">4. Planos, Pagamentos e Cancelamento</h2>
          <ul className="list-disc pl-5 text-text-dim leading-relaxed mb-4">
            <li>Os planos são mensais ou trimestrais, conforme exposto no site.</li>
            <li>Pagamentos não são reembolsáveis após a ativação do período contratado.</li>
            <li>O cancelamento pode ser feito a qualquer momento, cessando o acesso ao término do período vigente.</li>
          </ul>

          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4 mt-4">5. Uso Adequado</h2>
          <ul className="list-disc pl-5 text-text-dim leading-relaxed mb-4">
            <li>É proibido utilizar o Régua Máxima para fins ilegais, spam ou assédio.</li>
            <li>Não tente interferir na operação ou segurança do serviço.</li>
          </ul>

          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4 mt-4">6. Conteúdo e Propriedade</h2>
          <ul className="list-disc pl-5 text-text-dim leading-relaxed mb-4">
            <li>Marca, design e conteúdo do Régua Máxima são protegidos por direitos autorais e propriedade intelectual.</li>
            <li>Você mantém direitos sobre seu conteúdo, mas nos concede licença para operá-lo no app conforme necessário.</li>
          </ul>

          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4 mt-4">7. Disponibilidade e Modificações</h2>
          <p className="text-text-dim leading-relaxed mb-4">
            Podemos atualizar, modificar ou interromper funcionalidades sem aviso prévio, buscando melhorar a experiência e estabilidade.
          </p>

          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4 mt-4">8. Limitação de Responsabilidade</h2>
          <p className="text-text-dim leading-relaxed mb-4">
            O Régua Máxima não se responsabiliza por prejuízos indiretos, perda de dados ou falhas externas ao nosso controle (como operadoras e provedores de serviços).
          </p>

          <h2 className="font-display text-gold text-[1.8rem] m-0 mb-4 mt-4">9. Contato</h2>
          <p className="text-text-dim leading-relaxed mb-4">
            Para dúvidas sobre estes termos, entre em contato via WhatsApp disponível no site ou pelo e-mail de suporte.
          </p>

          <div className="mt-5 text-[0.9rem] text-muted">Última atualização: 28/11/2025</div>
        </article>
      </main>
    </div>
  );
};
