'use client';

import React from 'react';

export function ServiceHero() {
  return (
    <section
      className="relative w-full max-w-[1920px] mx-auto h-[912px] min-h-[912px] bg-[#efefef] text-black overflow-hidden select-none"
      data-node-id="1408:5316"
    >
      {/* ========================================================================= */}
      {/* RIGHT SIDE VIDEO SHOWCASE (Balanced size & seamless radial edge blend)   */}
      {/* ========================================================================= */}
      <div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[52vw] max-w-[880px] h-[800px] flex items-center justify-end pointer-events-none z-0"
        data-node-id="1408:5317"
        data-name="abstract-glass-prisms-forming-geometric-patterns-a-2026-01-28-04-43-42-utc 1"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 65% 50%, #000 45%, transparent 88%)",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 65% 50%, #000 45%, transparent 88%)",
        }}
      >
        <video
          src="/videos/serviceHero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover mix-blend-color-burn pointer-events-none scale-105"
        />
      </div>

      {/* ========================================================================= */}
      {/* LEFT CONTENT CONTAINER (Figma exact left=119px, top coordinates)          */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full h-full px-6 sm:px-12 lg:px-[119px] pt-[90px] lg:pt-[135px] flex flex-col justify-start items-start">
        
        {/* Category Tag: "WHAT WE BUILD" */}
        <div className="mb-4 lg:mb-6">
          <span className="font-['Funnel_Display',sans-serif] font-bold text-[14px] sm:text-[16px] text-[#D91E1E] tracking-[1.5px] uppercase">
            WHAT WE BUILD
          </span>
        </div>

        {/* Main Headline (Figma exact: font-size 94.612px, line-height 1.01, tracking -3.7845px, color #000000, width 959px) */}
        <h1
          data-node-id="1408:5335"
          className="font-['Funnel_Display',sans-serif] font-extrabold text-[#000000] text-[clamp(40px,5vw,94.612px)] leading-[1.01] tracking-[-1.5px] sm:tracking-[-2.5px] lg:tracking-[-3.7845px] max-w-[959px] [word-break:break-word]"
        >
          Technology That <br className="hidden sm:inline" />
          Moves Business <br className="hidden sm:inline" />
          Forward.
        </h1>

        {/* Sub-description (Figma exact: font-size 22px, line-height 33.564px, color rgba(0,0,0,0.5), width 639px) */}
        <p
          data-node-id="1408:5326"
          className="font-[family-name:var(--font-onest)] font-light text-[rgba(0,0,0,0.5)] text-[16px] sm:text-[19px] lg:text-[22px] leading-[26px] sm:leading-[30px] lg:leading-[33.564px] max-w-[639px] mt-6 sm:mt-8 lg:mt-[54px] [word-break:break-word]"
        >
          We combine strategy, design, engineering, AI and automation to build digital systems that solve real business problems and create room for growth.
        </p>
      </div>
    </section>
  );
}

export default ServiceHero;
