/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      rotate: {
        360: "360deg",
      },
      colors: {
        primary: {
          light: "#65c8b8",
          normal: "#14b8a5",
          dark: "#1e8c7e",
          darkest: "#1e6259",
        },
        secondary: {
          lightest: "#cee6eb",
          light: "#a8d3dc",
          normal: "#8ec7d2",
          dark: "#6d979f",
        },
        tertiary: {
          light: "#5388a0",
          normal: "#0D6986",
          dark: "#155167",
        },
        quaternary: "#07485b",
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
