import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const collegesFilePath = path.join(__dirname, '../src/data/colleges.ts');

let content = `export type LocationGroup = 'Medipally' | 'Keesara / Nagaram' | 'Nalgonda';
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
    dropdownThumbnail: "/images/colleges/ocn_thumb.png",
    heroImage: "/images/colleges/ocn_hero.png",
    aboutImage: "/images/generated/ocn_about.svg",
    campusLifeImage: "/images/generated/ocn_campus_life.svg",
    admissionsImage: "/images/generated/ocn_admissions.svg",
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
      "Structured Learning",
      "Practical Skills Training",
      "Clinical Exposure"
    ],
    programs: ["bsc-nursing", "gnm"],
    facilities: [
      { id: "ocn-fac-1", title: "Nursing Skills Laboratory", category: "Practical Training", description: "Practical stations equipped with simulation manikins and patient care setups.", imageUrl: "/images/facilities/facility-nursing-skills.jpg" },
      { id: "ocn-fac-2", title: "Smart Digital Classrooms", category: "Academic", description: "Classrooms equipped with interactive digital boards and visual learning aids.", imageUrl: "/images/generated/ocn_fac2.svg" },
      { id: "ocn-fac-3", title: "Medical Reference Library", category: "Learning", description: "Collection of medical textbooks, nursing journals, and quiet reading areas.", imageUrl: "/images/generated/ocn_fac3.svg" },
      { id: "ocn-fac-4", title: "3D Anatomy Demo Room", category: "Academic", description: "Focused demonstration space with anatomical models and organ specimens.", imageUrl: "/images/generated/ocn_fac4.svg" }
    ],
    gallery: [
      { title: "Clinical Simulation Practice", category: "Laboratories", imageUrl: "/images/generated/ocn_gal1.svg" },
      { title: "Smart Classroom Instruction", category: "Classrooms", imageUrl: "/images/generated/ocn_gal2.svg" },
      { title: "Resuscitation Workshop", category: "Events", imageUrl: "/images/generated/ocn_gal3.svg" },
      { title: "Bedside Discussion Rounds", category: "Clinical Training", imageUrl: "/images/generated/ocn_gal4.svg" }
    ],
    mapUrl: "https://maps.google.com/?q=Medipally+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Orange College of Nursing | Orange Group",
    seoDescription: "Orange College of Nursing in Medipally, sponsored by Srikar Educational Society (Reg No. 215/2025), offering nursing education in Telangana."
  },
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
    dropdownThumbnail: "/images/colleges/acn_thumb.png",
    heroImage: "/images/colleges/acn_hero.png",
    aboutImage: "/images/generated/acn_about.svg",
    campusLifeImage: "/images/generated/acn_campus_life.svg",
    admissionsImage: "/images/generated/acn_admissions.svg",
    logoMonogram: "ACN",
    accentTheme: {
      primary: "#16A34A",
      lightBg: "#F0FDF4",
      badgeBg: "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20",
      badgeLabel: "NURSING COLLEGE • KEESARA"
    },
    aboutParagraphs: [
      "Apple College of Nursing provides academic instruction and clinical skills training in Nagaram, Keesara, designed for professional nursing practice.",
      "Sponsored by Telagana Xpress Educational Society (Reg No. 214/2025), the institution emphasizes classroom study, laboratory demonstrations, and bedside training."
    ],
    aboutHighlights: [
      "Academic Instruction",
      "Anatomy Demonstrations",
      "Supervised Training"
    ],
    programs: ["bsc-nursing", "gnm"],
    facilities: [
      { id: "acn-fac-1", title: "Anatomy Demonstration Room", category: "Academic", description: "Equipped with 3D anatomical models and skeletal structures.", imageUrl: "/images/facilities/facility-demo-room.jpg" },
      { id: "acn-fac-2", title: "Nursing Foundation Skills Lab", category: "Practical Training", description: "Practical stations for patient care procedures and clinical simulation.", imageUrl: "/images/generated/acn_fac2.svg" },
      { id: "acn-fac-3", title: "Informatics Computer Facility", category: "Learning", description: "Digital computer terminals for health informatics coursework.", imageUrl: "/images/generated/acn_fac3.svg" },
      { id: "acn-fac-4", title: "Academic Lecture Hall", category: "Academic", description: "Spacious lecture auditorium for health lectures and presentations.", imageUrl: "/images/generated/acn_fac4.svg" }
    ],
    gallery: [
      { title: "Academic Lecture Discussion", category: "Classrooms", imageUrl: "/images/generated/acn_gal1.svg" },
      { title: "Anatomy Practical Study", category: "Laboratories", imageUrl: "/images/generated/acn_gal2.svg" },
      { title: "Clinical Skill Demonstration", category: "Clinical Training", imageUrl: "/images/generated/acn_gal3.svg" },
      { title: "Library Reading Lounge", category: "Campus", imageUrl: "/images/generated/acn_gal4.svg" }
    ],
    mapUrl: "https://maps.google.com/?q=Nagaram+Keesara+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Apple College of Nursing | Orange Group",
    seoDescription: "Apple College of Nursing in Nagaram, Keesara, sponsored by Telagana Xpress Educational Society (Reg No. 214/2025)."
  },
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
    dropdownThumbnail: "/images/colleges/osn_thumb.png",
    heroImage: "/images/colleges/osn_hero.png",
    aboutImage: "/images/generated/osn_about.svg",
    campusLifeImage: "/images/generated/osn_campus_life.svg",
    admissionsImage: "/images/generated/osn_admissions.svg",
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
      "GNM Diploma Training",
      "Bedside Practical Care",
      "Community Nursing"
    ],
    programs: ["gnm"],
    facilities: [
      { id: "osn-fac-1", title: "Bedside Simulation Setup", category: "Practical Training", description: "Nursing beds and patient care manikins for GNM practical skill practice.", imageUrl: "/images/facilities/facility-student-counselling.jpg" },
      { id: "osn-fac-2", title: "Interactive Demonstration Room", category: "Academic", description: "Small-group practical demonstration and skill evaluation space.", imageUrl: "/images/generated/osn_fac2.svg" },
      { id: "osn-fac-3", title: "Student Counselling Room", category: "Support", description: "Mentorship guidance space for academic progress and career planning.", imageUrl: "/images/generated/osn_fac3.svg" },
      { id: "osn-fac-4", title: "Health Informatics Lab", category: "Learning", description: "Computer laboratory supporting digital health study and coursework.", imageUrl: "/images/generated/osn_fac4.svg" }
    ],
    gallery: [
      { title: "GNM Instructor Simulation", category: "Laboratories", imageUrl: "/images/generated/osn_gal1.svg" },
      { title: "Anatomical Demonstration", category: "Classrooms", imageUrl: "/images/generated/osn_gal2.svg" },
      { title: "Community Outreach Camp", category: "Events", imageUrl: "/images/generated/osn_gal3.svg" },
      { title: "Student Mentorship Session", category: "Support", imageUrl: "/images/generated/osn_gal4.svg" }
    ],
    mapUrl: "https://maps.google.com/?q=Medipally+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Orange School of Nursing | Orange Group",
    seoDescription: "Orange School of Nursing in Medipally, sponsored by Srikar Educational Society (Reg No. 215/2025), providing GNM nursing training."
  },
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
    dropdownThumbnail: "/images/colleges/asn_thumb.png",
    heroImage: "/images/colleges/asn_hero.png",
    aboutImage: "/images/generated/asn_about.svg",
    campusLifeImage: "/images/generated/asn_campus_life.svg",
    admissionsImage: "/images/generated/asn_admissions.svg",
    logoMonogram: "ASN",
    accentTheme: {
      primary: "#059669",
      lightBg: "#ECFDF5",
      badgeBg: "bg-[#059669]/10 text-[#059669] border-[#059669]/20",
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
      { id: "asn-fac-1", title: "Practical Simulation Station", category: "Practical Training", description: "Training stations equipped with patient care apparatus and drip stands.", imageUrl: "/images/facilities/facility-computer-lab.jpg" },
      { id: "asn-fac-2", title: "Academic Instruction Classrooms", category: "Academic", description: "Structured lecture rooms with visual charts and ergonomic seating.", imageUrl: "/images/generated/asn_fac2.svg" },
      { id: "asn-fac-3", title: "Digital Computer Resource Room", category: "Learning", description: "Computer facility for digital study terminals and research access.", imageUrl: "/images/generated/asn_fac3.svg" },
      { id: "asn-fac-4", title: "Student Guidance Room", category: "Support", description: "Private academic and professional mentoring space.", imageUrl: "/images/generated/asn_fac4.svg" }
    ],
    gallery: [
      { title: "Nursing Vitals Practice", category: "Laboratories", imageUrl: "/images/generated/asn_gal1.svg" },
      { title: "Community Hygiene Camp", category: "Events", imageUrl: "/images/generated/asn_gal2.svg" },
      { title: "Smart Classroom Lecture", category: "Classrooms", imageUrl: "/images/generated/asn_gal3.svg" },
      { title: "Computer Lab Practice", category: "Laboratories", imageUrl: "/images/generated/asn_gal4.svg" }
    ],
    mapUrl: "https://maps.google.com/?q=Nagaram+Keesara+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Apple School of Nursing | Orange Group",
    seoDescription: "Apple School of Nursing in Nagaram, Keesara, sponsored by Telagana Xpress Educational Society (Reg No. 214/2025)."
  },
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
    dropdownThumbnail: "/images/colleges/ssn_thumb.png",
    heroImage: "/images/colleges/ssn_hero.png",
    aboutImage: "/images/generated/ssn_about.svg",
    campusLifeImage: "/images/generated/ssn_campus_life.svg",
    admissionsImage: "/images/generated/ssn_admissions.svg",
    logoMonogram: "SSN",
    accentTheme: {
      primary: "#B91C1C",
      lightBg: "#FEF2F2",
      badgeBg: "bg-[#B91C1C]/10 text-[#B91C1C] border-[#B91C1C]/20",
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
      { id: "ssn-fac-1", title: "CPR Resuscitation Station", category: "Practical Training", description: "Dedicated CPR simulation floor manikins for resuscitation training.", imageUrl: "/images/facilities/facility-library.jpg" },
      { id: "ssn-fac-2", title: "Anatomy Model Demonstration Room", category: "Academic", description: "Demonstration room with anatomical organs and structural models.", imageUrl: "/images/generated/ssn_fac2.svg" },
      { id: "ssn-fac-3", title: "Medical Reference Reading Room", category: "Learning", description: "Quiet study lounge with medical reference books and nursing guides.", imageUrl: "/images/generated/ssn_fac3.svg" },
      { id: "ssn-fac-4", title: "Auditorium Assembly Hall", category: "Academic", description: "Auditorium for health lectures, guest talks, and academic events.", imageUrl: "/images/generated/ssn_fac4.svg" }
    ],
    gallery: [
      { title: "Campus Courtyard Assembly", category: "Campus", imageUrl: "/images/generated/ssn_gal1.svg" },
      { title: "Poster Competition Event", category: "Events", imageUrl: "/images/generated/ssn_gal2.svg" },
      { title: "Reference Reading Room", category: "Campus", imageUrl: "/images/generated/ssn_gal3.svg" },
      { title: "CPR Practical Workshop", category: "Laboratories", imageUrl: "/images/generated/ssn_gal4.svg" }
    ],
    mapUrl: "https://maps.google.com/?q=Medipally+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Sindoora School of Nursing | Orange Group",
    seoDescription: "Sindoora School of Nursing in Chenagacherla, Medipally, sponsored by NS Foundation (Reg No. 520/2019)."
  },
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
    dropdownThumbnail: "/images/colleges/vsn_thumb.png",
    heroImage: "/images/colleges/vsn_hero.png",
    aboutImage: "/images/generated/vsn_about.svg",
    campusLifeImage: "/images/generated/vsn_campus_life.svg",
    admissionsImage: "/images/generated/vsn_admissions.svg",
    logoMonogram: "VSN",
    accentTheme: {
      primary: "#0284C7",
      lightBg: "#F0F9FF",
      badgeBg: "bg-[#0284C7]/10 text-[#0284C7] border-[#0284C7]/20",
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
      { id: "vsn-fac-1", title: "Nalgonda Practical Skills Station", category: "Practical Training", description: "Clinical skills laboratory equipped with nursing beds and equipment.", imageUrl: "/images/facilities/facility-clinical-support.jpg" },
      { id: "vsn-fac-2", title: "Instructional Smart Classroom", category: "Academic", description: "Digital classroom for interactive instruction and case discussions.", imageUrl: "/images/generated/vsn_fac2.svg" },
      { id: "vsn-fac-3", title: "Clinical Ward Support Unit", category: "Practical Training", description: "Faculty coordination for bedside clinical ward discussion rounds.", imageUrl: "/images/generated/vsn_fac3.svg" },
      { id: "vsn-fac-4", title: "Textbook Study Lounge", category: "Learning", description: "Study lounge stocked with nursing handbooks and reference material.", imageUrl: "/images/generated/vsn_fac4.svg" }
    ],
    gallery: [
      { title: "Nalgonda Academic Lecture", category: "Classrooms", imageUrl: "/images/generated/vsn_gal1.svg" },
      { title: "Clinical Ward Discussion", category: "Clinical Training", imageUrl: "/images/generated/vsn_gal2.svg" },
      { title: "Guest Speaker Lecture", category: "Events", imageUrl: "/images/generated/vsn_gal3.svg" },
      { title: "Smart Classroom Study", category: "Classrooms", imageUrl: "/images/generated/vsn_gal4.svg" }
    ],
    mapUrl: "https://maps.google.com/?q=Nalgonda+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Vennela School of Nursing | Orange Group",
    seoDescription: "Vennela School of Nursing in Nalgonda, sponsored by Siddhartha Educational Society."
  },
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
    dropdownThumbnail: "/images/generated/jpc_thumb.svg",
    heroImage: "/images/colleges/jpc_hero.png",
    aboutImage: "/images/generated/jpc_about.svg",
    campusLifeImage: "/images/generated/jpc_campus_life.svg",
    admissionsImage: "/images/generated/jpc_admissions.svg",
    logoMonogram: "JPC",
    accentTheme: {
      primary: "#2563EB",
      lightBg: "#EFF6FF",
      badgeBg: "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20",
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
      { id: "jpc-fac-1", title: "Diagnostic Pathology Lab", category: "Paramedical Practical", description: "Equipped for microbiology, hematology, and clinical pathology practice.", imageUrl: "/images/facilities/facility-med-lab.jpg" },
      { id: "jpc-fac-2", title: "Medical Imaging Unit", category: "Paramedical Practical", description: "Practical station for radiographic imaging procedures and positioning.", imageUrl: "/images/generated/jpc_fac2.svg" },
      { id: "jpc-fac-3", title: "Ophthalmic Equipment Lab", category: "Paramedical Practical", description: "Equipment lab for vision assessment and eye-care support.", imageUrl: "/images/generated/jpc_fac3.svg" },
      { id: "jpc-fac-4", title: "Operation Theatre Simulation", category: "Practical Training", description: "Sterile processing and OT technician practical setup.", imageUrl: "/images/generated/jpc_fac4.svg" }
    ],
    gallery: [
      { title: "Pathology Microscope Diagnostics", category: "Laboratories", imageUrl: "/images/generated/jpc_gal1.svg" },
      { title: "Medical Imaging Instruction", category: "Laboratories", imageUrl: "/images/generated/jpc_gal2.svg" },
      { title: "Clinical Pathology Testing", category: "Laboratories", imageUrl: "/images/generated/jpc_gal3.svg" },
      { title: "Operation Theatre Technician Lab", category: "Clinical Training", imageUrl: "/images/generated/jpc_gal4.svg" }
    ],
    mapUrl: "https://maps.google.com/?q=Nagaram+Keesara+Telangana",
    contactPhone: "+91 9346410605",
    contactEmail: "admissions@orangegroup.edu.in",
    seoTitle: "Jawan Paramedical College | Orange Group",
    seoDescription: "Jawan Paramedical College in Nagaram, Keesara, sponsored by Telagana Xpress Educational Society (Reg No. 214/2025)."
  },
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
    dropdownThumbnail: "/images/generated/spc_thumb.svg",
    heroImage: "/images/generated/spc_hero.svg",
    aboutImage: "/images/generated/spc_about.svg",
    campusLifeImage: "/images/generated/spc_campus_life.svg",
    admissionsImage: "/images/generated/spc_admissions.svg",
    logoMonogram: "SPC",
    accentTheme: {
      primary: "#4F46E5",
      lightBg: "#EEF2FF",
      badgeBg: "bg-[#4F46E5]/10 text-[#4F46E5] border-[#4F46E5]/20",
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
      { id: "spc-fac-1", title: "Ophthalmic Assistance Lab", category: "Paramedical Practical", description: "Equipment for eye examination, slit-lamp testing, and vision assessment.", imageUrl: "/images/facilities/facility-paramedical-lab.jpg" },
      { id: "spc-fac-2", title: "Medical Pathology Diagnostics Lab", category: "Paramedical Practical", description: "Specimen handling and clinical pathology testing stations.", imageUrl: "/images/generated/spc_fac2.svg" },
      { id: "spc-fac-3", title: "Paramedical Equipment Station", category: "Paramedical Practical", description: "Equipment practical stations for specialized technical training.", imageUrl: "/images/generated/spc_fac3.svg" },
      { id: "spc-fac-4", title: "Anatomy Demonstration Space", category: "Academic", description: "Demonstration room with anatomical models and instructional diagrams.", imageUrl: "/images/generated/spc_fac4.svg" }
    ],
    gallery: [
      { title: "Ophthalmic Exam Device Station", category: "Laboratories", imageUrl: "/images/generated/spc_gal1.svg" },
      { title: "Paramedical Equipment Practice", category: "Laboratories", imageUrl: "/images/generated/spc_gal2.svg" },
      { title: "Diagnostic Pathology Testing", category: "Laboratories", imageUrl: "/images/generated/spc_gal3.svg" },
      { title: "Skill Communication Seminar", category: "Events", imageUrl: "/images/generated/spc_gal4.svg" }
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
`;

fs.writeFileSync(collegesFilePath, content, 'utf8');
console.log('Successfully updated src/data/colleges.ts with zero-overlap unique image paths!');
