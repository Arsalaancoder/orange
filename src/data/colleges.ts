export type LocationGroup = 'Chengicherla / Hyderabad' | 'Nagaram / Hyderabad' | 'Nalgonda';
export type CollegeCategory = 'Nursing College' | 'Nursing School' | 'Paramedical College';

export interface CollegeFacilityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface CollegeGalleryItem {
  title: string;
  category: string;
  imageUrl: string;
}

export interface CollegeAccentTheme {
  primary: string;
  lightBg: string;
  badgeBg: string;
  badgeLabel: string;
}

export interface UniqueLearningBlock {
  title: string;
  description: string;
}

export interface UniqueDevelopmentBlock {
  title: string;
  description: string;
}

export interface College {
  id: string;
  slug: string;
  name: string;
  category: CollegeCategory;
  type?: CollegeCategory;
  sponsor: string;
  registrationNumber: string | null;
  address: string;
  locationGroup: LocationGroup;
  district: string | null;
  state: string | null;
  postalCode: string | null;
  imageLabel: string;
  shortDescription: string;
  heroTagline: string;
  dropdownThumbnail: string;
  heroImage: string;
  aboutHeading: string;
  aboutParagraphs: string[];
  aboutHighlights: string[];
  aboutImage: string;
  campusLifeImage: string;
  admissionsImage: string;
  logoMonogram: string;
  accentTheme: CollegeAccentTheme;
  programs: string[];
  learningSectionTitle: string;
  learningSectionSubtitle: string;
  learningHighlights: UniqueLearningBlock[];
  facilitySectionTitle: string;
  facilities: CollegeFacilityItem[];
  developmentHeading: string;
  developmentHighlights: UniqueDevelopmentBlock[];
  ctaHeading: string;
  ctaDescription: string;
  gallery: CollegeGalleryItem[];
  mapUrl: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  seoTitle: string;
  seoDescription: string;
}

