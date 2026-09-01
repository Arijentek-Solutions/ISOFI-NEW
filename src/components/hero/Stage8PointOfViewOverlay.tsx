"use client";

import React, { forwardRef, useRef, useEffect } from "react";
import { POINT_OF_VIEW_ITEMS } from "./constants";

interface Stage8PointOfViewOverlayProps {
  activeItemIndex?: number;
}

export const Stage8PointOfViewOverlay = forwardRef<
  HTMLDivElement,
  Stage8PointOfViewOverlayProps
>(({ activeItemIndex = 0 }, ref) => {
  // Clamped target index [0, 3] from scroll timeline
  const clampedIndex = Math.max(
    0,
    Math.min(POINT_OF_VIEW_ITEMS.length - 1, activeItemIndex)
  );

  // References for continuous 3D cylinder physics & cards
  const targetIndexRef = useRef(clampedIndex);
  const currentIndexRef = useRef(clampedIndex);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Synchronize target when activeItemIndex changes from scroll
  useEffect(() => {
    targetIndexRef.current = clampedIndex;
  }, [clampedIndex]);

  // High-performance continuous 60/120fps 3D Spatial Cylinder Engine
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      // Smooth spring-lerp toward target index
      const diff = targetIndexRef.current - currentIndexRef.current;
      currentIndexRef.current += diff * 0.12;

      const currP = currentIndexRef.current;

      // Calculate continuous 3D Cylindrical Geometry for all 4 cards
      cardElementsRef.current.forEach((cardEl, idx) => {
        if (!cardEl) return;

        // Distance from current viewport apex
        let dist = idx - currP;

        // Cylindrical modular wrapping so cards orbit seamlessly
        if (dist > 2) dist -= POINT_OF_VIEW_ITEMS.length;
        if (dist < -2) dist += POINT_OF_VIEW_ITEMS.length;

        const absDist = Math.abs(dist);

        // Spatial cylinder math:
        // Angle in radians around cylinder
        const angleDeg = dist * 38; // 38 deg per step
        const angleRad = (angleDeg * Math.PI) / 180;

        // Curved orbital displacement
        const transX = Math.sin(angleRad) * 72; // Percentage offset along curve
        const transZ = (Math.cos(angleRad) - 1) * 260 - absDist * 30; // Push backward into Z-depth
        const rotY = -angleDeg * 0.92; // Angle card slightly toward viewer
        const scale = Math.max(0.65, 1 - absDist * 0.16);
        const opacity = Math.max(0, 1 - absDist * 0.52);
        const brightness = Math.max(0.4, 1 - absDist * 0.35);
        const blurPx = absDist > 0.1 ? (absDist * 0.6).toFixed(1) : "0";
        const zIndex = Math.round((1 - Math.min(1.5, absDist)) * 100);

        cardEl.style.transform = `translate3d(${transX.toFixed(
          2
        )}%, 0px, ${transZ.toFixed(1)}px) rotateY(${rotY.toFixed(
          2
        )}deg) scale(${scale.toFixed(3)})`;
        cardEl.style.opacity = opacity.toFixed(3);
        cardEl.style.zIndex = String(zIndex);
        cardEl.style.filter = `brightness(${brightness.toFixed(
          2
        )}) blur(${blurPx}px)`;
      });

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={ref}
      style={{ visibility: "hidden" }}
      className="absolute inset-0 pointer-events-none w-full h-full flex items-center justify-center z-30 [perspective:1400px] overflow-hidden"
    >
      {/* 1. Deep Atmospheric Dark Background */}
      <div className="absolute inset-0 bg-[#030303] -z-30 pointer-events-none" />

      {/* Top subtle ambient gradient for depth */}
      <div className="absolute top-0 left-0 right-0 h-[220px] bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none -z-20" />

      {/* 2. Main Stage Container Grid */}
      <div className="relative w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[82px] h-full flex flex-col justify-between pt-[100px] sm:pt-[120px] md:pt-[135px] pb-10 sm:pb-14 pointer-events-none z-10">
        
        {/* Main 2-Column Showcase Content */}
        <div className="relative w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Main Typography & Scroll Stepper Story       */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left pointer-events-none select-none z-20">
            
            {/* Master Headline */}
            <div data-pov-headline className="flex flex-col items-start mb-6 sm:mb-8 lg:mb-12">
              <h2 className="font-['Funnel_Display',sans-serif] font-medium text-white tracking-tight text-[clamp(34px,4.8vw,88px)] leading-[0.98]">
                Built With
              </h2>
              <span className="font-['Funnel_Display',sans-serif] font-medium text-[#D01919] tracking-tight text-[clamp(34px,4.8vw,88px)] leading-[0.98]">
                A Point Of View.
              </span>
            </div>

            {/* Stepper Content Stack (01 to 04) with Connected Lineage & Fluid Height Accordion */}
            <div className="relative flex flex-col gap-2 sm:gap-3 max-w-[620px] pl-2 sm:pl-3">
              {/* Continuous Vertical Rail & Active Glowing Progress Pill */}
              <div className="absolute left-0 top-3 bottom-3 w-[1px] bg-white/10 pointer-events-none rounded-full overflow-hidden">
                <div
                  className="w-full bg-[#D01919] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    height: "25%",
                    transform: `translateY(${clampedIndex * 100}%)`,
                    boxShadow: "0 0 10px rgba(208,25,25,0.8)",
                  }}
                />
              </div>

              {POINT_OF_VIEW_ITEMS.map((item, idx) => {
                const isActive = idx === clampedIndex;

                return (
                  <div
                    key={item.id}
                    className={`relative flex items-start gap-4 sm:gap-6 px-3 py-2 sm:py-2.5 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "bg-white/[0.03]" : "bg-transparent"
                    }`}
                  >
                    {/* Synchronized Morphing Number Display */}
                    <div className="shrink-0 flex items-center justify-center pt-0.5 select-none">
                      <span
                        className={`font-['Funnel_Display',sans-serif] tracking-tighter leading-[0.9] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? "font-extrabold text-white text-[clamp(36px,4.5vw,72px)] opacity-100 scale-100"
                            : "font-semibold text-white/25 text-[clamp(20px,2.2vw,34px)] opacity-60 scale-90"
                        }`}
                      >
                        {item.cardNumber}
                      </span>
                    </div>

                    {/* Title & Smooth Unfolding Narrative Description */}
                    <div className="flex flex-col flex-1 pt-1 overflow-hidden">
                      <h3
                        className={`font-['Funnel_Display',sans-serif] uppercase tracking-tight leading-[1.1] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? "font-semibold text-white text-[clamp(18px,2vw,30px)]"
                            : "font-normal text-white/30 text-[clamp(15px,1.7vw,24px)]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Smooth Fluid CSS Grid Expansion (Zero Layout Popping) */}
                      <div
                        className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? "grid-rows-[1fr] opacity-100 mt-2 sm:mt-2.5"
                            : "grid-rows-[0fr] opacity-0 mt-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="font-[family-name:var(--font-onest)] font-light text-[rgba(255,255,255,0.72)] text-[clamp(13px,1.12vw,16.5px)] leading-[1.4] max-w-[500px]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: 3D Inertial Spatial Cylinder Deck          */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 relative w-full h-[220px] xs:h-[250px] sm:h-[520px] lg:h-[640px] flex items-center justify-center pointer-events-none -mt-8 xs:-mt-12 sm:-mt-18 lg:-mt-8 -translate-y-2 sm:-translate-y-4 lg:-translate-y-6">
            
            {/* 3D Perspective Stage Viewport */}
            <div className="relative w-full h-full flex items-center justify-center [perspective:1400px] [transform-style:preserve-3d] select-none overflow-visible">
              
              {/* ---------------------------------------------------- */}
              {/* Continuous 3D Cylinder Orbit Cards Deck              */}
              {/* ---------------------------------------------------- */}
              <div className="relative w-[175px] xs:w-[205px] sm:w-[clamp(320px,30vw,460px)] aspect-[494/617] max-h-[580px] flex items-center justify-center [transform-style:preserve-3d]">
                {POINT_OF_VIEW_ITEMS.map((item, idx) => {
                  return (
                    <div
                      key={item.id}
                      ref={(el) => {
                        cardElementsRef.current[idx] = el;
                      }}
                      className="absolute inset-0 rounded-[28px] sm:rounded-[36px] overflow-hidden will-change-transform pointer-events-none select-none"
                      style={{
                        boxShadow: "0 30px 80px rgba(0,0,0,0.85)",
                        border: "1px solid rgba(255,255,255,0.14)",
                      }}
                    >
                      {/* Crisp Photorealistic Imagery */}
                      <img
                        src={item.image}
                        alt={item.title}
                        draggable={false}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />

                      {/* Glossy Glass Border Sheen */}
                      <div className="absolute inset-0 rounded-[28px] sm:rounded-[36px] ring-1 ring-inset ring-white/20 pointer-events-none" />

                      {/* Dynamic Vignette Shading for 3D Depth */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-black/15" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Baseline Spacer */}
        <div className="h-2 sm:h-4" />
      </div>
    </div>
  );
});

Stage8PointOfViewOverlay.displayName = "Stage8PointOfViewOverlay";
