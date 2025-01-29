
import type { Config } from "tailwindcss";

export default {
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
      },
      fontFamily: {
        robotoMono: "var(--font-roboto-mono), monospace",
      },
      screens: {
        'h-sm': { raw: '(max-height: 500px)' },
        'h-md': { raw: '(max-height: 700px)' }, 
      },
    },
  },
  plugins: [],
} satisfies Config;

