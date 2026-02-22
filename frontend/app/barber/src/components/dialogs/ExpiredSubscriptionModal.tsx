/**
 * ExpiredSubscriptionModal – Modal suave de assinatura expirada
 *
 * Comportamento:
 *  - Aparece automaticamente ao carregar o app (se expirado)
 *  - Re-aparece a cada interação do usuário (cooldown de 5 s)
 *  - NÃO bloqueia a UI: ações/navegações continuam funcionando normalmente
 *  - Tem botão "X" para fechar e botão primário "Renovar Assinatura"
 *
 * Para o bloqueio total (3+ dias expirado) veja: HardBlockModal.tsx
 */

import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { X, RefreshCw, ShieldAlert } from 'lucide-react'
import { useSubscription } from '@barber/features/subscriptions/context/SubscriptionContext'

// ─── Componente ───────────────────────────────────────────────────────────────

export default function ExpiredSubscriptionModal() {
  const { showExpiredModal, setShowExpiredModal, isHardBlocked } =
    useSubscription()
  const navigate = useNavigate()

  // Não renderiza durante bloqueio total (HardBlockModal assume)
  if (!showExpiredModal || isHardBlocked) return null

  const handleRenew = () => {
    setShowExpiredModal(false)
    navigate('/assinaturas')
  }

  const handleClose = () => setShowExpiredModal(false)

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-content w-full max-w-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="expiredModalTitle"
      >
        {/* ── Botão fechar (topo direito) ───────────────────────────────────── */}
        <div className="flex justify-end px-4 pt-4">
          <button
            onClick={handleClose}
            className="w-11 h-11 rounded-full flex items-center justify-center text-text-dim hover:text-text hover:bg-surface transition-colors duration-200"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Corpo ─────────────────────────────────────────────────────────── */}
        <div className="px-6 pb-6 space-y-5">
          {/* Ícone central de alerta */}
          <div className="flex justify-center py-2">
            <ShieldAlert className="w-28 h-28 text-red-400" strokeWidth={1.4} />
          </div>

          {/* Aviso */}
          <div className="px-4 py-3 rounded-xl bg-red-500/5 border border-red-500/15">
            <p className="text-sm text-text-dim leading-relaxed text-center">
              Seu acesso ao <strong className="text-text">Régua Máxima</strong>{' '}
              expirou. Renove agora para continuar usando todos os recursos sem
              interrupção.
            </p>
          </div>

          {/* Ação */}
          <button
            onClick={handleRenew}
            className="btn btn-primary w-full py-3.5 text-sm gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Renovar Assinatura
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
