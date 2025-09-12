// src/data/leaders.js
// No images. Each item:
//   { name, role, about, slug? }  // add slug ONLY if you want "View Profile"

export const leadershipGroups = {
  "Governing Council": [
    {
      name: "Dr. Rev. K.V.K. Rao",
      role: "Chancellor",
      about:
        "Founder & Chairman, Joseph Sriharsha & Mary Indraja Educational Society",
    },
    {
      name: "Lt. Gen. (Dr.) Pradeep C. Nair",
      role: "Vice-Chancellor",
      about:
        "PVSM, AVSM, YSM (Retd.)",
    },
    {
      name: "Dr.Yogita Rana",
      role: "Member",
      about: "Secretary to Government, Telangana. Government Nominee",
    },
    {
      name: "Dr.Kuderu Rajagopal",
      role: "Member",
      about: "Former Vice - chancellor, JNT University, Hyderabad",
    },
    {
      name: "Sri. B.Lakshmikantam",
      role: "Member",
      about: "(Former Member of IAS)",
    },
    {
      name: "Sri. C.Koteswara Rao ",
      role: "Member",
      about: "Ex-Managing Director, Technology Services, Accenture India.",
    },
    {
      name: "Smt. K.V.N.V.Bharathi Devi ",
      role: "Member",
      about: "Co-Founder Joseph Sriharsha & Mary Indraja Educational Society.",
    },
    {
      name: "Sri. Rusheek Reddy K.V.",
      role: "Member",
      about: "Advocate High Court of Telangana",
    },
    // add 5–9 more…
    // { name: "Member Name", role: "Member", about: "2–3 lines…" },
  ],

  "Board of Management - BOM": [
    {
      name: "Lt. Gen. (Dr.) Pradeep C. Nair PVSM, AVSM, YSM (Retd.)",
      about: "B.A., M.Sc. (Defence Studies), PGDPM, Diploma in Public Administration, M.Phil., Ph.D. (IGNOU)",
      role: "Vice-Chancellor",
      // slug: "vice-chancellor",
    },
    {
      name: "Mr.Venkateswarlu Yaganti",
      role: "Member",
      about: "Director and CEO of YVR Group.",
      // slug: "cpo",
    },
    {
      name: "Sri. B. Nagabhushanam",
      role: "Member",
      about: "Chartered Accountant. ",
      // slug: "cpo",
    },
    {
      name: "Mr.Rajesh Yerramasu",
      role: "Member",
      about: "Co-Founder,CEO - M/s. Zestwings (India  UAE), Solutions Architect (Digital, IT & Cyber Governance) For SMRU",
      // slug: "cpo",
    },
    {
      name: "Mr. Sravanth Gajula",
      role: "Member",
      about: "2x Founder, TEDx Speaker, ISB Young Leader Awardee",
      // slug: "cpo",
    },
    {
      name: "Smt. K. Indu Aparna",
      role: "Member",
      about: "Chief Operating Officer, SMRU",
      // slug: "cpo",
    },
    {
      name: "Dr. B.  Valli",
      role: "Member",
      about: "Head, Department of Nursing",
      // slug: "cpo",
    },
    {
      name: "Dr. Joseph P. Mosiganti",
      role: "Member",
      about: "Head, Department  of Theology",
      // slug: "cpo",
    },
    // add more…
  ],

  "Sponsor Body": [
    // add 6–10 entries as you get them, e.g.:
    { name: "Joseph Sriharsha & Mary Indraja Educational Society", role: "Regd. Society"},
    { name: "Dr.Rev. K.V.K. Rao", role: "Chairman", about: "Founder",},
    { name: "Smt. K.V.N.V. Bharathi Devi", role: "Co-Chairperson", about: "Co-Founder",},
    { name: "K.Sri Harsha", role: "Secretary", about: "Chief Executive Officer, SMRU",},
    { name: "K.Indraja", role: "Treasurer", about: "Chief Financial Officer",},
    { name: "K.Indu Aparna", role: "Vice-President", about: "Chief Operating Officer, SMRU",},
  ],
};

// (Optional) profiles for /leaders/:slug pages.
// Only needed if you plan to use "View Profile" links.
export const leaders = [
  {
    slug: "founder",
    name: "Dr. K.V.K. Rao",
    role: "Founder, Chairman & Chancellor",
    about:
      "Founder & Chairman of JSMI Educational Society. Visionary behind SMRU and umbrella rehabilitation focus.",
    bio: `Sets strategic vision for SMRU and national CBR expansion.`,
  },
  {
    slug: "vice-chancellor",
    name: "Lt Gen Pradeep Chandran Nair (PVSM, AVSM, YSM)",
    role: "Vice-Chancellor",
    about:
      "Provides academic leadership, governance and strategic expansion for rehabilitation education.",
  },
  {
    slug: "cpo",
    name: "Sekhar Vijayanth Divakaruni",
    role: "Chief People Officer",
    about: "People strategy, faculty development and culture.",
  },
  // add more detailed profiles as you enable slugs…
];

export const leaderBySlug = Object.fromEntries(
  (leaders || []).map((p) => [p.slug, p])
);
