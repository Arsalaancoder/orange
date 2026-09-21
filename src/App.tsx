import { Routes, Route } from 'react-router-dom';

import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { CollegesPage } from '@/pages/CollegesPage';
import { CollegeDetailPage } from '@/pages/CollegeDetailPage';
import { ProgramsPage } from '@/pages/ProgramsPage';
import { ProgramDetailPage } from '@/pages/ProgramDetailPage';
import { AdmissionsPage } from '@/pages/AdmissionsPage';
import { FacilitiesPage } from '@/pages/FacilitiesPage';
import { ClinicalTrainingPage } from '@/pages/ClinicalTrainingPage';
import { FacultyPage } from '@/pages/FacultyPage';
import { StudentLifePage } from '@/pages/StudentLifePage';
import { CareerPathwaysPage } from '@/pages/CareerPathwaysPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { NewsPage } from '@/pages/NewsPage';
import { NewsDetailPage } from '@/pages/NewsDetailPage';
import { FAQPage } from '@/pages/FAQPage';
import { ContactPage } from '@/pages/ContactPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      
      {/* Colleges */}
      <Route path="/colleges" element={<CollegesPage />} />
      <Route path="/colleges/:slug" element={<CollegeDetailPage />} />

      {/* Programs */}
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/programs/:slug" element={<ProgramDetailPage />} />

      {/* Admissions */}
      <Route path="/admissions" element={<AdmissionsPage />} />

      {/* Campus & Academics */}
      <Route path="/facilities" element={<FacilitiesPage />} />
      <Route path="/clinical-training" element={<ClinicalTrainingPage />} />
      <Route path="/faculty" element={<FacultyPage />} />
      <Route path="/student-life" element={<StudentLifePage />} />
      <Route path="/career-pathways" element={<CareerPathwaysPage />} />
      <Route path="/gallery" element={<GalleryPage />} />

      {/* News */}
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:slug" element={<NewsDetailPage />} />

      {/* Information & Legal */}
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
