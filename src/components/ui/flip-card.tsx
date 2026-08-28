"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Globe, Cpu, Smartphone, Server, TrendingUp, ArrowUpRight } from "lucide-react";

export type FlipCardProps = {
  cardNumber?: number | string;
  category?: string;
  frontTitle?: string;
  frontIcon?: React.ReactNode;
  backTitle?: string;
  backContent?: string;
  backImage?: string;
  backImageAlt?: string;
  tags?: string[];
  className?: string;
};

function mapRange(
  value: number,
  minA: number,
  maxA: number,
  minB: number,
  maxB: number
) {
  return minB + ((value - minA) * (maxB - minB)) / (maxA - minA);
}

export function FlipCard({
  cardNumber = 1,
  category = "INTERFACE & 3D",
  frontTitle = "UI/UX DESIGN & 3D VISUALIZATION",
  frontIcon,
  backContent = "High-impact visual storytelling, brutalist design systems, and immersive 3D web interfaces.",
  tags = ["Brutalist UI", "3D WebGL", "Motion Systems"],
  className,
}: FlipCardProps) {
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sculptureRef = useRef<HTMLDivElement>(null);

  const currentRotRef = useRef({ x: 0, y: 0 });
  const targetRotRef = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  const formattedNum = String(cardNumber).padStart(2, "0");

  // 120fps continuous spring damping for tactile 3D spatial tilt
  useEffect(() => {
    const updatePhysics = () => {
      const factor = isHoveredRef.current ? 0.14 : 0.07;

      currentRotRef.current.x +=
        (targetRotRef.current.x - currentRotRef.current.x) * factor;
      currentRotRef.current.y +=
        (targetRotRef.current.y - currentRotRef.current.y) * factor;

      const rx = currentRotRef.current.x;
      const ry = currentRotRef.current.y;

      if (sculptureRef.current) {
        sculptureRef.current.style.transform = `rotateX(${rx.toFixed(
          2
        )}deg) rotateY(${ry.toFixed(2)}deg)`;
      }

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      isHoveredRef.current = true;
      setIsHovered(true);

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      setGlarePos({ x: mouseX, y: mouseY });

      const targetY = mapRange(mouseX, 0, rect.width, -16, 16);
      const targetX = mapRange(mouseY, 0, rect.height, 16, -16);

      targetRotRef.current = { x: targetX, y: targetY };
    },
    []
  );

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      isHoveredRef.current = true;
      setIsHovered(true);

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      setGlarePos({ x: mouseX, y: mouseY });

      const targetY = mapRange(mouseX, 0, rect.width, -16, 16);
      const targetX = mapRange(mouseY, 0, rect.height, 16, -16);

      targetRotRef.current = { x: targetX, y: targetY };
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    setIsHovered(false);
    targetRotRef.current = { x: 0, y: 0 };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative w-full h-full flex flex-col items-center justify-center cursor-default select-none pointer-events-auto [perspective:1400px]",
        className
      )}
    >
      {/* ========================================================================= */}
      {/* 3D SCULPTURE STAGE (No Card Box Container)                                */}
      {/* ========================================================================= */}
      <div
        ref={sculptureRef}
        className="relative w-full h-full flex flex-col items-center justify-between transition-transform duration-300"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Soft Ambient Contact Shadow Under the 3D Sculpture */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-10 rounded-full bg-black/15 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-black/25"
          style={{ transform: "rotateX(75deg) translateZ(-30px)" }}
        />

        {/* ======================================================================= */}
        {/* LAYER 1: GIANT 3D CHROME & REFRACTIVE LIQUID GLASS NUMBER SCULPTURE     */}
        {/* ======================================================================= */}
        <div
          className="relative flex-1 flex items-center justify-center w-full pointer-events-none"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Ambient Red Glow Halo behind the number */}
          <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-[#D01919]/15 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          {/* 3D Extruded Chrome Number Back-Layer (Depth Shadow) */}
          <span
            className="absolute font-['Funnel_Display',sans-serif] text-[180px] sm:text-[230px] font-black text-black/[0.08] leading-none select-none tracking-tighter filter blur-[1px]"
            style={{ transform: "translate3d(6px, 12px, -24px)" }}
          >
            {formattedNum}
          </span>

          {/* 3D Extruded Mid-Layer Chrome Bevel */}
          <span
            className="absolute font-['Funnel_Display',sans-serif] text-[180px] sm:text-[230px] font-black leading-none select-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#b0b3ba] via-[#50545f] to-[#1a1b1f]"
            style={{ transform: "translate3d(3px, 6px, -12px)" }}
          >
            {formattedNum}
          </span>

          {/* 3D Liquid Chrome & Glass Front Face Number */}
          <span
            className="relative font-['Funnel_Display',sans-serif] text-[180px] sm:text-[230px] font-black leading-none select-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#e2e4ea] to-[#8d929f] drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] group-hover:scale-105 transition-transform duration-500"
            style={{
              textShadow: "0 2px 30px rgba(255,255,255,0.9)",
            }}
          >
            {formattedNum}
          </span>

          {/* Dynamic Specular Light Glare Sweeping Across Chrome */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10 mix-blend-overlay"
            style={{
              background: `radial-gradient(280px circle at ${glarePos.x}px ${glarePos.y}px, rgba(255,255,255,0.95), transparent 70%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />
        </div>

        {/* ======================================================================= */}
        {/* LAYER 2: FLOATING HOLOGRAPHIC RED & GLASS BADGE (translateZ: 45px)      */}
        {/* ======================================================================= */}
        <div
          className="relative z-30 w-full mt-auto mb-2 pointer-events-none"
          style={{ transform: "translateZ(45px)" }}
        >
          <div className="relative w-full rounded-2xl bg-white/80 dark:bg-[#121316]/85 backdrop-blur-2xl border border-white/90 dark:border-white/20 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12),0_0_30px_rgba(208,25,25,0.12)] group-hover:border-[#D01919]/60 group-hover:shadow-[0_25px_60px_rgba(208,25,25,0.25),0_0_40px_rgba(208,25,25,0.2)] transition-all duration-500 text-left">
            {/* Top Bar: Icon + Category + Status */}
            <div className="flex items-center justify-between w-full mb-2">
              <div className="flex items-center gap-2.5">
                {/* 3D Glass Icon Capsule */}
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D01919] to-[#8a0b0b] flex items-center justify-center shadow-[0_0_15px_rgba(208,25,25,0.5)]">
                  <div className="text-white scale-90">
                    {frontIcon || <Sparkles className="w-4 h-4 text-white" />}
                  </div>
                </div>

                <span className="font-mono text-[9.5px] sm:text-[10px] tracking-[0.22em] text-[#D01919] font-bold uppercase">
                  {category}
                </span>
              </div>

              {/* Status Dot */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D01919] animate-pulse" />
                <span className="font-mono text-[8.5px] font-bold text-zinc-700 dark:text-zinc-300 uppercase">
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Service Title */}
            <h3 className="font-['Funnel_Display',sans-serif] text-[17px] sm:text-[19px] font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.16] uppercase group-hover:text-[#D01919] transition-colors duration-300">
              {frontTitle}
            </h3>

            {/* Narrative Copy */}
            <p className="font-[family-name:var(--font-onest)] text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mt-1.5 line-clamp-2">
              {backContent}
            </p>

            {/* Capability Tags & Action Arrow */}
            <div className="pt-2.5 mt-2 flex items-center justify-between border-t border-black/[0.06] dark:border-white/[0.1]">
              <div className="flex items-center gap-1.5">
                {tags &&
                  tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[8.5px] tracking-wider text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
              </div>

              <div className="flex items-center gap-1 font-mono text-[9px] text-[#D01919] font-bold group-hover:translate-x-0.5 transition-transform duration-300">
                EXPLORE
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D01919]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
