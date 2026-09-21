export interface Facility {
  id: string;
  title: string;
  category: string;
  description: string;
  imageLabel: string;
  imageUrl?: string;
}

export const facilitiesData: Facility[] = [
  {
    id: "smart-classrooms",
    title: "Smart Classrooms",
    category: "Academic",
    description: "Classrooms equipped with interactive digital flat-panel displays, audio-visual learning aids, anatomical models, and ergonomic seating for structured academic instruction.",
    imageLabel: "Interactive Smart Classroom & Digital Board",
    imageUrl: "/images/facilities/facility-smart-classroom.jpg"
  },
  {
    id: "nursing-skills-labs",
    title: "Nursing Skills Laboratories",
    category: "Practical Training",
    description: "Practical training laboratories equipped with patient manikins, nursing bed setups, stethoscopes, and care apparatus for practicing essential patient-care skills.",
    imageLabel: "Nursing Foundations & Manikin Clinical Skills Lab",
    imageUrl: "/images/facilities/facility-nursing-skills.jpg"
  },
  {
    id: "med-lab-training",
    title: "Medical Laboratory Training Facilities",
    category: "Paramedical Practical",
    description: "Dedicated training laboratories for biochemistry, microbiology, hematology, specimen testing, and clinical pathology laboratory procedures practice.",
    imageLabel: "Medical Diagnostic & Pathology Laboratory",
    imageUrl: "/images/facilities/facility-med-lab.jpg"
  },
  {
    id: "paramedical-practical-labs",
    title: "Paramedical Practical Laboratories",
    category: "Paramedical Practical",
    description: "Practical stations for ophthalmic assistance, slit-lamp eye examinations, diagnostic equipment handling, and specialized paramedical technical training.",
    imageLabel: "Ophthalmic & Paramedical Equipment Testing Lab",
    imageUrl: "/images/facilities/facility-paramedical-lab.jpg"
  },
  {
    id: "demonstration-rooms",
    title: "Demonstration Rooms",
    category: "Academic",
    description: "Focused small-group learning spaces equipped with 3D anatomical models and organ specimens for step-by-step faculty demonstrations and practical skill assessment.",
    imageLabel: "Anatomy Demonstration Room with 3D Models",
    imageUrl: "/images/facilities/facility-demo-room.jpg"
  },
  {
    id: "library-digital-resources",
    title: "Library & Digital Learning Resources",
    category: "Learning",
    description: "Extensive collection of medical reference textbooks, pathology handbooks, nursing journals, digital study terminals, and quiet study spaces.",
    imageLabel: "Medical Library & Reference Reading Room",
    imageUrl: "/images/facilities/facility-library.jpg"
  },
  {
    id: "computer-facilities",
    title: "Computer Facilities",
    category: "Learning",
    description: "Modern computer lab facilities supporting digital health research, medical informatics learning, diagnostic imaging analysis, and coursework.",
    imageLabel: "Health Informatics Computer Laboratory",
    imageUrl: "/images/facilities/facility-computer-lab.jpg"
  },
  {
    id: "clinical-training-support",
    title: "Clinical Training Support",
    category: "Practical Training",
    description: "Dedicated faculty coordination and bedside clinical discussion rounds in hospital ward settings for practical healthcare exposure.",
    imageLabel: "Clinical Ward Rounds & Instructor Discussion",
    imageUrl: "/images/facilities/facility-clinical-support.jpg"
  },
  {
    id: "student-counselling",
    title: "Student Counselling",
    category: "Student Support",
    description: "Private academic and personal guidance room where experienced mentors assist students with learning progress, mental well-being, and career planning.",
    imageLabel: "One-on-One Academic & Career Mentorship Room",
    imageUrl: "/images/facilities/facility-student-counselling.jpg"
  },
  {
    id: "seminar-training-programs",
    title: "Seminar & Training Programs",
    category: "Academic",
    description: "Spacious auditorium seminar hall equipped with stage podium, audio-visual projection, and seating for academic lectures, health awareness events, and workshops.",
    imageLabel: "Auditorium Seminar Hall & Health Presentations",
    imageUrl: "/images/facilities/facility-seminar-hall.jpg"
  }
];
