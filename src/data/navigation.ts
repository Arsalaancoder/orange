export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string; description?: string }[];
}

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Colleges",
    href: "/colleges",
    hasDropdown: true,
    dropdownItems: [
      { label: "All Colleges", href: "/colleges", description: "Browse all 8 nursing & paramedical institutions" },
      { label: "Orange College of Nursing", href: "/colleges/orange-college-of-nursing", description: "Nursing College - Chengicherla / Hyderabad" },
      { label: "Orange School of Nursing", href: "/colleges/orange-school-of-nursing", description: "Nursing School - Chengicherla / Hyderabad" },
      { label: "Apple College of Nursing", href: "/colleges/apple-college-of-nursing", description: "Nursing College - Nagaram / Hyderabad" },
      { label: "Apple School of Nursing", href: "/colleges/apple-school-of-nursing", description: "Nursing School - Nagaram / Hyderabad" },
      { label: "Sindoora School of Nursing", href: "/colleges/sindoora-school-of-nursing", description: "Nursing School - Chengicherla / Hyderabad" },
      { label: "Vennela School of Nursing", href: "/colleges/vennela-school-of-nursing", description: "Nursing School - Nalgonda" },
      { label: "Jawan Paramedical College", href: "/colleges/jawan-paramedical-college", description: "Paramedical College - Nagaram / Hyderabad" },
      { label: "Siddhartha Paramedical Colleges", href: "/colleges/siddhartha-paramedical-colleges", description: "Paramedical College - Nalgonda" },
    ]
  },
  {
    label: "Programs",
    href: "/programs",
    hasDropdown: true,
    dropdownItems: [
      { label: "All Programs", href: "/programs", description: "Explore degree & diploma offerings" },
      { label: "B.Sc Nursing", href: "/programs/bsc-nursing", description: "4-Year Bachelor Degree" },
      { label: "GNM", href: "/programs/gnm", description: "General Nursing & Midwifery" },
      { label: "DMLT", href: "/programs/dmlt", description: "Medical Laboratory Technology" },
      { label: "DOA", href: "/programs/doa", description: "Ophthalmic Assistance" },
      { label: "DMIT", href: "/programs/dmit", description: "Medical Imaging Technology" },
    ]
  },
  { label: "Admissions", href: "/admissions" },
  { label: "Facilities", href: "/facilities" },
  { label: "Student Life", href: "/student-life" },
  { label: "Gallery", href: "/gallery" },
  {
    label: "More",
    href: "#",
    hasDropdown: true,
    dropdownItems: [
      { label: "Faculty", href: "/faculty", description: "Academic leadership and clinical educators" },
      { label: "Clinical Training", href: "/clinical-training", description: "Practical hospital exposure & skill labs" },
      { label: "Career Pathways", href: "/career-pathways", description: "Professional opportunities & scope" },
      { label: "News & Events", href: "/news", description: "Institutional announcements & seminars" },
      { label: "FAQ", href: "/faq", description: "Frequently asked questions" },
      { label: "Contact Us", href: "/contact", description: "Get in touch with admissions" },
    ]
  }
];

export const footerNavigation = {
  institution: {
    name: "Orange Group of Nursing & Paramedical Colleges",
    tagline: "Empowering Healthcare Professionals. Building a Healthier Future.",
    motto: "Learn. Practice. Serve."
  },
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Our Colleges", href: "/colleges" },
    { label: "Academic Programs", href: "/programs" },
    { label: "Admissions 2026-27", href: "/admissions" },
    { label: "Campus Facilities", href: "/facilities" },
    { label: "Clinical Training", href: "/clinical-training" }
  ],
  academics: [
    { label: "B.Sc Nursing", href: "/programs/bsc-nursing" },
    { label: "GNM Nursing", href: "/programs/gnm" },
    { label: "DMLT Paramedical", href: "/programs/dmlt" },
    { label: "DOA Ophthalmic", href: "/programs/doa" },
    { label: "DMIT Imaging", href: "/programs/dmit" },
    { label: "All Programs", href: "/programs" }
  ],
  supportLinks: [
    { label: "Career Pathways", href: "/career-pathways" },
    { label: "Student Life", href: "/student-life" },
    { label: "Campus Gallery", href: "/gallery" },
    { label: "News & Announcements", href: "/news" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" }
  ],
  locations: [
    { name: "Chengicherla / Hyderabad Campus", address: "Chengicherla, Hyderabad, Telangana State - 500092" },
    { name: "Nagaram / Hyderabad Campus", address: "Nagaram, Hyderabad, Telangana State - 500083" },
    { name: "Nalgonda Campus", address: "Hyderabad Road, Nalgonda, Telangana" }
  ]
};
