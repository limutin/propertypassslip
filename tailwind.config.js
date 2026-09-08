/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          DEFAULT: '#0A2A5E',
          dark: '#1B2A4A',
        },
      },
    },
  },
  plugins: [],
}
