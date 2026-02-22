/**
 * ExpirationWarning – Alerta de expiração de assinatura
 * Espelha o mesmo componente da pasta barber.
 * TODO: Remover mock ao integrar backend.
 */

import { Subscription } from '@/features/manage/types'
import { formatDate } from '@/features/manage/utils/format'

interface Props {
  subscription: Subscription
}

export default function ExpirationWarning({ subscription }: Props) {
  const { daysRemaining, endDate, autoRenew } = subscription

  const level = daysRemaining <= 1 ? 'critical' : daysRemaining <= 3 ? 'high' : 'medium'

  const bgClass = {
    critical: 'bg-red-500/10 border-red-500/30',
    high:     'bg-orange-500/10 border-orange-500/30',
    medium:   'bg-yellow-500/10 border-yellow-500/30',
  }[level]

  const textClass = {
    critical: 'text-red-400',
    high:     'text-orange-400',
    medium:   'text-yellow-400',
  }[level]

  const message =
    daysRemaining === 0 ? 'Sua assinatura expira hoje!' :
    daysRemaining === 1 ? 'Sua assinatura expira amanhã!' :
    `Sua assinatura expira em ${daysRemaining} dias`

  return (
    <div className={`flex items-start gap-4 p-4 rounded-xl border ${bgClass}`}>
      <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${textClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
      <div>
        <p className={`font-semibold text-sm ${textClass}`}>{message}</p>
        <p className="text-text-dim text-xs mt-1">
          {autoRenew
            ? `Renovação automática em ${formatDate(endDate)}.`
            : `Vence em ${formatDate(endDate)}. Renove para não perder o acesso.`}
        </p>
      </div>
    </div>
  )
}
