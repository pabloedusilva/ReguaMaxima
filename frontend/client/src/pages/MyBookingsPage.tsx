import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMyBookings } from '@context/MyBookingsContext'
import { fetchUserBookings } from '@data/mockBookings'
import NextBookingHighlight from '@components/bookings/NextBookingHighlight'
import FilterTabs from '@components/bookings/FilterTabs'
import BookingCard from '@components/bookings/BookingCard'
import CancelConfirmModal from '@components/bookings/CancelConfirmModal'
import Button from '@components/ui/Button'
import type { Booking } from '@/types/bookings'

export default function MyBookingsPage() {
  const navigate = useNavigate()
  const { userPhone, filter, setFilter, bookings, setBookings, isLoading, setIsLoading } = useMyBookings()
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null)

  useEffect(() => {
    if (!userPhone) return

    // Fetch bookings from API (currently mock)
    const loadBookings = async () => {
      setIsLoading(true)
      try {
        const data = await fetchUserBookings(userPhone)
        setBookings(data.bookings)
      } catch (error) {
        console.error('Failed to load bookings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBookings()
  }, [userPhone, setBookings, setIsLoading])

  const handleCancelBooking = async (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId)
    if (booking) {
      setBookingToCancel(booking)
    }
  }

  const confirmCancelBooking = async () => {
    if (!bookingToCancel) return

    // TODO: Replace with actual API call when backend is ready
    // DELETE /api/bookings/{bookingToCancel.id} or PATCH /api/bookings/{bookingToCancel.id} with status: 'cancelled'
    
    // Update localStorage
    const localBookings = JSON.parse(localStorage.getItem('userBookings') || '[]')
    const updatedLocalBookings = localBookings.map((b: any) => 
      b.id === bookingToCancel.id ? { ...b, status: 'cancelled' } : b
    )
    localStorage.setItem('userBookings', JSON.stringify(updatedLocalBookings))
    
    // Update state
    const updatedBookings = bookings.map(b => 
      b.id === bookingToCancel.id ? { ...b, status: 'cancelled' as const } : b
    )
    setBookings(updatedBookings)
    setBookingToCancel(null)
  }

  const filteredBookings = useMemo(() => {
    if (filter.status === 'all') return bookings
    return bookings.filter(b => b.status === filter.status)
  }, [bookings, filter])

  const nextBooking = useMemo(() => {
    const scheduled = bookings
      .filter(b => b.status === 'scheduled')
      .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime())
    return scheduled.length > 0 ? scheduled[0] : null
  }, [bookings])

  if (isLoading) {
    return (
      <div className="grid gap-8 md:gap-10">
        <div className="text-center">
          <h1 className="font-display text-gold text-4xl md:text-5xl">Meus Agendamentos</h1>
          <p className="text-text/70 mt-2">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:gap-10">
      <div className="text-center">
        <h1 className="font-display text-gold text-4xl md:text-5xl">Meus Agendamentos</h1>
        <p className="text-text/70 mt-2">Visualize e gerencie todos os seus agendamentos</p>
      </div>

      <div className="grid gap-6 md:gap-7">
        {nextBooking && (
          <div className="grid gap-2">
            <h2 className="text-text/90 font-semibold text-lg">Em destaque</h2>
            <NextBookingHighlight booking={nextBooking} />
          </div>
        )}

        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-text/90 font-semibold text-lg">Histórico</h2>
            <FilterTabs currentFilter={filter} onFilterChange={setFilter} />
          </div>

          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-text/50 text-lg mb-4">
                {filter.status === 'all' 
                  ? 'Nenhum agendamento encontrado'
                  : `Nenhum agendamento ${filter.status === 'scheduled' ? 'agendado' : filter.status === 'completed' ? 'concluído' : 'cancelado'}`
                }
              </div>
              <Button variant="primary" onClick={() => navigate('/agendar')}>
                Fazer novo agendamento
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            Voltar ao início
          </Button>
        </div>
      </div>

      {bookingToCancel && (
        <CancelConfirmModal
          onConfirm={confirmCancelBooking}
          onCancel={() => setBookingToCancel(null)}
          bookingTime={bookingToCancel.time}
          bookingDate={bookingToCancel.date}
        />
      )}
    </div>
  )
}
