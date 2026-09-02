'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export function AboutWhoWeAre() {
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
      className="relative w-full max-w-[1920px] mx-auto min-h-[740px] lg:min-h-[920px] bg-[#efefef] text-black overflow-hidden select-none flex flex-col justify-center items-center px-6 sm:px-12 lg:px-[82px] py-24 sm:py-28 lg:py-36"
      data-node-id="about-who-we-are"
    >
      {/* ========================================================================= */}
      {/* TOP-RIGHT BLURRED 3D ISOFINITI EMBLEM (Identical to Services section)     */}
      {/* ========================================================================= */}
      <div
        data-node-id="1408:6959"
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
        data-node-id="1408:6960"
        data-aos="fade-right"
        data-aos-delay="300"
        data-aos-duration="1000"
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
      {/* CENTER CONTENT: Identical Structure, Gap, and Typography to Services      */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[960px] flex flex-col items-center text-center gap-14 sm:gap-20 md:gap-24 lg:gap-32 px-4">
        {/* Headline with Category Eyebrow */}
        <div 
          className="flex flex-col items-center gap-3 sm:gap-4"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <span
            data-node-id="1408:6952"
            className="font-['Funnel_Display',sans-serif] font-bold text-[14px] sm:text-[16px] text-[#D91E1E] tracking-[1.5px] uppercase"
          >
            WHO WE ARE
          </span>
          <h2
            data-node-id="1408:6949"
            className="font-['Funnel_Display',sans-serif] font-extrabold text-[#000000] text-[clamp(32px,4.4vw,74px)] leading-[1.03] tracking-[-1.2px] sm:tracking-[-2px] lg:tracking-[-3px] text-center max-w-[860px] [word-break:break-word]"
          >
            We&apos;re Not Just A Software Company.
          </h2>
        </div>

        {/* Narrative Statement (Identical size and line-height to Services paragraph) */}
        <p
          data-node-id="1408:6955"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
          className="font-['Funnel_Display',sans-serif] font-normal text-[#000000]/85 text-[clamp(16px,1.7vw,27px)] leading-[1.4] sm:leading-[1.38] lg:leading-[1.35] tracking-[-0.4px] sm:tracking-[-0.6px] text-center max-w-[920px] [word-break:break-word]"
        >
          We&apos;re a multidisciplinary technology team working across design, engineering, AI and automation. We help businesses understand complicated problems, turn them into clear opportunities, and build the systems needed to move forward. From the first idea to the technology underneath it, we stay close to the problem.
        </p>
      </div>
    </section>
  );
}

export default AboutWhoWeAre;
