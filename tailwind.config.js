/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'earthy-dark': '#5C4033',
        'earthy-brown': '#8B6F47',
        'earthy-light': '#D2B48C',
        'earthy-beige': '#F5F1E8',
        'earthy-cream': '#FFFCF7',
        'earthy-green': '#7BA428',
        'earthy-sage': '#9CAF88',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
