/**** src/data/schools.js ****/
export const THEME = {
  primary: "#0d315c", // deep blue
  accent: "#019e6e",  // emerald
  accentDark: "#0f6a5a",
};

const text = (s) => s.replace(/\s+/g, " ").trim();

export const schools = [
  /* -----------------------------------------------------------
   * 1) School of Nursing & Public Health
   * --------------------------------------------------------- */
  {
    slug: "nursing-public-health",
    name: "School of Nursing and Public Health",
    short: "Nursing & Public Health",
    about: text(`
      The School of Nursing and Public Health at St. Mary’s Rehabilitation University is
      committed to developing skilled, ethical, and service-oriented healthcare professionals
      capable of addressing individual and community health needs. With a unique focus on
      nursing, rehabilitation care, and public health, the school blends clinical excellence
      with community-based learning.
    `),
    departments: [
      {
        slug: "nursing",
        name: "Department of Nursing",
        about: text(`
          The Department of Nursing develops compassionate, skilled, and competent nursing
          professionals who deliver high-quality patient care across diverse settings with a
          balance of theory, clinical expertise, and ethics.
        `),
        programs: [
          {
            slug: "bsc-nursing",
            name: "B.Sc. Nursing",
            level: "Undergraduate",
            overview: text(`
              4-year program preparing professional registered nurses. Strong clinical
              practice across multi-specialty settings; rehab-sensitive approach. NCLEX-ready foundation.
            `),
            duration: "4 years (8 semesters) + clinical rotations",
            eligibility: "10+2 with PCB; as per university/regulatory norms",
            fees: "₹1,00,000 per annum (hostel/exam/lab/internship extra as per norms)",
            specializations: [
              "Critical Care (INC)","Pediatric/Neonatal (INC)","Oncology (INC)","Medical-Surgical",
              "Community Health","Psychiatric (INC)","Obstetric & Gynec (INC)",
              "Nursing Education","Nursing Management","Cardiothoracic (INC)"
            ],
            outcomes: text(`
              Registered Nurse (post INC registration), Community Health Nurse, Pediatric Nurse,
              Rehabilitation Nurse, Nurse Educator/Trainer.
            `),
            accreditation: "INC + State Nursing Council; Degree by SMRU (UGC).",
          },
          {
            slug: "msc-nursing",
            name: "M.Sc. Nursing",
            level: "Postgraduate",
            overview: text(`
              Advanced practice nurse preparation with specialization, leadership, and research aligned
              to international nursing standards.
            `),
            duration: "2 years (4 semesters)",
            eligibility: "B.Sc. Nursing (Basic/Post-Basic) + 1 yr RN/RM experience; valid registration",
            fees: "₹1,50,000 per annum (extras as per norms)",
            specializations: [
              "Critical Care (INC)","Pediatric/Neonatal (INC)","Oncology (INC)","Medical-Surgical",
              "Community Health","Psychiatric (INC)","Obstetric & Gynec (INC)",
              "Nursing Education","Nursing Management","Cardiothoracic (INC)"
            ],
          },
        ],
      },
      {
        slug: "rehabilitation-nursing",
        name: "Department of Rehabilitation Nursing",
        about: text(`
          Inpatient/outpatient care for disability and chronic illness, with 24×7 acute rehab units,
          interdisciplinary practice, clinical exposure, and record-keeping training.
        `),
        programs: [
          { slug: "bsc-rehab-nursing", name: "B.Sc. Rehabilitation Nursing" },
          { slug: "msc-rehab-nursing", name: "M.Sc. Rehabilitation Nursing" },
        ],
      },
      {
        slug: "public-health",
        name: "Department of Public Health",
        about: text(`
          Bachelor/Master pathways building competencies for population health, disease prevention,
          health informatics, and healthcare management; includes certificate options.
        `),
        programs: [
          { slug: "bph", name: "Bachelor of Public Health" },
          { slug: "mph", name: "Master of Public Health" },
        ],
      },
    ],
  },

  /* -----------------------------------------------------------
   * 2) School of Pharmaceutical Sciences
   * --------------------------------------------------------- */
  {
    slug: "pharmaceutical-sciences",
    name: "School of Pharmaceutical Sciences",
    short: "Pharmaceutical Sciences",
    about: text(`
      Committed to excellence in pharmaceutical education, research, and innovation with
      a rehabilitation-focused pharmacotherapy lens; bridges core pharmaceutics with rehab care
      to support recovery, chronic care, and community impact.
    `),
    departments: [
      {
        slug: "pharma-sciences",
        name: "Department of Pharmaceutical Sciences",
        about: text(`
          Scientific study of drugs and their effects on the human body; advances safe and effective therapies
          through understanding of drug–biological interactions.
        `),
        programs: [
          { slug: "bpharm", name: "Bachelor of Pharmacy (B.Pharm)" },
          { slug: "mpharm", name: "Master of Pharmacy (M.Pharm)" },
          { slug: "phd-pharm", name: "Ph.D." },
        ],
      },
      {
        slug: "rehab-pharma",
        name: "Department of Rehabilitation Pharmaceutical Sciences",
        about: text(`
          Optimal pharmaceutical care within rehabilitation medicine—integrates clinical pharmacists
          into multidisciplinary teams for safe, rational, cost-effective medication use.
        `),
        programs: [
          { slug: "bpharm-disability", name: "Bachelor of Pharmacy & Disability Studies" },
          { slug: "mpharm-disability", name: "Master of Pharmacy & Disability Studies" },
        ],
      },
    ],
  },

  /* -----------------------------------------------------------
   * 3) School of Speech & Hearing
   * --------------------------------------------------------- */
  {
    slug: "speech-hearing",
    name: "School of Speech and Hearing",
    short: "Speech & Hearing",
    about: text(`
      Develops professionals who diagnose, manage, and treat communication and hearing disorders.
      Rehab-focused training in speech-language therapy, audiological assessment, and inclusive communication.
    `),
    departments: [
      {
        slug: "audiology",
        name: "Department of Audiology",
        about: text(`
          Future-ready training in hearing and balance; education in hearing assessment,
          hearing aids, cochlear implants, auditory training; strong clinical exposure.
        `),
        programs: [
          {
            slug: "baslp",
            name: "B.A.S.L.P.",
            level: "Undergraduate",
            overview: text(`
              4-year course (plus internship year counted separately in duration below) integrating
              foundational sciences, communication disorders, and hands-on clinical training in
              speech/hearing/language impairments.
            `),
            duration: "5 years (4 years coursework + 1 year internship)",
            eligibility: "10+2 (Physics, Chemistry, Biology, Mathematics) with ≥50%",
            fees: "₹1,50,000 per annum (extras as per norms)",
          },
          { slug: "msc-aud", name: "M.Sc. (Audiology)" },
        ],
      },
      {
        slug: "slp",
        name: "Department of Speech-Language Pathology",
        about: text(`
          Training to assess, diagnose, and treat communication and swallowing disorders across age groups;
          modern labs, simulation clinics, supervised internships.
        `),
        programs: [
          { slug: "b-slp", name: "B.S.L.P." },
          { slug: "msc-slp", name: "M.Sc. (Speech-Language Pathology)" },
        ],
      },
      {
        slug: "isl",
        name: "Department of Indian Sign Language",
        about: text(`
          Advances inclusive education and communication via ISL proficiency, interpretation, teaching, and
          accessibility leadership; ISL lab, video feedback, community programs.
        `),
        programs: [
          { slug: "dip-isl-int", name: "Diploma in Indian Sign Language Interpretation" },
          { slug: "dip-isl-teach", name: "Diploma in Teaching Indian Sign Language" },
        ],
      },
    ],
  },

  /* -----------------------------------------------------------
   * 4) School of Engineering
   * --------------------------------------------------------- */
  {
    slug: "engineering",
    name: "School of Engineering",
    short: "Engineering",
    about: text(`
      A forward-thinking hub where innovation meets healthcare. Interdisciplinary training to build
      devices, systems, and technologies for medical science, rehabilitation, and human well-being.
    `),
    departments: [
      {
        slug: "biomedical",
        name: "Department of Biomedical Engineering",
        about: text(`
          Bridges engineering and medicine to design medical devices, diagnostic systems, prosthetics,
          and health monitoring tools; projects and clinical collaborations.
        `),
        programs: [
          { slug: "btech-biomed", name: "B.Tech in Biomedical Engineering" },
          { slug: "mtech-biomed", name: "M.Tech in Biomedical Engineering" },
          { slug: "phd-biomed", name: "Ph.D." },
        ],
      },
      {
        slug: "rehab-eng",
        name: "Department of Rehabilitation Engineering",
        about: text(`
          Designs assistive technologies—mobility aids, prosthetics, rehab robotics, adaptive devices;
          strong clinical integration and accessibility focus.
        `),
        programs: [
          { slug: "bpo", name: "Bachelor of Prosthetics and Orthotics" },
          { slug: "mpo", name: "Master of Prosthetics and Orthotics" },
          { slug: "btech-po-aiml", name: "B.Tech. in Prosthetics & Orthotics with AI & ML" },
          { slug: "mtech-po-aiml", name: "M.Tech. in Prosthetics & Orthotics with AI & ML" },
          { slug: "m-assistive-aiml", name: "Master of Assistive Devices with AI/ML" },
        ],
      },
      {
        slug: "general-eng",
        name: "Department of General Engineering",
        about: text(`
          Foundations in Mechanical, Electrical, Civil, and Computer Engineering with healthcare applications.
          Emphasizes problem-solving, design thinking, and technical innovation.
        `),
        programs: [
          { slug: "btech-cse", name: "B. Tech – CSE" },
          { slug: "mtech-cse", name: "M. Tech – CSE" },
          { slug: "btech-cse-aiml", name: "B. Tech – CSE (AI & ML)" },
          { slug: "mtech-cse-aiml", name: "M. Tech – CSE (AI & ML)" },
        ],
      },
    ],
  },

  /* -----------------------------------------------------------
   * 5) School of Psychology
   * --------------------------------------------------------- */
  {
    slug: "psychology",
    name: "School of Psychology",
    short: "Psychology",
    about: text(`
      Advances mental health and well-being through education, research, and clinical practice with
      rehabilitation and community impact; integrates theory with hands-on training.
    `),
    departments: [
      {
        slug: "applied-behavioral",
        name: "Department of Applied Psychology & Behavioral Health",
        about: text(`
          Practical application of psychological science for mental well-being, positive behavior,
          emotional resilience; counseling, assessment, stress management, prevention.
        `),
        programs: [
          {
            slug: "b-psych-applied",
            name: "Bachelor of Psychology (Applied Psychology & Behavioral Health)",
            level: "Undergraduate",
            duration: "4 years (6 semesters)",
            eligibility: "10+2 any stream; 45–50% recommended",
            fees: "₹1,00,000 per annum (extras as per norms)",
            overview: text(`
              Strong foundation in clinical, counseling, and applied psychology within a rehabilitation-focused
              environment; case discussions and hands-on training across health, education, and social sectors.
            `),
          },
          {
            slug: "m-psych-applied",
            name: "Master of Psychology (Applied Psychology & Behavioral Health)",
            level: "Postgraduate",
            duration: "2 years",
            eligibility: "Bachelor’s in Psychology or any discipline with psychology as a subject (≥50%)",
            fees: "₹1,30,000 per annum (extras as per norms)",
            overview: text(`
              Advanced expertise in clinical, counseling, and digital psychology with rehabilitation focus;
              integrated research, fieldwork, and hands-on training.
            `),
          },
        ],
      },
      {
        slug: "clinical-psych",
        name: "Department of Clinical Psychology",
        about: text(`
          Assessment, diagnosis, and treatment of mental, emotional, and behavioral disorders; psychotherapy,
          testing, crisis intervention, and mental health rehabilitation with supervised practice.
        `),
        programs: [
          {
            slug: "bsc-clinical",
            name: "B.Sc. Clinical Psychology",
            level: "Undergraduate",
            duration: "4 years (6 semesters)",
            eligibility: "10+2 any stream; 45–50% recommended",
            fees: "₹1,00,000 per annum (extras as per norms)",
            overview: text(`
              Foundation in behavior, emotional well-being, and mental health; assessment, counseling, and
              therapy skills; early clinical exposure and rehab focus.
            `),
          },
          {
            slug: "ma-clinical",
            name: "M.A. Clinical Psychology",
            level: "Postgraduate",
            duration: "2 years",
            eligibility: "Bachelor’s in Psychology or any discipline with psychology as a subject (≥50%)",
            fees: "₹1,30,000 per annum (extras as per norms)",
            overview: text(`
              Postgraduate training in psychopathology, counseling, assessment, and evidence-based therapies;
              rehab-oriented fieldwork and supervised practice.
            `),
          },
          {
            slug: "mphil-clinical",
            name: "M.Phil. Clinical Psychology",
            level: "Postgraduate (Professional)",
            duration: "2 years",
            eligibility: "M.A./M.Sc. Psychology ≥55% (50% SC/ST); entrance + interview per RCI norms",
            fees: "₹2,50,000 per annum (extras as per norms)",
            overview: text(`
              Rigorous pathway to licensed Clinical Psychologist with >1500 hours supervised clinical training
              as per RCI; independent practice readiness.
            `),
          },
        ],
      },
      {
        slug: "rehab-psych",
        name: "Department of Rehabilitation Psychology",
        about: text(`
          Supports individuals with physical, cognitive, emotional, or developmental challenges via counseling,
          behavioral therapy, psychosocial support; disability adjustment, trauma counseling, vocational assessment.
        `),
        programs: [
          { slug: "ma-rehab-psych", name: "M.A. Rehabilitation Psychology" },
          {
            slug: "mphil-rehab-psych",
            name: "M.Phil. Rehabilitation Psychology",
            level: "Postgraduate (Professional)",
            duration: "2 years",
            eligibility: "M.A./M.Sc. Psychology ≥55% (50% SC/ST); entrance + interview per RCI norms",
            fees: "₹1,50,000 per annum (extras as per norms)",
            overview: text(`
              Specialized training to address psychological needs in disability and chronic conditions; >1500 hours
              supervised practicum; careers across rehab centers, hospitals, schools, NGOs.
            `),
          },
        ],
      },
    ],
  },

  /* -----------------------------------------------------------
   * 6) School of Health Sciences
   * --------------------------------------------------------- */
  {
    slug: "health-sciences",
    name: "School of Health Sciences",
    short: "Health Sciences",
    about: text(`
      Multidisciplinary center training health and allied health professionals in diagnostics,
      therapy, patient care, and health system management; strong hands-on clinical focus.
    `),
    departments: [
      {
        slug: "mls",
        name: "Department of Medical Laboratory & Life Sciences",
        about: text(`
          Prepares professionals in pathology, microbiology, hematology, biochemistry, and molecular biology;
          accurate diagnostics and research skills.
        `),
        programs: [
          { slug: "bsc-mlt", name: "B.Sc. in Medical Laboratory Technology" },
          { slug: "msc-mlt", name: "M.Sc. in Medical Laboratory Technology" },
          { slug: "bsc-life", name: "B.Sc. in Life Sciences" },
          { slug: "msc-life", name: "M.Sc. in Life Sciences" },
        ],
      },
      {
        slug: "trauma-burn-surgtech",
        name: "Department of Trauma, Burn & Surgical Technology",
        about: text(`
          Critical roles in emergency care, operation theatre tech, trauma response, and perioperative management;
          hands-on surgical environment exposure.
        `),
        programs: [
          { slug: "b-ana-ott", name: "Bachelor in Anesthesia & Operation Theatre Technology" },
          { slug: "m-ana-ott", name: "Master in Anesthesia & Operation Theatre Technology" },
          { slug: "b-emct", name: "Bachelor in Emergency Medical Care Technology" },
          { slug: "m-emct", name: "Master in Emergency Medical Care Technology" },
        ],
      },
      {
        slug: "nutrition",
        name: "Department of Nutrition Science",
        about: text(`
          Applied nutrition science across food science, dietetics, public health, and genetic approaches to nutrition;
          assessment and counseling skills.
        `),
        programs: [
          { slug: "b-nd", name: "Bachelor in Nutrition & Dietetics" },
          { slug: "m-nd", name: "Master in Nutrition & Dietetics" },
          { slug: "b-nd-dis", name: "Bachelor in Nutrition & Dietetics with Disability Studies" },
        ],
      },
      {
        slug: "ophthalmic",
        name: "Department of Ophthalmic Technology",
        about: text(`
          Equips students for eye care and vision correction; ocular anatomy/physiology, disease, optics, diagnostics,
          with hospital/tech exposure.
        `),
        programs: [
          { slug: "b-optom", name: "Bachelor of Optometry (B. Optom)" },
          { slug: "m-optom", name: "Master of Optometry (M. Optom)" },
        ],
      },
      {
        slug: "community-primary",
        name: "Department of Community Health & Primary Care",
        about: text(`
          Person-centered community services—prevention, chronic disease management, rehabilitation—focused on
          underserved populations.
        `),
        programs: [
          { slug: "b-podiatry", name: "Bachelor of Podiatry" },
          { slug: "m-podiatry", name: "Master of Podiatry" },
          { slug: "b-palliative", name: "Bachelor in Palliative Care" },
          { slug: "m-palliative", name: "Master in Palliative Care" },
          { slug: "b-movement", name: "Bachelor of Movement Therapy" },
          { slug: "msw-psych", name: "Master of Psychiatric Social Work" },
          { slug: "msw-med", name: "Master of Medical Social Work" },
          { slug: "msw-clinical", name: "Master of Clinical Social Work" },
          { slug: "b-ohs", name: "Bachelor of Occupational Health & Safety" },
          { slug: "b-ecology", name: "Bachelor in Ecology" },
          { slug: "cert-caregiving", name: "Certificate in Caregiving (Geriatrics/Disabilities/Psychiatric/Bedside)" },
        ],
      },
      {
        slug: "radiology-imaging",
        name: "Department of Radiology & Imaging Technology",
        about: text(`
          Comprehensive imaging training: digital X-ray, CT, MRI, ultrasound, radiation therapy, and nuclear medicine;
          didactic + clinical rotations.
        `),
        programs: [
          { slug: "dip-mrit", name: "DMRIT (Diploma in Medical Radiology & Imaging Technology)" },
          { slug: "bsc-mrit", name: "B.Sc. MRIT" },
          { slug: "msc-mrit", name: "M.Sc. MRIT" },
          { slug: "dip-rtt", name: "Diploma in Radiation Therapy Technology" },
          { slug: "b-rtt", name: "Bachelor of Radiation Therapy Technology" },
          { slug: "m-rtt", name: "Master of Radiation Therapy Technology" },
          { slug: "dip-nmt", name: "Diploma in Nuclear Medicine Technology" },
          { slug: "b-nmt", name: "Bachelor of Nuclear Medicine Technology" },
          { slug: "m-nmt", name: "Master of Nuclear Medicine Technology" },
          { slug: "b-med-phys", name: "Bachelor in Medical Physics" },
        ],
      },
      {
        slug: "medtech-pa",
        name: "Department of Medical Technology & Physician Assistant",
        about: text(`
          Trains physician assistants and technologists for diagnostics, emergency care, and clinical support; strong
          hands-on hospital practice.
        `),
        programs: [
          { slug: "dip-cv", name: "Diploma in Cardiovascular Technology" },
          { slug: "bsc-cv", name: "B.Sc. Cardiovascular Technology" },
          { slug: "msc-cv", name: "M.Sc. Cardiovascular Technology" },
          { slug: "dip-neuro", name: "Diploma in Neuroscience Technology" },
          { slug: "bsc-neuro", name: "B.Sc. Neuroscience Technology" },
          { slug: "msc-neuro", name: "M.Sc. Neuroscience Technology" },
          { slug: "dip-resp", name: "Diploma in Respiratory Technology" },
          { slug: "bsc-resp", name: "B.Sc. Respiratory Technology" },
          { slug: "msc-resp", name: "M.Sc. Respiratory Technology" },
          { slug: "dip-renal", name: "Diploma in Renal Dialysis Technology" },
          { slug: "bsc-renal", name: "B.Sc. Renal Dialysis Technology" },
          { slug: "msc-renal", name: "M.Sc. Renal Dialysis Technology" },
          { slug: "b-pa", name: "Bachelor of Physician Assistant" },
          { slug: "m-pa", name: "Master of Physician Assistant" },
        ],
      },
      {
        slug: "health-informatics",
        name: "Department of Health Informatics & Data Management",
        about: text(`
          IT for health data management: EHR, analytics, info security, clinical informatics; internships and applied
          projects preparing for health IT roles.
        `),
        programs: [
          { slug: "b-hm", name: "Bachelor of Hospital Management" },
          { slug: "m-hm", name: "Master in Hospital Management" },
          { slug: "pgd-coding", name: "PG Diploma in Medical Coding" },
          { slug: "pgd-transcription", name: "PG Diploma in Medical Transcription" },
          { slug: "pgd-secretary", name: "PG Diploma in Medical Secretary" },
        ],
      },
      {
        slug: "indian-medicine",
        name: "Department of Indian Medicine & Wellness Systems",
        about: text(`
          Promotes AYUSH-based preventive and curative paradigms—Ayurveda, Yoga & Naturopathy, Unani, Siddha, Homeopathy—
          integrating with modern rehabilitation.
        `),
        programs: [
          { slug: "bams", name: "BAMS" }, { slug: "bhms", name: "BHMS" }, { slug: "bums", name: "BUMS" },
          { slug: "bnys", name: "BNYS" }, { slug: "bsms", name: "BSMS" },
          { slug: "md-ayush", name: "MD (AYUSH Disciplines)" },
          { slug: "ms-ayurveda", name: "MS (Ayurveda)" },
          { slug: "msc-ayush", name: "M.Sc. (AYUSH Disciplines)" },
          { slug: "dip-yoga", name: "Diploma in Yoga" },
          { slug: "dip-naturopathy", name: "Diploma in Naturopathy" },
          { slug: "dip-panchakarma", name: "Diploma in Panchakarma" },
        ],
      },
    ],
  },

  /* -----------------------------------------------------------
   * 7) School of Rehabilitation Sciences
   * --------------------------------------------------------- */
  {
    slug: "rehabilitation-sciences",
    name: "School of Rehabilitation Sciences",
    short: "Rehabilitation Sciences",
    about: text(`
      Center of excellence educating future leaders in rehabilitation; holistic, interdisciplinary
      approach with evidence-based practice, outreach, and faith-integrated learning.
    `),
    departments: [
      {
        slug: "physiotherapy",
        name: "Department of Physiotherapy",
        about: text(`
          Restores movement and function with clinical excellence, hands-on training, and advanced rehab tech.
        `),
        programs: [
          {
            slug: "bpt",
            name: "Bachelor of Physiotherapy (BPT)",
            level: "Undergraduate",
            duration: "5 years (4 academic + 1 internship)",
            eligibility: "10+2 with PCB (≥50%); entrance per norms",
            fees: "₹1,00,000 per annum (extras as per norms)",
            overview: text(`
              Prepares physiotherapists for hospitals, clinics, sports/wellness settings; strong rehab and clinical exposure.
            `),
          },
          {
            slug: "mpt",
            name: "Master of Physiotherapy (MPT)",
            level: "Postgraduate",
            duration: "2 years",
            eligibility: "BPT with ≥50%; fitness certificate; entrance per norms",
            fees: "₹1,50,000 per annum (extras as per norms)",
            overview: text(`
              Advanced clinical expertise, research capability, and leadership in neuro/musculoskeletal and other specialties.
            `),
          },
        ],
      },
      {
        slug: "occupational-therapy",
        name: "Department of Occupational Therapy",
        about: text(`
          Empowers individuals to live independent, productive lives via therapeutic interventions, adaptive techniques,
          and environment modifications.
        `),
        programs: [
          {
            slug: "bot",
            name: "Bachelor of Occupational Therapy (BOT)",
            level: "Undergraduate",
            duration: "5 years (4 coursework + 1 internship)",
            eligibility: "10+2 (PCB) ≥50%",
            fees: "₹1,00,000 per annum (extras as per norms)",
          },
          {
            slug: "mot",
            name: "Master of Occupational Therapy (MOT)",
            level: "Postgraduate",
            duration: "2 years",
            eligibility: "BOT ≥50%; entrance per norms",
            fees: "₹1,50,000 per annum (extras as per norms)",
          },
        ],
      },
      {
        slug: "rehab-medical-science",
        name: "Department of Rehabilitation & Medical Science",
        about: text(`
          Restores/improves physical, mental, and social functioning post illness/injury/disability; multidisciplinary teamwork.
        `),
        programs: [
          { slug: "msc-neuro-rehab", name: "M.Sc. Neurological Rehabilitation" },
          { slug: "msc-cognitive-rehab", name: "M.Sc. Cognitive Rehabilitation" },
          { slug: "msc-onco-rehab", name: "M.Sc. Oncology Rehabilitation" },
          { slug: "msc-ortho-rehab", name: "M.Sc. Orthopedic Rehabilitation" },
          { slug: "msc-trauma-sport", name: "M.Sc. Trauma Science & Sports Rehabilitation" },
          { slug: "msc-peds-rehab", name: "M.Sc. Pediatric Rehabilitation" },
          { slug: "msc-blood-cardio", name: "M.Sc. Blood Disorders & Cardiopulmonary Rehabilitation" },
          { slug: "msc-geri-rehab", name: "M.Sc. Geriatric Rehabilitation" },
          { slug: "msc-postcovid", name: "M.Sc. Post COVID Rehabilitation & Management" },
        ],
      },
      {
        slug: "rehab-social-work",
        name: "Department of Rehabilitation Social Work / Administration & Vocational Counseling",
        about: text(`
          Psychosocial support, administration, and vocational rehab: case management, counseling, team coordination,
          employment assessments, and workplace modifications.
        `),
        programs: [
          { slug: "b-rehab-sci", name: "Bachelor in Rehabilitation Science" },
          { slug: "m-rehab-sci", name: "Master in Rehabilitation Science" },
          { slug: "b-cbr", name: "Bachelor of Community-Based Rehabilitation" },
          { slug: "msc-psr", name: "M.Sc. Psycho-Social Rehabilitation" },
          { slug: "ma-swdsa", name: "M.A. Social Work (Disability Studies & Action)" },
        ],
      },
      {
        slug: "rehab-biblical",
        name: "Department of Rehabilitation & Biblical Studies",
        about: text(`
          Combines rehabilitation sciences with biblical studies to serve physical, emotional, and spiritual needs;
          care, faith, and understanding.
        `),
        programs: [
          { slug: "b-christian", name: "Bachelor in Christian Studies" },
          { slug: "b-christian-hospice", name: "Bachelor in Christian Studies & Hospice Care" },
          { slug: "b-christian-community", name: "Bachelor in Christian Studies & Community Rehabilitation" },
          { slug: "b-theology", name: "Bachelor in Theological Studies" },
        ],
      },
    ],
  },

  /* -----------------------------------------------------------
   * 8) School of Special Needs Education
   * --------------------------------------------------------- */
  {
    slug: "special-needs-education",
    name: "School of Special Needs Education",
    short: "Special Needs Education",
    about: text(`
      Develops skilled, compassionate, and inclusive educators. Integrates Special Education, Inclusive Education,
      and General Education under one umbrella for an accessible learning environment for every child.
    `),
    departments: [
      {
        slug: "special-education",
        name: "Department of Special Education",
        about: text(`
          Universal design and adaptive teaching; graduates lead in schools, NGOs, and educational orgs with strong placements and policy exposure.
        `),
        programs: [
          { slug: "bed-spl", name: "B.Ed. in Special Education (ASD/ID/LD/HI/VI/MD)" },
          { slug: "med-spl", name: "M.Ed. in Special Education (ASD/ID/LD/HI/VI/MD)" },
          { slug: "integrated-bed-med", name: "Integrated B.Ed.–M.Ed. in Special Education (ASD/ID/LD/HI/VI/MD)" },
        ],
      },
      {
        slug: "inclusive-education",
        name: "Department of Inclusive Education",
        about: text(`
          Accessible learning environments, individualized support plans, peer support and curriculum adaptation;
          campus-wide collaboration.
        `),
        programs: [
          {
            slug: "integrated-bed-4yr",
            name: "B.A./B.Com./B.Sc.–B.Ed. Special Education (4 years)",
          },
        ],
      },
      {
        slug: "general-education",
        name: "Department of General Education",
        about: text(`
          Foundational instruction adapted to special needs across language, mathematics, science, and social studies;
          individualized strategies and inclusive pedagogy.
        `),
        programs: [
          { slug: "llb", name: "LL.B." },
          { slug: "ba", name: "Bachelor of Arts" },
          { slug: "bsc", name: "Bachelor of Science" },
          { slug: "bcom", name: "Bachelor of Commerce" },
        ],
      },
    ],
  },
];

export const allSchoolsBar = schools.map(({ slug, name, short }) => ({
  slug, name, short: short || name,
}));
