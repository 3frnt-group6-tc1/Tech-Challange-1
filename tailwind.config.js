/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}",
  ],
  safelist: [
    'text-white',
    'text-black-900',
    'text-cyan-blue-500',
    'text-orange-500',
    'text-green-600',
    'text-red-600',
    'font-bold',
    'text-[24px]',
    'text-[20px]',
    'text-[16px]',
    'text-[14px]',
    'leading-[20px]',
    'leading-6',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        lg: '1rem',
      },
      screens: {
        lg: '1024px',
        xl: '1326px',
      },
    },


    extend: {
      screens: {
        '2md': '1440px',
      },
      boxShadow: {
        'x-light': '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
        'white-16': 'rgba(255, 255, 255, 0.16)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to bottom, #003C50 0%, #007B8F 50%, #a9c4c9 100%);',
        'primary-gradient-dark': 'linear-gradient(to bottom, #1A0078 0%, #6F47FF 100%);',
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
        "gray-250": "#ABAFBA",
        "black-600": "#767676",
        "black-700": "#444444",
        "black-900": "#131313",

        "green-600": "#157f40",
        "red-600": "#ce3426",

        "green-darkmode": "#47A138",
        "green-darkmode-900": "#2F7027",



        "yellow-500": "#E9C300",
        "yellow-900": "#ba9c00",

        "brown-500": "#80440D",
        "brown-900": "#6b3c0a",

        "purple-100": "#35189C",
        "purple-200": "#5431D0",
        "purple-300": "#653DF5",
        "purple-400": "#4D20EF",
        "purple-500": "#3401EE",

      },
    },
  },
  plugins: [],
}