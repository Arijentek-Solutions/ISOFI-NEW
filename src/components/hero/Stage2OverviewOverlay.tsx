import React, { forwardRef } from "react";

interface Stage2OverviewOverlayProps {
  mousePos: { x: number; y: number };
}

const HEADLINE_WORDS = [
  "Your",
  "business",
  "has",
  "a",
  "lot",
  "going",
  "on.",
  "We",
  "make",
  "it",
  "work",
  "—",
  "together.",
];

export const Stage2OverviewOverlay = forwardRef<
  HTMLDivElement,
  Stage2OverviewOverlayProps
>(({ mousePos }, ref) => {
  return (
    <div
      ref={ref}
      style={{ visibility: "hidden" }}
      className="absolute inset-0 pointer-events-none w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[82px] [perspective:1400px]"
    >
      {/* Main Top Headline */}
      <div className="absolute top-[clamp(70px,11vh,120px)] left-[clamp(24px,4.3vw,82px)] max-w-[clamp(320px,50vw,920px)] pointer-events-auto z-20">
        <h2 className="font-['Funnel_Display',sans-serif] font-normal leading-[1.02] tracking-[-0.035em] text-[clamp(26px,3.6vw,68px)] capitalize flex flex-wrap gap-x-[0.28em] gap-y-1">
          {HEADLINE_WORDS.map((word, wIdx) => (
            <span key={wIdx} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, cIdx) => (
                <span
                  key={cIdx}
                  data-headline-char="true"
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

      {/* 3D Floating Interactive Glass Cards Canvas */}
      <div className="absolute inset-0 pointer-events-none z-10 [perspective:1400px]">
        {/* Card 1: Web / Digital Platform (-24.54 deg) */}
        <div
          data-card="1"
          style={{ opacity: 0 }}
          className="absolute left-[clamp(20px,4.5vw,90px)] bottom-[clamp(20px,5vh,70px)] w-[clamp(180px,19vw,340px)] pointer-events-none transition-filter duration-75"
        >
          <div
            style={
              {
                "--base-rot": "-24.54deg",
                transform: `translate3d(${mousePos.x * -24}px, ${
                  mousePos.y * -20
                }px, 0)`,
              } as React.CSSProperties
            }
            className="animate-float-medium transition-transform duration-500 drop-shadow-2xl"
          >
            <img
              src="/images/card1.png?v=refresh"
              alt="Digital Web Platforms"
              width={402}
              height={402}
              className="w-full h-auto object-contain pointer-events-none select-none"
            />
          </div>
        </div>

        {/* Card 2: AI Processor Chip (Center) */}
        <div
          data-card="2"
          style={{ opacity: 0 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-[clamp(25px,6vh,80px)] w-[clamp(180px,18vw,330px)] pointer-events-none transition-filter duration-75"
        >
          <div
            style={
              {
                "--base-rot": "0deg",
                transform: `translate3d(${mousePos.x * 18}px, ${
                  mousePos.y * 22
                }px, 0)`,
              } as React.CSSProperties
            }
            className="animate-float-slow transition-transform duration-500 drop-shadow-2xl"
          >
            <img
              src="/images/card2.png?v=refresh"
              alt="Intelligent AI Systems"
              width={402}
              height={402}
              className="w-full h-auto object-contain pointer-events-none select-none"
            />
          </div>
        </div>

        {/* Card 3: Database & Analytics (+15 deg) */}
        <div
          data-card="3"
          style={{ opacity: 0 }}
          className="absolute right-[clamp(20px,4.5vw,90px)] top-[clamp(70px,11vh,130px)] w-[clamp(200px,21vw,360px)] pointer-events-none transition-filter duration-75"
        >
          <div
            style={
              {
                "--base-rot": "15deg",
                transform: `translate3d(${mousePos.x * -28}px, ${
                  mousePos.y * 26
                }px, 0)`,
              } as React.CSSProperties
            }
            className="animate-float-fast transition-transform duration-500 drop-shadow-2xl"
          >
            <img
              src="/images/card3.png?v=refresh"
              alt="Data Infrastructure & Metrics"
              width={434}
              height={477}
              className="w-full h-auto object-contain pointer-events-none select-none"
            />
          </div>
        </div>
      </div>

      {/* Bottom Right Supporting Narrative */}
      <div
        data-stage2-narrative
        style={{ opacity: 0, transform: "translateY(30px)" }}
        className="absolute bottom-[clamp(20px,4.5vh,65px)] right-[clamp(24px,4.3vw,82px)] max-w-[clamp(260px,25vw,480px)] text-left pointer-events-none z-20"
      >
        <p className="font-[family-name:var(--font-onest)] font-light text-[rgba(0,0,0,0.6)] text-[clamp(13px,1.15vw,21px)] leading-[clamp(18px,1.65vw,32px)]">
          From digital experiences to intelligent systems, ISOFINITI brings
          design, software, automation, and AI together to help businesses
          operate better and grow faster.
        </p>
      </div>
    </div>
  );
});

Stage2OverviewOverlay.displayName = "Stage2OverviewOverlay";
