// ─── Flow Steps ──────────────────────────────────────────────────────────────

export type FlowStep =
  | 'WELCOME'
  | 'ASK_NAME'
  | 'MAIN_MENU'
  | 'CHOOSE_PROFESSIONAL'
  | 'CHOOSE_SERVICE'
  | 'CHOOSE_DATE'
  | 'CHOOSE_TIME'
  | 'ASK_PHONE'
  | 'REVIEW'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'ASK_PHONE_BOOKINGS'
  | 'SHOW_BOOKINGS'

// ─── Chat Messages ────────────────────────────────────────────────────────────

export type MessageFrom = 'bot' | 'user'

export interface ChatMessage {
  id: string
  from: MessageFrom
  text: string
  timestamp: Date
}

// ─── Button Options ───────────────────────────────────────────────────────────

export type ButtonColor = 'default' | 'gold' | 'green' | 'red'

export interface ButtonOption {
  label: string
  value: string
  icon?: string
  color?: ButtonColor
  description?: string
}

// ─── Action Payloads ──────────────────────────────────────────────────────────

export interface ServiceOption {
  id: string
  name: string
  price: number
  duration: number
  image: string
}

export interface ProfessionalOption {
  id: string
  name: string
  specialty?: string
  avatar?: string
}

export interface DateOption {
  iso: string       // YYYY-MM-DD
  dayName: string   // "Seg"
  dayNum: string    // "20"
  monthName: string // "fev"
  isToday: boolean
}

export interface ReviewBooking {
  professionalName: string
  serviceName: string
  servicePrice: number
  dateLabel: string
  time: string
  clientName: string
  clientPhone: string
}

export interface BookingItem {
  id: string
  professionalName: string
  serviceName: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  price: number
  clientPhone?: string
}

// ─── Chat Actions (interactive elements rendered below messages) ───────────────

export type ChatAction =
  | { kind: 'buttons';            options: ButtonOption[] }
  | { kind: 'professional-picker'; professionals: ProfessionalOption[] }
  | { kind: 'service-carousel';   services: ServiceOption[] }
  | { kind: 'date-picker';        dates: DateOption[] }
  | { kind: 'time-picker';        slots: string[] }
  | { kind: 'review';             booking: ReviewBooking }
  | { kind: 'bookings-list';      bookings: BookingItem[] }

// ─── Accumulated Booking Data ─────────────────────────────────────────────────

export interface BookingData {
  name: string
  phone: string
  professionalId: string
  professionalName: string
  serviceId: string
  serviceName: string
  servicePrice: number
  serviceDuration: number
  date: string      // YYYY-MM-DD
  dateLabel: string // "Seg, 20 fev"
  time: string      // "HH:mm"
}
