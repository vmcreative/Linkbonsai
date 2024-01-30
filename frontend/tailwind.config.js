/* frontend/tailwind.config.js */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sm': '680px',
      'md': '768px',
      'lg': '1044px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    borderRadius: {
      DEFAULT: '0.25rem',
      'sm': '0.125rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl' : '0.75rem',
      '2xl' : '1rem',
      '3xl' : '1.5rem',
      '4xl': '2rem',
      '5xl': '3rem',
      'full': '9999px'
    },
    extend: {
      scale: {
        '101': '1.01'
      },
      animation: {
        pop: 'pop .2s linear'
      },
      keyframes: {
        pop: {
          '50%': { transform: 'scale(1.025)' },
          '100%': { transform: 'scale(1.01)' },
        }
      }
    },
  },
  plugins: [],
};
