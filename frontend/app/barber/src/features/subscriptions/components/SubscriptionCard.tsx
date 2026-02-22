import { Subscription } from '@barber/types/subscriptions'
import { formatCurrency, formatDate } from '@barber/utils/format'

interface Props {
  subscription: Subscription
}

export default function SubscriptionCard({ subscription }: Props) {
  const { plan, status, endDate, daysRemaining, autoRenew, nextBillingDate } = subscription

  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return <span className="badge badge-completed">Ativa</span>
      case 'expiring_soon':
        return <span className="badge badge-pending">Expirando em Breve</span>
      case 'expired':
        return <span className="badge badge-cancelled">Expirada</span>
      case 'cancelled':
        return <span className="badge badge-cancelled">Cancelada</span>
      case 'trial':
        return <span className="badge badge-trial">Teste grátis</span>
    }
  }

  const getProgressPercentage = () => {
    const totalDays = status === 'trial' ? 7 : plan.durationMonths * 30
    return ((totalDays - daysRemaining) / totalDays) * 100
  }

  return (
    <div className="card hover-lift">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-text">{plan.name}</h2>
            {getStatusBadge()}
          </div>
          <p className="text-text-dim text-sm">
            {plan.type === 'monthly' ? 'Renovação mensal' : 'Plano trimestral'}
          </p>
        </div>

        <div className="text-left sm:text-right">
          <div className="flex items-baseline gap-2 mb-1">
            {status === 'trial' ? (
              <div className="flex flex-col items-start sm:items-end gap-0.5">
                <span className="text-xs font-semibold tracking-wide text-gold uppercase">
                  Teste grátis de 7 dias
                </span>
                <span className="text-xs text-text-dim">
                  Depois, {formatCurrency(plan.price)}/{plan.type === 'monthly' ? 'mês' : '3 meses'}
                </span>
              </div>
            ) : (
              <>
                <span className="text-3xl font-bold text-gold">
                  {formatCurrency(plan.price)}
                </span>
                <span className="text-text-dim text-sm">
                  /{plan.type === 'monthly' ? 'mês' : '3 meses'}
                </span>
              </>
            )}
          </div>
          {plan.originalPrice && status !== 'trial' && (
            <p className="text-xs text-muted line-through">
              De {formatCurrency(plan.originalPrice)}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-text-dim">Válido até</span>
          </div>
          <p className="text-base font-semibold text-text">{formatDate(endDate)}</p>
        </div>

        <div className="bg-surface/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-text-dim">Tempo restante</span>
          </div>
          <p className="text-base font-semibold text-text">
            {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}
          </p>
        </div>

        <div className="bg-surface/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-xs text-text-dim">Renovação</span>
          </div>
          <p className="text-base font-semibold text-text">
            {autoRenew ? 'Automática' : 'Manual'}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-dim">Progresso do período</span>
          <span className="text-sm font-semibold text-gold">
            {Math.round(getProgressPercentage())}%
          </span>
        </div>
        <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-gold to-gold-600 rounded-full transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {autoRenew && nextBillingDate && (
        <p className="text-xs text-muted mt-1">
          Próxima cobrança em {formatDate(nextBillingDate)}
        </p>
      )}

      <div className="mt-6 flex justify-center">
        <button className="btn btn-outline gap-2 px-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Gerenciar Assinatura
        </button>
      </div>
    </div>
  )
}
