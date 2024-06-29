/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // primary: '#f13a01',
        dark: '#1b1b1b',
        accent: '#1b1b1b',
        accentDark: '#FFA500',
        gray: '#747474',
        lightGray: '#d3d3d3',
        light: '#a9a9a9',
        white: '#fff',
        lightOrange: '#f5bf42',
        teal: '#03f4fc',
        silver: '#C0C0C0',
        smoke: '#848884',
        steelGrey: '#71797E',
        lime: '#32CD32',
        // coralPink: '#F88379',
        primary: '#F88379',
        lightGreen: '#DAF7A6',
        tan: '#f5ece3',
        almond: '#EFDECD',
        // lightBlack: '#343432',
        lightBlack: '#474744',
        lightPink: '#FFB6C1',
        lightTan: '##FCF4D0',
      },
    },
  },
  plugins: [],
};
