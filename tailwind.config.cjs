const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    fontFamily: {
      sans: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
      serif: ["Source Serif Pro", ...defaultTheme.fontFamily.serif],
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: "#33FFC1",
          50: "#33B8FF",
          100: "#34F8FF",
          200: "#33FF7C",
          300: "#3377FF",
          400: "#0DA2FF",
          500: "#110DFF",
          600: "#0C55FF",
          700: "#0DEEFF",
          800: "#600DFF",
          900: "#33D6FF",
          950: "#000000",
        },
        base: {
          DEFAULT: "#121217",
          50: "#4D6E94",
          100: "#466486",
          200: "#38506C",
          300: "#2A3C51",
          400: "#1C2836",
          500: "#0E141B",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
          950: "#000000",
        },
      },
    },
  },

  plugins: [],
};

module.exports = config;
