'use client';

import React from 'react';
import Link from 'next/link';

export function ConnectHero() {
  return (
    <section
      className="relative w-full h-screen min-h-[620px] max-h-[1080px] bg-[#efefef] text-black overflow-hidden select-none flex items-center"
      data-node-id="1408:15449"
    >
      {/* ========================================================================= */}
      {/* RIGHT SIDE VIDEO SHOWCASE: connectLogo.mp4 with Seamless Edge Blend       */}
      {/* ========================================================================= */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[52vw] max-w-[850px] h-[78vh] max-h-[780px] flex items-center justify-end pointer-events-none z-0"
        data-node-id="1408:15450"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 65% 50%, #000 45%, transparent 88%)",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 65% 50%, #000 45%, transparent 88%)",
        }}
      >
        <video
          src="/videos/connectLogo.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover mix-blend-color-burn pointer-events-none scale-105"
        />
      </div>

      {/* ========================================================================= */}
      {/* LEFT CONTENT CONTAINER (Exact same structure & sizing as other pages)    */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-[119px] pt-[64px] sm:pt-[72px] flex flex-col justify-center items-start">
        
        {/* Category Tag: "LET'S TALK" */}
        <div className="mb-3 lg:mb-4">
          <span className="font-['Funnel_Display',sans-serif] font-bold text-[13px] sm:text-[15px] text-[#D91E1E] tracking-[1.5px] uppercase">
            LET&apos;S TALK
          </span>
        </div>

        {/* Main Headline */}
        <h1
          data-node-id="1408:15452"
          className="font-['Funnel_Display',sans-serif] font-extrabold text-[#000000] text-[clamp(36px,4.4vw,84px)] leading-[1.03] tracking-[-1.5px] sm:tracking-[-2px] lg:tracking-[-3.2px] max-w-[900px] [word-break:break-word]"
        >
          Have Something <br className="hidden sm:inline" />
          Worth Building?
        </h1>

        {/* Sub-description */}
        <p
          data-node-id="1408:15451"
          className="font-[family-name:var(--font-onest)] font-light text-[rgba(0,0,0,0.55)] text-[clamp(14px,1.25vw,19.5px)] leading-[1.5] max-w-[620px] mt-4 sm:mt-5 lg:mt-6 [word-break:break-word]"
        >
          Whether you&apos;re starting something new, improving an existing system, or looking for a smarter way to operate — we&apos;d like to hear about it.
        </p>

        {/* Primary CTA Button: START A CONVERSATION ↗ */}
        <div className="mt-6 sm:mt-8 lg:mt-8">
          <a
            href="#direct-channels"
            className="w-[230px] sm:w-[260px] lg:w-[280px] h-[46px] sm:h-[50px] rounded-[4px] bg-[#D91E1E] hover:bg-[#b01414] text-white font-[family-name:var(--font-onest)] font-bold text-[13px] sm:text-[15px] tracking-tight uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(217,30,30,0.3)] hover:scale-[1.02] active:scale-[0.98] no-underline"
            data-node-id="1408:15455"
          >
            <span>START A CONVERSATION</span>
            <span className="text-base font-bold">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ConnectHero;
