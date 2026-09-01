"use client";

import React, { forwardRef } from "react";

export const MobileFloatingCardsBg = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{ opacity: 0, visibility: "hidden" }}
      className="flex md:hidden absolute inset-0 pointer-events-none w-full h-full z-10 overflow-hidden"
    >
      {/* Floating Card 1 (Top-Left - 100% Stationary Background) */}
      <div className="absolute top-[13%] left-2 w-[80px] xs:w-[95px] opacity-90 rotate-[-20deg] pointer-events-none drop-shadow-xl">
        <img
          src="/images/card1.png?v=refresh"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Floating Card 2 (Top-Right - 100% Stationary Background) */}
      <div className="absolute top-[13%] -right-5 w-[80px] xs:w-[95px] opacity-90 rotate-[16deg] pointer-events-none drop-shadow-xl">
        <img
          src="/images/card2.png?v=refresh"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Floating Card 3 (Center Database & Analytics Cylinder - 100% Stationary Background) */}
      <div className="absolute top-[44%] left-1/2 -translate-x-1/2 w-[140px] xs:w-[165px] opacity-90 pointer-events-none drop-shadow-2xl animate-float-medium">
        <img
          src="/images/card3.png?v=refresh"
          alt="Data & Analytics"
          className="w-full h-auto object-contain"
        />
      </div>

    </div>
  );
});

MobileFloatingCardsBg.displayName = "MobileFloatingCardsBg";
export default MobileFloatingCardsBg;
