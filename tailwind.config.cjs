const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const lineClamp = require("@tailwindcss/line-clamp");

function getMapping(key, color) {
  return {
    [`${key}`]: colors[color]["500"],
    [`${key}-dark`]: colors[color]["700"],
    [`${key}-light`]: colors[color]["300"],
  };
}

function addColor(list) {
  const obj = {};
  list.forEach((x) => {
    obj[x] = colors[x];
  });
  return obj;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...addColor([
        "amber",
        "blue",
        "cyan",
        "emerald",
        "fuchsia",
        "green",
        "indigo",
        "lime",
        "neutral",
        "teal",
        "purple",
        "pink",
      ]),
      ...getMapping("primary", "cyan"),
      ...getMapping("success", "green"),
      ...getMapping("danger", "rose"),
      ...getMapping("warning", "amber"),
      ...getMapping("info", "slate"),
      transparent: "transparent",
      gray: colors["zinc"],
      white: "#fff",
      black: "#000",
      dark: colors.zinc["900"],
      light: colors.zinc["50"],
    },
  },
  plugins: [
    plugin(function ({ addVariant, addUtilities }) {
      addVariant(".active", "&.active");
      addUtilities({
        ".scroll-bar": {
          "&::-webkit-scrollbar": {
            width: "0.25rem",
            height: "0.5rem",
          },
          "&::-webkit-scrollbar-thumb": {
            "border-radius": "0.25rem",
            "background-color": "theme('colors.gray.200')",
          },
        },
        ".text-0": {
          "font-size": "0",
        },
      });
    }),
    lineClamp,
  ],
};
