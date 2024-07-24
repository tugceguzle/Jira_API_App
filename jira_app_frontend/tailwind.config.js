/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#2FB3F7',
        'custom-purple': '#9859E5',
      },
    },
  },
  plugins: [],
}
