export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  motto: string;
  address: {
    line1: string;
    village: string;
    mandal: string;
    district: string;
    state: string;
    pincode: string;
    fullText: string;
  };
  contact: {
    primaryPhone: string;
    secondaryPhone: string;
    phoneNote: string;
    whatsappNumber: string | null;
    email: string | null;
  };
  socialLinks: {
    facebook: string | null;
    instagram: string | null;
    youtube: string | null;
    linkedin: string | null;
  };
}

export const siteConfig: SiteConfig = {
  name: "Orange Group of Nursing & Paramedical Colleges",
  shortName: "Orange Group",
  tagline: "Empowering Healthcare Professionals. Building a Healthier Future.",
  motto: "Learn. Practice. Serve.",
  address: {
    line1: "H.No. 3-113/21/A",
    village: "Chenigacherla (V)",
    mandal: "Medipally (M)",
    district: "Medchal Dist",
    state: "Telangana State",
    pincode: "500092",
    fullText: "H.No. 3-113/21/A, Chenigacherla (V), Medipally (M), Medchal Dist, Telangana State - 500092"
  },
  contact: {
    primaryPhone: "9346410605",
    secondaryPhone: "9346684227",
    phoneNote: "Primary admissions helpline selection pending final client confirmation",
    whatsappNumber: null, // To be confirmed by client before launch
    email: null // To be confirmed by client before launch
  },
  socialLinks: {
    facebook: null,
    instagram: null,
    youtube: null,
    linkedin: null
  }
};
