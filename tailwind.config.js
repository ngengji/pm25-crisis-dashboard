/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#f0f4f9',
          100: '#d9e5f0',
          200: '#b3cce1',
          300: '#7aadc9',
          400: '#4d8db5',
          500: '#2e72a0',
          600: '#1e5a8a',
          700: '#1a4a74',
          800: '#163d60',
          900: '#0f2847',
          950: '#071520',
        },
        accent: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans Thai', 'Sarabun', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
