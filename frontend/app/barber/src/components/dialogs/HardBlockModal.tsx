/**
 * HardBlockModal – Modal de bloqueio total (3+ dias expirado)
 *
 * Comportamento:
 *  - Cobre TODA a tela com um overlay desfocado (backdrop blur forte)
 *  - Não pode ser fechado (sem botão "X")
 *  - Único CTA: "Renovar Assinatura" → redireciona para /assinaturas
 *  - Ativo somente quando `isHardBlocked` = true (daysExpired >= 3)
 *
 * ─── COMO ATIVAR PARA TESTE ──────────────────────────────────────────────────
 * Em `src/data/mockSubscriptions.ts`, troque:
 *   export const currentSubscription = mockSubscriptionExpiredHardBlock
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * TODO: Futuramente o backend deverá informar se o acesso está bloqueado.
 *       Este componente não precisa de nenhuma alteração — apenas os dados
 *       do mock (ou API) determinam se ele será exibido.
 */

import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Lock, RefreshCw } from 'lucide-react'
import { useSubscription } from '@barber/features/subscriptions/context/SubscriptionContext'

// TODO: Substituir pelo número real quando o CRM/backend estiver configurado
const WHATSAPP_SUPPORT_URL = 'https://wa.me/5500000000000'

// ─── Helper ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  if (!dateStr) return '–'
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function HardBlockModal() {
  const { isHardBlocked, subscription } = useSubscription()
  const navigate = useNavigate()

  if (!isHardBlocked) return null

  const days = subscription.daysExpired ?? 0

  return createPortal(
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center p-6"
      style={{
        background: 'rgba(8, 8, 9, 0.92)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hardBlockTitle"
    >
      <div className="w-full max-w-sm flex flex-col items-center text-center gap-5">

        {/* Ícone */}
        <Lock className="w-20 h-20 text-gold" strokeWidth={1.4} aria-hidden="true" />

        {/* Título + descrição */}
        <div className="space-y-2">
          <h2
            id="hardBlockTitle"
            className="font-display text-3xl sm:text-4xl text-gold tracking-wide leading-tight"
          >
            Acesso Bloqueado
          </h2>
          <p className="text-text-dim text-sm leading-relaxed max-w-[260px] mx-auto">
            Sua assinatura expirou há{' '}
            <span className="text-text font-semibold">
              {days} {days === 1 ? 'dia' : 'dias'}
            </span>
            . Renove para recuperar o acesso completo ao painel.
          </p>
        </div>

        {/* Info boxes */}
        <div className="w-full grid grid-cols-2 gap-2.5">
          <div className="bg-surface/50 rounded-xl border border-border/50 px-4 py-3 text-left">
            <p className="text-[11px] text-muted mb-0.5 uppercase tracking-wide">Plano</p>
            <p className="text-sm font-semibold text-text truncate">
              {subscription.plan.name}
            </p>
          </div>
          <div className="bg-surface/50 rounded-xl border border-border/50 px-4 py-3 text-left">
            <p className="text-[11px] text-muted mb-0.5 uppercase tracking-wide">Expirou em</p>
            <p className="text-sm font-semibold text-red-400">
              {formatDate(subscription.endDate)}
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/assinaturas')}
          className="btn btn-primary w-full py-3.5 text-sm font-semibold gap-2 shadow-[0_0_20px_rgba(201,149,59,0.2)]"
        >
          <RefreshCw className="w-4 h-4" />
          Renovar Assinatura
        </button>

        {/* Suporte */}
        <p className="text-xs text-muted leading-relaxed">
          Precisa de ajuda?{' '}
          <a
            href={WHATSAPP_SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-text-dim underline decoration-border underline-offset-2 hover:text-text hover:decoration-gold/50 transition-colors duration-200"
          >
            Fale com o suporte
          </a>
        </p>
      </div>
    </div>,
    document.body
  )
}
