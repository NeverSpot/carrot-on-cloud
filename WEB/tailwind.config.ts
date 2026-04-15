import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        cf: {
          red: '#FF0000',
          orange: '#FF8C00',
          purple: '#AA00AA',
          blue: '#2F74C0',
          cyan: '#03A89E',
          green: '#008000',
          gray: '#808080',
        },
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          elevated: '#2A2A2A',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-space-grotesk)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'drift': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(20px, -10px)' },
          '50%': { transform: 'translate(-10px, 20px)' },
          '75%': { transform: 'translate(-20px, -5px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(47, 116, 192, 0.15), 0 0 30px rgba(47, 116, 192, 0.08)' },
          '50%': { boxShadow: '0 0 25px rgba(47, 116, 192, 0.3), 0 0 50px rgba(47, 116, 192, 0.15)' },
        },
        'glow-pulse-cyan': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(47, 116, 192, 0.15), 0 0 30px rgba(47, 116, 192, 0.08)' },
          '50%': { boxShadow: '0 0 25px rgba(47, 116, 192, 0.3), 0 0 50px rgba(47, 116, 192, 0.15)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'drift': 'drift 20s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'glow-pulse-cyan': 'glow-pulse-cyan 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
