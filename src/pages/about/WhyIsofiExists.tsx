'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ConceptPill {
  id: string;
  label: string;
  offsetClass: string;
}

const CONCEPT_PILLS: ConceptPill[] = [
  {
    id: 'design',
    label: 'DESIGN THE EXPERIENCE.',
    offsetClass: 'self-end translate-x-1 sm:translate-x-3 lg:translate-x-5',
  },
  {
    id: 'engineer',
    label: 'ENGINEER THE SYSTEM.',
    offsetClass: 'self-start -translate-x-1 sm:-translate-x-3 lg:-translate-x-5',
  },
  {
    id: 'automate',
    label: 'AUTOMATE THE WORK.',
    offsetClass: 'self-end translate-x-1 sm:translate-x-3 lg:translate-x-5',
  },
  {
    id: 'scale',
    label: 'INTELLIGENTLY SCALE.',
    offsetClass: 'self-start -translate-x-1 sm:-translate-x-3 lg:-translate-x-5',
  },
];

interface Point {
  x: number;
  y: number;
}

export function WhyIsofiExists() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [points, setPoints] = useState<Point[]>([]);

  // Calculate the center coordinates of each RED DOT relative to the container
  const updatePoints = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPoints: Point[] = [];

    dotRefs.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      newPoints.push({
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      });
    });

    if (newPoints.length === 4) {
      setPoints(newPoints);
    }
  };

  useEffect(() => {
    updatePoints();
    const rAF = requestAnimationFrame(updatePoints);
    const timeout = setTimeout(updatePoints, 120);

    const handleResize = () => updatePoints();
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => updatePoints());
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(rAF);
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  // Duration in seconds for continuous, non-stop line flight
  const FLOW_DURATION = 1.9;

  return (
    <section
      className="relative w-full max-w-[1920px] mx-auto min-h-[760px] lg:min-h-[920px] bg-[#efefef] text-black overflow-hidden select-none px-6 sm:px-12 lg:px-[119px] py-20 sm:py-28 lg:py-36 flex items-center"
      data-node-id="why-isofiniti-exists"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Eyebrow + Headline + Core Philosophy Narrative              */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left">
          {/* Eyebrow: WHY ISOFINITI EXISTS */}
          <span
            data-node-id="1408:6953"
            className="font-['Funnel_Display',sans-serif] font-bold text-[14px] sm:text-[16px] text-[#c42a2a] tracking-[1.5px] uppercase mb-4 sm:mb-6"
          >
            WHY ISOFINITI EXISTS
          </span>

          {/* Headline */}
          <h2
            data-node-id="1408:6951"
            className="font-['Funnel_Display',sans-serif] font-extrabold text-[#000000] text-[clamp(32px,4.4vw,74px)] leading-[1.03] tracking-[-1.2px] sm:tracking-[-2px] lg:tracking-[-3px] max-w-[820px] [word-break:break-word] mb-6 sm:mb-8 lg:mb-10"
          >
            The Way Businesses Build Technology Is Changing.
          </h2>

          {/* Core Philosophy Paragraph (Figma 1408:6958) */}
          <p
            data-node-id="1408:6958"
            className="font-[family-name:var(--font-onest)] font-light text-[rgba(0,0,0,0.55)] text-[16px] sm:text-[19px] lg:text-[22px] leading-[26px] sm:leading-[30px] lg:leading-[33.564px] max-w-[780px] [word-break:break-word]"
          >
            Businesses no longer need to choose between a great experience and powerful technology. They need both. The rise of AI, automation and connected digital systems is changing how companies operate — but the opportunity isn&apos;t simply to adopt new technology. It&apos;s to rethink how everything works together. That&apos;s where ISOFINITI comes in.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Continuously Passing Lines (No Sticking, Non-Stop Flow)     */}
        {/* ========================================================================= */}
        <div
          ref={containerRef}
          className="lg:col-span-6 xl:col-span-5 relative w-full flex flex-col justify-center items-center py-6 min-h-[460px] lg:min-h-[500px] mt-[2cm]"
        >
          {/* ===================================================================== */}
          {/* CONTINUOUS PASSING RED LINES (Infinitely passing, never stuck)         */}
          {/* ===================================================================== */}
          {points.length === 4 && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              style={{ overflow: 'visible' }}
            >
              {[0, 1, 2].map((lineIndex) => {
                const p1 = points[lineIndex];
                const p2 = points[lineIndex + 1];

                const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
                const beamLength = Math.max(45, Math.min(dist * 0.38, 70));
                const totalGap = dist * 2 + beamLength;

                return (
                  <g key={`continuous-flow-${lineIndex}`}>
                    {/* The continuously passing red line: never stops or sticks */}
                    <motion.line
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke="rgba(208, 38, 38, 0.85)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeDasharray={`${beamLength} ${totalGap}`}
                      animate={{
                        strokeDashoffset: [beamLength, -(dist + beamLength)],
                      }}
                      transition={{
                        duration: FLOW_DURATION,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Soft ambient passing glow clone */}
                    <motion.line
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke="rgba(208, 38, 38, 0.36)"
                      strokeWidth="4.8"
                      strokeLinecap="round"
                      strokeDasharray={`${beamLength} ${totalGap}`}
                      animate={{
                        strokeDashoffset: [beamLength, -(dist + beamLength)],
                      }}
                      transition={{
                        duration: FLOW_DURATION,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="blur-[1.5px]"
                    />
                  </g>
                );
              })}
            </svg>
          )}

          {/* ===================================================================== */}
          {/* Strategy Pills (z-10, Clean Neutral Box, Text turns Red on Touch)     */}
          {/* ===================================================================== */}
          <div className="relative z-10 w-full flex flex-col gap-6 sm:gap-8 lg:gap-10 max-w-[500px]">
            {CONCEPT_PILLS.map((pill, index) => {
              return (
                <div
                  key={pill.id}
                  className={`${pill.offsetClass} transition-transform duration-300`}
                >
                  <div className="rounded-[8px] px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2.5 sm:gap-3 cursor-pointer backdrop-blur-md transition-all duration-300 select-none bg-[#e8e8e8]/95 hover:bg-[#dedede] border border-black/8 shadow-[0px_3px_12px_rgba(0,0,0,0.04)]">
                    {/* Status Dot: Neutral Grey -> Turns Red in sync when line touches */}
                    <div className="relative flex items-center justify-center w-3 h-3 shrink-0 z-20">
                      <motion.span
                        ref={(el) => {
                          dotRefs.current[index] = el;
                        }}
                        animate={{
                          backgroundColor: [
                            'rgba(163, 163, 163, 0.8)',
                            'rgba(163, 163, 163, 0.8)',
                            '#c42a2a',
                            '#c42a2a',
                            'rgba(163, 163, 163, 0.8)',
                          ],
                        }}
                        transition={{
                          duration: FLOW_DURATION,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          times: [0, 0.35, 0.65, 0.88, 1],
                        }}
                        className="w-2 h-2 rounded-full"
                      />
                    </div>

                    {/* Text Label: Turns Red ONLY when the passing line is touching */}
                    <motion.span
                      animate={{
                        color: [
                          'rgba(0, 0, 0, 0.45)',
                          'rgba(0, 0, 0, 0.45)',
                          '#c42a2a',
                          '#c42a2a',
                          'rgba(0, 0, 0, 0.45)',
                        ],
                      }}
                      transition={{
                        duration: FLOW_DURATION,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        times: [0, 0.35, 0.65, 0.88, 1],
                      }}
                      className="font-[family-name:var(--font-onest)] font-bold text-[11.5px] sm:text-[13px] tracking-[1.1px] sm:tracking-[1.3px] uppercase whitespace-nowrap"
                    >
                      {pill.label}
                    </motion.span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyIsofiExists;
