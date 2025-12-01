import { Link } from 'react-router-dom'

export default function Privacy() {
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
          <h1 className="legal-title">Política de Privacidade</h1>
          <p className="legal-sub">Aplicativo Na-Régua — proteção e transparência</p>
        </div>

        <article className="legal-card">
          <h2>1. Dados que Coletamos</h2>
          <ul className="legal-list">
            <li>Informações de cadastro: nome, telefone, e-mail (opcional).</li>
            <li>Dados de agendamentos: serviços, horários e preferências.</li>
            <li>Dados técnicos: logs de acesso e métricas de uso para melhorias.</li>
          </ul>
          <h2>2. Uso dos Dados</h2>
          <ul className="legal-list">
            <li>Viabilizar agendamentos e comunicações com barbearias.</li>
            <li>Personalizar a experiência e melhorar funcionalidades.</li>
            <li>Garantir segurança, detectar abusos e cumprir obrigações legais.</li>
          </ul>
          <h2>3. Compartilhamento</h2>
          <p>Não vendemos dados. Compartilhamos apenas quando necessário para operação do aplicativo (por exemplo, provedores de infraestrutura) ou em cumprimento de exigências legais.</p>
          <h2>4. Segurança</h2>
          <p>Adotamos medidas técnicas e organizacionais para proteger sua informação. Embora nos esforcemos pela máxima segurança, nenhum sistema é infalível.</p>
          <h2>5. Seus Direitos</h2>
          <ul className="legal-list">
            <li>Acessar, corrigir ou atualizar seus dados.</li>
            <li>Solicitar exclusão de informações conforme legislação aplicável.</li>
            <li>Revogar consentimentos que sejam base de tratamento.</li>
          </ul>
          <h2>6. Retenção</h2>
          <p>Manteremos seus dados pelo tempo necessário para cumprir as finalidades descritas e obrigações legais, podendo ser anonimizados para análises.</p>
          <h2>7. Contato</h2>
          <p>Em caso de dúvidas ou solicitações relacionadas à privacidade, entre em contato via WhatsApp disponível no site ou por e-mail de suporte.</p>
          <div className="legal-footer">Última atualização: 28/11/2025</div>
        </article>
      </main>
    </div>
  )
}
