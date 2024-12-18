/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./client/**/*.tsx", // apply TW to any tsx file inside the client folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}