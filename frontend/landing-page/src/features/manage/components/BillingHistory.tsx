/**
 * BillingHistory – Histórico de pagamentos (espelha o da pasta barber)
 * TODO: Conectar ao backend quando disponível.
 */

import { BillingRecord } from '@/features/manage/types'
import { formatCurrency, formatDate } from '@/features/manage/utils/format'

interface Props {
  history: BillingRecord[]
}

const STATUS_STYLES = {
  paid:    { bg: 'bg-green-500/15 border-green-500/30', text: 'text-green-400', label: 'Pago' },
  pending: { bg: 'bg-yellow-500/15 border-yellow-500/30', text: 'text-yellow-400', label: 'Pendente' },
  failed:  { bg: 'bg-red-500/15 border-red-500/30', text: 'text-red-400', label: 'Falhou' },
}

function StatusBadge({ status }: { status: BillingRecord['status'] }) {
  const s = STATUS_STYLES[status]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  )
}

export default function BillingHistory({ history }: Props) {
  if (history.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#141414] to-[#0d0d0d] border border-border rounded-2xl p-10 shadow-custom text-center">
        <svg className="w-14 h-14 text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-text-dim text-sm">Nenhum histórico de pagamento disponível</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-[#141414] to-[#0d0d0d] border border-border rounded-2xl shadow-custom overflow-hidden">
      {/* Mobile: cards */}
      <div className="block md:hidden divide-y divide-border/60">
        {history.map((item) => (
          <div key={item.id} className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-text-dim flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-text">{formatDate(item.date)}</span>
                <StatusBadge status={item.status} />
              </div>
              <span className="text-sm font-semibold text-gold whitespace-nowrap">
                {formatCurrency(item.amount)}
              </span>
            </div>

            <p className="text-text-dim text-xs leading-relaxed">{item.description}</p>

            <div className="flex items-center justify-between gap-3 mt-1">
              <div>
                <p className="text-[10px] text-text-dim uppercase tracking-wide">Método</p>
                <p className="text-xs text-text-dim mt-0.5">{item.paymentMethod}</p>
              </div>
              {item.invoice && (
                <button className="inline-flex items-center gap-1 text-gold hover:text-gold-600 text-[11px] font-medium transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Comprovante
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: tabela */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left">
              <th className="px-6 py-4 text-xs font-semibold text-text-dim uppercase tracking-wide whitespace-nowrap">Data</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-dim uppercase tracking-wide">Descrição</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-dim uppercase tracking-wide whitespace-nowrap">Valor</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-dim uppercase tracking-wide">Método</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-dim uppercase tracking-wide">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-surface/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-text-dim flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-text">{formatDate(item.date)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-dim max-w-[280px] truncate">{item.description}</td>
                <td className="px-6 py-4 font-semibold text-gold whitespace-nowrap">{formatCurrency(item.amount)}</td>
                <td className="px-6 py-4 text-text-dim whitespace-nowrap">{item.paymentMethod}</td>
                <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                <td className="px-6 py-4 text-right">
                  {item.invoice && (
                    <button className="inline-flex items-center gap-1 text-gold hover:text-gold-600 text-xs font-medium transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Comprovante
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
