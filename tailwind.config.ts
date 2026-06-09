import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0B0B0D",
        charcoal: "#141417",
        panel: "#1A1A1F",
        hairline: "#2C2C33",
        "chrome-hi": "#ECEDF1",
        chrome: "#B8B9C0",
        "chrome-mid": "#8A8B93",
        "chrome-lo": "#5A5B63",
        text: "#E6E6EA",
        muted: "#8E8F97",
        loss: "#C8453B",
        gain: "#3FB68B",
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-archivo)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "chrome-gradient":
          "linear-gradient(180deg, #ECEDF1 0%, #B8B9C0 20%, #8A8B93 40%, #5A5B63 55%, #8A8B93 70%, #ECEDF1 90%)",
        "chrome-sweep":
          "linear-gradient(105deg, #5A5B63 0%, #8A8B93 20%, #ECEDF1 35%, #B8B9C0 50%, #8A8B93 65%, #ECEDF1 78%, #5A5B63 100%)",
      },
      keyframes: {
        "count-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 2%)" },
          "30%": { transform: "translate(-1%, 4%)" },
          "40%": { transform: "translate(2%, -2%)" },
          "50%": { transform: "translate(-3%, 1%)" },
          "60%": { transform: "translate(1%, 3%)" },
          "70%": { transform: "translate(3%, -1%)" },
          "80%": { transform: "translate(-2%, 2%)" },
          "90%": { transform: "translate(2%, -3%)" },
        },
      },
      animation: {
        "count-up": "count-up 0.4s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        grain: "grain 8s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
