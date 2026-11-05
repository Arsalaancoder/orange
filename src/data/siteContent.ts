import { programsData, type Program } from '@/data/programs';

export interface SiteContentDocument {
  text: Record<string, string>;
  programs: Program[];
}

export interface SiteContentField {
  key: string;
  label: string;
  group: string;
  multiline?: boolean;
  image?: boolean;
  optional?: boolean;
}

// These defaults correspond to existing copy and images currently rendered by
// the public pages. They are the no-database fallback, not sample CMS records.
export const siteContentDefaults: SiteContentDocument = {
  text: {
    'home.hero.1.eyebrow': 'ORANGE GROUP • NURSING & PARAMEDICAL COLLEGES',
    'home.hero.1.heading': 'Empowering Healthcare Professionals.',
    'home.hero.1.highlight': 'Building a Healthier Future.',
    'home.hero.1.description': 'Professional education in Nursing, Paramedical Sciences and Allied Healthcare through academic learning, practical training and professional development.',
    'home.hero.1.image': '/images/hero/hero-slide-1.jpg',
    'home.hero.1.imageLabel': 'Clinical & Healthcare Training',
    'home.hero.1.imageSublabel': 'Modern Medical Technology Environment',
    'home.hero.2.eyebrow': 'PRACTICAL LEARNING & CLASSROOM TRAINING',
    'home.hero.2.heading': 'Learn Through',
    'home.hero.2.highlight': 'Hands-On Experience.',
    'home.hero.2.description': 'Develop practical healthcare skills through modern classroom instruction, digital learning, training and clinical exposure.',
    'home.hero.2.image': '/images/hero/hero-slide-2.jpg',
    'home.hero.2.imageLabel': 'Medical Classroom & Digital Learning',
    'home.hero.2.imageSublabel': 'Interactive Instruction Facilities',
    'home.hero.3.eyebrow': 'HEALTHCARE EDUCATION & MENTORSHIP',
    'home.hero.3.heading': 'Knowledge. Skills.',
    'home.hero.3.highlight': 'Compassion.',
    'home.hero.3.description': 'Education designed to build academic understanding, practical ability, professional discipline and student mentorship.',
    'home.hero.3.image': '/images/hero/hero-slide-3.jpg',
    'home.hero.3.imageLabel': 'Interactive Student Mentorship',
    'home.hero.3.imageSublabel': 'Textbook & Lab Skill Development',
    'home.about.eyebrow': 'ABOUT ORANGE GROUP',
    'home.about.title': 'Hear what leaders say about Healthcare Training.',
    'home.about.subtitle': 'Orange Group of Medical Colleges is dedicated to developing competent and compassionate healthcare professionals through structured academic education and practical training.',
    'home.about.body': 'As a premier healthcare educational group, our institutions blend classroom theory, state-of-the-art laboratory practice, clinical hospital rotations, and continuous career mentorship to guide every student toward a rewarding medical career.',
    'home.values.eyebrow': 'OUR VALUES',
    'home.values.title': 'Hear what people are saying about Orange Group.',
    'home.values.1.title': 'Academic Progress',
    'home.values.1.body': 'Our structured nursing and paramedical syllabus helps students navigate their academic goals with confidence and diagnostic precision.',
    'home.values.2.title': 'Healthcare Administration',
    'home.values.2.body': 'Your education is our mission. We believe in making your dreams of a medical career a reality with top clinical faculty and labs.',
    'home.values.3.title': 'Secret Success Teamwork',
    'home.values.3.body': 'Collaborative clinical learning, interdisciplinary workshops, and patient care simulations foster strong teamwork skills.',
    'home.mission.eyebrow': 'OUR MISSION',
    'home.mission.title': 'Hear what leaders say about career Management.',
    'home.mission.subtitle': 'As an accredited group of medical colleges, Orange Group understands the nuances necessary to navigate healthcare education and build rewarding hospital careers.',
    'home.mission.body': 'We empower students from diverse backgrounds with affordable, high-quality nursing and paramedical education, combining rigorous academic study with compassionate bedside manner.',
    'home.vision.eyebrow': 'OUR VISION',
    'home.vision.title': 'Hear what people are saying about career Management.',
    'home.vision.subtitle': 'Our vision is to build a benchmark institution for healthcare and medical education across Telangana.',
    'home.vision.body': 'As a leading medical coaching institution, our faculty ensures that students master both diagnostic science and compassionate care through hands-on practical learning.',
    'about.hero.eyebrow': 'ABOUT ORANGE GROUP',
    'about.hero.title': 'Building Skilled, Compassionate Healthcare Professionals.',
    'about.hero.description': 'Orange Group of Medical Colleges is dedicated to developing competent and compassionate healthcare professionals through structured academic education and practical training.',
    'about.hero.image': '/images/cards/nursing-lab.jpg',
    'about.hero.imageLabel': 'Nursing & Healthcare Education',
    'about.hero.caption': 'Classroom • Laboratory • Clinical Exposure',
    'about.values.eyebrow': 'OUR VALUES',
    'about.values.title': 'Hear what people are saying about career Management.',
    'about.values.1.title': 'Business Progress',
    'about.values.1.body': 'Your education is our mission. We believe in making your dreams and goals a reality with our expert clinical faculty.',
    'about.values.2.title': 'Business Administration',
    'about.values.2.body': 'Your education is our mission. We believe in making your dreams and goals a reality and our experts know just how.',
    'about.values.3.title': 'Secret Success Teamwork',
    'about.values.3.body': 'Your education is our mission. We believe in making your dreams and goals a reality and our experts know just how.',
    'about.mission.eyebrow': 'OUR MISSION',
    'about.mission.title': 'Hear what people are saying about career Management.',
    'about.mission.subtitle': 'Orange Group of Medical Colleges is dedicated to developing competent and compassionate healthcare professionals through structured academic education and practical training.',
    'about.mission.body': 'As a Business Coach, Mark not only understands the nuances necessary to navigate the hiring cycle but can help discover right path to a rewarding career or assistance in moving up the ladder.',
    'about.vision.eyebrow': 'OUR VISION',
    'about.vision.title': 'Pioneering Excellence in Nursing & Healthcare Education.',
    'about.vision.subtitle': 'Orange Group of Medical Colleges is committed to establishing benchmark educational institutions across Telangana, combining academic rigor, clinical simulation, and empathetic patient care.',
    'about.vision.image': '/images/cards/anesthesia-ot.jpg',
    'about.cta.title': 'Begin Your Journey in Healthcare Education.',
    'about.cta.body': 'Explore Nursing, Paramedical and Allied Healthcare programs across Orange Group institutions.',
    'programs.hero.title': 'Build Your Future',
    'programs.hero.highlight': 'in Healthcare.',
    'programs.hero.description': 'Explore professional education in Nursing, Paramedical Sciences and Allied Healthcare through academic learning, practical training and skill development.',
    'programs.catalog.eyebrow': 'Curriculum Catalog',
    'programs.catalog.title': 'Primary Healthcare Programs',
    'programs.catalog.description': 'Explore degree and diploma offerings focused on classroom instruction, laboratory practice, and clinical training.',
    'programs.allied.title': 'Other Paramedical & Allied Healthcare Programs',
    'programs.allied.description': 'Specialized allied health technology programs offered or planned by Orange Group institutions.',
    'programs.disclaimer': 'Course availability, duration, eligibility, intake, and recognition are subject to applicable regulatory and affiliating authorities. Please contact the admissions office for current details.',
    'contact.pageDescription': 'Get in touch with the admissions team and campus offices of Orange Group of Nursing & Paramedical Colleges.',
    'contact.eyebrow': 'Admissions & Campus Offices',
    'contact.title': 'We Are Here to Assist You',
    'contact.subtitle': 'Reach out to our admissions team for course guidance, application assistance, or campus visits.',
    'contact.campusesTitle': 'Campus Locations',
    'contact.address': 'H.No. 3-113/21/A, Chengicherla, Hyderabad, Telangana State - 500092',
    'contact.phonePrimary': '9346410606',
    'contact.phoneSecondary': '9494352950',
    'contact.email': 'info@orangecolleges.com',
    'contact.location.1.name': 'Chengicherla / Hyderabad Campus',
    'contact.location.1.address': 'Chengicherla, Hyderabad, Telangana State - 500092',
    'contact.location.2.name': 'Nagaram / Hyderabad Campus',
    'contact.location.2.address': 'Nagaram, Hyderabad, Telangana State - 500083',
    'contact.location.3.name': 'Nalgonda Campus',
    'contact.location.3.address': 'Hyderabad Road, Nalgonda, Telangana',
  },
  programs: programsData,
};

