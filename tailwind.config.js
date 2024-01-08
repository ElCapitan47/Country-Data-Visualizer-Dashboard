/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "poppins" : ['Poppins', 'sans-serif']
      },
      height: {
        "1/10" : "10%",
        "9/10" : "90%",
        "1/7": "15%",
        "6/7": "85%",
      },
      maxWidth: {
        "76": "300px",
      },
      backgroundColor: {
        "app-black" : '#121212',
        "app-brown" : '#29AB87',
        "app-prussian" : "#003152",
      },
    },
  },
  plugins: [],
}