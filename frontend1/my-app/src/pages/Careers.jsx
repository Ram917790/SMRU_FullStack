// src/pages/Careers.jsx
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiAward,
  FiBookOpen,
  FiTrendingUp,
  FiMapPin,
  FiMail,
  FiGlobe,
  FiActivity,
  FiEdit3,
  FiUserCheck,
  FiBriefcase,
  FiHeart,
  FiMonitor,
} from "react-icons/fi";

const fallbackBenefits = [
  { icon: <FiUsers aria-hidden />, text: "Supportive Team Culture" },
  { icon: <FiBookOpen aria-hidden />, text: "Growth & Research Opportunities" },
  { icon: <FiAward aria-hidden />, text: "Employee Wellness Benefits" },
  { icon: <FiTrendingUp aria-hidden />, text: "Career Development" },
  { icon: <FiGlobe aria-hidden />, text: "Global Collaboration" },
  { icon: <FiHeart aria-hidden />, text: "Inclusive & Diverse Environment" },
  { icon: <FiMonitor aria-hidden />, text: "Modern Infrastructure" },
  { icon: <FiUserCheck aria-hidden />, text: "Mentorship Programs" },
];

const iconForBenefit = (label = "") => {
  const t = label.toLowerCase();
  if (t.includes("culture")) return <FiUsers aria-hidden />;
  if (t.includes("research") || t.includes("growth")) return <FiBookOpen aria-hidden />;
  if (t.includes("wellness") || t.includes("benefit")) return <FiAward aria-hidden />;
  if (t.includes("career") || t.includes("development")) return <FiTrendingUp aria-hidden />;
  if (t.includes("global")) return <FiGlobe aria-hidden />;
  if (t.includes("inclusive") || t.includes("diverse")) return <FiHeart aria-hidden />;
  if (t.includes("infrastructure")) return <FiMonitor aria-hidden />;
  if (t.includes("mentorship")) return <FiUserCheck aria-hidden />;
  return <FiAward aria-hidden />;
};

const staticJobs = [
  // ... (unchanged job data)
  {
    id: 1,
    title: "Assistant Professor – Occupational Therapy",
    location: "Hyderabad",
    category_name: "Faculty",
    summary:
      "Teach and mentor students in Occupational Therapy, conduct research, and participate in curriculum development.",
    details: [
      "PhD or Master’s in Occupational Therapy",
      "Minimum 2 years teaching experience",
      "Strong research background",
      "Excellent communication skills",
    ],
  },
  // ... (rest of jobs unchanged)
  {
    id: 20,
    title: "Web Developer",
    location: "Hyderabad",
    category_name: "Technical",
    summary: "Develop and maintain university websites and web applications.",
    details: [
      "Bachelor’s in Computer Science/IT",
      "Experience with React, Node.js, and web standards",
      "Portfolio of web projects",
    ],
  },
];

