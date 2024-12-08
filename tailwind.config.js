/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit", // Enable JIT mode

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
