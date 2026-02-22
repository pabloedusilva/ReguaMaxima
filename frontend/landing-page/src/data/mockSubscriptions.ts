/**
 * Mock de assinaturas – landing-page / feature manage
 *
 * TODO: Remover este arquivo quando o backend for integrado.
 *       Substituir por chamadas à API: GET /api/account/subscription
 *
 * ============================================================
 * COMO TROCAR O CENÁRIO ATIVO:
 * Altere apenas a linha `export const currentSubscription = ...`
 * no final deste arquivo para um dos mocks abaixo.
 * ============================================================
 */

import { Plan, Subscription, BillingRecord } from '@/features/manage/types'

// ─── Planos disponíveis ───────────────────────────────────────────────────────

export const availablePlans: Plan[] = [
  {
    id: 'plan_monthly',
    name: 'Plano Mensal',
    type: 'monthly',
    price: 69.9,
    originalPrice: 119.9,
    durationMonths: 1,
    features: [
      'Todos os recursos inclusos',
      'Suporte via WhatsApp 24h',
      'Sem limite de agendamentos',
      'Sem limite de profissionais',
      'Cancele quando quiser',
    ],
  },
  {
    id: 'plan_quarterly',
    name: 'Plano Trimestral',
    type: 'quarterly',
    price: 179.9,
    originalPrice: 359.7,
    durationMonths: 3,
    isPopular: true,
    discount: 50,
    features: [
      'Todos os recursos inclusos',
      'Suporte via WhatsApp 24h',
      'Sem limite de agendamentos',
      'Sem limite de profissionais',
      'Cancele quando quiser',
      'Acesso por 3 meses completos',
      'Economize 50% no valor total',
    ],
  },
  {
    id: 'plan_annual',
    name: 'Plano Anual',
    type: 'annual',
    price: 599.9,
    originalPrice: 1438.8,
    durationMonths: 12,
    discount: 58,
    features: [
      'Todos os recursos inclusos',
      'Suporte via WhatsApp 24h',
      'Sem limite de agendamentos',
      'Sem limite de profissionais',
      'Cancele quando quiser',
      'Acesso por 12 meses completos',
      'Economize 58% no valor total',
      'Prioridade no suporte',
    ],
  },
]

// ─── Cenário 0: Sem assinatura ────────────────────────────────────────────────
export const mockSubscriptionNone: Subscription = {
  id: '',
  planId: '',
  plan: availablePlans[0],
  status: 'none',
  startDate: '',
  endDate: '',
  daysRemaining: 0,
  autoRenew: false,
  totalPaid: 0,
}

// ─── Cenário 1: Teste grátis (7 dias) ────────────────────────────────────────
export const mockSubscriptionTrial: Subscription = {
  id: 'sub_trial',
  planId: 'plan_monthly',
  plan: availablePlans[0],
  status: 'trial',
  startDate: '2026-02-15',
  endDate: '2026-02-22',
  daysRemaining: 5,
  autoRenew: false,
  totalPaid: 0,
}

// ─── Cenário 2: Plano mensal ativo ────────────────────────────────────────────
export const mockSubscriptionMonthly: Subscription = {
  id: 'sub_monthly',
  planId: 'plan_monthly',
  plan: availablePlans[0],
  status: 'active',
  startDate: '2026-01-22',
  endDate: '2026-02-22',
  daysRemaining: 18,
  autoRenew: true,
  paymentMethod: { type: 'pix' },
  nextBillingDate: '2026-02-22',
  totalPaid: 69.9,
}

// ─── Cenário 3: Plano trimestral ativo ────────────────────────────────────────
export const mockSubscriptionQuarterly: Subscription = {
  id: 'sub_quarterly',
  planId: 'plan_quarterly',
  plan: availablePlans[1],
  status: 'active',
  startDate: '2026-01-01',
  endDate: '2026-04-01',
  daysRemaining: 38,
  autoRenew: true,
  paymentMethod: { type: 'credit_card', lastDigits: '4532', brand: 'Visa' },
  nextBillingDate: '2026-04-01',
  totalPaid: 179.9,
}

// ─── Cenário 4: Plano anual ativo ─────────────────────────────────────────────
export const mockSubscriptionExpired: Subscription = {
  id: 'sub_expired',
  planId: 'plan_monthly',
  plan: availablePlans[0],
  status: 'expired',
  startDate: '2026-01-01',
  endDate: '2026-02-01',
  daysRemaining: 0,
  autoRenew: false,
  paymentMethod: { type: 'pix' },
  totalPaid: 69.9,
}

// ─── Cenário 5: Plano anual ativo ─────────────────────────────────────────────
export const mockSubscriptionAnnual: Subscription = {
  id: 'sub_annual',
  planId: 'plan_annual',
  plan: availablePlans[2],
  status: 'active',
  startDate: '2026-01-01',
  endDate: '2026-12-31',
  daysRemaining: 312,
  autoRenew: true,
  paymentMethod: { type: 'credit_card', lastDigits: '7890', brand: 'Mastercard' },
  nextBillingDate: '2026-12-31',
  totalPaid: 599.9,
}

// ============================================================
// ASSINATURA ATIVA – Descomente apenas 1 opção abaixo
// ============================================================
// export const currentSubscription = mockSubscriptionExpired
// export const currentSubscription = mockSubscriptionTrial
// export const currentSubscription = mockSubscriptionNone
export const currentSubscription = mockSubscriptionMonthly
// export const currentSubscription = mockSubscriptionQuarterly
// export const currentSubscription = mockSubscriptionAnnual

// ─── Histórico de pagamentos mockado ─────────────────────────────────────────
export const mockBillingHistory: BillingRecord[] = [
  {
    id: 'bill_001',
    date: '2026-01-01',
    description: 'Plano Trimestral – Janeiro a Março 2026',
    amount: 179.9,
    status: 'paid',
    paymentMethod: 'Cartão Visa ****4532',
    invoice: '/invoices/2026-01-001.pdf',
  },
  {
    id: 'bill_002',
    date: '2025-10-01',
    description: 'Plano Trimestral – Outubro a Dezembro 2025',
    amount: 179.9,
    status: 'paid',
    paymentMethod: 'Cartão Visa ****4532',
    invoice: '/invoices/2025-10-001.pdf',
  },
  {
    id: 'bill_003',
    date: '2025-07-01',
    description: 'Plano Mensal – Julho 2025',
    amount: 69.9,
    status: 'paid',
    paymentMethod: 'PIX',
    invoice: '/invoices/2025-07-001.pdf',
  },
  {
    id: 'bill_004',
    date: '2025-06-01',
    description: 'Plano Mensal – Junho 2025',
    amount: 69.9,
    status: 'failed',
    paymentMethod: 'Cartão Mastercard ****9876',
  },
]
