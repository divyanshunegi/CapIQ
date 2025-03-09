/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'glow': '0 0 30px rgba(114, 255, 133, 0.2), 0 0 60px rgba(73, 235, 246, 0.15)',
      },
      fontFamily: {
        'outfit': ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
