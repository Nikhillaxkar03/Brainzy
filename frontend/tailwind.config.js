/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-dark": "#5046E4",
        "main-light": "#DFE4FD",
        "grey": "#343A41"
      }
    },
  },
  plugins: [],
}

