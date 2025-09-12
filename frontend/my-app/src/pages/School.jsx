// UI-only: Schools pages styling refresh (solid colors, borders, hover shadows). No logic changes.
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";
const NAVY = "#0d315c";
const GREEN = "#009f6f";
const ORANGE = "#ffaf3a";
const WHITE = "#FFFFFF";

export default function School() {
  const { schoolSlug } = useParams();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/schools/${encodeURIComponent(schoolSlug)}/`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        if (alive) setSchool(data);
      } catch (e) {
        setErr("School not found.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [schoolSlug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="rounded-2xl p-6 shadow-sm border bg-white border-[#ffaf3a]">
          <div className="h-6 w-2/3 bg-slate-200/70 rounded animate-pulse" />
        </div>
        <div className="rounded-2xl overflow-hidden shadow-sm border mt-8 bg-white border-[#0d315c]">
          <div className="p-6 border-b border-warning">
            <div className="h-5 w-32 bg-slate-200/70 rounded animate-pulse" />
          </div>
          <div className="p-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-28 bg-slate-200/70 rounded animate-pulse" />)}
          </div>
        </div>
      </div>
    );
  }

  if (err || !school) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-2xl p-6 shadow-sm border bg-white border-[#0d315c]">
          <h1 className="text-lg font-bold text-[#0d315c]">School not found.</h1>
          <div className="mt-4">
            <Link to="/schools" className="px-4 py-2 rounded-xl font-semibold text-[#0d315c] border-2 border-[#0d315c] bg-white">
              ← Back to All Schools
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const schoolSlugSafe = school.slug;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="rounded-xl p-6 shadow-lg bg-[#0d315c] text-white border-b-4 border-[#ffaf3a]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">{school.name}</h1>
            {school.about ? <p className="mt-2 text-white/90">{school.about}</p> : null}
          </div>
          <div className="flex gap-2">
            <Link to="/schools" className="px-4 py-2 rounded-xl font-semibold bg-warning text-white hover:bg-warning/90">
              ← All Schools
            </Link>
            <a href="https://admissions.smru.in" target="_blank" rel="noopener noreferrer"
               className="px-4 py-2 rounded-xl font-semibold bg-white text-primary hover:bg-slate-100">
              Apply / Enquire
            </a>
          </div>
        </div>
      </div>

      <section className="rounded-xl overflow-hidden shadow-sm ring-1 ring-slate-300 mt-8 bg-white">
        <div className="p-6 border-b border-accent/40">
          <h2 className="text-xl font-bold text-[#0d315c]">Departments</h2>
          <p className="mt-1 text-sm text-[#0d315c]">Choose a department to view its programs.</p>
        </div>
        <div className="p-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {(school.departments || []).map((dept) => (
            <Link key={dept.slug} to={`/schools/${schoolSlugSafe}/${dept.slug}`}
              className="block rounded-xl p-5 bg-white ring-1 ring-slate-300 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30">
              <div className="h-1.5 rounded bg-success" />
              <div className="mt-3 text-lg font-bold text-[#0d315c]">{dept.name}</div>
              {(dept.about || dept.description) && <p className="mt-2 text-sm text-[#0d315c]">{dept.about || dept.description}</p>}
              <div className="mt-3 text-xs font-semibold text-[#0d315c]">
                {(dept.programs || []).length} {(dept.programs || []).length === 1 ? "Program" : "Programs"}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
