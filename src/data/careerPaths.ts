export interface CareerPathGroup {
  programCode: string;
  programTitle: string;
  opportunities: string[];
}

export const careerPathsData: CareerPathGroup[] = [
  {
    programCode: "B.Sc Nursing",
    programTitle: "Bachelor of Science in Nursing",
    opportunities: [
      "Hospitals",
      "Nursing Homes",
      "Community Health Centres",
      "Clinics",
      "Public Health Organizations",
      "Healthcare Institutions",
      "Educational Institutions",
      "Home Healthcare Services"
    ]
  },
  {
    programCode: "GNM",
    programTitle: "General Nursing & Midwifery",
    opportunities: [
      "Hospitals",
      "Nursing Homes",
      "Clinics",
      "Community Healthcare",
      "Primary Healthcare Facilities",
      "Home Healthcare",
      "Healthcare Support Services"
    ]
  },
  {
    programCode: "DMLT",
    programTitle: "Diploma in Medical Laboratory Technology",
    opportunities: [
      "Diagnostic Laboratories",
      "Hospitals",
      "Pathology Laboratories / Centres",
      "Blood Banks",
      "Research Laboratories",
      "Clinics",
      "Healthcare Diagnostic Centres"
    ]
  },
  {
    programCode: "DOA",
    programTitle: "Diploma in Ophthalmic Assistance",
    opportunities: [
      "Eye Hospitals",
      "Ophthalmic Clinics",
      "Eye-care Centres",
      "Hospitals",
      "Vision Care Facilities",
      "Ophthalmology Departments"
    ]
  },
  {
    programCode: "DMIT",
    programTitle: "Diploma in Medical Imaging Technology",
    opportunities: [
      "Diagnostic Imaging Centres",
      "Hospitals",
      "Radiology Departments",
      "Medical Imaging Centres",
      "Healthcare Institutions",
      "Diagnostic Clinics"
    ]
  }
];
