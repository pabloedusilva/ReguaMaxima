import { useNavigate } from 'react-router-dom'
import ChatBooking from '../features/chat-booking/ChatBooking'

export default function ChatBookingPage() {
  const navigate = useNavigate()
  return <ChatBooking onBack={() => navigate('/')} />
}
