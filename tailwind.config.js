/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['"Roboto"', 'sans-serif'],
      },
      colors: {
        'gray-100': '#f0f4f8',
        'gray-300': '#E2E5EF',
        'dark-gray': '#333333',
        'davy-gray': '#4f4f4f',
        'navy-800': '#03045e',
        'deep-sky-blue': '#0077b6',
        'dark-blue': '#023e8a',
        'white': '#ffffff'
      },
      keyframes: {
        'beat-fade': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        'beat-fade': 'beat-fade 2s infinite',
      },
    },
  },
  plugins: [],
}