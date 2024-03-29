/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': 'linear-gradient(to right bottom, rgba(0, 0, 0, 0.9), rgba(43, 108, 176, 0)), url("/src/Images/hockey1.jpg")',
      },
      minWidth: {
        '26': '26rem',
      },
      colors: {
        dark: colors.stone[800],
        primary: colors.sky[900],
        primaryHover: colors.sky[800],
        secondary: colors.amber[300],
        secondaryHover: colors.amber[200],
        error: colors.red[300],
        success: colors.green[300],
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
