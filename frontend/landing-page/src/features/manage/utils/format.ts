/**
 * Utilitários de formatação para a feature manage (landing-page)
 * TODO: Remover ou unificar com utils globais quando o backend for integrado.
 */

/** Formata um valor numérico em Real Brasileiro */
export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

/** Formata uma data ISO (YYYY-MM-DD) para DD/MM/AAAA */
export function formatDate(iso: string): string {
  if (!iso) return '-'
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

/** Retorna o label legível do tipo de plano */
export function planPeriodLabel(type: string): string {
  switch (type) {
    case 'monthly':  return 'mês'
    case 'quarterly': return '3 meses'
    case 'annual':   return 'ano'
    default:         return type
  }
}
