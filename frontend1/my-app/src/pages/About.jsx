// C:\Projects\my_fullstack_app\frontend1\my-app\src\pages\About.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import campusImage from "../assets/herosection.jpg";
import vc from "../assets/vc.jpg";
import bharathiImg from "../assets/Bharathi.jpg";
import founderImg from "../assets/kvk.jpg";
import harshaImg from "../assets/harsha.jpg";
import indrajaImg from "../assets/indraja.jpg";
import induImg from "../assets/indu.jpg";

import {
  FaEye, FaBullseye, FaTrophy, FaHeart, FaLightbulb, FaShieldAlt, FaUniversity,
  FaBuilding, FaBookOpen, FaChalkboardTeacher, FaFlask, FaUsers, FaGraduationCap,
  FaGlobe, FaPaintBrush, FaLaptopMedical
} from "react-icons/fa";

/* --------------------------------
   Helpers
--------------------------------- */
const placeHolder = "https://via.placeholder.com/640x480?text=Coming+Soon";
const cn = (...c) => c.filter(Boolean).join(" ");
const onImgError = (e) => { e.currentTarget.src = placeHolder; };

/* --------------------------------
   Reusable Leader Card
--------------------------------- */
function LeaderCard({ person, to }) {
  return (
    <Link
      to={to}
      className="group relative rounded-2xl bg-white ring-1 ring-slate-200 hover:ring-[#0d315c]/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c] focus-visible:ring-offset-2"
      aria-label={`View profile of ${person?.name || "Leader"}`}
    >
      {/* Corner arrow */}
      <span className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/95 ring-1 ring-slate-300 text-[#0f6a5a] transition-all duration-200 group-hover:bg-[#0f6a5a] group-hover:text-white">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
        </svg>
      </span>

      {/* Image */}
      <div className="px-4 pt-5">
        <div className="aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 ring-1 ring-slate-200">
          <img
            src={person.image || placeHolder}
            alt={person.name || "Profile"}
            onError={onImgError}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-[15.5px] font-semibold text-slate-900 leading-tight tracking-[0.1px]">
          {person.name}
        </h3>
        <p className="mt-1 text-[12.5px] text-slate-600">{person.role}</p>
        <div className="mt-2 flex items-center gap-2 text-[#0f6a5a] text-xs font-semibold">
          <span>View profile</span>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
            <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/* --------------------------------
   Leadership Tabs
--------------------------------- */
function LeadershipSection({ data, initial }) {
  const sections = useMemo(() => Object.keys(data || {}), [data]);
  const [active, setActive] = useState(
    initial && data?.[initial] ? initial : sections[0]
  );

  // keyboard support for tabs
  const tablistRef = useRef(null);
  useEffect(() => {
    const list = tablistRef.current;
    if (!list) return;
    const onKeyDown = (e) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      const tabs = [...list.querySelectorAll("[role='tab']")];
      let idx = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
      if (e.key === "ArrowRight") idx = (idx + 1) % tabs.length;
      if (e.key === "ArrowLeft") idx = (idx - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") idx = 0;
      if (e.key === "End") idx = tabs.length - 1;
      tabs[idx]?.focus();
      const label = tabs[idx]?.dataset?.label;
      if (label) setActive(label);
    };
    list.addEventListener("keydown", onKeyDown);
    return () => list.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!sections.length) return null;

  return (
    <section className="py-16 bg-white" id="leadership">
      <div className="container max-w-screen-xl mx-auto px-4">
        <header className="text-center mb-10" data-reveal="fade-up">
          <h2 className="text-3xl font-extrabold text-[#0d315c] tracking-tight">Leadership</h2>
          <p className="mt-2 text-slate-600 max-w-3xl mx-auto">
            A clear, organized view of the teams steering SMRU.
          </p>
        </header>

        {/* Tabs */}
        <div className="w-full overflow-x-auto no-scrollbar" data-reveal="fade-up" style={{ "--delay": "0.05s" }}>
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Leadership Sections"
            className="inline-flex gap-2 bg-slate-50 p-1.5 rounded-xl ring-1 ring-slate-200"
          >
            {sections.map((label) => {
              const isActive = label === active;
              const count = data[label]?.length || 0;
              return (
                <button
                  key={label}
                  role="tab"
                  data-label={label}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(label)}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-[13.5px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c] focus-visible:ring-offset-2",
                    isActive
                      ? "bg-white text-[#0d315c] shadow-sm ring-1 ring-slate-200"
                      : "text-slate-600 hover:text-[#0d315c]"
                  )}
                >
                  <span>{label}</span>
                  <span className={cn(
                    "inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px]",
                    isActive ? "bg-[#e6effa] text-[#0d315c]" : "bg-slate-200 text-slate-700"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div role="tabpanel" aria-label={active} className="mt-8">
          {data[active]?.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(data[active] || []).map((m, idx) => (
                <LeaderCard key={`${active}-${idx}-${m?.slug || "x"}`} person={m} to={`/leadership/${m.slug || ""}`} />
              ))}
            </div>
          ) : (
            <div className="mt-8 grid place-items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-14">
              <p className="text-slate-600">Profiles coming soon.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}

/* --------------------------------
   Page: About (ordered as requested)
--------------------------------- */
export default function About() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ---- Journey: unchanged ---- */
  const journeyData = [
    { year: "1996", title: "Engineering Foundation – Hyderabad", description: "St. Mary’s College of Engineering & Technology opens at Deshmukhi, launching the St. Mary’s legacy.", icon: <FaBuilding aria-hidden />, side: "left" },
    { year: "1998", title: "Management Studies Begin", description: "St. Mary’s P.G. College (MBA) starts, adding business education.", icon: <FaBookOpen aria-hidden />, side: "right" },
    { year: "1999", title: "Technology P.G. Expansion", description: "MCA programme established, strengthening IT studies.", icon: <FaLaptopMedical aria-hidden />, side: "left" },
    { year: "2006", title: "Teacher-Education Entry", description: "B.Ed. colleges open in Hyderabad and Podili (Prakasam).", icon: <FaChalkboardTeacher aria-hidden />, side: "right" },
    { year: "2007", title: "Twin Growth Spurts", description: "Hyderabad Pharmacy College added; in Guntur, Engineering, P.G. Centre & Pharmacy colleges launch at Chebrolu.", icon: <FaFlask aria-hidden />, side: "left" },
    { year: "2008", title: "Inclusive & Regional Reach", description: "Women’s Engineering College; PGDM colleges in Hyderabad; MBA & MCA colleges at Podili (Prakasam).", icon: <FaUsers aria-hidden />, side: "right" },
    { year: "2009", title: "Integrated & Tech Leap", description: "Integrated Campus Hyderabad and CE&T Patancheru start; Sree Harsha Technologies training centre opens.", icon: <FaGraduationCap aria-hidden />, side: "left" },
    { year: "2011", title: "Pan-India Presence – Kolkata", description: "St. Mary’s Technical Campus Kolkata launches with Engineering, Management & MCA schools.", icon: <FaGlobe aria-hidden />, side: "right" },
    { year: "2020", title: "Creative & Digital Frontier", description: "Visual Arts & Design Degree College opens; tele-rehab and digital-health pilots roll out.", icon: <FaPaintBrush aria-hidden />, side: "left" },
    { year: "2025", title: "SMRU Chartered", description: "India’s first private university dedicated to rehabilitation sciences.", icon: <FaUniversity aria-hidden />, side: "right" },
  ];

  /* ---- Leadership data (slugs match /leadership/:slug routes) ---- */
  const leadershipData = {
    "Sponsor Body": [
      { slug: "founder",  name: "Dr. K.V.K. Rao", role: "Founder, Chairman & Chancellor", image: founderImg },
      { slug: "co-founder", name: "Smt. K.V.N.V Bharathi", role: "Co-Founder & Pro-Chancellor", image: bharathiImg },
      { slug: "ceo", name: "Mr. K. Sri Harsha", role: "Secretary & CEO", image: harshaImg },
      { slug: "treasurer", name: "Smt. K. Indraja", role: "Treasurer & CFO", image: indrajaImg },
      { slug: "joint-secretary", name: "Smt. K. Indu Aparna", role: "Joint Secretary & COO", image: induImg },
    ],
    "University Governing Body": [
      { slug: "ugb-1", name: "Coming Soon...", role: "Member", image: placeHolder },
      { slug: "ugb-2", name: "Coming Soon...", role: "Member", image: placeHolder },
      { slug: "ugb-3", name: "Coming Soon...", role: "Member", image: placeHolder },
      { slug: "ugb-4", name: "Coming Soon...", role: "Member", image: placeHolder },
    ],
    "University BOM": [
      { slug: "vice-chancellor", name: "Lt Gen Pradeep Chandran Nair (PVSM, AVSM, YSM)", role: "Vice-Chancellor", image: vc },
      { slug: "cpo", name: "Sekhar Vijayanth Divakaruni", role: "Chief People Officer", image: placeHolder },
    ],
    "Academic Council": [
      { slug: "ac-1", name: "Coming Soon...", role: "Chair", image: placeHolder },
      { slug: "ac-2", name: "Coming Soon...", role: "Member", image: placeHolder },
      { slug: "ac-3", name: "Coming Soon...", role: "Member", image: placeHolder },
    ],
  };

  return (
    <>
      {/* HERO */}
      <section className="relative w-full min-h-[48vh] bg-[radial-gradient(1200px_600px_at_15%_10%,rgba(255,255,255,0.12)_0,transparent_60%),linear-gradient(135deg,#0d315c_0%,#0b3a7a_50%,#019e6e_100%)]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2244%22 height=%2244%22 viewBox=%220 0 40 40%22><path fill=%22%23ffffff14%22 d=%22M0 39h40v1H0zM0 0h1v40H0z%22/></svg>')] opacity-[0.06]" />
        <div className="container max-w-screen-xl mx-auto px-4 pt-28 md:pt-32 pb-14 flex flex-col items-center justify-center text-center">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.35)]" data-reveal="fade-up">
            About SMRU
          </h1>
          <p
            className="mt-3 max-w-3xl text-white/95 text-lg md:text-xl leading-relaxed"
            data-reveal="fade-up"
            style={{ "--delay": "0.08s" }}
          >
            SMRU empowers healthcare professionals to transform lives through world-class rehabilitation education, innovative research, and compassionate care.
          </p>
        </div>
      </section>

      {/* 1) WHO WE ARE (moved first) */}
      <section className="py-16 bg-slate-50">
        <div className="container max-w-screen-xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3" data-reveal="fade-up">
              <span className="h-6 w-1.5 rounded-full bg-[#ffaf3a]" />
              <h2 className="text-3xl font-extrabold text-[#0d315c] tracking-tight">Who We Are</h2>
            </div>
            <div
              className="mt-4 space-y-4 text-slate-700 text-[1.04rem] leading-relaxed"
              data-reveal="fade-up"
              style={{ "--delay": "0.08s" }}
            >
              <p><strong>St. Mary’s Rehabilitation University (SMRU)</strong> is India’s pioneering private university devoted exclusively to rehabilitation sciences and inclusive healthcare. Our network spans Hyderabad, Guntur, Prakasam, Patancheru and Kolkata.</p>
              <p>Programmes in Physiotherapy, Occupational Therapy, Clinical Psychology, Speech-Language Therapy and Rehabilitation Nursing blend rigorous clinical training, cutting-edge research and a culture of empathy with hands-on experience in modern labs and partner hospitals.</p>
              <p>Guided by distinguished faculty and strong hospital-industry collaborations, SMRU sets new benchmarks in rehabilitation education—restoring mobility, independence and quality of life.</p>
            </div>
          </div>
          <div className="flex justify-center" data-reveal="fade-left">
            <img
              src={campusImage}
              alt="SMRU campus"
              className="w-full max-w-[520px] rounded-2xl shadow-[0_12px_34px_rgba(13,49,92,0.18)] ring-1 ring-slate-200"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 2) About the Society & Establishment + Core Objectives */}
      <section className="py-16 bg-white">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex items-center gap-3" data-reveal="fade-up">
            <span className="h-6 w-1.5 rounded-full bg-[#ffaf3a]" />
            <h2 className="text-3xl font-extrabold text-[#0d315c] tracking-tight">
              About the Society and Establishment of University
            </h2>
          </div>

          <div className="mt-4 text-slate-700 leading-relaxed space-y-4" data-reveal="fade-up" style={{ "--delay": "0.06s" }}>
            <p>
              The Joseph Sriharsha &amp; Mary Indraja Educational Society (Regd. No. 6624/1996), a Christian Minority Institution with over 25 years of distinguished service in technical and professional education, has established St. Mary’s Rehabilitation University (SMRU) in Hyderabad, Telangana. Envisioned as India’s first integrated Centre of Excellence in Disability Studies, Rehabilitation, and Allied &amp; Health Sciences, the university seeks to transform the rehabilitation landscape of the country.
            </p>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-[#0d315c]">Our Core Objectives</h3>
              <h4 className="mt-1 text-[15px] text-slate-600">Commitment to Rehabilitation and Disability Empowerment</h4>

              <ol className="mt-4 space-y-4 list-decimal pl-5">
                <li>
                  <strong>Bridging the National Gap in Rehabilitation Professionals</strong>&nbsp;SMRU is committed to addressing the critical national shortage of qualified rehabilitation professionals by offering multidisciplinary, academically rigorous, and clinically immersive programs across core fields such as Rehabilitation Sciences, Health Sciences, Psychology, Speech &amp; Hearing, Engineering, Special Need Education, Nursing, and Pharmaceutical Science.
                </li>

                <li>
                  The University provides integrated, umbrella rehabilitation services under the Name and style of <strong>Dr. Bharathi Rao’s Advanced Comprehensive Rehabilitation services</strong> to address all 21 disabilities under the RPWD Act including health-related disabilities through Comprehensive Therapeutic services out door &amp; indoor, Comprehensive Diagnostic services, Super-specialty Medical rehabilitation Hospital, Psychiatric Rehabilitation Hospital, Special and inclusive schools for Childrens with special Needs, Geriatric Homes, Center of excellence for women empowerment, center for Palliative care, Vocational Rehabilitation, workshops for Assistive devices &amp; Artificial limbs with a multi-institutional model, ensuring holistic support across physical, mental and educational domains.
                </li>

                <li>
                  <strong>Inclusive Rehabilitation-Education Ecosystem</strong> embedding Community-Based Rehabilitation (CBR) into student training, enabling them to work in real-world settings while delivering affordable or free care aligned with government welfare schemes.
                </li>

                <li>
                  <strong>Rural Outreach via Satellite Rehabilitation Hubs</strong> that act as both training grounds and therapy centers, ensuring early intervention in semi-urban and rural regions.
                </li>

                <li>
                  <strong>Empowerment through Skills and Livelihood</strong> SMRU places strong emphasis on vocational training and upskilling of PwDs to enhance their employability in both public and private sectors, ensuring utilization of the statutory 5% reservation in employment and advancing socio-economic empowerment.
                </li>

                <li>
                  <strong>Alignment with Constitutional and Legislative Mandates</strong> The University’s objectives align with Article 41 of the Constitution of India, the Rights of Persons with Disabilities (RPwD) Act, 2016, and other national mandates promoting inclusive, equitable, and accessible education and healthcare.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* VISION / MISSION */}
      <section className="py-16 bg-white">
        <div className="container max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          <article
            className="rounded-2xl border-t-4 border-[#0d315c] bg-white p-8 text-center shadow-sm ring-1 ring-slate-200/60"
            data-reveal="fade-up"
          >
            <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-2xl bg-[#e6effa] text-[#0d315c] text-4xl">
              <FaEye aria-hidden />
            </div>
            <h3 className="text-xl font-bold text-[#0d315c]">Our Vision</h3>
            <p className="mt-2 text-slate-700">To be a national leader in evidence-based rehabilitative education—fostering innovation and shaping compassionate professionals.</p>
          </article>
          <article
            className="rounded-2xl border-t-4 border-[#ffaf3a] bg-white p-8 text-center shadow-sm ring-1 ring-slate-200/60"
            data-reveal="fade-up"
            style={{ "--delay": "0.08s" }}
          >
            <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-2xl bg-[#fff3e0] text-[#ffaf3a] text-4xl">
              <FaBullseye aria-hidden />
            </div>
            <h3 className="text-xl font-bold text-[#0d315c]">Our Mission</h3>
            <p className="mt-2 text-slate-700">To empower students with deep knowledge, practical expertise and strong ethics—advancing research and community engagement.</p>
          </article>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-16 bg-white">
        <div className="container max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-[#0d315c]" data-reveal="fade-up">Our Core Values</h2>
          <p className="mt-3 text-slate-600" data-reveal="fade-up" style={{ "--delay": "0.08s" }}>
            Principles that guide our commitment to excellence in rehabilitation education and patient care.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: <FaTrophy aria-hidden />, title: "Excellence", desc: "Outstanding education, research and care." },
              { icon: <FaHeart aria-hidden />, title: "Compassion", desc: "Empathy and dignity in every interaction." },
              { icon: <FaLightbulb aria-hidden />, title: "Innovation", desc: "Continuous improvement and new tech." },
              { icon: <FaShieldAlt aria-hidden />, title: "Integrity", desc: "Ethical standards and transparency." },
            ].map((v, i) => (
              <article
                key={i}
                className="rounded-2xl border-t-4 border-[#019e6e] bg-white p-8 text-center shadow-sm ring-1 ring-slate-200/60"
                data-reveal="fade-up"
                style={{ "--delay": `${0.08 + i * 0.06}s` }}
              >
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-[#e9faf3] text-[#019e6e] text-4xl">{v.icon}</div>
                <h3 className="mt-3 font-bold text-[#0d315c]">{v.title}</h3>
                <p className="mt-1 text-slate-600">{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY (unchanged) */}
      <section className="py-16 bg-slate-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#0d315c]" data-reveal="fade-up">Our Journey</h2>
            <p className="mt-3 text-slate-600 max-w-3xl mx-auto" data-reveal="fade-up" style={{ "--delay": "0.08s" }}>
              From a single engineering college to India’s foremost rehabilitation university—our journey reflects consistent growth, innovation and impact.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* mobile line */}
            <div className="md:hidden absolute top-0 bottom-0 left-5 w-px bg-slate-200" />
            {/* desktop center line */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-slate-200" />
            <ul className="space-y-8 md:space-y-12">
              {journeyData.map((e, i) => {
                const right = e.side === "right";
                return (
                  <li
                    key={i}
                    className="relative md:grid md:grid-cols-9 md:items-start md:gap-6"
                    data-reveal="fade-up"
                    style={{ "--delay": `${i * 0.06}s` }}
                  >
                    <span className="absolute top-4 h-3 w-3 rounded-full bg-[#ffaf3a] shadow-[0_0_0_4px_white] ring-1 ring-slate-300 z-10 left-5 md:left-1/2 md:-translate-x-1/2" />
                    {!right ? (
                      <article className="ml-10 md:ml-0 md:col-span-4 md:col-start-1 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:border-l-4 md:border-[#019e6e]">
                        <div className="flex items-center gap-2 text-[#019e6e] font-semibold">
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#e9faf3]">{e.icon}</span>{e.year}
                        </div>
                        <h3 className="mt-2 font-bold text-[#0d315c]">{e.title}</h3>
                        <p className="mt-1 text-slate-700 text-[0.96rem]">{e.description}</p>
                      </article>
                    ) : (
                      <article className="ml-10 md:ml-0 md:col-span-4 md:col-start-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:border-r-4 md:border-[#019e6e]">
                        <div className="flex items-center gap-2 text-[#019e6e] font-semibold">
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#e9faf3]">{e.icon}</span>{e.year}
                        </div>
                        <h3 className="mt-2 font-bold text-[#0d315c]">{e.title}</h3>
                        <p className="mt-1 text-slate-700 text-[0.96rem]">{e.description}</p>
                      </article>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURED STRIP — Leading a legacy of transformative impact */}
      <section className="py-12 bg-white" id="legacy">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d315c]" data-reveal="fade-up">
              Leading a legacy of transformative impact
            </h2>
            <Link
              to="#leadership"
              className="inline-flex items-center gap-2 text-[#0f6a5a] font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c] focus-visible:ring-offset-2"
            >
              Explore Leadership
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M13.172 12 8.222 7.05l1.415-1.414L16 12l-6.364 6.364-1.414-1.414z" />
              </svg>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { name: "Dr. K.V.K. Rao", role: "Founder, Chairman & Chancellor", image: founderImg, slug: "founder" },
              { name: "Smt. K.V.N.V Bharathi", role: "Co-Founder & Pro-Chancellor", image: bharathiImg, slug: "co-founder" },
              { name: "Mr. K. Sri Harsha", role: "Secretary & CEO", image: harshaImg, slug: "ceo" },
              { name: "Smt. K. Indraja", role: "Treasurer & CFO", image: indrajaImg, slug: "treasurer" },
              { name: "Smt. K. Indu Aparna", role: "Joint Secretary & COO", image: induImg, slug: "joint-secretary" },
            ].map((p) => (
              <LeaderCard
                key={p.slug}
                person={{ name: p.name, role: p.role, image: p.image, slug: p.slug }}
                to={`/leadership/${p.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP TABS */}
      <LeadershipSection data={leadershipData} initial="Sponsor Body" />

      {/* Reveal animations */}
      <style>{`
        :root { --ease-out: cubic-bezier(.22,.95,.36,1); }
        [data-reveal]{ opacity:0; transform: translateY(14px); transition: opacity .7s var(--ease-out), transform .7s var(--ease-out); transition-delay: var(--delay, 0s); will-change: opacity, transform; }
        [data-reveal].is-visible{ opacity:1; transform:none; }
        [data-reveal="fade-up"]{ transform: translateY(18px); }
        [data-reveal="fade-left"]{ transform: translateX(22px); }
        [data-reveal="fade-right"]{ transform: translateX(-22px); }
        [data-reveal="zoom-in"]{ transform: scale(.96); }
      `}</style>
    </>
  );
}
