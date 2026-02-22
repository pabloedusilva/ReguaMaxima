/**
 * SubscriptionContext – Contexto global de assinatura do barbeiro
 *
 * Responsabilidades:
 *  - Expor os dados da assinatura atual em toda a aplicação
 *  - Detectar se a assinatura está expirada (soft) ou em bloqueio total (hard)
 *  - Abrir o modal suave automaticamente ao montar e a cada interação do usuário
 *    (com cooldown de 5 s para evitar spam)
 *
 * TODO: Substituir `currentSubscription` por chamada à API quando o backend
 *       estiver disponível. Ex: GET /api/account/subscription
 *
 * ─── COMO ALTERAR O CENÁRIO DE TESTE ─────────────────────────────────────────
 * Edite `src/data/mockSubscriptions.ts` e troque o valor de `currentSubscription`
 * Para soft modal  → mockSubscriptionExpired
 * Para hard block  → mockSubscriptionExpiredHardBlock
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import type { Subscription } from '@barber/types/subscriptions'
import { currentSubscription } from '@barber/data/mockSubscriptions'

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface SubscriptionContextType {
  /** Dados completos da assinatura */
  subscription: Subscription
  /** true quando status === 'expired' ou 'cancelled' */
  isExpired: boolean
  /**
   * true quando expirada há 3+ dias.
   * Ativa o HardBlockModal (sem opção de fechar).
   */
  isHardBlocked: boolean
  /** Controla a visibilidade do modal suave (ExpiredSubscriptionModal) */
  showExpiredModal: boolean
  setShowExpiredModal: (v: boolean) => void
}

// ─── Context ──────────────────────────────────────────────────────────────────

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
)

// ─── Constantes ───────────────────────────────────────────────────────────────

/** Cooldown mínimo (ms) entre re-exibições do modal soft após uma interação */
const MODAL_COOLDOWN_MS = 5_000

/** Dias expirados necessários para ativar o bloqueio total */
const HARD_BLOCK_DAYS = 3

// ─── Provider ─────────────────────────────────────────────────────────────────

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const subscription = currentSubscription

  const isExpired =
    subscription.status === 'expired' || subscription.status === 'cancelled'

  const isHardBlocked =
    isExpired && (subscription.daysExpired ?? 0) >= HARD_BLOCK_DAYS

  const [showExpiredModal, setShowExpiredModal] = useState(false)

  // Timestamp da última exibição (evita spam de cliques)
  const lastShownAt = useRef<number>(0)

  // ── Exibe o modal soft na montagem inicial ──────────────────────────────────
  useEffect(() => {
    if (isExpired && !isHardBlocked) {
      setShowExpiredModal(true)
      lastShownAt.current = Date.now()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Intercepta cliques globais para re-exibir o modal soft ─────────────────
  // O listener usa capture:true para disparar antes de qualquer handler filho,
  // garantindo que a ação original ainda seja executada normalmente.
  useEffect(() => {
    if (!isExpired || isHardBlocked) return

    const handleGlobalClick = () => {
      const now = Date.now()
      if (now - lastShownAt.current < MODAL_COOLDOWN_MS) return
      lastShownAt.current = now
      setShowExpiredModal(true)
    }

    document.addEventListener('click', handleGlobalClick, { capture: true })
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true })
    }
  }, [isExpired, isHardBlocked])

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        isExpired,
        isHardBlocked,
        showExpiredModal,
        setShowExpiredModal,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSubscription(): SubscriptionContextType {
  const ctx = useContext(SubscriptionContext)
  if (!ctx) {
    throw new Error('useSubscription deve ser usado dentro de <SubscriptionProvider>')
  }
  return ctx
}
