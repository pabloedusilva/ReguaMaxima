/**
 * NoSubscriptionCard – Exibido quando o usuário não tem plano ativo
 * TODO: Conectar ao backend quando disponível.
 */

interface Props {
  onSubscribe?: () => void
}

export default function NoSubscriptionCard({ onSubscribe }: Props) {
  return (
    <div className="bg-gradient-to-br from-[#141414] to-[#0d0d0d] border border-border rounded-2xl p-8 shadow-custom text-center">
      <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-text mb-2">Sem assinatura ativa</h3>
      <p className="text-text-dim text-sm mb-6 max-w-sm mx-auto leading-relaxed">
        Você ainda não possui um plano ativo. Assine agora e libere todos os recursos da plataforma.
      </p>

      <button
        onClick={onSubscribe}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold hover:bg-gold-600 text-bg font-semibold transition-all duration-200 text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        Ver planos disponíveis
      </button>
    </div>
  )
}
