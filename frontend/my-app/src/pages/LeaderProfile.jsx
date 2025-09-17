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
      if (match) {
        console.log("Leader found:", match.name, "Image URL:", match.profile_image);
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
          <aside className="lg:col-span-1 space-y-6">
            {/* Profile Image */}
            <div className="rounded-xl bg-white ring-1 ring-slate-300 p-6 text-center">
              {leader.profile_image ? (
                <img
                  src={leader.profile_image}
                  alt={`${leader.name} profile`}
                  className="w-full max-w-sm mx-auto aspect-[3/4] object-cover rounded-xl border-2 border-slate-200 shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = 'block';
                    e.currentTarget.nextElementSibling.style.display = 'none';
                  }}
                />
              ) : null}
              <div 
                className="w-full max-w-sm mx-auto aspect-[3/4] border-2 border-slate-200 shadow-lg bg-slate-100 rounded-xl flex items-center justify-center text-4xl font-bold text-slate-600"
                style={{ display: leader.profile_image ? 'none' : 'flex' }}
              >
                {leader.name ? leader.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'L'}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="rounded-xl bg-white ring-1 ring-slate-300 p-5">
              <h3 className="text-[#0d315c] font-bold">Quick Facts</h3>
              <ul className="mt-3 space-y-2 text-slate-700 text-sm">
                <li><strong>Role:</strong> {leader.role}</li>
                {leader.email && <li><strong>Email:</strong> <a href={`mailto:${leader.email}`} className="text-blue-600 hover:text-blue-800">{leader.email}</a></li>}
                {leader.phone && <li><strong>Phone:</strong> <a href={`tel:${leader.phone}`} className="text-blue-600 hover:text-blue-800">{leader.phone}</a></li>}
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-2 space-y-8">
            {/* Name */}
            <article className="rounded-xl bg-white ring-1 ring-slate-300 p-6 shadow-sm">
              <h2 className="text-3xl font-bold text-[#10bb82]">{leader.name}</h2>
            </article>

            {/* Designation */}
            <article className="rounded-xl bg-white ring-1 ring-slate-300 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#0d315c]">Designation</h2>
              <p className="mt-2 text-lg text-slate-700">{leader.role}</p>
            </article>

            {/* Bio */}
            {leader.bio && (
              <article className="rounded-xl bg-white ring-1 ring-slate-300 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#0d315c]">Bio</h2>
                <p className="mt-2 text-slate-700 leading-relaxed whitespace-pre-line">{leader.bio}</p>
              </article>
            )}

            {/* About */}
            {leader.about && (
              <article className="rounded-xl bg-white ring-1 ring-slate-300 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#0d315c]">About</h2>
                <p className="mt-2 text-slate-700 leading-relaxed whitespace-pre-line">{leader.about}</p>
              </article>
            )}

            {/* Qualifications */}
            {leader.qualifications && (
              <article className="rounded-xl bg-white ring-1 ring-slate-300 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#0d315c]">Qualifications</h2>
                <p className="mt-2 text-slate-700 leading-relaxed whitespace-pre-line">{leader.qualifications}</p>
              </article>
            )}

            {/* Experience */}
            {leader.experience && (
              <article className="rounded-xl bg-white ring-1 ring-slate-300 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#0d315c]">Experience</h2>
                <p className="mt-2 text-slate-700 leading-relaxed whitespace-pre-line">{leader.experience}</p>
              </article>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
