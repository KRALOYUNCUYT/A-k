import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        night: "#090414",
        blush: "#ff7ab6",
        orchid: "#b06bff",
        aurora: "#74d7ff",
        cream: "#fff5fb",
      },
      boxShadow: {
        glow: "0 0 60px rgba(255, 122, 182, 0.35)",
        blueglow: "0 0 70px rgba(116, 215, 255, 0.24)",
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 34px rgba(255, 122, 182, 0.34)" },
          "50%": { boxShadow: "0 0 80px rgba(176, 107, 255, 0.55)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