const field = (group: string, key: string, label: string, options: Pick<SiteContentField, 'multiline' | 'image' | 'optional'> = {}): SiteContentField => ({ group, key, label, ...options });

export const siteContentFields: SiteContentField[] = [
  ...[1, 2, 3].flatMap((n) => [
    field('Homepage · Hero slide ' + n, `home.hero.${n}.eyebrow`, 'Eyebrow'),
    field('Homepage · Hero slide ' + n, `home.hero.${n}.heading`, 'Heading'),
    field('Homepage · Hero slide ' + n, `home.hero.${n}.highlight`, 'Highlighted heading'),
    field('Homepage · Hero slide ' + n, `home.hero.${n}.description`, 'Description', { multiline: true }),
    field('Homepage · Hero slide ' + n, `home.hero.${n}.image`, 'Background image URL', { image: true }),
    field('Homepage · Hero slide ' + n, `home.hero.${n}.imageLabel`, 'Image label'),
    field('Homepage · Hero slide ' + n, `home.hero.${n}.imageSublabel`, 'Image sublabel'),
  ]),
  field('Homepage · About section', 'home.about.eyebrow', 'Eyebrow'),
  field('Homepage · About section', 'home.about.title', 'Heading'),
  field('Homepage · About section', 'home.about.subtitle', 'Introduction', { multiline: true }),
  field('Homepage · About section', 'home.about.body', 'Body text', { multiline: true }),
  field('Homepage · Values section', 'home.values.eyebrow', 'Eyebrow'),
  field('Homepage · Values section', 'home.values.title', 'Heading'),
  ...[1, 2, 3].flatMap((n) => [field('Homepage · Values section', `home.values.${n}.title`, `Value ${n} heading`), field('Homepage · Values section', `home.values.${n}.body`, `Value ${n} description`, { multiline: true })]),
  field('Homepage · Mission section', 'home.mission.eyebrow', 'Eyebrow'),
  field('Homepage · Mission section', 'home.mission.title', 'Heading'),
  field('Homepage · Mission section', 'home.mission.subtitle', 'Subtitle', { multiline: true }),
  field('Homepage · Mission section', 'home.mission.body', 'Body text', { multiline: true }),
  field('Homepage · Vision section', 'home.vision.eyebrow', 'Eyebrow'),
  field('Homepage · Vision section', 'home.vision.title', 'Heading'),
  field('Homepage · Vision section', 'home.vision.subtitle', 'Subtitle', { multiline: true }),
  field('Homepage · Vision section', 'home.vision.body', 'Body text', { multiline: true }),
  field('About Us · Hero', 'about.hero.eyebrow', 'Eyebrow'),
  field('About Us · Hero', 'about.hero.title', 'Heading'),
  field('About Us · Hero', 'about.hero.description', 'Description', { multiline: true }),
  field('About Us · Hero', 'about.hero.image', 'Image URL', { image: true }),
  field('About Us · Hero', 'about.hero.imageLabel', 'Image label'),
  field('About Us · Hero', 'about.hero.caption', 'Image caption'),
  field('About Us · Values', 'about.values.eyebrow', 'Eyebrow'),
  field('About Us · Values', 'about.values.title', 'Heading'),
  ...[1, 2, 3].flatMap((n) => [field('About Us · Values', `about.values.${n}.title`, `Value ${n} heading`), field('About Us · Values', `about.values.${n}.body`, `Value ${n} description`, { multiline: true })]),
  field('About Us · Mission', 'about.mission.eyebrow', 'Eyebrow'),
  field('About Us · Mission', 'about.mission.title', 'Heading'),
  field('About Us · Mission', 'about.mission.subtitle', 'Subtitle', { multiline: true }),
  field('About Us · Mission', 'about.mission.body', 'Body text', { multiline: true }),
  field('About Us · Vision', 'about.vision.eyebrow', 'Eyebrow'),
  field('About Us · Vision', 'about.vision.title', 'Heading'),
  field('About Us · Vision', 'about.vision.subtitle', 'Description', { multiline: true }),
  field('About Us · Vision', 'about.vision.image', 'Image URL', { image: true }),
  field('About Us · Admissions callout', 'about.cta.title', 'Heading'),
  field('About Us · Admissions callout', 'about.cta.body', 'Description', { multiline: true }),
  field('Programs page', 'programs.hero.title', 'Page heading'),
  field('Programs page', 'programs.hero.highlight', 'Highlighted heading'),
  field('Programs page', 'programs.hero.description', 'Page introduction', { multiline: true }),
  field('Programs page', 'programs.catalog.eyebrow', 'Catalog eyebrow'),
  field('Programs page', 'programs.catalog.title', 'Catalog heading'),
  field('Programs page', 'programs.catalog.description', 'Catalog description', { multiline: true }),
  field('Programs page', 'programs.allied.title', 'Allied programs heading'),
  field('Programs page', 'programs.allied.description', 'Allied programs description', { multiline: true }),
  field('Programs page', 'programs.disclaimer', 'Regulatory disclaimer', { multiline: true }),
  field('Contact page', 'contact.pageDescription', 'Page description', { multiline: true }),
  field('Contact page', 'contact.eyebrow', 'Eyebrow'),
  field('Contact page', 'contact.title', 'Heading'),
  field('Contact page', 'contact.subtitle', 'Introduction', { multiline: true }),
  field('Contact page', 'contact.campusesTitle', 'Campus list heading'),
  field('Contact details', 'contact.address', 'Main address', { multiline: true }),
  field('Contact details', 'contact.phonePrimary', 'Primary phone'),
  field('Contact details', 'contact.phoneSecondary', 'Secondary phone', { optional: true }),
  field('Contact details', 'contact.email', 'Email', { optional: true }),
  ...[1, 2, 3].flatMap((n) => [field('Contact page · Campus ' + n, `contact.location.${n}.name`, 'Campus name'), field('Contact page · Campus ' + n, `contact.location.${n}.address`, 'Campus address', { multiline: true })]),
];

export function mergeSiteContent(value: unknown): SiteContentDocument {
  if (!value || typeof value !== 'object') return siteContentDefaults;
  const source = value as Partial<SiteContentDocument>;
  const text = { ...siteContentDefaults.text };
  if (source.text && typeof source.text === 'object') {
    for (const [key, item] of Object.entries(source.text)) {
      if (key in text && typeof item === 'string') text[key] = item;
    }
  }
  const programs = Array.isArray(source.programs) && source.programs.length > 0
    ? source.programs as Program[]
    : siteContentDefaults.programs;
  return { text, programs };
}
