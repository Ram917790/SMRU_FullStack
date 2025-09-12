import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";
const placeHolder = "https://via.placeholder.com/640x480?text=Coming+Soon";
const cn = (...c) => c.filter(Boolean).join(" ");
const slugify = (s = "") =>
  s.toString().trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// UI-only changes: Leadership polish (tabs/cards hover, focus states, spacing). No logic changes.

function LeaderCard({ person, to }) {
  return (
    <Link
      to={to}
      className="group relative rounded-2xl bg-white ring-1 ring-slate-200 hover:ring-[#0d315c]/40 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 hover:-translate-y-0.5"
      aria-label={`View profile of ${person?.name || "Leader"}`}
    >
      <div className="px-4 pt-5">
        <div className="aspect-[4/5] overflow-hidden bg-slate-100 ring-1 ring-slate-200 rounded-t-2xl rounded-b-xl">
          <img
            src={person.image || placeHolder}
            alt={`${person.name || "Profile"} – ${person.role || "Leader"}`}
            onError={(e)=>{e.currentTarget.src = placeHolder;}}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] group-hover:brightness-95"
            loading="lazy" decoding="async"
          />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 leading-tight tracking-[0.1px]">{person.name}</h3>
        <p className="mt-1 text-sm text-slate-600">{person.role}</p>
        <div className="mt-3 flex items-center gap-2 text-[#0f6a5a] text-xs font-semibold">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#e9faf3] text-[#0f6a5a] ring-1 ring-[#0f6a5a]/15">View profile</span>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" /></svg>
        </div>
      </div>
    </Link>
  );
}

function Tabs({ data }) {
  const sections = useMemo(() => Object.keys(data || {}), [data]);
  const [active, setActive] = useState(sections[0]);
  const tablistRef = useRef(null);

  useEffect(() => {
    const list = tablistRef.current;
    if (!list) return;
    const onKeyDown = (e) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      const tabs = [...list.querySelectorAll("[role='tab']")];
      let idx = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
      if (e.key === "ArrowRight") idx = (idx + 1) % tabs.length;
      if (e.key === "ArrowLeft") idx = (idx - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") idx = 0;
      if (e.key === "End") idx = tabs.length - 1;
      tabs[idx]?.focus();
      const label = tabs[idx]?.dataset?.label;
      if (label) setActive(label);
    };
    list.addEventListener("keydown", onKeyDown);
    return () => list.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="w-full overflow-x-auto no-scrollbar" data-reveal="fade-up" style={{ "--delay": "0.05s" }}>
        <div ref={tablistRef} role="tablist" aria-label="Leadership Sections" className="inline-flex gap-2 bg-slate-50 p-1.5 rounded-xl ring-1 ring-slate-200 shadow-sm">
          {sections.map((label) => {
            const isActive = label === active;
            const count = data[label]?.length || 0;
            return (
              <button
                key={label}
                role="tab"
                data-label={label}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(label)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-[13.5px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c] focus-visible:ring-offset-2",
                  isActive ? "bg-white text-[#0d315c] shadow-sm ring-1 ring-slate-200" : "text-slate-600 hover:text-[#0d315c] hover:bg-white/70"
                )}
              >
                <span>{label}</span>
                <span className={cn("inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px]", isActive ? "bg-[#e6effa] text-[#0d315c]" : "bg-slate-200 text-slate-700")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div role="tabpanel" aria-label={active} className="mt-8">
        {data[active]?.length ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(data[active] || []).map((m, idx) => (
              <LeaderCard key={`${active}-${idx}-${m?.slug || "x"}`} person={m} to={`/leadership/${m.slug || ""}`} />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid place-items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-14">
            <p className="text-slate-600">Profiles coming soon.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default function Leadership() {
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/leadership/`);
        const data = await r.json();
        if (!alive) return;
        // map to { [groupName]: [{slug,name,role,image}] }
        const mapped = {};
        for (const g of data || []) {
          mapped[g.name] = (g.members || []).map((m) => ({
            slug: slugify(m.name),
            name: m.name,
            role: m.title || m.qualifications || "",
            image: m.photo_url || "",
          }));
        }
        setGroups(mapped);
      } catch {
        setGroups({});
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <>
      <section className="relative w-full min-h-[36vh] bg-[#0d315c] border-b-4 border-[#ffaf3a] shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 pt-24 pb-10">
          <h1 className="text-white text-3xl md:text-4xl font-extrabold">Leadership</h1>
          <p className="text-white/90 mt-2 max-w-3xl">
            A clear, organized view of the teams steering SMRU.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          {!groups ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl ring-1 ring-slate-300 shadow-sm p-4">
                  <div className="aspect-[4/5] rounded-xl bg-slate-100 animate-pulse" />
                  <div className="mt-4 h-4 w-1/2 bg-slate-100 rounded animate-pulse" />
                  <div className="mt-2 h-3 w-1/3 bg-slate-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <Tabs data={groups} />
          )}
        </div>
      </section>
    </>
  );
}
