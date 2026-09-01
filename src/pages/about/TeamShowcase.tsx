'use client';

import React from 'react';
import Image from 'next/image';

export function TeamShowcase() {
  return (
    <section
      className="relative w-full max-w-[1920px] mx-auto bg-[#efefef] text-black overflow-hidden select-none px-6 sm:px-12 lg:px-[82px] py-20 sm:py-28 lg:py-36 flex flex-col justify-center items-center"
      data-node-id="team-showcase"
    >
      {/* 5-Portrait Fan Deck Showcase */}
      <div className="relative w-full max-w-[1000px] h-[340px] xs:h-[440px] sm:h-[540px] lg:h-[620px] flex items-center justify-center">
        <Image
          src="/images/about-team.png"
          alt="ISOFINITI Team Fan Deck"
          width={1575}
          height={730}
          priority
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
        />
      </div>

      {/* Role / Tag */}
      <div className="mt-8 sm:mt-12 text-center flex flex-col items-center">
        <span
          data-node-id="1408:7073"
          className="font-[family-name:var(--font-chakra)] font-bold text-[18px] sm:text-[22px] lg:text-[26px] text-[#D91E1E] tracking-[2px] uppercase"
        >
          UI/UX Designer
        </span>

        {/* Humorous / Insightful Bio Tagline */}
        <p
          data-node-id="1408:7072"
          className="font-[family-name:var(--font-onest)] font-normal text-black/75 text-[16px] sm:text-[20px] lg:text-[26px] leading-relaxed text-center mt-3 max-w-[700px]"
        >
          Will detect a 1px misalignment from across the room.
        </p>
      </div>
    </section>
  );
}

export default TeamShowcase;
