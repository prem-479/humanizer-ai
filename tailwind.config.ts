import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Outfit", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        body: ["Outfit", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Editorial Intelligence custom colors
        charcoal: {
          950: "hsl(var(--color-charcoal-950))",
          900: "hsl(var(--color-charcoal-900))",
          800: "hsl(var(--color-charcoal-800))",
          700: "hsl(var(--color-charcoal-700))",
          600: "hsl(var(--color-charcoal-600))",
          200: "hsl(var(--color-charcoal-200))",
          100: "hsl(var(--color-charcoal-100))",
          50: "hsl(var(--color-charcoal-50))",
        },
        cream: {
          300: "hsl(var(--color-cream-300))",
          200: "hsl(var(--color-cream-200))",
          100: "hsl(var(--color-cream-100))",
          50: "hsl(var(--color-cream-50))",
        },
        amber: {
          600: "hsl(var(--color-amber-600))",
          500: "hsl(var(--color-amber-500))",
          400: "hsl(var(--color-amber-400))",
          300: "hsl(var(--color-amber-300))",
          100: "hsl(var(--color-amber-100))",
        },
        teal: {
          700: "hsl(var(--color-teal-700))",
          600: "hsl(var(--color-teal-600))",
          500: "hsl(var(--color-teal-500))",
          400: "hsl(var(--color-teal-400))",
          50: "hsl(var(--color-teal-50))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow: "var(--shadow-glow-amber)",
        "glow-teal": "var(--shadow-glow-teal)",
        card: "var(--shadow-md)",
        elevated: "var(--shadow-xl)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "var(--shadow-glow-amber)" },
          "50%": { boxShadow: "0 0 30px hsla(var(--color-amber-500), 0.3), 0 0 60px hsla(var(--color-amber-500), 0.15)" },
        },
        textMorph: {
          "0%, 100%": { opacity: "1", filter: "blur(0px)" },
          "50%": { opacity: "0.6", filter: "blur(2px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "text-morph": "textMorph 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
