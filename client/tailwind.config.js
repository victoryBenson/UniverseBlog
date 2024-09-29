/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
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
      "darkGray": "#71797E",
      "red": "#FF0000"
    },
    fontFamily:{
      poppins: ["Poppins", "sans-serif"],
      zeyada: ["Zeyada", "cursive"],
      rubik: ["Rubik Scribble", "system-ui"],
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
    typography,
  ],
}

