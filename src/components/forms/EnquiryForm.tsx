import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { CheckCircle2, AlertCircle, MessageSquare, Mail } from 'lucide-react';
import { programsData } from '@/data/programs';
import { collegesData } from '@/data/colleges';
import { siteConfig } from '@/config/site';

interface EnquiryFormProps {
  className?: string;
  compact?: boolean;
  defaultProgramCode?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  className = '',
  compact = false,
  defaultProgramCode = ''
}) => {
  const [searchParams] = useSearchParams();
  const programQuery = searchParams.get('program');
  const collegeQuery = searchParams.get('college');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    programOfInterest: defaultProgramCode,
    preferredCollege: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Automatically preselect program and college from URL search params
  useEffect(() => {
    if (programQuery) {
      const matchedProg = programsData.find(
        p => p.slug === programQuery || p.id === programQuery || p.code.toLowerCase() === programQuery.toLowerCase()
      );
      if (matchedProg) {
        setFormData(prev => ({ ...prev, programOfInterest: matchedProg.code }));
      }
    } else if (defaultProgramCode) {
      setFormData(prev => ({ ...prev, programOfInterest: defaultProgramCode }));
    }

    if (collegeQuery) {
      const matchedCol = collegesData.find(
        c => c.slug === collegeQuery || c.id === collegeQuery || c.name.toLowerCase() === collegeQuery.toLowerCase()
      );
      if (matchedCol) {
        setFormData(prev => ({ ...prev, preferredCollege: matchedCol.name }));
      }
    }
  }, [programQuery, collegeQuery, defaultProgramCode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getWhatsAppUrl = () => {
    const targetPhone = `91${siteConfig.contact.primaryPhone}`;
    const lines = [
      `*New Student Admission Enquiry - Orange Group* 🎓`,
      ``,
      `*Student Name:* ${formData.fullName}`,
      `*Phone Number:* ${formData.phone}`,
      formData.email ? `*Email:* ${formData.email}` : null,
      `*Program of Interest:* ${formData.programOfInterest || 'Not Specified'}`,
      `*Preferred College/Campus:* ${formData.preferredCollege || 'Not Specified'}`,
      formData.message ? `*Student Notes/Questions:* ${formData.message}` : null,
    ].filter(Boolean);

    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      setError('Please provide your full name and contact phone number.');
      return;
    }

    setError('');
    setSubmitted(true);

    // Automatically trigger WhatsApp in new window
    try {
      const waUrl = getWhatsAppUrl();
      window.open(waUrl, '_blank');
    } catch (_) {
      // Fallback handled by button on submitted screen
    }
  };

  if (submitted) {
    const waUrl = getWhatsAppUrl();

    return (
      <div className={`bg-white rounded-2xl p-8 border border-[#E3E6E5] text-center ${className}`}>
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-[#202426] mb-2">Enquiry Submitted!</h3>
        <p className="text-sm text-[#667085] leading-relaxed mb-6">
          Thank you, <span className="font-semibold text-[#202426]">{formData.fullName}</span>. Your enquiry details have been formatted for instant WhatsApp dispatch and college admissions processing.
        </p>

        <div className="space-y-3 mb-6 max-w-md mx-auto">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all w-full cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Send Details via WhatsApp Now</span>
          </a>

          <div className="p-3 bg-[#FAFAF8] rounded-xl border border-[#E3E6E5] text-left text-xs text-[#667085] space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-[#202426]">
              <Mail className="w-3.5 h-3.5 text-[#F26A21]" />
              <span>College Email Integration Prepared</span>
            </div>
            <p className="text-[11px] text-[#A0A5A8]">
              Details are formatted for instant delivery to the official college admissions inbox upon provision.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              fullName: '',
              phone: '',
              email: '',
              programOfInterest: '',
              preferredCollege: '',
              message: ''
            });
          }}
          className="text-xs font-bold text-[#F26A21] hover:underline uppercase tracking-wider cursor-pointer"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-2xl p-6 md:p-8 border border-[#E3E6E5] shadow-xs space-y-4 ${className}`}>
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-[#202426]">Admission Enquiry</h3>
        <p className="text-xs text-[#667085]">Fill out your details to receive course information and counseling.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs font-medium rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-[#202426] mb-1.5">
            Full Name <span className="text-[#F26A21]">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Anusha Rao"
            required
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAF8] border border-[#E3E6E5] rounded-lg text-[#202426] placeholder-[#A0A5A8] focus:bg-white focus:border-[#F26A21] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-[#202426] mb-1.5">
            Phone Number <span className="text-[#F26A21]">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            required
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAF8] border border-[#E3E6E5] rounded-lg text-[#202426] placeholder-[#A0A5A8] focus:bg-white focus:border-[#F26A21] transition-colors"
          />
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-[#202426] mb-1.5">
            Email Address (Optional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAF8] border border-[#E3E6E5] rounded-lg text-[#202426] placeholder-[#A0A5A8] focus:bg-white focus:border-[#F26A21] transition-colors"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="programOfInterest" className="block text-xs font-semibold text-[#202426] mb-1.5">
            Program of Interest
          </label>
          <select
            id="programOfInterest"
            name="programOfInterest"
            value={formData.programOfInterest}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAF8] border border-[#E3E6E5] rounded-lg text-[#202426] focus:bg-white focus:border-[#F26A21] transition-colors"
          >
            <option value="">Select a Program</option>
            {programsData.map(p => (
              <option key={p.id} value={p.code}>
                {p.code} - {p.fullTitle}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="preferredCollege" className="block text-xs font-semibold text-[#202426] mb-1.5">
            Preferred Institution / Location
          </label>
          <select
            id="preferredCollege"
            name="preferredCollege"
            value={formData.preferredCollege}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAF8] border border-[#E3E6E5] rounded-lg text-[#202426] focus:bg-white focus:border-[#F26A21] transition-colors"
          >
            <option value="">Select College / Campus</option>
            {collegesData.map(c => (
              <option key={c.id} value={c.name}>
                {c.name} ({c.locationGroup})
              </option>
            ))}
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-[#202426] mb-1.5">
            Additional Questions (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder="Specify any questions about eligibility, hostel facilities, or campus location..."
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAF8] border border-[#E3E6E5] rounded-lg text-[#202426] placeholder-[#A0A5A8] focus:bg-white focus:border-[#F26A21] transition-colors resize-none"
          />
        </div>
      )}

      <PrimaryButton type="submit" fullWidth size="md" showArrow className="mt-2">
        Submit Enquiry
      </PrimaryButton>
    </form>
  );
};
