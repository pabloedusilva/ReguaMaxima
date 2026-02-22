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
import { Lock, RefreshCw, AlertTriangle } from 'lucide-react'
import { useSubscription } from '@barber/features/subscriptions/context/SubscriptionContext'

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
      className="fixed inset-0 z-[2147483647] flex flex-col items-center justify-center px-6 py-10"
      style={{
        background: 'rgba(10, 10, 10, 0.93)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hardBlockTitle"
    >
      {/* ── Ícone ─────────────────────────────────────────────────────────── */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-7 flex-shrink-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(201,149,59,0.12) 0%, rgba(201,149,59,0.04) 100%)',
          boxShadow: '0 0 48px rgba(201,149,59,0.14)',
          border: '2px solid rgba(201,149,59,0.22)',
        }}
      >
        <Lock
          className="w-10 h-10 text-gold"
          strokeWidth={1.7}
          aria-hidden="true"
        />
      </div>

      {/* ── Título ────────────────────────────────────────────────────────── */}
      <h2
        id="hardBlockTitle"
        className="font-display text-3xl sm:text-4xl text-gold text-center mb-3 tracking-wide"
      >
        Acesso Bloqueado
      </h2>

      {/* ── Subtítulo ─────────────────────────────────────────────────────── */}
      <p className="text-text-dim text-center text-sm sm:text-base max-w-xs leading-relaxed mb-2">
        Sua assinatura{' '}
        <strong className="text-text">{subscription.plan.name}</strong> expirou
        em{' '}
        <strong className="text-red-400">
          {formatDate(subscription.endDate)}
        </strong>
        .
      </p>
      <p className="text-text-dim text-center text-sm max-w-[300px] leading-relaxed mb-7">
        O acesso ao painel foi suspenso. Renove sua assinatura para recuperar
        todos os recursos.
      </p>

      {/* ── Badge de urgência ─────────────────────────────────────────────── */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold">
        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        Expirada há {days} {days === 1 ? 'dia' : 'dias'}
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse ml-0.5" />
      </div>

      {/* ── CTA principal ─────────────────────────────────────────────────── */}
      <button
        onClick={() => navigate('/assinaturas')}
        className="btn btn-primary py-4 px-10 text-base font-semibold gap-2 shadow-[0_0_24px_rgba(201,149,59,0.25)]"
      >
        <RefreshCw className="w-5 h-5" />
        Renovar Assinatura
      </button>

      {/* ── Nota de rodapé ────────────────────────────────────────────────── */}
      <p className="text-xs text-muted text-center mt-8 max-w-[260px] leading-relaxed">
        Em caso de dúvidas, entre em contato com o suporte via WhatsApp.
      </p>
    </div>,
    document.body
  )
}
