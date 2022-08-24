/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'alert-bg-green': '#d4edda',
        'alert-border-green': '#c3e6cb',
        'alert-text-green': '#155724',
      },
    },
  },
  plugins: [],
}
