'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export function ContactMindSection() {
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
      className="relative w-full h-screen min-h-[620px] max-h-[1080px] bg-[#f4f4f4] text-black overflow-hidden select-none flex flex-col justify-center items-center px-6 sm:px-12 lg:px-[100px]"
      data-node-id="contact-mind-section"
    >
      {/* Top-Right Floating 3D Emblem with subtle blur */}
      <div
        data-aos="fade-left"
        data-aos-delay="200"
        data-aos-duration="1000"
        className="absolute -right-10 sm:right-4 lg:right-12 xl:right-20 top-[6%] sm:top-[10%] pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 16}px, 0)`,
        }}
      >
        <div className="rotate-[19.48deg] filter blur-[4.2px] opacity-80">
          <Image
            src="/images/isofiniti-figma-3d.png"
            alt="ISOFINITI 3D Emblem"
            width={380}
            height={360}
            className="w-[220px] sm:w-[300px] lg:w-[360px] h-auto object-contain"
          />
        </div>
      </div>

      {/* Bottom-Left Floating 3D Emblem with subtle blur */}
      <div
        data-aos="fade-right"
        data-aos-delay="300"
        data-aos-duration="1000"
        className="absolute -left-12 sm:left-4 lg:left-12 xl:left-20 bottom-[6%] sm:bottom-[10%] pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -24}px, ${mousePos.y * -18}px, 0)`,
        }}
      >
        <div className="rotate-[-27.5deg] filter blur-[6px] opacity-75">
          <Image
            src="/images/isofiniti-figma-3d.png"
            alt="ISOFINITI 3D Emblem"
            width={460}
            height={440}
            className="w-[240px] sm:w-[340px] lg:w-[400px] h-auto object-contain"
          />
        </div>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto flex flex-col items-center text-center">
        {/* Main Headline */}
        <h2
          data-node-id="1408:15481"
          data-aos="fade-up"
          data-aos-duration="800"
          className="font-['Funnel_Display',sans-serif] font-extrabold text-black text-[clamp(34px,4.8vw,78px)] leading-[1.02] tracking-tight uppercase max-w-[1050px]"
        >
          TELL US WHAT&apos;S ON <br className="hidden sm:inline" />
          YOUR MIND.
        </h2>

        {/* Narrative Paragraph */}
        <div
          data-node-id="1408:15484"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
          className="font-[family-name:var(--font-onest)] font-normal text-black/70 text-[clamp(15px,1.65vw,25px)] leading-[1.4] max-w-[960px] mt-8 sm:mt-10 lg:mt-12 flex flex-col gap-1.5"
        >
          <p>You don&apos;t need to have everything figured out before reaching out.</p>
          <p>Tell us what you&apos;re trying to build, what&apos;s not working, or where you see an opportunity.</p>
          <p className="font-semibold text-black mt-1">We&apos;ll figure out the next step together.</p>
        </div>
      </div>
    </section>
  );
}

export default ContactMindSection;
