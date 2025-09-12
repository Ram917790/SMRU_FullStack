// UI-only: Schools pages styling refresh (solid colors, borders, hover shadows). No logic changes.
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";
const NAVY = "#0d315c";
const GREEN = "#009f6f";
const ORANGE = "#ffaf3a";
const WHITE = "#FFFFFF";

export default function Program() {
  const { schoolSlug, deptSlug, programSlug } = useParams();
  const [prog, setProg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/schools/${encodeURIComponent(schoolSlug)}/${encodeURIComponent(deptSlug)}/${encodeURIComponent(programSlug)}/`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        if (alive) setProg(data);
      } catch (e) {
        setErr("Program not found.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [schoolSlug, deptSlug, programSlug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="rounded-2xl p-6 shadow-sm border bg-white border-[#ffaf3a]">
          <div className="h-6 w-2/3 bg-slate-200/70 rounded animate-pulse" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 bg-slate-200/70 rounded animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (err || !prog) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-2xl p-6 shadow-sm border bg-white border-[#0d315c]">
          <h1 className="text-lg font-bold text-[#0d315c]">Program not found.</h1>
          <div className="mt-4">
            <Link to={`/schools/${schoolSlug}/${deptSlug}`} className="px-4 py-2 rounded-xl font-semibold text-[#0d315c] border-2 border-[#0d315c] bg-white">
              ← Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="rounded-xl p-6 shadow-lg bg-[#0d315c] text-white border-b-4 border-[#ffaf3a]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">{prog.name}</h1>
            {prog.level && <div className="text-sm font-semibold mt-1 text-white/90">{prog.level}</div>}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Link to={`/schools/${prog.school.slug}/${prog.department.slug}`} className="px-4 py-2 rounded-xl font-semibold w-full sm:w-auto text-center bg-warning text-white hover:bg-warning/90">
              ← {prog.department.name}
            </Link>
            <a href="https://admissions.smru.in" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl font-semibold w-full sm:w-auto text-center bg-white text-primary hover:bg-slate-100">
              Apply / Enquire
            </a>
          </div>
        </div>
      </div>

      <section className="rounded-xl p-6 bg-white ring-1 ring-slate-300 shadow-sm transition hover:shadow-lg">
        <h2 className="text-xl font-bold text-success">Program Overview</h2>
        {prog.overview ? (
          <p className="mt-3 leading-relaxed text-[#0d315c]">{prog.overview}</p>
        ) : (
          <p className="mt-3 text-[#0d315c]">Details coming soon.</p>
        )}
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {prog.duration && <span className="px-3 py-1 rounded-full font-semibold bg-secondary/10 text-[#0d315c] border border-secondary">Duration: {prog.duration}</span>}
          {prog.eligibility && <span className="px-3 py-1 rounded-full font-semibold bg-success/10 text-[#0d315c] border border-success">Eligibility: {prog.eligibility}</span>}
          {prog.fees && <span className="px-3 py-1 rounded-full font-semibold bg-accent/10 text-[#0d315c] border border-accent">Tuition: {prog.fees}</span>}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {prog.eligibility && <section className="rounded-xl p-6 bg-white ring-1 ring-slate-300 shadow-sm transition hover:shadow-lg"> 
          <h3 className="text-lg font-bold text-[#0d315c]">Eligibility</h3>
          <p className="mt-2 leading-relaxed text-[#0d315c]">{prog.eligibility}</p>
        </section>}
        {prog.duration && <section className="rounded-xl p-6 bg-white ring-1 ring-slate-300 shadow-sm transition hover:shadow-lg">
          <h3 className="text-lg font-bold text-[#0d315c]">Duration</h3>
          <p className="mt-2 leading-relaxed text-[#0d315c]">{prog.duration}</p>
        </section>}
        {prog.fees && <section className="rounded-xl p-6 bg-white ring-1 ring-slate-300 shadow-sm transition hover:shadow-lg">
          <h3 className="text-lg font-bold text-[#0d315c]">Tuition Fee</h3>
          <p className="mt-2 leading-relaxed text-[#0d315c]">{prog.fees}</p>
        </section>}
        {prog.outcomes && <section className="rounded-xl p-6 bg-white ring-1 ring-slate-300 shadow-sm transition hover:shadow-lg">
          <h3 className="text-lg font-bold text-[#0d315c]">Career Outcomes</h3>
          <p className="mt-2 leading-relaxed text-[#0d315c]">{prog.outcomes}</p>
        </section>}
      </div>

      {Array.isArray(prog.specializations) && prog.specializations.length > 0 && (
        <section className="rounded-xl p-6 mt-6 bg-white ring-1 ring-slate-300 shadow-sm transition hover:shadow-lg">
          <h3 className="text-lg font-bold text-[#0d315c]">Specializations</h3>
          <ul className="mt-3 grid sm:grid-cols-2 gap-2">
            {prog.specializations.map((s, i) => (
              <li key={i} className="px-3 py-1 rounded-full font-semibold border text-[#0d315c] border-[#0d315c] bg-white">
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}

      {prog.accreditation && (
        <section className="rounded-xl p-6 shadow-sm ring-1 ring-slate-300 mt-6 bg-white">
          <h3 className="text-lg font-bold text-[#0d315c]">Accreditation / Recognition</h3>
          <p className="mt-2 leading-relaxed text-[#0d315c]">{prog.accreditation}</p>
        </section>
      )}
    </div>
  );
}
