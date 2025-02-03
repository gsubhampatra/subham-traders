/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "#f5f7dc",
          DEFAULT: "#748c53",
          dark: "#2c3d10",
        },
        secondary: {
          DEFAULT: "#f0a616",
          dark: "#e4a82b",
        },
      },
    },
  },
  plugins: [],
};
