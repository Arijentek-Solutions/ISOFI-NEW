"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function BusinessOverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Intersection Observer for scroll entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth mouse parallax tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-white text-black overflow-hidden flex flex-col justify-between px-6 sm:px-10 md:px-16 lg:px-[82px] py-16 sm:py-20 lg:py-[70px]"
    >
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_30%,rgba(208,25,25,0.03)_0%,transparent_60%)]" />

      {/* Main Top Header Section */}
      <div className="relative z-20 w-full max-w-[1920px] mx-auto pt-6 sm:pt-10">
        <div
          className={`max-w-[1050px] transition-all duration-1000 ease-out transform ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="font-['Funnel_Display',sans-serif] font-normal text-black leading-[0.98] tracking-[-0.04em] text-[clamp(38px,5.2vw,95px)] capitalize">
            Your business has a lot going on. We make it work — together.
          </h2>
        </div>
      </div>

      {/* 3D Floating Interactive Cards Canvas */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto h-[480px] sm:h-[540px] lg:h-[600px] my-6">
        {/* Card 1: Web / Digital Platform (-24.54 deg) */}
        <div
          style={
            {
              "--base-rot": "-24.54deg",
              transform: `translate3d(${mousePos.x * -24}px, ${
                mousePos.y * -20
              }px, 0)`,
            } as React.CSSProperties
          }
          className={`absolute left-[2%] sm:left-[5%] lg:left-[5%] bottom-[5%] sm:bottom-[10%] lg:bottom-[4%] w-[260px] sm:w-[310px] lg:w-[360px] transition-all duration-1000 delay-150 ease-out transform ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-24 scale-90"
          }`}
        >
          <div className="animate-float-medium hover:scale-105 transition-transform duration-500 cursor-pointer drop-shadow-2xl">
            <Image
              src="/images/card1.png"
              alt="Digital Web Platforms"
              width={402}
              height={402}
              className="w-full h-auto object-contain pointer-events-none select-none"
              priority
            />
          </div>
        </div>

        {/* Card 2: AI Processor Chip (Center) */}
        <div
          style={
            {
              "--base-rot": "0deg",
              transform: `translate3d(${mousePos.x * 18}px, ${
                mousePos.y * 22
              }px, 0)`,
            } as React.CSSProperties
          }
          className={`absolute left-[40%] sm:left-[45%] lg:left-[47%] -translate-x-1/2 bottom-[12%] sm:bottom-[16%] lg:bottom-[10%] w-[250px] sm:w-[300px] lg:w-[350px] transition-all duration-1000 delay-300 ease-out transform ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-28 scale-85"
          }`}
        >
          <div className="animate-float-slow hover:scale-105 transition-transform duration-500 cursor-pointer drop-shadow-2xl">
            <Image
              src="/images/card2.png"
              alt="Intelligent AI Systems"
              width={402}
              height={402}
              className="w-full h-auto object-contain pointer-events-none select-none"
              priority
            />
          </div>
        </div>

        {/* Card 3: Database & Analytics (+15 deg) */}
        <div
          style={
            {
              "--base-rot": "15deg",
              transform: `translate3d(${mousePos.x * -28}px, ${
                mousePos.y * 26
              }px, 0)`,
            } as React.CSSProperties
          }
          className={`absolute right-[2%] sm:right-[5%] lg:right-[6%] top-[0%] sm:top-[-5%] lg:top-[-10%] w-[270px] sm:w-[320px] lg:w-[380px] transition-all duration-1000 delay-500 ease-out transform ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-24 scale-90"
          }`}
        >
          <div className="animate-float-fast hover:scale-105 transition-transform duration-500 cursor-pointer drop-shadow-2xl">
            <Image
              src="/images/card3.png"
              alt="Data Infrastructure & Metrics"
              width={434}
              height={477}
              className="w-full h-auto object-contain pointer-events-none select-none"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom Right Supporting Narrative */}
      <div className="relative z-20 w-full max-w-[1920px] mx-auto flex justify-end pb-4 sm:pb-6">
        <div
          className={`max-w-[490px] text-left transition-all duration-1000 delay-700 ease-out transform ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-[family-name:var(--font-onest)] font-light text-[rgba(0,0,0,0.5)] text-base sm:text-lg lg:text-[22px] leading-[1.5] sm:leading-[33.56px]">
            From digital experiences to intelligent systems, ISOFINITI brings
            design, software, automation, and AI together to help businesses
            operate better and grow faster.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BusinessOverviewSection;
