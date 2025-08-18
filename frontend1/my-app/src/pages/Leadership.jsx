// src/pages/Leadership.jsx
import React from "react";
import { Link } from "react-router-dom";
import { leaders } from "../data/leaders";

export default function Leadership() {
  return (
    <>
      {/* Banner */}
      <section className="relative w-full min-h-[32vh] bg-[linear-gradient(135deg,#0d315c_0%,#0b3a7a_50%,#019e6e_100%)]">
        <div className="container max-w-screen-xl mx-auto px-4 pt-28 pb-10">
          <h1 className="text-white text-3xl md:text-4xl font-extrabold">Leadership</h1>
          <p className="mt-2 text-white/90 text-lg">
            Meet the people guiding St. Mary’s Rehabilitation University.
          </p>
        </div>
      </section>

      {/* Leaders grid */}
      <main className="py-12 bg-slate-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((person) => (
              <Link
                key={person.slug}
                to={`/leaders/${person.slug}`}
                className="group rounded-2xl bg-white ring-1 ring-slate-200 hover:ring-[#0f6a5a]/40 shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#0d315c]">{person.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{person.role}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[#0f6a5a] font-semibold">
                    View Profile
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
