/**
 * ManagePage – Página de gerenciamento de conta (/gerenciar)
 * Exibe dados do usuário, assinatura ativa e histórico de pagamentos.
 * TODO: Substituir dados mockados por chamadas à API quando o backend for integrado.
 */

import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { useAuth } from '@/auth/context/AuthContext'
import {
  UserInfoCard,
  SubscriptionCard,
  NoSubscriptionCard,
  BillingHistory,
  ExpirationWarning,
} from '@/features/manage'
import { ManagedUser } from '@/features/manage/types'
import { currentSubscription, mockBillingHistory } from '@/data/mockSubscriptions'

export const ManagePage = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redireciona para login se não autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  if (!user) return null

  const subscription = currentSubscription

  const needsWarning =
    subscription.status !== 'none' &&
    subscription.status !== 'trial' &&
    subscription.status !== 'expired' &&
    subscription.status !== 'cancelled' &&
    subscription.daysRemaining <= 7

  // TODO: Remover quando o backend disponibilizar estes dados via API
  const managedUser: ManagedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    barbershopName: user.barbershopName,
  }

  const handleChangePassword = () => {
    // TODO: Implementar modal / fluxo de mudança de senha
    alert('Funcionalidade disponível em breve.')
  }

  const handleCancelSubscription = () => {
    // TODO: Implementar modal e chamada à API de cancelamento
    alert('Cancelamento disponível em breve.')
  }

  const handleUpgrade = () => {
    navigate('/precos')
  }

  const handleSubscribe = () => {
    navigate('/precos')
  }

  return (
    <div className="min-h-screen bg-bg">
      <Header />

      <main className="max-w-[920px] mx-auto px-4 py-10 pb-20">
        {/* ── Título da página ── */}
        <div className="mb-8">
          <h1 className="font-display text-4xl sm:text-5xl text-gold mb-2 tracking-wide">
            Gerenciar Conta
          </h1>
          <p className="text-text-dim text-sm sm:text-base">
            Gerencie seus dados, assinatura e pagamentos
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* ── Dados do usuário ── */}
          <UserInfoCard user={managedUser} onChangePassword={handleChangePassword} />

          {/* ── Botão Abrir App ── */}
          {/* TODO: Substituir href pela URL real do dashboard quando disponível */}
          <Link
            to="/app/dashboard"
            className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl border border-gold/40 bg-gold/5 text-gold hover:bg-gold hover:text-bg font-semibold text-sm transition-all duration-200 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Abrir App
          </Link>

          {/* ── Assinatura ── */}
          <section>
            <h2 className="text-2xl font-semibold text-text mb-4">Minha Assinatura</h2>

            {needsWarning && <div className="mb-4"><ExpirationWarning subscription={subscription} /></div>}

            {subscription.status === 'none' ? (
              <NoSubscriptionCard onSubscribe={handleSubscribe} />
            ) : (
              <SubscriptionCard
                subscription={subscription}
                onCancelSubscription={handleCancelSubscription}
                onUpgrade={handleUpgrade}
              />
            )}
          </section>

          {/* ── Histórico de pagamentos ── */}
          <section>
            <h2 className="text-2xl font-semibold text-text mb-4">Histórico de Pagamentos</h2>
            <BillingHistory history={mockBillingHistory} />
          </section>
        </div>
      </main>
    </div>
  )
}
