// C:\Projects\my_fullstack_app\frontend1\my-app\src\pages\School.jsx

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { schools } from "../data/schools";

const BRAND_NAVY = "#0d315c";
const BRAND_GREEN = "#009f6f";
const BRAND_ORANGE = "#ffaf3a";

const slugify = (s = "") =>
  s.toString().trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const findSchool = (param) => {
  const decoded = decodeURIComponent(param || "").toLowerCase();
  return (
    schools.find((s) => (s.slug || "").toLowerCase() === decoded) ||
    schools.find((s) => slugify(s.name) === decoded) ||
    null
  );
};

export default function School() {
  const { schoolSlug } = useParams();
  const [openSidebar, setOpenSidebar] = useState(false);

  const school = findSchool(schoolSlug);
  const allSchools = (schools || []).map((s) => ({ name: s.name, slug: s.slug || slugify(s.name) }));

  if (!school) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white border rounded-2xl p-6 shadow-sm" style={{ borderColor: "#e9eef4" }}>
          <h1 className="text-lg font-semibold text-red-600">School not found.</h1>
          <div className="mt-4">
            <Link
              to="/schools"
              className="px-4 py-2 rounded-xl border hover:bg-[#f6f9fc]"
              style={{ color: BRAND_NAVY, borderColor: BRAND_NAVY }}
            >
              ← Back to All Schools
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const schoolSlugSafe = school.slug || slugify(school.name);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4 flex items-center" style={{ color: "#475569" }}>
        <Link to="/schools" className="hover:underline">Schools</Link>
        <span className="mx-2" style={{ color: "#94a3b8" }}>/</span>
        <span className="text-slate-800">{school.name}</span>
      </nav>

      {/* Mobile toggle */}
      <div className="mb-4 md:hidden">
        <button
          onClick={() => setOpenSidebar((s) => !s)}
          className="w-full px-4 py-2 rounded-xl border text-left"
          style={{ borderColor: BRAND_NAVY, color: BRAND_NAVY }}
        >
          {openSidebar ? "Hide Schools ▲" : "Show Schools ▼"}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-[260px,1fr]">
        {/* Sidebar */}
        <aside className={`h-max ${openSidebar ? "block" : "hidden"} md:block`}>
          <div className="bg-white rounded-2xl p-4 shadow-sm border" style={{ borderColor: "#e9eef4" }}>
            <div className="text-xs uppercase tracking-wide" style={{ color: BRAND_NAVY }}>
              Schools
            </div>
            <ul className="mt-3 space-y-1">
              {allSchools.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/schools/${s.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm font-medium border transition text-slate-800 hover:bg-[#fff6e6]"
                    style={{ border: "1px solid #e9eef4" }}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main */}
        <div>
          {/* Header */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#ffe3b1" }}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold" style={{ color: BRAND_NAVY }}>
                  {school.name}
                </h1>
                {school.tagline ? <p className="mt-1 text-slate-600">{school.tagline}</p> : null}
                <span
                  className="mt-2 inline-block text-xs px-2 py-1 rounded-full"
                  style={{ background: "#fff6e6", color: "#7a4a10", border: `1px solid ${BRAND_ORANGE}` }}
                >
                  <strong>Tip:</strong> Schools → Departments → Programs
                </span>
              </div>
              <div className="flex gap-2">
                <Link
                  to="/schools"
                  className="px-4 py-2 rounded-xl border hover:bg-[#f6f9fc]"
                  style={{ color: BRAND_NAVY, borderColor: BRAND_NAVY }}
                >
                  ← All Schools
                </Link>
                <a
                  href="https://admission.smru.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-white"
                  style={{ backgroundColor: BRAND_GREEN }}
                >
                  Apply / Enquire
                </a>
              </div>
            </div>
          </div>

          {/* About */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border mt-8" style={{ borderColor: "#e9eef4" }}>
            <h2 className="text-xl font-semibold" style={{ color: BRAND_GREEN }}>About the School</h2>
            <p className="mt-2 text-slate-700 leading-relaxed">{school.about}</p>
          </section>

          {/* Departments */}
          <section className="bg-white rounded-2xl overflow-hidden shadow-sm border mt-8" style={{ borderColor: "#e9eef4" }}>
            <div className="p-6 border-b" style={{ borderColor: "#ffe3b1" }}>
              <h2 className="text-xl font-semibold" style={{ color: BRAND_NAVY }}>Departments</h2>
              <p className="mt-1 text-slate-600">Choose a department to view its programs.</p>
            </div>
            <div className="p-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {(school.departments || []).map((dept) => {
                const deptSlug = dept.slug || slugify(dept.name);
                const programCount = dept.programs?.length || 0;
                return (
                  <Link
                    key={deptSlug}
                    to={`/schools/${schoolSlugSafe}/${deptSlug}`}
                    className="block rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition border"
                    style={{ borderColor: "#e9eef4" }}
                  >
                    <div className="h-1 rounded" style={{ backgroundColor: BRAND_GREEN }} />
                    <div className="mt-3 text-lg font-semibold" style={{ color: BRAND_NAVY }}>
                      {dept.name}
                    </div>
                    {(dept.about || dept.description) && (
                      <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                        {dept.about || dept.description}
                      </p>
                    )}
                    <div className="mt-3 text-xs text-slate-500">
                      {programCount} {programCount === 1 ? "Program" : "Programs"}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
