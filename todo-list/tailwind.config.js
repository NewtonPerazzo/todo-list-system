/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#993399',
          50: '#f5e6f5',
          100: '#e6c2e6',
          200: '#d699d6',
          300: '#c266c2',
          400: '#ad4dad',
          500: '#993399',
          600: '#7a297a',
          700: '#5c1f5c',
          800: '#3d143d',
          900: '#1f0a1f',
        },
        background: '#e0bcdd',
      },
      screens: {
        'xs': '500px',
        'sm': '500px',
        'md': '800px',
        'lg': '1200px',
      },
    },
  },
  plugins: [],
}
