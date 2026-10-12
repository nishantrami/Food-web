/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c', // Rich Appetizing Orange
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          DEFAULT: '#ea580c',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15', // Vibrant Sunny Yellow
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          DEFAULT: '#facc15',
        },
        brand: {
          primary: '#ea580c',
          primaryHover: '#c2410c',
          secondary: '#facc15',
          secondaryHover: '#eab308',
          orange: '#ea580c',
          yellow: '#facc15',
          dark: '#1e293b',
          muted: '#64748b',
          light: '#fffbf5',
          surface: '#ffffff',
          red: '#ef4444',
          green: '#10b981',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 10px 25px rgba(234, 88, 12, 0.12)',
        'warm': '0 4px 20px rgba(234, 88, 12, 0.1)',
        'accent': '0 4px 20px rgba(250, 204, 21, 0.25)',
        'float': '0 15px 35px -10px rgba(15, 23, 42, 0.12)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
