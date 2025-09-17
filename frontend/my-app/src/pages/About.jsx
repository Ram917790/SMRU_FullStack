// UI-only changes: Leadership structured, image-free, conditional View Profile. No logic changes.
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
  FaEye, FaBullseye, FaTrophy, FaHeart, FaLightbulb, FaShieldAlt,
  FaUniversity, FaBuilding, FaBookOpen, FaChalkboardTeacher, FaFlask,
  FaUsers, FaGraduationCap, FaGlobe, FaPaintBrush, FaLaptopMedical
} from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";
const PLACEHOLDER = `data:image/svg+xml;utf8,` + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480">
    <rect width="100%" height="100%" fill="#e5e7eb"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="Arial, sans-serif" font-size="18" fill="#6b7280">
      Image coming soon
    </text>
  </svg>`
);
const onImgError = (e) => { e.currentTarget.src = PLACEHOLDER; };
const cn = (...c) => c.filter(Boolean).join(" ");

/* ---------- Leader Card (image-free) ---------- */
function LeaderCard({ person, to }) {
  const headingId = `leader-${person?.slug || person?.name || "x"}`;
  const bio = person?.bio || person?.about || person?.summary || "";
  const canView = person?.viewProfileEnabled === true || Boolean(person?.viewProfileUrl) || Boolean(person?.profileId || person?.slug);
  const hasExternal = Boolean(person?.viewProfileUrl);
  const hasRoute = Boolean(person?.slug);
  return (
    <article className="group rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary" aria-labelledby={headingId}>
      <div className="p-5">
        <h3 id={headingId} className="text-lg font-semibold text-slate-900 leading-tight">{person.name}</h3>
        <p className="mt-0.5 text-sm text-slate-600">{person.role}</p>
        <div className="my-4 h-px bg-slate-100" />
        {bio && (
          <p className="mt-3 text-sm text-slate-700 line-clamp-4">{bio}</p>
        )}
        {canView && (hasExternal || hasRoute) && (
          <div className="mt-5">
            {hasExternal ? (
              <a
                href={person.viewProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View profile of ${person?.name || "Leader"}`}
                className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-primary text-white shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                View Profile
              </a>
            ) : (
              <Link
                to={`/leadership/${person.slug}`}
                aria-label={`View profile of ${person?.name || "Leader"}`}
                className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-primary text-white shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                View Profile
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

/* ---------- Leadership Tabs (dynamic) ---------- */
function LeadershipSection() {
  const [groups, setGroups] = useState([]);
  const [active, setActive] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [groupFilter, setGroupFilter] = useState("All"); // UI-only filter; does not alter data
  const [visibleCounts, setVisibleCounts] = useState({}); // UI-only pagination per group
  const DEFAULT_PAGE = 8; // initial members per group

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/leadership/`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const gs = Array.isArray(data.groups) ? data.groups : [];
        if (!alive) return;
        setGroups(gs);
        setActive(gs[0]?.group || "");
        // initialize pagination counts for groups
        const init = {};
        gs.forEach((g) => { init[g.group] = DEFAULT_PAGE; });
        setVisibleCounts(init);
      } catch (e) {
        setError("Couldn't load leadership right now.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white" aria-busy="true">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="h-8 w-40 bg-slate-200/70 rounded mb-6 animate-pulse" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="aspect-[4/5] rounded-xl bg-slate-200/70 animate-pulse" />
                <div className="h-4 w-3/5 mt-3 bg-slate-200/70 rounded animate-pulse" />
                <div className="h-3 w-2/5 mt-2 bg-slate-200/70 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-800">{error}</div>
        </div>
      </section>
    );
  }
  if (!groups.length) return null;

  const sections = groups.map(g => g.group);
  const activeGroup = groups.find(g => g.group === active);

  return (
    <section className="py-12 md:py-20 bg-white" id="leadership">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0d315c] mb-6">Leadership</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Meet the visionary leaders and dedicated professionals who guide SMRU's mission of excellence in rehabilitation education.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="h-1 w-12 bg-[#0d315c] rounded-full"></div>
            <div className="h-1 w-8 bg-[#10bb82] rounded-full"></div>
            <div className="h-1 w-12 bg-[#ffaf3a] rounded-full"></div>
          </div>
        </header>

        {/* Group selector for large datasets (UI-only) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <label htmlFor="leader-group-select" className="sr-only">Select group</label>
          <select
            id="leader-group-select"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
          >
            <option value="All">All Groups</option>
            {groups.map((g) => (
              <option key={g.group} value={g.group}>{g.group}</option>
            ))}
          </select>
        </div>

        {/* Groups grid */}
        <div className="mt-6 md:mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(groupFilter === "All" ? groups : groups.filter((gg) => gg.group === groupFilter)).map((g, gi) => {
            const groupId = `leader-group-${gi}`;
            const members = g?.leaders || [];
            const palette = [
              { pill: "bg-indigo-50 text-indigo-700 ring-indigo-200", card: "bg-indigo-50 ring-indigo-100", accent: "text-indigo-700" },
              { pill: "bg-emerald-50 text-emerald-700 ring-emerald-200", card: "bg-emerald-50 ring-emerald-100", accent: "text-emerald-700" },
              { pill: "bg-rose-50 text-rose-700 ring-rose-200", card: "bg-rose-50 ring-rose-100", accent: "text-rose-700" },
            ][gi % 3];
            const groupKey = g.group;
            const visible = Math.max(visibleCounts[groupKey] || DEFAULT_PAGE, 0);
            const sliced = members.slice(0, visible);
            return (
               <section key={g.group || gi} className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm p-5" aria-labelledby={groupId}>
                 <div className="text-center mb-6">
                   <h3 id={groupId} className="text-2xl font-bold text-[#0d315c] break-words">{g.group}</h3>
                   <div className="w-16 h-1 bg-[#10bb82] rounded-full mx-auto mt-3"></div>
                 </div>
                <div className="mt-4 space-y-4">
                  {sliced.length ? sliced.map((m, mi) => {
                    const nameId = `leader-${gi}-${mi}`;
                    const bio = m?.bio || m?.about || m?.summary || "";
                    const canView = m?.viewProfileEnabled === true && (Boolean(m?.viewProfileUrl) || Boolean(m?.profileId || m?.slug));
                    const hasExternal = Boolean(m?.viewProfileUrl);
                    const hasRoute = Boolean(m?.slug);
                    
                    return (
                      <article key={m?.slug || `${gi}-${mi}`} className={`rounded-xl ring-1 p-4 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-primary ${palette.card} break-words`} aria-labelledby={nameId}>
                        {/* Profile Image */}
                        <div className="flex items-center gap-3 mb-3">
                          {m.profile_image ? (
                            <img
                              src={m.profile_image}
                              alt={`${m.name} profile`}
                              className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 shadow-sm"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full border-2 border-slate-200 shadow-sm bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                              {m.name ? m.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'L'}
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 id={nameId} className="text-sm md:text-base font-semibold text-slate-900">{m.name}</h4>
                          </div>
                        </div>
                         <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-[#10bb82] text-white text-xs font-semibold">
                           {m.role}
                         </div>
                        {bio && <p className="mt-2 text-xs md:text-sm text-slate-700 line-clamp-4 md:line-clamp-5">{bio}</p>}
                        
                        {canView && (hasExternal || hasRoute) && (
                          <div className="mt-3">
                            {hasExternal ? (
                              <a href={m.viewProfileUrl} target="_blank" rel="noopener noreferrer" aria-label={`View profile of ${m?.name || "Leader"}`} className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs md:text-sm font-semibold bg-primary text-white shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">View Profile</a>
                            ) : (
                              <Link to={`/leadership/${m.slug}`} aria-label={`View profile of ${m?.name || "Leader"}`} className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs md:text-sm font-semibold bg-primary text-white shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">View Profile</Link>
                            )}
                          </div>
                        )}
                      </article>
                    );
                  }) : (
                    <div className="rounded-md border border-dashed border-slate-300 bg-white p-4 text-center text-slate-500">Profiles coming soon.</div>
                  )}
                </div>
                {members.length > visible && (
                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold bg-white text-slate-700 ring-1 ring-slate-300 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      onClick={() => setVisibleCounts((prev) => ({ ...prev, [groupKey]: visible + DEFAULT_PAGE }))}
                    >
                      Show more
                    </button>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Page Content (static; unchanged narrative) ---------- */
export default function About() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

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
    { year: "2025", title: "St.Mary's Rehabilitation University", description: "India’s first private university dedicated to rehabilitation sciences.", icon: <FaUniversity aria-hidden />, side: "right" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative w-full min-h-[48vh] bg-[radial-gradient(1200px_600px_at_15%_10%,rgba(255,255,255,0.12)_0,transparent_60%),linear-gradient(135deg,#0d315c_0%,#0b3a7a_50%,#019e6e_100%)]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2244%22 height=%2244%22 viewBox=%220 0 40 40%22><path fill=%22%23ffffff14%22 d=%22M0 39h40v1H0zM0 0h1v40H0z%22/></svg>')] opacity-[0.06]" />
        <div className="container max-w-screen-xl mx-auto px-4 pt-28 md:pt-32 pb-16 md:pb-20 flex flex-col items-center justify-center text-center">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.35)]" data-reveal="fade-up">
            About SMRU
          </h1>
          <p className="mt-4 max-w-3xl text-white/95 text-lg md:text-xl leading-relaxed text-balance" data-reveal="fade-up" style={{ "--delay": "0.08s" }}>
            SMRU empowers healthcare professionals to transform lives through world-class rehabilitation education, innovative research, and compassionate care.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 bg-slate-50">
        <div className="container max-w-screen-xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3" data-reveal="fade-up">
              <span className="h-6 w-1.5 rounded-full bg-[#ffaf3a]" />
              <h2 className="text-3xl font-extrabold text-[#0d315c] tracking-tight">Who We Are</h2>
            </div>
            <div className="mt-5 space-y-4 text-slate-700 text-[1.05rem] leading-relaxed" data-reveal="fade-up" style={{ "--delay": "0.08s" }}>
              <p><strong>St. Mary’s Rehabilitation University (SMRU)</strong> is India’s pioneering private university devoted exclusively to rehabilitation sciences and inclusive healthcare. Our network spans Hyderabad, Guntur, Prakasam, Patancheru and Kolkata.</p>
              <p>Programmes in Physiotherapy, Occupational Therapy, Clinical Psychology, Speech-Language Therapy and Rehabilitation Nursing blend rigorous clinical training, cutting-edge research and a culture of empathy with hands-on experience in modern labs and partner hospitals.</p>
              <p>Guided by distinguished faculty and strong hospital-industry collaborations, SMRU sets new benchmarks in rehabilitation education—restoring mobility, independence and quality of life.</p>
            </div>
          </div>
          <div className="flex justify-center" data-reveal="fade-left">
            <img src={campusImage} alt="SMRU campus" onError={onImgError}
              className="w-full max-w-[560px] rounded-2xl shadow-[0_12px_34px_rgba(13,49,92,0.18)] ring-1 ring-slate-200" loading="lazy" />
          </div>
        </div>
      </section>

      {/* About the Society & Core Objectives */}
      <section className="py-20 bg-white">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex items-center gap-3" data-reveal="fade-up">
            <span className="h-6 w-1.5 rounded-full bg-warning" />
            <span className="h-6 w-1.5 rounded-full bg-warning" />
            <h2 className="text-3xl font-extrabold text-[#0d315c] tracking-tight">About the Society and Establishment of University</h2>
          </div>
          <div className="about-rich mt-6 max-w-5xl mx-auto rounded-xl bg-slate-50 p-6 md:p-8 ring-1 ring-slate-200 shadow-sm" data-reveal="fade-up" style={{ "--delay": "0.06s" }}>
            <p className="text-slate-700 leading-relaxed">
              The Joseph Sriharsha &amp; Mary Indraja Educational Society (Regd. No. 6624/1996), a Christian Minority Institution with over 25 years of distinguished service in technical and professional education, has established St. Mary’s Rehabilitation University (SMRU) in Hyderabad, Telangana. Envisioned as India’s first integrated Centre of Excellence in Disability Studies, Rehabilitation, and Allied &amp; Health Sciences, the university seeks to transform the rehabilitation landscape of the country.
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-bold text-[#0d315c]">Our Core Objectives</h3>
              <h4 className="mt-1 text-[15px] text-slate-600">Commitment to Rehabilitation and Disability Empowerment</h4>
              <ol className="mt-4 list-decimal pl-5 marker:text-warning">
                <li><strong>Bridging the National Gap in Rehabilitation Professionals:</strong> SMRU is committed to addressing the critical national shortage of qualified rehabilitation professionals by offering multidisciplinary, academically rigorous, and clinically immersive programs across core fields such as Rehabilitation Sciences, Health Sciences, Psychology, Speech &amp; Hearing, Engineering, Special Need Education, Nursing, and Pharmaceutical Science.</li>
                <li>The University provides integrated, umbrella rehabilitation services under the Name and style of <strong>Dr. Bharathi Rao’s Advanced Comprehensive Rehabilitation services</strong> to address all 21 disabilities under the RPWD Act including health-related disabilities through Comprehensive Therapeutic services out door &amp; indoor, Comprehensive Diagnostic services, Super-specialty Medical rehabilitation Hospital, Psychiatric Rehabilitation Hospital, Special and inclusive schools for Childrens with special Needs, Geriatric Homes, Center of excellence for women empowerment, center for Palliative care, Vocational Rehabilitation, workshops for Assistive devices &amp; Artificial limbs with a multi-institutional model, ensuring holistic support across physical, mental and educational domains.</li>
                <li><strong>Inclusive Rehabilitation-Education Ecosystem</strong> embedding Community-Based Rehabilitation (CBR) into student training, enabling them to work in real-world settings while delivering affordable or free care aligned with government welfare schemes.</li>
                <li><strong>Rural Outreach via Satellite Rehabilitation Hubs</strong> that act as both training grounds and therapy centers, ensuring early intervention in semi-urban and rural regions.</li>
                <li><strong>Empowerment through Skills and Livelihood:</strong> SMRU places strong emphasis on vocational training and upskilling of PwDs to enhance their employability in both public and private sectors, ensuring utilization of the statutory 5% reservation in employment and advancing socio-economic empowerment.</li>
                <li><strong>Alignment with Constitutional and Legislative Mandates</strong> The University’s objectives align with Article 41 of the Constitution of India, the Rights of Persons with Disabilities (RPwD) Act, 2016, and other national mandates promoting inclusive, equitable, and accessible education and healthcare.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="py-14 bg-white">
        <div className="container max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-4 md:gap-5 items-stretch">
          <article className="rounded-lg bg-gradient-to-b from-white to-slate-50 p-6 text-center shadow-sm ring-1 ring-slate-300 transition-all hover:-translate-y-0.5 hover:shadow-md max-w-[520px] mx-auto h-full flex flex-col" data-reveal="fade-up">
            <div className="mx-auto h-1.5 w-10 rounded-full bg-[#0d315c]" />
            <div className="mx-auto mt-3 grid h-16 w-16 place-items-center rounded-lg bg-[#e6effa] text-[#0d315c] text-3xl ring-1 ring-[#0d315c]/10"><FaEye aria-hidden /></div>
            <h3 className="mt-3 text-lg md:text-xl font-bold tracking-tight text-[#0d315c]">Our Vision</h3>
            <p className="mt-2 text-slate-700 text-[0.95rem] md:text-base">To be a national leader in evidence-based rehabilitative education—fostering innovation and shaping compassionate professionals.</p>
          </article>
          <article className="rounded-lg bg-gradient-to-b from-white to-slate-50 p-6 text-center shadow-sm ring-1 ring-slate-300 transition-all hover:-translate-y-0.5 hover:shadow-md max-w-[520px] mx-auto h-full flex flex-col" data-reveal="fade-up" style={{ "--delay": "0.08s" }}>
            <div className="mx-auto h-1.5 w-10 rounded-full bg-warning" />
            <div className="mx-auto mt-3 grid h-16 w-16 place-items-center rounded-lg bg-[#fff3e0] text-warning text-3xl ring-1 ring-warning/15"><FaBullseye aria-hidden /></div>
            <h3 className="mt-3 text-lg md:text-xl font-bold tracking-tight text-[#0d315c]">Our Mission</h3>
            <p className="mt-2 text-slate-700 text-[0.95rem] md:text-base">To empower students with deep knowledge, practical expertise and strong ethics—advancing research and community engagement.</p>
          </article>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-14 bg-white">
        <div className="container max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-[#0d315c]" data-reveal="fade-up">Our Core Values</h2>
          <p className="mt-3 text-slate-600" data-reveal="fade-up" style={{ "--delay": "0.08s" }}>
            Principles that guide our commitment to excellence in rehabilitation education and patient care.
          </p>
          <div className="mt-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              { icon: <FaTrophy aria-hidden />, title: "Excellence", desc: "Outstanding education, research and care." },
              { icon: <FaHeart aria-hidden />, title: "Compassion", desc: "Empathy and dignity in every interaction." },
              { icon: <FaLightbulb aria-hidden />, title: "Innovation", desc: "Continuous improvement and new tech." },
              { icon: <FaShieldAlt aria-hidden />, title: "Integrity", desc: "Ethical standards and transparency." },
            ].map((v, i) => (
              <article key={i} className="relative rounded-lg bg-gradient-to-b from-white to-slate-50 p-5 text-center shadow-sm ring-1 ring-slate-300 transition-all hover:shadow-md hover:-translate-y-0.5 max-w-[280px] mx-auto h-full flex flex-col" data-reveal="fade-up" style={{ "--delay": `${0.08 + i * 0.06}s` }}>
                <div className="mx-auto h-1.5 w-10 rounded-full bg-[#019e6e]" />
                <div className="mx-auto mt-3 grid h-12 w-12 place-items-center rounded-lg bg-[#e9faf3] text-[#019e6e] text-xl ring-1 ring-[#019e6e]/10">{v.icon}</div>
                <h3 className="mt-2 font-bold text-[#0d315c] text-[0.98rem] tracking-tight">{v.title}</h3>
                <p className="mt-1 text-slate-600 text-[0.9rem] line-clamp-2">{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 bg-slate-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#0d315c]" data-reveal="fade-up">Our Journey</h2>
            <p className="mt-3 text-slate-600 max-w-3xl mx-auto" data-reveal="fade-up" style={{ "--delay": "0.08s" }}>
              From a single engineering college to India’s foremost rehabilitation university—our journey reflects consistent growth, innovation and impact.
            </p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="md:hidden absolute top-0 bottom-0 left-5 w-px bg-slate-200" />
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-slate-200" />
            <ul className="space-y-8 md:space-y-12">
              {journeyData.map((e, i) => {
                const right = e.side === "right";
                return (
                  <li key={i} className="relative md:grid md:grid-cols-9 md:items-start md:gap-6" data-reveal="fade-up" style={{ "--delay": `${i * 0.06}s` }}>
                    <span className="absolute top-4 h-3 w-3 md:h-3.5 md:w-3.5 rounded-full bg-[#ffaf3a] shadow-[0_0_0_4px_white] ring-1 ring-slate-300 z-10 left-5 md:left-1/2 md:-translate-x-1/2" />
                    {!right ? (
                      <article className="ml-10 md:ml-0 md:col-span-4 md:col-start-1 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 md:border-l-4 md:border-[#019e6e]">
                        <div className="flex items-center gap-2 text-[#019e6e] font-semibold">
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#e9faf3]">{e.icon}</span>{e.year}
                        </div>
                        <h3 className="mt-2 font-bold text-[#0d315c]">{e.title}</h3>
                        <p className="mt-1 text-slate-700 text-[0.96rem]">{e.description}</p>
                      </article>
                    ) : (
                      <article className="ml-10 md:ml-0 md:col-span-4 md:col-start-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 md:border-r-4 md:border-[#019e6e]">
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

      <LeadershipSection />

      

      {/* CTA */}
      <section className="py-12 md:py-20 bg-[#ffaf3a]" aria-label="Call to action">
        <div className="container max-w-screen-xl mx-auto px-4 text-center text-[#0d315c]">
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to explore SMRU?</h2>
          <p className="mt-3 max-w-2xl mx-auto text-[#0d315c]/90">Discover programs and connect with our admissions team to start your journey.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="/schools" className="inline-flex items-center gap-2 bg-white text-[#0d315c] hover:bg-slate-100 px-5 py-2.5 rounded-md font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c]/40">
              View Programs
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 bg-[#019e6e] hover:bg-[#0fa571] text-white px-5 py-2.5 rounded-md font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d315c]/40">
              Contact Admissions
            </a>
          </div>
        </div>
      </section>

      <style>{`
        :root { --ease-out: cubic-bezier(.22,.95,.36,1); }
        [data-reveal]{ opacity:0; transform: translateY(14px); transition: opacity .7s var(--ease-out), transform .7s var(--ease-out); transition-delay: var(--delay, 0s); will-change: opacity, transform; }
        [data-reveal].is-visible{ opacity:1; transform:none; }
        [data-reveal="fade-up"]{ transform: translateY(18px); }
        [data-reveal="fade-left"]{ transform: translateX(22px); }
        [data-reveal="fade-right"]{ transform: translateX(-22px); }
        [data-reveal="zoom-in"]{ transform: scale(.96); }
        .about-rich ol { list-style-position: outside; padding-left: 1.25rem; }
        .about-rich ol > li { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px 14px; box-shadow: 0 1px 2px rgba(13,49,92,0.04); }
        .about-rich ol > li + li { margin-top: 12px; }
        .about-rich h3 + h4 { margin-top: 4px; }
        .about-rich strong { color: #0d315c; }
      `}</style>
    </>
  );
}
