/**
 * UserInfoCard – Exibe os dados da conta do usuário (barbershop / perfil)
 * TODO: Conectar ao backend quando disponível.
 */

import type { ReactNode } from 'react'
import { ManagedUser } from '@/features/manage/types'

interface Props {
  user: ManagedUser
  onChangePassword?: () => void
}

export default function UserInfoCard({ user, onChangePassword }: Props) {
  return (
    <div className="bg-gradient-to-br from-[#141414] to-[#0d0d0d] border border-border rounded-2xl p-6 shadow-custom">
      {/* Header do card */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text leading-tight">Dados da Conta</h2>
          <p className="text-text-dim text-xs">Informações do seu perfil</p>
        </div>
      </div>

      {/* Campos */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Field icon={<BarbershopIcon />} label="Nome da barbearia" value={user.barbershopName} />
        <Field icon={<UserIcon />}       label="Nome do responsável"  value={user.name} />
        <Field icon={<EmailIcon />}      label="E-mail"               value={user.email} />
        <Field icon={<PhoneIcon />}      label="Telefone"             value={user.phone} />
      </div>

      {/* Botão mudar senha */}
      <button
        onClick={onChangePassword}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface/50 text-text-dim hover:text-text hover:border-gold/40 transition-all duration-200 text-sm font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
        Mudar senha
      </button>
    </div>
  )
}

// ─── Componentes internos ─────────────────────────────────────────────────────

interface FieldProps {
  icon: ReactNode
  label: string
  value: string
}

function Field({ icon, label, value }: FieldProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-surface/40 border border-border/60">
      <span className="mt-0.5 flex-shrink-0 text-gold">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] text-text-dim uppercase tracking-wide leading-none mb-1">{label}</p>
        <p className="text-text text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  )
}

function BarbershopIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}
