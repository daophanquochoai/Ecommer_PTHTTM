/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary :  'rgb(241,241,241)'
      },
      backgroundImage : {
        'login' : "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8bUKfwcFOlCYm6sURPEuheJtDcv0YOarlPQ&s')"
      }
    }
  },
  plugins: [],
}