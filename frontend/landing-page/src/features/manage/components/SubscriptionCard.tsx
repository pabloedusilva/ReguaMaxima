/**
 * SubscriptionCard – Card do plano ativo (espelha o da pasta barber)
 * TODO: Conectar ao backend quando disponível.
 */

import type { ReactNode } from 'react'
import { Subscription } from '@/features/manage/types'
import { formatCurrency, formatDate, planPeriodLabel } from '@/features/manage/utils/format'

interface Props {
  subscription: Subscription
  onCancelSubscription?: () => void
  onUpgrade?: () => void
}

export default function SubscriptionCard({ subscription, onCancelSubscription, onUpgrade }: Props) {
  const { plan, status, endDate, daysRemaining, autoRenew, nextBillingDate } = subscription

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const getStatusBadge = () => {
    const styles: Record<string, string> = {
      active:         'bg-green-500/15 border-green-500/30 text-green-400',
      expiring_soon:  'bg-yellow-500/15 border-yellow-500/30 text-yellow-400',
      expired:        'bg-red-500/15 border-red-500/30 text-red-400',
      cancelled:      'bg-red-500/15 border-red-500/30 text-red-400',
      trial:          'bg-gold/15 border-gold/30 text-gold',
    }
    const labels: Record<string, string> = {
      active:        'Ativa',
      expiring_soon: 'Expirando em Breve',
      expired:       'Expirada',
      cancelled:     'Cancelada',
      trial:         'Teste grátis',
    }
    const cls = styles[status] ?? 'bg-surface border-border text-text-dim'
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
        {labels[status] ?? status}
      </span>
    )
  }

  const getProgressPercentage = () => {
    const totalDays = status === 'trial' ? 7 : plan.durationMonths * 30
    return Math.min(100, Math.round(((totalDays - daysRemaining) / totalDays) * 100))
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="bg-gradient-to-br from-[#141414] to-[#0d0d0d] border border-border rounded-2xl p-6 shadow-custom">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h2 className="text-2xl font-bold text-text">{plan.name}</h2>
            {getStatusBadge()}
          </div>
          <p className="text-text-dim text-sm">
            {plan.type === 'monthly'   ? 'Renovação mensal' :
             plan.type === 'quarterly' ? 'Renovação trimestral' :
                                        'Renovação anual'}
          </p>
        </div>

        <div className="text-left sm:text-right">
          {status === 'trial' ? (
            <div className="flex flex-col items-start sm:items-end gap-0.5">
              <span className="text-xs font-semibold tracking-wide text-gold uppercase">
                Teste grátis de 7 dias
              </span>
              <span className="text-xs text-text-dim">
                Depois, {formatCurrency(plan.price)}/{planPeriodLabel(plan.type)}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-start sm:items-end">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-gold">{formatCurrency(plan.price)}</span>
                <span className="text-text-dim text-sm">/{planPeriodLabel(plan.type)}</span>
              </div>
              {plan.originalPrice && (
                <p className="text-xs text-muted line-through mt-0.5">
                  De {formatCurrency(plan.originalPrice)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Info boxes */}
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <InfoBox
          icon={<CalendarIcon />}
          label="Válido até"
          value={endDate ? formatDate(endDate) : '–'}
        />
        <InfoBox
          icon={<ClockIcon />}
          label="Tempo restante"
          value={daysRemaining > 0 ? `${daysRemaining} ${daysRemaining === 1 ? 'dia' : 'dias'}` : '–'}
        />
        <InfoBox
          icon={<RefreshIcon />}
          label="Renovação"
          value={autoRenew ? 'Automática' : 'Manual'}
        />
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-dim">Progresso do período</span>
          <span className="text-xs font-semibold text-gold">{getProgressPercentage()}%</span>
        </div>
        <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold to-gold-600 rounded-full transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
        {autoRenew && nextBillingDate && (
          <p className="text-[11px] text-muted mt-1.5">
            Próxima cobrança em {formatDate(nextBillingDate)}
          </p>
        )}
      </div>

      {/* Ações */}
      {(status === 'expired' || status === 'cancelled') ? (
        /* ── Estado expirado / cancelado: destaca o botão de renovar ── */
        <div className="space-y-3">
          {/* Banner de aviso */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <svg className="w-4 h-4 flex-shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-red-400">
              {status === 'expired'
                ? 'Sua assinatura expirou. Renove agora para recuperar o acesso ao app.'
                : 'Sua assinatura foi cancelada. Assine um plano para voltar a usar o app.'}
            </p>
          </div>

          {/* Botão de renovar (largura total, destaque máximo) */}
          <button
            onClick={onUpgrade}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gold hover:bg-gold-600 text-bg transition-all duration-200 text-sm font-semibold shadow-lg shadow-gold/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Renovar Assinatura
          </button>
        </div>
      ) : (
        /* ── Estado normal: cancelar + upgrade ── */
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            onClick={onCancelSubscription}
            disabled={status === 'none'}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-surface/50 text-text-dim hover:text-red-400 hover:border-red-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 715.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Cancelar Assinatura
          </button>

          <button
            onClick={onUpgrade}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gold hover:bg-gold-600 text-bg transition-all duration-200 text-sm font-semibold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Fazer Upgrade
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Componentes internos ─────────────────────────────────────────────────────

interface InfoBoxProps {
  icon: ReactNode
  label: string
  value: string
}

function InfoBox({ icon, label, value }: InfoBoxProps) {
  return (
    <div className="bg-surface/50 rounded-xl p-4 border border-border/50">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gold">{icon}</span>
        <span className="text-xs text-text-dim">{label}</span>
      </div>
      <p className="text-base font-semibold text-text">{value}</p>
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  )
}
