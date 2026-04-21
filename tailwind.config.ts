import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // DryLeaf Brand Colors
        dryleaf: {
          green: {
            DEFAULT: "#2D5016",
            light: "#4a7c2a",
            dark: "#1e3a0f",
            muted: "#6b8c5a",
            50: "#f4f7f2",
            100: "#e4ebe0",
            200: "#c7d6be",
            300: "#a1b894",
            400: "#6b8c5a",
            500: "#4a7c2a",
            600: "#2D5016",
            700: "#1e3a0f",
            800: "#162b0b",
            900: "#0f1d08",
          },
          yellow: {
            DEFAULT: "#F4C430",
            light: "#f7d56a",
            dark: "#d4a520",
            50: "#fdf9e8",
            100: "#faf0c5",
            200: "#f7e294",
            300: "#f4d35a",
            400: "#F4C430",
            500: "#d4a520",
            600: "#b08d1a",
            700: "#8a6d16",
          },
        },
        // Shadcn colors
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
