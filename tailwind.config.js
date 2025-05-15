/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to bottom, #004D61, #ffffff)',
        'secondary-gradient': 'linear-gradient(to bottom, #dee9ea, #ffffff)',
      },
      fontFamily: {
        lato: ['"Lato"', 'sans-serif'],
      },
      colors: {
        "cyan-blue-100": "#80a6b0",
        "cyan-blue-500": "#004d61",
        "cyan-blue-900": "#003543",

        "orange-100": "#ffa898",
        "orange-500": "#ff5031",
        "orange-900": "#cc4027",

        "gray-100": "#f8f8f8",
        "gray-200": "#dee9ea",
        "black-600": "#767676",
        "black-700": "#444444",
        "black-900": "#131313",
        
        "green-600": "#157f40",
        "red-600": "#ce3426",
      }
    },
  },
  plugins: [],
}