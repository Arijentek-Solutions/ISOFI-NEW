"use client";

import * as React from "react";
import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface InteractiveTravelCardProps {
  /** Primary title */
  title?: string;
  /** Narrative description */
  description?: string;
  /** Optional custom class name */
  className?: string;
  /** Optional custom inline style */
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * 3D Optical Crystal Glass Card — Exact Typographic Layout from Figma.
 * - Cohesive, natural typography spacing matching Figma (No awkward gap in the center).
 * - 18px double-beveled crystal glass frame with razor-sharp chamfers.
 * - Sharp red chromatic refraction (left/bottom) & subtle ice-blue refraction (right/top).
 * - Leftward 3D perspective slope with responsive spring tilt physics.
 */
export const InteractiveTravelCard = React.forwardRef<
  HTMLDivElement,
  InteractiveTravelCardProps
>(
  (
    {
      title = "UI/UX DESIGN\n& 3D\nVISUALIZATION",
      description = "Improved user retention\nand high-impact visual\nstorytelling.",
      className,
      style,
      children,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    // 3D Perspective angle sloped to the LEFT side
    const baseRotX = 4;
    const baseRotY = 16;
    const baseRotZ = -3.5;

    // --- Dynamic 3D Tilt Spring Physics ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 24, stiffness: 200, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(
      springY,
      [-0.5, 0.5],
      [`${baseRotX + 6}deg`, `${baseRotX - 6}deg`]
    );
    const rotateY = useTransform(
      springX,
      [-0.5, 0.5],
      [`${baseRotY - 6}deg`, `${baseRotY + 6}deg`]
    );

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;

        const xPct = mouseXVal / rect.width - 0.5;
        const yPct = mouseYVal / rect.height - 0.5;

        mouseX.set(xPct);
        mouseY.set(yPct);

        setGlarePos({
          x: Math.round((mouseXVal / rect.width) * 100),
          y: Math.round((mouseYVal / rect.height) * 100),
        });
      },
      [mouseX, mouseY]
    );

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
      mouseX.set(0);
      mouseY.set(0);
    }, [mouseX, mouseY]);

    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={cn(
          "group relative w-full h-full select-none cursor-pointer [perspective:1500px]",
          className
        )}
      >
        <motion.div
          ref={ref}
          animate={{
            scale: isHovered ? 1.025 : 1.0,
          }}
          transition={{
            scale: { type: "spring", stiffness: 260, damping: 22 },
          }}
          style={{
            rotateX,
            rotateY,
            rotateZ: `${baseRotZ}deg`,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-full rounded-[28px] transition-all duration-300 ease-out"
        >
          {/* ========================================================================= */}
          {/* 1. THICK OUTER CUT-CRYSTAL BEVEL CASING                                   */}
          {/* ========================================================================= */}
          <div
            className="relative w-full h-full rounded-[28px] p-[16px] sm:p-[18px] border-[2.5px] border-white/95 overflow-hidden transition-all duration-300"
            style={{
              transformStyle: "preserve-3d",
              background:
                "linear-gradient(135deg, #ffffff 0%, #f7f9fd 45%, #eff3fa 100%)",
              boxShadow: `
                /* Thick Outer Edge Highlights */
                inset 0 2px 1px 0 rgba(255, 255, 255, 0.9),
                inset 0 -2px 1px 0 rgba(255, 255, 255, 0.9),

                /* Saturated Red Optic Chamfer (Left & Bottom) */
                inset 5px 0 0 0 #FF1E1E,
                inset 9px 0 3px 0 rgba(255, 30, 30, 0.45),
                inset 0 -5px 0 0 #FF1E1E,
                inset 0 -9px 3px 0 rgba(255, 30, 30, 0.35),

                /* Soft Reduced-Intensity Red Chamfer (Right & Top) */
                inset -2.5px 0 0 0 rgba(255, 30, 30, 0.3),
                inset -5px 0 2px 0 rgba(255, 30, 30, 0.12),
                inset 0 2px 0 0 rgba(255, 30, 30, 0.25),
                inset 0 4px 1.5px 0 rgba(255, 30, 30, 0.1)
              `,
            }}
          >
            {/* Specular Pin-Line on Left Crystal Chamfer */}
            <div
              className="absolute left-[3px] top-[8px] bottom-[8px] w-[2.5px] rounded-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, #ffffff 0%, #ffffff 35%, #FF8585 70%, #FF1E1E 100%)",
                boxShadow: isHovered
                  ? "0 0 4px rgba(255,255,255,1), 0 0 8px rgba(255,30,30,0.6)"
                  : "0 0 2px rgba(255,255,255,1), 0 0 4px rgba(255,30,30,0.3)",
              }}
            />

            {/* Delicate Specular Pin-Line on Right Crystal Chamfer (Subtle Red Shimmer) */}
            <div
              className="absolute right-[3px] top-[8px] bottom-[8px] w-[1.5px] rounded-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,140,140,0.6) 50%, rgba(255,30,30,0.35) 100%)",
                boxShadow: isHovered
                  ? "0 0 3px rgba(255,30,30,0.35)"
                  : "0 0 1.5px rgba(255,255,255,0.7)",
              }}
            />

            {/* ======================================================================= */}
            {/* 2. INNER POLISHED GLASS FACE                                            */}
            {/* ======================================================================= */}
            <div
              className="relative w-full h-full rounded-[14px] overflow-hidden border-[1.5px] border-white/95 flex flex-col justify-center p-7 sm:p-8 text-left transition-all duration-300"
              style={{
                transform: "translateZ(8px)",
                transformStyle: "preserve-3d",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #fdfefe 60%, #f6f8fc 100%)",
                boxShadow: `
                  /* Gutter Depth Channel Definition */
                  0 0 0 1.5px rgba(0, 0, 0, 0.05),

                  /* Razor-Sharp Inner Specular Bevel Line */
                  inset 0 1.5px 0.5px 0 #ffffff,
                  inset 1.5px 0 0.5px 0 rgba(255, 80, 80, 0.45),
                  inset -1px 0 0.5px 0 rgba(255, 80, 80, 0.2),
                  inset 0 -1.5px 0.5px 0 rgba(255, 80, 80, 0.25)
                `,
              }}
            >
              {/* Crisp Diagonal Specular Light Reflection */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[13px] transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(116deg, transparent 25%, rgba(255, 255, 255, 0.35) 42%, rgba(255, 255, 255, 1) 48%, rgba(255, 255, 255, 0.28) 54%, transparent 72%)",
                  mixBlendMode: "overlay",
                  opacity: isHovered ? 1 : 0.95,
                }}
              />

              {/* Dynamic Spotlight Glare */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[13px] transition-opacity duration-200"
                style={{
                  background: `radial-gradient(280px circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.85), transparent 70%)`,
                  opacity: isHovered ? 0.75 : 0.45,
                  mixBlendMode: "soft-light",
                }}
              />

              {/* Custom Children or Exact Figma Typographic Content */}
              {children ? (
                <div
                  className="relative z-20 w-full h-full"
                  style={{ transform: "translateZ(20px)" }}
                >
                  {children}
                </div>
              ) : (
                <div
                  className="relative z-20 w-full flex flex-col justify-center"
                  style={{ transform: "translateZ(20px)" }}
                >
                  {/* Headline: Bold Heavy Uppercase */}
                  <h3 className="font-['Funnel_Display',sans-serif] text-[23px] sm:text-[25px] md:text-[27px] font-black text-black tracking-tight leading-[1.12] uppercase whitespace-pre-line group-hover:text-[#111111] transition-colors duration-300">
                    {title}
                  </h3>

                  {/* Body: Light Slate Narrative Description with natural Figma gap */}
                  {description && (
                    <p className="font-[family-name:var(--font-onest)] text-[14px] sm:text-[15px] text-zinc-500 font-normal leading-[1.42] mt-5 sm:mt-6 max-w-[270px] whitespace-pre-line">
                      {description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);

InteractiveTravelCard.displayName = "InteractiveTravelCard";
export default InteractiveTravelCard;
