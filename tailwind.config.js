/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#000B33',
          800: '#0B3B91',
          700: '#1E429F',
          600: '#3B5E9B',
          500: '#4C6DA6',
        },
        slate: {
          grey: '#6F7C86',
          muted: '#6E88B5',
          ice: '#F2F7FF',
          border: '#C0D7FF',
        },
        peach: '#FFEDE0',
      },
    },
  },
  plugins: [],
}
