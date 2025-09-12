/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0d315c",
        green: "#10bb82",
        accent: "#f4aa00",
        accentDark: "#d49400",
        darkGray: "#1d253c",
        lightGray: "#f8fafb",

        gray50x: "#f9fbfc",
        gray100x: "#f5f6fa",
        gray200x: "#e0e0e0",
        gray600x: "#444444",
        gray600b: "#5e5e5e",

        aboutBanner: "#1c3c88",
        aboutBannerGreen: "#10bb82",
        aboutBannerText: "#f4aa00",

        "dark-gray": "#1d253c",
        "light-gray": "#f8fafb",
        "footer-link": "#ccc",
        "hero-stats-bg": "rgba(255, 255, 255, 0.201)",
        "hero-stats-shadow": "rgba(0, 80, 179, 0.12)",
        "hero-stat-text": "rgba(40, 88, 146, 0.12)",
        "hero-subtitle-text": "rgba(13, 49, 92, 0.2)",
        "hero-title-shadow": "rgba(13, 49, 92, 0.3)",
        "timeline-line": "#cddff7",
        "timeline-dot": "#2a6df4",
        "about-banner": "#1c3c88",
        "about-banner-green": "#10bb82",
        "about-banner-text": "#f4aa00",
        "who-text": "#333",
        "core-card-border": "#2a6df4",
        "core-icon-bg": "#e6f0ff",
        "leadership-text": "#4a4a4a",

        brand: {
          teal: "#0e8070",
          tealDark: "#004d40",
          mint: "#07d7c2",
          note: "#175866",
          deptTitle: "#038c6e",
          progName: "#14575b",
          progText: "#44767b",
          link: "#34798f",
        },
      },
      backgroundImage: {
        "hero-smru": "linear-gradient(to right, #1c3c88, #10bb82)",
      },
      boxShadow: {
        button: "0 2px 8px rgba(244, 170, 0, 0.33)",
        whatsapp: "0 2px 16px rgba(16, 187, 130, 0.4)",
        "whatsapp-hover": "0 7px 26px rgba(16, 187, 130, 0.8)",
        "who-we-are": "0 10px 20px rgba(0, 0, 0, 0.15)",
        hero: "0 10px 20px rgba(0, 0, 0, 0.15)",
        benefit: "0 4px 18px rgba(13,49,92,0.09)",
        jobs: "0 4px 16px rgba(13,49,92,0.08)",
        jobcard: "0 2px 8px rgba(13,49,92,0.03)",
      },
      borderRadius: {
        radius: "18px",
        "12": "12px",
        "13": "13px",
        "20": "20px",
        "26": "26px",
        "30": "30px",
      },
      keyframes: {
        fadein: { from: { opacity: "0" }, to: { opacity: "1" } },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadein: "fadein 0.15s ease-in-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
      scale: { "107": "1.07", "109": "1.09" },
      fontFamily: {
        poppins: ["Poppins", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
