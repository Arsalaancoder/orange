export interface FAQItem {
  id: string;
  category: 'General' | 'Nursing' | 'Paramedical' | 'Admissions' | 'Facilities';
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What institutions comprise the Orange Group of Nursing & Paramedical Colleges?",
    answer: "The group encompasses eight institutions located across Telangana (Chenigacherla/Medipally, Nagaram/Keesara, and Nalgonda), offering B.Sc Nursing, GNM, and specialized Paramedical diploma programs under respective registered educational societies."
  },
  {
    id: "faq-2",
    category: "Nursing",
    question: "What nursing programs are offered?",
    answer: "We offer B.Sc Nursing (4-Year Degree) at Orange College of Nursing and Apple College of Nursing, and GNM (General Nursing & Midwifery - 3-Year Diploma) across Orange, Apple, Sindoora, and Vennela Schools of Nursing."
  },
  {
    id: "faq-3",
    category: "Nursing",
    question: "What is the eligibility criteria for B.Sc Nursing and GNM?",
    answer: "B.Sc Nursing requires Intermediate with BiPC background. GNM accepts Intermediate from any group."
  },
  {
    id: "faq-4",
    category: "Paramedical",
    question: "What paramedical programs are available?",
    answer: "Paramedical offerings include DMLT (Medical Laboratory Technology), DOA (Ophthalmic Assistance), DMIT (Medical Imaging Technology), DANS (Anesthesia Technology), DMST (Medical Sterilization & OT), D-Dialysis, D-Cardio, and DREST (Respiratory Therapy) through Jawan Paramedical College and Siddhartha Paramedical Colleges."
  },
  {
    id: "faq-5",
    category: "Admissions",
    question: "How can prospective students apply for admission?",
    answer: "Students can submit an online enquiry through our website or visit any of our campus admission offices at Medipally, Keesara, or Nalgonda for application guidance and counseling."
  },
  {
    id: "faq-6",
    category: "Facilities",
    question: "What practical training infrastructure is available on campus?",
    answer: "Campuses are equipped with specialized Nursing Skills Laboratories, Medical Diagnostic Labs, Demonstration Rooms, Computer Labs, and Smart Classrooms designed for hands-on skill development."
  }
];

export const scrollingAdmissionFaqData = {
  mainTitle: "Common Admission & Course Queries",
  mainSubtitle: "Find answers to common questions about our nursing and paramedical degree and diploma programs.",
  rows: [
    {
      id: "admission-row-1",
      speed: "55s",
      direction: "left" as const,
      faqItems: [
        {
          id: "adm-1",
          question: "What is the eligibility for B.Sc Nursing?",
          answer: "Intermediate 10+2 with Physics, Chemistry, and Biology (BiPC) background from a recognized board."
        },
        {
          id: "adm-2",
          question: "Can Arts or Commerce students apply for GNM?",
          answer: "Yes! GNM (General Nursing & Midwifery) accepts Intermediate graduates from any stream or group."
        },
        {
          id: "adm-3",
          question: "Are the programs government recognized?",
          answer: "All programs are affiliated with Telangana State authorities, Nursing Council, and Paramedical Board."
        },
        {
          id: "adm-4",
          question: "How do I apply for the 2026-2027 batch?",
          answer: "Submit an online enquiry or visit our admissions offices in Medipally, Keesara/Nagaram, or Nalgonda."
        },
        {
          id: "adm-5",
          question: "Is there seat reservation or management quota?",
          answer: "Admissions follow state regulatory guidelines and merit counseling with institution guidance."
        }
      ]
    },
    {
      id: "admission-row-2",
      speed: "45s",
      direction: "right" as const,
      faqItems: [
        {
          id: "crs-1",
          question: "What is the duration of DMLT & DMIT diplomas?",
          answer: "Both DMLT and DMIT are 2-year diploma courses focusing on diagnostic laboratory and imaging technology."
        },
        {
          id: "crs-2",
          question: "Does Orange Group provide hospital rotations?",
          answer: "Yes, students undergo mandatory clinical training at multispecialty hospitals and diagnostic centers."
        },
        {
          id: "crs-3",
          question: "What career roles can a DMLT graduate pursue?",
          answer: "DMLT graduates work in pathology labs, blood banks, diagnostic centers, and hospital laboratories."
        },
        {
          id: "crs-4",
          question: "Are hostel facilities available for female students?",
          answer: "Yes, safe, supervised in-campus hostels with mess facilities are provided at selected campus locations."
        },
        {
          id: "crs-5",
          question: "What specialized paramedical courses are offered?",
          answer: "We offer DOA (Ophthalmic), DANS (Anesthesia), DMST (OT Tech), D-Dialysis, and D-Cardio diplomas."
        }
      ]
    },
    {
      id: "admission-row-3",
      speed: "65s",
      direction: "left" as const,
      faqItems: [
        {
          id: "cmp-1",
          question: "Where are the 8 college campuses located?",
          answer: "Institutions are strategically located at Medipally (Chengicherla), Nagaram/Keesara, and Nalgonda."
        },
        {
          id: "cmp-2",
          question: "Is clinical practice included in B.Sc Nursing?",
          answer: "Yes, 4-year B.Sc Nursing includes extensive clinical postings, hospital rounds, and internship."
        },
        {
          id: "cmp-3",
          question: "Do you offer placement assistance upon graduation?",
          answer: "We provide career guidance, campus interviews, and placement support across top private & govt hospitals."
        },
        {
          id: "cmp-4",
          question: "What documents are required during admission?",
          answer: "10th & Inter Marks Memos, Transfer Certificate (TC), Conduct Certificate, Aadhaar Card, and Passport Photos."
        },
        {
          id: "cmp-5",
          question: "Can I schedule a campus visit before applying?",
          answer: "Absolutely! Contact our admissions desk to book a guided campus and laboratory tour."
        }
      ]
    }
  ]
};

