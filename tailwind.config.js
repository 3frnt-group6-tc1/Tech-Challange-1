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
    },
    colors: {
      "cyan-blue": "#004d61",
      "orange": "#ff5031",
      "green-900": "#47A138",
      "green-100": "#e4ede3",
      "black": "#000000",
      "gray-400": "#cbcbcb",
      "white": "#ffffff",
    }
  },
  plugins: [],
}