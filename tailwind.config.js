/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#100E19",
        "background-secondary": "#1a1823",
        primary: "#1f1b79",
        secondary: "#3f2c96",
        accent: "#8e69bf",
        "text-primary": "#F0F0F0",
        "text-secondary": "#B1A3E0",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
