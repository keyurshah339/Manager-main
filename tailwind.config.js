module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "breakpoint-acc": "900px",
      },
      colors: {
        "palette-red": "#f28b82",
        "palette-purple": "#d7aefb",
        "palette-yellow": "#fbbc04",
        "palette-blue": "#aecbfa",
        "black-main": "#1F2937",
        "dark-1": "#202124",
        "navitem-hover": "#e8eaed",
        "selected-navitem-light": "#FECACA",
        "selected-navitem-dark": "#41331c",
        "yellow-main": "#fbbd06",
        blue: "#1d4ed8",
        "shadow-color": "#6b7280",
        "off-white": "#f6f6f6",
        "success-green": "#10B981",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      animation: ["motion-safe"],
    },
  },
  plugins: [],
};
