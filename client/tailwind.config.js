/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

// Flip card utilities
const flipCardUtil = plugin(function ({addUtilities}) {
  addUtilities({
    '.rotate-y-180' : {
      transform : 'rotateY(180deg)'
    },
    '.backface-visible' : {
      'backface-visibility': 'visible'
    },
    '.backface-hidden' : {
      'backface-visibility': 'hidden'
    },
    '.flip' : {
      transform: 'rotateY(var( — rotate-y, 0))'
    },
    '.preserve-3d' : {
      'transform-style': 'preserve-3d'
    },
  })
})

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        inn: "0 0 8px 8px white inset",
      },
      backgroundImage: {
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        disco: "disco 3.5s linear infinite",
        rotate: "rotate 5s linear infinite",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      keyframes: {
        disco: {
          "0%": { transform: "translateY(-50%) rotate(0deg)" },
          "100%": { transform: "translateY(-50%) rotate(360deg)" },
        },
        rotate: {
          "0%": {
            "--rotate": "0deg",
          },
          "100%": {
            "--rotate": "360deg",
          },
        },
      },
    },
  },
  plugins: [flipCardUtil, require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        scroll: {
          primary: "#1B262D",
          secondary: "#1B262D",
          accent: "#E6E6FA",
          neutral: "#1B262D",
          "base-100": "#FFFFFF",
          info: "#2679DF",
          success: "#26B58A",
          warning: "#EBB728",
          error: "#EA5048",
        },
      },
    ],
  },
};
