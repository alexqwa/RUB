/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        13: "50px",
      },
      backgroundColor: {
        background: "#121214",
        foreground: "#202024",
      },
      borderColor: {
        outline: "#323238",
      },
      fontFamily: {
        roboto_400: ["Roboto_400Regular"],
        roboto_500: ["Roboto_500Medium"],
        roboto_700: ["Roboto_700Bold"],
        poppins_400: ["Poppins_400Regular"],
        poppins_500: ["Poppins_500Medium"],
        poppins_600: ["Poppins_600SemiBold"],
        poppins_700: ["Poppins_700Bold"],
        rajdhani_700: ["Rajdhani_700Bold"],
      },
    },
  },
  plugins: [],
};
