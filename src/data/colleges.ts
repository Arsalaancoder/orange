export type LocationGroup = 'Medipally' | 'Keesara / Nagaram' | 'Nalgonda';
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
  dropdownThumbnail: string;
  heroImage: string;
  aboutImage: string;
  campusLifeImage: string;
  admissionsImage: string;
  logoMonogram: string;
  accentTheme: CollegeAccentTheme;
  aboutParagraphs: string[];
  aboutHighlights: string[];
  programs: string[];
  facilities: CollegeFacilityItem[];
  gallery: CollegeGalleryItem[];
  mapUrl: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  seoTitle: string;
  seoDescription: string;
}

export const collegesData: College[] = [
  // 1. ORANGE COLLEGE OF NURSING (MEDIPALLY)
  {
    id: "orange-college-of-nursing",
    slug: "orange-college-of-nursing",
    name: "Orange College of Nursing",
    category: "Nursing College",
    type: "Nursing College",
    sponsor: "Srikar Educational Society",
    registrationNumber: "215/2025",
    address: "H.No. 3-113/21/A, Chenigacherla (V), Medipally (M), Medchal Dist, Telangana State - 500092",
    locationGroup: "Medipally",
    district: "Medchal Dist",
    state: "Telangana State",
    postalCode: "500092",
    imageLabel: "Orange College of Nursing Campus",
    shortDescription: "Professional undergraduate nursing education sponsored by Srikar Educational Society in Medipally.",
    dropdownThumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80",
    heroImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    aboutImage: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    campusLifeImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    admissionsImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    logoMonogram: "OCN",
    accentTheme: {
      primary: "#F26A21",
      lightBg: "#FFF8F5",
      badgeBg: "bg-[#F26A21]/10 text-[#F26A21] border-[#F26A21]/20",
      badgeLabel: "NURSING COLLEGE • MEDIPALLY"
    },
    aboutParagraphs: [
      "Orange College of Nursing offers structured undergraduate nursing education combining classroom instruction, laboratory skills development, and clinical exposure.",
      "Sponsored by Srikar Educational Society (Reg No. 215/2025), the institution focuses on professional ethics, patient care standards, and clinical readiness."
    ],
    aboutHighlights: [
      "Structured Degree Learning",
      "Practical Skills Training",
      "Hospital Clinical Exposure"
    ],
    programs: ["bsc-nursing", "gnm"],
    facilities: [
      { id: "ocn-fac-1", title: "Nursing Skills Laboratory", category: "Practical Training", description: "Practical stations equipped with simulation manikins and patient care setups.", imageUrl: "https://images.unsplash.com/photo-1581595220892-c0737db375ca?auto=format&fit=crop&w=800&q=80" },
      { id: "ocn-fac-2", title: "Smart Digital Classrooms", category: "Academic", description: "Classrooms equipped with interactive digital boards and visual learning aids.", imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" },
      { id: "ocn-fac-3", title: "Medical Reference Library", category: "Learning", description: "Collection of medical textbooks, nursing journals, and quiet reading areas.", imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80" },
      { id: "ocn-fac-4", title: "3D Anatomy Demo Room", category: "Academic", description: "Focused demonstration space with anatomical models and organ specimens.", imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80" }
    ],
    gallery: [
      { title: "Clinical Simulation Practice", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80" },
      { title: "Smart Classroom Instruction", category: "Classrooms", imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80" },
      { title: "Resuscitation Workshop", category: "Events", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" },
      { title: "Bedside Discussion Rounds", category: "Clinical Training", imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Medipally+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Orange College of Nursing | Orange Group",
    seoDescription: "Orange College of Nursing in Medipally, sponsored by Srikar Educational Society (Reg No. 215/2025), offering nursing education in Telangana."
  },

  // 2. APPLE COLLEGE OF NURSING (KEESARA)
  {
    id: "apple-college-of-nursing",
    slug: "apple-college-of-nursing",
    name: "Apple College of Nursing",
    category: "Nursing College",
    type: "Nursing College",
    sponsor: "Telagana Xpress Educational Society",
    registrationNumber: "214/2025",
    address: "H.No. 4-48/1, Nagaram (V), Keesara (M), Medchal Dist, Telangana State - 500083",
    locationGroup: "Keesara / Nagaram",
    district: "Medchal Dist",
    state: "Telangana State",
    postalCode: "500083",
    imageLabel: "Apple College of Nursing Campus",
    shortDescription: "Undergraduate nursing institution in Nagaram, Keesara, sponsored by Telagana Xpress Educational Society.",
    dropdownThumbnail: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
    heroImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    aboutImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    campusLifeImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    admissionsImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    logoMonogram: "ACN",
    accentTheme: {
      primary: "#0D9488",
      lightBg: "#F0FDFA",
      badgeBg: "bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/20",
      badgeLabel: "NURSING COLLEGE • KEESARA"
    },
    aboutParagraphs: [
      "Apple College of Nursing provides academic instruction and clinical skills training in Nagaram, Keesara, designed for professional nursing practice.",
      "Sponsored by Telagana Xpress Educational Society (Reg No. 214/2025), the institution emphasizes classroom study, laboratory demonstrations, and bedside training."
    ],
    aboutHighlights: [
      "Academic Instruction",
      "Anatomy Demonstrations",
      "Supervised Hospital Training"
    ],
    programs: ["bsc-nursing", "gnm"],
    facilities: [
      { id: "acn-fac-1", title: "Anatomy Demonstration Room", category: "Academic", description: "Equipped with 3D anatomical models and skeletal structures.", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" },
      { id: "acn-fac-2", title: "Nursing Foundation Skills Lab", category: "Practical Training", description: "Practical stations for patient care procedures and clinical simulation.", imageUrl: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=800&q=80" },
      { id: "acn-fac-3", title: "Informatics Computer Facility", category: "Learning", description: "Digital computer terminals for health informatics coursework.", imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" },
      { id: "acn-fac-4", title: "Academic Lecture Hall", category: "Academic", description: "Spacious lecture auditorium for health lectures and presentations.", imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80" }
    ],
    gallery: [
      { title: "Academic Lecture Discussion", category: "Classrooms", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" },
      { title: "Anatomy Practical Study", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=800&q=80" },
      { title: "Clinical Skill Demonstration", category: "Clinical Training", imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80" },
      { title: "Library Reading Lounge", category: "Campus", imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Nagaram+Keesara+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Apple College of Nursing | Orange Group",
    seoDescription: "Apple College of Nursing in Nagaram, Keesara, sponsored by Telagana Xpress Educational Society (Reg No. 214/2025)."
  },

  // 3. ORANGE SCHOOL OF NURSING (MEDIPALLY)
  {
    id: "orange-school-of-nursing",
    slug: "orange-school-of-nursing",
    name: "Orange School of Nursing",
    category: "Nursing School",
    type: "Nursing School",
    sponsor: "Srikar Educational Society",
    registrationNumber: "215/2025",
    address: "H.No. 3-113/21/A, Chenigacherla (V), Medipally (M), Medchal Dist, Telangana State - 500092",
    locationGroup: "Medipally",
    district: "Medchal Dist",
    state: "Telangana State",
    postalCode: "500092",
    imageLabel: "Orange School of Nursing Campus",
    shortDescription: "GNM diploma nursing training school sponsored by Srikar Educational Society in Medipally.",
    dropdownThumbnail: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=400&q=80",
    heroImage: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    aboutImage: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1cdb?auto=format&fit=crop&w=800&q=80",
    campusLifeImage: "https://images.unsplash.com/photo-1582560469781-1965b9af9034?auto=format&fit=crop&w=800&q=80",
    admissionsImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    logoMonogram: "OSN",
    accentTheme: {
      primary: "#EA580C",
      lightBg: "#FFF7ED",
      badgeBg: "bg-[#EA580C]/10 text-[#EA580C] border-[#EA580C]/20",
      badgeLabel: "NURSING SCHOOL • MEDIPALLY"
    },
    aboutParagraphs: [
      "Orange School of Nursing delivers General Nursing & Midwifery (GNM) diploma education focused on practical care, maternal health, and community nursing.",
      "Operating under Srikar Educational Society in Medipally, the institution provides bedside simulation, skill instruction, and clinical training."
    ],
    aboutHighlights: [
      "GNM Diploma Program",
      "Bedside Practical Care",
      "Community Outreach Nursing"
    ],
    programs: ["gnm"],
    facilities: [
      { id: "osn-fac-1", title: "Bedside Simulation Setup", category: "Practical Training", description: "Nursing beds and patient care manikins for GNM practical skill practice.", imageUrl: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80" },
      { id: "osn-fac-2", title: "Interactive Demonstration Room", category: "Academic", description: "Small-group practical demonstration and skill evaluation space.", imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" },
      { id: "osn-fac-3", title: "Student Counselling Room", category: "Support", description: "Mentorship guidance space for academic progress and career planning.", imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80" },
      { id: "osn-fac-4", title: "Health Informatics Lab", category: "Learning", description: "Computer laboratory supporting digital health study and coursework.", imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80" }
    ],
    gallery: [
      { title: "GNM Instructor Simulation", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1583912267670-6575ad3736f0?auto=format&fit=crop&w=800&q=80" },
      { title: "Anatomical Demonstration", category: "Classrooms", imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80" },
      { title: "Community Outreach Camp", category: "Events", imageUrl: "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&w=800&q=80" },
      { title: "Student Mentorship Session", category: "Support", imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Medipally+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Orange School of Nursing | Orange Group",
    seoDescription: "Orange School of Nursing in Medipally, sponsored by Srikar Educational Society (Reg No. 215/2025), providing GNM nursing training."
  },

  // 4. APPLE SCHOOL OF NURSING (KEESARA)
  {
    id: "apple-school-of-nursing",
    slug: "apple-school-of-nursing",
    name: "Apple School of Nursing",
    category: "Nursing School",
    type: "Nursing School",
    sponsor: "Telagana Xpress Educational Society",
    registrationNumber: "214/2025",
    address: "H.No. 4-48/1, Nagaram (V), Keesara (M), Medchal Dist, Telangana State - 500083",
    locationGroup: "Keesara / Nagaram",
    district: "Medchal Dist",
    state: "Telangana State",
    postalCode: "500083",
    imageLabel: "Apple School of Nursing Campus",
    shortDescription: "GNM diploma nursing school located in Nagaram, Keesara under Telagana Xpress Educational Society.",
    dropdownThumbnail: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    heroImage: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80",
    aboutImage: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80",
    campusLifeImage: "https://images.unsplash.com/photo-1579684288402-e36226f37648?auto=format&fit=crop&w=800&q=80",
    admissionsImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    logoMonogram: "ASN",
    accentTheme: {
      primary: "#15803D",
      lightBg: "#F0FDF4",
      badgeBg: "bg-[#15803D]/10 text-[#15803D] border-[#15803D]/20",
      badgeLabel: "NURSING SCHOOL • KEESARA"
    },
    aboutParagraphs: [
      "Apple School of Nursing prepares GNM diploma trainees for healthcare environments through structured practical instruction and clinical exposure.",
      "Located in Nagaram, Keesara, the institution combines classroom learning, skills lab practice, and community health training."
    ],
    aboutHighlights: [
      "Practical Nursing Simulation",
      "Vitals & Care Practice",
      "Community Outreach"
    ],
    programs: ["gnm"],
    facilities: [
      { id: "asn-fac-1", title: "Practical Simulation Station", category: "Practical Training", description: "Training stations equipped with patient care apparatus and drip stands.", imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
      { id: "asn-fac-2", title: "Academic Instruction Classrooms", category: "Academic", description: "Structured lecture rooms with visual charts and ergonomic seating.", imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80" },
      { id: "asn-fac-3", title: "Digital Computer Resource Room", category: "Learning", description: "Computer facility for digital study terminals and research access.", imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" },
      { id: "asn-fac-4", title: "Student Guidance Room", category: "Support", description: "Private academic and professional mentoring space.", imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" }
    ],
    gallery: [
      { title: "Nursing Vitals Practice", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80" },
      { title: "Community Hygiene Camp", category: "Events", imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80" },
      { title: "Smart Classroom Lecture", category: "Classrooms", imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" },
      { title: "Computer Lab Practice", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Nagaram+Keesara+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Apple School of Nursing | Orange Group",
    seoDescription: "Apple School of Nursing in Nagaram, Keesara, sponsored by Telagana Xpress Educational Society (Reg No. 214/2025)."
  },

  // 5. SINDOORA SCHOOL OF NURSING (MEDIPALLY)
  {
    id: "sindoora-school-of-nursing",
    slug: "sindoora-school-of-nursing",
    name: "Sindoora School of Nursing",
    category: "Nursing School",
    type: "Nursing School",
    sponsor: "NS Foundation",
    registrationNumber: "520/2019",
    address: "H.No. 3-113, Chenagacherla (V), Medipally (M), Medchal Dist, Telangana State - 500092",
    locationGroup: "Medipally",
    district: "Medchal Dist",
    state: "Telangana State",
    postalCode: "500092",
    imageLabel: "Sindoora School of Nursing Campus",
    shortDescription: "Nursing education school in Chenagacherla, Medipally, sponsored by NS Foundation.",
    dropdownThumbnail: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    heroImage: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
    aboutImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    campusLifeImage: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80",
    admissionsImage: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&w=800&q=80",
    logoMonogram: "SSN",
    accentTheme: {
      primary: "#9F1239",
      lightBg: "#FFF1F2",
      badgeBg: "bg-[#9F1239]/10 text-[#9F1239] border-[#9F1239]/20",
      badgeLabel: "NURSING SCHOOL • MEDIPALLY"
    },
    aboutParagraphs: [
      "Sindoora School of Nursing offers GNM diploma training focused on core nursing foundations, patient care ethics, and practical skills.",
      "Sponsored by NS Foundation (Reg No. 520/2019) in Chenagacherla, Medipally, the school emphasizes traditional academic discipline and clinical skill building."
    ],
    aboutHighlights: [
      "Core Nursing Foundations",
      "Patient Care Ethics",
      "Clinical Skill Building"
    ],
    programs: ["gnm"],
    facilities: [
      { id: "ssn-fac-1", title: "CPR Resuscitation Station", category: "Practical Training", description: "Dedicated CPR simulation floor manikins for resuscitation training.", imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80" },
      { id: "ssn-fac-2", title: "Anatomy Model Demonstration Room", category: "Academic", description: "Demonstration room with anatomical organs and structural models.", imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80" },
      { id: "ssn-fac-3", title: "Medical Reference Reading Room", category: "Learning", description: "Quiet study lounge with medical reference books and nursing guides.", imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80" },
      { id: "ssn-fac-4", title: "Auditorium Assembly Hall", category: "Academic", description: "Auditorium for health lectures, guest talks, and academic events.", imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80" }
    ],
    gallery: [
      { title: "Campus Courtyard Assembly", category: "Campus", imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80" },
      { title: "Poster Competition Event", category: "Events", imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80" },
      { title: "Reference Reading Room", category: "Campus", imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80" },
      { title: "CPR Practical Workshop", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1581595220892-c0737db375ca?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Medipally+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Sindoora School of Nursing | Orange Group",
    seoDescription: "Sindoora School of Nursing in Chenagacherla, Medipally, sponsored by NS Foundation (Reg No. 520/2019)."
  },

  // 6. VENNELA SCHOOL OF NURSING (NALGONDA)
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
    dropdownThumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80",
    heroImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
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
    aboutParagraphs: [
      "Vennela School of Nursing serves Nalgonda region with GNM diploma training focused on clinical skills, classroom theory, and practical care.",
      "Sponsored by Siddhartha Educational Society on Hyderabad Road, Nalgonda, the institution connects academic study with practical nursing practice."
    ],
    aboutHighlights: [
      "Regional Healthcare Education",
      "Practical Nursing Practicals",
      "Supervised Ward Practice"
    ],
    programs: ["gnm"],
    facilities: [
      { id: "vsn-fac-1", title: "Nalgonda Practical Skills Station", category: "Practical Training", description: "Clinical skills laboratory equipped with nursing beds and equipment.", imageUrl: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=800&q=80" },
      { id: "vsn-fac-2", title: "Instructional Smart Classroom", category: "Academic", description: "Digital classroom for interactive instruction and case discussions.", imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" },
      { id: "vsn-fac-3", title: "Clinical Ward Support Unit", category: "Practical Training", description: "Faculty coordination for bedside clinical ward discussion rounds.", imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80" },
      { id: "vsn-fac-4", title: "Textbook Study Lounge", category: "Learning", description: "Study lounge stocked with nursing handbooks and reference material.", imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80" }
    ],
    gallery: [
      { title: "Nalgonda Academic Lecture", category: "Classrooms", imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80" },
      { title: "Clinical Ward Discussion", category: "Clinical Training", imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80" },
      { title: "Guest Speaker Lecture", category: "Events", imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80" },
      { title: "Smart Classroom Study", category: "Classrooms", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Nalgonda+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Vennela School of Nursing | Orange Group",
    seoDescription: "Vennela School of Nursing in Nalgonda, sponsored by Siddhartha Educational Society."
  },

  // 7. JAWAN PARAMEDICAL COLLEGE (KEESARA)
  {
    id: "jawan-paramedical-college",
    slug: "jawan-paramedical-college",
    name: "Jawan Paramedical College",
    category: "Paramedical College",
    type: "Paramedical College",
    sponsor: "Telagana Xpress Educational Society",
    registrationNumber: "214/2025",
    address: "H.No. 4-1, Nagaram Panchayat (V), Keesara (M), Medchal Dist, Telangana State - 500083",
    locationGroup: "Keesara / Nagaram",
    district: "Medchal Dist",
    state: "Telangana State",
    postalCode: "500083",
    imageLabel: "Jawan Paramedical College Campus",
    shortDescription: "Paramedical diploma institution in Nagaram, Keesara, sponsored by Telagana Xpress Educational Society.",
    dropdownThumbnail: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80",
    heroImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    aboutImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    campusLifeImage: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80",
    admissionsImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    logoMonogram: "JPC",
    accentTheme: {
      primary: "#0F172A",
      lightBg: "#F8FAFC",
      badgeBg: "bg-[#0F172A]/10 text-[#0F172A] border-[#0F172A]/20",
      badgeLabel: "PARAMEDICAL COLLEGE • KEESARA"
    },
    aboutParagraphs: [
      "Jawan Paramedical College provides specialized paramedical diploma education in medical laboratory technology, imaging, and ophthalmic assistance.",
      "Located in Nagaram Panchayat, Keesara, under Telagana Xpress Educational Society (Reg No. 214/2025), the college focuses on technical equipment operation and diagnostic procedures."
    ],
    aboutHighlights: [
      "Diagnostic Lab Technology",
      "Medical Imaging Practice",
      "Ophthalmic Technical Skills"
    ],
    programs: ["dmlt", "doa", "dmit", "dans", "dmst"],
    facilities: [
      { id: "jpc-fac-1", title: "Diagnostic Pathology Lab", category: "Paramedical Practical", description: "Equipped for microbiology, hematology, and clinical pathology practice.", imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=800&q=80" },
      { id: "jpc-fac-2", title: "Medical Imaging Unit", category: "Paramedical Practical", description: "Practical station for radiographic imaging procedures and positioning.", imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80" },
      { id: "jpc-fac-3", title: "Ophthalmic Equipment Lab", category: "Paramedical Practical", description: "Equipment lab for vision assessment and eye-care support.", imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80" },
      { id: "jpc-fac-4", title: "Operation Theatre Simulation", category: "Practical Training", description: "Sterile processing and OT technician practical setup.", imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80" }
    ],
    gallery: [
      { title: "Pathology Microscope Diagnostics", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80" },
      { title: "Medical Imaging Instruction", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" },
      { title: "Clinical Pathology Testing", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
      { title: "Operation Theatre Technician Lab", category: "Clinical Training", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" }
    ],
    mapUrl: "https://maps.google.com/?q=Nagaram+Keesara+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Jawan Paramedical College | Orange Group",
    seoDescription: "Jawan Paramedical College in Nagaram, Keesara, sponsored by Telagana Xpress Educational Society (Reg No. 214/2025)."
  },

  // 8. SIDDHARTHA PARAMEDICAL COLLEGES (NALGONDA)
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
    dropdownThumbnail: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
    heroImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
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
    aboutParagraphs: [
      "Siddhartha Paramedical Colleges offers technical allied health diploma education serving the Nalgonda region.",
      "Sponsored by Siddhartha Educational Society on Hyderabad Road, Nalgonda, the institution prepares students in laboratory diagnostics, ophthalmic assistance, and allied technical care."
    ],
    aboutHighlights: [
      "Medical Lab Diagnostics",
      "Ophthalmic Assistance",
      "Technical Paramedical Skills"
    ],
    programs: ["dmlt", "doa", "dmit", "d-dialysis", "d-cardio", "drest"],
    facilities: [
      { id: "spc-fac-1", title: "Ophthalmic Assistance Lab", category: "Paramedical Practical", description: "Equipment for eye examination, slit-lamp testing, and vision assessment.", imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80" },
      { id: "spc-fac-2", title: "Medical Pathology Diagnostics Lab", category: "Paramedical Practical", description: "Specimen handling and clinical pathology testing stations.", imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=800&q=80" },
      { id: "spc-fac-3", title: "Paramedical Equipment Station", category: "Paramedical Practical", description: "Equipment practical stations for specialized technical training.", imageUrl: "https://images.unsplash.com/photo-1581595220892-c0737db375ca?auto=format&fit=crop&w=800&q=80" },
      { id: "spc-fac-4", title: "Anatomy Demonstration Space", category: "Academic", description: "Demonstration room with anatomical models and instructional diagrams.", imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80" }
    ],
    gallery: [
      { title: "Ophthalmic Exam Device Station", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
      { title: "Paramedical Equipment Practice", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80" },
      { title: "Diagnostic Pathology Testing", category: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80" },
      { title: "Skill Communication Seminar", category: "Events", imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80" }
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
