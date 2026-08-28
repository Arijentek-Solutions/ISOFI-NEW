import React, { forwardRef } from "react";

export const Stage1HeroOverlay = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: "translateY(30px)" }}
      className="absolute inset-0 pointer-events-none w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[82px] py-4 lg:py-[25px] transition-opacity duration-75"
    >
      {/* Top Right Headline & Subtitle */}
      <div className="absolute top-[clamp(90px,11.6vh,126px)] right-[clamp(24px,4.3vw,82px)] w-[clamp(280px,36vw,667px)] flex flex-col items-start text-left">
        <h1 className="font-[family-name:var(--font-chakra)] font-bold text-black uppercase tracking-[clamp(0.5px,0.1vw,1.89px)] leading-[0.98] text-[clamp(34px,4.9vw,94.6px)]">
          <span className="block">Innovative</span>
          <span className="block">Tech</span>
        </h1>
        <p className="font-[family-name:var(--font-chakra)] font-medium text-black uppercase leading-[1.2] text-[clamp(16px,2.0vw,38px)] mt-[clamp(6px,0.8vw,14px)]">
          Infinite Growth.
        </p>
      </div>

      {/* Bottom Right Description Copy */}
      <div className="absolute bottom-[clamp(24px,8vh,110px)] right-[clamp(24px,4.3vw,82px)] w-[clamp(240px,22.5vw,430px)] text-left">
        <p className="font-[family-name:var(--font-onest)] font-light text-[rgba(0,0,0,0.5)] text-[clamp(12px,1.15vw,22px)] leading-[clamp(18px,1.75vw,33.56px)]">
          Intelligent Systems. Advanced digital partner. Combining brutalist
          design, full-stack architecture, and deep AI integration. Scroll
          to activate adaptive performance layers.
        </p>
      </div>
    </div>
  );
});

Stage1HeroOverlay.displayName = "Stage1HeroOverlay";
