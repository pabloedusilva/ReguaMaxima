import { Booking } from '../../types/bookings'
import Card from '../ui/Card'

interface NextBookingHighlightProps {
  booking: Booking
}

export default function NextBookingHighlight({ booking }: NextBookingHighlightProps) {
  const dateObj = new Date(booking.date + 'T' + booking.time)
  const formattedDate = dateObj.toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    day: '2-digit', 
    month: 'long',
    year: 'numeric'
  })

  return (
    <Card className="border-gold/30 bg-gradient-to-br from-gold/5 to-transparent">
      <div className="grid gap-3 w-full min-w-0">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gold animate-pulse flex-shrink-0" />
          <h3 className="text-gold font-semibold text-sm uppercase tracking-wide truncate">Próximo agendamento</h3>
        </div>
        
        <div className="grid gap-2 w-full min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl md:text-3xl font-display text-text">{booking.time}</span>
            <span className="text-text/70 text-sm capitalize">{formattedDate}</span>
          </div>
          
          <div className="grid gap-1 text-sm w-full min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-text/70 flex-shrink-0">Profissional:</span>
              <span className="text-text font-medium text-right truncate min-w-0">{booking.professionalName}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-text/70 flex-shrink-0">Serviço:</span>
              <span className="text-text font-medium text-right truncate min-w-0">{booking.serviceName}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-text/70 flex-shrink-0">Valor:</span>
              <span className="text-gold font-semibold text-right">R$ {booking.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
