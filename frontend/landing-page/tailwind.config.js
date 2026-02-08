/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9953B',
          600: '#B3812F',
        },
        bg: {
          DEFAULT: '#0F0F10',
          soft: '#121212',
        },
        text: {
          DEFAULT: '#F7F7F5',
          dim: '#CFCFCB',
        },
        muted: '#8B8B86',
        surface: '#1C1C1C',
        border: '#2A2A2A',
        wa: {
          DEFAULT: '#25D366',
          700: '#1EBE57',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
      },
      boxShadow: {
        custom: '0 10px 30px rgba(0,0,0,.35)',
      },
      animation: {
        'bubble-float': 'bubbleFloat 8s ease-in-out infinite',
        'stair-in': 'stairIn 0.5s ease forwards',
        'value-pulse': 'valuePulse 3.8s ease-in-out infinite',
        'value-shine': 'valueShine 4.8s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'bounce-slow': 'bounceSlow 3s ease-in-out infinite',
      },
      keyframes: {
        bubbleFloat: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-6px) translateX(2px)' },
          '100%': { transform: 'translateY(0) translateX(0)' },
        },
        stairIn: {
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        valuePulse: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '35%': { transform: 'scale(1.015)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.98' },
          '65%': { transform: 'scale(1.015)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        valueShine: {
          '0%, 70%': { opacity: '0', transform: 'translateX(-25%)' },
          '78%': { opacity: '1', transform: 'translateX(-5%)' },
          '100%': { opacity: '0', transform: 'translateX(25%)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.95' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}
