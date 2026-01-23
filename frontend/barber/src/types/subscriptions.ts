export type PlanType = 'monthly' | 'quarterly'
export type SubscriptionStatus = 'active' | 'expiring_soon' | 'expired' | 'cancelled'

export interface Plan {
  id: string
  name: string
  type: PlanType
  price: number
  originalPrice?: number
  durationMonths: number
  features: string[]
  isPopular?: boolean
  discount?: number
}

export interface Subscription {
  id: string
  planId: string
  plan: Plan
  status: SubscriptionStatus
  startDate: string
  endDate: string
  daysRemaining: number
  autoRenew: boolean
  paymentMethod?: {
    type: 'credit_card' | 'pix' | 'boleto'
    lastDigits?: string
    brand?: string
  }
  nextBillingDate?: string
  totalPaid: number
}

export interface BillingHistory {
  id: string
  date: string
  description: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  paymentMethod: string
  invoice?: string
}
