/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "380px",
      // => @media (min-width: 380px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: "#2d2478",
        "primary-light": "#5357a9",
        secondary: "#efbc54",
        "secondary-light": "#f1e6d3",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        arabic: ["CooperArabic", "sans-serif"],
      },
      transitionTimingFunction: {
        "cubic": "cubic-bezier(0.645,0.045,0.355,1)",
      },
    },
  },
  plugins: [],
};
