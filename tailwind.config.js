/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#050509",
        cardBg: "#0f1114",
        mutedText: "#9aa0a6",
        cyanAccent: "#00ffc8",
      }
    },
  },
  plugins: [],
}
