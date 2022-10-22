/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    extend: {
      backgroundImage: {
        backgroundSpace: "url('/background.png')"
      }
    },
  },
  plugins: [],
}
