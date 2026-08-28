import React, { forwardRef } from "react";

const STAGE4_WORDS = [
  "From",
  "complex",
  "problems",
  "to",
  "working",
  "systems.",
];

export const Stage4SystemsOverlay = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{ visibility: "hidden" }}
      className="absolute inset-0 pointer-events-none w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[82px] flex items-center justify-center z-20 transition-transform duration-300"
    >
      <div className="max-w-[1280px] w-full text-center pointer-events-none">
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
