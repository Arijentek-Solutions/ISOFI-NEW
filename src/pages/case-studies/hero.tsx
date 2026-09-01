'use client';

import React from 'react';

export function CaseStudiesHero() {
  return (
    <section
      className="relative w-full h-screen min-h-[620px] max-h-[1080px] bg-[#efefef] text-black overflow-hidden select-none flex items-center"
      data-node-id="1408:11202"
    >
      {/* ========================================================================= */}
      {/* RIGHT SIDE VIDEO SHOWCASE (3D Transforming Crystal Cubes)                 */}
      {/* ========================================================================= */}
      <div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[52vw] max-w-[850px] h-[78vh] max-h-[780px] flex items-center justify-end pointer-events-none z-0"
        data-node-id="1408:11203"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 65% 50%, #000 45%, transparent 88%)",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 65% 50%, #000 45%, transparent 88%)",
        }}
      >
        <video
          src="/videos/caseStudies.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover mix-blend-color-burn pointer-events-none scale-105"
        />
      </div>

      {/* ========================================================================= */}
      {/* LEFT CONTENT CONTAINER (Centered within 1-screen viewport)               */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-[119px] pt-[64px] sm:pt-[72px] flex flex-col justify-center items-start">
        
        {/* Main Headline */}
        <h1
          data-node-id="1408:11205"
          className="font-['Funnel_Display',sans-serif] font-extrabold text-[#000000] text-[clamp(36px,4.4vw,84px)] leading-[1.03] tracking-[-1.5px] sm:tracking-[-2px] lg:tracking-[-3.2px] max-w-[900px] [word-break:break-word]"
        >
          Ideas Built Into <br className="hidden sm:inline" />
          Real Systems.
        </h1>

        {/* Sub-description */}
        <p
          data-node-id="1408:11204"
          className="font-[family-name:var(--font-onest)] font-light text-[rgba(0,0,0,0.55)] text-[clamp(14px,1.25vw,19.5px)] leading-[1.5] max-w-[620px] mt-4 sm:mt-5 lg:mt-6 [word-break:break-word]"
        >
          We work across design, engineering, AI and automation to turn complex business problems into digital products, intelligent systems and experiences that perform.
        </p>
      </div>
    </section>
  );
}

export default CaseStudiesHero;
