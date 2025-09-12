// src/components/LeadershipBoards.jsx
import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";
const NAVY = "#0d315c";
const ORANGE = "#ffaf3a";

const Skeleton = () => (
  <div className="grid gap-6 md:grid-cols-3">
    {[0, 1, 2].map((i) => (
      <div key={i} className="rounded-2xl border ring-1 ring-slate-200 bg-white p-4">
        <div className="h-6 w-40 rounded-md bg-slate-200 mb-3" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, j) => (
            <div key={j} className="rounded-xl p-3 ring-1 ring-slate-200 bg-slate-100">
              <div className="h-4 w-48 bg-slate-200 rounded" />
              <div className="h-3 w-56 bg-slate-200 rounded mt-2" />
              <div className="h-3 w-40 bg-slate-200 rounded mt-2" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default function LeadershipBoards() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/leadership/`, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setGroups(Array.isArray(json.groups) ? json.groups : []);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("[LeadershipBoards] fetch error:", e);
          setErr("Couldn’t load leadership right now.");
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  if (loading) return <Skeleton />;
  if (err) return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">{err}</div>
  );
  if (!groups.length)
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
        Leadership will be published soon.
      </div>
    );

  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {groups.map((g) => (
            <div
              key={g.slug || g.label}
              className="rounded-2xl border ring-1 ring-slate-200 bg-white p-4"
              style={{ borderColor: ORANGE }}
            >
              <div
                className="inline-block text-xs font-bold px-3 py-1 rounded-lg"
                style={{
                  color: NAVY,
                  background: "#e6effa",
                  border: `1px solid ${NAVY}`,
                }}
              >
                {g.label}
              </div>

              <div className="mt-3 space-y-3">
                {(g.members || []).map((m, idx) => (
                  <div
                    key={m.slug || `${g.slug}-${idx}`}
                    className="rounded-xl p-3 ring-1"
                    style={{ background: "#ffe6ec", borderColor: "#f8c9d5" }}
                  >
                    <div className="font-semibold" style={{ color: NAVY }}>{m.name}</div>
                    {(m.about || m.role) && (
                      <div className="mt-1 text-sm leading-snug" style={{ color: NAVY }}>
                        {(m.about || m.role)
                          ?.toString()
                          .split("\n")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((ln, i) => <div key={i}>{ln}</div>)}
                      </div>
                    )}
                    <div className="mt-2 text-sm">
                      <span className="font-semibold" style={{ color: NAVY }}>Designation:</span>{" "}
                      <span className="font-medium" style={{ color: NAVY }}>{m.role || "Member"}</span>
                    </div>
                  </div>
                ))}
                {!g.members?.length && (
                  <div className="rounded-xl p-3 ring-1 ring-slate-200 bg-slate-50 text-slate-600">
                    Members will be added soon.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
