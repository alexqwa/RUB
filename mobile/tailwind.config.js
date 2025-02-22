/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        13: '50px',
      },
      textColor: {
        yelp: '#F7DD43',

        heading: '#32264D',
        subtitle: '#6A6180',
      },
      backgroundColor: {
        background: '#121214',
        foreground: '#202024',
        yelp: '#F7DD43',
        header: {
          purple: '#774DD6',
        },
        button: {
          active: '#04D361',
          purple: '#8257E5',
          disable: '#DCDCE5',
        },
        shapes: {
          background: '#F2F2F2',
          purple: '#8257e5',
        },
      },
      borderColor: {
        shape_inline: '#E6E6F0',
        outline: '#323238',

        header: {
          purple_dark: '#6842C2',
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
