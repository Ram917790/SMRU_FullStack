import React, { useEffect } from "react";

export default function Admissions() {
  // Ensure inline NPF form renders on route navigation
  useEffect(() => {
    const render = () => {
      try {
        document.querySelectorAll(".npf_wgts iframe").forEach((ifr) => ifr.parentElement?.removeChild(ifr));
        if (!document.querySelector('script[src*="widgets.in4.nopaperforms.com/emwgts.js"]')) {
          const s = document.createElement("script");
          s.src = "https://widgets.in4.nopaperforms.com/emwgts.js";
          s.async = true;
          s.onload = () => { try { window.npf && window.npf.init && window.npf.init(); } catch (e) {} };
          document.body.appendChild(s);
        }
        if (window.npf && typeof window.npf.init === "function") {
          window.npf.init();
          return true;
        }
      } catch {}
      return false;
    };
    if (!render()) {
      let tries = 0;
      const t = setInterval(() => {
        tries += 1;
        if (render() || tries > 20) clearInterval(t);
      }, 300);
      return () => clearInterval(t);
    }
  }, []);

  return (
    <section className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 pt-10 md:pt-14 pb-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0d315c]">Admissions</h1>
          <p className="mt-3 max-w-2xl mx-auto text-slate-700">
            Please fill the enquiry form below. Our team will reach out shortly.
          </p>
        </header>

        <div className="mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
          <div className="relative w-full h-[580px] sm:h-[640px]">
            <div className="absolute inset-0 rounded-md bg-slate-100 animate-pulse" aria-hidden />
            <div
              className="npf_wgts absolute inset-0"
              data-w="1724ed5dcfaa2cb0aabd46c4d9c7d8df"
              data-height="640px"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
