"use client";

import React, { forwardRef, useRef, useEffect } from "react";
import { GravitationalSingularity } from "./GravitationalSingularity";
import { FRAMEWORK_STEPS } from "./constants";

function HoldToRotate3DLogo({ mousePos = { x: 0, y: 0 } }: { mousePos?: { x: number; y: number } }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0, y: 0, z: 19.48 });
  const targetRotRef = useRef({ x: 0, y: 0 });
  const velRotRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef(mousePos);

  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (isDraggingRef.current) {
        // Direct smooth interpolation toward user drag target
        rotRef.current.x += (targetRotRef.current.x - rotRef.current.x) * 0.25;
        rotRef.current.y += (targetRotRef.current.y - rotRef.current.y) * 0.25;
      } else {
        // Apply inertia velocity decay when released
        rotRef.current.x += velRotRef.current.x * dt * 50;
        rotRef.current.y += velRotRef.current.y * dt * 50;

        velRotRef.current.x *= 0.92;
        velRotRef.current.y *= 0.92;

        // Hover parallax target angles based on cursor position
        const hoverTargetX = mousePosRef.current.y * -16;
        const hoverTargetY = mousePosRef.current.x * 22;

        targetRotRef.current.x += (hoverTargetX - targetRotRef.current.x) * 0.08;
        targetRotRef.current.y += (hoverTargetY - targetRotRef.current.y) * 0.08;

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
  }, []);

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

    // Update continuous rotation angle without restrictive clamping
    targetRotRef.current.y += dx * 0.65;
    targetRotRef.current.x -= dy * 0.65;

    // Record momentum velocity
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
      {/* Exact Photorealistic 3D Glass Logo from Figma */}
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
  mousePos?: { x: number; y: number };
}

export const Stage7FrameworkOverlay = forwardRef<
  HTMLDivElement,
  Stage7FrameworkOverlayProps
>(({ activeStepIndex = -1, mousePos = { x: 0, y: 0 } }, ref) => {
  const currentIndex = activeStepIndex;

  return (
    <div
      ref={ref}
      style={{ visibility: "hidden" }}
      className="absolute inset-0 pointer-events-none w-full flex items-center justify-center z-30 [perspective:1400px]"
    >
      {/* Ambient Liquid Black Video Background (bg.mp4) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        <div className="absolute inset-0 bg-[#050505]" />
        <video
          src="/videos/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-85 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

        {/* Top Atmospheric Crimson Glow Diffuser */}
        <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[min(900px,85vw)] h-[320px] bg-gradient-to-b from-[#FF1A1A]/45 via-[#D91E1E]/15 to-transparent blur-[60px]" />
      </div>

      {/* Central Stage Grid - Shifted Upwards */}
      <div className="relative w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[82px] h-full flex flex-col justify-between pt-[75px] sm:pt-[90px] md:pt-[105px] pb-8 sm:pb-12 pointer-events-none z-10">
        
        {/* Top Centered Header (Shifted up with clean typography) */}
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
          
          {/* Gravitational Particle Orbit Field & Interactive Hold-To-Rotate 3D Emblem */}
          <div
            data-stage7-logo
            className="relative w-[clamp(320px,36vw,580px)] aspect-square flex items-center justify-center pointer-events-auto"
          >
            <GravitationalSingularity>
              <div className="relative w-[clamp(240px,25vw,380px)] aspect-square flex items-center justify-center">
                <HoldToRotate3DLogo mousePos={mousePos} />
              </div>
            </GravitationalSingularity>
          </div>

          {/* Alternating Framework Step Cards (Ultra-Smooth Directional Fade-Up) */}
          {FRAMEWORK_STEPS.map((step, idx) => {
            const isActive = idx === currentIndex;
            const isRight = step.side === "right";
            const isUpcoming = idx > currentIndex;

            // Directional Smooth Fade-Up Transform
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
