/* frontend/tailwind.config.js */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
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
