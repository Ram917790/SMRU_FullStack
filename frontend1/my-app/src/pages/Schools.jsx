import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { schools } from "../data/schools";

const BRAND_NAVY = "#0d315c";
const BRAND_GREEN = "#009f6f";
const BRAND_ORANGE = "#ffaf3a";

const slugify = (s = "") =>
  s.toString().trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default function Schools() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const items = (schools || []).map((s) => ({
    ...s,
    slug: s.slug || slugify(s.name),
    deptCount: s.departments?.length || 0,
    programCount:
      s.departments?.reduce((sum, d) => sum + (d.programs?.length || 0), 0) || 0,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header bar */}
      <div
        className="bg-white rounded-2xl p-5 shadow-sm border"
        style={{ borderColor: "#ffe3b1" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ color: BRAND_NAVY }}>
              Schools at St. Mary’s Rehabilitation University
            </h1>
            <p className="mt-1 text-slate-600">
              Pick a school from the sidebar or cards. Yellow badges show quick tips/counts.
            </p>
          </div>
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

      {/* Mobile toggle for sidebar */}
      <div className="mt-4 md:hidden">
        <button
          onClick={() => setOpenSidebar((s) => !s)}
          className="w-full px-4 py-2 rounded-xl border text-left"
          style={{ borderColor: BRAND_NAVY, color: BRAND_NAVY }}
        >
          {openSidebar ? "Hide Schools ▲" : "Show Schools ▼"}
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[260px,1fr]">
        {/* Sidebar */}
        <aside className={`h-max ${openSidebar ? "block" : "hidden"} md:block`}>
          <div className="bg-white rounded-2xl p-4 shadow-sm border" style={{ borderColor: "#e9eef4" }}>
            <div className="text-xs uppercase tracking-wide" style={{ color: BRAND_NAVY }}>
              Schools
            </div>
            <ul className="mt-3 space-y-1">
              {items.map((s) => (
                <li key={s.slug}>
                  <NavLink
                    to={`/schools/${s.slug}`}
                    className={({ isActive }) =>
                      [
                        "block rounded-lg px-3 py-2 text-sm font-medium border transition",
                        isActive ? "text-white" : "text-slate-800",
                      ].join(" ")
                    }
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? BRAND_GREEN : "transparent",
                      border: isActive ? `2px solid ${BRAND_ORANGE}` : "1px solid #e9eef4",
                    })}
                  >
                    {s.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Cards */}
        <section>
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((s) => (
              <Link
                key={s.slug}
                to={`/schools/${s.slug}`}
                className="block rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition border"
                style={{ borderColor: "#e9eef4" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold" style={{ color: BRAND_NAVY }}>
                    {s.name}
                  </h2>
                  <span
                    className="text-[11px] px-2 py-1 rounded-full"
                    style={{ background: "#fff6e6", color: "#7a4a10", border: `1px solid ${BRAND_ORANGE}` }}
                  >
                    {s.deptCount} Dept{ s.deptCount === 1 ? "" : "s" }
                  </span>
                </div>
                {s.about && (
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">{s.about}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span
                    className="px-2 py-1 rounded-full"
                    style={{ background: "#e7f7f1", color: "#065f46", border: "1px solid #bfeee0" }}
                  >
                    Programs: {s.programCount}
                  </span>
                  <span
                    className="px-2 py-1 rounded-full"
                    style={{ background: "#eaf2ff", color: BRAND_NAVY, border: "1px solid #d6e4ff" }}
                  >
                    Click to view departments
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
