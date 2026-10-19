/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 6s ease infinite',
      },
      colors: {
        // Paleta "movimento": laranja (energia/esporte), violeta (arte), verde (comunidade)
        brand: {
          50: '#fff7ed',
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
        ink: {
          50: '#f7f7f5',
          100: '#efeee9',
          200: '#deddd5',
          300: '#bebcb0',
          400: '#8f8d82',
          500: '#6b695f',
          600: '#4d4b44',
          700: '#35342f',
          800: '#211f1c',
          900: '#161513',
          950: '#0d0c0b',
        },
      },
    },
  },
  plugins: [],
};
