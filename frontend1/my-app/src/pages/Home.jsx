// C:\Projects\my_fullstack_app\frontend1\my-app\src\pages\Home.jsx
import React, { useState, useCallback, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/herosection.jpg";
import useOpenApply from "../hooks/useOpenApply";
import {
  FaAward,
  FaHeartbeat,
  FaHandsHelping,
  FaChartLine,
  FaQuoteLeft,
  FaShieldAlt,
  FaBrain,
  FaStethoscope,
  FaChalkboardTeacher,
  FaUsers,
  FaBullseye,
  FaBolt,
} from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";

/* ---------------- Accordion (NO animation) ---------------- */
const Accordion = memo(function Accordion({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = open === idx;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-[#e6f2ff] bg-white shadow-sm"
          >
            <button
              className="w-full flex justify-between items-center p-4 md:p-5 text-left font-semibold text-[#0d315c]"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${idx}`}
              onClick={() => setOpen(isOpen ? null : idx)}
            >
              <span className="pr-6">{faq.question}</span>
              <span className="text-[#ffaf3a] text-2xl font-bold leading-none">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div
                id={`faq-panel-${idx}`}
                className="px-4 md:px-5 pb-4 md:pb-5"
              >
                <p className="text-slate-700 text-sm md:text-[15px] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

/* =============================== Page =============================== */
export default function Home() {
  const navigate = useNavigate();
  const openApplyModal = useOpenApply();

  // On-scroll reveal (lightweight AOS) — keep globally, but we won't use it in FAQ section.
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

  const testimonialData = [
    {
      quote:
        "At SMRU, I help learners find their voice—combining therapy and technology to improve speech and hearing outcomes.",
      name: "Raveeti Shiva Deekshith",
      role: "Senior Clinician",
      course: "Dept. of Audiology & Speech-Language Pathology",
    },
    {
      quote:
        "We integrate clinical psychology training with compassionate care so students learn to support mental health with evidence-based practice.",
      name: "Dhanavath Anil Kumar",
      role: "Senior Clinician",
      course: "Dept. of Clinical Psychology",
    },
    {
      quote:
        "Guiding students to understand behavior and build resilience is the most rewarding part of my work at SMRU.",
      name: "Rida Subhan",
      role: "Senior Clinician",
      course: "Dept. of Psychology",
    },
    {
      quote:
        "Occupational therapy here is purpose-driven—every session focuses on independence in real-life activities.",
      name: "Rosalin Singh",
      role: "Senior Clinician",
      course: "Dept. of Occupational Therapy",
    },
    {
      quote:
        "SMRU's collaborative clinics let us tailor interventions that restore dignity and daily function.",
      name: "Gunichetty Joshna Priya",
      role: "Senior Clinician",
      course: "Dept. of Occupational Therapy",
    },
    {
      quote:
        "Rehabilitation is about confidence as much as mobility; our physiotherapy labs turn progress into possibility.",
      name: "Kumpati Venkateswara Rao",
      role: "Senior Clinician",
      course: "Dept. of Physiotherapy",
    },
    {
      quote:
        "At the Special School, we create structured, loving environments where neurodivergent children learn, play, and thrive.",
      name: "Netinti Hemalatha",
      role: "Principal",
      course: "Special School for Neurodevelopmental Disorders",
    },
  ];


  const [index, setIndex] = useState(0);
  const total = testimonialData.length;
  const next = useCallback(() => setIndex((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setIndex((p) => (p - 1 + total) % total), [total]);

  const campusItems = [
    { icon: <FaShieldAlt />, title: "Modern Hostels", desc: "Comfortable and secure accommodation with 24/7 surveillance." },
    { icon: <GiRunningShoe />, title: "Sports Complex", desc: "Advanced sports facilities that promote holistic fitness." },
    { icon: <FaBrain />, title: "Advanced Labs", desc: "State-of-the-art laboratories equipped for research and clinical training." },
    { icon: <FaStethoscope />, title: "Wellness Center", desc: "Comprehensive health and wellness support." },
    { icon: <FaBullseye />, title: "Green Spaces", desc: "Eco-friendly campus featuring meditation gardens." },
    { icon: <FaBolt />, title: "Innovation Hub", desc: "Technology-driven facilities that support modern learning." },
  ];

  const faqs = [
    { question: "What programs are offered at SMRU?", answer: "SMRU offers undergraduate, postgraduate, and doctoral programs in rehabilitation and allied health." },
    { question: "Is campus accommodation available?", answer: "Yes, modern hostels are available with 24/7 security and Wi-Fi." },
    { question: "How can I apply for admission?", answer: "You can apply online or use the Quick Enquiry form. Our team will assist you throughout the process." },
    { question: "Are scholarships available?", answer: "Both merit-based and need-based scholarships are available." },
    { question: "Is SMRU recognized by government bodies?", answer: "SMRU is a private university established under the Telangana State Private Universities Act, 2018." },
    { question: "What kind of placement support is available?", answer: "A dedicated placement cell provides guidance, internships, and recruitment drives." },
  ];

  const handleDownloadBrochure = useCallback(() => {
    window.open("/brochure.pdf", "_blank");
  }, []);

  return (
    <>
      {/* ========================= HERO (UNCHANGED layout, NEW caption) ========================= */}
      <section className="relative w-full h-[100svh] min-h-[560px] overflow-hidden dark:bg-slate-900">
        <img
          src={heroImg}
          alt="SMRU – Rehabilitation Empowerment"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-black/45 to-transparent" />

        <div className="absolute left-6 sm:left-8 md:left-12 top-[14vh] sm:top-[12vh] md:top-[10vh] z-10">
          <div className="max-w-[46rem]">
            <div className="flex items-start gap-3">
              <span
                className="hidden md:block w-1.5 h-14 bg-[#ffaf3a] rounded-full mt-2"
                data-reveal="fade-right"
                style={{ "--delay": "0.05s" }}
              />
              <h1
                className="text-white font-extrabold tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)] text-[8vw] sm:text-[6.5vw] md:text-6xl lg:text-[64px] md:whitespace-nowrap leading-[1.05]"
                data-reveal="fade-up"
              >
                Empowering Through
                <span className="text-[#FFAF3A]"> Rehabilitation.</span>
              </h1>
            </div>

            {/* NEW: clean caption directly under the heading */}
            <p
              className="mt-3 text-white/95 text-base sm:text-lg md:text-xl leading-relaxed"
              data-reveal="fade-up"
              style={{ "--delay": "0.1s" }}
            >
              Study Physiotherapy, Psychology, BASLP, and more — with <span className="font-semibold">clinical training from day one</span>, dedicated mentors, and placements with leading rehabilitation centers.
            </p>

            {/* Kept your pill strip? If you prefer only one caption, you can remove this block. */}
            <div
              className="mt-3 inline-flex rounded-xl bg-black/30 backdrop-blur-[2px] px-4 py-2 shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
              data-reveal="fade-up"
              style={{ "--delay": "0.16s" }}
            >
            </div>

            {/* <div className="mt-6 flex flex-wrap gap-3" data-reveal="fade-up" style={{ "--delay": "0.22s" }}>
              <button
                onClick={openApplyModal}
                className="px-6 py-3 rounded-xl font-semibold bg-[#019e6e] text-white shadow-lg hover:bg-[#0fa571] focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                Apply Now
              </button>
              <button
                onClick={handleDownloadBrochure}
                className="px-6 py-3 rounded-xl font-semibold bg-white text-[#0d315c] shadow-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                Download Brochure
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE ====================== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-[#0d315c]" data-reveal="fade-up">
            Why Choose SMRU?
          </h2>
          <div className="mx-auto mt-2 h-1.5 w-20 rounded-full bg-[#ffaf3a]" data-reveal="fade-up" style={{ "--delay": "0.05s" }} />
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto" data-reveal="fade-up" style={{ "--delay": "0.1s" }}>
            Discover what makes us the preferred choice.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaHeartbeat />, title: "Rehab-Focused Curriculum", desc: "Specialized programs tailored to the needs of rehabilitation and allied health sciences." },
              { icon: <FaHandsHelping />, title: "Clinical Training & Outreach", desc: "Real-world training integrated with community outreach and clinical exposure." },
              { icon: <FaAward />, title: "29+ Years of Experience", desc: "A proven track record of excellence since 1996." },
              { icon: <FaChartLine />, title: "Top Placement Record", desc: "Consistent placement of graduates in leading healthcare organizations." },
            ].map((item, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-center flex flex-col items-center border border-[#e6f2ff]"
                data-reveal="fade-up"
                style={{ "--delay": `${0.08 + i * 0.06}s` }}
              >
                <div className="h-20 w-20 rounded-2xl bg-[#019e6e]/10 text-[#019e6e] grid place-items-center text-4xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0d315c]">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================== TEACHING TECHNIQUES ================= */}
      <section className="py-16 bg-[#f5f9ff]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-[#0d315c]" data-reveal="fade-up">
            Teaching Techniques at SMRU
          </h2>
          <div className="mx-auto mt-2 h-1.5 w-20 rounded-full bg-[#ffaf3a]" data-reveal="fade-up" style={{ "--delay": "0.05s" }} />
          <p
            className="mt-4 text-slate-600 max-w-3xl mx-auto"
            data-reveal="fade-up"
            style={{ "--delay": "0.08s" }}
          >
            We follow advanced, practice-based teaching methods to ensure students gain hands-on experience and a deep understanding of their field.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaBrain />, title: "Activity-Based Therapy", desc: "Practical, functional tasks that enhance learning and skill development." },
              { icon: <FaStethoscope />, title: "Simulation-Based Practice", desc: "Realistic clinical simulations to prepare students for real-world scenarios." },
              { icon: <FaChalkboardTeacher />, title: "Multisensory Learning", desc: "Utilizing various tools and techniques to engage all senses in the learning process." },
              { icon: <FaUsers />, title: "Peer-Led Case Discussions", desc: "Collaborative discussions that encourage critical thinking and teamwork." },
            ].map((item, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-center flex flex-col items-center border border-[#e6f2ff]"
                data-reveal="fade-up"
                style={{ "--delay": `${0.08 + i * 0.06}s` }}
              >
                <div className="h-20 w-20 rounded-2xl bg-[#019e6e]/10 text-[#019e6e] grid place-items-center text-4xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0d315c]">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =================== WORLD-CLASS CAMPUS ================== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-[#0d315c]" data-reveal="fade-up">
            World-Class Campus
          </h2>
          <div className="mx-auto mt-2 h-1.5 w-20 rounded-full bg-[#ffaf3a]" data-reveal="fade-up" style={{ "--delay": "0.05s" }} />
          <p
            className="mt-4 text-slate-600 max-w-2xl mx-auto"
            data-reveal="fade-up"
            style={{ "--delay": "0.08s" }}
          >
            Experience learning in a state-of-the-art environment designed to foster academic and personal growth.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {campusItems.map((item, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-center flex flex-col items-center border border-[#e6f2ff]"
                data-reveal="fade-up"
                style={{ "--delay": `${0.08 + i * 0.06}s` }}
              >
                <div className="h-20 w-20 rounded-2xl bg-[#ffaf3a]/15 text-[#ffaf3a] grid place-items-center text-4xl mb-4">
                  {item.icon}
                </div>
                <h4 className="text-base font-semibold text-[#0d315c]">{item.title}</h4>
                <p className="mt-2 text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ===================== HOSTELS & ACCOMMODATION ===================== */}
      <section id="hostels" className="py-16 bg-[#f5f9ff]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#0d315c]" data-reveal="fade-up">
              On-Campus Hostels & Accommodation
            </h2>
            <div
              className="mx-auto mt-2 h-1.5 w-20 rounded-full bg-[#ffaf3a]"
              data-reveal="fade-up"
              style={{ "--delay": "0.05s" }}
            />
            <p
              className="mt-4 text-slate-600 max-w-3xl mx-auto"
              data-reveal="fade-up"
              style={{ "--delay": "0.08s" }}
            >
              Comfortable, safe, and student-friendly hostels with dedicated wardens, study spaces, and
              easy access to labs, library, and sports facilities.
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaShieldAlt />,
                title: "24×7 Security",
                desc: "CCTV coverage, gated entry, and resident wardens for round-the-clock safety.",
                delay: 0.10,
              },
              {
                icon: <FaUsers />,
                title: "Common Rooms",
                desc: "Well-ventilated lounges with study corners for group work and downtime.",
                delay: 0.16,
              },
              {
                icon: <FaBolt />,
                title: "Power Backup",
                desc: "Uninterrupted power with backup for lights, fans, and essential services.",
                delay: 0.22,
              },
              {
                icon: <GiRunningShoe />,
                title: "Fitness & Sports",
                desc: "Quick access to courts, tracks, and the wellness centre for a healthy routine.",
                delay: 0.28,
              },
            ].map((item, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all border border-[#e6f2ff] text-center flex flex-col items-center"
                data-reveal="fade-up"
                style={{ "--delay": `${item.delay}s` }}
              >
                <div className="h-20 w-20 rounded-2xl bg-[#019e6e]/10 text-[#019e6e] grid place-items-center text-4xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0d315c]">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-12 rounded-2xl bg-[#0d315c] text-white p-8 md:p-10 flex flex-col md:flex-row gap-6 items-center justify-between"
            data-reveal="fade-up"
            style={{ "--delay": "0.26s" }}
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold">Need a Hostel Allotment?</h3>
              <p className="mt-2 text-white/80 max-w-2xl">
                Submit your hostel preference during admission or contact the accommodation office for
                current availability and fee details.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => (window.location.href = "https://admissions.smru.in")}
                className="bg-white text-[#0d315c] hover:bg-slate-100 px-5 py-2.5 rounded-md font-semibold transition"
              >
                Apply with Admission
              </button>
              {/* <button
                onClick={() => {
                  // If you have a dedicated page later, change this route.
                  // For now, keep consistent with your existing navigation pattern.
                  // e.g., navigate("/hostel")
                  alert("Contact Accommodation Office: hostels@smru.edu");
                }}
                className="bg-[#019e6e] hover:bg-[#0fa571] text-white px-5 py-2.5 rounded-md font-semibold transition"
              >
                Contact Hostels
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* ======================== TESTIMONIALS ======================== */}
      <section className="py-16 bg-[#f5f9ff]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-[#0d315c]" data-reveal="fade-up">
            Testimonials
          </h2>
          <div className="mx-auto mt-2 h-1.5 w-20 rounded-full bg-[#ffaf3a]" data-reveal="fade-up" style={{ "--delay": "0.05s" }} />
          <p
            className="mt-4 text-slate-600 max-w-2xl mx-auto"
            data-reveal="fade-up"
            style={{ "--delay": "0.08s" }}
          >
            Hear what our dedicated staff and students have to say about their experiences at SMRU.
          </p>

          <div
            className="mt-8 rounded-2xl p-8 shadow-sm bg-white border border-[#e6f2ff]"
            data-reveal="zoom-in"
            style={{ "--delay": "0.12s" }}
          >
            <FaQuoteLeft className="text-[#019e6e] text-3xl mx-auto mb-4 swap-fade" />
            <div key={index} className="swap-fade">
              <p className="text-lg italic text-slate-700 leading-relaxed">
                “{testimonialData[index].quote}”
              </p>
              <div className="mt-4">
                <h4 className="text-[#0d315c] font-semibold">
                  {testimonialData[index].name}
                </h4>
                <p className="text-[#019e6e] font-semibold">{testimonialData[index].role}</p>
                <p className="text-slate-600 text-sm">{testimonialData[index].course}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4" data-reveal="fade-up" style={{ "--delay": "0.18s" }}>
            <button
              aria-label="Previous Testimonial"
              className="h-10 w-10 border-2 border-[#019e6e] text-[#019e6e] rounded-full hover:bg-[#019e6e] hover:text-white transition"
              onClick={prev}
            >
              &lt;
            </button>
            <button
              aria-label="Next Testimonial"
              className="h-10 w-10 border-2 border-[#019e6e] text-[#019e6e] rounded-full hover:bg-[#019e6e] hover:text-white transition"
              onClick={next}
            >
              &gt;
            </button>
          </div>
        </div>
      </section>

      {/* ====================== FAQ / ENQUIRY (NO animations) ====================== */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Removed data-reveal from heading/underline/accordion wrapper */}
          <h2 className="text-3xl font-extrabold text-center text-[#0d315c]">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-2 h-1.5 w-20 rounded-full bg-[#ffaf3a]" />
          <div className="mt-8">
            <Accordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* ======================== CTA STRIP (navy) ======================== */}
      <section className="bg-[#ffaf3a] py-16 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold" data-reveal="fade-up">
          Ready to Shape Your Future?
        </h2>
        <div className="mx-auto mt-2 h-1.5 w-20 rounded-full bg-[#ffaf3a]" data-reveal="fade-up" style={{ "--delay": "0.05s" }} />
        <p className="mt-4 max-w-3xl mx-auto" data-reveal="fade-up" style={{ "--delay": "0.1s" }}>
          Explore our cutting-edge programs and start your journey today.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3" data-reveal="fade-up" style={{ "--delay": "0.16s" }}>
          <button
            className="bg-white text-[#0d315c] hover:bg-slate-100 px-5 py-2.5 rounded-md font-semibold transition"
            onClick={() => navigate("/departments")}
          >
            View All Programs
          </button>
          <button
            className="bg-[#019e6e] hover:bg-[#0fa571] text-white px-5 py-2.5 rounded-md font-semibold transition"
            onClick={() => navigate("/departments")}
          >
            Admissions Info
          </button>
        </div>
      </section>

      {/* -------- Inline styles for animations (kept; FAQ doesn't use them) -------- */}
      <style>{`
        :root { --ease-out: cubic-bezier(.22,.95,.36,1); }

        /* On-scroll reveal base */
        [data-reveal]{
          opacity:0;
          transform: translateY(12px);
          filter: blur(0);
          transition:
            opacity .7s var(--ease-out),
            transform .7s var(--ease-out),
            filter .7s var(--ease-out);
          transition-delay: var(--delay, 0s);
          will-change: opacity, transform;
        }
        [data-reveal].is-visible{ opacity:1; transform:none; filter: blur(0); }

        /* Variants */
        [data-reveal="fade-up"]{ transform: translateY(16px); }
        [data-reveal="fade-down"]{ transform: translateY(-16px); }
        [data-reveal="fade-left"]{ transform: translateX(-22px); }
        [data-reveal="fade-right"]{ transform: translateX(22px); }
        [data-reveal="zoom-in"]{ transform: scale(.96); }

        /* Testimonial swap animation */
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .swap-fade { animation: fadeSlide .55s var(--ease-out) both; }
      `}</style>
    </>
  );
}
