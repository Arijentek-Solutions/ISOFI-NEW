'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function GoodThingsSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      className="relative w-full h-screen min-h-[620px] max-h-[1080px] bg-black text-white overflow-hidden select-none flex flex-col justify-center items-center px-6 sm:px-12 lg:px-[82px]"
      data-node-id="good-things-section"
    >
      {/* Top-Right Blurred 3D Emblem */}
      <div
        className="absolute -right-16 sm:-right-8 lg:right-6 xl:right-12 top-[6%] sm:top-[8%] pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * 20}px, 0)`,
        }}
      >
        <div className="rotate-[19.48deg] filter blur-[4.2px] drop-shadow-[0_20px_50px_rgba(255,255,255,0.08)]">
          <div className="w-[220px] xs:w-[280px] sm:w-[340px] lg:w-[420px] h-auto">
            <Image
              src="/images/isofiniti-figma-3d.png"
              alt="ISOFINITI 3D Glass Emblem"
              width={452}
              height={428}
              priority
              className="w-full h-auto object-contain pointer-events-none select-none opacity-90"
            />
          </div>
        </div>
      </div>

      {/* Bottom-Left Blurred 3D Emblem */}
      <div
        className="absolute -left-20 sm:-left-10 lg:left-6 xl:left-12 bottom-[6%] sm:bottom-[8%] pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -28}px, ${mousePos.y * -22}px, 0)`,
        }}
      >
        <div className="rotate-[-27.5deg] filter blur-[7.1px] drop-shadow-[0_20px_50px_rgba(255,255,255,0.08)]">
          <div className="w-[240px] xs:w-[300px] sm:w-[380px] lg:w-[480px] h-auto">
            <Image
              src="/images/isofiniti-figma-3d.png"
              alt="ISOFINITI 3D Glass Emblem"
              width={565}
              height={535}
              priority
              className="w-full h-auto object-contain pointer-events-none select-none opacity-85"
            />
          </div>
        </div>
      </div>

      {/* Background Soft Central Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/[0.04] rounded-full blur-[150px] pointer-events-none" />

      {/* Center Content */}
      <div className="relative z-10 w-full max-w-[1100px] flex flex-col items-center text-center">
        {/* Headline */}
        <h2
          data-node-id="1408:15540"
          className="font-['Funnel_Display',sans-serif] font-extrabold text-white text-[clamp(36px,5.4vw,86px)] leading-[1.01] tracking-[-1.5px] sm:tracking-[-2.8px] lg:tracking-[-3.46px] text-center max-w-[1000px] [word-break:break-word]"
        >
          Good Things Start With A Conversation.
        </h2>

        {/* Subtitle */}
        <p
          data-node-id="1408:15541"
          className="font-[family-name:var(--font-onest)] font-normal text-white/50 text-[clamp(15px,1.35vw,24px)] leading-[1.5] sm:leading-[1.55] text-center max-w-[700px] mt-4 sm:mt-5 mb-10 sm:mb-12"
        >
          Let&apos;s explore what&apos;s possible.
        </p>

        {/* Dual Call To Action Buttons */}
        <div
          data-node-id="1408:15542"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-[680px]"
        >
          {/* Primary CTA: START A PROJECT ↗ */}
          <a
            href="#direct-channels"
            className="w-full sm:w-[280px] lg:w-[310px] h-[56px] sm:h-[60px] rounded-[4px] bg-[rgba(255,255,255,0.92)] hover:bg-white text-black font-[family-name:var(--font-onest)] font-bold text-[15px] sm:text-[17px] tracking-tight uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.12)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.22)] hover:scale-[1.02] active:scale-[0.98] no-underline"
            data-node-id="1408:15545"
          >
            <span>START A PROJECT</span>
            <span className="text-base font-bold">↗</span>
          </a>

          {/* Secondary CTA: TALK TO US */}
          <a
            href="#direct-channels"
            className="w-full sm:w-[280px] lg:w-[310px] h-[56px] sm:h-[60px] rounded-[4px] bg-transparent hover:bg-white/[0.08] text-white border border-white/80 hover:border-white font-[family-name:var(--font-onest)] font-bold text-[15px] sm:text-[17px] tracking-tight uppercase flex items-center justify-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] no-underline"
            data-node-id="1408:15548"
          >
            TALK TO US
          </a>
        </div>
      </div>
    </section>
  );
}

export default GoodThingsSection;
