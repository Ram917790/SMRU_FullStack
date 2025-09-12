// UI-only: Schools pages styling refresh (solid colors, borders, hover shadows). No logic changes.
import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";
const NAVY = "#0d315c";
const GREEN = "#009f6f";
const ORANGE = "#ffaf3a";
const WHITE = "#FFFFFF";

const slugify = (s = "") =>
  s.toString().trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default function Schools() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/schools/`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        if (!alive) return;
        setSchools(Array.isArray(data.schools) ? data.schools : []);
      } catch (e) {
        setErr("Couldn't load schools right now.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const items = useMemo(() => (schools || []).map((s) => ({
    ...s,
    slug: s.slug || slugify(s.name),
    deptCount: s.departments?.length || 0,
    programCount: s.departments?.reduce((n, d) => n + (d.programs?.length || 0), 0) || 0,
  })), [schools]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="rounded-xl p-6 shadow-lg bg-[#0d315c] text-white border-b-4 border-[#ffaf3a]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="inline-block h-2 w-8 rounded-full bg-warning/90" />
            <h1 className="text-2xl md:text-3xl font-extrabold">
              Schools at St. Mary’s Rehabilitation University
            </h1>
            <p className="mt-2 text-sm text-white/90">
              Pick a school from the sidebar or cards. Yellow badges show quick counts.
            </p>
          </div>
          <a href="https://admissions.smru.in" target="_blank" rel="noopener noreferrer"
             className="px-4 py-2 rounded-xl font-semibold bg-warning text-white hover:bg-warning/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
            Apply / Enquire
          </a>
        </div>
      </div>

      {err && <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800">{err}</div>}

      <div className="mt-4 md:hidden">
        <button onClick={() => setOpenSidebar(!openSidebar)} className="w-full px-4 py-2 rounded-xl font-semibold border-2 border-[#0d315c] text-[#0d315c] bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c]/50">
          {openSidebar ? "Hide Schools ▲" : "Show Schools ▼"}
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[260px,1fr]">
        <aside className={`${openSidebar ? "block" : "hidden"} md:block h-max`}>
          <div className="rounded-lg p-4 bg-white shadow-sm ring-1 ring-slate-300">
            <div className="text-xs font-bold tracking-wide text-[#0d315c]">SCHOOLS</div>
            <ul className="mt-3 space-y-2">
              {(loading ? Array.from({ length: 5 }) : items).map((s, i) => (
                <li key={s?.slug || i}>
                  {loading ? (
                    <div className="h-9 rounded-lg bg-slate-200/70 animate-pulse" />
                  ) : (
                    <NavLink to={`/schools/${s.slug}`}
                      className={({ isActive }) => {
                        const ringColor = i % 3 === 0 ? "ring-[#009f6f]/30" : i % 3 === 1 ? "ring-[#ffaf3a]/30" : "ring-[#0d315c]/20";
                        return [
                          "block rounded-lg px-3 py-2 text-sm font-semibold transition ring-1",
                          isActive ? "bg-[#009f6f] text-white shadow-sm ring-[#009f6f]" : `bg-white text-[#0d315c] hover:shadow-sm ${ringColor}`
                        ].join(" ");
                      }}
                    >
                      {s.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section>
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl p-5 shadow-sm ring-1 ring-slate-300 bg-white">
                  <div className="h-5 w-1/2 bg-slate-200/70 rounded animate-pulse" />
                  <div className="h-16 w-full mt-3 bg-slate-200/70 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2">
              {items.map((s, i) => {
                const stripe = i % 3 === 0 ? "bg-success/90" : i % 3 === 1 ? "bg-warning/90" : "bg-success/80";
                return (
                <Link key={s.slug} to={`/schools/${s.slug}`} className={`block rounded-xl p-5 bg-white ring-1 ring-slate-300 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success`} aria-labelledby={`school-${s.slug}`}>
                  <div className={`h-1.5 w-full rounded-full ${stripe}`} />
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <h2 id={`school-${s.slug}`} className="text-lg md:text-xl font-semibold text-slate-900 truncate">{s.name}</h2>
                    <span className="text-[11px] px-2 py-1 rounded-full bg-warning/10 text-[#0d315c] ring-1 ring-warning/30">
                      {s.deptCount} Dept{s.deptCount === 1 ? "" : "s"}
                    </span>
                  </div>
                  {s.about && <p className="mt-2 md:mt-3 text-sm md:text-base leading-relaxed line-clamp-3 text-slate-700">{s.about}</p>}
                  <div className="mt-4 flex flex-wrap gap-2 text-xs md:text-sm">
                    <span className="px-2 py-1 rounded-full font-semibold bg-success/10 text-[#0d315c] ring-1 ring-success/30">
                      Programs: {s.programCount}
                    </span>
                    <span className="px-2 py-1 rounded-full font-semibold bg-accent/10 text-[#0d315c] ring-1 ring-accent/30">
                      View departments →
                    </span>
                  </div>
                </Link>
              );})}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
