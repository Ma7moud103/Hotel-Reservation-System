/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blur: "#00000080",
        primaryBlue: "#0056d2",
        accentGold: "#ffc107",
        darkGray: "#2c2c2c",
        lightGray: "#f5f5f5",
        white: "#ffffff",
        emeraldGreen: "#2ecc71",
        warmRed: "#ff5733",
        softOrange: "#ff8c42",
        mainBg: "#f8fafd",
        cardBg: "#ffffff",
        footerBg: "#2c2c2c",
        headingText: "#2c2c2c",
        bodyText: "#6c757d",
        mutedText: "#adb5bd",
        primaryBtnBg: "#0056d2",
        primaryBtnHover: "#003f91",
        primaryBtnText: "#ffffff",
        secondaryBtnBg: "#ffc107",
        secondaryBtnHover: "#e0a800",
        secondaryBtnText: "#2c2c2c",
        borderLightGray: "#e5e5e5",
        borderAccentGold: "#ffc107"
      },
      boxShadow: {
        cardShadow: "#0 4px 6px rgba(0, 0, 0, 0.1)"
      }
    }
  },
  plugins: []
};
