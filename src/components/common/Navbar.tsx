'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GlassSurface from './GlassSurface';
import { Logo } from '@/components/common/Logo';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      const dataTheme = document.documentElement.getAttribute('data-theme');
      if (dataTheme) {
        setIsDark(dataTheme === 'dark');
      } else {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    };

    checkDark();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => checkDark();
    mediaQuery.addEventListener('change', handler);

    const observer = new MutationObserver(() => checkDark());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      mediaQuery.removeEventListener('change', handler);
      observer.disconnect();
    };
  }, []);

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
      className={`w-full ${isMobileMenuOpen ? 'fixed' : 'sticky'} top-0 inset-x-0 z-[100] font-sans pointer-events-none transition-colors duration-500`}
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
          className="absolute inset-0 z-0 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border-b border-black/[0.08] dark:border-white/20 rounded-none transition-all duration-500"
          displace={0.5}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          brightness={50}
          opacity={0.93}
          mixBlendMode="screen"
          backgroundOpacity={isDark ? 0.25 : 0.15}
        />

        {/* Content layer */}
        <div className="w-full h-full flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-20 relative z-10 pointer-events-auto">
          {/* Brand Logo */}
          <div className="flex justify-start">
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

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-[40px]" data-node-id="239:1368">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[12px] font-bold tracking-[0.9px] uppercase no-underline relative py-1 transition-colors duration-300 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#d91e1e] after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-300 ${
                  isDark ? "text-white hover:text-[#d91e1e]" : "text-black hover:text-[#d91e1e]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger Trigger Button */}
          <button
            className="flex lg:hidden flex-col justify-between w-6 h-[18px] bg-transparent border-none p-0 cursor-pointer z-50"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`w-full h-[2px] ${isDark ? "bg-white" : "bg-black"} transition-all duration-300 origin-left ${
                isMobileMenuOpen ? 'rotate-45 translate-x-[2px] -translate-y-[1px]' : ''
              }`}
            ></span>
            <span
              className={`w-full h-[2px] ${isDark ? "bg-white" : "bg-black"} transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`w-full h-[2px] ${isDark ? "bg-white" : "bg-black"} transition-all duration-300 origin-left ${
                isMobileMenuOpen ? '-rotate-45 translate-x-[2px] translate-y-[1px]' : ''
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 w-full h-screen ${
          isDark ? 'bg-zinc-950/95 text-white' : 'bg-white/95 text-black'
        } backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-10 px-6 py-20 transition-all duration-500 pointer-events-auto ${
          isMobileMenuOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-5 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-[25px]">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-xl font-bold tracking-[1.5px] uppercase no-underline hover:text-[#d91e1e] transition-colors duration-300 ${
                isDark ? "text-white" : "text-black"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
