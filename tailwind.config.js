/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xm': '12px',
        'sm': '14px',
        'base': '16px',
        'xl': '20px',
      },
      colors: {
        primary: '#0f172f',
        secondary: '#FFFFFF',
        tertiary: '#D6D6D6',
      },
    },
  },
  plugins: [],
}
