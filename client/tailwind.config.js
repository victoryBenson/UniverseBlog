/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      "blue1": "#3d55ef",
      "blue2": "#39f",
      "white": "#ffffff"
    },
    fontFamily:{
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
    },
  },
  plugins: [],
}

