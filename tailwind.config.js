// tailwind.config.js
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#1a5f7a',
          'light': '#2a7f9a',
          'dark': '#0a3f5a',
        },
        'secondary': {
          DEFAULT: '#f9a826',
          'light': '#ffc046',
          'dark': '#d48806',
        },
        'accent': '#4fc3f7',
        'teal': {
          DEFAULT: '#14b8a6',
          'light': '#2dd4bf',
          'dark': '#0d9488',
        },
        'dark': '#1e293b',
        'light': '#f8fafc'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'school-pattern': "url('/assets/pattern.svg')",
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'hard': '0 20px 40px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 20px rgba(79, 195, 247, 0.3)',
        'glow-primary': '0 0 30px rgba(26, 95, 122, 0.4)',
        'glow-secondary': '0 0 30px rgba(249, 168, 38, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      }
    }
  },
  plugins: [],
}