export default function Careers() {
  const [filter, setFilter] = useState("All");
  const [categories, setCategories] = useState([
    "All",
    ...Array.from(new Set(staticJobs.map((j) => j.category_name))),
  ]);
  const [benefits, setBenefits] = useState(fallbackBenefits);
  const [jobs, setJobs] = useState(staticJobs);
  const [modalJob, setModalJob] = useState(null);

  // ---- Animations (IntersectionObserver) ----
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // ---- Helpers ----
  const onChangeFilter = (cat) => {
    setFilter(cat);
    if (cat === "All") {
      setJobs(staticJobs);
    } else {
      setJobs(staticJobs.filter((j) => j.category_name === cat));
    }
  };

  const tabClass = (cat) =>
    `rounded-full px-6 py-2 text-sm font-semibold transition border-2 
     ${
       filter === cat
         ? "bg-[#019e6e] text-white border-[#019e6e] shadow"
         : "bg-gray-50 text-[#0d315c] border-[#019e6e] hover:bg-[#019e6e] hover:text-white"
     }`;

  // ---- UI ----
  return (
    <section className="w-full bg-gray-50">
      {/* ===== HERO (restyled to match About.jsx hero) ===== */}
      <section
        className="relative w-full min-h-[48vh] bg-[radial-gradient(1200px_600px_at_15%_10%,rgba(255,255,255,0.12)_0,transparent_60%),linear-gradient(135deg,#0d315c_0%,#0b3a7a_50%,#019e6e_100%)]"
        data-reveal="fade-up"
      >
        <div className="max-w-6xl mx-auto px-4 pt-28 md:pt-32 pb-12 flex flex-col items-center justify-center text-center">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.35)]">
            Careers at SMRU
          </h1>
          <p
            className="mt-3 max-w-3xl text-white/95 text-lg md:text-xl"
            style={{ "--delay": "0.08s" }}
          >
            Join India's leading university dedicated to rehabilitation and allied health sciences.
          </p>

          {/* kept your badges exactly, just visually consistent spacing */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
            <span className="inline-block bg-[#019e6e] text-white px-6 py-2 rounded-full font-semibold shadow-lg text-base">
              Now hiring for 20+ roles!
            </span>
            <span className="inline-block bg-[#ffaf3a] text-white px-6 py-2 rounded-full font-semibold shadow-lg text-base">
              Be part of our mission to empower lives.
            </span>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-2 gap-6 md:grid-cols-4">
        {benefits.map((b, i) => (
          <div
            key={`${b.text}-${i}`}
            className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl transition"
            data-reveal="zoom-in"
            style={{ "--delay": `${i * 0.06}s` }}
          >
            <span className="text-4xl text-[#019e6e] mb-4 block">{b.icon}</span>
            <span className="text-base font-semibold text-[#0d315c]">{b.text}</span>
          </div>
        ))}
      </section>

      {/* WHY JOIN US */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-[#019e6e] to-[#0d315c] rounded-2xl shadow-lg p-10 text-white">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Why Join SMRU?</h2>
          <ul className="list-disc pl-8 space-y-2 text-lg">
            <li>Work with a passionate, multidisciplinary team making a real impact.</li>
            <li>Opportunities for research, innovation, and professional growth.</li>
            <li>State-of-the-art facilities and a vibrant campus life.</li>
            <li>Support for continuing education and skill development.</li>
            <li>Inclusive, diverse, and supportive work environment.</li>
            <li>Competitive compensation and comprehensive benefits.</li>
          </ul>
        </div>
      </section>

      {/* JOB OPENINGS */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-[#0d315c] tracking-tight">Current Openings</h2>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  className={tabClass(cat)}
                  onClick={() => onChangeFilter(cat)}
                  style={{ "--delay": `${i * 0.04}s` }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(!jobs || jobs.length === 0) && (
              <div className="col-span-full text-center text-base text-[#970c0c] py-8 font-semibold">
                No openings in this category currently.
              </div>
            )}
            {jobs.map((job, i) => (
              <div
                key={job.id ?? i}
                className="bg-gradient-to-br from-[#f8fafc] to-[#e6f7f1] rounded-xl border border-gray-200 p-7 flex flex-col justify-between shadow hover:shadow-xl transition"
                style={{ "--delay": `${i * 0.06}s` }}
              >
                <div>
                  <h3 className="text-xl font-bold text-[#0d315c] mb-1">{job.title}</h3>
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#019e6e] mb-2">
                    <FiMapPin className="text-base" />
                    {job.location}
                    {job.category_name && (
                      <span className="ml-2 bg-[#0d315c] text-white px-2 py-0.5 rounded-md text-xs">
                        {job.category_name}
                      </span>
                    )}
                  </p>
                  <p className="text-base text-gray-700 mb-3">{job.summary}</p>
                </div>
                <button
                  className="mt-2 inline-block bg-[#019e6e] hover:bg-[#0fa571] text-white px-5 py-2 rounded-full font-semibold transition shadow text-center w-max self-start focus:outline-none focus:ring-2 focus:ring-[#019e6e]"
                  onClick={() => setModalJob(job)}
                  aria-label={`View details for ${job.title}`}
                  tabIndex={0}
                  type="button"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOB MODAL */}
      {modalJob && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-3"
          onClick={() => setModalJob(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 relative w-full max-w-lg shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
            data-reveal="zoom-in"
          >
            <button
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[#ffaf3a] text-white font-bold hover:bg-yellow-500 shadow"
              onClick={() => setModalJob(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-[#0d315c] mb-2">{modalJob.title}</h3>
            <p className="flex items-center gap-2 text-base font-semibold text-[#019e6e] mb-2">
              <FiMapPin className="text-base" />
              {modalJob.location}
              {modalJob.category_name && (
                <span className="ml-2 bg-[#0d315c] text-white px-2 py-0.5 rounded-md text-xs">
                  {modalJob.category_name}
                </span>
              )}
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-base text-gray-700">
              {Array.isArray(modalJob.details) && modalJob.details.length ? (
                modalJob.details.map((d, i) => <li key={i}>{d}</li>)
              ) : (
                <li>No details provided.</li>
              )}
            </ul>
            <div className="mt-8 flex flex-col md:flex-row items-center gap-3">
              <a
                href={`mailto:reach@smru.in?subject=Application%20for%20${encodeURIComponent(
                  modalJob.title
                )}`}
                className="inline-block bg-[#019e6e] hover:bg-[#0fa571] text-white px-6 py-2 rounded-md font-semibold transition shadow"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply via Email
              </a>
              <span className="text-sm text-gray-500">
                Please mention the job title in your email.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT HR */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <div
          className="bg-gradient-to-r from-[#f8fafc] to-[#e6f7f1] border border-gray-200 rounded-2xl text-center p-8 shadow-lg"
          data-reveal="fade-up"
        >
          <h2 className="text-2xl font-bold text-[#0d315c] mb-3">Contact Careers Team</h2>
          <p className="text-base flex items-center justify-center gap-2 mb-2">
            <FiMail aria-hidden /> Email:
            <a href="mailto:reach@smru.in" className="font-semibold text-[#0d315c] hover:underline">
              reach@smru.in
            </a>
          </p>
          <p className="text-base text-[#0d315c]">
            St. Mary’s Rehabilitation University
            <br />
            Deshmuki, Hyderabad - 508284
          </p>
        </div>
      </section>

      {/* Inline reveal styles (same as About) */}
      <style>{`
        :root { --ease-out: cubic-bezier(.22,.95,.36,1); }
        [data-reveal]{
          opacity:0;
          transform: translateY(14px);
          transition:
            opacity .7s var(--ease-out),
            transform .7s var(--ease-out),
            filter .7s var(--ease-out);
          transition-delay: var(--delay, 0s);
          will-change: opacity, transform, filter;
          filter: blur(0);
        }
        [data-reveal].is-visible{ opacity:1; transform:none; filter: blur(0); }
        [data-reveal="fade-up"]{ transform: translateY(18px); }
        [data-reveal="fade-left"]{ transform: translateX(22px); }
        [data-reveal="fade-right"]{ transform: translateX(-22px); }
        [data-reveal="zoom-in"]{ transform: scale(.96); }
      `}</style>
    </section>
  );
}
