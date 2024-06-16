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
      },
    },
  },
  plugins: [],
}