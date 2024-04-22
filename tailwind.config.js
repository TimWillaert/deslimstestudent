import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "0-background": "#0c4685",
        "0-foreground": "#fff",
        "1-background": "#bfcfdf",
        "1-foreground": "#10426d",
        "2-background": "#011f41",
        "2-foreground": "#fff",
      },
      boxShadow: {
        puzzle:
          "0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
        circle:
          "0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
      },
      textShadow: {
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
      },
    },
  },
  safelist: [
    "bg-0-background",
    "text-0-foreground",
    "bg-1-background",
    "text-1-foreground",
    "bg-2-background",
    "text-2-foreground",
  ],
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
