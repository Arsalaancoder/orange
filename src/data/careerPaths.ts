export interface WorkplaceOpportunity {
  label: string;
  iconName: string;
  iconBg: string;
  iconColor: string;
}

export interface CareerPathGroup {
  id: string;
  programCode: string;
  programTitle: string;
  tagline: string;
  calloutText: string;
  imageUrl: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
  headerIconBg: string;
  headerIconColor: string;
  layoutVariant: 'vertical-grid' | 'horizontal-pills';
  opportunities: WorkplaceOpportunity[];
}

export const careerPathsData: CareerPathGroup[] = [
  {
    id: "bsc-nursing",
    programCode: "B.Sc Nursing",
    programTitle: "Bachelor of Science in Nursing",
    tagline: "A rewarding pathway in nursing, healthcare and community care.",
    calloutText: "Care • Learn • Lead • Make a Difference",
    imageUrl: "/images/cards/bsc-nursing.jpg",
    bgColor: "bg-[#FFF7F2]",
    borderColor: "border-[#FDE3D7]",
    accentColor: "#F26A21",
    headerIconBg: "bg-[#FFEADF]",
    headerIconColor: "text-[#F26A21]",
    layoutVariant: "vertical-grid",
    opportunities: [
      { label: "Hospitals", iconName: "Building2", iconBg: "bg-[#FFE8EC]", iconColor: "text-[#E53E3E]" },
      { label: "Nursing Homes", iconName: "Home", iconBg: "bg-[#FFF2EB]", iconColor: "text-[#DD6B20]" },
      { label: "Community Health Centres", iconName: "Users", iconBg: "bg-[#E6FFFA]", iconColor: "text-[#319795]" },
      { label: "Clinics", iconName: "Stethoscope", iconBg: "bg-[#EBF8FF]", iconColor: "text-[#3182CE]" },
      { label: "Public Health Organizations", iconName: "Globe", iconBg: "bg-[#EBF8FF]", iconColor: "text-[#2B6CB0]" },
      { label: "Healthcare Institutions", iconName: "HeartPulse", iconBg: "bg-[#FFE8EC]", iconColor: "text-[#E53E3E]" },
      { label: "Educational Institutions", iconName: "GraduationCap", iconBg: "bg-[#EBF8FF]", iconColor: "text-[#3182CE]" },
      { label: "Home Healthcare Services", iconName: "Home", iconBg: "bg-[#FFF2EB]", iconColor: "text-[#DD6B20]" }
    ]
  },
  {
    id: "gnm",
    programCode: "GNM",
    programTitle: "General Nursing & Midwifery",
    tagline: "Practical nursing education focused on care, community health and patient support.",
    calloutText: "Care • Support • Empower • Every Life",
    imageUrl: "/images/cards/gnm-nursing.jpg",
    bgColor: "bg-[#F0FDF4]",
    borderColor: "border-[#DCFCE7]",
    accentColor: "#16A34A",
    headerIconBg: "bg-[#DCFCE7]",
    headerIconColor: "text-[#16A34A]",
    layoutVariant: "vertical-grid",
    opportunities: [
      { label: "Hospitals", iconName: "Building2", iconBg: "bg-[#FFE8EC]", iconColor: "text-[#E53E3E]" },
      { label: "Nursing Homes", iconName: "Home", iconBg: "bg-[#FFF2EB]", iconColor: "text-[#DD6B20]" },
      { label: "Clinics", iconName: "Stethoscope", iconBg: "bg-[#EBF8FF]", iconColor: "text-[#3182CE]" },
      { label: "Community Healthcare", iconName: "Users", iconBg: "bg-[#E6FFFA]", iconColor: "text-[#319795]" },
      { label: "Primary Healthcare Facilities", iconName: "ShieldCheck", iconBg: "bg-[#EDF6EE]", iconColor: "text-[#2E7D32]" },
      { label: "Home Healthcare", iconName: "Heart", iconBg: "bg-[#FFE8EC]", iconColor: "text-[#E53E3E]" },
      { label: "Healthcare Support Services", iconName: "HeartPulse", iconBg: "bg-[#EDF6EE]", iconColor: "text-[#2E7D32]" }
    ]
  },
  {
    id: "dmlt",
    programCode: "DMLT",
    programTitle: "Diploma in Medical Laboratory Technology",
    tagline: "Technical training for modern diagnostic and laboratory environments.",
    calloutText: "Analyze • Discover • Support • Care",
    imageUrl: "/images/cards/dmlt-lab.jpg",
    bgColor: "bg-[#F0F7FF]",
    borderColor: "border-[#D0E5FF]",
    accentColor: "#0284C7",
    headerIconBg: "bg-[#E0F2FE]",
    headerIconColor: "text-[#0284C7]",
    layoutVariant: "vertical-grid",
    opportunities: [
      { label: "Diagnostic Laboratories", iconName: "FlaskConical", iconBg: "bg-[#E0F2FE]", iconColor: "text-[#0284C7]" },
      { label: "Hospitals", iconName: "Building2", iconBg: "bg-[#FFE8EC]", iconColor: "text-[#E53E3E]" },
      { label: "Pathology Laboratories / Centres", iconName: "TestTube", iconBg: "bg-[#F3E8FF]", iconColor: "text-[#9333EA]" },
      { label: "Blood Banks", iconName: "Droplet", iconBg: "bg-[#FFE8EC]", iconColor: "text-[#E53E3E]" },
      { label: "Research Laboratories", iconName: "Microscope", iconBg: "bg-[#E0F2FE]", iconColor: "text-[#0284C7]" },
      { label: "Clinics", iconName: "Stethoscope", iconBg: "bg-[#EBF8FF]", iconColor: "text-[#3182CE]" },
      { label: "Healthcare Diagnostic Centres", iconName: "Monitor", iconBg: "bg-[#E0F2FE]", iconColor: "text-[#0284C7]" }
    ]
  },
  {
    id: "doa",
    programCode: "DOA",
    programTitle: "Diploma in Ophthalmic Assistance",
    tagline: "Supporting eye-care services and ophthalmic clinical practice.",
    calloutText: "Clear Vision • Brighter Futures",
    imageUrl: "/images/cards/doa-ophthalmic.jpg",
    bgColor: "bg-[#FAF5FF]",
    borderColor: "border-[#E9D5FF]",
    accentColor: "#9333EA",
    headerIconBg: "bg-[#F3E8FF]",
    headerIconColor: "text-[#9333EA]",
    layoutVariant: "horizontal-pills",
    opportunities: [
      { label: "Eye Hospitals", iconName: "Building2", iconBg: "bg-[#F3E8FF]", iconColor: "text-[#9333EA]" },
      { label: "Ophthalmic Clinics", iconName: "Eye", iconBg: "bg-[#F3E8FF]", iconColor: "text-[#9333EA]" },
      { label: "Eye-care Centres", iconName: "Glasses", iconBg: "bg-[#F3E8FF]", iconColor: "text-[#9333EA]" },
      { label: "Hospitals", iconName: "Building2", iconBg: "bg-[#E0F2FE]", iconColor: "text-[#0284C7]" },
      { label: "Vision Care Facilities", iconName: "ShieldCheck", iconBg: "bg-[#F3E8FF]", iconColor: "text-[#9333EA]" },
      { label: "Ophthalmology Departments", iconName: "Users", iconBg: "bg-[#F3E8FF]", iconColor: "text-[#9333EA]" }
    ]
  },
  {
    id: "dmit",
    programCode: "DMIT",
    programTitle: "Diploma in Medical Imaging Technology",
    tagline: "Technical learning for diagnostic imaging and radiology environments.",
    calloutText: "See More • Care Better",
    imageUrl: "/images/cards/dmit-imaging.jpg",
    bgColor: "bg-[#FFFBEB]",
    borderColor: "border-[#FEF3C7]",
    accentColor: "#D97706",
    headerIconBg: "bg-[#FEF3C7]",
    headerIconColor: "text-[#D97706]",
    layoutVariant: "horizontal-pills",
    opportunities: [
      { label: "Diagnostic Imaging Centres", iconName: "Scan", iconBg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" },
      { label: "Hospitals", iconName: "Building2", iconBg: "bg-[#FFE8EC]", iconColor: "text-[#E53E3E]" },
      { label: "Radiology Departments", iconName: "FileText", iconBg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" },
      { label: "Medical Imaging Centres", iconName: "Monitor", iconBg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" },
      { label: "Healthcare Institutions", iconName: "Building2", iconBg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" },
      { label: "Diagnostic Clinics", iconName: "Activity", iconBg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" }
    ]
  }
];
