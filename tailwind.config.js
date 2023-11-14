/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/pages/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "background-primary": "var(--background-primary)",
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "item-selection-color": "var(--item-selection-color)",
        "border-color": "var(--border-color)",
        "modal-title-color": "var(--modal-title-color)",
        "button-background": "var(--button-background)",
      },
      keyframes: {
        "expand-animation": {
          "0%": { transform: "scale(.95)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(.95)" },
        },
      },
      animation: {
        "expand-animation": "expand-animation 1s linear infinite",
      },
    },
    plugins: [],
  },
};
