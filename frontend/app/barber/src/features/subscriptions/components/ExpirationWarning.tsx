import { Subscription } from '@barber/types/subscriptions'
import { formatDate } from '@barber/utils/format'

interface Props {
  subscription: Subscription
}

export default function ExpirationWarning({ subscription }: Props) {
  const { daysRemaining, endDate, autoRenew } = subscription

  const getWarningLevel = () => {
    if (daysRemaining <= 1) return 'critical'
    if (daysRemaining <= 3) return 'high'
    if (daysRemaining <= 7) return 'medium'
    return 'low'
  }

  const warningLevel = getWarningLevel()

  const getMessage = () => {
    if (daysRemaining === 0) {
      return 'Sua assinatura expira hoje!'
    }
    if (daysRemaining === 1) {
      return 'Sua assinatura expira amanhã!'
    }
    return `Sua assinatura expira em ${daysRemaining} dias`
  }

  const getBackgroundClass = () => {
    switch (warningLevel) {
      case 'critical':
        return 'bg-red-500/10 border-red-500/30'
      case 'high':
        return 'bg-orange-500/10 border-orange-500/30'
      case 'medium':
        return 'bg-yellow-500/10 border-yellow-500/30'
      default:
        return 'bg-blue-500/10 border-blue-500/30'
    }
  }

  const getTextClass = () => {
    switch (warningLevel) {
      case 'critical':
        return 'text-red-400'
      case 'high':
        return 'text-orange-400'
      case 'medium':
        return 'text-yellow-400'
      default:
        return 'text-blue-400'
    }
  }

  const getIconColor = () => {
    switch (warningLevel) {
      case 'critical':
        return 'text-red-400'
      case 'high':
        return 'text-orange-400'
      case 'medium':
        return 'text-yellow-400'
      default:
        return 'text-blue-400'
    }
  }

  return (
    <div className={`border rounded-2xl p-5 ${getBackgroundClass()} animate-pulse-glow`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 ${getIconColor()}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold ${getTextClass()} mb-1`}>
            {getMessage()}
          </h3>
          <p className="text-sm text-text-dim mb-3">
            {autoRenew ? (
              <>
                Sua assinatura será renovada automaticamente em{' '}
                <span className="font-semibold text-text">{formatDate(endDate)}</span>
              </>
            ) : (
              <>
                Sua assinatura expira em{' '}
                <span className="font-semibold text-text">{formatDate(endDate)}</span>.
                Renove agora para não perder o acesso.
              </>
            )}
          </p>
          
          {!autoRenew && (
            <button className="btn btn-primary text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Renovar Agora
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
