import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Stethoscope, Compass, Newspaper, HelpCircle, PhoneCall } from 'lucide-react';

interface MoreDropdownProps {
  onClose: () => void;
}

export const MoreDropdown: React.FC<MoreDropdownProps> = ({ onClose }) => {
  const moreLinks = [
    { label: "Faculty", href: "/faculty", description: "Academic leadership & clinical educators", icon: Users },
    { label: "Clinical Training", href: "/clinical-training", description: "Practical hospital rotations & skill labs", icon: Stethoscope },
    { label: "Career Pathways", href: "/career-pathways", description: "Professional opportunities & sector scope", icon: Compass },
    { label: "News & Events", href: "/news", description: "Institutional circulars & announcements", icon: Newspaper },
    { label: "FAQ", href: "/faq", description: "Frequently asked questions & answers", icon: HelpCircle },
    { label: "Contact Us", href: "/contact", description: "Campus office locations & admissions enquiry", icon: PhoneCall }
  ];

  return (
    <div
      id="more-dropdown-menu"
      className="w-80 pt-2 animate-in fade-in-50 slide-in-from-top-2 duration-200 pointer-events-auto"
      role="region"
      aria-label="More Options Menu"
    >
      <div className="bg-white rounded-2xl border border-[#E3E6E5] shadow-2xl p-3 space-y-1">
        {moreLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAFAF8] border border-transparent hover:border-[#E3E6E5] transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F3F4F4] group-hover:bg-[#F26A21]/10 text-[#667085] group-hover:text-[#F26A21] flex items-center justify-center shrink-0 transition-colors mt-0.5">
                <Icon className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div>
                <span className="text-sm font-bold text-[#202426] group-hover:text-[#F26A21] transition-colors block">
                  {item.label}
                </span>
                <span className="text-xs text-[#667085] line-clamp-1 mt-0.5">
                  {item.description}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
