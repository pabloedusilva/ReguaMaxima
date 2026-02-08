import { Plan } from '@barber/types/subscriptions'
import { formatCurrency } from '@barber/utils/format'

interface Props {
  plans: Plan[]
  currentPlanId: string
}

export default function PlanComparison({ plans, currentPlanId }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {plans.map((plan) => {
        const isCurrentPlan = plan.id === currentPlanId
        
        return (
          <div 
            key={plan.id}
            className={`card hover-lift ${isCurrentPlan ? 'border-gold/50' : ''} ${plan.isPopular ? 'relative overflow-hidden' : ''}`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0">
                <div className="bg-gold text-[#1b1408] px-4 py-1 rounded-bl-xl font-semibold text-xs">
                  MELHOR CUSTO-BENEFÍCIO
                </div>
              </div>
            )}

            <div className="mb-6 mt-2">
              <h3 className="text-2xl font-bold text-text mb-2">{plan.name}</h3>
              
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-gold">
                  {formatCurrency(plan.price)}
                </span>
                <span className="text-text-dim text-sm">
                  /{plan.type === 'monthly' ? 'mês' : '3 meses'}
                </span>
              </div>

              {plan.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted line-through">
                    De {formatCurrency(plan.originalPrice)}
                  </span>
                  {plan.discount && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-semibold">
                      Economize {plan.discount}%
                    </span>
                  )}
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-text-dim">{feature}</span>
                </li>
              ))}
            </ul>

            {isCurrentPlan ? (
              <div className="btn btn-outline w-full cursor-default">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Plano Atual
              </div>
            ) : (
              <button className="btn btn-primary w-full">
                {plan.type === 'quarterly' ? 'Fazer Upgrade' : 'Selecionar Plano'}
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
