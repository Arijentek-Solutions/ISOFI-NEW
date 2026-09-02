'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export function StartWithTheProblem() {
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
      className="relative w-full max-w-[1920px] mx-auto min-h-[820px] lg:min-h-[1000px] bg-[#efefef] text-black overflow-hidden select-none px-6 sm:px-12 lg:px-[82px] py-28 sm:py-36 lg:py-48 flex flex-col justify-center items-center"
      data-node-id="start-with-the-problem"
    >
      {/* ========================================================================= */}
      {/* TOP-RIGHT BLURRED 3D ISOFINITI EMBLEM (Identical to Services section)     */}
      {/* ========================================================================= */}
      <div
        data-node-id="1408:6961"
        data-aos="fade-left"
        data-aos-delay="200"
        data-aos-duration="1000"
        className="absolute -right-24 sm:-right-16 md:-right-8 lg:-right-4 xl:right-2 top-[30px] sm:top-[50px] lg:top-[70px] pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 22}px, ${mousePos.y * 18}px, 0)`,
        }}
      >
        <div className="rotate-[19.48deg] filter blur-[4.2px] drop-shadow-2xl">
          <div className="w-[240px] xs:w-[300px] sm:w-[380px] lg:w-[430px] h-auto">
            <Image
              src="/images/isofiniti-figma-3d.png"
              alt="ISOFINITI 3D Glass Emblem"
              width={452}
              height={428}
              priority
              className="w-full h-auto object-contain pointer-events-none select-none opacity-95"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEFT BLURRED 3D ISOFINITI EMBLEM (Identical to Services section)          */}
      {/* ========================================================================= */}
      <div
        data-node-id="1408:6962"
        data-aos="fade-right"
        data-aos-delay="300"
        data-aos-duration="1000"
        className="absolute -left-28 sm:-left-20 md:-left-10 lg:-left-6 xl:left-0 bottom-[80px] sm:bottom-[120px] pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -26}px, ${mousePos.y * -20}px, 0)`,
        }}
      >
        <div className="rotate-[-27.5deg] filter blur-[7.1px] drop-shadow-2xl">
          <div className="w-[280px] xs:w-[350px] sm:w-[450px] lg:w-[520px] h-auto">
            <Image
              src="/images/isofiniti-figma-3d.png"
              alt="ISOFINITI 3D Glass Emblem"
              width={565}
              height={535}
              priority
              className="w-full h-auto object-contain pointer-events-none select-none opacity-90"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CENTER CONTENT: Flanking Quotes + Main Headline                           */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[960px] flex flex-col items-center text-center px-4">
        <div className="w-full flex flex-col items-center relative">
          {/* Left Quote Above */}
          <div 
            className="w-full flex justify-start pl-2 sm:pl-6 lg:pl-10 mb-4 sm:mb-6"
            data-aos="fade-right"
            data-aos-duration="750"
          >
            <p
              data-node-id="1408:6956"
              className="font-['Funnel_Display',sans-serif] font-medium text-[#adadad] text-[clamp(16px,1.8vw,28px)] tracking-[-0.5px] sm:tracking-[-1px] italic select-none"
            >
              “What technology should we use?”
            </p>
          </div>

          {/* Center Eyebrow & Main Headline (Exact Same Size as Who We Are) */}
          <div 
            className="flex flex-col items-center gap-3 sm:gap-4 my-3 sm:my-5"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <span
              data-node-id="1408:6954"
              className="font-['Funnel_Display',sans-serif] font-bold text-[14px] sm:text-[16px] text-[#D91E1E] tracking-[1.5px] uppercase"
            >
              HOW WE THINK
            </span>

            <h2
              data-node-id="1408:6950"
              className="font-['Funnel_Display',sans-serif] font-extrabold text-black text-[clamp(32px,4.4vw,74px)] leading-[1.03] tracking-[-1.2px] sm:tracking-[-2px] lg:tracking-[-3px] uppercase max-w-[860px] [word-break:break-word]"
            >
              START WITH THE PROBLEM.
            </h2>
          </div>

          {/* Right Quote Below */}
          <div 
            className="w-full flex justify-end pr-2 sm:pr-6 lg:pr-10 mt-4 sm:mt-6"
            data-aos="fade-left"
            data-aos-duration="750"
          >
            <p
              data-node-id="1408:6957"
              className="font-['Funnel_Display',sans-serif] font-medium text-[#adadad] text-[clamp(16px,1.8vw,28px)] tracking-[-0.5px] sm:tracking-[-1px] italic select-none"
            >
              “What needs to work better?”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StartWithTheProblem;
