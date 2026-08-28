"use client";

import React, { ReactNode, useState, useRef, useCallback } from "react";
import { Sparkles, Globe, Cpu, Smartphone, Server, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GlassServiceCardProps {
  cardNumber?: string | number;
  title: string;
  description: string | string[];
  image?: string;
  icon?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  rotation?: string;
}

function mapRange(
  value: number,
  minA: number,
  maxA: number,
  minB: number,
  maxB: number
) {
  return minB + ((value - minA) * (maxB - minB)) / (maxA - minA);
}

export function GlassServiceCard({
  cardNumber = "01",
  title,
  description,
  image,
  icon,
  className = "",
  style = {},
  rotation = "0deg",
}: GlassServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const descText = Array.isArray(description)
    ? description.join(" ")
    : description;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !innerRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateY = mapRange(mouseX, 0, rect.width, -10, 10);
    const rotateX = mapRange(mouseY, 0, rect.height, 10, -10);

    innerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotate(${rotation})`,
        perspective: "1200px",
        ...style,
      }}
      className={cn(
        "group cursor-pointer select-none w-full h-full pointer-events-auto [perspective:1200px]",
        className
      )}
    >
      <div
        ref={innerRef}
        className={cn(
          "relative w-full h-full rounded-2xl border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#0c0c0c]/95 text-foreground shadow-[0_15px_35px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden flex flex-col justify-between transition-transform duration-200 ease-out [transform-style:preserve-3d]"
        )}
      >
        {/* Top Image Banner with Floating Card Number */}
        <div className="relative w-full h-[46%] min-h-[150px] overflow-hidden border-b border-black/5 dark:border-white/10 bg-muted shrink-0">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              draggable={false}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-xs text-zinc-500">
              No Image
            </div>
          )}

          {/* Top-Right Number Badge */}
          <span className="absolute top-3.5 right-3.5 font-mono text-xs font-medium px-2 py-0.5 rounded-md bg-black/70 text-white/90 backdrop-blur-md border border-white/10 shadow-sm">
            {cardNumber}
          </span>

          {/* Top-Left Subtle Icon */}
          {icon && (
            <div className="absolute top-3.5 left-3.5 p-1.5 rounded-md bg-black/60 text-white backdrop-blur-md border border-white/10">
              <div className="w-4 h-4 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4">
                {icon}
              </div>
            </div>
          )}

          {/* Image Vignette / Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Card Body with Title and Description */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between items-center text-center">
          <div className="flex flex-col items-center gap-2 my-auto">
            <h3 className="font-['Funnel_Display',sans-serif] font-bold text-[15px] sm:text-base tracking-tight text-neutral-900 dark:text-white uppercase leading-snug">
              {title}
            </h3>

            <p className="font-[family-name:var(--font-onest)] font-normal text-neutral-600 dark:text-zinc-400 text-xs leading-relaxed line-clamp-3 max-w-[280px]">
              {descText}
            </p>
          </div>

          {/* Bottom Card Footer with Corner Number & Accent Dot */}
          <div className="w-full flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/10 text-[11px] font-mono text-neutral-400 dark:text-zinc-500">
            <span>{cardNumber}</span>
            <span className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D01919] animate-pulse" />
              ISOFINITI
            </span>
            <span>{cardNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlassServiceCard;
