/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
],
  theme: {
    fontFamily: {
      'futura':['Futura']
    },
    screens: {
      'xs': '500px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1500px',
      '2xl': '1700px',
    },
      extend: {},
  },
  plugins: [],
}

