import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Oswald", "sans-serif"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at 1px 1px, rgba(44,74,72,0.14) 1px, transparent 0)"
      },
      animation: {
        "hero-fade-up": "hero-fade-up 0.7s ease-out forwards",
        "badge-pop": "badge-pop 0.5s ease-out forwards",
        "court-pulse": "court-pulse 4s ease-in-out infinite",
        "hero-line-draw": "hero-line-draw 2.2s ease-out forwards"
      },
      keyframes: {
        "hero-fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "badge-pop": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "60%": { transform: "scale(1.05)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "court-pulse": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.6" }
        },
        "hero-line-draw": {
          from: { strokeDashoffset: "1000", opacity: "0" },
          to: { strokeDashoffset: "0", opacity: "1" }
        }
      }
    }
  },
  plugins: []
};

export default config;
