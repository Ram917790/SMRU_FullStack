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
const findProgram = (dept, param) => {
  const decoded = decodeURIComponent(param || "").toLowerCase();
  return (
    dept?.programs?.find((p) => (p.slug || "").toLowerCase() === decoded) ||
    dept?.programs?.find((p) => slugify(p.name) === decoded) ||
    null
  );
};

export default function Program() {
  const { schoolSlug, deptSlug, programSlug } = useParams();
  const [openSidebar, setOpenSidebar] = useState(false);

  const school = findSchool(schoolSlug);
  const dept = findDept(school, deptSlug);
  const prog = findProgram(dept, programSlug);
  const allSchools = (schools || []).map((s) => ({ name: s.name, slug: s.slug || slugify(s.name) }));

  if (!school || !dept || !prog) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white border rounded-2xl p-6 shadow-sm" style={{ borderColor: "#e9eef4" }}>
          <h1 className="text-lg font-semibold text-red-600">Program not found.</h1>
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4 flex items-center" style={{ color: "#475569" }}>
        <Link to="/schools" className="hover:underline">Schools</Link>
        <span className="mx-2" style={{ color: "#94a3b8" }}>/</span>
        <Link to={`/schools/${schoolSlugSafe}`} className="hover:underline">{school.name}</Link>
        <span className="mx-2" style={{ color: "#94a3b8" }}>/</span>
        <Link to={`/schools/${schoolSlugSafe}/${deptSlugSafe}`} className="hover:underline">{dept.name}</Link>
        <span className="mx-2" style={{ color: "#94a3b8" }}>/</span>
        <span className="text-slate-800">{prog.name}</span>
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
              <div>
                <h1 className="text-2xl md:text-3xl font-bold" style={{ color: BRAND_NAVY }}>{prog.name}</h1>
                {prog.level && <div className="text-sm text-slate-500">{prog.level}</div>}
                <span
                  className="mt-2 inline-block text-xs px-2 py-1 rounded-full"
                  style={{ background: "#fff6e6", color: "#7a4a10", border: `1px solid ${BRAND_ORANGE}` }}
                >
                  Tip: Read the overview, then check details blocks below.
                </span>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/schools/${schoolSlugSafe}/${deptSlugSafe}`}
                  className="px-4 py-2 rounded-xl border hover:bg-[#f6f9fc]"
                  style={{ color: BRAND_NAVY, borderColor: BRAND_NAVY }}
                >
                  ← {dept.name}
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

          {/* Overview */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#e9eef4" }}>
            <h2 className="text-xl font-semibold" style={{ color: BRAND_GREEN }}>Program Overview</h2>
            {prog.overview ? (
              <p className="mt-3 text-slate-700 leading-relaxed">{prog.overview}</p>
            ) : (
              <p className="mt-3 text-slate-600">Details coming soon.</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {prog.duration && (
                <span
                  className="px-3 py-1 rounded-full"
                  style={{ background: "#eaf2ff", color: BRAND_NAVY, border: "1px solid #d6e4ff" }}
                >
                  Duration: {prog.duration}
                </span>
              )}
              {prog.eligibility && (
                <span
                  className="px-3 py-1 rounded-full"
                  style={{ background: "#e7f7f1", color: "#065f46", border: "1px solid #bfeee0" }}
                >
                  Eligibility: {prog.eligibility}
                </span>
              )}
              {prog.fees && (
                <span
                  className="px-3 py-1 rounded-full"
                  style={{ background: "#fff6e6", color: "#7a4a10", border: `1px solid ${BRAND_ORANGE}` }}
                >
                  Tuition: {prog.fees}
                </span>
              )}
            </div>
          </section>

          {/* Detail blocks */}
          <div className="grid gap-6 md:grid-cols-2">
            {prog.eligibility && (
              <section className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#e9eef4" }}>
                <h3 className="text-lg font-semibold" style={{ color: BRAND_NAVY }}>Eligibility</h3>
                <p className="mt-2 text-slate-700 leading-relaxed">{prog.eligibility}</p>
              </section>
            )}
            {prog.duration && (
              <section className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#e9eef4" }}>
                <h3 className="text-lg font-semibold" style={{ color: BRAND_NAVY }}>Duration</h3>
                <p className="mt-2 text-slate-700 leading-relaxed">{prog.duration}</p>
              </section>
            )}
            {prog.fees && (
              <section className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#e9eef4" }}>
                <h3 className="text-lg font-semibold" style={{ color: BRAND_NAVY }}>Tuition Fee</h3>
                <p className="mt-2 text-slate-700 leading-relaxed">{prog.fees}</p>
              </section>
            )}
            {prog.outcomes && (
              <section className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#e9eef4" }}>
                <h3 className="text-lg font-semibold" style={{ color: BRAND_NAVY }}>Career Outcomes</h3>
                <p className="mt-2 text-slate-700 leading-relaxed">{prog.outcomes}</p>
              </section>
            )}
          </div>

          {/* Specializations */}
          {Array.isArray(prog.specializations) && prog.specializations.length > 0 && (
            <section className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#e9eef4" }}>
              <h3 className="text-lg font-semibold" style={{ color: BRAND_NAVY }}>Specializations</h3>
              <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                {prog.specializations.map((s, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 rounded-full border"
                    style={{ borderColor: "#e9eef4", color: BRAND_NAVY }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Accreditation */}
          {prog.accreditation && (
            <section className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#e9eef4" }}>
              <h3 className="text-lg font-semibold" style={{ color: BRAND_NAVY }}>Accreditation / Recognition</h3>
              <p className="mt-2 text-slate-700 leading-relaxed">{prog.accreditation}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
