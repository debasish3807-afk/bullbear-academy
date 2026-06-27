import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0B0F19',
          card: '#121826',
          elevated: '#1A2235',
          muted: '#1E293B',
        },
        gold: {
          DEFAULT: '#D4AF37',
          dim: 'rgba(212,175,55,0.14)',
          border: 'rgba(212,175,55,0.28)',
        },
        emerald: {
          DEFAULT: '#22C55E',
          dim: 'rgba(34,197,94,0.14)',
        },
        danger: {
          DEFAULT: '#EF4444',
          dim: 'rgba(239,68,68,0.14)',
        },
        info: {
          DEFAULT: '#38BDF8',
          dim: 'rgba(56,189,248,0.14)',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#B6C2D3',
          muted: '#8EA0B8',
        },
        line: {
          DEFAULT: 'rgba(248,250,252,0.08)',
          hover: 'rgba(212,175,55,0.28)',
        },
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        btn: '12px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16,1,0.3,1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)',
        ticker: 'ticker 28s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        ticker: { to: { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
}

export default config
