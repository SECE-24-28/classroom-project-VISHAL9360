module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: '#FFFDF0',
        cyberlime: '#CCFF00',
        electricyellow: '#FFDE59',
        punchcoral: '#FF6B6B',
        hyperpurple: '#C084FC',
      },
      boxShadow: {
        'brutal': '4px 4px 0px #000000',
        'brutal-lg': '6px 6px 0px #000000',
        'brutal-xl': '8px 8px 0px #000000',
      }
    },
  },
  plugins: [],
}
