import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      favorit: ['"CS Favorit"'],
    },
    fontWeight: {
      light: "200",
      regular: "300",
      medium: "400",
      book: "600",
      bold: "700",
    },
    fontSize: {
      xl: "24px",
      "2xl": "28px",
      "3xl": "32px",
    },
    screens: {
      sm: "706px",
      md: "900px",
      lg: "1024px",
      xl: "2580px",
    },
    textUnderlineOffset: {
      "10": "10px",
    },
  },
  plugins: [],
};

export const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 2580,
};

export default config;
