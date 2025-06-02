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
        'primary-gradient-dark': 'linear-gradient(to bottom, #020024 0%, #090979 50%, #00D4FF 100%)',
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

        "yellow-500": "#E9C300",
        "yellow-900": "#ba9c00",

        "brown-500": "#80440D",
        "brown-900": "#6b3c0a",
        
        "blue-violet-25":"#E8E9ED",
        "blue-violet-50":"#DDDEE4",
        "blue-violet-100": "#8589D6",
        "blue-violet-500": "#090979",
        "blue-violet-900": "#020024",
      },
    },
  },
  plugins: [],
}