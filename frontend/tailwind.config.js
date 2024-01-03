const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [require("tailwindcss-safe-area")],
  theme: {
    extend: {
      colors: {
        pri: colors.blue,
        sec: colors.amber,
        dar: colors.stone,
      },
    },
  },
});
