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
    customClass: "h-14 sm:h-18 lg:h-[86px] w-auto",
  },
  {
    id: "lion-crown",
    name: "Royal Crest",
    src: "/images/client/client3.svg",
    alt: "Lion Crown Emblem Logo",
    width: 102,
    height: 125,
    customClass: "h-14 sm:h-18 lg:h-[84px] w-auto",
  },
  {
    id: "synovra",
    name: "Synovra",
    src: "/images/client/client1.png",
    alt: "Synovra Brand Logo",
    width: 160,
    height: 130,
    customClass: "h-14 sm:h-18 lg:h-[86px] w-auto",
  },
  {
    id: "castor",
    name: "Castor",
    src: "/images/client/client4.svg",
    alt: "Castor Orbit Logo",
    width: 181,
    height: 102,
    customClass: "h-10 sm:h-14 lg:h-[68px] w-auto",
  },
  {
    id: "apex-a",
    name: "Apex Vanguard",
    src: "/images/client/client5.svg",
    alt: "Angular A Geometric Logo",
    width: 139,
    height: 99,
    customClass: "h-10 sm:h-14 lg:h-[66px] w-auto",
  },
  {
    id: "bm-cart",
    name: "BM Commerce",
    src: "/images/client/client6.svg",
    alt: "BM Cart Logo",
    width: 139,
    height: 124,
    customClass: "h-12 sm:h-16 lg:h-[78px] w-auto",
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
      <div className="flex md:hidden relative z-20 w-full h-full flex-col justify-between pt-16 pb-8 px-4 pointer-events-auto overflow-y-auto">
        {/* Top Headline & Subtitle */}
        <div className="w-full text-center flex flex-col items-center select-none">
          <h2 className="font-['Funnel_Display',sans-serif] font-semibold text-white tracking-tight text-[26px] xs:text-[30px] leading-[1.08]">
            Inspired by the <br />
            needs of our clients.
          </h2>
          <p className="font-[family-name:var(--font-onest)] font-light text-zinc-400 text-[12px] xs:text-[13px] leading-relaxed max-w-[340px] mx-auto mt-2">
            Wisdom new and valley answer. Contented it so is discourse recommend. Man its upon him call mile. An pasture he himself believe ferrars besides cottage.
          </p>
        </div>

        {/* 6 Client Logos Grid (3 Columns x 2 Rows) */}
        <div className="w-full max-w-[340px] mx-auto my-4 grid grid-cols-3 gap-3 items-center justify-items-center">
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
                className="h-10 w-auto object-contain pointer-events-none select-none"
                priority
              />
            </div>
          ))}
        </div>

        {/* Bottom Client Testimonial Card */}
        <div className="w-full max-w-[340px] mx-auto bg-[#0b0a0e]/90 border border-white/10 rounded-[20px] p-4 shadow-2xl backdrop-blur-md">
          {/* Red Quote Mark */}
          <div className="text-[#D91E1E] text-2xl leading-none font-serif mb-1">
            “
          </div>

          {/* Testimonial Quote */}
          <p className="font-['Funnel_Display',sans-serif] font-medium text-white text-[13.5px] leading-[1.35] tracking-tight">
            &quot;Isofiniti Didn&apos;t Just Build A Website; They Re-Architected Our Entire Digital Presence. Our Conversion Rates Doubled Within The First Quarter Of Deployment.&quot;
          </p>

          {/* Author Profile Footer */}
          <div className="flex items-center gap-2.5 mt-3 pt-2.5 border-t border-white/5">
            {/* Avatar Circle */}
            <div className="w-8 h-8 rounded-full bg-[#D91E1E] flex items-center justify-center text-white font-bold text-xs tracking-wider shrink-0 shadow-lg">
              E.V
            </div>

            {/* Author Name & Title */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="font-['Funnel_Display',sans-serif] font-bold text-white text-[12px] tracking-wide uppercase">
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
              <span className="font-[family-name:var(--font-onest)] font-medium text-zinc-400 text-[10px] tracking-wider uppercase">
                CEO, TECHLOGIX
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PC / DESKTOP SCREEN LAYOUT (hidden md:flex) — 100% UNTOUCHED ORIGINAL     */}
      {/* ========================================================================= */}
      <div className="hidden md:flex relative z-20 w-full max-w-[1720px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[82px] flex-1 flex-col justify-between -translate-y-8 sm:-translate-y-12 lg:-translate-y-14 pt-[90px]">
        {/* Center Showcase Content: Headline & Descriptive Narrative */}
        <div className="w-full max-w-[1400px] mx-auto text-center flex-1 flex flex-col items-center justify-center pointer-events-auto">
          {/* Main Headline */}
          <h2 className="font-['Funnel_Display',var(--font-chakra),sans-serif] font-medium text-white leading-[1.01] tracking-[-0.03em] text-[clamp(36px,6.2vw,94.6px)] max-w-[960px] mx-auto">
            Inspired by the <br />
            needs of our clients.
          </h2>

          {/* Subtitle / Descriptive Narrative */}
          <p className="font-['Poppins',var(--font-onest),sans-serif] font-light text-zinc-300/90 text-sm sm:text-base lg:text-[21.5px] leading-[1.51] tracking-[0.01em] max-w-[860px] mx-auto mt-6 sm:mt-8 lg:mt-9">
            Wisdom new and valley answer. Contented it so is discourse recommend.
            Man its upon him call mile. An pasture he himself believe ferrars
            besides cottage.
          </p>
        </div>

        {/* Bottom Client Logos Row - Positioned higher with bottom breathing clearance */}
        <div className="w-full pb-8 sm:pb-12 lg:pb-16 pointer-events-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between gap-6 sm:gap-10 lg:gap-8 items-center justify-items-center w-full">
            {CLIENT_LOGOS.map((client, index) => (
              <div
                key={client.id}
                onMouseEnter={() => setHoveredLogo(client.id)}
                onMouseLeave={() => setHoveredLogo(null)}
                style={{
                  transform: `translate3d(${mousePos.x * (index % 2 === 0 ? 8 : -8)}px, ${
                    mousePos.y * 6
                  }px, 0)`,
                }}
                className={`group relative flex items-center justify-center p-3 sm:p-4 rounded-2xl transition-all duration-500 cursor-pointer ${
                  hoveredLogo && hoveredLogo !== client.id
                    ? "opacity-35 filter grayscale"
                    : "opacity-100"
                }`}
              >
                {/* Subtle White Glass Backdrop Halo on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-white/[0.03] border border-white/[0.08] opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 pointer-events-none shadow-[0_0_35px_rgba(255,255,255,0.07)]" />

                {/* Logo Image */}
                <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                  <Image
                    src={client.src}
                    alt={client.alt}
                    width={client.width}
                    height={client.height}
                    className={`object-contain pointer-events-none select-none transition-all duration-300 ${
                      client.customClass || "h-14 w-auto"
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
  );
});

Stage9ClientsOverlay.displayName = "Stage9ClientsOverlay";
