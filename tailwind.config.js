/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        'brand-purple': '#8b76ad',
        'brand-purple-light': '#f3f0f7',
        'brand-pink': '#f8d7da',
        'brand-green': '#d4edda',
        'brand-yellow': '#fff3cd',
      }
    },
  },
  plugins: [],
}
