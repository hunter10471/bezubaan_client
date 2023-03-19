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
