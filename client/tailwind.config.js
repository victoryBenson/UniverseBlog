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
      "white": "#ffffff",
      "black": "#000000",
      "seaGreen": "#9FE2BF",
      "arch": "#eeeeee",
      "lightGray": "#D3D3D3",
      "darkGray": "#A9A9A9",
      "red": "#ff333c"
    },
    fontFamily:{
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          /* Hide scrollbar for Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
      });
    },
  ],
}

