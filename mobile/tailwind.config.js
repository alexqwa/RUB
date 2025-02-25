/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        13: '50px',
      },
      textColor: {
        heading: '#32264D',
        subtitle: '#6A6180',
      },
      backgroundColor: {
        shapes: {
          green_400: '#04D361',
          purple_400: '#8257E5',
          purple_500: '#774DD6',
          purple_800: '#6842C2',
          gray_200: '#F2F2F2',
          gray_400: '#DCDCE5',
          gray_500: '#C1BCCC',
        },
      },
      borderColor: {
        shapes: {
          gray_400: '#E6E6F0',
          purple_800: '#6842C2',
        },
      },
      fontFamily: {
        archivo_400: ['Archivo_400Regular'],
        archivo_600: ['Archivo_600SemiBold'],
        archivo_700: ['Archivo_700Bold'],
        poppins_400: ['Poppins_400Regular'],
        poppins_500: ['Poppins_500Medium'],
        poppins_600: ['Poppins_600SemiBold'],
        poppins_700: ['Poppins_700Bold'],
      },
    },
  },
  plugins: [],
};
