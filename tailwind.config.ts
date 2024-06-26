import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: `${0}` },
          '100%': { opacity: `${1}` },
        },
        fadeOut: {
          '0%': { opacity: `${0}` },
          '100%': { opacity: `${1}` },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        fadeOut: 'fadeOut 1s ease-in-out',
      },
    },
    fontFamily: {
      favorit: ['"CS Favorit"'],
    },
    fontWeight: {
      light: '200',
      regular: '300',
      medium: '400',
      book: '600',
      bold: '700',
    },
    fontSize: {
      xl: '24px',
      '2xl': '28px',
      '3xl': '32px',
    },
    screens: {
      sm: '706px',
      md: '900px',
      lg: '1024px',
      xl: '1800px',
    },
    textUnderlineOffset: {
      '4': '4px',
      '10': '10px',
    },
  },
  plugins: [],
}

export const screens = {
  sm: 706,
  md: 900,
  lg: 1024,
  xl: 1800,
}

export default config
