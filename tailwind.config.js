import { createThemes } from 'tw-colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {},
    },
  },
  important: true,
  plugins: [
    createThemes(
      {
        light: {
          primary: '#0D062B',
          primaryGray: '#CECDD2',
          secondary: '#FFFFFF',
          // accents
          accentBlue: '#2B1CCB',
          accentYellow: '#f9b234',
          accentRed: '#e44002',
          accentPurple: '#952aff',
          accentPink: '#A199CE',
          accentGreen: '#3ecd5e',
          accentOrange: '#D8540A',
          // text
          gray1: '#56506B',
          // sections
          section1: '#f7f7f7',
          section2: '#FBFAFE',
        },
        dark: {
          primary: '#0D062B',
          primaryGray: '#CECDD2',
          secondary: '#FFFFFF',
          accentBlue: '#2B1CCB',
          // accents
          accentYellow: '#f9b234',
          accentRed: '#e44002',
          accentPurple: '#952aff',
          accentPink: '#A199CE',
          accentGreen: '#3ecd5e',
          accentOrange: '#D8540A',
          // text
          gray1: '#56506B',
          // sections
          section1: '#f7f7f7',
          section2: '#FBFAFE',
        },
      },
      {
        produceCssVariable: (colorName) => `--twc-${colorName}`,
        produceThemeClass: (themeName) => `theme-${themeName}`,
        produceThemeVariant: (themeName) => `theme-${themeName}`,
        strict: true,
        light: 'light',
        dark: 'dark',
      }
    ),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
