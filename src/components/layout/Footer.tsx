import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/shared/Container';
import { Logo } from './Logo';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const programLinks = [
    { label: "B.Sc Nursing", href: "/programs/b-sc-nursing" },
    { label: "GNM Nursing", href: "/programs/gnm" },
    { label: "DMLT Paramedical", href: "/programs/dmlt" },
    { label: "DOA Ophthalmic", href: "/programs/doa" },
    { label: "DMIT Imaging", href: "/programs/dmit" },
    { label: "View All Programs", href: "/programs" }
  ];

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Admissions 2026–27", href: "/admissions" },
    { label: "Campus Facilities", href: "/facilities" },
    { label: "Faculty Directory", href: "/faculty" },
    { label: "Student Life", href: "/student-life" },
    { label: "Campus Gallery", href: "/gallery" }
  ];

  const supportLinks = [
    { label: "Our Colleges", href: "/colleges" },
    { label: "Career Pathways", href: "/career-pathways" },
    { label: "News & Events", href: "/news" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" }
  ];

  const validSocialLinks = Object.entries(siteConfig.socialLinks).filter(
    ([_, url]) => url !== null && url !== ""
  );

  return (
    <footer className="bg-[#101820] text-white pt-20 pb-12 border-t border-white/10">
      <Container size="default">
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Brand Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo mode="transparent" />

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              "{siteConfig.tagline}"
            </p>

            <div className="inline-block px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-[#F26A21] uppercase tracking-widest">
              Motto: {siteConfig.motto}
            </div>
          </div>

          {/* Programs Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-[#F26A21] uppercase tracking-widest">
              Programs
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-[#F26A21] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-[#F26A21] uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-[#F26A21] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Locations Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-xs font-bold text-[#F26A21] uppercase tracking-widest">
              Institutional Contact
            </h4>

            <div className="space-y-3.5 text-sm text-gray-300">
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                <MapPin className="w-4 h-4 text-[#F26A21] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-white block text-xs">
                    Campus Address
                  </span>
                  <span className="text-xs text-gray-300 leading-relaxed block">
                    {siteConfig.address.fullText}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                <Phone className="w-4 h-4 text-[#F26A21] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-white block text-xs">
                    Admissions Helpline
                  </span>
                  <div className="text-xs text-gray-300 space-x-3">
                    <a href={`tel:${siteConfig.contact.primaryPhone}`} className="hover:text-[#F26A21] transition-colors">
                      {siteConfig.contact.primaryPhone}
                    </a>
                    <span>|</span>
                    <a href={`tel:${siteConfig.contact.secondaryPhone}`} className="hover:text-[#F26A21] transition-colors">
                      {siteConfig.contact.secondaryPhone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Render email ONLY if non-null in siteConfig */}
              {siteConfig.contact.email && (
                <div className="text-xs text-gray-300 pt-1">
                  Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-white hover:text-[#F26A21]">{siteConfig.contact.email}</a>
                </div>
              )}
            </div>

            {/* Social Links (Rendered ONLY if non-null in siteConfig) */}
            {validSocialLinks.length > 0 && (
              <div className="pt-2 flex items-center space-x-4">
                {validSocialLinks.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-[#F26A21] transition-colors"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Support Links Sub-Bar */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-300">
          <div className="flex flex-wrap items-center gap-6">
            {supportLinks.map((link) => (
              <Link key={link.href} to={link.href} className="hover:text-[#F26A21] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            to="/colleges"
            className="text-xs font-bold text-[#F26A21] hover:underline uppercase tracking-wider flex items-center gap-1"
          >
            <span>Explore All 8 Colleges</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Footer Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {currentYear} Orange Group of Nursing & Paramedical Colleges. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-[#F26A21] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-[#F26A21] transition-colors">
              Admissions Enquiry
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
