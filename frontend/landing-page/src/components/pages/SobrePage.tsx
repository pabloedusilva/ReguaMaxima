import { useNavigate } from 'react-router-dom';
const logoImg = '/imagens/logos/logo.png';
const pabloImg = '/imagens/elementos/Pablo.jpg';

export const SobrePage = () => {
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
          <h1 className="font-display text-gold text-[clamp(2rem,4vw,2.6rem)] m-0 mt-2">Sobre o Régua Máxima</h1>
          <p className="text-text-dim my-0 mb-4">Agendamentos simples, clientes fidelizados e barbearias organizadas.</p>
        </div>

        <article className="bg-[#141414] border border-border rounded-2xl p-5 shadow-custom">
          <section className="my-4" id="o-que-e">
            <h3 className="font-display text-gold text-[1.4rem] m-0 mb-2">O que é</h3>
            <p className="text-text-dim leading-relaxed">
              O Régua Máxima é um aplicativo focado em barbearias que simplifica o agendamento de serviços, facilita a comunicação com clientes e ajuda a manter o fluxo de trabalho organizado.
            </p>
          </section>

          <section className="my-4" id="problema">
            <h3 className="font-display text-gold text-[1.4rem] m-0 mb-2">Problema</h3>
            <p className="text-text-dim leading-relaxed">
              Agendamentos por mensagens e planilhas são demorados, suscetíveis a erros e dificultam a gestão do tempo. Além disso, lembretes e confirmações manuais tomam o tempo do profissional.
            </p>
          </section>

          <section className="my-4" id="como-funciona">
            <h3 className="font-display text-gold text-[1.4rem] m-0 mb-2">Como funciona</h3>
            <ul className="list-disc pl-5 text-text-dim leading-relaxed">
              <li>Clientes escolhem serviços e horários disponíveis diretamente pelo app.</li>
              <li>Barbearias gerenciam agenda, bloqueios e preferências com poucos cliques.</li>
              <li>Lembretes e confirmações automatizadas reduzem faltas e atrasos.</li>
            </ul>
          </section>

          <section className="my-4" id="beneficios">
            <h3 className="font-display text-gold text-[1.4rem] m-0 mb-2">Benefícios</h3>
            <ul className="list-disc pl-5 text-text-dim leading-relaxed">
              <li>Agilidade na comunicação e redução de esquecimentos.</li>
              <li>Melhor organização da agenda e do fluxo de trabalho.</li>
              <li>Experiência moderna para clientes, aumentando fidelização.</li>
            </ul>
          </section>

          <section className="my-4" id="quem-criou">
            <h3 className="font-display text-gold text-[1.4rem] m-0 mb-2">Quem criou</h3>
            <div className="mt-4" aria-label="Criador do aplicativo">
              <div className="grid gap-4 md:grid-cols-[1fr_260px] md:items-center">
                <div className="flex flex-col gap-3">
                  <p className="text-text-dim leading-relaxed">
                    <strong>Pablo Eduardo Silva</strong> é o criador do Régua Máxima. Profissional de tecnologia focado em produtos digitais, une visão de negócio, design centrado no usuário e engenharia para resolver problemas reais do dia a dia das barbearias. Sua atuação é pautada por simplicidade, performance e transparência — entregando uma experiência moderna para clientes e uma gestão organizada para profissionais.
                  </p>
                  <p className="text-text-dim leading-relaxed">
                    Com experiência em desenvolvimento e liderança de produto, Pablo prioriza interfaces objetivas, fluxos intuitivos e decisões técnicas que suportam crescimento com qualidade. O Régua Máxima reflete esses princípios: fácil de usar, confiável e pensado para aumentar a eficiência das barbearias sem burocracia.
                  </p>
                </div>
                <figure className="w-full max-w-[220px] text-center mx-auto md:max-w-[240px] md:p-3">
                  <img 
                    src={pabloImg} 
                    alt="Pablo Eduardo Silva" 
                    className="w-full max-w-[190px] aspect-square object-cover rounded-xl mx-auto md:max-w-[200px] md:rounded-[14px]"
                  />
                  <figcaption className="text-text-dim text-[0.85rem] mt-2 tracking-wide">
                    <strong>Pablo Eduardo Silva</strong>
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          <section className="my-4" id="missao-visao">
            <h3 className="font-display text-gold text-[1.4rem] m-0 mb-2">Missão e Visão</h3>
            <p className="text-text-dim leading-relaxed">
              Missão: facilitar agendamentos e melhorar a rotina das barbearias. Visão: ser a plataforma de referência para gestão e relacionamento com clientes no segmento.
            </p>
          </section>

          <section className="my-4" id="contato">
            <h3 className="font-display text-gold text-[1.4rem] m-0 mb-2">Contato</h3>
            <p className="text-text-dim leading-relaxed">
              Entre em contato pelo WhatsApp ou e-mail disponível no rodapé do site.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};
