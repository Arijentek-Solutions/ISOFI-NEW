import React from "react";
import { SECTION_STEPS } from "./constants";

interface HeroNavigationHUDProps {
  steps?: typeof SECTION_STEPS;
  activeStep: number;
  goToStep: (index: number) => void;
}

export const HeroNavigationHUD: React.FC<HeroNavigationHUDProps> = ({
  steps = SECTION_STEPS,
  activeStep,
  goToStep,
}) => {
  return (
    <nav
      aria-label="Section Navigation"
      className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3 pointer-events-auto select-none"
    >
      {steps.map((step, idx) => {
        const isActive = activeStep === idx;
        const isDarkBackground = activeStep >= 6;
        return (
          <button
            key={step.id}
            onClick={() => goToStep(idx)}
            aria-label={`Jump to Section ${step.num}: ${step.label}`}
            aria-current={isActive ? "step" : undefined}
            className="group flex items-center gap-2.5 py-1 px-1.5 focus:outline-none transition-all duration-300"
          >
            {/* Expandable Label on Hover or Active */}
            <span
              className={`font-[family-name:var(--font-chakra)] text-[10px] tracking-widest uppercase transition-all duration-300 ${
                isActive
                  ? isDarkBackground
                    ? "text-white font-semibold translate-x-0 opacity-100"
                    : "text-black font-semibold translate-x-0 opacity-100"
                  : isDarkBackground
                  ? "text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2"
                  : "text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2"
              }`}
            >
              {step.label}
            </span>

            {/* Step Number */}
            <span
              className={`font-[family-name:var(--font-chakra)] text-[11px] font-mono tracking-tighter transition-colors duration-300 ${
                isActive
                  ? "text-[#D01919] font-bold"
                  : isDarkBackground
                  ? "text-zinc-500 group-hover:text-zinc-200"
                  : "text-zinc-400 group-hover:text-zinc-700"
              }`}
            >
              {step.num}
            </span>

            {/* Active Indicator Bar */}
            <div
              className={`h-[3px] rounded-full transition-all duration-400 ${
                isActive
                  ? "w-7 bg-[#D01919] shadow-[0_0_8px_rgba(208,25,25,0.6)]"
                  : isDarkBackground
                  ? "w-2 bg-white/20 group-hover:w-4 group-hover:bg-white/50"
                  : "w-2 bg-zinc-300 group-hover:w-4 group-hover:bg-zinc-500"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};

HeroNavigationHUD.displayName = "HeroNavigationHUD";
