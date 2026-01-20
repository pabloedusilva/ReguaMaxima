import { useEffect, useState } from 'react'
import { useProfile } from '@/context/ProfileContext'
import { handleImageError } from '../utils/imageHelpers'

type Props = {
  size?: number // px
  className?: string
  src?: string // caminho fixo opcional para exibição estática
}

export default function ProfileAvatar({ size = 112, className = '', src }: Props) {
  const { selected } = useProfile()
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src ?? selected?.url)

  useEffect(() => {
    setCurrentSrc(src ?? selected?.url)
  }, [src, selected?.url])

  const fallback = (
    <img
      src="/assets/images/exemplo/profile13.jpg"
      alt="Imagem de perfil padrão"
      className={`rounded-full object-cover border-2 border-white ${className}`}
      style={{ width: size, height: size }}
      onError={handleImageError}
    />
  )

  if (!currentSrc) return fallback

  return (
    <img
      src={currentSrc}
      alt={selected?.label ?? 'Imagem de perfil da barbearia'}
      className={`rounded-full object-cover border-2 border-white ${className}`}
      style={{ width: size, height: size }}
      onError={(e) => {
        handleImageError(e)
        setCurrentSrc(undefined)
      }}
    />
  )
}
