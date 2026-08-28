"use client";

import React, { useRef, useState, useEffect } from "react";

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  glowColor?: string;
  colors?: string[];
  animated?: boolean;
}

export function BorderGlow({
  children,
  className = "",
  borderRadius = 28,
  glowRadius = 180,
  glowIntensity = 0.85,
  colors = ["#FF2A2A", "#FFFFFF", "#FF1E1E"],
  animated = true,
}: BorderGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: -500, y: -500 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
      className={`relative p-[2.5px] overflow-hidden group ${className}`}
    >
      {/* Dynamic Interactive Mouse-Tracking Border Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? glowIntensity : glowIntensity * 0.75,
          background: `radial-gradient(${glowRadius}px circle at ${mousePos.x}px ${mousePos.y}px, ${colors[0]} 0%, ${colors[1]} 30%, ${colors[2]} 60%, transparent 80%)`,
        }}
      />

      {/* Ambient Sloped 3D Border Gradient (Dual Chromatic: Left Ruby Red, Right Electric Cyan) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${colors[0]} 0%, rgba(255,255,255,0.9) 45%, ${colors[2]} 100%)`,
          opacity: 0.85,
        }}
      />

      {/* Inner Card Content */}
      <div
        style={{
          borderRadius: `${Math.max(0, borderRadius - 2.5)}px`,
        }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </div>
    </div>
  );
}

export default BorderGlow;
