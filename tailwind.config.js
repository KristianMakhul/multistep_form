/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./src/index.html"],
  theme: {
    screens: {
      xl: { max: "1250px" },
      lg: { max: "1000px" },
      sm: { max: "685px" },
    },
    fontFamily: {
      sans: ["DM Sans", "sans-serif"],
    },
    minHeight: {
      "step-xl": "630px",
      "step-sm": "380px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4A3AFF",
          100: "#473BD1",
        },
        secondary: "#FFC226",
        tertiary: {
          100: "#FFFFFF",
          200: "#D9DBE9",
          300: "#EFF0F6",
          400: "#D9DBE9",
          500: "#A0A3BD",
          600: "#6F6C90",
          700: "#4E4B66",
          800: "#14142B",
        },
      },
    },
  },
  plugins: [],
};
