'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GlassSurface from './GlassSurface';
import { Logo } from '@/components/common/Logo';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;

    const checkNavbarBackground = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;

      const navY = 36;
      const navX = window.innerWidth / 2;
      const elements = document.elementsFromPoint(navX, navY);

      for (const el of elements) {
        if (el.closest('header')) continue;

        // 1. Check if element or ancestor is explicitly a black/dark container
        const darkContainer = el.closest(
          '.bg-black, [class*="bg-[#000000]"], [class*="bg-[#050505]"], [class*="bg-[#070707]"], [class*="bg-[#080808]"], [class*="bg-[#0a0a0a]"], [class*="bg-[#0b0a0e]"], [class*="bg-zinc-950"], [data-theme="dark"]'
        );
        if (darkContainer) {
          setIsDark(true);
          return;
        }

        // 2. Check computed background color of element
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (match) {
            const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
            if (a > 0.1) {
              const r = parseInt(match[1], 10);
              const g = parseInt(match[2], 10);
              const b = parseInt(match[3], 10);
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              setIsDark(brightness < 130);
              return;
            }
          }
        }
      }

      // 3. Fallback: check documentElement data-theme
      const dataTheme = document.documentElement.getAttribute('data-theme');
      if (dataTheme) {
        setIsDark(dataTheme === 'dark');
      } else {
        setIsDark(false);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      const prevScrollY = lastScrollYRef.current;
      const diff = currentScrollY - prevScrollY;

      // Down scroll: hide navbar
      if (diff > 4 && currentScrollY > 60) {
        setIsVisible(false);
      }
      // Up scroll: open navbar (or when near top)
      else if (diff < -4 || currentScrollY <= 30) {
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;

      if (!ticking) {
        requestAnimationFrame(() => {
          checkNavbarBackground();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // DeltaY > 8 means scrolling down
      if (e.deltaY > 8 && window.scrollY > 40) {
        setIsVisible(false);
      }
      // DeltaY < -8 means scrolling up
      else if (e.deltaY < -8) {
        setIsVisible(true);
      }
    };

    checkNavbarBackground();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('resize', checkNavbarBackground, { passive: true });

    const observer = new MutationObserver(() => checkNavbarBackground());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', checkNavbarBackground);
      observer.disconnect();
    };
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'About', href: '/about' },
    { label: 'Connect', href: '/contact' },
  ];

  return (
    <header
      className={`w-full fixed top-0 inset-x-0 z-[100] font-sans pointer-events-none transition-transform duration-350 ease-out ${
        isVisible || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
      data-node-id="239:1339"
    >
      <div 
        className="w-full h-[64px] lg:h-[72px] relative pointer-events-auto"
      >
        {/* Background layer */}
        <GlassSurface
          width="100%"
          height="100%"
          borderRadius={0}
          isDarkMode={isDark}
          className="absolute inset-0 z-0 rounded-none transition-all duration-500"
          displace={0.2}
          distortionScale={-50}
          redOffset={0}
          greenOffset={2}
          blueOffset={5}
          opacity={1}
          mixBlendMode="normal"
          backgroundOpacity={0}
        />

        {/* Content layer */}
        <div className="w-full h-full flex items-center justify-between px-4 sm:px-6 md:px-16 lg:px-20 relative z-10 pointer-events-auto">
          {/* Brand Logo - Desktop (lg:flex) */}
          <div className="hidden lg:flex justify-start">
            <Link
              href="/"
              className="flex items-center gap-[12px] no-underline cursor-pointer group"
              data-node-id="239:1340"
            >
              <Image
                src="/logo/FullIcon.svg"
                alt="ISOFINITI Logo Icon"
                width={40}
                height={38}
                className="w-[40px] h-[38px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-[4px] shrink-0"
                priority
              />
              <div className="w-[140px] h-[18px] flex items-center shrink-0" data-node-id="239:1342">
                <Logo
                  className="w-full h-auto transition-colors duration-500"
                  fill={isDark ? "#ffffff" : "#000000"}
                  accentColor="#D01919"
                />
              </div>
            </Link>
          </div>

          {/* Brand Logo - Mobile (lg:hidden) */}
          <div className="flex lg:hidden justify-start items-center">
            <Link
              href="/"
              className="flex items-center justify-center no-underline cursor-pointer group"
              aria-label="Home"
            >
              <Image
                src="/logo/FullIcon.svg"
                alt="ISOFINITI Logo Icon"
                width={32}
                height={30}
                className="w-[32px] h-[30px] shrink-0"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-[40px]" data-node-id="239:1368">
            {navLinks.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === '/services' && (pathname === '/service' || pathname === '/services')) ||
                (item.href === '/contact' && (pathname === '/contact' || pathname === '/connect'));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[12px] font-bold tracking-[0.9px] uppercase no-underline relative py-1 transition-colors duration-300 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#d91e1e] after:transition-transform after:duration-300 ${
                    isActive
                      ? "text-[#d91e1e] after:scale-x-100"
                      : "after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left " +
                        (isDark ? "text-white hover:text-[#d91e1e]" : "text-black hover:text-[#d91e1e]")
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Right Controls: START PROJECT Button + Hamburger / Close */}
          <div className="flex lg:hidden items-center gap-3 sm:gap-4">
            {/* START PROJECT Button */}
            <Link
              href="/contact"
              className="flex items-center gap-1.5 bg-[#D91E1E] hover:bg-[#b81818] active:scale-95 text-white font-sans font-bold text-[11px] sm:text-[12px] tracking-wider uppercase px-3.5 sm:px-4 py-2 rounded-[6px] shadow-sm transition-all duration-200 no-underline"
            >
              <span>START PROJECT</span>
              <span className="text-[13px] leading-none">↗</span>
            </Link>

            {/* Hamburger / Close Trigger Button */}
            <button
              className="w-[36px] h-[36px] flex items-center justify-center bg-transparent border-none cursor-pointer z-50 p-0 active:scale-95 transition-transform"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isDark ? "text-white" : "text-black"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isDark ? "text-white" : "text-black"}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 w-full h-screen ${
          isDark ? 'bg-zinc-950/98 text-white' : 'bg-white/98 text-black'
        } backdrop-blur-xl z-[150] flex flex-col justify-center items-center gap-10 px-6 py-20 transition-all duration-300 pointer-events-auto ${
          isMobileMenuOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-5 pointer-events-none'
        }`}
      >
        {/* Top Close Button inside Drawer Overlay */}
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-black/5 dark:bg-white/10 text-current hover:opacity-80 transition-opacity cursor-pointer border-none flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu drawer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center gap-[25px]">
          {navLinks.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === '/services' && (pathname === '/service' || pathname === '/services')) ||
              (item.href === '/contact' && (pathname === '/contact' || pathname === '/connect'));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-2xl font-bold tracking-[1.5px] uppercase no-underline hover:text-[#d91e1e] transition-colors duration-300 ${
                  isActive ? "text-[#d91e1e]" : isDark ? "text-white" : "text-black"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
