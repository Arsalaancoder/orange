export interface Program {
  id: string;
  slug: string;
  code: string;
  fullTitle: string;
  category: 'Nursing' | 'Paramedical';
  duration: string | null;
  eligibility: string | null;
  overview: string;
  description: string;
  learningAreas?: string[];
  trainingAreas?: string[];
  trainingStatement?: string;
  careerOpportunities?: string[];
  imageLabel: string;
  imageUrl?: string;
  isPrimary: boolean;
  isSubjectToApproval?: boolean;
  seoTitle: string;
  seoDescription: string;
}

export const programsData: Program[] = [
  // 1. B.SC NURSING (PRIMARY)
  {
    id: "bsc-nursing",
    slug: "bsc-nursing",
    code: "B.Sc Nursing",
    fullTitle: "Bachelor of Science in Nursing",
    category: "Nursing",
    duration: "4 Years",
    eligibility: "Inter (BiPC)",
    overview: "B.Sc. Nursing is a professional undergraduate degree program preparing competent nursing professionals through classroom study, skills labs, and clinical exposure.",
    description: "The B.Sc. Nursing curriculum provides students with a foundational education in nursing science, healthcare practices, patient care, and clinical procedures.",
    learningAreas: [
      "Fundamentals of Nursing",
      "Anatomy & Physiology",
      "Nutrition",
      "Medical-Surgical Nursing",
      "Community Health Nursing",
      "Child Health Nursing",
      "Mental Health Nursing",
      "Maternal & Obstetric Nursing",
      "Nursing Research",
      "Clinical Practice"
    ],
    trainingStatement: "Students receive a combination of classroom education, laboratory training, skill development, and clinical exposure.",
    careerOpportunities: [
      "Hospitals",
      "Nursing Homes",
      "Community Health Centres",
      "Clinics",
      "Public Health Organizations",
      "Healthcare Institutions",
      "Educational Institutions",
      "Home Healthcare Services"
    ],
    imageLabel: "B.Sc Nursing Clinical Care",
    imageUrl: "/images/cards/bsc-nursing.jpg",
    isPrimary: true,
    seoTitle: "B.Sc Nursing | Bachelor of Science in Nursing",
    seoDescription: "Official B.Sc Nursing degree program at Orange Group. 4-year professional undergraduate course with classroom instruction, laboratory practice, and clinical exposure."
  },

  // 2. GNM (PRIMARY)
  {
    id: "gnm",
    slug: "gnm",
    code: "GNM",
    fullTitle: "General Nursing & Midwifery",
    category: "Nursing",
    duration: "3 Years",
    eligibility: "Inter Any Group",
    overview: "GNM is a professional nursing diploma program focused on practical nursing care, bedside skills, maternal care, and community health.",
    description: "Students are introduced to fundamental nursing practices, medical care, community health, maternal and child healthcare, and midwifery.",
    learningAreas: [
      "Nursing Fundamentals",
      "Anatomy & Physiology",
      "Nutrition",
      "Medical-Surgical Nursing",
      "Community Health Nursing",
      "Child Health Nursing",
      "Mental Health Nursing",
      "Midwifery",
      "Maternal Healthcare",
      "Clinical Nursing Practice"
    ],
    trainingStatement: "Combines classroom learning with hands-on skill development in nursing skills laboratories and practical clinical training environments.",
    careerOpportunities: [
      "Hospitals",
      "Nursing Homes",
      "Clinics",
      "Community Healthcare",
      "Primary Healthcare Facilities",
      "Home Healthcare",
      "Healthcare Support Services"
    ],
    imageLabel: "GNM Nursing Clinical Skills",
    imageUrl: "/images/cards/gnm-nursing.jpg",
    isPrimary: true,
    seoTitle: "GNM Nursing | General Nursing & Midwifery Diploma",
    seoDescription: "3-year GNM Nursing diploma program at Orange Group. Open to Intermediate graduates from any group focusing on patient care, community health, and midwifery."
  },

  // 3. DMLT (PRIMARY)
  {
    id: "dmlt",
    slug: "dmlt",
    code: "DMLT",
    fullTitle: "Diploma in Medical Laboratory Technology",
    category: "Paramedical",
    duration: "2 Years",
    eligibility: "Inter Any Group",
    overview: "Comprehensive laboratory training in hematology, microbiology, biochemistry, and specimen diagnostic testing procedures.",
    description: "The DMLT program introduces students to laboratory procedures, specimen handling, diagnostic testing, laboratory safety, and basic clinical laboratory practices.",
    trainingAreas: [
      "Clinical Biochemistry",
      "Hematology",
      "Clinical Pathology",
      "Microbiology",
      "Histopathology",
      "Blood Banking",
      "Laboratory Safety",
      "Sample Collection and Handling",
      "Laboratory Equipment",
      "Diagnostic Procedures"
    ],
    trainingStatement: "Focused on practical laboratory training, diagnostic testing techniques, specimen handling, and equipment operation.",
    careerOpportunities: [
      "Diagnostic Laboratories",
      "Hospitals",
      "Pathology Laboratories",
      "Blood Banks",
      "Research Laboratories",
      "Clinics",
      "Healthcare Diagnostic Centres"
    ],
    imageLabel: "Medical Laboratory Training",
    imageUrl: "/images/cards/dmlt-lab.jpg",
    isPrimary: true,
    seoTitle: "DMLT | Diploma in Medical Laboratory Technology",
    seoDescription: "2-year DMLT diploma program at Orange Group. Comprehensive training in clinical biochemistry, hematology, microbiology, pathology, and laboratory diagnostics."
  },

  // 4. DOA (PRIMARY)
  {
    id: "doa",
    slug: "doa",
    code: "DOA",
    fullTitle: "Diploma in Ophthalmic Assistance",
    category: "Paramedical",
    duration: "2 Years",
    eligibility: "Inter Any Group",
    overview: "Specialized eye-care training covering slit-lamp examination, vision screening, refractometry support, and clinical assistance.",
    description: "Students are introduced to basic concepts of eye anatomy, ophthalmic procedures, patient preparation, vision assessment, and assistance in eye-care services.",
    trainingAreas: [
      "Anatomy of the Eye",
      "Basic Ophthalmology",
      "Vision Assessment",
      "Ophthalmic Instruments",
      "Eye-care Procedures",
      "Ophthalmic Clinical Assistance",
      "Infection Control",
      "Patient Communication"
    ],
    trainingStatement: "Includes practical instruction in vision testing, eye exam assistance, equipment maintenance, and patient preparation.",
    careerOpportunities: [
      "Eye Hospitals",
      "Ophthalmic Clinics",
      "Eye-care Centres",
      "Hospitals",
      "Vision Care Facilities",
      "Ophthalmology Departments"
    ],
    imageLabel: "Ophthalmic Training",
    imageUrl: "/images/cards/doa-ophthalmic.jpg",
    isPrimary: true,
    seoTitle: "DOA | Diploma in Ophthalmic Assistance",
    seoDescription: "2-year Diploma in Ophthalmic Assistance at Orange Group. Training in eye anatomy, vision assessment, ophthalmic equipment handling, and patient support."
  },

  // 5. DMIT (PRIMARY)
  {
    id: "dmit",
    slug: "dmit",
    code: "DMIT",
    fullTitle: "Diploma in Medical Imaging Technology",
    category: "Paramedical",
    duration: "2 Years",
    eligibility: "Inter Any Group",
    overview: "Technical radiographic training covering X-ray machine positioning, darkroom/digital processing, and radiation safety protocols.",
    description: "The Diploma in Medical Imaging Technology (DMIT) introduces students to imaging procedures, patient preparation, equipment handling, safety practices, and healthcare imaging environments.",
    trainingAreas: [
      "Basics of Medical Imaging",
      "Radiographic Procedures",
      "Imaging Equipment",
      "Patient Positioning",
      "Radiation Safety",
      "Image Quality",
      "Clinical Imaging Practice"
    ],
    trainingStatement: "Combines technical classroom study with practical training in imaging procedures, equipment safety, and patient positioning.",
    careerOpportunities: [
      "Hospitals",
      "Diagnostic Imaging Centres",
      "Radiology Departments",
      "Medical Imaging Centres",
      "Healthcare Institutions",
      "Diagnostic Clinics"
    ],
    imageLabel: "Medical Imaging Training",
    imageUrl: "/images/cards/dmit-imaging.jpg",
    isPrimary: true,
    seoTitle: "DMIT | Diploma in Medical Imaging Technology",
    seoDescription: "2-year DMIT program at Orange Group. Specialized training in medical radiographic procedures, imaging equipment handling, patient positioning, and radiation safety."
  },

  // 6. DANS (SECONDARY / ALLIED)
  {
    id: "dans",
    slug: "dans",
    code: "DANS",
    fullTitle: "Diploma in Anesthesia Technology",
    category: "Paramedical",
    duration: "2 Years",
    eligibility: "Inter Any Group",
    overview: "A specialized paramedical program introducing students to anesthesia equipment support, monitor setup, and practical operation assistance.",
    description: "Program information, duration, eligibility, intake, and course recognition are subject to applicable regulatory and affiliating authorities.",
    imageLabel: "Operation Theatre Anesthesia Setup",
    imageUrl: "/images/cards/dans-anesthesia.jpg",
    isPrimary: false,
    isSubjectToApproval: true,
    seoTitle: "DANS | Diploma in Anesthesia Technology",
    seoDescription: "Diploma in Anesthesia Technology program details at Orange Group. Contact admissions for current regulatory availability and course information."
  },

  // 7. DMST (SECONDARY / ALLIED)
  {
    id: "dmst",
    slug: "dmst",
    code: "DMST",
    fullTitle: "Diploma in Medical Sterilization Management and OT Technician",
    category: "Paramedical",
    duration: "2 Years",
    eligibility: "Inter Any Group",
    overview: "Specialized training covering sterile processing procedures, surgical instrument preparation, infection control, and operation theatre technical assistance.",
    description: "Program information, duration, eligibility, intake, and course recognition are subject to applicable regulatory and affiliating authorities.",
    imageLabel: "Operation Theatre Sterilization Area",
    imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
    isPrimary: false,
    isSubjectToApproval: true,
    seoTitle: "DMST | Diploma in Medical Sterilization & OT Technician",
    seoDescription: "Diploma in Medical Sterilization Management and Operation Theatre Technician program details at Orange Group. Contact admissions for course availability."
  },

  // 8. D-DIALYSIS (SECONDARY / ALLIED)
  {
    id: "d-dialysis",
    slug: "d-dialysis",
    code: "D-Dialysis",
    fullTitle: "Diploma in Dialysis Technician",
    category: "Paramedical",
    duration: "2 Years",
    eligibility: "Inter Any Group",
    overview: "Paramedical training focusing on renal care equipment handling, hemodialysis setup assistance, dialyzer reprocessing, and patient monitoring.",
    description: "Program information, duration, eligibility, intake, and course recognition are subject to applicable regulatory and affiliating authorities.",
    imageLabel: "Dialysis Equipment Training Unit",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    isPrimary: false,
    isSubjectToApproval: true,
    seoTitle: "D-Dialysis | Diploma in Dialysis Technician",
    seoDescription: "Diploma in Dialysis Technician program information at Orange Group. Contact our admissions team for current availability and requirements."
  },

  // 9. D-CARDIO (SECONDARY / ALLIED)
  {
    id: "d-cardio",
    slug: "d-cardio",
    code: "D-Cardio",
    fullTitle: "Diploma in Cardiology Technician",
    category: "Paramedical",
    duration: "2 Years",
    eligibility: "Inter Any Group",
    overview: "Practical paramedical course covering electrocardiography (ECG) testing procedures, cardiac stress test monitoring, and non-invasive diagnostic assistance.",
    description: "Program information, duration, eligibility, intake, and course recognition are subject to applicable regulatory and affiliating authorities.",
    imageLabel: "Cardiology Practical Laboratory",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    isPrimary: false,
    isSubjectToApproval: true,
    seoTitle: "D-Cardio | Diploma in Cardiology Technician",
    seoDescription: "Diploma in Cardiology Technician program details at Orange Group. Contact admissions for current course information."
  },

  // 10. DREST (SECONDARY / ALLIED)
  {
    id: "drest",
    slug: "drest",
    code: "DREST",
    fullTitle: "Diploma in Respiratory Therapy Technician",
    category: "Paramedical",
    duration: "2 Years",
    eligibility: "Inter Any Group",
    overview: "Technical paramedical diploma introducing students to respiratory support equipment, oxygen therapy setup, and pulmonary diagnostic assistance.",
    description: "Program information, duration, eligibility, intake, and course recognition are subject to applicable regulatory and affiliating authorities.",
    imageLabel: "Respiratory Care Practical Setup",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    isPrimary: false,
    isSubjectToApproval: true,
    seoTitle: "DREST | Diploma in Respiratory Therapy Technician",
    seoDescription: "Diploma in Respiratory Therapy Technician course details at Orange Group. Contact admissions for current intake and regulatory information."
  }
];
