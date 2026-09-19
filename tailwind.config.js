/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        porcelain: "#fbf8f2",
        paper: "#fffdf9",
        coffee: {
          DEFAULT: "#3d2b1f",
          deep: "#211810"
        },
        fawn: {
          DEFAULT: "#e1bb80",
          soft: "#f3e7d5"
        },
        olive: "#685634",
        teal: {
          DEFAULT: "#0f4b4f",
          deep: "#08383b"
        },
        campaign: {
          green: "#29a847",
          red: "#c33a2c"
        }
      },
      fontFamily: {
        sans: ["Inter", "Tajawal", "Arial", "sans-serif"],
        display: ["Tajawal", "Arial", "sans-serif"]
      },
      boxShadow: {
        card: "0 24px 70px rgba(61, 43, 31, 0.14)",
        float: "0 16px 42px rgba(13, 65, 50, 0.35)"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  plugins: []
};
