/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#40B37C',
        text: '#1A1B16',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        sans: ['Roboto', 'sans-serif'],
        central: ['Caveat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
