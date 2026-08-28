"use client";

import React, { forwardRef } from "react";
import { InteractiveTravelCard } from "@/components/ui/3d-card";

interface Stage3ServicesOverlayProps {
  mousePos?: { x: number; y: number };
  phase?: 1 | 2;
}

const STAGE3_WORDS = [
  "Built",
  "around",
  "what",
  "your",
  "business",
  "needs.",
];

const PHASE_1_CARDS = [
  {
    id: 1,
    title: "UI/UX DESIGN\n& 3D\nVISUALIZATION",
    description: "Improved user retention\nand high-impact visual\nstorytelling.",
  },
  {
    id: 2,
    title: "FULL-STACK\nWEB &\nPLATFORMS",
    description: "High-performance reactive\nfrontends and robust cloud\narchitectures.",
  },
  {
    id: 3,
    title: "AI & WORKFLOW\nAUTOMATION",
    description: "Intelligent autonomous\nagents and custom AI\npipeline integrations.",
  },
];

const PHASE_2_CARDS = [
  {
    id: 4,
    title: "MOBILE APP\nECOSYSTEMS",
    description: "Native iOS and Android\napps engineered for speed\nand conversion.",
  },
  {
    id: 5,
    title: "CLOUD INFRA &\nDEVOPS",
    description: "Resilient microservices\nand automated CI/CD\ncloud architecture.",
  },
  {
    id: 6,
    title: "GROWTH &\nPERFORMANCE",
    description: "Data-driven product\noptimization and real-time\nconversion analytics.",
  },
];

export const Stage3ServicesOverlay = forwardRef<
  HTMLDivElement,
  Stage3ServicesOverlayProps
>(({ mousePos = { x: 0, y: 0 }, phase = 1 }, ref) => {
  const isPhase1 = phase === 1;

  return (
    <div
      ref={ref}
      style={{ visibility: "hidden" }}
      className="absolute inset-0 pointer-events-none w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[82px] z-30"
    >
      {/* Main Stage 3 Headline */}
      <div className="absolute top-[clamp(70px,11vh,120px)] left-[clamp(24px,5vw,90px)] max-w-[clamp(320px,52vw,927px)] pointer-events-auto z-20">
        <h2 className="font-['Funnel_Display',sans-serif] font-normal leading-[1.01] tracking-[-0.04em] text-[clamp(28px,4.2vw,80px)] capitalize flex flex-wrap gap-x-[0.28em] gap-y-1">
          {STAGE3_WORDS.map((word, wIdx) => (
            <span key={wIdx} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, cIdx) => (
                <span
                  key={cIdx}
                  data-stage3-char="true"
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

      {/* 3 Contained 3D Crystal Card Columns - Elevated for Optimal Center Harmony */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Slot 1 (Left) */}
        <div
          data-stage3-slot="1"
          style={{ opacity: 0 }}
          className="absolute left-[clamp(20px,5vw,90px)] bottom-[clamp(100px,18vh,220px)] w-[clamp(270px,27vw,360px)] h-[320px] sm:h-[350px] pointer-events-auto [perspective:1400px]"
        >
          <div className="relative w-full h-full [transform-style:preserve-3d] pointer-events-auto">
            {/* Phase 1: Card 1 */}
            <div
              data-card-layer="1-p1"
              className={`absolute inset-0 w-full h-full transition-none ${
                isPhase1 ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <InteractiveTravelCard
                title={PHASE_1_CARDS[0].title}
                description={PHASE_1_CARDS[0].description}
                className="w-full h-full"
              />
            </div>

            {/* Phase 2: Card 4 */}
            <div
              data-card-layer="1-p2"
              className={`absolute inset-0 w-full h-full transition-none ${
                !isPhase1 ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <InteractiveTravelCard
                title={PHASE_2_CARDS[0].title}
                description={PHASE_2_CARDS[0].description}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Slot 2 (Center) */}
        <div
          data-stage3-slot="2"
          style={{ opacity: 0 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-[clamp(100px,18vh,220px)] w-[clamp(270px,27vw,360px)] h-[320px] sm:h-[350px] pointer-events-auto [perspective:1400px]"
        >
          <div className="relative w-full h-full [transform-style:preserve-3d] pointer-events-auto">
            {/* Phase 1: Card 2 */}
            <div
              data-card-layer="2-p1"
              className={`absolute inset-0 w-full h-full transition-none ${
                isPhase1 ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <InteractiveTravelCard
                title={PHASE_1_CARDS[1].title}
                description={PHASE_1_CARDS[1].description}
                className="w-full h-full"
              />
            </div>

            {/* Phase 2: Card 5 */}
            <div
              data-card-layer="2-p2"
              className={`absolute inset-0 w-full h-full transition-none ${
                !isPhase1 ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <InteractiveTravelCard
                title={PHASE_2_CARDS[1].title}
                description={PHASE_2_CARDS[1].description}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Slot 3 (Right) */}
        <div
          data-stage3-slot="3"
          style={{ opacity: 0 }}
          className="absolute right-[clamp(20px,5vw,90px)] bottom-[clamp(100px,18vh,220px)] w-[clamp(270px,27vw,360px)] h-[320px] sm:h-[350px] pointer-events-auto [perspective:1400px]"
        >
          <div className="relative w-full h-full [transform-style:preserve-3d] pointer-events-auto">
            {/* Phase 1: Card 3 */}
            <div
              data-card-layer="3-p1"
              className={`absolute inset-0 w-full h-full transition-none ${
                isPhase1 ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <InteractiveTravelCard
                title={PHASE_1_CARDS[2].title}
                description={PHASE_1_CARDS[2].description}
                className="w-full h-full"
              />
            </div>

            {/* Phase 2: Card 6 */}
            <div
              data-card-layer="3-p2"
              className={`absolute inset-0 w-full h-full transition-none ${
                !isPhase1 ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <InteractiveTravelCard
                title={PHASE_2_CARDS[2].title}
                description={PHASE_2_CARDS[2].description}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Stage3ServicesOverlay.displayName = "Stage3ServicesOverlay";
export default Stage3ServicesOverlay;
