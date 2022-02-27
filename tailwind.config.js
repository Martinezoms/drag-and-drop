module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        smoke: "#f1f0f0"
      },
      screens: {
        "3xl": { min: "1536px" },
        sm: { max: "768px" },
        xs: { max: "540px" }
      }
    }
  },
  plugins: []
};
