"use client";

import React, { forwardRef, useState } from "react";
import Image from "next/image";

interface Stage9ClientsOverlayProps {
  mousePos?: { x: number; y: number };
}

interface ClientLogoItem {
  id: string;
  name: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  customClass?: string;
}

const CLIENT_LOGOS: ClientLogoItem[] = [
  {
    id: "botanical",
    name: "Botanical Essence",
    src: "/images/client/client2.svg",
    alt: "Botanical Profile Logo",
    width: 102,
    height: 128,
    customClass: "h-12 sm:h-14 lg:h-[68px] w-auto",
  },
  {
    id: "castor",
    name: "Castor",
    src: "/images/client/client4.svg",
    alt: "Castor Orbit Logo",
    width: 181,
    height: 102,
    customClass: "h-9 sm:h-11 lg:h-[48px] w-auto",
  },
  {
    id: "lion-crown",
    name: "Royal Crest",
    src: "/images/client/client3.svg",
    alt: "Lion Crown Emblem Logo",
    width: 102,
    height: 125,
    customClass: "h-12 sm:h-14 lg:h-[66px] w-auto",
  },
  {
    id: "apex-a",
    name: "Apex Vanguard",
    src: "/images/client/client5.svg",
    alt: "Angular A Geometric Logo",
    width: 139,
    height: 99,
    customClass: "h-9 sm:h-11 lg:h-[50px] w-auto",
  },
  {
    id: "synovra",
    name: "Synovra",
    src: "/images/client/client1.png",
    alt: "Synovra Brand Logo",
    width: 160,
    height: 130,
    customClass: "h-11 sm:h-13 lg:h-[60px] w-auto",
  },
  {
    id: "bm-cart",
    name: "BM Commerce",
    src: "/images/client/client6.svg",
    alt: "BM Cart Logo",
    width: 139,
    height: 124,
    customClass: "h-11 sm:h-13 lg:h-[58px] w-auto",
  },
];

export const Stage9ClientsOverlay = forwardRef<
  HTMLDivElement,
  Stage9ClientsOverlayProps
