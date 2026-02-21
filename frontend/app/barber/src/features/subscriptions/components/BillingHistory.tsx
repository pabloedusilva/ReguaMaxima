import { BillingHistory as BillingHistoryType } from '@barber/types/subscriptions'
import { formatCurrency, formatDate } from '@barber/utils/format'

interface Props {
  history: BillingHistoryType[]
}

export default function BillingHistory({ history }: Props) {
  const getStatusBadge = (status: BillingHistoryType['status']) => {
    switch (status) {
      case 'paid':
        return <span className="badge badge-completed">Pago</span>
      case 'pending':
        return <span className="badge badge-pending">Pendente</span>
      case 'failed':
        return <span className="badge badge-cancelled">Falhou</span>
    }
  }

  if (history.length === 0) {
    return (
      <div className="card text-center py-12">
        <svg className="w-16 h-16 text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-text-dim">Nenhum histórico de pagamento disponível</p>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden p-0">
      {/* Mobile: cards simples, sem rolagem */}
      <div className="block md:hidden divide-y divide-border/60">
        {history.map((item) => (
          <div key={item.id} className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-text text-sm">
                  {formatDate(item.date)}
                </span>
                {getStatusBadge(item.status)}
              </div>
              <span className="font-semibold text-gold text-sm">
                {formatCurrency(item.amount)}
              </span>
            </div>

            <p className="text-text-dim text-xs leading-relaxed">
              {item.description}
            </p>

            <div className="flex items-center justify-between gap-3 mt-1">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-text-dim uppercase tracking-wide">Método</span>
                <span className="text-xs text-text-dim">
                  {item.paymentMethod}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {item.invoice && (
                  <button className="text-gold hover:text-gold-600 transition-colors text-[11px] font-medium inline-flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Comprovante
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: tabela organizada */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Método</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td className="whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-text">{formatDate(item.date)}</span>
                  </div>
                </td>
                <td>
                  <span className="text-text-dim">{item.description}</span>
                </td>
                <td className="whitespace-nowrap">
                  <span className="font-semibold text-gold">{formatCurrency(item.amount)}</span>
                </td>
                <td>
                  <span className="text-text-dim text-sm">{item.paymentMethod}</span>
                </td>
                <td>
                  {getStatusBadge(item.status)}
                </td>
                <td className="whitespace-nowrap">
                  {item.invoice && (
                    <button className="text-gold hover:text-gold-600 transition-colors text-sm font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
