import { useEffect, useRef, useState } from 'react'

const INSTAGRAM_PATH =
  'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'

export default function InstagramSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [instagramActive, setInstagramActive] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const check = () =>
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!isTouchDevice) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInstagramActive(e.isIntersecting)),
      { threshold: 0.5, rootMargin: '0px' }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [isTouchDevice])

  const active = isTouchDevice ? instagramActive : isHovered

  return (
    <a
      ref={ref}
      href="https://instagram.com/reguamaxima_app"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
      className={`group inline-flex items-center justify-center gap-3 md:gap-5 mt-6 md:mt-8 mx-auto touch-manipulation transition-all duration-700 ease-in-out ${active ? 'gap-4 md:gap-6 scale-105' : ''}`}
    >
      {/* Icon */}
      <div className={`relative flex-shrink-0 transition-all duration-700 ease-in-out ${active ? 'scale-110' : ''}`}>
        <svg className="w-10 h-10 md:w-14 md:h-14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#f09433" />
              <stop offset="25%"  stopColor="#e6683c" />
              <stop offset="50%"  stopColor="#dc2743" />
              <stop offset="75%"  stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <path fill="white" d={INSTAGRAM_PATH} />
          <path
            fill="url(#instagram-gradient)"
            className={`instagram-gradient-fill transition-all duration-[800ms] ease-in-out ${active ? 'opacity-100' : 'opacity-0'}`}
            style={{
              clipPath: active ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
              transition: 'clip-path 0.8s ease-in-out, opacity 0.8s ease-in-out',
            }}
            d={INSTAGRAM_PATH}
          />
        </svg>
      </div>

      {/* Text */}
      <div className={`flex flex-col items-start transition-all duration-700 ease-in-out ${active ? 'translate-x-1 scale-105' : ''}`}>
        <span className={`text-white/70 text-[10px] md:text-sm font-light uppercase tracking-wide mb-0.5 transition-all duration-700 ease-in-out ${active ? 'text-white/90' : ''}`}>
          Segue ai
        </span>
        <span className={`text-white text-base md:text-xl font-normal tracking-normal transition-all duration-700 ease-in-out ${active ? 'tracking-wide' : ''}`}>
          @reguamaxima_app
        </span>
      </div>
    </a>
  )
}
