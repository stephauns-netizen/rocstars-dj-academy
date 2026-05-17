import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#06060B',
          2: '#0B0B12',
          3: '#11111B',
          4: '#181826',
        },
        line: 'rgba(255,255,255,.07)',
        'line-bright': 'rgba(255,255,255,.16)',
        electric: '#0066FF',
        violet: '#A855F7',
        cyan: '#00E5FF',
        text: {
          DEFAULT: '#EDEDF2',
          mute: '#9D9DAE',
          faint: '#6B6B7A',
        },
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '10px',
        DEFAULT: '16px',
        lg: '24px',
        xl: '32px',
      },
      boxShadow: {
        glow: '0 0 60px rgba(168,85,247,.25)',
        card: '0 30px 80px rgba(0,0,0,.55)',
      },
      backgroundImage: {
        grad: 'linear-gradient(135deg,#00E5FF 0%,#0066FF 38%,#A855F7 100%)',
        'grad-text': 'linear-gradient(90deg,#00E5FF,#A855F7)',
        'grad-soft': 'linear-gradient(135deg,rgba(0,229,255,.10),rgba(168,85,247,.10))',
      },
      maxWidth: {
        container: '1240px',
      },
      keyframes: {
        pulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(0,229,255,.6)' },
          '70%': { boxShadow: '0 0 0 12px rgba(0,229,255,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0,229,255,0)' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
      animation: {
        pulse: 'pulse 2s infinite',
        ticker: 'ticker 38s linear infinite',
        scrollLine: 'scrollLine 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
