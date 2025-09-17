// Contact.jsx — UI-only refinements: spacing, focus-visible, container widths; no logic changes.
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

  // Initialize Meritto form with official script
  useEffect(() => {
    // Inject the official Meritto script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://widgets.in4.nopaperforms.com/emwgts.js";
    document.body.appendChild(script);
    
    console.log('Meritto script injected successfully');
    
    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src*="emwgts.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
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
        <div className="max-w-7xl mx-auto px-4">
          {/* TOP SECTION: Get in Touch + Enquiry Form */}
          <div className="grid gap-8 lg:grid-cols-2 mb-12">
            {/* LEFT: Get in Touch */}
            <div className="bg-white rounded-xl shadow-lg p-8" data-reveal="fade-right">
              <h2 className="text-3xl font-bold text-[#0d315c] mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                We're here to help you on your educational journey. Whether you
                have questions about courses, admissions, or campus life, we're
                ready to assist.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0d315c] mb-2">Our Address</h3>
                    <p className="text-gray-700 leading-relaxed">
                      St. Mary's Rehabilitation University<br />
                      Near Ramoji Film City,<br />
                      Deshmukhi (V), Pochampally (M), Yadadri Bhongir (DT),<br />
                      PIN: 508284
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0d315c] mb-2">Phone</h3>
                    <div className="space-y-1">
                      <p className="text-gray-700">
                        General: <a href="tel:+91-7331119430" className="text-[#0d315c] hover:underline font-medium">+91-7331119430</a>
                      </p>
                      <p className="text-gray-700">
                        WhatsApp: <a href="tel:+91-7331119431" className="text-[#0d315c] hover:underline font-medium">+91-7331119431</a>
                      </p>
                      <p className="text-gray-700">
                        Admissions: <a href="tel:+91-7331119432" className="text-[#0d315c] hover:underline font-medium">+91-7331119432</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0d315c] mb-2">Email</h3>
                    <p className="text-gray-700">
                      General: <a href="mailto:reach@smru.in" className="text-[#0d315c] hover:underline font-medium">reach@smru.in</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Info cards */}
              <div className="grid gap-4 mt-8 md:grid-cols-2">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#0d315c] mb-2">Office Hours</h4>
                  <p className="text-sm text-gray-700">
                    Mon - Sat: 9:30 AM - 5:00 PM<br />
                    Sun: Closed
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#0d315c] mb-2">Emergency Contact</h4>
                  <p className="text-sm text-gray-700">
                    Campus Security (24/7):<br />
                    <a href="tel:+919010455590" className="text-[#0d315c] hover:underline font-medium">+91 90104-55590</a>
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Enquiry Form */}
            <div className="bg-white rounded-xl shadow-lg p-8" data-reveal="fade-left">
              <h2 className="text-3xl font-bold text-[#0d315c] mb-2">Enquiry Form</h2>
              <p className="text-gray-600 mb-6">
                Fill the form and our team will reach out shortly.
              </p>

              {/* Official Meritto Form */}
              <div className="w-full h-[620px] md:h-[640px]">
                <div 
                  className="npf_wgts w-full h-full rounded-lg border border-gray-200" 
                  data-height="620px" 
                  data-w="1724ed5dcfaa2cb0aabd46c4d9c7d8df"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>

              {/* Optional secondary popup trigger */}
              <div className="mt-4">
                <button
                  onClick={openPopup}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-gradient-to-r from-[#0d315c] to-[#019e6e] text-white font-semibold hover:from-[#0a2a4a] hover:to-[#017a5a] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c]/30"
                >
                  <i className="fa-solid fa-bolt"></i> Open Popup Form
                </button>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: Map + How to Reach */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* LEFT: Map */}
            <div data-reveal="fade-up">
              <h3 className="text-2xl font-bold text-[#0d315c] mb-6">Campus Location</h3>
              <div className="relative rounded-xl overflow-hidden shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e9f2ff] via-transparent to-[#f4fff8] pointer-events-none"></div>
                <div className="h-[400px] w-full">
                  <iframe
                    title="SMRU Campus Location"
                    loading="lazy"
                    className="w-full h-full border-0"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent("St. Mary's Rehabilitation University, Deshmukhi, Telangana 508284")}&output=embed`}
                  ></iframe>
                </div>
                <div className="absolute left-4 bottom-4 px-3 py-1.5 bg-white/90 backdrop-blur rounded-md text-xs font-semibold text-[#0d315c] shadow">
                  St. Mary's Group • Deshmukhi
                </div>
                <div className="absolute inset-0 ring-1 ring-black/5 rounded-xl pointer-events-none"></div>
              </div>
              <div className="mt-3">
                <a 
                  href="https://www.google.com/maps/place/Deshmukhi+SMRU" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-[#0d315c] hover:underline font-medium"
                >
                  <span>Open in Google Maps</span>
                  <i className="fa-solid fa-external-link-alt text-xs"></i>
                </a>
              </div>
            </div>

            {/* RIGHT: How to Reach */}
            <div data-reveal="fade-up" style={{ "--delay": "0.08s" }}>
              <h3 className="text-2xl font-bold text-[#0d315c] mb-6">How to Reach SMRU</h3>
              
              <div className="space-y-4">
                {/* From Airport */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <span className="text-2xl">✈️</span>
                    </div>
                    <h4 className="text-lg font-semibold text-[#0d315c]">From Airport</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Rajiv Gandhi International Airport (HYD)</strong><br/>
                    Distance: ~45 km | Time: 1.5-2 hours
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    <strong>Route:</strong> Airport → Outer Ring Road → Yadadri Road → Deshmukhi
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://www.uber.com/in/ride/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-black text-white text-xs rounded-lg hover:bg-gray-800 transition font-medium"
                    >
                      🚗 Uber
                    </a>
                    <a
                      href="https://www.olacabs.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-500 text-white text-xs rounded-lg hover:bg-yellow-600 transition font-medium"
                    >
                      🚕 Ola
                    </a>
                    <a
                      href="https://rapido.bike/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition font-medium"
                    >
                      🏍️ Rapido
                    </a>
                  </div>
                </div>

                {/* From Railway Station */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <span className="text-2xl">🚂</span>
                    </div>
                    <h4 className="text-lg font-semibold text-[#0d315c]">From Railway Station</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Secunderabad Railway Station</strong><br/>
                    Distance: ~35 km | Time: 1-1.5 hours
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    <strong>Route:</strong> Station → Secunderabad → Outer Ring Road → Yadadri Road → Deshmukhi
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://www.uber.com/in/ride/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-black text-white text-xs rounded-lg hover:bg-gray-800 transition font-medium"
                    >
                      🚗 Uber
                    </a>
                    <a
                      href="https://www.olacabs.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-500 text-white text-xs rounded-lg hover:bg-yellow-600 transition font-medium"
                    >
                      🚕 Ola
                    </a>
                    <a
                      href="https://rapido.bike/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition font-medium"
                    >
                      🏍️ Rapido
                    </a>
                  </div>
                </div>

                {/* From Metro */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <span className="text-2xl">🚇</span>
                    </div>
                    <h4 className="text-lg font-semibold text-[#0d315c]">From Metro</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Nearest Metro Station: Miyapur</strong><br/>
                    Distance: ~25 km | Time: 45-60 minutes
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    <strong>Route:</strong> Miyapur Metro → NH44 → Yadadri Road → Deshmukhi
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://www.uber.com/in/ride/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-black text-white text-xs rounded-lg hover:bg-gray-800 transition font-medium"
                    >
                      🚗 Uber
                    </a>
                    <a
                      href="https://www.olacabs.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-500 text-white text-xs rounded-lg hover:bg-yellow-600 transition font-medium"
                    >
                      🚕 Ola
                    </a>
                    <a
                      href="https://rapido.bike/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition font-medium"
                    >
                      🏍️ Rapido
                    </a>
                  </div>
                </div>

                {/* From Bus Stand */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <span className="text-2xl">🚌</span>
                    </div>
                    <h4 className="text-lg font-semibold text-[#0d315c]">From Bus Stand</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>MGBS (Mahatma Gandhi Bus Station)</strong><br/>
                    Distance: ~40 km | Time: 1.5-2 hours
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    <strong>Route:</strong> MGBS → Secunderabad → Outer Ring Road → Yadadri Road → Deshmukhi
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://www.uber.com/in/ride/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-black text-white text-xs rounded-lg hover:bg-gray-800 transition font-medium"
                    >
                      🚗 Uber
                    </a>
                    <a
                      href="https://www.olacabs.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-500 text-white text-xs rounded-lg hover:bg-yellow-600 transition font-medium"
                    >
                      🚕 Ola
                    </a>
                    <a
                      href="https://rapido.bike/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition font-medium"
                    >
                      🏍️ Rapido
                    </a>
                  </div>
                </div>
              </div>
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