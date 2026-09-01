'use client';

import React, { useState } from 'react';
import Image from 'next/image';

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
    id: 'botanical',
    name: 'Botanical Essence',
    src: '/images/client/client2.svg',
    alt: 'Botanical Profile Logo',
    width: 102,
    height: 128,
    customClass: 'h-14 sm:h-16 lg:h-[72px] w-auto',
  },
  {
    id: 'castor',
    name: 'Castor',
    src: '/images/client/client4.svg',
    alt: 'Castor Orbit Logo',
    width: 181,
    height: 102,
    customClass: 'h-10 sm:h-12 lg:h-[52px] w-auto',
  },
  {
    id: 'lion-crown',
    name: 'Royal Crest',
    src: '/images/client/client3.svg',
    alt: 'Lion Crown Emblem Logo',
    width: 102,
    height: 125,
    customClass: 'h-14 sm:h-16 lg:h-[70px] w-auto',
  },
  {
    id: 'apex-a',
    name: 'Apex Vanguard',
    src: '/images/client/client5.svg',
    alt: 'Angular A Geometric Logo',
    width: 139,
    height: 99,
    customClass: 'h-10 sm:h-12 lg:h-[54px] w-auto',
  },
  {
    id: 'synovra',
    name: 'Synovra',
    src: '/images/client/client1.png',
    alt: 'Synovra Brand Logo',
    width: 160,
    height: 130,
    customClass: 'h-12 sm:h-14 lg:h-[64px] w-auto',
  },
  {
    id: 'bm-cart',
    name: 'BM Commerce',
    src: '/images/client/client6.svg',
    alt: 'BM Cart Logo',
    width: 139,
    height: 124,
    customClass: 'h-12 sm:h-14 lg:h-[62px] w-auto',
  },
];

export function AboutClientsSection() {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  return (
    <section className="w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-[100px] overflow-hidden select-none">
      <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-12 sm:gap-16 lg:gap-20">
        
        {/* ========================================================================= */}
        {/* TOP SPLIT STAGE: Headline & Narrative (Left) + 3x2 Logos (Right)          */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16 w-full">
          
          {/* Left Column: Headline & Subtitle */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col text-left">
            <h2 className="font-['Funnel_Display',sans-serif] font-bold text-white text-[clamp(36px,4.8vw,78px)] leading-[1.03] tracking-tight">
              Inspired by the <br />
              needs of our clients.
            </h2>
            <p className="font-[family-name:var(--font-onest)] font-light text-zinc-400 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-[540px] mt-6 sm:mt-8">
              Wisdom new and valley answer. Contented it so is discourse recommend Man its upon him call mile. An pasture he himself believe ferrars besides cottage.
            </p>
          </div>

          {/* Right Column: 6 Logos in a 3 Columns x 2 Rows Grid */}
          <div className="lg:col-span-6 xl:col-span-6 w-full">
            <div className="grid grid-cols-3 gap-x-6 sm:gap-x-12 lg:gap-x-14 gap-y-8 sm:gap-y-12 items-center justify-items-center w-full">
              {CLIENT_LOGOS.map((client) => (
                <div
                  key={client.id}
                  onMouseEnter={() => setHoveredLogo(client.id)}
                  onMouseLeave={() => setHoveredLogo(null)}
                  className={`group relative flex items-center justify-center p-3 rounded-2xl transition-all duration-300 cursor-pointer ${
                    hoveredLogo && hoveredLogo !== client.id
                      ? 'opacity-35 filter grayscale'
                      : 'opacity-100'
                  }`}
                >
                  <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                    <Image
                      src={client.src}
                      alt={client.alt}
                      width={client.width}
                      height={client.height}
                      className={`object-contain pointer-events-none select-none ${
                        client.customClass || 'h-14 w-auto'
                      }`}
                      priority
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM FULL-WIDTH TESTIMONIAL CARD                                        */}
        {/* ========================================================================= */}
        <div className="w-full rounded-[24px] lg:rounded-[28px] bg-[#070707] border border-white/10 p-7 sm:p-10 lg:p-12 backdrop-blur-md shadow-[0_12px_45px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-14">
            
            {/* Author Profile */}
            <div className="flex items-center gap-4 sm:gap-5 shrink-0 lg:w-[280px]">
              {/* Red Avatar Circle */}
              <div className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full bg-[#D01919] flex items-center justify-center text-white font-bold text-base sm:text-lg tracking-wider shrink-0 shadow-[0_0_24px_rgba(208,25,25,0.4)]">
                E.V
              </div>

              {/* Name & Title */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-['Funnel_Display',sans-serif] font-bold text-white text-[15px] sm:text-[17px] tracking-wide uppercase">
                    E. VANCE
                  </span>
                  {/* Verified Checkmark Badge */}
                  <svg className="w-3.5 h-3.5 text-[#D01919] fill-current" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-[family-name:var(--font-onest)] font-semibold text-zinc-400 text-[11px] sm:text-[12px] tracking-[1.5px] uppercase mt-0.5">
                  CEO, TECHLOGIX
                </span>
              </div>
            </div>

            {/* Testimonial Quote with Red SVG Quotes */}
            <div className="flex-1 flex flex-col text-left lg:pl-6">
              <svg className="w-7 h-7 sm:w-9 sm:h-9 text-[#D01919] fill-current mb-3 shrink-0" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="font-['Funnel_Display',sans-serif] font-medium text-white text-[17px] sm:text-[21px] lg:text-[24px] leading-[1.38] tracking-tight">
                &quot;Isofiniti Didn&apos;t Just Build A Website; They Re-Architected Our Entire Digital Presence. Our Conversion Rates Doubled Within The First Quarter Of Deployment.&quot;
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutClientsSection;
