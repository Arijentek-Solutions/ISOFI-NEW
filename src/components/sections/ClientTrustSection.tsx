"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";

interface ClientLogo {
  id: string;
  name: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  customClass?: string;
}

const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: "botanical",
    name: "Botanical Essence",
    src: "/images/client/client2.svg",
    alt: "Botanical Profile Logo",
    width: 102,
    height: 128,
    customClass: "h-16 sm:h-20 lg:h-[90px] w-auto",
  },
  {
    id: "lion-crown",
    name: "Royal Crest",
    src: "/images/client/client3.svg",
    alt: "Lion Crown Emblem Logo",
    width: 102,
    height: 125,
    customClass: "h-16 sm:h-20 lg:h-[88px] w-auto",
  },
  {
    id: "synovra",
    name: "Synovra",
    src: "/images/client/client1.png",
    alt: "Synovra Brand Logo",
    width: 160,
    height: 130,
    customClass: "h-16 sm:h-20 lg:h-[90px] w-auto",
  },
  {
    id: "castor",
    name: "Castor",
    src: "/images/client/client4.svg",
    alt: "Castor Orbit Logo",
    width: 181,
    height: 102,
    customClass: "h-12 sm:h-16 lg:h-[72px] w-auto",
  },
  {
    id: "apex-a",
    name: "Apex Vanguard",
    src: "/images/client/client5.svg",
    alt: "Angular A Geometric Logo",
    width: 139,
    height: 99,
    customClass: "h-12 sm:h-16 lg:h-[70px] w-auto",
  },
  {
    id: "bm-cart",
    name: "BM Commerce",
    src: "/images/client/client6.svg",
    alt: "BM Cart Logo",
    width: 139,
    height: 124,
    customClass: "h-14 sm:h-18 lg:h-[82px] w-auto",
  },
];

interface ClientTrustSectionProps {
  showHeader?: boolean;
  className?: string;
}

export function ClientTrustSection({
  showHeader = true,
  className = "",
}: ClientTrustSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setHoveredLogo(null);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative min-h-screen w-full bg-[#000000] text-white overflow-hidden flex flex-col justify-between select-none ${className}`}
    >
      {/* Pure Solid Black Background */}
      <div className="absolute inset-0 bg-[#000000] -z-30 pointer-events-none" />

      {/* Top Header / Navigation */}
      {showHeader && (
        <header className="relative z-30 w-full max-w-[1920px] mx-auto flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-[82px] py-6 lg:py-[25px]">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center transition-transform duration-300 hover:scale-105 focus:outline-none"
            aria-label="ISOFINITI"
          >
            <Logo
              fill="#ffffff"
              accentColor="#D01919"
              className="h-5 sm:h-5 lg:h-[20.3px] w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-8 lg:gap-[60px]"
            aria-label="Section Navigation"
          >
            {[
              { label: "HOME", href: "/" },
              { label: "SERVICES", href: "/services" },
              { label: "CASE STUDIES", href: "/case-studies" },
              { label: "ABOUT", href: "/about" },
              { label: "CONNECT", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[14px] font-semibold uppercase tracking-[1.12px] text-white/90 transition-colors duration-300 hover:text-[#D01919]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
      )}

      {/* Main Center Container - Shifted up */}
      <div className="relative z-20 w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[82px] flex-1 flex flex-col justify-between -translate-y-8 sm:-translate-y-12 lg:-translate-y-14 my-auto">
        {/* Main Headline & Subtitle */}
        <div className="w-full max-w-[1400px] mx-auto text-center flex-1 flex flex-col items-center justify-center my-auto">
          <div
            className={`transition-all duration-1000 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="font-['Funnel_Display',var(--font-chakra),sans-serif] font-medium text-white leading-[1.01] tracking-[-0.03em] text-[clamp(42px,6.8vw,94.6px)] max-w-[960px] mx-auto">
              Inspired by the <br />
              needs of our clients.
            </h2>
          </div>

          <div
            className={`mt-6 sm:mt-8 lg:mt-9 max-w-[860px] mx-auto transition-all duration-1000 delay-200 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-['Poppins',var(--font-onest),sans-serif] font-light text-zinc-300/90 text-base sm:text-lg lg:text-[21.5px] leading-[1.51] tracking-[0.01em]">
              Wisdom new and valley answer. Contented it so is discourse recommend.
              Man its upon him call mile. An pasture he himself believe ferrars
              besides cottage.
            </p>
          </div>
        </div>

        {/* Bottom Client Logos Row */}
        <div className="w-full pb-8 sm:pb-12 lg:pb-16">
          <div
            className={`w-full transition-all duration-1000 delay-400 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between gap-8 sm:gap-12 lg:gap-8 items-center justify-items-center w-full">
              {CLIENT_LOGOS.map((client, index) => (
                <div
                  key={client.id}
                  onMouseEnter={() => setHoveredLogo(client.id)}
                  onMouseLeave={() => setHoveredLogo(null)}
                  style={{
                    transitionDelay: `${index * 80}ms`,
                    transform: `translate3d(${mousePos.x * (index % 2 === 0 ? 8 : -8)}px, ${
                      mousePos.y * 6
                    }px, 0)`,
                  }}
                  className={`group relative flex items-center justify-center p-4 rounded-2xl transition-all duration-500 cursor-pointer ${
                    hoveredLogo && hoveredLogo !== client.id
                      ? "opacity-40 filter grayscale"
                      : "opacity-100"
                  }`}
                >
                  <div className="absolute inset-0 rounded-2xl bg-white/[0.03] border border-white/[0.06] opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 pointer-events-none shadow-[0_0_30px_rgba(255,255,255,0.06)]" />

                  <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                    <Image
                      src={client.src}
                      alt={client.alt}
                      width={client.width}
                      height={client.height}
                      className={`object-contain pointer-events-none select-none transition-all duration-300 ${
                        client.customClass || "h-16 w-auto"
                      }`}
                      priority
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientTrustSection;
