'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export function IdeaToIntelligentSystem() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle smooth parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      className="relative w-full max-w-[1920px] mx-auto min-h-[740px] lg:min-h-[920px] bg-[#efefef] text-black overflow-hidden select-none flex flex-col justify-center items-center px-6 sm:px-12 lg:px-[82px] py-24 sm:py-28 lg:py-36"
      data-node-id="service-idea-to-system"
    >
      {/* ========================================================================= */}
      {/* TOP-RIGHT BLURRED 3D ISOFINITI EMBLEM (Figma: rot 19.48deg, blur 4.2px)  */}
      {/* ========================================================================= */}
      <div
        data-node-id="1408:5441"
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
      {/* LEFT BLURRED 3D ISOFINITI EMBLEM (Figma: rot -27.5deg, blur 7.1px)        */}
      {/* ========================================================================= */}
      <div
        data-node-id="1408:5443"
        className="absolute -left-28 sm:-left-20 md:-left-10 lg:-left-6 xl:left-0 top-[310px] sm:top-[360px] lg:top-[400px] pointer-events-none z-0 transition-transform duration-700 ease-out"
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
      {/* CENTER CONTENT: Balanced Heading + Refined Gap + Paragraph                */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[960px] flex flex-col items-center text-center gap-14 sm:gap-20 md:gap-24 lg:gap-32 px-4">
        {/* Balanced Headline Size */}
        <h2
          data-node-id="1408:5366"
          className="font-['Funnel_Display',sans-serif] font-extrabold text-[#000000] text-[clamp(32px,4.4vw,74px)] leading-[1.03] tracking-[-1.2px] sm:tracking-[-2px] lg:tracking-[-3px] text-center max-w-[860px] [word-break:break-word]"
        >
          From Idea To Intelligent System.
        </h2>

        {/* Balanced Paragraph Size */}
        <p
          data-node-id="1408:5373"
          className="font-['Funnel_Display',sans-serif] font-normal text-[#000000]/85 text-[clamp(16px,1.7vw,27px)] leading-[1.4] sm:leading-[1.38] lg:leading-[1.35] tracking-[-0.4px] sm:tracking-[-0.6px] text-center max-w-[920px] [word-break:break-word]"
        >
          Whether you&apos;re creating something new, improving what already exists, or automating the way your business operates, we bring the right combination of design and technology to the problem.
        </p>
      </div>
    </section>
  );
}

export default IdeaToIntelligentSystem;
