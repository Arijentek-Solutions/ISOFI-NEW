import React, { forwardRef } from "react";

const STAGE4_WORDS = [
  "From",
  "Complex",
  "Problems",
  "To",
  "Working",
  "Systems.",
];

export const Stage4SystemsOverlay = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{ visibility: "hidden" }}
      className="absolute inset-0 pointer-events-none w-full max-w-[1920px] mx-auto px-4 sm:px-10 md:px-16 lg:px-[82px] flex items-center justify-center z-20 transition-transform duration-300 overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* MOBILE SCREEN LAYOUT (md:hidden) — Pure Content Layer (BG is persistent) */}
      {/* ========================================================================= */}
      <div className="flex md:hidden flex-col items-center justify-center text-center w-full h-full pt-8 pb-8 px-4 relative z-20 pointer-events-auto overflow-hidden">
        {/* Centered Headline (Moved ~3cm up to clear Card 3 cylinder) */}
        <div className="w-full max-w-[340px] z-20 mb-10 -mt-14">
          <h2 className="font-['Funnel_Display',sans-serif] font-bold text-black text-[25px] xs:text-[29px] leading-[1.2] tracking-tight text-center">
            {STAGE4_WORDS.map((word, wIdx) => (
              <span key={wIdx} className="inline-flex whitespace-nowrap mr-[0.25em]">
                {word.split("").map((char, cIdx) => (
                  <span
                    key={cIdx}
                    data-stage4-char="true"
                    style={{
                      opacity: 0,
                      transform: "scale(1.22)",
                      display: "inline-block",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>

        {/* Spacer for Persistent Background Center Card 3 */}
        <div className="w-[130px] xs:w-[155px] h-[130px] xs:h-[155px] my-2 z-20 pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* PC / DESKTOP SCREEN LAYOUT (hidden md:flex) — 100% UNTOUCHED */}
      {/* ========================================================================= */}
      <div className="hidden md:flex max-w-[1280px] w-full text-center pointer-events-none items-center justify-center">
        <h2 className="font-['Funnel_Display',sans-serif] font-normal leading-[1.01] tracking-[-0.04em] text-[clamp(32px,5.0vw,94.6px)] uppercase flex flex-wrap justify-center gap-x-[0.28em] gap-y-1">
          {STAGE4_WORDS.map((word, wIdx) => (
            <span key={wIdx} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, cIdx) => (
                <span
                  key={cIdx}
                  data-stage4-char="true"
                  style={{
                    opacity: 0,
                    transform: "scale(1.22)",
                    display: "inline-block",
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
});

Stage4SystemsOverlay.displayName = "Stage4SystemsOverlay";
