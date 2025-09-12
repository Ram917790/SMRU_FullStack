import { useEffect } from "react";

/**
 * Meritto (NoPaperForms) Popup Widget
 * - Floating vertical "Enquire Now!" tab on the right
 * - Tailwind-only styling (no external CSS)
 * - Robust init with retries
 *
 * Props:
 *   yPercent (number) -> distance from top in %, default 42 (smaller = move up)
 *   label (string)    -> button text
 */
export default function MerittoPopup({ yPercent = 42, label = "Enquire Now!" }) {
  useEffect(() => {
    const SCRIPT_SRC = "https://in4cdn.npfs.co/js/widget/npfwpopup.js";

    const init = () => {
      if (typeof window.NpfWidgetsInit !== "function") return false;
      if (window.__merittoPopupInitDone) return true;
      window.__merittoPopupInitDone = true;

      // eslint-disable-next-line no-undef
      new NpfWidgetsInit({
        widgetId: "1724ed5dcfaa2cb0aabd46c4d9c7d8df",
        baseurl: "widgets.in4.nopaperforms.com",
        formTitle: "Enquiry Form",
        titleColor: "#17a43b",
        backgroundColor: "#ddd",
        iframeHeight: "480px",
        buttonbgColor: "#4c79dc",
        buttonTextColor: "#FFF",
      });
      return true;
    };

    const ensureInit = () => {
      let tries = 0;
      const t = setInterval(() => {
        tries += 1;
        if (init() || tries > 20) clearInterval(t);
      }, 500);
    };

    const load = () => {
      let script = document.querySelector('script[data-meritto-popup="true"]');
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.setAttribute("data-meritto-popup", "true");
        script.onload = ensureInit;
        document.body.appendChild(script);
      } else {
        if (typeof window.NpfWidgetsInit === "function") ensureInit();
        else script.addEventListener("load", ensureInit, { once: true });
      }
    };

    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(load, 0);
    } else {
      window.addEventListener("DOMContentLoaded", load, { once: true });
    }
  }, []);

  return (
    <button
      type="button"
      aria-label="Open enquiry form"
      className={`
        npfWidgetButton npfWidget-1724ed5dcfaa2cb0aabd46c4d9c7d8df
        fixed right-[-52px] z-[999999]
        px-4 py-2 bg-[#038137] text-white
        text-[18px] font-bold leading-[1.33]
        rounded-[5px] rounded-br-0 rounded-bl-0
        shadow hover:opacity-95 active:opacity-90
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#038137]
        transition
      `}
      style={{ top: `${yPercent}%`, transform: "translateY(-50%) rotate(-90deg)" }}
    >
      {label}
    </button>
  );
}
