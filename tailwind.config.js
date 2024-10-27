/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-color': '#e6f0f2', // Defina sua cor personalizada aqui
      },
    },
  },
  plugins: [],
}