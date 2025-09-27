// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          0: "#ffffff",
          50: "#f9f9f9",
          100: "#f2f2f2",
          200: "#e6e6e6",
          300: "#d9d9d9",
          400: "#cccccc",
          500: "#bfbfbf",
        },
      },
    },
  },
  plugins: [],
};

export default config;
