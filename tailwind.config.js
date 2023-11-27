/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,tsx,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
      },
      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      linearGradientColors: {
        "border-gradient": ["#4dc0b5", "#3490a5"], // adjust these colors to your gradient
      },
    },
    // colors: {
    //   tokyonight: {
    //     light: {
    //       primary: "#89ddff",
    //       secondary: "#c792ea",
    //       background: "#f1f1f0",
    //       text: "#1a1b27",
    //       link: "#7aa2f7",
    //       linkHover: "#9bcdff",
    //     },
    //     dark: {
    //       primary: "#89ddff",
    //       secondary: "#c792ea",
    //       background: "#1a1b27",
    //       text: "#a9b1d6",
    //       link: "#7aa2f7",
    //       linkHover: "#9bcdff",
    //     },
    //   },
    // },
  },
  plugins: [],
};
