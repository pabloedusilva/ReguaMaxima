import { Plan, Subscription, BillingHistory } from '@barber/types/subscriptions'

export const availablePlans: Plan[] = [
  {
    id: 'plan_monthly',
    name: 'Plano Mensal',
    type: 'monthly',
    price: 69.90,
    originalPrice: 119.90,
    durationMonths: 1,
    features: [
      'Todos os recursos inclusos',
      'Suporte via WhatsApp 24h',
      'Sem limite de agendamentos',
      'Sem limite de profissionais',
      'Cancele quando quiser'
    ]
  },
  {
    id: 'plan_quarterly',
    name: 'Plano Trimestral',
    type: 'quarterly',
    price: 179.90,
    originalPrice: 359.70,
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
      'Economize 50% no valor total'
    ]
  }
]

// ============================================================
// CENÁRIOS DE TESTE - APENAS 1 ATIVO POR VEZ
// ============================================================
// Para testar diferentes cenários, descomente apenas 1 linha
// na seção "ASSINATURA ATIVA" no final deste arquivo
// ============================================================

// Cenário 0: Free trial de 7 dias (teste grátis)
export const mockSubscriptionFreeTrial7Days: Subscription = {
  id: 'sub_trial_7d',
  planId: 'plan_monthly',
  plan: availablePlans[0],
  status: 'trial',
  startDate: '2026-01-01',
  endDate: '2026-01-08',
  daysRemaining: 5,
  autoRenew: false,
  totalPaid: 0
}

// Cenário 1: Assinatura trimestral ativa com 90 dias restantes
export const mockSubscriptionTrimestral90Days: Subscription = {
  id: 'sub_001',
  planId: 'plan_quarterly',
  plan: availablePlans[1],
  status: 'active',
  startDate: '2026-01-01',
  endDate: '2026-04-01',
  daysRemaining: 90,
  autoRenew: true,
  paymentMethod: {
    type: 'credit_card',
    lastDigits: '4532',
    brand: 'Visa'
  },
  nextBillingDate: '2026-04-01',
  totalPaid: 179.90
}

// Cenário 2: Assinatura mensal ativa com 30 dias restantes
// export const mockSubscriptionMensal30Days: Subscription = {
//   id: 'sub_002',
//   planId: 'plan_monthly',
//   plan: availablePlans[0],
//   status: 'active',
//   startDate: '2025-12-23',
//   endDate: '2026-01-23',
//   daysRemaining: 30,
//   autoRenew: true,
//   paymentMethod: {
//     type: 'pix',
//   },
//   nextBillingDate: '2026-01-23',
//   totalPaid: 69.90
// }

// Cenário 3: Assinatura mensal expirando em breve (7 dias)
// export const mockSubscriptionExpiring7Days: Subscription = {
//   id: 'sub_003',
//   planId: 'plan_monthly',
//   plan: availablePlans[0],
//   status: 'expiring_soon',
//   startDate: '2025-12-16',
//   endDate: '2026-01-30',
//   daysRemaining: 7,
//   autoRenew: false,
//   paymentMethod: {
//     type: 'credit_card',
//     lastDigits: '1234',
//     brand: 'Mastercard'
//   },
//   totalPaid: 69.90
// }

// Cenário 4: Assinatura trimestral expirando amanhã (1 dia)
// export const mockSubscriptionExpiring1Day: Subscription = {
//   id: 'sub_004',
//   planId: 'plan_quarterly',
//   plan: availablePlans[1],
//   status: 'expiring_soon',
//   startDate: '2025-10-22',
//   endDate: '2026-01-24',
//   daysRemaining: 1,
//   autoRenew: false,
//   paymentMethod: {
//     type: 'credit_card',
//     lastDigits: '9876',
//     brand: 'Elo'
//   },
//   totalPaid: 179.90
// }

// Cenário 5: Assinatura mensal com 15 dias restantes
// export const mockSubscriptionMensal15Days: Subscription = {
//   id: 'sub_005',
//   planId: 'plan_monthly',
//   plan: availablePlans[0],
//   status: 'active',
//   startDate: '2026-01-08',
//   endDate: '2026-02-07',
//   daysRemaining: 15,
//   autoRenew: true,
//   paymentMethod: {
//     type: 'boleto'
//   },
//   nextBillingDate: '2026-02-07',
//   totalPaid: 69.90
// }

// Cenário 6: Assinatura trimestral com 60 dias restantes
// export const mockSubscriptionTrimestral60Days: Subscription = {
//   id: 'sub_006',
//   planId: 'plan_quarterly',
//   plan: availablePlans[1],
//   status: 'active',
//   startDate: '2025-11-23',
//   endDate: '2026-02-23',
//   daysRemaining: 60,
//   autoRenew: true,
//   paymentMethod: {
//     type: 'credit_card',
//     lastDigits: '5678',
//     brand: 'Visa'
//   },
//   nextBillingDate: '2026-02-23',
//   totalPaid: 179.90
// }

