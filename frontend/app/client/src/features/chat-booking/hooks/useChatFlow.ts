import { useCallback, useEffect, useRef, useState } from 'react'
import { professionals, services, generateTimeSlots } from '@data/availability'
import { mockBookings } from '@data/mockBookings'
import { mockShop } from '@data/mockShop'
import type {
  BookingData,
  BookingItem,
  ChatAction,
  ChatMessage,
  DateOption,
  FlowStep,
} from '../types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

let _id = 0
const nextId = () => `msg_${++_id}`

function getAvailableDates(): DateOption[] {
  const PT_DAY  = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
  const PT_MON  = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
  const dates: DateOption[] = []
  const today = new Date()
  let cursor = new Date(today)
  while (dates.length < 8) {
    const dow = cursor.getDay()
    if (dow !== 0) { // sem domingo
      const iso  = cursor.toISOString().split('T')[0]
      const same = cursor.toDateString() === today.toDateString()
      dates.push({
        iso,
        dayName:   PT_DAY[dow],
        dayNum:    String(cursor.getDate()),
        monthName: PT_MON[cursor.getMonth()],
        isToday:   same,
      })
    }
    cursor = new Date(cursor.getTime() + 86400000)
  }
  return dates
}

function formatDateLabel(iso: string): string {
  const PT_DAY = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
  const PT_MON = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return `${PT_DAY[date.getDay()]}, ${d} de ${PT_MON[m - 1]}`
}

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, '')
  if (d.length === 11) return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`
  if (d.length === 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`
  return raw
}

