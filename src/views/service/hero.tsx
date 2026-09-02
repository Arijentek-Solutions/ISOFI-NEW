'use client';

import React from 'react';

export function ServiceHero() {
  return (
    <section
      className="relative w-full min-h-0 lg:h-screen lg:min-h-[620px] lg:max-h-[1080px] bg-[#efefef] text-black overflow-hidden select-none flex flex-col lg:flex-row items-center justify-start lg:justify-center pt-[84px] sm:pt-[96px] pb-2 sm:pb-6 lg:py-0"
      data-node-id="1408:5316"
    >
      {/* ========================================================================= */}
      {/* LEFT CONTENT CONTAINER (Clean responsive spacing on mobile & desktop)    */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-[119px] flex flex-col justify-center items-start lg:pt-[72px]">
        
        {/* Category Tag: "WHAT WE BUILD" */}
        <div 
          className="mb-3 lg:mb-4"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="700"
        >
          <span className="font-['Funnel_Display',sans-serif] font-bold text-[13px] sm:text-[15px] text-[#D91E1E] tracking-[1.5px] uppercase">
            WHAT WE BUILD
          </span>
        </div>

        {/* Main Headline */}
        <h1
          data-node-id="1408:5335"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
          className="font-['Funnel_Display',sans-serif] font-extrabold text-[#000000] text-[clamp(36px,4.4vw,84px)] leading-[1.03] tracking-[-1.5px] sm:tracking-[-2px] lg:tracking-[-3.2px] max-w-[900px] [word-break:break-word]"
        >
          Technology That <br className="hidden sm:inline" />
          Moves Business <br className="hidden sm:inline" />
          Forward.
        </h1>

        {/* Sub-description */}
        <p
          data-node-id="1408:5326"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="800"
          className="font-[family-name:var(--font-onest)] font-light text-[rgba(0,0,0,0.55)] text-[clamp(14px,1.25vw,19.5px)] leading-[1.5] max-w-[620px] mt-3 sm:mt-5 lg:mt-6 [word-break:break-word]"
        >
          We combine strategy, design, engineering, AI and automation to build digital systems that solve real business problems and create room for growth.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* VIDEO SHOWCASE (Under content on mobile, right side on desktop)          */}
      {/* ========================================================================= */}
      <div 
        className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full sm:w-[85vw] lg:w-[60vw] max-w-[450px] sm:max-w-[580px] lg:max-w-[1100px] h-[260px] sm:h-[360px] lg:h-[88vh] lg:max-h-[900px] flex items-center justify-center lg:justify-end pointer-events-none z-0 -mt-2 sm:mt-2 lg:mt-0 overflow-visible"
        data-node-id="1408:5317"
        data-name="abstract-glass-prisms-forming-geometric-patterns-a-2026-01-28-04-43-42-utc 1"
        data-aos="fade-left"
        data-aos-delay="400"
        data-aos-duration="1000"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 55% at 50% 50%, #000 20%, rgba(0,0,0,0.85) 42%, rgba(0,0,0,0.2) 60%, transparent 72%)",
          maskImage:
            "radial-gradient(ellipse 65% 55% at 50% 50%, #000 20%, rgba(0,0,0,0.85) 42%, rgba(0,0,0,0.2) 60%, transparent 72%)",
        }}
      >
        <video
          src="/videos/serviceHero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain mix-blend-multiply brightness-[1.18] contrast-[1.12] pointer-events-none scale-110 sm:scale-115 lg:scale-120"
        />
      </div>
    </section>
  );
}

export default ServiceHero;
