import React, { forwardRef } from "react";

export const Stage6IsofinityOverlay = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      style={{ visibility: "hidden" }}
      className="absolute inset-0 pointer-events-none w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[82px] flex items-center justify-center z-20 [perspective:1400px]"
    >
      <div className="relative flex flex-col items-center justify-center text-center pointer-events-none select-none max-w-[1100px]">

        {/* High-Resolution 3D Glass Isofinity Emblem */}
        <div
          data-stage6-logo
          className="relative w-[clamp(240px,32vw,460px)] aspect-square flex items-center justify-center drop-shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
        >
          <img
            src="/images/isofiniti.png"
            alt="ISOFINITI 3D Glass Emblem"
            width={800}
            height={800}
            className="w-full h-full object-contain pointer-events-none select-none drop-shadow-2xl"
          />
        </div>

          {/* Figma Typography Composition (Appears only after logo is fully displayed) */}
          <div
            data-stage6-text
            style={{ opacity: 0 }}
            className="flex flex-col items-center text-center -mt-8 sm:-mt-12 md:-mt-16"
          >
            {/* Primary Headline: "Design Is What You See." */}
            <h2 className="font-['Funnel_Display',sans-serif] font-bold text-black capitalize tracking-tight text-[clamp(26px,3.8vw,64px)] leading-[1.01]">
              Design Is What You See.
            </h2>

            {/* Sub-headline: "Technology Is What Makes It Move." */}
            <p className="font-['Funnel_Display',sans-serif] font-bold text-[#D01919] capitalize tracking-tight text-[clamp(17px,2.0vw,34px)] leading-[1.05] mt-2 sm:mt-2.5">
              Technology Is What Makes It Move.
            </p>

            {/* Narrative Body Copy */}
            <p className="font-[family-name:var(--font-onest)] font-light text-[rgba(0,0,0,0.7)] text-[clamp(13px,1.1vw,19px)] leading-relaxed mt-3 sm:mt-3.5 max-w-[760px]">
              We combine modern software architecture, AI, automation, data and
              infrastructure to build products that don&apos;t stop at the interface.
            </p>
          </div>
        </div>
      </div>
    );
  }
);

Stage6IsofinityOverlay.displayName = "Stage6IsofinityOverlay";
