/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a", // Deep black/charcoal
        surface: "#1a1a1a",
        primary: "#ffffff",
        accent: "#3b82f6", // Subtle blue accent or choose your own
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Ensure you import a nice font in index.css
      }
    },
  },
  plugins: [],
}