// Cenário 7: Assinatura mensal expirando em 3 dias
// export const mockSubscriptionExpiring3Days: Subscription = {
//   id: 'sub_007',
//   planId: 'plan_monthly',
//   plan: availablePlans[0],
//   status: 'expiring_soon',
//   startDate: '2025-12-26',
//   endDate: '2026-01-26',
//   daysRemaining: 3,
//   autoRenew: false,
//   paymentMethod: {
//     type: 'pix'
//   },
//   totalPaid: 69.90
// }

// ─── Cenário 8: Assinatura expirada – soft alert (daysExpired: 0 a 2) ─────────
// Exibe o modal suave a cada interação, porém não bloqueia a UI.
export const mockSubscriptionExpired: Subscription = {
  id: 'sub_expired',
  planId: 'plan_monthly',
  plan: availablePlans[0],
  status: 'expired',
  startDate: '2026-01-01',
  endDate: '2026-02-01',
  daysRemaining: 0,
  daysExpired: 1,        // <1... 2 = soft modal
  autoRenew: false,
  paymentMethod: { type: 'pix' },
  totalPaid: 69.90,
}

// ─── Cenário 9: Assinatura expirada – bloqueio total (daysExpired >= 3) ────────
// Ativa o HardBlockModal (blur full-screen) que não pode ser fechado.
// TODO: Ativar quando o backend confirmar >= 3 dias expirado.
export const mockSubscriptionExpiredHardBlock: Subscription = {
  id: 'sub_expired_block',
  planId: 'plan_monthly',
  plan: availablePlans[0],
  status: 'expired',
  startDate: '2026-01-01',
  endDate: '2026-02-01',
  daysRemaining: 0,
  daysExpired: 4,        // >= 3 = bloqueio total
  autoRenew: false,
  paymentMethod: { type: 'pix' },
  totalPaid: 69.90,
}

// ============================================================
// ASSINATURA ATIVA - Descomente apenas 1 opção abaixo
// ============================================================
// export const currentSubscription = mockSubscriptionTrimestral90Days
// export const currentSubscription = mockSubscriptionFreeTrial7Days
export const currentSubscription = mockSubscriptionExpired
// export const currentSubscription = mockSubscriptionExpiredHardBlock  // ← bloqueio total
// export const currentSubscription = mockSubscriptionTrimestral90Days
// export const currentSubscription = mockSubscriptionExpiring7Days
// export const currentSubscription = mockSubscriptionExpiring1Day
// export const currentSubscription = mockSubscriptionMensal15Days
// export const currentSubscription = mockSubscriptionTrimestral60Days
// export const currentSubscription = mockSubscriptionExpiring3Days

// Histórico de pagamentos mockado
export const mockBillingHistory: BillingHistory[] = [
  {
    id: 'bill_001',
    date: '2026-01-01',
    description: 'Plano Trimestral - Janeiro a Março 2026',
    amount: 179.90,
    status: 'paid',
    paymentMethod: 'Cartão Visa ****4532',
    invoice: '/invoices/2026-01-001.pdf'
  },
  {
    id: 'bill_002',
    date: '2025-10-01',
    description: 'Plano Trimestral - Outubro a Dezembro 2025',
    amount: 179.90,
    status: 'paid',
    paymentMethod: 'Cartão Visa ****4532',
    invoice: '/invoices/2025-10-001.pdf'
  },
  {
    id: 'bill_003',
    date: '2025-07-01',
    description: 'Plano Trimestral - Julho a Setembro 2025',
    amount: 179.90,
    status: 'paid',
    paymentMethod: 'PIX',
    invoice: '/invoices/2025-07-001.pdf'
  }
]

// ============================================================
// FUNÇÃO HELPER (OPCIONAL)
// ============================================================
// Caso prefira usar função ao invés de comentar/descomentar:
// import { getSubscriptionScenario } from '@barber/data/mockSubscriptions'
// const subscription = getSubscriptionScenario('1day')
// ============================================================
// export const getSubscriptionScenario = (scenario: 'default' | '90days' | '30days' | '7days' | '1day' | '15days' | '60days' | '3days' = 'default'): Subscription => {
//   switch (scenario) {
//     case '90days':
//       return mockSubscriptionTrimestral90Days
//     case '30days':
//       return mockSubscriptionMensal30Days
//     case '7days':
//       return mockSubscriptionExpiring7Days
//     case '1day':
//       return mockSubscriptionExpiring1Day
//     case '15days':
//       return mockSubscriptionMensal15Days
//     case '60days':
//       return mockSubscriptionTrimestral60Days
//     case '3days':
//       return mockSubscriptionExpiring3Days
//     default:
//       return currentSubscription
//   }
// }