export const collegesData: College[] = [
  // 1. ORANGE COLLEGE OF NURSING (CHENGICHERLA / HYDERABAD) — B.Sc Nursing / Degree-Oriented
  {
    id: "orange-college-of-nursing",
    slug: "orange-college-of-nursing",
    name: "Orange College of Nursing",
    category: "Nursing College",
    type: "Nursing College",
    sponsor: "Srikar Educational Society",
    registrationNumber: "215/2025",
    address: "H.No. 3-113/21/A, Chengicherla, Hyderabad, Telangana State - 500092",
    locationGroup: "Chengicherla / Hyderabad",
    district: "Medchal Dist",
    state: "Telangana State",
    postalCode: "500092",
    imageLabel: "Orange College of Nursing Campus",
    shortDescription: "Professional undergraduate B.Sc. nursing degree education sponsored by Srikar Educational Society in Chengicherla, Hyderabad.",
    heroTagline: "Academic Rigor & Professional Nursing Degree Education in Chengicherla, Hyderabad",
    dropdownThumbnail: "/images/colleges/ocn_building.jpg",
    heroImage: "/images/colleges/ocn_building.jpg",
    aboutHeading: "Building Strong Foundations for Professional Nursing",
    aboutParagraphs: [
      "Orange College of Nursing offers structured undergraduate degree education combining classroom instruction, nursing sciences, and laboratory skills development.",
      "Sponsored by Srikar Educational Society (Reg No. 215/2025) in Chengicherla, Hyderabad, the institution focuses on academic rigor, ethical patient care, and clinical readiness."
    ],
    aboutHighlights: [
      "Structured Degree Learning",
      "Practical Skills Training",
      "Supervised Clinical Exposure"
    ],
    aboutImage: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    campusLifeImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    admissionsImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    logoMonogram: "OCN",
    accentTheme: {
      primary: "#F26A21",
      lightBg: "#FFF8F5",
      badgeBg: "bg-[#F26A21]/10 text-[#F26A21] border-[#F26A21]/20",
      badgeLabel: "NURSING COLLEGE • CHENGICHERLA / HYDERABAD"
    },
    programs: ["bsc-nursing", "gnm"],
    learningSectionTitle: "From Theory to Nursing Practice",
    learningSectionSubtitle: "Bridging classroom nursing sciences with hands-on skill practice and clinical readiness.",
    learningHighlights: [
      {
        title: "Nursing Science Foundation",
        description: "Core academic preparation across nursing theory, anatomy, physiology, and healthcare fundamentals."
      },
      {
        title: "Simulation-Based Skill Practice",
        description: "Practical skill development through controlled nursing laboratory exercises and patient Manikins."
      },
      {
        title: "Clinical Readiness",
        description: "Building operational confidence and procedural familiarity for supervised patient-care environments."
      },
      {
        title: "Professional Nursing Development",
        description: "Cultivating professional responsibility, care ethics, and patient-focused bedside communication."
      }
    ],
    facilitySectionTitle: "Spaces Designed for Nursing Practice",
    facilities: [
      { id: "ocn-fac-1", title: "Nursing Skills Laboratory", category: "Practical Training", description: "Practical stations equipped with simulation manikins and patient care setups.", imageUrl: "https://images.unsplash.com/photo-1581595220892-c0737db375ca?auto=format&fit=crop&w=800&q=80" },
      { id: "ocn-fac-2", title: "Smart Digital Classrooms", category: "Academic", description: "Classrooms equipped with interactive digital boards and visual learning aids.", imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" },
      { id: "ocn-fac-3", title: "Medical Reference Library", category: "Learning", description: "Collection of medical textbooks, nursing journals, and quiet reading areas.", imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80" },
      { id: "ocn-fac-4", title: "Informatics Computer Facility", category: "Digital Learning", description: "Digital learning terminals supporting health research and digital coursework.", imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80" }
    ],
    developmentHeading: "Preparing Degree Trainees for Healthcare Responsibility",
    developmentHighlights: [
      { title: "Clinical Communication", description: "Developing clear, accurate, and professional communication in nursing team environments." },
      { title: "Patient-Centered Empathy", description: "Encouraging respectful, compassionate, and dignified patient interaction standards." },
      { title: "Healthcare Ethics", description: "Understanding professional conduct, patient privacy, and ethical care responsibility." },
      { title: "Emergency Awareness", description: "Building familiarity with essential resuscitation, vitals triage, and emergency concepts." },
      { title: "Interdisciplinary Teamwork", description: "Learning to collaborate smoothly within multi-disciplinary healthcare clinical teams." },
      { title: "Career Guidance", description: "Supporting undergraduate students as they plan post-degree nursing and higher academic steps." }
    ],
    ctaHeading: "Begin Your Undergraduate Nursing Journey",
    ctaDescription: "Explore B.Sc. Nursing availability, eligibility criteria, and admission guidance at Chengicherla, Hyderabad.",
    gallery: [
      { title: "Clinical Simulation Practice", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80" },
      { title: "Smart Classroom Instruction", category: "Classrooms", imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80" },
      { title: "Resuscitation Workshop", category: "Events", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Chengicherla+Hyderabad+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Orange College of Nursing | Orange Group",
    seoDescription: "Orange College of Nursing in Chengicherla, Hyderabad, sponsored by Srikar Educational Society (Reg No. 215/2025), offering B.Sc Nursing education in Telangana."
  },

  // 2. APPLE COLLEGE OF NURSING (NAGARAM / HYDERABAD) — B.Sc Nursing / Academic + Applied Learning
  {
    id: "apple-college-of-nursing",
    slug: "apple-college-of-nursing",
    name: "Apple College of Nursing",
    category: "Nursing College",
    type: "Nursing College",
    sponsor: "Telagana Xpress Educational Society",
    registrationNumber: "214/2025",
    address: "H.No. 4-48/1, Nagaram, Hyderabad, Telangana State - 500083",
    locationGroup: "Nagaram / Hyderabad",
    district: "Medchal Dist",
    state: "Telangana State",
    postalCode: "500083",
    imageLabel: "Apple College of Nursing Campus",
    shortDescription: "Undergraduate nursing institution in Nagaram, Hyderabad, sponsored by Telagana Xpress Educational Society.",
    heroTagline: "Academic Depth & Applied Nursing Education in Nagaram, Hyderabad",
    dropdownThumbnail: "/images/colleges/acn_building.jpg",
    heroImage: "/images/colleges/acn_building.jpg",
    aboutHeading: "From Scientific Understanding to Nursing Practice",
    aboutParagraphs: [
      "Apple College of Nursing provides academic instruction and visual demonstration training in Nagaram, Hyderabad, designed for degree-level nursing practice.",
      "Sponsored by Telagana Xpress Educational Society (Reg No. 214/2025), the college emphasizes anatomical understanding, collaborative learning, and practical application."
    ],
    aboutHighlights: [
      "Applied Medical Sciences",
      "Anatomy Demonstration",
      "Collaborative Learning"
    ],
    aboutImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    campusLifeImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    admissionsImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    logoMonogram: "ACN",
    accentTheme: {
      primary: "#0D9488",
      lightBg: "#F0FDFA",
      badgeBg: "bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/20",
      badgeLabel: "NURSING COLLEGE • NAGARAM / HYDERABAD"
    },
    programs: ["bsc-nursing", "gnm"],
    learningSectionTitle: "Learning Through Demonstration & Practice",
    learningSectionSubtitle: "Visual and practical instruction linking scientific principles with bedside nursing skills.",
    learningHighlights: [
      {
        title: "Applied Medical Sciences",
        description: "Linking foundational biological and health sciences with clinical nursing procedures."
      },
      {
        title: "Anatomy & Demonstration Learning",
        description: "Visual and practical learning through 3D models supporting structural understanding."
      },
      {
        title: "Collaborative Learning",
        description: "Small-group academic discussions and peer skill demonstrations under experienced faculty."
      },
      {
        title: "Practice-Oriented Education",
        description: "Connecting classroom scientific concepts directly with nursing application routines."
      }
    ],
    facilitySectionTitle: "Learning Spaces for Applied Healthcare Education",
    facilities: [
      { id: "acn-fac-1", title: "Anatomy Demonstration Room", category: "Academic", description: "Equipped with 3D anatomical models and skeletal structures for visual study.", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" },
      { id: "acn-fac-2", title: "Nursing Foundation Skills Lab", category: "Practical Training", description: "Practical stations for patient care procedures and clinical skill simulation.", imageUrl: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=800&q=80" },
      { id: "acn-fac-3", title: "Interactive Lecture Classrooms", category: "Academic", description: "Spacious lecture halls equipped with visual learning charts and comfortable seating.", imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80" },
      { id: "acn-fac-4", title: "Informatics Computer Resource", category: "Digital Learning", description: "Computer terminals supporting digital health study and coursework research.", imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" }
    ],
    developmentHeading: "Fostering Applied Nursing & Technical Competence",
    developmentHighlights: [
      { title: "Anatomical Observation", description: "Visual assessment and anatomical understanding applied directly to patient care." },
      { title: "Care Task Organization", description: "Organizing nursing care tasks and procedural documentation systematically." },
      { title: "Patient Safety Protocols", description: "Understanding sterile techniques, infection control, and patient safety guidelines." },
      { title: "Emergency Response Readiness", description: "Basic life support orientation, vitals monitoring, and emergency awareness." },
      { title: "Academic Collaboration", description: "Group problem-solving in nursing case study discussions and practical exercises." },
      { title: "Professional Mentorship", description: "Academic orientation supporting career opportunities and higher nursing education." }
    ],
    ctaHeading: "Explore B.Sc. Nursing Admissions at Nagaram / Hyderabad",
    ctaDescription: "Contact our academic admissions team for course details and enrollment requirements in Nagaram, Hyderabad.",
    gallery: [
      { title: "Academic Lecture Discussion", category: "Classrooms", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" },
      { title: "Anatomy Practical Study", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=800&q=80" },
      { title: "Clinical Skill Demonstration", category: "Clinical Training", imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Nagaram+Hyderabad+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Apple College of Nursing | Orange Group",
    seoDescription: "Apple College of Nursing in Nagaram, Hyderabad, sponsored by Telagana Xpress Educational Society (Reg No. 214/2025)."
  },

  // 3. ORANGE SCHOOL OF NURSING (CHENGICHERLA / HYDERABAD) — GNM / Bedside + Community Care
  {
    id: "orange-school-of-nursing",
    slug: "orange-school-of-nursing",
    name: "Orange School of Nursing",
    category: "Nursing School",
    type: "Nursing School",
    sponsor: "Srikar Educational Society",
    registrationNumber: "215/2025",
    address: "H.No. 3-113/21/A, Chengicherla, Hyderabad, Telangana State - 500092",
    locationGroup: "Chengicherla / Hyderabad",
    district: "Medchal Dist",
    state: "Telangana State",
    postalCode: "500092",
    imageLabel: "Orange School of Nursing Campus",
    shortDescription: "GNM diploma nursing training school sponsored by Srikar Educational Society in Chengicherla, Hyderabad.",
    heroTagline: "General Nursing & Midwifery Diploma Education in Chengicherla, Hyderabad",
    dropdownThumbnail: "/images/colleges/osn_building.jpg",
    heroImage: "/images/colleges/osn_building.jpg",
    aboutHeading: "Learning the Essentials of Everyday Nursing Care",
    aboutParagraphs: [
      "Orange School of Nursing delivers General Nursing & Midwifery (GNM) diploma education focused on essential patient care routines, maternal health, and community nursing.",
      "Operating under Srikar Educational Society in Chengicherla, Hyderabad, the institution provides bedside simulation, skill instruction, and life-stage care awareness."
    ],
    aboutHighlights: [
      "GNM Diploma Program",
      "Bedside Care Essentials",
      "Community Health Focus"
    ],
    aboutImage: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1cdb?auto=format&fit=crop&w=800&q=80",
    campusLifeImage: "https://images.unsplash.com/photo-1582560469781-1965b9af9034?auto=format&fit=crop&w=800&q=80",
    admissionsImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    logoMonogram: "OSN",
    accentTheme: {
      primary: "#EA580C",
      lightBg: "#FFF7ED",
      badgeBg: "bg-[#EA580C]/10 text-[#EA580C] border-[#EA580C]/20",
      badgeLabel: "NURSING SCHOOL • CHENGICHERLA / HYDERABAD"
    },
    programs: ["gnm"],
    learningSectionTitle: "Developing Bedside Nursing Skills",
    learningSectionSubtitle: "Practical diploma training centered on patient hygiene, vital signs monitoring, and bedside care routines.",
    learningHighlights: [
      {
        title: "Bedside Care Practice",
        description: "Learning essential patient-care routines, bedmaking, and daily nursing care procedures."
      },
      {
        title: "Maternal & Family Care Learning",
        description: "Developing awareness of nursing care across maternal, neonatal, and pediatric stages of life."
      },
      {
        title: "Community Nursing Orientation",
        description: "Understanding preventive care, health promotion awareness, and community-based nursing outreach."
      },
      {
        title: "Patient Communication",
        description: "Developing clear, respectful, and compassionate interaction habits with hospitalized patients."
      }
    ],
    facilitySectionTitle: "Facilities for GNM Skill Development",
    facilities: [
      { id: "osn-fac-1", title: "Bedside Simulation Setup", category: "Practical Training", description: "Nursing beds and patient care manikins for GNM practical skill practice.", imageUrl: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80" },
      { id: "osn-fac-2", title: "Interactive Demonstration Room", category: "Academic", description: "Small-group practical demonstration and skill evaluation space.", imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" },
      { id: "osn-fac-3", title: "Student Counselling Room", category: "Support", description: "Mentorship guidance space for academic progress and career planning.", imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80" },
      { id: "osn-fac-4", title: "Health Informatics Lab", category: "Learning", description: "Computer laboratory supporting digital health study and coursework.", imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80" }
    ],
    developmentHeading: "Building Practical Competence for Bedside Nursing",
    developmentHighlights: [
      { title: "Bedside Communication", description: "Clear and empathetic communication with patients and family members in ward settings." },
      { title: "Patient Hygiene Standards", description: "Mastering personal hygiene care, bed comfort maintenance, and sanitation routines." },
      { title: "Ethical Nursing Conduct", description: "Responsibility, confidentiality, and patient dignity standards during diploma care." },
      { title: "Basic Emergency Care", description: "Rapid vitals assessment, reporting procedures, and basic first-aid response skills." },
      { title: "Ward Team Cooperation", description: "Working cohesively alongside senior nurses and ward staff during shift routines." },
      { title: "Practical Diploma Guidance", description: "Career advice for GNM diploma graduates preparing for healthcare employment." }
    ],
    ctaHeading: "Start Your GNM Nursing Diploma at Chengicherla / Hyderabad",
    ctaDescription: "Inquire about seat availability, eligibility, and diploma nursing training at Chengicherla, Hyderabad.",
    gallery: [
      { title: "GNM Instructor Simulation", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1583912267670-6575ad3736f0?auto=format&fit=crop&w=800&q=80" },
      { title: "Anatomical Demonstration", category: "Classrooms", imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80" },
      { title: "Community Outreach Camp", category: "Events", imageUrl: "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Chengicherla+Hyderabad+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Orange School of Nursing | Orange Group",
    seoDescription: "Orange School of Nursing in Chengicherla, Hyderabad, sponsored by Srikar Educational Society (Reg No. 215/2025), providing GNM nursing training."
  },

  // 4. APPLE SCHOOL OF NURSING (NAGARAM / HYDERABAD) — GNM / Foundation-to-Practice Journey
  {
    id: "apple-school-of-nursing",
    slug: "apple-school-of-nursing",
    name: "Apple School of Nursing",
    category: "Nursing School",
    type: "Nursing School",
    sponsor: "Telagana Xpress Educational Society",
    registrationNumber: "214/2025",
    address: "H.No. 4-48/1, Nagaram, Hyderabad, Telangana State - 500083",
    locationGroup: "Nagaram / Hyderabad",
    district: "Medchal Dist",
    state: "Telangana State",
    postalCode: "500083",
    imageLabel: "Apple School of Nursing Campus",
    shortDescription: "GNM diploma nursing school located in Nagaram, Hyderabad under Telagana Xpress Educational Society.",
    heroTagline: "Practical GNM Diploma Training in Nagaram, Hyderabad",
    dropdownThumbnail: "/images/colleges/asn_building.jpg",
    heroImage: "/images/colleges/asn_building.jpg",
    aboutHeading: "Building Confidence Through Practical Nursing Education",
    aboutParagraphs: [
      "Apple School of Nursing prepares GNM diploma trainees for healthcare environments through structured practical instruction and ward preparation training.",
      "Located in Nagaram, Hyderabad under Telagana Xpress Educational Society (Reg No. 214/2025), the school guides students from foundation skills to patient care confidence."
    ],
    aboutHighlights: [
      "Foundation Nursing Skills",
      "Ward Preparation Training",
      "Team-Based Learning"
    ],
    aboutImage: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80",
    campusLifeImage: "https://images.unsplash.com/photo-1579684288402-e36226f37648?auto=format&fit=crop&w=800&q=80",
    admissionsImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    logoMonogram: "ASN",
    accentTheme: {
      primary: "#15803D",
      lightBg: "#F0FDF4",
      badgeBg: "bg-[#15803D]/10 text-[#15803D] border-[#15803D]/20",
      badgeLabel: "NURSING SCHOOL • NAGARAM / HYDERABAD"
    },
    programs: ["gnm"],
    learningSectionTitle: "Practice That Builds Nursing Confidence",
    learningSectionSubtitle: "A progressive learning journey from fundamental nursing procedures to team-based practice.",
    learningHighlights: [
      {
        title: "Fundamental Nursing Procedures",
        description: "Mastering core patient hygiene, vitals monitoring, and daily nursing care routines."
      },
      {
        title: "Ward Preparation Skills",
        description: "Understanding ward organization, sterile equipment setups, and patient comfort routines."
      },
      {
        title: "Health Education Practice",
        description: "Learning to communicate basic hygiene and preventive health concepts to patients."
      },
      {
        title: "Team-Based Nursing Learning",
        description: "Collaborating with peer nursing trainees in structured practical skill exercises."
      }
    ],
    facilitySectionTitle: "Where Theory Becomes Practical Nursing",
    facilities: [
      { id: "asn-fac-1", title: "Practical Simulation Station", category: "Practical Training", description: "Training stations equipped with patient care apparatus and drip stands.", imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
      { id: "asn-fac-2", title: "Academic Instruction Classrooms", category: "Academic", description: "Structured lecture rooms with visual charts and ergonomic seating.", imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80" },
      { id: "asn-fac-3", title: "Digital Computer Resource Room", category: "Learning", description: "Computer facility for digital study terminals and research access.", imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" },
      { id: "asn-fac-4", title: "Student Guidance Room", category: "Support", description: "Private academic and professional mentoring space.", imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" }
    ],
    developmentHeading: "Developing Ward Readiness & Patient Sensitivity",
    developmentHighlights: [
      { title: "Practical Skill Discipline", description: "Precision and consistency in everyday basic nursing maneuvers and vital sign checks." },
      { title: "Compassionate Interaction", description: "Active listening and supportive verbal care for recovering patients in ward setups." },
      { title: "Professional Accountability", description: "Diligence in following nursing care notes and supervisory faculty guidance." },
      { title: "Vital Signs Accuracy", description: "Rigorous monitoring and accurate recording of pulse, blood pressure, and temperature." },
      { title: "Collaborative Ward Work", description: "Functioning smoothly as part of a nursing shift team during practical sessions." },
      { title: "Career Mentorship", description: "Personal guidance for post-diploma clinical practice placements and career growth." }
    ],
    ctaHeading: "Apply for GNM Diploma Training in Nagaram / Hyderabad",
    ctaDescription: "Learn about eligibility, course structure, and admissions counseling for Apple School of Nursing.",
    gallery: [
      { title: "Nursing Vitals Practice", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80" },
      { title: "Community Hygiene Camp", category: "Events", imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80" },
      { title: "Smart Classroom Lecture", category: "Classrooms", imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Nagaram+Hyderabad+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Apple School of Nursing | Orange Group",
    seoDescription: "Apple School of Nursing in Nagaram, Hyderabad, sponsored by Telagana Xpress Educational Society (Reg No. 214/2025)."
  },

  // 5. SINDOORA SCHOOL OF NURSING (CHENGICHERLA / HYDERABAD) — GNM / Demonstration & Care Focus
  {
    id: "sindoora-school-of-nursing",
    slug: "sindoora-school-of-nursing",
    name: "Sindoora School of Nursing",
    category: "Nursing School",
    type: "Nursing School",
    sponsor: "NS Foundation",
    registrationNumber: "520/2019",
    address: "H.No. 3-113, Chengicherla, Hyderabad, Telangana State - 500092",
    locationGroup: "Chengicherla / Hyderabad",
    district: "Medchal Dist",
    state: "Telangana State",
    postalCode: "500092",
    imageLabel: "Sindoora School of Nursing Campus",
    shortDescription: "Nursing education school in Chengicherla, Hyderabad, sponsored by NS Foundation.",
    heroTagline: "GNM Diploma Nursing Instruction in Chengicherla, Hyderabad",
    dropdownThumbnail: "/images/colleges/ssn_building.jpg",
    heroImage: "/images/colleges/ssn_building.jpg",
    aboutHeading: "Practical Nursing Education with a Patient-Care Focus",
    aboutParagraphs: [
      "Sindoora School of Nursing offers GNM diploma training focused on procedure demonstrations, patient comfort, and nursing care ethics.",
      "Sponsored by NS Foundation (Reg No. 520/2019) in Chengicherla, Hyderabad, the school emphasizes demonstration workshops, health awareness activities, and discipline."
    ],
    aboutHighlights: [
      "Procedure Demonstrations",
      "Patient Comfort Care",
      "Health Awareness Workshops"
    ],
    aboutImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    campusLifeImage: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80",
    admissionsImage: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&w=800&q=80",
    logoMonogram: "SSN",
    accentTheme: {
      primary: "#9F1239",
      lightBg: "#FFF1F2",
      badgeBg: "bg-[#9F1239]/10 text-[#9F1239] border-[#9F1239]/20",
      badgeLabel: "NURSING SCHOOL • CHENGICHERLA / HYDERABAD"
    },
    programs: ["gnm"],
    learningSectionTitle: "Demonstration & Skill-Building Workshops",
    learningSectionSubtitle: "Instructor-led practical demonstrations supporting patient care techniques and health awareness.",
    learningHighlights: [
      {
        title: "Procedure Demonstrations",
        description: "Hands-on instructor-led demonstrations of core nursing and clinical procedures."
      },
      {
        title: "Patient Comfort & Basic Care",
        description: "Emphasizing compassionate, respectful patient positioning and basic care routines."
      },
      {
        title: "Health Awareness Activities",
        description: "Participating in health poster presentations and student-led awareness events."
      },
      {
        title: "Professional Conduct",
        description: "Cultivating ethics, responsibility, and professional nursing standards."
      }
    ],
    facilitySectionTitle: "Practical Learning & Demonstration Spaces",
    facilities: [
      { id: "ssn-fac-1", title: "CPR Resuscitation Station", category: "Practical Training", description: "Dedicated CPR simulation floor manikins for resuscitation training.", imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80" },
      { id: "ssn-fac-2", title: "Anatomy Model Demonstration Room", category: "Academic", description: "Demonstration room with anatomical organs and structural models.", imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80" },
      { id: "ssn-fac-3", title: "Medical Reference Reading Room", category: "Learning", description: "Quiet study lounge with medical reference books and nursing guides.", imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80" },
      { id: "ssn-fac-4", title: "Auditorium Assembly Hall", category: "Academic", description: "Auditorium for health lectures, guest talks, and academic events.", imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80" }
    ],
    developmentHeading: "Cultivating Nursing Discipline & Patient Respect",
    developmentHighlights: [
      { title: "Demonstrated Precision", description: "Replicating faculty-guided nursing procedures with care, precision, and safety." },
      { title: "Patient Respect & Privacy", description: "Maintaining patient dignity and privacy during physical care procedures." },
      { title: "Institutional Ethics", description: "Upholding standard nursing care protocols and organizational guidelines." },
      { title: "Emergency Observation", description: "Identifying critical changes in patient condition and reporting promptly." },
      { title: "Peer Collaboration", description: "Supporting fellow nursing trainees during practical skill demonstration workshops." },
      { title: "Student Development", description: "Academic support and skill refinement throughout the GNM diploma course." }
    ],
    ctaHeading: "Enquire About GNM Nursing at Sindoora",
    ctaDescription: "Contact NS Foundation admissions counselors for enrollment and course guidance at Chengicherla, Hyderabad.",
    gallery: [
      { title: "Campus Courtyard Assembly", category: "Campus", imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80" },
      { title: "Poster Competition Event", category: "Events", imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80" },
      { title: "CPR Practical Workshop", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1581595220892-c0737db375ca?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Chengicherla+Hyderabad+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Sindoora School of Nursing | Orange Group",
    seoDescription: "Sindoora School of Nursing in Chengicherla, Hyderabad, sponsored by NS Foundation (Reg No. 520/2019)."
  },

  // 6. VENNELA SCHOOL OF NURSING (NALGONDA) — GNM / Community-Centered Nalgonda
  {
    id: "vennela-school-of-nursing",
    slug: "vennela-school-of-nursing",
    name: "Vennela School of Nursing",
    category: "Nursing School",
    type: "Nursing School",
    sponsor: "Siddhartha Educational Society",
    registrationNumber: null,
    address: "Opposite Venkateswara Colony Bus Stop, Hyderabad Road, Nalgonda",
    locationGroup: "Nalgonda",
    district: "Nalgonda",
    state: "Telangana State",
    postalCode: null,
    imageLabel: "Vennela School of Nursing Campus",
    shortDescription: "Nursing education school serving Nalgonda under Siddhartha Educational Society.",
    heroTagline: "Community-Oriented GNM Nursing Education in Nalgonda",
    dropdownThumbnail: "/images/colleges/vsn_building.jpg",
    heroImage: "/images/colleges/vsn_building.jpg",
    aboutHeading: "Nursing Education Connected to Community Health",
    aboutParagraphs: [
      "Vennela School of Nursing serves the Nalgonda region with GNM diploma training focused on basic clinical skills, preventive care, and community health.",
      "Sponsored by Siddhartha Educational Society on Hyderabad Road, Nalgonda, the school connects nursing fundamentals with regional healthcare needs."
    ],
    aboutHighlights: [
      "Regional Healthcare Focus",
      "Community Health Orientation",
      "Preventive Care Training"
    ],
    aboutImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    campusLifeImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
    admissionsImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
    logoMonogram: "VSN",
    accentTheme: {
      primary: "#1E40AF",
      lightBg: "#EFF6FF",
      badgeBg: "bg-[#1E40AF]/10 text-[#1E40AF] border-[#1E40AF]/20",
      badgeLabel: "NURSING SCHOOL • NALGONDA"
    },
    programs: ["gnm"],
    learningSectionTitle: "Community-Centered Nursing Learning",
    learningSectionSubtitle: "Nursing education integrating core clinical skills with community health promotion in Nalgonda.",
    learningHighlights: [
      {
        title: "Community Health Awareness",
        description: "Connecting nursing fundamentals with regional community health needs and rural healthcare."
      },
      {
        title: "Basic Clinical Skills",
        description: "Practice-oriented instruction in patient assessment, hygiene, and bedside care."
      },
      {
        title: "Preventive-Care Learning",
        description: "Understanding health promotion, immunization guidance, and disease prevention concepts."
      },
      {
        title: "Student Guidance & Development",
        description: "Personal academic mentorship supporting diploma nursing students throughout their studies."
      }
    ],
    facilitySectionTitle: "Regional Learning & Nursing Practice Units",
    facilities: [
      { id: "vsn-fac-1", title: "Nalgonda Practical Skills Station", category: "Practical Training", description: "Clinical skills laboratory equipped with nursing beds and equipment.", imageUrl: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=800&q=80" },
      { id: "vsn-fac-2", title: "Instructional Smart Classroom", category: "Academic", description: "Digital classroom for interactive instruction and case discussions.", imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" },
      { id: "vsn-fac-3", title: "Clinical Ward Support Unit", category: "Practical Training", description: "Faculty coordination for bedside clinical ward discussion rounds.", imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80" },
      { id: "vsn-fac-4", title: "Textbook Study Lounge", category: "Learning", description: "Study lounge stocked with nursing handbooks and reference material.", imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80" }
    ],
    developmentHeading: "Empowering Community-Focused Nursing Practice",
    developmentHighlights: [
      { title: "Community Outreach Skills", description: "Communicating preventive health habits effectively to diverse patient groups." },
      { title: "Basic Clinical Competence", description: "Developing steady performance in routine nursing assessments and care routines." },
      { title: "Empathetic Communication", description: "Building trust and rapport with regional patient populations." },
      { title: "Health Awareness Drive", description: "Organising health education talks and hygiene awareness demonstrations." },
      { title: "Regional Healthcare Pride", description: "Preparing diploma trainees to serve in regional healthcare institutions." },
      { title: "Career Mentorship", description: "Personal guidance for post-diploma nursing career pathways." }
    ],
    ctaHeading: "Join Vennela School of Nursing in Nalgonda",
    ctaDescription: "Inquire about GNM admission requirements, campus location, and seat details in Nalgonda.",
    gallery: [
      { title: "Nalgonda Academic Lecture", category: "Classrooms", imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80" },
      { title: "Clinical Ward Discussion", category: "Clinical Training", imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80" },
      { title: "Smart Classroom Study", category: "Classrooms", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Nalgonda+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Vennela School of Nursing | Orange Group",
    seoDescription: "Vennela School of Nursing in Nalgonda, sponsored by Siddhartha Educational Society."
  },

  // 7. JAWAN PARAMEDICAL COLLEGE (NAGARAM / HYDERABAD) — Diagnostic & Technical Healthcare Sciences
  {
    id: "jawan-paramedical-college",
    slug: "jawan-paramedical-college",
    name: "Jawan Paramedical College",
    category: "Paramedical College",
    type: "Paramedical College",
    sponsor: "Telagana Xpress Educational Society",
    registrationNumber: "214/2025",
    address: "H.No. 4-1, Nagaram, Hyderabad, Telangana State - 500083",
    locationGroup: "Nagaram / Hyderabad",
    district: "Medchal Dist",
    state: "Telangana State",
    postalCode: "500083",
    imageLabel: "Jawan Paramedical College Campus",
    shortDescription: "Paramedical diploma institution in Nagaram, Hyderabad, sponsored by Telagana Xpress Educational Society.",
    heroTagline: "Diagnostic & Paramedical Technical Education in Nagaram, Hyderabad",
    dropdownThumbnail: "/images/colleges/jpc_building.jpg",
    heroImage: "/images/colleges/jpc_building.jpg",
    aboutHeading: "Training for the Technical Side of Modern Healthcare",
    aboutParagraphs: [
      "Jawan Paramedical College provides specialized paramedical diploma education in medical laboratory technology, imaging techniques, and ophthalmic assistance.",
      "Located in Nagaram, Hyderabad under Telagana Xpress Educational Society (Reg No. 214/2025), the college focuses on technical equipment operation and diagnostic precision."
    ],
    aboutHighlights: [
      "Diagnostic Lab Sciences",
      "Medical Imaging Training",
      "Ophthalmic Technical Skills"
    ],
    aboutImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    campusLifeImage: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80",
    admissionsImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    logoMonogram: "JPC",
    accentTheme: {
      primary: "#0F172A",
      lightBg: "#F8FAFC",
      badgeBg: "bg-[#0F172A]/10 text-[#0F172A] border-[#0F172A]/20",
      badgeLabel: "PARAMEDICAL COLLEGE • NAGARAM / HYDERABAD"
    },
    programs: ["dmlt", "doa", "dmit", "dans", "dmst"],
    learningSectionTitle: "Inside the Diagnostic Learning Environment",
    learningSectionSubtitle: "Specialized technical training on laboratory instruments, diagnostic procedures, and testing precision.",
    learningHighlights: [
      {
        title: "Diagnostic Procedures",
        description: "Understanding specimen collection, handling, processing, and clinical laboratory diagnostics."
      },
      {
        title: "Laboratory Technique",
        description: "Developing precision in operating microscopes, centrifuges, and biochemical analyzers."
      },
      {
        title: "Equipment Familiarisation",
        description: "Practical instruction on diagnostic radiology tools, imaging apparatus, and ophthalmic instruments."
      },
      {
        title: "Accurate Observation & Reporting",
        description: "Cultivating sharp attention to detail in diagnostic testing analysis and record keeping."
      }
    ],
    facilitySectionTitle: "Diagnostic & Technical Learning Spaces",
    facilities: [
      { id: "jpc-fac-1", title: "Diagnostic Pathology Lab", category: "Paramedical Practical", description: "Equipped for microbiology, hematology, and clinical pathology practice.", imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=800&q=80" },
      { id: "jpc-fac-2", title: "Medical Imaging Unit", category: "Paramedical Practical", description: "Practical station for radiographic imaging procedures and positioning.", imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80" },
      { id: "jpc-fac-3", title: "Ophthalmic Equipment Lab", category: "Paramedical Practical", description: "Equipment lab for vision assessment and eye-care support.", imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80" },
      { id: "jpc-fac-4", title: "Operation Theatre Simulation", category: "Practical Training", description: "Sterile processing and OT technician practical setup.", imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80" }
    ],
    developmentHeading: "Building Technical Competence in Allied Health",
    developmentHighlights: [
      { title: "Diagnostic Accuracy", description: "Maintaining precision in sample testing, chemical preparation, and lab documentation." },
      { title: "Technical Safety Standards", description: "Biohazard handling, chemical safety, and radiation protection guidelines." },
      { title: "Equipment Handling", description: "Proper operation, calibration, and routine care of diagnostic laboratory apparatus." },
      { title: "Quality Control Awareness", description: "Understanding test calibration, standard controls, and reporting integrity." },
      { title: "Diagnostic Teamwork", description: "Collaborating effectively with pathologists, radiologists, and healthcare specialists." },
      { title: "Technical Career Guidance", description: "Mentorship for paramedical technician roles in diagnostic labs and clinical setups." }
    ],
    ctaHeading: "Explore Paramedical Diplomas at Nagaram / Hyderabad",
    ctaDescription: "Contact Jawan Paramedical admissions for DMLT, DOA, and DMIT eligibility details in Nagaram, Hyderabad.",
    gallery: [
      { title: "Pathology Microscope Diagnostics", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80" },
      { title: "Medical Imaging Instruction", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" },
      { title: "Clinical Pathology Testing", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Nagaram+Hyderabad+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Jawan Paramedical College | Orange Group",
    seoDescription: "Jawan Paramedical College in Nagaram, Hyderabad, sponsored by Telagana Xpress Educational Society (Reg No. 214/2025)."
  },

  // 8. SIDDHARTHA PARAMEDICAL COLLEGES (NALGONDA) — Multi-Disciplinary Allied Health / Nalgonda
  {
    id: "siddhartha-paramedical-colleges",
    slug: "siddhartha-paramedical-colleges",
    name: "Siddhartha Paramedical Colleges",
    category: "Paramedical College",
    type: "Paramedical College",
    sponsor: "Siddhartha Educational Society",
    registrationNumber: null,
    address: "Opposite Venkateswara Colony Bus Stop, Hyderabad Road, Nalgonda",
    locationGroup: "Nalgonda",
    district: "Nalgonda",
    state: "Telangana State",
    postalCode: null,
    imageLabel: "Siddhartha Paramedical Colleges Campus",
    shortDescription: "Paramedical education institution in Nalgonda sponsored by Siddhartha Educational Society.",
    heroTagline: "Allied Health & Diagnostic Technical Diplomas in Nalgonda",
    dropdownThumbnail: "/images/colleges/spc_building.jpg",
    heroImage: "/images/colleges/spc_building.jpg",
    aboutHeading: "Exploring Multiple Paths in Allied Healthcare",
    aboutParagraphs: [
      "Siddhartha Paramedical Colleges offers multi-disciplinary technical diploma education serving the Nalgonda region.",
      "Sponsored by Siddhartha Educational Society on Hyderabad Road, Nalgonda, the institution prepares students across laboratory diagnostics, imaging, dialysis, and cardiac assistance."
    ],
    aboutHighlights: [
      "Multi-Disciplinary Diplomas",
      "Pathology Diagnostics",
      "Technical Allied Training"
    ],
    aboutImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    campusLifeImage: "https://images.unsplash.com/photo-1582560469781-1965b9af9034?auto=format&fit=crop&w=800&q=80",
    admissionsImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    logoMonogram: "SPC",
    accentTheme: {
      primary: "#2563EB",
      lightBg: "#EFF6FF",
      badgeBg: "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20",
      badgeLabel: "PARAMEDICAL COLLEGE • NALGONDA"
    },
    programs: ["dmlt", "doa", "dmit", "d-dialysis", "d-cardio", "drest"],
    learningSectionTitle: "Building Technical Healthcare Skills",
    learningSectionSubtitle: "Hands-on instruction across diverse allied health disciplines, diagnostic testing, and equipment operation.",
    learningHighlights: [
      {
        title: "Medical Laboratory Sciences",
        description: "Practical groundwork across clinical biochemistry, pathology, and hematology testing."
      },
      {
        title: "Imaging & Diagnostic Support",
        description: "Learning radiographic positioning, equipment safety, and medical imaging fundamentals."
      },
      {
        title: "Ophthalmic Assistance",
        description: "Practical training in vision assessment and eye examination support device handling."
      },
      {
        title: "Procedure-Based Technical Training",
        description: "Technical preparation for specialized allied health disciplines such as dialysis and cardiac care."
      }
    ],
    facilitySectionTitle: "Laboratories for Allied Health Training",
    facilities: [
      { id: "spc-fac-1", title: "Ophthalmic Assistance Lab", category: "Paramedical Practical", description: "Equipment for eye examination, slit-lamp testing, and vision assessment.", imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80" },
      { id: "spc-fac-2", title: "Medical Pathology Diagnostics Lab", category: "Paramedical Practical", description: "Specimen handling and clinical pathology testing stations.", imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=800&q=80" },
      { id: "spc-fac-3", title: "Paramedical Equipment Station", category: "Paramedical Practical", description: "Equipment practical stations for specialized technical training.", imageUrl: "https://images.unsplash.com/photo-1581595220892-c0737db375ca?auto=format&fit=crop&w=800&q=80" },
      { id: "spc-fac-4", title: "Anatomy Demonstration Space", category: "Academic", description: "Demonstration room with anatomical models and instructional diagrams.", imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80" }
    ],
    developmentHeading: "Preparing Technicians for Diverse Medical Specializations",
    developmentHighlights: [
      { title: "Multi-Discipline Familiarity", description: "Gaining foundational technical awareness across various allied healthcare fields." },
      { title: "Diagnostic Precision", description: "Developing disciplined habits in laboratory testing and equipment handling." },
      { title: "Patient Test Assistance", description: "Guiding patients comfortably through diagnostic testing procedures." },
      { title: "Sterile Protocol Compliance", description: "Maintaining strict hygiene and instrument sterilization routines." },
      { title: "Technical Collaboration", description: "Working efficiently alongside medical doctors and clinical specialists." },
      { title: "Paramedical Career Support", description: "Guidance for exploring technical healthcare career opportunities in Telangana." }
    ],
    ctaHeading: "Enroll in Paramedical Programs in Nalgonda",
    ctaDescription: "Inquire about DMLT, DOA, DMIT, Dialysis, and Cardiac Tech availability at Siddhartha.",
    gallery: [
      { title: "Ophthalmic Exam Device Station", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
      { title: "Paramedical Equipment Practice", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80" },
      { title: "Diagnostic Pathology Testing", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Nalgonda+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Siddhartha Paramedical Colleges | Orange Group",
    seoDescription: "Siddhartha Paramedical Colleges in Nalgonda, sponsored by Siddhartha Educational Society."
  }
];

export function getCollegeBySlug(slug: string): College | undefined {
  return collegesData.find(c => c.slug === slug);
}

export function getCollegesByLocation(locationGroup: LocationGroup): College[] {
  return collegesData.filter(c => c.locationGroup === locationGroup);
}

export function getCollegesByCategory(category: CollegeCategory): College[] {
  return collegesData.filter(c => c.category === category);
}
