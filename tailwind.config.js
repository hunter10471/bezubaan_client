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
        heading: '#127357',
        primary:'#40B37C',
        secondary:'#1ED96F',
        text: '#1b1b1b',
        subheading:'#010B40'
      },
      fontFamily: {
        heading_regular: ['Poppins-Regular', 'sans-serif'],
        heading_semi_bold: ['Poppins-SemiBold', 'sans-serif'],
        heading_bold: ['Poppins-Bold', 'sans-serif'],
        central_regular: ['Caveat-Regular', 'sans-serif'],
        central_semi_bold: ['Caveat-SemiBold', 'sans-serif'],
        central_bold: ['Caveat-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
