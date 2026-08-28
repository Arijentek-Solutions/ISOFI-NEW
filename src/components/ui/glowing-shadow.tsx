"use client";

import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowingShadowProps {
  children: ReactNode;
  className?: string;
  cardRadius?: string;
}

export function GlowingShadow({
  children,
  className,
  cardRadius = "24px",
}: GlowingShadowProps) {
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center", className)}>
      <style jsx>{`
        @property --hue {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --rotate {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-y {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-x {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-size {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }

        .glow-container {
          --card-color: #101014;
          --text-color: #ffffff;
          --card-radius: ${cardRadius};
          --border-width: 1.5px;
          --bg-size: 1;
          --hue: 0;
          --hue-speed: 1;
          --rotate: 0;
          --animation-speed: 4s;
          --interaction-speed: 0.4s;

          width: 100%;
          height: 100%;
          color: white;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          border-radius: var(--card-radius);
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
        }

        .glow-content {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: #111115;
          border-radius: calc(var(--card-radius) * 0.92);
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: space-between;
          padding: 24px;
          overflow: hidden;
        }

        .glow-content:before {
          content: "";
          display: block;
          position: absolute;
          inset: calc(var(--border-width) * -1);
          border-radius: calc(var(--card-radius) * 0.94);
          z-index: -1;
          background: hsl(0deg 0% 16%)
            radial-gradient(
              40% 40% at calc(var(--bg-x) * 1%) calc(var(--bg-y) * 1%),
              hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 90%)
                calc(0% * var(--bg-size)),
              hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 80%)
                calc(20% * var(--bg-size)),
              hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 60%)
                calc(40% * var(--bg-size)),
              transparent 100%
            );
          animation:
            hue-animation var(--animation-speed) linear infinite,
            rotate-bg var(--animation-speed) linear infinite;
          transition: --bg-size var(--interaction-speed) ease;
        }

        .glow-container:hover .glow-content:before {
          --bg-size: 15;
          animation-play-state: paused;
          transition: --bg-size var(--interaction-speed) ease;
        }

        @keyframes rotate-bg {
          0% {
            --bg-x: 0;
            --bg-y: 0;
          }
          25% {
            --bg-x: 100;
            --bg-y: 0;
          }
          50% {
            --bg-x: 100;
            --bg-y: 100;
          }
          75% {
            --bg-x: 0;
            --bg-y: 100;
          }
          100% {
            --bg-x: 0;
            --bg-y: 0;
          }
        }

        @keyframes hue-animation {
          0% {
            --hue: 0;
          }
          100% {
            --hue: 360;
          }
        }
      `}</style>

      <div className="glow-container" role="button">
        <div className="glow-content">{children}</div>
      </div>
    </div>
  );
}

export default GlowingShadow;
