import { useEffect } from 'react'
import { currentSubscription, mockBillingHistory } from '@barber/data/mockSubscriptions'
import SubscriptionCard from '@barber/features/subscriptions/components/SubscriptionCard'
import ExpirationWarning from '@barber/features/subscriptions/components/ExpirationWarning'
import BillingHistory from '../../features/subscriptions/components/BillingHistory'

export default function SubscriptionPage() {
  useEffect(() => {
    document.title = 'Régua Máxima | Dashboard Barbeiro'
  }, [])

  const subscription = currentSubscription
  const needsWarning =
    subscription.status !== 'trial' && (
      subscription.status === 'expiring_soon' ||
      subscription.status === 'expired' ||
      subscription.daysRemaining <= 7
    )

  return (
    <div className="scroll-container h-full">
      <div className="p-4 sm:p-6 pb-24 max-w-6xl mx-auto">
        <div className="mb-6 animate-fade-in">
          <h1 className="font-display text-4xl sm:text-5xl text-gold mb-2 tracking-wide">
            Minha Assinatura
          </h1>
          <p className="text-text-dim text-sm sm:text-base">
            Gerencie seu plano e acompanhe seus pagamentos
          </p>
        </div>

        {needsWarning && (
          <div className="mb-6 animate-fade-in">
            <ExpirationWarning subscription={subscription} />
          </div>
        )}

        <div className="grid gap-6 mb-6 animate-fade-in-delayed">
          <SubscriptionCard subscription={subscription} />
        </div>

        <div className="animate-fade-in-delayed">
          <h2 className="text-2xl font-semibold text-text mb-4">Histórico de Pagamentos</h2>
          <BillingHistory history={mockBillingHistory} />
        </div>
      </div>
    </div>
  )
}
