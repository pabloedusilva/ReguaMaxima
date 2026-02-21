/**
 * Mock Bookings Data
 * 
 * Este arquivo contém dados de exemplo para agendamentos.
 * Será removido quando a integração com banco de dados for implementada.
 * 
 * TODO: Backend Integration
 * - Substituir por chamadas à API: GET /api/bookings
 * - Implementar CRUD completo de agendamentos
 */

export interface Booking {
  id: string
  clientName: string
  clientPhone: string
  professionalId: string
  professionalName: string
  serviceId: string
  serviceName: string
  date: string
  time: string
  price: number
  status: 'scheduled' | 'completed' | 'cancelled'
}

/**
 * Gera agendamentos de exemplo para hoje
 * @returns Array de agendamentos mockados
 */
export const getMockBookings = (): Booking[] => {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0] // YYYY-MM-DD

  return [
    {
      id: 'mock-booking-1',
      clientName: 'João Silva',
      clientPhone: '(11) 98765-4321',
      professionalId: 'barber-1',
      professionalName: 'Barbeiro Principal',
      serviceId: 'service-1',
      serviceName: 'Corte + Barba',
      date: todayStr,
      time: '14:30',
      price: 65.00,
      status: 'scheduled'
    },
    {
      id: 'mock-booking-2',
      clientName: 'Pedro Santos',
      clientPhone: '(11) 97654-3210',
      professionalId: 'barber-1',
      professionalName: 'Barbeiro Principal',
      serviceId: 'service-2',
      serviceName: 'Corte Social',
      date: todayStr,
      time: '15:00',
      price: 45.00,
      status: 'scheduled'
    },
    {
      id: 'mock-booking-3',
      clientName: 'Carlos Oliveira',
      clientPhone: '(11) 96543-2109',
      professionalId: 'barber-1',
      professionalName: 'Barbeiro Principal',
      serviceId: 'service-3',
      serviceName: 'Barba Completa',
      date: todayStr,
      time: '16:30',
      price: 35.00,
      status: 'scheduled'
    },
    {
      id: 'mock-booking-4',
      clientName: 'Rafael Costa',
      clientPhone: '(11) 95432-1098',
      professionalId: 'barber-1',
      professionalName: 'Barbeiro Principal',
      serviceId: 'service-1',
      serviceName: 'Corte + Barba',
      date: todayStr,
      time: '17:00',
      price: 65.00,
      status: 'scheduled'
    }
  ]
}

/**
 * Obtém um agendamento específico por ID
 * @param bookingId - ID do agendamento
 * @returns Agendamento encontrado ou undefined
 */
export const getMockBookingById = (bookingId: string): Booking | undefined => {
  return getMockBookings().find(booking => booking.id === bookingId)
}
