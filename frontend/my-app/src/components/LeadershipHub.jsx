// src/components/LeadershipHub.jsx
import React from "react";
import { Link } from "react-router-dom";

// Assets
import founderImg from "../assets/kvk.jpg";
import bharathiImg from "../assets/Bharathi.jpg";
import harshaImg from "../assets/harsha.jpg";
import vcImg from "../assets/vc.jpg";
import indrajaImg from "../assets/indraja.jpg";
import induImg from "../assets/indu.jpg";

// Cards row — use the same five as About/Sponsor Body and link to profiles
const leaders = [
  { slug: "Founder",    name: "Dr. K.V.K. Rao",        role: "Founder, Chairman & Chancellor", img: founderImg },
  { slug: "Co-Founder", name: "Smt. K.V.N.V Bharathi", role: "Co-Founder & Pro-Chancellor",    img: bharathiImg },
  { slug: "Ceo",        name: "Mr. K. Sri Harsha",     role: "Secretary & CEO",                img: harshaImg },
  { slug: "treasurer",  name: "Smt. K. Indraja",       role: "Treasurer & CFO",                img: indrajaImg },
  { slug: "founder",    name: "Smt. K. Indu Aparna",   role: "Joint Secretary & COO",          img: induImg },
];

export default function LeadershipHub() {
  return (
    <main className="font-['Poppins']">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 lg:px-6 pt-10 lg:pt-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f6a5a]">
          Leadership
        </h1>
        <p className="mt-2 text-slate-600">
          Meet the team guiding SMRU’s vision, governance, and academic growth.
        </p>

        <div className="mt-6 bg-[#0d315c]/5 rounded-2xl overflow-hidden">
          <div
            className="h-44 sm:h-56 lg:h-64 w-full bg-center bg-cover"
            style={{ backgroundImage: `url('/banner-leadership.jpg')` }}
          />
        </div>
      </section>

      {/* Cards row (click → profile) */}
      <section className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {leaders.map((p) => (
            <Link
              to={`/leadership/${p.slug}`}
              key={p.slug}
              className="group rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden hover:shadow-md transition"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                />
              </div>
              <div className="p-3">
                <div className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full ring-1 ring-[#0f6a5a] group-hover:bg-[#0f6a5a] transition">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3 fill-[#0f6a5a] group-hover:fill-white"
                    >
                      <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-500">{p.role}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link
            to="/leadership/all"
            className="inline-flex items-center gap-2 text-[#0f6a5a] font-semibold hover:underline"
          >
            View full Leadership Structure
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
