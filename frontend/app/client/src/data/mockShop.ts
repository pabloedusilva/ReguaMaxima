/**
 * Mock shop configuration
 *
 * TODO: Replace with real API call when backend is ready
 * GET /api/shop  →  ShopConfig
 *
 * 🔧 MOCK – altere `bookingMode` para testar cada modo:
 *   'pro'        → Fluxo tradicional (passo a passo)
 *   'simplified' → Chat estilo WhatsApp
 */

export type BookingMode = 'pro' | 'simplified'

export const mockShop = {
  id: 'shop_regua_maxima',
  name: 'Régua Máxima',
  slogan: 'Barbearia Premium',
  logo: '/assets/images/logos/logo.png',

  // Dados do perfil principal exibido no app do cliente (hero + chat)
  barberName: 'Pablo do Corte',
  barberImage: '/assets/images/exemplo/profile11.jpg',

  phone: '5531985079718',      // WhatsApp (DDI + DDD + número)
  instagram: 'reguamaxima',
  address: 'Rua das Flores, 123 – BH/MG',
  hours: {
    weekdays: { label: 'Seg – Sex', open: '08:00', close: '19:00' },
    saturday: { label: 'Sábado',   open: '08:00', close: '17:00' },
    sunday:   { label: 'Domingo',  closed: true },
  },

  // ─── 🔧 Modo de agendamento ─────────────────────────────────────────────────
  // Altere para 'pro' ou 'simplified' para trocar o modo exibido ao cliente
  bookingMode: 'simplified' as BookingMode,
}

/**
 * Retorna true se a barbearia está aberta agora, com base no horário de funcionamento.
 * Seg–Sex: 08:00–19:00 | Sábado: 08:00–17:00 | Domingo: fechado
 */
export function isShopOpen(): boolean {
  const now  = new Date()
  const day  = now.getDay()  // 0=Dom ... 6=Sáb
  const hour = now.getHours() + now.getMinutes() / 60
  if (day >= 1 && day <= 5) return hour >= 8 && hour < 19
  if (day === 6)            return hour >= 8 && hour < 17
  return false
}
