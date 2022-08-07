/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-700-rgba-50': 'rgba(55, 65, 81, 0.5)',
      },
    },
  },
  plugins: [],
}