function typingDelay(text: string): number {
  return Math.max(700, Math.min(text.length * 22, 2000))
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useChatFlow(shopName: string) {
  const [messages,      setMessages]      = useState<ChatMessage[]>([])
  const [isTyping,      setIsTyping]      = useState(false)
  const [currentAction, setCurrentAction] = useState<ChatAction | null>(null)
  const [step,          setStep]          = useState<FlowStep>('WELCOME')
  const [showInput,     setShowInput]     = useState(false)
  const [inputPlaceholder, setInputPlaceholder] = useState('')
  const [booking,       setBooking]       = useState<Partial<BookingData>>({})

  // ── Bot message queue ────────────────────────────────────────────────────────
  type QItem = { text: string; action?: ChatAction }
  const queue    = useRef<QItem[]>([])
  const draining = useRef(false)
  const initialized = useRef(false)
  const pendingCancelId = useRef<string>('')

  const drain = useCallback(() => {
    if (draining.current || queue.current.length === 0) return
    draining.current = true

    const processNext = () => {
      const item = queue.current.shift()
      if (!item) { draining.current = false; setIsTyping(false); return }

      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => [...prev, { id: nextId(), from: 'bot', text: item.text, timestamp: new Date() }])
        if (item.action) setTimeout(() => setCurrentAction(item.action!), 80)
        if (queue.current.length > 0) {
          setTimeout(() => { setIsTyping(true); setTimeout(processNext, 300) }, 300)
        } else {
          draining.current = false
        }
      }, typingDelay(item.text))
    }
    processNext()
  }, [])

  const botSay = useCallback((items: QItem[]) => {
    queue.current.push(...items)
    drain()
  }, [drain])

  const userSay = useCallback((text: string) => {
    setCurrentAction(null)
    setShowInput(false)
    setMessages(prev => [...prev, { id: nextId(), from: 'user', text, timestamp: new Date() }])
  }, [])

  // ── WELCOME ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const saved = localStorage.getItem('clientName')
    if (saved) {
      // Already has name – skip straight to menu
      setBooking(b => ({ ...b, name: saved }))
      botSay([
        { text: `👋 Olá de volta, *${saved.split(' ')[0]}*! Bem-vindo novamente à *${shopName}*.` },
        { text: 'O que você deseja fazer hoje?', action: mainMenuAction() },
      ])
      setStep('MAIN_MENU')
    } else {
      botSay([
        { text: `👋 Olá! Bem-vindo à *${shopName}*! 💈` },
        { text: 'Sou o assistente de agendamentos. Para começar, qual é o seu *nome*?' },
      ])
      setStep('ASK_NAME')
      setTimeout(() => { setShowInput(true); setInputPlaceholder('Digite seu nome...') }, 3200)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ─── Actions builders ────────────────────────────────────────────────────────
  function mainMenuAction(): ChatAction {
    return {
      kind: 'buttons',
      options: [
        { label: 'Agendar horário',   value: 'book',     icon: 'calendar', color: 'gold' },
        { label: 'Meus agendamentos', value: 'bookings', icon: 'list',     color: 'default' },
      ],
    }
  }

  function professionalAction(): ChatAction {
    return {
      kind: 'professional-picker',
      professionals: professionals.map(p => ({ id: p.id, name: p.name, specialty: p.specialty, avatar: p.image })),
    }
  }

  function serviceAction(): ChatAction {
    return {
      kind: 'service-carousel',
      services: services.map(s => ({ id: s.id, name: s.name, price: s.price, duration: s.duration, image: s.image })),
    }
  }

  function dateAction(): ChatAction {
    return { kind: 'date-picker', dates: getAvailableDates() }
  }

  function timeAction(iso: string, duration: number): ChatAction {
    const slots = generateTimeSlots(iso, duration)
    return { kind: 'time-picker', slots }
  }

  function reviewAction(b: Partial<BookingData>): ChatAction {
    return {
      kind: 'review',
      booking: {
        professionalName: b.professionalName!,
        serviceName:      b.serviceName!,
        servicePrice:     b.servicePrice!,
        dateLabel:        b.dateLabel!,
        time:             b.time!,
        clientName:       b.name!,
        clientPhone:      formatPhone(b.phone!),
      },
    }
  }

  function bookingsAction(phone: string): ChatAction {
    const norm = phone.replace(/\D/g, '')
    const local: BookingItem[] = JSON.parse(localStorage.getItem('userBookings') || '[]')
    const all = [...local, ...mockBookings] as BookingItem[]
    const items = all.filter(b => String(b.clientPhone).replace(/\D/g, '') === norm)
    return { kind: 'bookings-list', bookings: items }
  }

  // ─── Handle Text Input ────────────────────────────────────────────────────────
  const handleTextSubmit = useCallback((text: string) => {
    if (!text.trim()) return
    const val = text.trim()

    if (step === 'ASK_NAME') {
      userSay(val)
      const firstName = val.split(' ')[0]
      localStorage.setItem('clientName', val)
      setBooking(b => ({ ...b, name: val }))
      botSay([
        { text: `Prazer, *${firstName}*! 😊 Fico feliz em te ajudar.` },
        { text: 'O que você deseja fazer hoje?', action: mainMenuAction() },
      ])
      setStep('MAIN_MENU')
      return
    }

    if (step === 'ASK_PHONE') {
      userSay(formatPhone(val))
      const updated = { ...booking, phone: val }
      setBooking(updated)
      localStorage.setItem('clientPhone', val)
      botSay([{ text: 'Perfeito! Veja o resumo do seu agendamento abaixo 👇', action: reviewAction(updated) }])
      setStep('REVIEW')
      return
    }

    if (step === 'ASK_PHONE_BOOKINGS') {
      userSay(formatPhone(val))
      const action = bookingsAction(val)
      const bookingsArr = (action as Extract<ChatAction, { kind: 'bookings-list' }>).bookings
      if (bookingsArr.length === 0) {
        botSay([{ text: 'Não encontrei agendamentos para esse número. 😕 Deseja fazer um novo agendamento?' }])
        setTimeout(() => setCurrentAction(mainMenuAction()), 1800)
        setStep('MAIN_MENU')
      } else {
        botSay([{ text: `Encontrei *${bookingsArr.length}* agendamento${bookingsArr.length > 1 ? 's' : ''} para você 📋`, action }])
        setStep('SHOW_BOOKINGS')
      }
      return
    }
  }, [step, booking, botSay, userSay])

  // ─── Handle Action Selection (buttons / cards) ────────────────────────────────
  const handleActionSelect = useCallback((value: string, label: string) => {
    if (step === 'MAIN_MENU') {
      userSay(label)
      if (value === 'book') {
        botSay([{ text: 'Ótimo! Vamos agendar. ✂️ Qual profissional você prefere?', action: professionalAction() }])
        setStep('CHOOSE_PROFESSIONAL')
      } else {
        const savedPhone = localStorage.getItem('clientPhone')
        if (savedPhone) {
          userSay(formatPhone(savedPhone))
          const action = bookingsAction(savedPhone)
          const bookingsArr = (action as Extract<ChatAction, { kind: 'bookings-list' }>).bookings
          if (bookingsArr.length === 0) {
            botSay([{ text: 'Não encontrei agendamentos para o seu número. Deseja fazer um novo agendamento?', action: mainMenuAction() }])
            setStep('MAIN_MENU')
          } else {
            botSay([{ text: `Aqui estão seus agendamentos 📋`, action }])
            setStep('SHOW_BOOKINGS')
          }
        } else {
          botSay([{ text: 'Para buscar seus agendamentos, informe seu *número de telefone* com DDD 📱' }])
          setStep('ASK_PHONE_BOOKINGS')
          setTimeout(() => { setShowInput(true); setInputPlaceholder('Ex: (31) 99999-9999') }, 1800)
        }
      }
      return
    }

    if (step === 'CHOOSE_PROFESSIONAL') {
      userSay(label)
      setBooking(b => ({ ...b, professionalId: value, professionalName: label }))
      botSay([{ text: `Ótimo! *${label}* é uma excelente escolha. 💈 Qual serviço você deseja?`, action: serviceAction() }])
      setStep('CHOOSE_SERVICE')
      return
    }

    if (step === 'CHOOSE_SERVICE') {
      const svc = services.find(s => s.id === value)
      if (!svc) return
      const priceFormatted = svc.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      userSay(`${svc.name} – ${priceFormatted}`)
      const updated = {
        ...booking,
        serviceId: value,
        serviceName: svc.name,
        servicePrice: svc.price,
        serviceDuration: svc.duration,
      }
      setBooking(updated)
      botSay([{ text: `Perfeito! *${svc.name}* anotado 📝 Agora escolha a *data* de preferência:`, action: dateAction() }])
      setStep('CHOOSE_DATE')
      return
    }

    if (step === 'CHOOSE_DATE') {
      const dateLabel = formatDateLabel(value)
      userSay(dateLabel)
      const updated = { ...booking, date: value, dateLabel }
      setBooking(updated)
      const dur = updated.serviceDuration ?? 45
      const slots = generateTimeSlots(value, dur)
      if (slots.length === 0) {
        botSay([{ text: 'Ops! Não há horários disponíveis nessa data. Escolha outra data 📅', action: dateAction() }])
        setStep('CHOOSE_DATE')
      } else {
        botSay([{ text: `Ótima escolha! 📅 Quais horários funcionam melhor para você?`, action: timeAction(value, dur) }])
        setStep('CHOOSE_TIME')
      }
      return
    }

    if (step === 'CHOOSE_TIME') {
      userSay(value)
      const updated = { ...booking, time: value }
      setBooking(updated)
      const savedPhone = localStorage.getItem('clientPhone')
      if (savedPhone) {
        const withPhone = { ...updated, phone: savedPhone }
        setBooking(withPhone)
        botSay([{ text: 'Quase lá! 🎉 Confira o resumo do seu agendamento:', action: reviewAction(withPhone) }])
        setStep('REVIEW')
      } else {
        botSay([{ text: 'Quase lá! 😊 Para confirmar, informe seu *número de telefone* com DDD:' }])
        setStep('ASK_PHONE')
        setTimeout(() => { setShowInput(true); setInputPlaceholder('Ex: (31) 99999-9999') }, 1800)
      }
      return
    }

    if (step === 'REVIEW') {
      if (value === 'confirm') {
        userSay('Confirmar agendamento')
        // Salva no localStorage
        const newBooking = {
          id: `bk_${Date.now()}`,
          professionalName: booking.professionalName!,
          serviceName:      booking.serviceName!,
          date:             booking.date!,
          time:             booking.time!,
          status:           'scheduled',
          clientName:       booking.name!,
          clientPhone:      booking.phone!,
          price:            booking.servicePrice!,
          createdAt:        new Date().toISOString(),
        }
        const saved: unknown[] = JSON.parse(localStorage.getItem('userBookings') || '[]')
        localStorage.setItem('userBookings', JSON.stringify([newBooking, ...saved]))
        localStorage.setItem('justBooked', '1')
        const firstName = (booking.name ?? '').split(' ')[0]
        botSay([
          { text: `✅ *Agendamento confirmado*, ${firstName}! 🎉` },
          {
            text: `Até ${booking.dateLabel} às ${booking.time}. Qualquer dúvida, nos chame no WhatsApp! 💈`,
            action: {
              kind: 'buttons',
              options: [
                { label: 'Novo agendamento',    value: 'restart',       icon: 'calendar-plus', color: 'gold' },
                { label: 'Ver agendamentos',    value: 'view-bookings', icon: 'list',          color: 'default' },
                { label: 'Falar no WhatsApp',   value: 'whatsapp',      icon: 'whatsapp',      color: 'green' },
              ],
            },
          },
        ])
        setStep('CONFIRMED')
      } else {
        userSay('Cancelar')
        botSay([{ text: 'Tudo bem! Agendamento cancelado. 😊 Posso te ajudar com mais alguma coisa?', action: mainMenuAction() }])
        setStep('MAIN_MENU')
      }
      return
    }

    if (step === 'CONFIRMED' || step === 'SHOW_BOOKINGS') {
      if (value === 'restart') {
        userSay('Novo agendamento')
        setBooking(b => ({ name: b.name, phone: b.phone }))
        botSay([{ text: 'Claro! Vamos agendar novamente. ✂️ Qual profissional você prefere?', action: professionalAction() }])
        setStep('CHOOSE_PROFESSIONAL')
      } else if (value === 'view-bookings') {
        userSay('Ver agendamentos')
        const savedPhone = booking.phone || localStorage.getItem('clientPhone') || ''
        const action = bookingsAction(savedPhone)
        botSay([{ text: 'Aqui estão seus agendamentos 📋', action }])
        setStep('SHOW_BOOKINGS')
      } else if (value === 'whatsapp') {
        window.open(`https://wa.me/${mockShop.phone}`, '_blank')
      } else if (value === 'new-booking') {
        userSay('Fazer novo agendamento')
        setBooking(b => ({ name: b.name, phone: b.phone }))
        botSay([{ text: 'Ótimo! Qual profissional você prefere?', action: professionalAction() }])
        setStep('CHOOSE_PROFESSIONAL')
      } else if (value.startsWith('cancel-booking:')) {
        const bookingId = value.replace('cancel-booking:', '')
        // Look up booking details for the confirmation message
        const stored: BookingItem[] = JSON.parse(localStorage.getItem('userBookings') || '[]')
        const target = stored.find(b => b.id === bookingId)
        pendingCancelId.current = bookingId
        userSay('Cancelar agendamento')
        const detail = target ? ` de *${target.serviceName}* às *${target.time}*` : ''
        botSay([{
          text: `Tem certeza que deseja cancelar o agendamento${detail}? ⚠️`,
          action: {
            kind: 'buttons',
            options: [
              { label: 'Sim, cancelar',  value: 'confirm-cancel', icon: 'x-circle', color: 'red' },
              { label: 'Não, manter',    value: 'deny-cancel',    icon: 'check',    color: 'default' },
            ],
          },
        }])
      } else if (value === 'confirm-cancel') {
        const bookingId = pendingCancelId.current
        const stored: BookingItem[] = JSON.parse(localStorage.getItem('userBookings') || '[]')
        const updated = stored.map(b => b.id === bookingId ? { ...b, status: 'cancelled' as const } : b)
        localStorage.setItem('userBookings', JSON.stringify(updated))
        pendingCancelId.current = ''
        userSay('Sim, cancelar')
        const savedPhone = booking.phone || localStorage.getItem('clientPhone') || ''
        const refreshed = bookingsAction(savedPhone)
        botSay([
          { text: 'Agendamento cancelado com sucesso. 👍' },
          { text: 'Aqui está a lista atualizada:', action: refreshed },
        ])
        setStep('SHOW_BOOKINGS')
      } else if (value === 'deny-cancel') {
        pendingCancelId.current = ''
        userSay('Não, manter')
        const savedPhone = booking.phone || localStorage.getItem('clientPhone') || ''
        const refreshed = bookingsAction(savedPhone)
        botSay([{ text: 'Tudo bem! Agendamento mantido. 😊', action: refreshed }])
        setStep('SHOW_BOOKINGS')
      }
      return
    }
  }, [step, booking, botSay, userSay])

  // ─── Go Back ──────────────────────────────────────────────────────────────────
  const handleGoBack = useCallback(() => {
    userSay('Voltar')
    setCurrentAction(null)
    setShowInput(false)

    if (step === 'CHOOSE_PROFESSIONAL') {
      botSay([{ text: 'Claro! O que você deseja fazer?', action: mainMenuAction() }])
      setStep('MAIN_MENU')
    } else if (step === 'CHOOSE_SERVICE') {
      setBooking(b => ({ ...b, professionalId: undefined, professionalName: undefined }))
      botSay([{ text: 'Qual profissional você prefere?', action: professionalAction() }])
      setStep('CHOOSE_PROFESSIONAL')
    } else if (step === 'CHOOSE_DATE') {
      setBooking(b => ({ ...b, serviceId: undefined, serviceName: undefined, servicePrice: undefined, serviceDuration: undefined }))
      botSay([{ text: 'Qual serviço você deseja?', action: serviceAction() }])
      setStep('CHOOSE_SERVICE')
    } else if (step === 'CHOOSE_TIME') {
      botSay([{ text: 'Escolha outra data 📅', action: dateAction() }])
      setStep('CHOOSE_DATE')
    } else if (step === 'REVIEW') {
      setBooking(b => ({ ...b, time: undefined, phone: undefined }))
      botSay([{ text: 'Tudo bem! Qual horário você prefere?', action: timeAction(booking.date!, booking.serviceDuration ?? 45) }])
      setStep('CHOOSE_TIME')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, botSay, userSay])

  return {
    messages,
    isTyping,
    currentAction,
    step,
    showInput,
    inputPlaceholder,
    handleTextSubmit,
    handleActionSelect,
    handleGoBack,
  }
}
