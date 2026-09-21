export interface StudentLifeActivity {
  id: string;
  title: string;
  category: string;
  description: string;
  imageLabel: string;
  imageUrl?: string;
}

export const studentLifeData: StudentLifeActivity[] = [
  {
    id: "seminars",
    title: "Seminars & Academic Conferences",
    category: "Academic",
    description: "Interactive expert-led talks on evolving healthcare trends, patient safety standards, and clinical innovations.",
    imageLabel: "Academic Seminar Event",
    imageUrl: "/images/student-life/student-life-seminar-hall.jpg"
  },
  {
    id: "workshops",
    title: "CPR & Skill Workshops",
    category: "Hands-on Training",
    description: "Practical skill-building sessions covering clinical equipment operation, CPR protocols, and resuscitation procedures.",
    imageLabel: "Student Clinical Workshop",
    imageUrl: "/images/student-life/student-life-cpr-workshop.jpg"
  },
  {
    id: "skill-development",
    title: "Skill Development & Communication",
    category: "Professional Growth",
    description: "Targeted training in communication skills, active listening, patient empathy, emergency response, and healthcare ethics.",
    imageLabel: "Skill Development Session",
    imageUrl: "/images/student-life/student-life-communication.jpg"
  },
  {
    id: "health-awareness",
    title: "Health Awareness Programs",
    category: "Community Health",
    description: "Student-organized initiatives raising public awareness about disease prevention, hand hygiene, and community wellness.",
    imageLabel: "Health Awareness Event",
    imageUrl: "/images/student-life/student-life-community-camp.jpg"
  },
  {
    id: "community-outreach",
    title: "Community Outreach Activities",
    category: "Service",
    description: "Field visits and health camps providing preventive care, health education, and screenings in local communities.",
    imageLabel: "Community Health Camp",
    imageUrl: "/images/student-life/student-life-community-camp-bp.jpg"
  },
  {
    id: "clinical-demonstrations",
    title: "Clinical Skill Demonstrations",
    category: "Practical Learning",
    description: "Faculty-led practical demonstrations of complex nursing, ventilator systems, and diagnostic lab techniques.",
    imageLabel: "Clinical Skill Demonstration",
    imageUrl: "/images/student-life/student-life-clinical-demo.jpg"
  },
  {
    id: "guest-lectures",
    title: "Guest Lectures & Medical Experts",
    category: "Academic",
    description: "Specialized lectures delivered by senior medical practitioners, hospital department heads, and healthcare specialists.",
    imageLabel: "Guest Lecture Session",
    imageUrl: "/images/student-life/student-life-guest-lecture.jpg"
  },
  {
    id: "academic-competitions",
    title: "Academic & Poster Competitions",
    category: "Excellence",
    description: "Inter-college quizzes, scientific poster presentations, and clinical case-study competitions encouraging academic rigor.",
    imageLabel: "Academic Competition Event",
    imageUrl: "/images/student-life/student-life-poster-competition.jpg"
  },
  {
    id: "cultural-activities",
    title: "Cultural Fest & Student Activities",
    category: "Campus Life",
    description: "Annual celebrations, nursing day events, sports activities, and talent showcases fostering holistic student growth.",
    imageLabel: "Campus Cultural Event",
    imageUrl: "/images/student-life/student-life-cultural-fest.jpg"
  }
];
