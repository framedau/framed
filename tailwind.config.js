/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5EFE0',
        crimson: { light: '#4B0507', DEFAULT: '#4B0507', dark: '#4B0507' },
        ink: '#1A1A1A',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      letterSpacing: {
        widest: '0.2em',
        widest2: '0.15em',
        widest3: '0.12em',
      },
    },
  },
  plugins: [],
}
