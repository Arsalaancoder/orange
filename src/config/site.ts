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
  motto: "",
  address: {
    line1: "H.No. 3-113/21/A",
    village: "Chengicherla",
    mandal: "Chengicherla / Hyderabad",
    district: "Medchal Dist",
    state: "Telangana State",
    pincode: "500092",
    fullText: "H.No. 3-113/21/A, Chengicherla, Hyderabad, Telangana State - 500092"
  },
  contact: {
    primaryPhone: "9346410606",
    secondaryPhone: "9494352950",
    phoneNote: "Official Admissions Helpline: 93464 10606 | 94943 52950",
    whatsappNumber: "9346410606",
    email: "info@orangecolleges.com"
  },
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: null,
    youtube: null,
    linkedin: null
  }
};
