// src/components/LeadershipAll.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Images
import founderImg from "../assets/kvk.jpg";
import bharathiImg from "../assets/Bharathi.jpg";
import harshaImg from "../assets/harsha.jpg";
import vcImg from "../assets/vc.jpg";
import indrajaImg from "../assets/indraja.jpg";
import induImg from "../assets/indu.jpg";
import shekarImg from "../assets/Shekar.jpg";

// -------- Data (slugs must match LeaderProfile.jsx) --------

// Sponsor Body cards (clickable → profile pages)
const smruLeadership = [
  { slug: "Founder",     name: "Dr. K.V.K. Rao",           role: "Founder, Chairman & Chancellor", img: founderImg },
  { slug: "Co-Founder",  name: "Smt. K.V.N.V Bharathi",    role: "Co-Founder & Pro-Chancellor",    img: bharathiImg },
  { slug: "Ceo",         name: "Mr. K. Sri Harsha",        role: "Secretary & CEO",                img: harshaImg },
  { slug: "treasurer",   name: "Smt. K. Indraja",          role: "Treasurer & CFO",                img: indrajaImg },
  { slug: "founder",     name: "Smt. K. Indu Aparna",      role: "Joint Secretary & COO",          img: induImg },
];

// University Governing Body (simple list for now)
const governingBody = [
  { name: "Coming Soon...", designation: "Member" },
  { name: "Coming Soon...", designation: "Member" },
  { name: "Coming Soon...", designation: "Member" },
  { name: "Coming Soon...", designation: "Member" },
];

// University BOM (VC + Shekar + placeholders)
const boardOfManagement = [
  { slug: "vc",     name: "Lt Gen Pradeep Chandran Nair, PVSM, AVSM, YSM (Retd.)", designation: "Vice-Chancellor" },
  { slug: "shekar", name: "Mr. Mothukomilli Bharadwaj",                             designation: "Member" },
  { name: "Coming Soon...", designation: "Chief People Officer" },
  { name: "Coming Soon...", designation: "Member" },
];

// Academic Council (simple info cards)
const academicCouncil = [
  { label: "Academic Council Chair", value: "Coming Soon..." },
  { label: "Member (Academic)",      value: "Coming Soon..." },
  { label: "Member (Admin)",         value: "Coming Soon..." },
];

function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c] focus-visible:ring-offset-2"
      >
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">
          {title}
        </h3>
        <span
          className={[
            "h-6 w-6 rounded-full grid place-items-center ring-1 ring-slate-300 bg-white",
            "transition-transform duration-300",
            open ? "rotate-180" : "",
          ].join(" ")}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-slate-700">
            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
          </svg>
        </span>
      </button>

      <div
        className={[
          "overflow-hidden transition-[max-height] duration-300 ease-out",
          open ? "max-h-[1200px]" : "max-h-0",
        ].join(" ")}
      >
        <div className="pb-6">{children}</div>
      </div>
    </div>
  );
}

export default function LeadershipAll() {
  return (
    <main className="font-['Poppins'] bg-accent-50">
      {/* Top bar + breadcrumb */}
      <section className="container max-w-screen-xl mx-auto px-4 lg:px-6 pt-10 lg:pt-14">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0d315c]">
            Leadership
          </h1>
          <Link
            to="/about/leadership"
            className="text-sm inline-flex items-center gap-1 rounded-xl px-3 py-1.5 bg-white ring-1 ring-slate-200 text-[#019e6e] hover:-translate-y-0.5 hover:shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c] focus-visible:ring-offset-2"
          >
            ← Back
          </Link>
        </div>

        {/* Featured row (Sponsor Body spotlight) */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {smruLeadership.map((p) => (
            <Link
              key={p.slug}
              to={`/leadership/${p.slug}`}
              className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm sm:text-[15px] font-semibold leading-tight text-slate-900">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-600">{p.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Four sections only */}
      <section className="container max-w-screen-xl mx-auto px-4 lg:px-6 py-8">
        <div className="rounded-2xl ring-1 ring-slate-200 overflow-hidden bg-white shadow-sm">
          <div className="px-4 sm:px-6">
            {/* 1) Sponsor Body */}
            <Section title="Sponsor Body" defaultOpen>
              <p className="text-sm text-slate-600 mb-4">
                The University is guided by experienced academic and industry leaders.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {smruLeadership.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/leadership/${p.slug}`}
                    className="text-center rounded-xl overflow-hidden ring-1 ring-slate-200 bg-white hover:shadow-md transition"
                  >
                    <div className="aspect-square">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-2">
                      <div className="text-sm font-semibold text-slate-900">
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-600">{p.role}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </Section>

            {/* 2) University Governing Body */}
            <Section title="University Governing Body">
              <ul className="divide-y divide-slate-100 rounded-lg ring-1 ring-slate-100 overflow-hidden bg-white">
                {governingBody.map((m, i) => (
                  <li
                    key={`${m.name}-${i}`}
                    className="p-4 flex items-center justify-between hover:bg-slate-50 transition"
                  >
                    <span className="text-sm font-medium text-slate-900">
                      {m.name}
                    </span>
                    <span className="text-xs text-slate-600">
                      {m.designation}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* 3) University BOM */}
            <Section title="University BOM">
              <ul className="divide-y divide-slate-100 rounded-lg ring-1 ring-slate-100 overflow-hidden bg-white">
                {boardOfManagement.map((m, i) => {
                  const content = (
                    <>
                      <span className="text-sm font-medium text-slate-900">
                        {m.name}
                      </span>
                      <span className="text-xs text-slate-600">
                        {m.designation}
                      </span>
                    </>
                  );
                  return (
                    <li
                      key={`${m.name}-${i}`}
                      className="p-4 flex items-center justify-between hover:bg-slate-50 transition"
                    >
                      {m.slug ? (
                        <Link
                          to={`/leadership/${m.slug}`}
                          className="flex items-center justify-between w-full"
                        >
                          {content}
                        </Link>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </Section>

            {/* 4) Academic Council */}
            <Section title="Academic Council">
              <div className="grid sm:grid-cols-2 gap-4">
                {academicCouncil.map((row) => (
                  <div
                    key={row.label}
                    className="p-4 rounded-xl ring-1 ring-slate-200 bg-white hover:shadow-sm transition"
                  >
                    <div className="text-xs uppercase tracking-wide text-slate-600">
                      {row.label}
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </section>
    </main>
  );
}
