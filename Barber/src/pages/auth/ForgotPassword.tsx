import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '@barber/components/ui/Input'
import Button from '@barber/components/ui/Button'

type Step = 'phone' | 'code' | 'newPassword'

const CODE_LENGTH = 6

const FIRST_RESEND_DELAY = 60 // 60 segundos primeira vez
const SUBSEQUENT_RESEND_DELAY = 120 // 120 segundos depois
const PASSWORD_FORM_TIMEOUT = 15 * 60 * 1000 // 15 minutos em ms

export default function ForgotPassword() {
  const navigate = useNavigate()
  
  // Estado do fluxo
  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Refs para os inputs de código
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([])
  
  // Estado do timer
  const [resendCountdown, setResendCountdown] = useState(0)
  const [resendCount, setResendCount] = useState(0)
  
  // Estado do formulário de senha
  const [passwordFormStartTime, setPasswordFormStartTime] = useState<number | null>(null)
  const [passwordFormTimeLeft, setPasswordFormTimeLeft] = useState<number | null>(null)
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false)
  
  // Errors
  const [error, setError] = useState('')

  // Formatar telefone brasileiro
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
    }
    return value
  }

  // Timer para reenviar código
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCountdown])

  // Timer para expiração do formulário de senha (15 min)
  useEffect(() => {
    if (step === 'newPassword' && passwordFormStartTime) {
      const interval = setInterval(() => {
        const elapsed = Date.now() - passwordFormStartTime
        const remaining = PASSWORD_FORM_TIMEOUT - elapsed
        
        if (remaining <= 0) {
          // Expirou, volta ao início
          setError('Tempo expirado. Por favor, inicie o processo novamente.')
          setTimeout(() => {
            setStep('phone')
            setPhone('')
            setCode('')
            setPasswordFormStartTime(null)
            setError('')
          }, 3000)
        } else {
          setPasswordFormTimeLeft(remaining)
        }
      }, 1000)
      
      return () => clearInterval(interval)
    }
  }, [step, passwordFormStartTime])

  // Enviar SMS
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (phone.replace(/\D/g, '').length !== 11) {
      setError('Digite um número de telefone válido')
      return
    }

    setIsLoading(true)
    
    // Simular envio de SMS
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setStep('code')
    
    // Define timer inicial (primeira vez = 60s)
    const delay = resendCount === 0 ? FIRST_RESEND_DELAY : SUBSEQUENT_RESEND_DELAY
    setResendCountdown(delay)
    setResendCount(prev => prev + 1)
  }

  // Reenviar código
  const handleResendCode = async () => {
    setError('')
    setIsLoading(true)
    
    // Simular reenvio
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    
    // Próximo reenvio = 120s
    setResendCountdown(SUBSEQUENT_RESEND_DELAY)
    setResendCount(prev => prev + 1)
  }

  // Verificar código
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const codeString = code.join('')
    if (codeString.length < CODE_LENGTH) {
      setError('Digite o código completo')
      return
    }

    setIsLoading(true)
    
    // Simular verificação (aceita qualquer código)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setStep('newPassword')
    setPasswordFormStartTime(Date.now())
    setPasswordFormTimeLeft(PASSWORD_FORM_TIMEOUT)
  }
  
  // Manipular input de código individual
  const handleCodeChange = (index: number, value: string) => {
    // Permite apenas números
    if (value && !/^\d$/.test(value)) return
    
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    
    // Move para o próximo input automaticamente
    if (value && index < CODE_LENGTH - 1) {
      codeInputRefs.current[index + 1]?.focus()
    }
  }
  
  // Manipular backspace no código
  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus()
    }
  }
  
  // Manipular paste no código
  const handleCodePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH)
    const newCode = [...code]
    
    pastedData.split('').forEach((char, index) => {
      if (index < CODE_LENGTH) {
        newCode[index] = char
      }
    })
    
    setCode(newCode)
    
    // Foca no próximo input vazio ou no último
    const nextEmptyIndex = newCode.findIndex(c => !c)
    const focusIndex = nextEmptyIndex === -1 ? CODE_LENGTH - 1 : nextEmptyIndex
    codeInputRefs.current[focusIndex]?.focus()
  }

  // Atualizar senha
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (newPassword.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres')
      return
    }
    
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setIsLoading(true)
    
    // Simular atualização
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    
    // Sucesso! Redireciona para login
    navigate('/login', { 
      state: { message: 'Senha atualizada com sucesso! Faça login com sua nova senha.' }
    })
  }

  // Abrir WhatsApp de suporte
  const handleOpenWhatsApp = () => {
    const supportNumber = '5511999999999' // Número de suporte (configurável)
    const message = encodeURIComponent('Olá! Não recebi o código de recuperação de senha.')
    window.open(`https://wa.me/${supportNumber}?text=${message}`, '_blank')
  }

  // Formatar tempo restante (mm:ss)
  const formatTimeLeft = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Voltar para login
  const handleBackToLogin = () => {
    navigate('/login')
  }

  // Renderização do título baseado na etapa
  const getTitle = () => {
    switch (step) {
      case 'phone':
        return 'Recuperar Senha'
      case 'code':
        return 'Verificar Código'
      case 'newPassword':
        return 'Nova Senha'
    }
  }

  const getSubtitle = () => {
    switch (step) {
      case 'phone':
        return 'Digite seu telefone para receber o código de verificação'
      case 'code':
        return (
          <>
            Enviamos um código SMS para{' '}
            <span className="font-bold text-text">{phone}</span>
          </>
        )
      case 'newPassword':
        return 'Digite sua nova senha'
    }
  }

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        
        {/* Card do Formulário */}
        <div className="card hover-lift animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl sm:text-4xl text-gold mb-2 tracking-wide">
              {getTitle()}
            </h1>
            <p className="text-text-dim text-sm">
              {getSubtitle()}
            </p>
          </div>
            {/* Etapa 1: Telefone */}
            {step === 'phone' && (
              <form onSubmit={handleSendCode} className="grid gap-5">
                <Input
                  label="Telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  error={error}
                  required
                  autoFocus
                />

                <Button type="submit" className="w-full" loading={isLoading}>
                  Enviar Código
                </Button>
              </form>
            )}

            {/* Etapa 2: Código SMS */}
            {step === 'code' && (
              <form onSubmit={handleVerifyCode} className="grid gap-6">
                {/* Inputs de código individuais */}
                <div>
                  <label className="block text-sm text-text/90 mb-3 text-center">
                    Código de Verificação
                  </label>
                  <div className="flex gap-2 justify-center mb-1">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (codeInputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(index, e)}
                        onPaste={index === 0 ? handleCodePaste : undefined}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold bg-[#131313] border border-border text-gold rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold transition-all"
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs text-center mt-2">{error}</p>
                  )}
                </div>
                
                <Button type="submit" className="w-full" loading={isLoading}>
                  Verificar Código
                </Button>

                {/* Opções adicionais */}
                <div className="flex flex-col gap-3 text-sm">
                  {/* Reenviar código */}
                  {resendCountdown > 0 ? (
                    <p className="text-muted text-center">
                      Reenviar código em{' '}
                      <span className="text-gold font-semibold">{resendCountdown}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={isLoading}
                      className="text-gold hover:text-gold-600 transition-colors text-center disabled:opacity-50 font-medium"
                    >
                      Reenviar código
                    </button>
                  )}

                  {/* Divisor */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-surface px-2 text-muted">ou</span>
                    </div>
                  </div>

                  {/* Botão WhatsApp */}
                  <button
                    type="button"
                    onClick={handleOpenWhatsApp}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-xl transition-colors border border-[#25D366]/30"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span className="font-medium">Não recebeu o código?</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep('phone')
                      setCode(Array(CODE_LENGTH).fill(''))
                      setError('')
                    }}
                    className="text-text-dim hover:text-text transition-colors text-center"
                  >
                    Alterar número de telefone
                  </button>
                </div>
              </form>
            )}

            {/* Etapa 3: Nova Senha */}
            {step === 'newPassword' && (
              <form onSubmit={handleUpdatePassword} className="grid gap-6">
                {/* Timer de expiração */}
                {passwordFormTimeLeft !== null && (
                  <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-gold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium">
                        Tempo restante: <span className="font-bold">{formatTimeLeft(passwordFormTimeLeft)}</span>
                      </span>
                    </div>
                  </div>
                )}

                <div className="relative">
                  <Input
                    label="Nova Senha"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 6 caracteres"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[34px] text-text-dim hover:text-text transition-colors"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    label="Confirmar Nova Senha"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Digite a senha novamente"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={error}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[34px] text-text-dim hover:text-text transition-colors"
                    aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                <Button type="submit" className="w-full mt-2" loading={isLoading}>
                  Atualizar Senha
                </Button>
              </form>
            )}
          </div>

          {/* Link de voltar ao login */}
          {step === 'phone' && (
            <div className="mt-6 text-center">
              <button
                onClick={handleBackToLogin}
                className="text-sm text-text-dim hover:text-text transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar para o login
              </button>
            </div>
          )}
        </div>
      </div>
  )
}
