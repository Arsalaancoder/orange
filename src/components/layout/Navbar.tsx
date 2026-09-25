import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mainNavigation } from '@/data/navigation';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { CollegesMegaMenu } from './CollegesMegaMenu';
import { ProgramsMegaMenu } from './ProgramsMegaMenu';
import { MoreDropdown } from './MoreDropdown';
import { MobileMenu } from './MobileMenu';
import { Menu, ChevronDown, MapPin } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full bg-white text-[#202426] border-b border-[#E3E6E5] shadow-2xs transition-all duration-300">
      {/* Top Announcement Bar (Existing Dark Navy Bar) */}
      <div
        className={cn(
          'text-white text-[11px] md:text-xs py-2 px-4 transition-colors duration-300 border-b border-white/10',
          isTransparent ? 'bg-[#101820]/90 backdrop-blur-md' : 'bg-[#101820]'
        )}
      >
        <div className="max-w-[1340px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white tracking-wide text-[11px] md:text-xs">
              Orange Group of Nursing & Paramedical Colleges
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-gray-300 text-[11px]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F26A21]" />
              Campuses: Chengicherla / Hyderabad | Nagaram / Hyderabad | Nalgonda
            </span>
            <span className="text-white/30">|</span>
            <span className="font-semibold text-white">
              Admissions Helpline: {siteConfig.contact.primaryPhone}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar Header (White Background, Clean & Modern) */}
      <div
        ref={navRef}
        className={cn(
          'w-full transition-colors duration-300 relative py-2.5 sm:py-3',
          isTransparent
            ? 'bg-transparent text-white border-white/15'
            : 'bg-white text-[#202426] border-[#E3E6E5] shadow-2xs',
          scrolled ? 'py-2' : ''
        )}
      >
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-6 relative">
          
          {/* Logo + Institution Name Branding (Left Side) */}
          <div className="flex items-center justify-between w-full lg:w-auto shrink-0">
            <Link
              to="/"
              className="flex items-center gap-3 sm:gap-3.5 group focus-visible:outline-none shrink-0"
              aria-label="Orange Group of Nursing & Paramedical Colleges - Home"
            >
              <img
                src="/logo.png"
                alt="Orange Group Logo"
                className="h-11 sm:h-13 md:h-14 lg:h-15 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-[#101820] text-xs sm:text-sm md:text-base lg:text-[17px] tracking-tight uppercase leading-tight font-sans">
                  ORANGE GROUP OF NURSING & PARAMEDICAL COLLEGES
                </span>
                <span className="text-[11px] sm:text-xs text-[#F26A21] italic font-serif font-semibold tracking-wide mt-0.5">
                  In Pursuit of Excellence
                </span>
              </div>
            </Link>

            {/* Mobile Menu Hamburger Trigger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                'lg:hidden w-10 h-10 rounded-xl border flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2',
                isTransparent
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-[#E3E6E5] text-[#202426] hover:bg-[#F3F4F4]'
              )}
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links + CTA Container */}
          <div className="hidden lg:flex items-center justify-between flex-1 gap-4 xl:gap-6">
            {/* Desktop Navigation Links */}
            <nav className="flex items-center space-x-0.5 xl:space-x-1.5" aria-label="Main Navigation">
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
                          'relative px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-bold rounded-lg inline-flex items-center gap-1 transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#F26A21]',
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
                          className="absolute top-full left-0 z-50"
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
                      'px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-bold rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#F26A21]',
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

            {/* Desktop Action: Primary Orange Enquire Now Button */}
            <div className="flex items-center shrink-0">
              <PrimaryButton to="/admissions#enquiry" size="sm" showArrow className="h-10 text-xs xl:text-sm px-5">
                Enquire Now
              </PrimaryButton>
            </div>
          </div>

          {/* Mega Menus anchored absolutely to header container */}
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


