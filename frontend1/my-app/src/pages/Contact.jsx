import React, { useEffect } from "react";

// You need to replace this with your actual NPF widget ID.
const WIDGET_ID = "1724ed5dcfaa2cb0aabd46c4d9c7d8df";
const WIDGET_BTN_CLASS = `npfWidget-${WIDGET_ID}`;

const Contact = () => {
  // On-scroll reveal animation
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Render the INLINE NPF widget on this page
  useEffect(() => {
    let tries = 0;
    const render = () => {
      // Clear any stale iframes so we don't get duplicates after HMR/route changes
      document.querySelectorAll(".npf_wgts iframe").forEach((ifr) => {
        if (ifr.parentElement) ifr.parentElement.removeChild(ifr);
      });
      if (window.npf && typeof window.npf.init === "function") {
        try {
          window.npf.init(); // picks up .npf_wgts[data-w]
          return true;
        } catch (_) {}
      }
      return false;
    };
    if (!render()) {
      const t = setInterval(() => {
        tries += 1;
        if (render() || tries > 20) clearInterval(t);
      }, 300);
      return () => clearInterval(t);
    }
  }, []);

  const openPopup = () => {
    const btn = document.querySelector("." + WIDGET_BTN_CLASS);
    if (btn) btn.click();
  };

  return (
    <>
      {/* HERO — updated to match About.jsx style */}
      <section className="relative w-full min-h-[42vh] bg-[radial-gradient(1200px_600px_at_15%_10%,rgba(255,255,255,0.12)_0,transparent_60%),linear-gradient(135deg,#0d315c_0%,#0b3a7a_50%,#019e6e_100%)]">
        <div className="max-w-6xl mx-auto px-4 pt-24 md:pt-28 pb-12 flex flex-col items-center justify-center text-center">
          <div className="w-full flex items-center justify-end">
            <button
              onClick={openPopup}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-white/95 text-[#0d315c] font-semibold hover:bg-white shadow"
            >
              <i className="fa-solid fa-comments"></i> Enquire Now
            </button>
          </div>

          <h1
            className="text-white text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.35)]"
            data-reveal="fade-up"
          >
            Contact Us
          </h1>
          <p
            className="mt-3 max-w-3xl text-white/95 text-lg md:text-xl"
            data-reveal="fade-up"
            style={{ "--delay": "0.08s" }}
          >
            Have questions regarding admissions, academic programs, or support?
            Our team will respond within one business day.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 grid gap-12 md:grid-cols-2">
          {/* LEFT INFO (your copy) */}
          <div>
            <h2
              className="text-3xl font-bold text-[#0d315c] mb-4"
              data-reveal="fade-right"
            >
              Get in Touch
            </h2>
            <p
              className="text-gray-700 mb-6"
              data-reveal="fade-right"
              style={{ "--delay": "0.08s" }}
            >
              We’re here to help you on your educational journey. Whether you
              have questions about courses, admissions, or campus life, we’re
              ready to assist.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex gap-3 text-sm text-gray-800" data-reveal="fade-up">
                <span className="text-lg">📍</span>
                <div>
                  <strong>Our Address</strong>
                  <br />
                  St. Mary's Rehabilitation University
                  <br />
                  Near Ramoji Film City,
                  <br />
                  Deshmukhi (V), Pochampally (M), Yadadri Bhongir (DT),
                  <br />
                  PIN: 508284
                </div>
              </li>
              <li
                className="flex gap-3 text-sm text-gray-800"
                data-reveal="fade-up"
                style={{ "--delay": "0.08s" }}
              >
                <span className="text-lg">📞</span>
                <div>
                  <strong>Phone</strong>
                  <br />
                  General:{" "}
                  <a
                    href="tel:+91-7331119430"
                    className="text-[#0d315c] hover:underline"
                  >
                    +91-7331119430
                  </a>
                  <br />
                  WhatsApp:{" "}
                  <a
                    href="tel:+91-7331119431"
                    className="text-[#0d315c] hover:underline"
                  >
                    +91-7331119431
                  </a>
                  <br />
                  Admissions:{" "}
                  <a
                    href="tel:+91-7331119432"
                    className="text-[#0d315c] hover:underline"
                  >
                    +91-7331119432
                  </a>
                </div>
              </li>
              <li
                className="flex gap-3 text-sm text-gray-800"
                data-reveal="fade-up"
                style={{ "--delay": "0.16s" }}
              >
                <span className="text-lg">✉️</span>
                <div>
                  <strong>Email</strong>
                  <br />
                  General:{" "}
                  <a
                    href="mailto:reach@smru.in"
                    className="text-[#0d315c] hover:underline"
                  >
                    reach@smru.in
                  </a>
                </div>
              </li>
            </ul>

            {/* Info cards */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div
                className="bg-white border border-gray-200 rounded-lg p-5 text-sm shadow-sm"
                data-reveal="zoom-in"
              >
                <strong className="text-[#0d315c]">Office Hours</strong>
                <br />
                Mon - Sat: 9:30 AM - 5:00 PM
                <br />
                Sun: Closed
              </div>
              <div
                className="bg-white border border-gray-200 rounded-lg p-5 text-sm shadow-sm"
                data-reveal="zoom-in"
                style={{ "--delay": "0.08s" }}
              >
                <strong className="text-[#0d315c]">Emergency Contact</strong>
                <br />
                Campus Security (24/7):
                <br />
                <a href="tel:+919010455590" className="text-[#0d315c] hover:underline">
                  +91 90104-55590
                </a>
              </div>
            </div>

            {/* Map */}
            <div
              className="relative rounded-xl overflow-hidden shadow-lg group"
              data-reveal="fade-up"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#e9f2ff] via-transparent to-[#f4fff8] pointer-events-none"></div>
              <div className="h-[360px] md:h-[420px] w-full">
                <iframe
                  title="SMRU Campus Location"
                  loading="lazy"
                  className="w-full h-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/?cid=2750098040667683919&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNl"
                ></iframe>
              </div>
              <div className="absolute left-4 bottom-4 px-3 py-1.5 bg-white/90 backdrop-blur rounded-md text-xs font-semibold text-[#0d315c] shadow">
                St. Mary’s Group • Deshmukhi
              </div>
              <div className="absolute inset-0 ring-1 ring-black/5 rounded-xl pointer-events-none"></div>
            </div>
          </div>

          {/* RIGHT FORM: exact NPF Enquiry Form shown INLINE */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#0d315c]">Enquiry Form</h2>
            <p className="mt-1 text-slate-600">
              Fill the form and our team will reach out shortly.
            </p>

            {/* Inline NPF widget container */}
            <div className="relative w-full h-[620px] md:h-[640px] mt-4">
              <div
                className="npf_wgts absolute inset-0"
                data-w={WIDGET_ID}
                data-height="620px"
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            {/* Optional secondary popup trigger under the inline form */}
            <div className="mt-4">
              <button
                onClick={openPopup}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-white ring-1 ring-slate-300 text-[#0d315c] font-semibold hover:bg-slate-50"
              >
                <i className="fa-solid fa-bolt"></i> Open Popup Form
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        :root { --ease-out: cubic-bezier(.22,.95,.36,1); }
        [data-reveal]{
          opacity:0; transform: translateY(14px); filter: blur(0);
          transition: opacity .7s var(--ease-out), transform .7s var(--ease-out), filter .7s var(--ease-out);
          transition-delay: var(--delay, 0s); will-change: opacity, transform;
        }
        [data-reveal].is-visible{ opacity:1; transform:none; filter: blur(0); }
        [data-reveal="fade-up"]{ transform: translateY(18px); }
        [data-reveal="fade-left"]{ transform: translateX(22px); }
        [data-reveal="fade-right"]{ transform: translateX(-22px); }
        [data-reveal="zoom-in"]{ transform: scale(.96); }
      `}</style>
    </>
  );
};

export default Contact;