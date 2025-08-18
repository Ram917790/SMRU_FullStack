// src/pages/LeaderProfile.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { leaderBySlug } from "../data/leaders";

export default function LeaderProfile() {
  const { slug } = useParams();
  const leader = leaderBySlug[slug];

  if (!leader) {
    return (
      <div className="container max-w-screen-xl mx-auto px-4 py-24">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-[#0d315c]">Profile not found</h1>
          <Link
            to="/about#leadership"
            className="mt-4 inline-block text-[#0f6a5a] font-semibold hover:underline"
          >
            Back to Leadership
          </Link>
        </div>
      </div>
    );
  }

  const hasAchievements = Array.isArray(leader.achievements) && leader.achievements.length > 0;
  const hasGallery = Array.isArray(leader.gallery) && leader.gallery.length > 0;

  return (
    <>
      {/* Banner */}
      <section className="relative w-full min-h-[36vh] bg-[linear-gradient(135deg,#0d315c_0%,#0b3a7a_50%,#019e6e_100%)]">
        <div className="container max-w-screen-xl mx-auto px-4 pt-28 pb-10">
          <Link
            to="/about#leadership"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current -scale-x-100">
              <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>
            Back to Leadership
          </Link>
          <h1 className="mt-4 text-white text-3xl md:text-4xl font-extrabold">{leader.name}</h1>
          <p className="mt-2 text-white/90 text-lg">{leader.role}</p>
        </div>
      </section>

      {/* Main */}
      <main className="py-12 bg-slate-50">
        <div className="container max-w-screen-xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl overflow-hidden bg-white ring-1 ring-slate-200 shadow-sm">
              <img
                src={leader.image}
                alt={`${leader.name} profile`}
                className="w-full h-[420px] object-cover"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-white ring-1 ring-slate-200 p-5">
              <h3 className="text-[#0d315c] font-bold">Quick Facts</h3>
              <ul className="mt-3 space-y-2 text-slate-700 text-sm">
                <li>
                  <strong>Role:</strong> {leader.role}
                </li>
                {leader.tenure && (
                  <li>
                    <strong>Tenure:</strong> {leader.tenure}
                  </li>
                )}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <article className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#0d315c]">Profile</h2>
              <p className="mt-2 text-slate-700 leading-relaxed whitespace-pre-line">
                {leader.bio}
              </p>
            </article>

            {/* Achievements */}
            {hasAchievements && (
              <article className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#0d315c]">Key Achievements</h2>
                <ul className="mt-2 list-disc pl-5 space-y-2 text-slate-700">
                  {leader.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </article>
            )}

            {/* Initiatives */}
            {leader.initiatives && (
              <article className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#0d315c]">Initiatives & Vision</h2>
                <p className="mt-2 text-slate-700 whitespace-pre-line">{leader.initiatives}</p>
              </article>
            )}

            {/* Gallery */}
            {hasGallery && (
              <article className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#0d315c]">Gallery</h2>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {leader.gallery.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </article>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
