/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#65c8b8",
          normal: "#14b8a5",
          dark: "#1e8c7e",
          darkest: "#1e6259",
        },
        secondary: "#8ec7d2",
        tertiary: "#8ec7d2",
        Quaternary: "#0d6986",
        Quinary: "#07485b",
        accent: {
          light: "#e7b852",
          normal: "#dba507",
          dark: "#a67e13",
        },
      },
      fontFamily: {
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
