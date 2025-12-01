import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <header className="site-header" style={{ borderBottom: '1px solid var(--border)' }}>
        <Link to="/" className="back-arrow" aria-label="Voltar ao início">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
        <div style={{ height: 56 }}></div>
      </header>

      <main className="legal-page">
        <div className="legal-header">
          <img src="/assets/images/logos/logo.png" alt="NA·RÉGUA" />
          <h1 className="legal-title">Sobre o Na-Régua</h1>
          <p className="legal-sub">Agendamentos simples, clientes fidelizados e barbearias organizadas.</p>
        </div>

        <article className="legal-card">
          <section className="about-section" id="o-que-e">
            <h3>O que é</h3>
            <p>O Na-Régua é um aplicativo focado em barbearias que simplifica o agendamento de serviços, facilita a comunicação com clientes e ajuda a manter o fluxo de trabalho organizado.</p>
          </section>
          <section className="about-section" id="problema">
            <h3>Problema</h3>
            <p>Agendamentos por mensagens e planilhas são demorados, suscetíveis a erros e dificultam a gestão do tempo. Além disso, lembretes e confirmações manuais tomam o tempo do profissional.</p>
          </section>
          <section className="about-section" id="como-funciona">
            <h3>Como funciona</h3>
            <ul className="legal-list">
              <li>Clientes escolhem serviços e horários disponíveis diretamente pelo app.</li>
              <li>Barbearias gerenciam agenda, bloqueios e preferências com poucos cliques.</li>
              <li>Lembretes e confirmações automatizadas reduzem faltas e atrasos.</li>
            </ul>
          </section>
          <section className="about-section" id="beneficios">
            <h3>Benefícios</h3>
            <ul className="legal-list">
              <li>Agilidade na comunicação e redução de esquecimentos.</li>
              <li>Melhor organização da agenda e do fluxo de trabalho.</li>
              <li>Experiência moderna para clientes, aumentando fidelização.</li>
            </ul>
          </section>
          <section className="about-section" id="quem-criou">
            <h3>Quem criou</h3>
            <div className="creator" aria-label="Criador do aplicativo">
              <div className="creator-grid">
                <div className="creator-text">
                  <p><strong>Pablo Eduardo Silva</strong> é o criador do Na-Régua. Profissional de tecnologia focado em produtos digitais, une visão de negócio, design centrado no usuário e engenharia para resolver problemas reais do dia a dia das barbearias. Sua atuação é pautada por simplicidade, performance e transparência — entregando uma experiência moderna para clientes e uma gestão organizada para profissionais.</p>
                  <p>Com experiência em desenvolvimento e liderança de produto, Pablo prioriza interfaces objetivas, fluxos intuitivos e decisões técnicas que suportam crescimento com qualidade. O Na-Régua reflete esses princípios: fácil de usar, confiável e pensado para aumentar a eficiência das barbearias sem burocracia.</p>
                </div>
                <figure className="creator-card">
                  <img src="/assets/images/professionals/Pablo.jpg" alt="Pablo Eduardo Silva" className="creator-photo" />
                  <figcaption className="creator-caption"><strong>Pablo Eduardo Silva</strong></figcaption>
                </figure>
              </div>
            </div>
          </section>
          <section className="about-section" id="missao-visao">
            <h3>Missão e Visão</h3>
            <p>Missão: facilitar agendamentos e melhorar a rotina das barbearias. Visão: ser a plataforma de referência para gestão e relacionamento com clientes no segmento.</p>
          </section>
          <section className="about-section" id="contato">
            <h3>Contato</h3>
            <p>Fale conosco pelo WhatsApp disponível no site ou pelo e-mail <a href="mailto:contato@naregua.app">contato@naregua.app</a>.</p>
          </section>
          <div className="legal-footer">Última atualização: 30/11/2025</div>
        </article>
      </main>
    </div>
  )
}
