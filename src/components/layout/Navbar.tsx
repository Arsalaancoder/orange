import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mainNavigation } from '@/data/navigation';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { CollegesMegaMenu } from './CollegesMegaMenu';
import { ProgramsMegaMenu } from './ProgramsMegaMenu';
import { MoreDropdown } from './MoreDropdown';
import { MobileMenu } from './MobileMenu';
import { Menu, ChevronDown, MapPin, PhoneCall, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

interface NavbarProps {
  initialMode?: 'solid' | 'transparent';
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dynamic date formatting matching classic educational institution headers
  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Close active dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Outside click handler to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className="w-full text-[#202426] z-40 relative shadow-sm">
      {/* 1. TOP UTILITY ANNOUNCEMENT STRIP */}
      <div className="bg-[#380202] text-amber-100/90 text-[11px] md:text-xs py-1.5 px-4 border-b border-amber-500/20">
        <div className="max-w-[1340px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2">
          <div className="flex items-center gap-2 sm:gap-3 text-amber-200/90">
            <span className="font-semibold tracking-wide text-white text-[11px] md:text-xs">
              {currentDateStr}
            </span>
            <span className="hidden sm:inline text-amber-500/40">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-amber-100/90 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#F26A21] shrink-0" />
              Campuses: Chengicherla | Nagaram | Nalgonda
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <span className="hidden md:inline text-amber-100/80 font-medium">
              (Approved by Govt. of Telangana & Affiliated to KNRUHS)
            </span>
            <span className="hidden md:inline text-amber-500/40">|</span>
            <a
              href={`tel:${siteConfig.contact.primaryPhone}`}
              className="flex items-center gap-1 font-semibold text-white hover:text-amber-300 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#F26A21]" />
              <span>Admissions Helpline: {siteConfig.contact.primaryPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. FULL-WIDTH BRANDED HEADER STRIP (Classic Rich Maroon Gradient Header) */}
      <div className="w-full bg-gradient-to-r from-[#4A0303] via-[#7A0D0D] to-[#4A0303] text-white py-3.5 md:py-4.5 px-4 sm:px-6 lg:px-8 border-b border-amber-500/30 relative overflow-hidden shadow-inner">
        {/* Subtle radial light accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,106,33,0.14)_0,transparent_75%)] pointer-events-none" />

        <div className="max-w-[1340px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 relative z-10">
          
          {/* Left: Orange Group / College Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/"
              className="group flex items-center shrink-0 transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none"
              aria-label="Orange Group of Nursing & Paramedical Colleges Home"
            >
              <div className="bg-white rounded-xl p-1.5 sm:p-2 shadow-xl border border-amber-300/40 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Orange Group Logo"
                  className="h-12 sm:h-16 md:h-18 lg:h-20 w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Center: Institution Main Title, Subtitle, & Location Details */}
          <div className="text-center flex-1 px-1 sm:px-4">
            {/* Main large title */}
            <h1 className="text-base sm:text-xl md:text-2xl lg:text-[27px] font-black text-white tracking-wide uppercase font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] leading-tight">
              ORANGE GROUP OF NURSING & PARAMEDICAL COLLEGES
            </h1>

            {/* Subtitle below main title */}
            <p className="italic text-amber-200 text-xs sm:text-sm md:text-base font-serif font-medium tracking-wider drop-shadow-sm mt-0.5">
              In Pursuit of Excellence
            </p>

            {/* Small line below subtitle */}
            <p className="text-amber-100/90 text-[10px] sm:text-xs font-sans font-semibold tracking-widest uppercase mt-0.5 text-amber-100/80">
              Hyderabad &nbsp;/&nbsp; Chengicherla &nbsp;/&nbsp; Nagaram &nbsp;/&nbsp; Nalgonda
            </p>
          </div>

          {/* Right: Institutional Seal Emblem Badge */}
          <div className="hidden lg:flex items-center shrink-0">
            <div className="border-2 border-amber-400/60 bg-gradient-to-br from-[#7A0D0D] via-[#5C0808] to-[#3B0303] text-amber-200 rounded-full w-20 h-20 xl:w-22 xl:h-22 flex flex-col items-center justify-center text-center shadow-xl p-1 border-dashed">
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300/90 leading-none">Estd 2008</span>
              <span className="text-lg xl:text-xl font-black text-white leading-tight font-serif my-0.5">20+</span>
              <span className="text-[8px] xl:text-[9px] font-semibold uppercase tracking-tight text-amber-200 leading-none">Years Excellence</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. MAIN NAVIGATION BAR (STICKY BELOW BRANDING HEADER STRIP) */}
      <div
        ref={navRef}
        className="sticky top-0 z-40 w-full bg-[#3B0303] text-white border-b-2 border-amber-500/40 shadow-md"
      >
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[46px] relative">
          
          {/* Mobile view toggle header */}
          <div className="flex lg:hidden items-center justify-between w-full py-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-amber-400/30 rounded-lg text-white font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-4 h-4 text-amber-400" />
              <span>Menu</span>
            </button>

            <span className="text-xs font-bold text-amber-200 font-serif tracking-wide truncate max-w-[180px]">
              Orange Colleges
            </span>

            <PrimaryButton
              to="/admissions#enquiry"
              size="sm"
              className="h-8 text-[11px] px-3 bg-[#F26A21] hover:bg-[#D95412] text-white font-bold border border-amber-300/30"
            >
              Enquire
            </PrimaryButton>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center justify-center flex-1 space-x-1 xl:space-x-1.5 py-1.5"
            aria-label="Main Navigation"
          >
            {mainNavigation.map((item, index) => {
              const isCurrentRoute = location.pathname === item.href;
              const isChildActive = Boolean(
                item.dropdownItems?.some((sub) => location.pathname.startsWith(sub.href))
              );
              const isActive = isCurrentRoute || isChildActive;
              const isDropdownOpen = activeDropdown === item.label;

              return (
                <React.Fragment key={item.label}>
                  {/* Bullet Dot Separator between Nav Items */}
                  {index > 0 && (
                    <span className="text-amber-400/50 font-bold text-xs select-none px-0.5">•</span>
                  )}

                  {item.hasDropdown ? (
                    <div
                      className={item.label === 'More' ? 'relative' : ''}
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className={cn(
                          'px-2.5 xl:px-3 py-1.5 text-xs xl:text-[13px] font-bold tracking-wider uppercase rounded-md inline-flex items-center gap-1 transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-amber-400',
                          isActive || isDropdownOpen
                            ? 'text-amber-300 bg-white/15'
                            : 'text-white hover:text-amber-300 hover:bg-white/10'
                        )}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            'w-3.5 h-3.5 transition-transform duration-200 text-amber-300/90',
                            isDropdownOpen && 'rotate-180 text-amber-400'
                          )}
                        />
                      </button>

                      {isDropdownOpen && item.label === 'More' && (
                        <div
                          onMouseEnter={() => handleMouseEnter('More')}
                          onMouseLeave={handleMouseLeave}
                          className="absolute top-full left-0 z-50 pt-1"
                        >
                          <MoreDropdown onClose={() => setActiveDropdown(null)} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        'px-2.5 xl:px-3 py-1.5 text-xs xl:text-[13px] font-bold tracking-wider uppercase rounded-md transition-colors duration-150 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center gap-1.5',
                        isActive
                          ? 'text-amber-300 bg-white/15'
                          : 'text-white hover:text-amber-300 hover:bg-white/10'
                      )}
                    >
                      {item.label === 'Home' && <Home className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{item.label}</span>
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Right Action: Enquire Now Button */}
          <div className="hidden lg:flex items-center shrink-0 ml-3">
            <PrimaryButton
              to="/admissions#enquiry"
              size="sm"
              showArrow
              className="h-8 text-xs px-3.5 bg-[#F26A21] hover:bg-[#D95412] text-white font-bold shadow-md border border-amber-300/40 hover:scale-[1.02]"
            >
              Enquire Now
            </PrimaryButton>
          </div>

          {/* Mega Menus anchored absolutely to navigation bar */}
          {activeDropdown === 'Colleges' && (
            <div
              onMouseEnter={() => handleMouseEnter('Colleges')}
              onMouseLeave={handleMouseLeave}
              className="absolute inset-x-0 top-full z-50 px-4 sm:px-6 lg:px-8 pointer-events-auto pt-1"
            >
              <CollegesMegaMenu onClose={() => setActiveDropdown(null)} />
            </div>
          )}
          {activeDropdown === 'Programs' && (
            <div
              onMouseEnter={() => handleMouseEnter('Programs')}
              onMouseLeave={handleMouseLeave}
              className="absolute inset-x-0 top-full z-50 px-4 sm:px-6 lg:px-8 pointer-events-auto pt-1"
            >
              <ProgramsMegaMenu onClose={() => setActiveDropdown(null)} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

