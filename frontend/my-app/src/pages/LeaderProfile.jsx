// LeaderProfile.jsx — UI-only refinements: spacing, containers, focus states; no logic changes.
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../lib/api";
import { Loading, ErrorState, EmptyState } from "../components/ApiState";

export default function LeaderProfile() {
  const { slug } = useParams();
  const [leader, setLeader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  const fetchLeader = async () => {
    setErr(false); setLoading(true);
    try {
      const data = await api.get("/leadership/");
      let match = null;
      for (const g of data.groups || []) {
        match = (g.leaders || []).find(l => (l.slug || "").toLowerCase() === slug.toLowerCase());
        if (match) break;
      }
      setLeader(match || null);
    } catch {
      setErr(true);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchLeader(); /* eslint-disable-next-line */ }, [slug]);

  if (loading) return <Loading label="Loading profile..." />;
  if (err) return <ErrorState message="Couldn’t load profile." onRetry={fetchLeader} />;
  if (!leader) return <EmptyState title="Profile not found" />;

  return (
    <>
      <section className="relative w-full min-h-[30vh] bg-[#0d315c] border-b-4 border-[#ffaf3a] shadow-lg">
        <div className="container max-w-screen-xl mx-auto px-4 pt-24 pb-8">
          <Link to="/leadership" className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current -scale-x-100"><path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" /></svg>
            Back to Leadership
          </Link>
          <h1 className="mt-3 text-white text-3xl md:text-4xl font-extrabold">{leader.name}</h1>
          <p className="mt-1 text-white/90 text-lg">{leader.role}</p>
        </div>
      </section>

      <main className="py-12 bg-slate-50">
        <div className="container max-w-screen-xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
          <aside className="lg:col-span-1">
            <div className="rounded-xl bg-white ring-1 ring-slate-300 p-5">
              <h3 className="text-[#0d315c] font-bold">Quick Facts</h3>
              <ul className="mt-3 space-y-2 text-slate-700 text-sm">
                <li><strong>Role:</strong> {leader.role}</li>
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-2 space-y-8">
            <article className="rounded-xl bg-white ring-1 ring-slate-300 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#0d315c]">Profile</h2>
              <p className="mt-2 text-slate-700 leading-relaxed whitespace-pre-line">{leader.bio || leader.about || "—"}</p>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
