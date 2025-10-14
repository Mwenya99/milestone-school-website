/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./pages/**/*.html",
    "./scripts.js"
  ],
  theme: {
    extend: {
      colors: {
        turquoise: '#40E0D0',
        yellow: '#FFD700',
        teal: '#008080',
        black: '#000000',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          800: '#1F2937',
          900: '#111827',
        },
      },
      
theme: {
  container: {
    center: false,
    padding: '0',
    screens: {
      sm: '100%',
      md: '100%',
      lg: '100%',
      xl: '100%',
    },
  },
},

      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.25)',
        DEFAULT: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        lg: '5px 5px 10px rgba(0, 0, 0, 0.60)',
      },
      keyframes: {
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' }, // Changed to translateY for correct up/down motion
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        slideInLeft: 'slideInLeft 2s ease-out forwards',
        slideInRight: 'slideInRight 2s ease-out forwards',
        slideInUp: 'slideInUp 2s ease-out forwards', // Corrected typo 'fowards'
        fadeIn: 'fadeIn 2s ease-in forwards',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow') // This is the only line needed for the plugin to work
  ],
};

