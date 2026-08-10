import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C62930",
          dark: "#8F1B21",
          darker: "#5C1216",
          light: "#E8555C",
          tint: "#FBEAEA",
        },
        ink: {
          DEFAULT: "#111111",
          soft: "#3A3A3A",
          muted: "#6B6764",
        },
        paper: {
          DEFAULT: "#FFFFFF",
          warm: "#FAF7F5",
          line: "#E9E4E1",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      screens: {
        xs: "390px",
      },
      backgroundImage: {
        "stamp-lines": "repeating-linear-gradient(135deg, rgba(198,41,48,0.06) 0px, rgba(198,41,48,0.06) 1px, transparent 1px, transparent 10px)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(17,17,17,0.04), 0 8px 24px rgba(17,17,17,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
