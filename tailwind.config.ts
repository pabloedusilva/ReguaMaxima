import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './Client/src/**/*.{ts,tsx}',
    './Barber/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9953b',
          600: '#b3812f'
        },
        bg: {
          DEFAULT: '#0f0f10',
          soft: '#121212'
        },
        text: {
          DEFAULT: '#f7f7f5',
          dim: '#cfcfcb'
        },
        muted: '#8b8b86',
        surface: '#1c1c1c',
        border: '#2a2a2a',
        wa: {
          DEFAULT: '#25D366',
          700: '#1ebe57'
        }
      },
      boxShadow: {
        brand: '0 10px 30px rgba(0,0,0,.35)'
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Bebas Neue', 'Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config
