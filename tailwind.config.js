/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ghoul-red': '#8b0000',
        'ccg-blue': '#003366',
        'dark-bg': '#0a0a0a',
        'dark-card': '#1a1a1a',
      },
      backgroundImage: {
        'grunge': "url('https://www.transparenttextures.com/patterns/dark-matter.png')",
      }
    },
  },
  plugins: [],
}
