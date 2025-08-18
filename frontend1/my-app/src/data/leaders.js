// src/data/leaders.js
// Plain JS data only

// ✅ Correct imports with exact file names
import vcImg from "../assets/vc.jpg";
import sekharImg from "../assets/sekhar.jpg";
// import bharathiImg from "../assets/Bharathi.jpg";
// import founderImg from "../assets/kvk.jpg";

export const leaders = [
  {
    slug: "vice-chancellor",
    name: "Prof. [Full Name]",
    role: "Vice Chancellor",
    image: vcImg,
    tenure: "2024 – Present",
    bio: "Add the leader’s profile paragraph here. Keep it as plain text.",
    achievements: [
      "Launched multidisciplinary research clusters.",
      "Established global collaborations with leading universities.",
      "Improved student success metrics across programs."
    ],
    initiatives:
      "Guiding the university’s growth with focus on rehabilitation sciences, inclusion, and technology-enabled learning.",
    gallery: []
  },
  {
    slug: "registrar",
    name: "Dr. [Full Name]",
    role: "Registrar",
    image: sekharImg, // ✅ points to correct file
    tenure: "2023 – Present",
    bio: "Short professional bio for the Registrar.",
    achievements: [
      "Digitized academic records and workflows.",
      "Implemented student-centric service desks."
    ],
    initiatives: "Process excellence, governance, and transparent academic operations.",
    gallery: []
  },

  // ➕ Add more leaders in same shape if needed
];

export const leaderBySlug = leaders.reduce((acc, l) => {
  acc[l.slug] = l;
  return acc;
}, {});
