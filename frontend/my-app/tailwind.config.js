/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Design tokens aligned with SMRU brand (navy, blue, green, yellow)
        primary: "#0D315C", // brand navy
        "primary-foreground": "#FFFFFF",
        secondary: "#1C3C88", // brand blue
        accent: "#F97316",
        warning: "#FFAF3A", // brand yellow (updated)
        success: "#10BB82", // brand green
        border: "#E5E7EB",
        bg: "#F8FAFC",
        card: "#FFFFFF",
        "card-foreground": "#0F172A",

        navy: "#0d315c",
        green: "#10bb82",
        accentOld: "#f4aa00",
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
        aboutBannerText: "#FFAF3A",

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
        "about-banner-text": "#FFAF3A",
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
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          md: "1.25rem",
          lg: "2rem",
          xl: "2.5rem",
          "2xl": "3rem",
        },
      },
      backgroundImage: {
        "hero-smru": "linear-gradient(to right, #1c3c88, #10bb82)",
      },
      boxShadow: {
        // New elevation scale
        xs: "0 1px 2px rgba(0,0,0,0.06)",
        sm: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
        md: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
        lg: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
        xl: "0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)",
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
        // Radii scale
        sm: "0.375rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
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
        heading: ["Poppins", "Arial", "Helvetica", "sans-serif"],
        body: ["Poppins", "Arial", "Helvetica", "sans-serif"],
      },
      transitionDuration: {
        150: "150ms",
        300: "300ms",
        500: "500ms",
      },
    },
  },
  plugins: [],
};
