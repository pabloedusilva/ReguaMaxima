/**
 * Tipos da feature de Gerenciamento de Conta (landing-page)
 * TODO: Remover mocks e substituir por tipos derivados da API quando o backend for integrado.
 */

export type PlanType = 'monthly' | 'quarterly' | 'annual'

export type SubscriptionStatus =
  | 'none'
  | 'trial'
  | 'active'
  | 'expiring_soon'
  | 'expired'
  | 'cancelled'

export interface Plan {
  id: string
  name: string
  type: PlanType
  /** Preço cobrado por ciclo */
  price: number
  /** Preço original sem desconto */
  originalPrice?: number
  /** Duração em meses */
  durationMonths: number
  features: string[]
  isPopular?: boolean
  /** Percentual de desconto exibido */
  discount?: number
}

export interface PaymentMethod {
  type: 'credit_card' | 'pix' | 'boleto'
  lastDigits?: string
  brand?: string
}

export interface Subscription {
  id: string
  planId: string
  plan: Plan
  status: SubscriptionStatus
  startDate: string   // ISO YYYY-MM-DD
  endDate: string     // ISO YYYY-MM-DD
  daysRemaining: number
  autoRenew: boolean
  paymentMethod?: PaymentMethod
  nextBillingDate?: string
  totalPaid: number
}

export interface BillingRecord {
  id: string
  date: string        // ISO YYYY-MM-DD
  description: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  paymentMethod: string
  /** URL fictícia do comprovante – será real com backend */
  invoice?: string
}

export interface ManagedUser {
  id: string
  name: string
  email: string
  phone: string
  barbershopName: string
}
