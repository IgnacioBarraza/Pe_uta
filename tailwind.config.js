/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-100': '#f0f4f8',
        'dark-gray': '#333333',
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