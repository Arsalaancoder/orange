import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mainNavigation } from '@/data/navigation';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { CollegesMegaMenu } from './CollegesMegaMenu';
import { ProgramsMegaMenu } from './ProgramsMegaMenu';
import { MoreDropdown } from './MoreDropdown';
import { MobileMenu } from './MobileMenu';
import { AdmissionsTicker } from './AdmissionsTicker';
import { Menu, X, ChevronDown, MapPin, PhoneCall } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

interface NavbarProps {
  initialMode?: 'solid' | 'transparent';
}

export const Navbar: React.FC<NavbarProps> = ({ initialMode = 'solid' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const isTransparent = initialMode === 'transparent' && !scrolled;

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-[#202426] border-b border-[#E3E6E5] shadow-sm transition-all duration-300">
      {/* 1. TOP ANNOUNCEMENT BAR (Contains only Campuses and Admissions Helpline) */}
      <div
        className={cn(
          'text-white text-[11px] md:text-xs py-2 px-4 transition-colors duration-300 border-b border-white/10',
          isTransparent ? 'bg-[#101820]/90 backdrop-blur-md' : 'bg-[#101820]'
        )}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between gap-2 whitespace-nowrap">
          <div className="flex items-center gap-1.5 text-gray-300 text-[11px] md:text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#F26A21] shrink-0" />
            <span>Campuses: Chengicherla / Hyderabad | Nagaram / Hyderabad | Nalgonda</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] md:text-xs">
            <a
              href={`tel:${siteConfig.contact.primaryPhone}`}
              className="flex items-center gap-1.5 font-semibold text-white hover:text-[#F26A21] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#F26A21] shrink-0" />
              <span>Admissions Helpline: {siteConfig.contact.primaryPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. ADMISSIONS TICKER */}
      <AdmissionsTicker />

      {/* 3. ROW 1 — BRANDING ROW (White Background) */}
      <div className="w-full bg-white border-b border-[#E3E6E5] py-3.5 md:py-4.5">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo + Institution Name Branding */}
          <Link
            to="/"
            className="flex items-center gap-3 sm:gap-4 group focus-visible:outline-none shrink-0"
            aria-label="Orange Group of Nursing & Paramedical Colleges - Home"
          >
            <img
              src="/logo.png"
              alt="Orange Group Logo"
              className="h-12 sm:h-16 md:h-[80px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] shrink-0"
            />
            <div className="flex flex-col justify-center">
              {/* Mobile title (< sm breakpoint) */}
              <span className="block sm:hidden font-bold text-[#101820] text-xs tracking-tight uppercase leading-tight font-sans whitespace-nowrap">
                ORANGE GROUP OF COLLEGES
              </span>
              {/* Desktop / Tablet title (>= sm breakpoint) */}
              <span className="hidden sm:block font-bold text-[#101820] text-[16px] sm:text-[19px] md:text-[23px] lg:text-[24px] tracking-tight uppercase leading-tight font-sans whitespace-nowrap">
                ORANGE GROUP OF NURSING & PARAMEDICAL COLLEGES
              </span>
              <span className="text-xs sm:text-sm md:text-[15px] text-[#F26A21] italic font-serif font-semibold tracking-wide mt-1 whitespace-nowrap">
                In Pursuit of Excellence
              </span>
            </div>
          </Link>

          {/* Mobile Hamburger Toggle Button (< 1024px / lg) */}
          <button
            className="flex lg:hidden items-center justify-center w-11 h-11 rounded-lg border border-[#E3E6E5] text-[#202426] hover:bg-[#F3F4F4] transition-colors cursor-pointer shrink-0 ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#202426]" /> : <Menu className="w-6 h-6 text-[#202426]" />}
          </button>
        </div>
      </div>

      {/* 3. ROW 2 — SEPARATE NAVIGATION ROW (Desktop ≥ 1024px / lg) */}
      <div
        ref={navRef}
        className="hidden lg:block w-full bg-white border-b border-[#E3E6E5] relative py-2.5"
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
          {/* Desktop Navigation Links */}
          <nav className="flex items-center gap-6 xl:gap-8 2xl:gap-10 whitespace-nowrap" aria-label="Main Navigation">
            {mainNavigation.map((item) => {
              const isCurrentRoute = location.pathname === item.href;
              const isChildActive = Boolean(
                item.dropdownItems?.some((sub) => location.pathname.startsWith(sub.href))
              );
              const isActive = isCurrentRoute || isChildActive;
              const isDropdownOpen = activeDropdown === item.label;

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className={item.label === 'More' ? 'relative' : ''}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={cn(
                        'relative px-3 py-1.5 text-xs xl:text-sm font-bold rounded-lg inline-flex items-center gap-1 transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#F26A21]',
                        isTransparent
                          ? isActive || isDropdownOpen
                            ? 'text-[#F26A21]'
                            : 'text-white hover:text-[#F26A21]'
                          : isActive || isDropdownOpen
                            ? 'text-[#F26A21]'
                            : 'text-[#202426] hover:text-[#F26A21]'
                      )}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-200',
                          isDropdownOpen && 'rotate-180 text-[#F26A21]'
                        )}
                      />
                      {(isDropdownOpen || isActive) && (
                        <span className="absolute -bottom-1 left-2.5 right-2.5 h-[2.5px] bg-[#F26A21] rounded-full transition-all" />
                      )}
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
                );
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'px-3 py-1.5 text-xs xl:text-sm font-bold rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#F26A21]',
                    isTransparent
                      ? isActive
                        ? 'text-[#F26A21] bg-white/10'
                        : 'text-white hover:text-[#F26A21] hover:bg-white/10'
                      : isActive
                        ? 'text-[#F26A21] bg-[#F26A21]/5'
                        : 'text-[#202426] hover:text-[#F26A21] hover:bg-[#F3F4F4]'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Enquire Now CTA Button */}
          <div className="flex items-center shrink-0">
            <PrimaryButton to="/admissions#enquiry" size="sm" showArrow className="h-10 text-xs xl:text-sm px-5 whitespace-nowrap shrink-0">
              Enquire Now
            </PrimaryButton>
          </div>

          {/* Mega Menus anchored absolutely to navigation row container */}
          {activeDropdown === 'Colleges' && (
            <div
              onMouseEnter={() => handleMouseEnter('Colleges')}
              onMouseLeave={handleMouseLeave}
              className="absolute inset-x-0 top-full z-50 px-4 sm:px-6 lg:px-8 pointer-events-auto"
            >
              <CollegesMegaMenu onClose={() => setActiveDropdown(null)} />
            </div>
          )}
          {activeDropdown === 'Programs' && (
            <div
              onMouseEnter={() => handleMouseEnter('Programs')}
              onMouseLeave={handleMouseLeave}
              className="absolute inset-x-0 top-full z-50 px-4 sm:px-6 lg:px-8 pointer-events-auto"
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



