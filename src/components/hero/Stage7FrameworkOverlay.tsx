"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { FRAMEWORK_STEPS } from "./constants";
import { Stage7EmbersCanvas } from "./Stage7EmbersCanvas";
import { GravitationalSingularity } from "./GravitationalSingularity";
import SplashCursor from "./SplashCursor";

function HoldToRotate3DLogo({
  mousePos = { x: 0, y: 0 },
}: {
  mousePos?: { x: number; y: number };
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0, y: 0, z: 0 });
  const targetRotRef = useRef({ x: 0, y: 0, z: 0 });
  const velRotRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animId: number;
    let time = 0;

    const loop = () => {
      time += 16;
      if (!isDraggingRef.current) {
        velRotRef.current.x *= 0.94;
        velRotRef.current.y *= 0.94;

        targetRotRef.current.x += velRotRef.current.x;
        targetRotRef.current.y += velRotRef.current.y;

        targetRotRef.current.x += (mousePos.y * -12 - targetRotRef.current.x) * 0.05;
        targetRotRef.current.y += (mousePos.x * 16 - targetRotRef.current.y) * 0.05;

        rotRef.current.x += (targetRotRef.current.x - rotRef.current.x) * 0.08;
        rotRef.current.y += (targetRotRef.current.y - rotRef.current.y) * 0.08;
      }

      // Elegant zero-G ambient levitation
      const floatY = Math.sin(time * 0.0012) * 8;
      const floatRotZ = Math.cos(time * 0.0009) * 1.5;

      if (containerRef.current) {
        const rX = rotRef.current.x;
        const rY = rotRef.current.y;
        const rZ = rotRef.current.z + floatRotZ;

        containerRef.current.style.transform = `translate3d(0, ${floatY.toFixed(
          1
        )}px, 0) rotateX(${rX.toFixed(2)}deg) rotateY(${rY.toFixed(
          2
        )}deg) rotateZ(${rZ.toFixed(2)}deg)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [mousePos.x, mousePos.y]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    velRotRef.current = { x: 0, y: 0 };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    targetRotRef.current.y += dx * 0.65;
    targetRotRef.current.x -= dy * 0.65;

    velRotRef.current = {
      x: -dy * 0.35,
      y: dx * 0.35,
    };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full h-full flex items-center justify-center select-none touch-none cursor-grab active:cursor-grabbing"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <img
        src="/images/isofiniti-figma-3d.png"
        alt="ISOFINITI 3D Glass Emblem"
        width={900}
        height={900}
        draggable={false}
        className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
      />
    </div>
  );
}

interface Stage7FrameworkOverlayProps {
  activeStepIndex?: number;
  isActive?: boolean;
  mousePos?: { x: number; y: number };
}

export const Stage7FrameworkOverlay = forwardRef<
  HTMLDivElement,
  Stage7FrameworkOverlayProps
>(({ activeStepIndex = -1, isActive = false, mousePos = { x: 0, y: 0 } }, ref) => {
  const currentIndex = activeStepIndex;
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      ref={ref}
      style={{ visibility: "hidden" }}
      className="absolute inset-0 pointer-events-none w-full flex items-center justify-center z-30 [perspective:1400px]"
    >
      {/* Stage 7 Solid Background */}
      <div className="absolute inset-0 bg-[#05040A] -z-30 pointer-events-none" />

      {/* Stage 7 Isolated Dusty Particle Embers — in front of black background */}
      <Stage7EmbersCanvas isActive={isActive} />

      {/* Stage 7 Eruption Video & Glow Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {/* Eruption Color-Dodge Video Overlay - Ignites on every logo drop */}
        <video
          ref={videoRef}
          data-stage7-eruption
          src="/assets/eruption.mp4"
          muted
          playsInline
          preload="auto"
          onEnded={(e) => {
            const vid = e.currentTarget;
            vid.style.opacity = "0";
            vid.pause();
          }}
          className="absolute inset-0 w-full h-full object-cover object-[50%_0%] pointer-events-none mix-blend-color-dodge transition-opacity duration-700 ease-out opacity-0"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 70% at 50% 0%, #000 25%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse 75% 70% at 50% 0%, #000 25%, transparent 80%)",
          }}
        />

        {/* Glow Image Overlay */}
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-top mix-blend-screen pointer-events-none opacity-100"
          style={{
            backgroundImage: 'url("/assets/glow.png")',
            backgroundSize: "100% auto",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 70% at 50% 0%, #000 25%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse 75% 70% at 50% 0%, #000 25%, transparent 80%)",
          }}
        />
      </div>

      {/* React Bits SplashCursor Fluid Component — scoped exclusively to Stage 7 */}
      {isActive && (
        <SplashCursor
          COLOR="#d61a1a"
          RAINBOW_MODE={false}
          SPLAT_RADIUS={0.24}
          DENSITY_DISSIPATION={3.0}
          VELOCITY_DISSIPATION={1.8}
          FORCE_UPWARD_ZONE={true}
        />
      )}

      {/* ========================================================================= */}
      {/* MOBILE SCREEN LAYOUT (md:hidden) — Pure Mobile View                       */}
      {/* ========================================================================= */}
      <div className="flex md:hidden flex-col items-center w-full h-full pt-10 pb-8 px-4 relative z-20 pointer-events-auto overflow-hidden">
        {/* Top Header */}
        <div className="w-full text-center flex flex-col items-center mb-1 select-none">
          <h2 className="font-['Funnel_Display',sans-serif] font-bold text-white tracking-tight text-[22px] xs:text-[24px] leading-snug">
            The Framework Behind
          </h2>
          <p className="font-['Funnel_Display',sans-serif] font-bold text-[#D91E1E] tracking-tight text-[26px] xs:text-[29px] leading-snug">
            Our Success
          </p>
        </div>

        {/* Center 3D Logo Video Emblem (logo.mp4) */}
        <div data-stage7-logo className="relative w-[210px] xs:w-[240px] aspect-square flex items-center justify-center my-1 select-none pointer-events-none">
          <video
            src="/assets/logo.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover mix-blend-screen pointer-events-none select-none scale-135"
            style={{
              WebkitMaskImage:
                "radial-gradient(65% 65% at 50% 48%, #000 35%, transparent 88%)",
              maskImage:
                "radial-gradient(65% 65% at 50% 48%, #000 35%, transparent 88%)",
            }}
          />
        </div>

        {/* Sequenced Interactive Framework Step Card Slot */}
        <div className="relative w-full max-w-[340px] h-[160px] xs:h-[180px] mt-2 flex items-center justify-center">
          {FRAMEWORK_STEPS.map((step, idx) => {
            const activeIdx = Math.max(0, currentIndex);
            const isActive = idx === activeIdx;
            const isRight = step.side === "right";

            return (
              <div
                key={step.id}
                className={`absolute inset-x-0 flex flex-col text-left max-w-[270px] xs:max-w-[300px] transition-all duration-500 ease-out ${
                  isRight ? "ml-auto pr-1" : "mr-auto pl-1"
                } ${
                  isActive
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto filter-none"
                    : "opacity-0 translate-y-4 scale-95 pointer-events-none blur-[4px]"
                }`}
              >
                <h3 className="font-['Funnel_Display',sans-serif] font-bold text-[20px] xs:text-[23px] text-white tracking-tight leading-snug">
                  <span className="text-[#D91E1E]">{step.stepNumber}</span> — {step.title}
                </h3>
                <p className="font-[family-name:var(--font-onest)] font-light text-zinc-300 text-[12.5px] xs:text-[13.5px] leading-relaxed mt-1.5">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PC / DESKTOP SCREEN LAYOUT (hidden md:flex) — 100% UNTOUCHED ORIGINAL     */}
      {/* ========================================================================= */}
      <div className="hidden md:flex relative w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[82px] h-full flex-col justify-between pt-[75px] sm:pt-[90px] md:pt-[105px] pb-8 sm:pb-12 pointer-events-none z-10">
        
        {/* Top Centered Header */}
        <div
          data-stage7-header
          style={{ opacity: 0 }}
          className="w-full text-center flex flex-col items-center pointer-events-auto mt-1 sm:mt-2"
        >
          <h2 className="font-['Funnel_Display',sans-serif] font-semibold text-white tracking-tight text-[clamp(24px,3.2vw,48px)] leading-[1.05]">
            The Framework Behind
          </h2>
          <p className="font-['Funnel_Display',sans-serif] font-bold text-[#D91E1E] tracking-tight text-[clamp(28px,3.8vw,58px)] leading-[1.05] mt-0.5 sm:mt-1">
            Our Success
          </p>
        </div>

        {/* Middle Interactive Composition: Lifted Center 3D Logo & Persistent Staggered Framework Cards */}
        <div className="relative w-full flex-1 flex items-center justify-center -mt-4 sm:-mt-8 lg:-mt-10">
          
          {/* Central Ink Flow Video Emblem (logo.mp4) with Screen Blend & Pointer Parallax */}
          <div
            data-stage7-logo
            className="relative w-[min(100vw,1260px)] lg:w-[min(100vw,1360px)] aspect-[16/9] flex items-center justify-center pointer-events-auto select-none z-10"
          >
            <div
              className="relative w-full h-full flex items-center justify-center transform-gpu"
              style={{
                transform: `translate3d(${(mousePos.x * 20).toFixed(1)}px, ${(mousePos.y * -20).toFixed(1)}px, 0)`,
                willChange: "transform",
              }}
            >
              <video
                src="/assets/logo.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover mix-blend-screen pointer-events-none select-none scale-105 sm:scale-110 transform-gpu"
                style={{
                  willChange: "transform",
                  WebkitMaskImage:
                    "radial-gradient(58% 56% at 50% 49%, #000 28%, transparent 85%)",
                  maskImage:
                    "radial-gradient(58% 56% at 50% 49%, #000 28%, transparent 85%)",
                }}
              />
            </div>
          </div>

          {/* Alternating Framework Step Cards (Persistent Scroll Timeline) */}
          {FRAMEWORK_STEPS.map((step, idx) => {
            const isActive = idx === currentIndex;
            const isRight = step.side === "right";
            const isUpcoming = idx > currentIndex;

            const transform = isActive
              ? "translate3d(0, -50%, 0)"
              : isUpcoming
              ? "translate3d(0, calc(-50% + 32px), 0)"
              : "translate3d(0, calc(-50% - 32px), 0)";

            return (
              <div
                key={step.id}
                className={`absolute top-1/2 flex flex-col items-start text-left max-w-[340px] sm:max-w-[390px] select-none pointer-events-none transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) ${
                  isRight
                    ? "right-0 sm:right-4 lg:right-10 xl:right-14"
                    : "left-0 sm:left-4 lg:left-10 xl:left-14"
                } ${
                  isActive
                    ? "opacity-100 pointer-events-auto filter-none"
                    : "opacity-0 pointer-events-none blur-[5px]"
                }`}
                style={{
                  transform,
                  transitionProperty: "opacity, transform, filter",
                }}
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-['Funnel_Display',sans-serif] font-bold text-[clamp(22px,2.2vw,30px)] text-white tracking-tight">
                    <span className="text-[#D91E1E]">{step.stepNumber}</span> — {step.title}
                  </h3>
                </div>
                
                <p className="font-[family-name:var(--font-onest)] font-light text-zinc-300 text-[14px] sm:text-[15.5px] leading-relaxed mt-2.5 sm:mt-3.5">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Baseline Spacer */}
        <div className="h-2 sm:h-4" />
      </div>
    </div>
  );
});

Stage7FrameworkOverlay.displayName = "Stage7FrameworkOverlay";
