// UI-only: Schools pages styling refresh (solid colors, borders, hover shadows). No logic changes.
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../lib/api";
import { Loading, ErrorState, EmptyState } from "../components/ApiState";

const BRAND_NAVY = "#0d315c";
const BRAND_GREEN = "#009f6f";
const BRAND_ORANGE = "#ffaf3a";

export default function Department() {
  const { schoolSlug, deptSlug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  const fetchDept = async () => {
    setErr(false); setLoading(true);
    try {
      const res = await api.get(`/schools/${encodeURIComponent(schoolSlug)}/${encodeURIComponent(deptSlug)}/`);
      setData(res);
    } catch {
      setErr(true);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchDept(); /* eslint-disable-next-line */ }, [schoolSlug, deptSlug]);

  if (loading) return <Loading label="Loading department..." />;
  if (err) return <ErrorState message="Department not found." onRetry={fetchDept} />;
  if (!data) return <EmptyState title="Department not found" />;

  const { school, name, about, description, programs = [] } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4 flex items-center text-slate-600">
        <Link to="/schools" className="hover:underline">Schools</Link>
        <span className="mx-2 text-slate-400">/</span>
        <Link to={`/schools/${school.slug}`} className="hover:underline">{school.name}</Link>
        <span className="mx-2 text-slate-400">/</span>
        <span className="text-slate-800">{name}</span>
      </nav>

      <div className="space-y-8">
        {/* Header */}
        <div className="rounded-xl p-6 shadow-lg bg-[#0d315c] text-white border-b-4 border-[#ffaf3a]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
            <div className="flex gap-2">
              <Link to={`/schools/${school.slug}`} className="px-4 py-2 rounded-xl bg-warning text-white hover:bg-warning/90">
                ← {school.name}
              </Link>
              <a href="https://admissions.smru.in" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-white text-primary hover:bg-slate-100">
                Apply / Enquire
              </a>
            </div>
          </div>
        </div>

        {/* About */}
        <section className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-300 transition hover:shadow-md">
          <h2 className="text-xl font-semibold text-success">About the Department</h2>
          <p className="mt-2 text-slate-700 leading-relaxed">{about || description || "Details coming soon."}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 rounded-full bg-accent/10 text-[#0d315c] border border-accent">
              Programs here: {programs.length}
            </span>
          </div>
        </section>

        {/* Programs */}
        <section className="bg-white rounded-xl overflow-hidden shadow-sm ring-1 ring-slate-300">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-success">Programs</h2>
            <p className="mt-1 text-slate-600">Tap a program to view details.</p>
          </div>
          {programs.length === 0 ? (
            <EmptyState title="No programs added yet" />
          ) : (
            <div className="p-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {programs.map((p) => (
                <Link key={p.slug} to={`/schools/${school.slug}/${deptSlug}/${p.slug}`} className="block rounded-xl p-5 bg-white ring-1 ring-slate-300 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30">
                  <div className="h-1.5 rounded bg-success" />
                  <div className="mt-3 text-lg font-semibold text-[#0d315c]">{p.name}</div>
                  {p.level && <div className="mt-1 text-xs text-slate-500">{p.level}</div>}
                  {p.overview && <p className="mt-2 text-sm text-slate-600 line-clamp-3">{p.overview}</p>}
                </Link>
              ))}
            </div>
          )}
          <div className="px-6 pb-6">
            <Link to={`/schools/${school.slug}`} className="px-4 py-2 rounded-xl bg-white text-primary hover:bg-slate-100">
              ← Back to {school.name}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
