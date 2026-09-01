import React from "react";

interface ScrollHintIndicatorProps {
  showScrollHint: boolean;
  activeStep: number;
  totalSteps: number;
  onScrollNext: () => void;
}

export const ScrollHintIndicator: React.FC<ScrollHintIndicatorProps> = ({
  showScrollHint,
  activeStep,
  totalSteps,
  onScrollNext,
}) => {
  const isFrameworkStage = activeStep >= 10 && activeStep <= 14;

  return (
    <div
      className={`fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-700 ease-out pointer-events-auto ${
        showScrollHint && !isFrameworkStage && activeStep < totalSteps - 1
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        onClick={onScrollNext}
        aria-label="Scroll to next section"
        className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none transition-all duration-300"
      >
        {/* Minimalist Mouse Capsule Contour */}
        <div
          className={`relative w-[20px] h-[34px] rounded-full border-[1.5px] flex items-start justify-center pt-[5px] transition-all duration-300 group-hover:scale-105 ${
            activeStep >= 6
              ? "border-white/50 group-hover:border-[#D01919] group-hover:shadow-[0_0_12px_rgba(208,25,25,0.5)]"
              : "border-zinc-700/60 group-hover:border-[#D01919] group-hover:shadow-[0_0_12px_rgba(208,25,25,0.4)]"
          }`}
        >
          {/* Vertical Animated Scroll Wheel */}
          <span
            className={`w-[2px] h-[7px] rounded-full animate-mouse-wheel transition-colors duration-300 ${
              activeStep >= 6
                ? "bg-white/90 group-hover:bg-[#D01919]"
                : "bg-zinc-700 group-hover:bg-[#D01919]"
            }`}
          />
        </div>

        {/* SCROLL MORE Typography */}
        <span
          className={`font-[family-name:var(--font-chakra)] text-[10px] sm:text-[11px] tracking-[0.24em] font-semibold uppercase transition-colors duration-300 ${
            activeStep >= 6
              ? "text-white/70 group-hover:text-white"
              : "text-zinc-500 group-hover:text-black"
          }`}
        >
          Scroll More
        </span>
      </button>
    </div>
  );
};

ScrollHintIndicator.displayName = "ScrollHintIndicator";
