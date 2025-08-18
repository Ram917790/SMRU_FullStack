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
const findDept = (school, param) => {
  const decoded = decodeURIComponent(param || "").toLowerCase();
  return (
    school?.departments?.find((d) => (d.slug || "").toLowerCase() === decoded) ||
    school?.departments?.find((d) => slugify(d.name) === decoded) ||
    null
  );
};

export default function Department() {
  const { schoolSlug, deptSlug } = useParams();
  const [openSidebar, setOpenSidebar] = useState(false);

  const school = findSchool(schoolSlug);
  const dept = findDept(school, deptSlug);
  const allSchools = (schools || []).map((s) => ({ name: s.name, slug: s.slug || slugify(s.name) }));

  if (!school || !dept) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white border rounded-2xl p-6 shadow-sm" style={{ borderColor: "#e9eef4" }}>
          <h1 className="text-lg font-semibold text-red-600">Department not found.</h1>
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
  const deptSlugSafe = dept.slug || slugify(dept.name);
  const totalProgramsInSchool =
    school.departments?.reduce((sum, d) => sum + (d.programs?.length || 0), 0) || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4 flex items-center" style={{ color: "#475569" }}>
        <Link to="/schools" className="hover:underline">Schools</Link>
        <span className="mx-2" style={{ color: "#94a3b8" }}>/</span>
        <Link to={`/schools/${schoolSlugSafe}`} className="hover:underline">{school.name}</Link>
        <span className="mx-2" style={{ color: "#94a3b8" }}>/</span>
        <span className="text-slate-800">{dept.name}</span>
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
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#ffe3b1" }}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: BRAND_NAVY }}>
                {dept.name}
              </h1>
              <div className="flex gap-2">
                <Link
                  to={`/schools/${schoolSlugSafe}`}
                  className="px-4 py-2 rounded-xl border hover:bg-[#f6f9fc]"
                  style={{ color: BRAND_NAVY, borderColor: BRAND_NAVY }}
                >
                  ← {school.name}
                </Link>
                <a
                  href="https://admissions.smru.in"
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
          <section className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#e9eef4" }}>
            <h2 className="text-xl font-semibold" style={{ color: BRAND_GREEN }}>
              About the Department
            </h2>
            <p className="mt-2 text-slate-700 leading-relaxed">
              {dept.about || dept.description || "Details coming soon."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span
                className="px-3 py-1 rounded-full"
                style={{ background: "#eaf2ff", color: BRAND_NAVY, border: "1px solid #d6e4ff" }}
              >
                Programs here: {dept.programs?.length || 0}
              </span>
              <span
                className="px-3 py-1 rounded-full"
                style={{ background: "#e7f7f1", color: "#065f46", border: "1px solid #bfeee0" }}
              >
                School total: {totalProgramsInSchool}
              </span>
              <span
                className="px-3 py-1 rounded-full"
                style={{ background: "#fff6e6", color: "#7a4a10", border: `1px solid ${BRAND_ORANGE}` }}
              >
                Tip: Use the back button to compare quickly.
              </span>
            </div>
          </section>

          {/* Programs */}
          <section className="bg-white rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: "#e9eef4" }}>
            <div className="p-6 border-b" style={{ borderColor: "#ffe3b1" }}>
              <h2 className="text-xl font-semibold" style={{ color: BRAND_NAVY }}>
                Programs
              </h2>
              <p className="mt-1 text-slate-600">Tap a program to view details.</p>
            </div>
            <div className="p-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {(dept.programs || []).map((p) => {
                const progSlug = p.slug || slugify(p.name);
                return (
                  <Link
                    key={progSlug}
                    to={`/schools/${schoolSlugSafe}/${deptSlugSafe}/${progSlug}`}
                    className="block rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition border"
                    style={{ borderColor: "#e9eef4" }}
                  >
                    <div className="h-1 rounded" style={{ backgroundColor: BRAND_GREEN }} />
                    <div className="mt-3 text-lg font-semibold" style={{ color: BRAND_NAVY }}>
                      {p.name}
                    </div>
                    {p.level && <div className="mt-1 text-xs text-slate-500">{p.level}</div>}
                    {p.overview && <p className="mt-2 text-sm text-slate-600 line-clamp-3">{p.overview}</p>}
                  </Link>
                );
              })}
            </div>

            <div className="px-6 pb-6">
              <Link
                to={`/schools/${schoolSlugSafe}`}
                className="px-4 py-2 rounded-xl border hover:bg-[#f6f9fc]"
                style={{ color: BRAND_NAVY, borderColor: BRAND_NAVY }}
              >
                ← Back to {school.name}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
