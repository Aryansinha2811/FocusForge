/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        base: 'var(--radius)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      spacing: {
        'boxShadowX': '4px',
        'boxShadowY': '4px',
        'reverseBoxShadowX': '-4px',
        'reverseBoxShadowY': '-4px',
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--border))",
        ring: "oklch(var(--ring))",
        background: "oklch(var(--background))",
        'secondary-background': "oklch(var(--secondary-background))",
        foreground: "oklch(var(--foreground))",
        'main-foreground': "oklch(var(--main-foreground))",
        main: {
          DEFAULT: "oklch(var(--main))",
          foreground: "oklch(var(--main-foreground))",
        },
        primary: {
          DEFAULT: "oklch(var(--main))",
          foreground: "oklch(var(--main-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary-background))",
          foreground: "oklch(var(--foreground))",
        },
        destructive: {
          DEFAULT: "oklch(66.89% 0.2093 22.18)",
          foreground: "oklch(0% 0 0)",
        },
        muted: {
          DEFAULT: "oklch(var(--secondary-background))",
          foreground: "oklch(var(--foreground))",
        },
        accent: {
          DEFAULT: "oklch(var(--main))",
          foreground: "oklch(var(--main-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--background))",
          foreground: "oklch(var(--foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--background))",
          foreground: "oklch(var(--foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
      },
      boxShadow: {
        'shadow': '4px 4px 0px 0px oklch(var(--border))',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}