>(({ mousePos = { x: 0, y: 0 } }, ref) => {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  return (
    <div
      ref={ref}
      style={{ visibility: "hidden" }}
      className="absolute inset-0 pointer-events-none w-full h-full flex flex-col justify-between z-30 overflow-hidden select-none"
    >
      {/* 1. Pure Solid Black Background */}
      <div className="absolute inset-0 bg-[#000000] -z-30 pointer-events-none" />

      {/* ========================================================================= */}
      {/* MOBILE SCREEN LAYOUT (md:hidden) — Pure Mobile View                       */}
      {/* ========================================================================= */}
      <div className="flex md:hidden relative z-20 w-full h-full flex-col justify-between pt-24 pb-20 px-4 pointer-events-auto overflow-y-auto">
        {/* Top Headline & Subtitle (Moved down with breathing room from navbar) */}
        <div className="w-full text-center flex flex-col items-center select-none pt-2">
          <h2 className="font-['Funnel_Display',sans-serif] font-semibold text-white tracking-tight text-[25px] xs:text-[28px] leading-[1.1]">
            Inspired by the <br />
            needs of our clients.
          </h2>
          <p className="font-[family-name:var(--font-onest)] font-light text-zinc-400 text-[12px] xs:text-[13px] leading-relaxed max-w-[320px] mx-auto mt-2.5">
            Wisdom new and valley answer. Contented it so is discourse recommend. Man its upon him call mile. An pasture he himself believe ferrars besides cottage.
          </p>
        </div>

        {/* 6 Client Logos Grid (3 Columns x 2 Rows) */}
        <div className="w-full max-w-[320px] mx-auto my-auto py-3 grid grid-cols-3 gap-3 items-center justify-items-center">
          {CLIENT_LOGOS.map((client) => (
            <div
              key={client.id}
              className="relative flex items-center justify-center p-2 rounded-xl"
            >
              <Image
                src={client.src}
                alt={client.alt}
                width={client.width}
                height={client.height}
                className="h-9 w-auto object-contain pointer-events-none select-none"
                priority
              />
            </div>
          ))}
        </div>

        {/* Bottom Client Testimonial Card (Moved up away from scroll indicator & bottom edge) */}
        <div className="w-full max-w-[335px] mx-auto bg-[#0b0a0e]/95 border border-white/10 rounded-[18px] p-3.5 sm:p-4 shadow-2xl backdrop-blur-md mb-4">
          {/* Red Quote Mark */}
          <div className="text-[#D91E1E] text-2xl leading-none font-serif mb-1">
            “
          </div>

          {/* Testimonial Quote */}
          <p className="font-['Funnel_Display',sans-serif] font-medium text-white text-[13px] leading-[1.35] tracking-tight">
            &quot;Isofiniti Didn&apos;t Just Build A Website; They Re-Architected Our Entire Digital Presence. Our Conversion Rates Doubled Within The First Quarter Of Deployment.&quot;
          </p>

          {/* Author Profile Footer */}
          <div className="flex items-center gap-2.5 mt-2.5 pt-2.5 border-t border-white/5">
            {/* Avatar Circle */}
            <div className="w-7 h-7 rounded-full bg-[#D91E1E] flex items-center justify-center text-white font-bold text-[11px] tracking-wider shrink-0 shadow-lg">
              E.V
            </div>

            {/* Author Name & Title */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="font-['Funnel_Display',sans-serif] font-bold text-white text-[11.5px] tracking-wide uppercase">
                  E. VANCE
                </span>
                <svg
                  className="w-3 h-3 text-[#D91E1E] fill-current"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-[family-name:var(--font-onest)] font-medium text-zinc-400 text-[9.5px] tracking-wider uppercase">
                CEO, TECHLOGIX
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PC / DESKTOP SCREEN LAYOUT (hidden md:flex) — Exact Figma Split Design    */}
      {/* ========================================================================= */}
      <div className="hidden md:flex relative z-20 w-full max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[82px] flex-1 flex-col justify-center gap-8 lg:gap-12 pt-[65px] pb-6 pointer-events-auto">
        
        {/* Top Split Stage: Left Headline & Subtitle + Right 3x2 Logos */}
        <div className="grid grid-cols-12 items-center gap-10 lg:gap-14 w-full">
          {/* Left Column: Headline & Subtitle */}
          <div className="col-span-6 flex flex-col text-left">
            <h2 className="font-['Funnel_Display',sans-serif] font-bold text-white leading-[1.03] tracking-tight text-[clamp(32px,4.5vw,72px)]">
              Inspired by the <br />
              needs of our clients.
            </h2>

            <p className="font-[family-name:var(--font-onest)] font-light text-zinc-400 text-sm lg:text-[16px] leading-relaxed max-w-[500px] mt-5 sm:mt-6">
              Wisdom new and valley answer. Contented it so is discourse recommend Man its upon him call mile. An pasture he himself believe ferrars besides cottage.
            </p>
          </div>

          {/* Right Column: 6 Logos in a 3 Columns x 2 Rows Grid */}
          <div className="col-span-6 w-full">
            <div className="grid grid-cols-3 gap-x-6 sm:gap-x-10 lg:gap-x-12 gap-y-6 sm:gap-y-10 items-center justify-items-center w-full">
              {CLIENT_LOGOS.map((client, index) => (
                <div
                  key={client.id}
                  onMouseEnter={() => setHoveredLogo(client.id)}
                  onMouseLeave={() => setHoveredLogo(null)}
                  style={{
                    transform: `translate3d(${mousePos.x * (index % 2 === 0 ? 5 : -5)}px, ${
                      mousePos.y * 4
                    }px, 0)`,
                  }}
                  className={`group relative flex items-center justify-center p-2.5 rounded-2xl transition-all duration-300 cursor-pointer ${
                    hoveredLogo && hoveredLogo !== client.id
                      ? "opacity-35 filter grayscale"
                      : "opacity-100"
                  }`}
                >
                  <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                    <Image
                      src={client.src}
                      alt={client.alt}
                      width={client.width}
                      height={client.height}
                      className={`object-contain pointer-events-none select-none transition-all duration-300 ${
                        client.customClass || "h-12 w-auto"
                      }`}
                      priority
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Testimonial Card */}
        <div className="w-full rounded-[22px] lg:rounded-[26px] bg-[#070707] border border-white/10 p-6 sm:p-8 lg:p-10 backdrop-blur-md shadow-[0_12px_45px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-12">
            {/* Author Profile */}
            <div className="flex items-center gap-4 shrink-0 lg:w-[260px]">
              <div className="w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#D01919] flex items-center justify-center text-white font-bold text-base sm:text-lg tracking-wider shrink-0 shadow-[0_0_22px_rgba(208,25,25,0.4)]">
                E.V
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-['Funnel_Display',sans-serif] font-bold text-white text-[15px] sm:text-[16px] tracking-wide uppercase">
                    E. VANCE
                  </span>
                  <svg className="w-3.5 h-3.5 text-[#D01919] fill-current" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-[family-name:var(--font-onest)] font-semibold text-zinc-400 text-[11px] tracking-[1.5px] uppercase mt-0.5">
                  CEO, TECHLOGIX
                </span>
              </div>
            </div>

            {/* Testimonial Quote with Red SVG Quotes */}
            <div className="flex-1 flex flex-col text-left lg:pl-4">
              <svg className="w-7 h-7 text-[#D01919] fill-current mb-2.5 shrink-0" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="font-['Funnel_Display',sans-serif] font-medium text-white text-[16px] sm:text-[19px] lg:text-[21px] leading-[1.38] tracking-tight">
                &quot;Isofiniti Didn&apos;t Just Build A Website; They Re-Architected Our Entire Digital Presence. Our Conversion Rates Doubled Within The First Quarter Of Deployment.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Stage9ClientsOverlay.displayName = "Stage9ClientsOverlay";
