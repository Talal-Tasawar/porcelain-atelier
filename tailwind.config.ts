import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        clay: {
          50: "#faf6f2",
          100: "#f2e9e0",
          200: "#e4cfba",
          300: "#d3ac89",
          400: "#c1885d",
          500: "#a9683e",
          600: "#8c5232",
          700: "#713f29",
          800: "#5c3324",
          900: "#4b2b20",
        },
        ink: {
          50: "#f6f6f5",
          100: "#e7e6e3",
          200: "#cfccc6",
          300: "#a9a49a",
          400: "#7d766a",
          500: "#5f5850",
          600: "#4a443e",
          700: "#3b3631",
          800: "#282420",
          900: "#171512",
          950: "#0d0c0a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
