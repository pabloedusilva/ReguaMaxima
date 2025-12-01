import { Link } from 'react-router-dom'

export default function Terms() {
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
          <h1 className="legal-title">Termos de Uso</h1>
          <p className="legal-sub">Aplicativo Na-Régua — agendamentos para barbearias</p>
        </div>

        <article className="legal-card">
          <h2>1. Aceitação dos Termos</h2>
          <p>Ao acessar ou utilizar o Na-Régua, você concorda com estes Termos de Uso. Se não concordar com alguma condição, recomendamos não utilizar o serviço.</p>
          <h2>2. Descrição do Serviço</h2>
          <p>O Na-Régua é uma plataforma que facilita agendamentos entre clientes e barbearias, oferecendo funcionalidades de gestão, comunicação e lembretes.</p>
          <h2>3. Cadastro e Conta</h2>
          <ul className="legal-list">
            <li>Você é responsável pela veracidade das informações cadastradas.</li>
            <li>Não compartilhe suas credenciais; mantenha sua conta segura.</li>
            <li>Podemos suspender contas em caso de uso indevido ou violação destes termos.</li>
          </ul>
          <h2>4. Planos, Pagamentos e Cancelamento</h2>
          <ul className="legal-list">
            <li>Os planos são mensais ou trimestrais, conforme exposto no site.</li>
            <li>Pagamentos não são reembolsáveis após a ativação do período contratado.</li>
            <li>O cancelamento pode ser feito a qualquer momento, cessando o acesso ao término do período vigente.</li>
          </ul>
          <h2>5. Uso Adequado</h2>
          <ul className="legal-list">
            <li>É proibido utilizar o Na-Régua para fins ilegais, spam ou assédio.</li>
            <li>Não tente interferir na operação ou segurança do serviço.</li>
          </ul>
          <h2>6. Conteúdo e Propriedade</h2>
          <ul className="legal-list">
            <li>Marca, design e conteúdo do Na-Régua são protegidos por direitos autorais e propriedade intelectual.</li>
            <li>Você mantém direitos sobre seu conteúdo, mas nos concede licença para operá-lo no app conforme necessário.</li>
          </ul>
          <h2>7. Disponibilidade e Modificações</h2>
          <p>Podemos atualizar, modificar ou interromper funcionalidades sem aviso prévio, buscando melhorar a experiência e estabilidade.</p>
          <h2>8. Limitação de Responsabilidade</h2>
          <p>O Na-Régua não se responsabiliza por prejuízos indiretos, perda de dados ou falhas externas ao nosso controle (como operadoras e provedores de serviços).</p>
          <h2>9. Contato</h2>
          <p>Para dúvidas sobre estes termos, entre em contato via WhatsApp disponível no site ou pelo e-mail de suporte.</p>
          <div className="legal-footer">Última atualização: 28/11/2025</div>
        </article>
      </main>
    </div>
  )
}
