'use client';

import React from 'react';
import Link from 'next/link';

export function AboutHero() {
  return (
    <section
      className="relative w-full h-screen min-h-[620px] max-h-[1080px] bg-[#efefef] text-black overflow-hidden select-none flex items-center"
      data-node-id="1408:6914"
    >
      {/* ========================================================================= */}
      {/* RIGHT SIDE VIDEO SHOWCASE: 3D Looping Fluid Glass Motion                 */}
      {/* ========================================================================= */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[52vw] max-w-[850px] h-[78vh] max-h-[780px] flex items-center justify-end pointer-events-none z-0"
        data-node-id="1408:6915"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 65% 50%, #000 45%, transparent 88%)",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 65% 50%, #000 45%, transparent 88%)",
        }}
      >
        <video
          src="/videos/aboutHero.mp4"
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
          data-node-id="1408:6917"
          className="font-['Funnel_Display',sans-serif] font-extrabold text-[#000000] text-[clamp(36px,4.4vw,84px)] leading-[1.03] tracking-[-1.5px] sm:tracking-[-2px] lg:tracking-[-3.2px] max-w-[900px] [word-break:break-word]"
        >
          We Build What <br className="hidden sm:inline" />
          Comes Next.
        </h1>

        {/* Sub-description */}
        <div
          data-node-id="1408:6916"
          className="font-[family-name:var(--font-onest)] font-light text-[rgba(0,0,0,0.55)] text-[clamp(14px,1.25vw,19.5px)] leading-[1.5] max-w-[620px] mt-4 sm:mt-5 lg:mt-6 [word-break:break-word] flex flex-col gap-2.5"
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
          className="flex flex-row items-center gap-3.5 sm:gap-5 mt-6 sm:mt-8 lg:mt-8 flex-wrap"
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
    </section>
  );
}

export default AboutHero;
