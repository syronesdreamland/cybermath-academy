/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        soft: "#475569",
        muted: "#94a3b8",
        line: "#e2e8f0",
        canvas: "#f7f8fa",
        cyber: {
          DEFAULT: "#0f766e",
          soft: "#ccfbf1",
        },
        math: {
          DEFAULT: "#4338ca",
          soft: "#e0e7ff",
        },
        pentest: {
          DEFAULT: "#b45309",
          soft: "#fef3c7",
        },
        aws: {
          DEFAULT: "#c2410c",
          soft: "#ffedd5",
        },
        sqli: {
          DEFAULT: "#7c3aed",
          soft: "#ede9fe",
        },
        auth: {
          DEFAULT: "#0891b2",
          soft: "#cffafe",
        },
        acl: {
          DEFAULT: "#059669",
          soft: "#d1fae5",
        },
        xss: {
          DEFAULT: "#be123c",
          soft: "#ffe4e6",
        },
        ml: {
          DEFAULT: "#0e7490",
          soft: "#e0f2fe",
        },
        mlp: {
          DEFAULT: "#4d7c0f",
          soft: "#ecfccb",
        },
        gold: "#d97706",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,.06), 0 8px 24px -12px rgba(15,23,42,.12)",
        lift: "0 12px 40px -12px rgba(15,23,42,.22)",
      },
      borderRadius: {
        xl2: "20px",
      },
    },
  },
  plugins: [],
};
