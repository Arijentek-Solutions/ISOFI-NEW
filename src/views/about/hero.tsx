'use client';

import React from 'react';
import Link from 'next/link';

export function AboutHero() {
  return (
    <section
      className="relative w-full min-h-0 lg:h-screen lg:min-h-[620px] lg:max-h-[1080px] bg-[#efefef] text-black overflow-hidden select-none flex flex-col lg:flex-row items-center justify-start lg:justify-center pt-[84px] sm:pt-[96px] pb-2 sm:pb-6 lg:py-0"
      data-node-id="1408:6914"
    >
      {/* ========================================================================= */}
      {/* LEFT CONTENT CONTAINER (Clean responsive spacing on mobile & desktop)    */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-[119px] flex flex-col justify-center items-start lg:pt-[72px]">
        {/* Main Headline */}
        <h1
          data-node-id="1408:6917"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
          className="font-['Funnel_Display',sans-serif] font-extrabold text-[#000000] text-[clamp(36px,4.4vw,84px)] leading-[1.03] tracking-[-1.5px] sm:tracking-[-2px] lg:tracking-[-3.2px] max-w-[900px] [word-break:break-word]"
        >
          We Build What <br className="hidden sm:inline" />
          Comes Next.
        </h1>

        {/* Sub-description */}
        <div
          data-node-id="1408:6916"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="800"
          className="font-[family-name:var(--font-onest)] font-light text-[rgba(0,0,0,0.55)] text-[clamp(14px,1.25vw,19.5px)] leading-[1.5] max-w-[620px] mt-3 sm:mt-5 lg:mt-6 [word-break:break-word] flex flex-col gap-2.5"
        >
          <p>
            ISOFINITI is a technology and digital systems company helping businesses turn complex ideas into products, platforms and intelligent systems.
          </p>
          <p>
            We bring together design, engineering, AI and automation to build technology that works in the real world.
          </p>
        </div>

        {/* Dual Call To Action Buttons (Side-by-Side Horizontal Row) */}
        <div
          data-node-id="1408:6918"
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="800"
          className="flex flex-row items-center gap-3.5 sm:gap-5 mt-5 sm:mt-8 lg:mt-8 flex-wrap"
        >
          {/* Primary CTA: START A PROJECT ↗ */}
          <Link
            href="/contact"
            className="w-[190px] sm:w-[230px] lg:w-[255px] h-[46px] sm:h-[50px] rounded-[4px] bg-[#D91E1E] hover:bg-[#b01414] text-white font-[family-name:var(--font-onest)] font-bold text-[13px] sm:text-[15px] tracking-tight uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(217,30,30,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            data-node-id="1408:6919"
          >
            <span>START A PROJECT</span>
            <span className="text-base font-bold">↗</span>
          </Link>

          {/* Secondary CTA: TALK TO US */}
          <Link
            href="/contact"
            className="w-[170px] sm:w-[210px] lg:w-[240px] h-[46px] sm:h-[50px] rounded-[4px] bg-transparent hover:bg-black/[0.04] text-black border border-black font-[family-name:var(--font-onest)] font-bold text-[13px] sm:text-[15px] tracking-tight uppercase flex items-center justify-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            data-node-id="1408:6922"
          >
            TALK TO US
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIDEO SHOWCASE (Under content on mobile, right side on desktop)          */}
      {/* ========================================================================= */}
      <div
        className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full sm:w-[85vw] lg:w-[60vw] max-w-[450px] sm:max-w-[580px] lg:max-w-[1100px] h-[260px] sm:h-[360px] lg:h-[88vh] lg:max-h-[900px] flex items-center justify-center lg:justify-end pointer-events-none z-0 -mt-2 sm:mt-2 lg:mt-0 overflow-visible"
        data-node-id="1408:6915"
        data-aos="fade-left"
        data-aos-delay="450"
        data-aos-duration="1000"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 55% at 50% 50%, #000 20%, rgba(0,0,0,0.85) 42%, rgba(0,0,0,0.2) 60%, transparent 72%)",
          maskImage:
            "radial-gradient(ellipse 65% 55% at 50% 50%, #000 20%, rgba(0,0,0,0.85) 42%, rgba(0,0,0,0.2) 60%, transparent 72%)",
        }}
      >
        <video
          src="/videos/aboutHero.mp4"
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

export default AboutHero;
