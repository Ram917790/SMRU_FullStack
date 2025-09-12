// Careers.jsx — UI-only refinements: spacing, contrast, focus-visible; no logic changes.
const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

import React, { useEffect, useMemo, useState } from "react";
import { FiUsers, FiAward, FiBookOpen, FiTrendingUp, FiMapPin, FiMail, FiGlobe, FiHeart, FiMonitor, FiUserCheck } from "react-icons/fi";

const PLACEHOLDER = `data:image/svg+xml;utf8,` + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480">
    <rect width="100%" height="100%" fill="#e5e7eb"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="Arial, sans-serif" font-size="18" fill="#6b7280">
      Image coming soon
    </text>
  </svg>`
);

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

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [modalJob, setModalJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/jobs/`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        if (!alive) return;
        setJobs(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        setErr("Couldn't load jobs right now.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(jobs.map(j => j.category_name).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [jobs]);

  const visible = useMemo(() => {
    if (filter === "All") return jobs;
    return jobs.filter(j => j.category_name === filter);
  }, [jobs, filter]);

  const tabClass = (cat) =>
    `rounded-full px-6 py-2 text-sm font-semibold transition border-2 
     ${filter === cat ? "bg-[#019e6e] text-white border-[#019e6e] shadow"
                      : "bg-gray-50 text-[#0d315c] border-[#019e6e] hover:bg-[#019e6e] hover:text-white"}`;

  return (
    <section className="w-full bg-gray-50">
      {/* HERO */}
      <section className="relative w-full min-h-[48vh] bg-[radial-gradient(1200px_600px_at_15%_10%,rgba(255,255,255,0.12)_0,transparent_60%),linear-gradient(135deg,#0d315c_0%,#0b3a7a_50%,#019e6e_100%)]">
        <div className="max-w-6xl mx-auto px-4 pt-28 md:pt-32 pb-12 flex flex-col items-center justify-center text-center">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.35)]">Careers at SMRU</h1>
          <p className="mt-3 max-w-3xl text-white/95 text-lg md:text-xl text-balance">Join India's leading university dedicated to rehabilitation and allied health sciences.</p>
          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
            <span className="inline-block bg-[#019e6e] text-white px-6 py-2 rounded-full font-semibold shadow-lg text-base">
              {loading ? "Loading openings..." : `${jobs.length}+ roles open`}
            </span>
            <span className="inline-block bg-warning text-white px-6 py-2 rounded-full font-semibold shadow-lg text-base">
              Be part of our mission to empower lives.
            </span>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-2 gap-6 md:grid-cols-4">
        {fallbackBenefits.map((b, i) => (
          <div key={`${b.text}-${i}`} className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl transition">
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
                <button key={cat} className={`${tabClass(cat)} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#019e6e]/40`} onClick={() => setFilter(cat)}>{cat}</button>
              ))}
            </div>
          </div>

          {err && <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800">{err}</div>}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-200 p-7">
                  <div className="h-5 w-2/3 bg-slate-200/70 rounded animate-pulse" />
                  <div className="h-3 w-1/3 mt-3 bg-slate-200/70 rounded animate-pulse" />
                  <div className="h-16 w-full mt-4 bg-slate-200/70 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {visible.length === 0 && (
                <div className="col-span-full text-center text-base text-[#970c0c] py-8 font-semibold">
                  No openings in this category currently.
                </div>
              )}
              {visible.map((job) => (
                <div key={job.id} className="bg-gradient-to-br from-[#f8fafc] to-[#e6f7f1] rounded-xl border border-gray-200 p-7 flex flex-col justify-between shadow hover:shadow-xl transition focus-within:ring-2 focus-within:ring-[#0d315c]/20">
                  <div>
                    <h3 className="text-xl font-bold text-[#0d315c] mb-1">{job.title}</h3>
                    <p className="flex items-center gap-2 text-sm font-semibold text-[#019e6e] mb-2">
                      <FiMapPin className="text-base" /> {job.location || "—"}
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
                    type="button"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* JOB MODAL */}
      {modalJob && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-3" onClick={() => setModalJob(null)}>
          <div className="bg-white rounded-2xl p-8 relative w-full max-w-lg shadow-2xl border border-gray-200" onClick={(e) => e.stopPropagation()}>
            <button className="absolute right-4 top-4 w-8 h-8 rounded-full bg-warning text-white font-bold hover:bg-yellow-500 shadow" onClick={() => setModalJob(null)} aria-label="Close">×</button>
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
              {(modalJob.details || []).length ? modalJob.details.map((d, i) => <li key={i}>{d}</li>) : <li>No details provided.</li>}
            </ul>
            <div className="mt-8 flex flex-col md:flex-row items-center gap-3">
              <a href={`mailto:reach@smru.in?subject=Application%20for%20${encodeURIComponent(modalJob.title)}`} className="inline-block bg-[#019e6e] hover:bg-[#0fa571] text-white px-6 py-2 rounded-md font-semibold transition shadow" target="_blank" rel="noopener noreferrer">Apply via Email</a>
              <span className="text-sm text-gray-500">Please mention the job title in your email.</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        :root { --ease-out: cubic-bezier(.22,.95,.36,1); }
        [data-reveal]{ opacity:0; transform: translateY(14px); transition: opacity .7s var(--ease-out), transform .7s var(--ease-out); transition-delay: var(--delay, 0s); will-change: opacity, transform; }
        [data-reveal].is-visible{ opacity:1; transform:none; }
      `}</style>
    </section>
  );
}
