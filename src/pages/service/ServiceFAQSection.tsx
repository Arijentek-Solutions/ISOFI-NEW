'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'WHAT TYPE OF PROJECTS DOES ISOFINITI WORK ON?',
    answer:
      'We work on digital products, business systems, AI solutions, automation workflows and technology infrastructure.',
  },
  {
    id: 'faq-2',
    question: 'CAN YOU WORK WITH AN EXISTING PRODUCT OR SYSTEM?',
    answer:
      'Yes. We can improve, modernize, integrate or extend existing systems.',
  },
  {
    id: 'faq-3',
    question: 'DO YOU PROVIDE DESIGN AND DEVELOPMENT?',
    answer:
      'Yes. Design and engineering can be handled together, from strategy and UX through development and deployment.',
  },
  {
    id: 'faq-4',
    question: 'CAN YOU INTEGRATE AI INTO AN EXISTING BUSINESS?',
    answer:
      'Yes. We identify practical opportunities for AI within existing workflows, products and systems.',
  },
  {
    id: 'faq-5',
    question: 'DO YOU WORK WITH STARTUPS OR ESTABLISHED BUSINESSES?',
    answer:
      'We work with teams at different stages, from new digital products to established businesses looking to modernize or automate their operations.',
  },
];

export function ServiceFAQSection() {
  // First item open by default as shown in Figma
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-[82px] overflow-hidden select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[600px] bg-[#D01919]/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1920px] mx-auto">
        {/* ========================================================================= */}
        {/* SECTION HEADER: "Answers to Your Queries"                                */}
        {/* ========================================================================= */}
        <div className="text-center flex flex-col items-center mb-16 sm:mb-20 lg:mb-24">
          <h2 className="font-['Funnel_Display',sans-serif] font-bold text-[clamp(34px,4.8vw,80px)] leading-[1.03] tracking-tight text-white">
            Answers to <span className="text-[#D01919]">Your Queries</span>
          </h2>
          <p className="font-[family-name:var(--font-onest)] font-normal text-[clamp(14px,1.2vw,20px)] text-zinc-400 mt-3 sm:mt-4 max-w-[680px]">
            Extracted from our logs. Clear parameters on how we engage and deploy.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SPLIT GRID: Robot Visual (Left) + Interactive Accordion (Right)          */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Thinking Robot with Glowing Red Question Mark */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative">
            <div className="relative w-[280px] xs:w-[340px] sm:w-[420px] lg:w-[460px] flex items-center justify-center">
              {/* Floating Thinking Robot Character */}
              <div className="relative w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <Image
                  src="/assets/thinkingRobotClean.png"
                  alt="Thinking Robot"
                  width={400}
                  height={540}
                  priority
                  className="w-full h-auto object-contain select-none pointer-events-none"
                />
              </div>

              {/* Stylized Red Question Mark: 1cm right, 1cm up, tilted slightly to the right */}
              <div className="absolute top-[6%] right-[6%] xs:right-[10%] sm:right-[14%] translate-x-[1cm] -translate-y-[1cm] pointer-events-none">
                <div className="rotate-[10deg] origin-bottom animate-bounce [animation-duration:3.2s]">
                  <div className="relative flex items-center justify-center">
                  {/* 3D Stylized Question Mark SVG (No Glow, Scaled Up) */}
                  <svg
                    className="relative w-[84px] h-[100px] xs:w-[100px] xs:h-[120px] sm:w-[115px] sm:h-[138px]"
                    viewBox="0 0 100 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32 36C32 23 41 14 53 14C65 14 74 22 74 34C74 44 67 50 59 56C53 60 49 65 49 73H57C57 68 60 64 66 60C76 54 84 46 84 33C84 17 71 4 53 4C35 4 22 17 22 36H32ZM53 92C48 92 44 96 44 101C44 106 48 110 53 110C58 110 62 106 62 101C62 96 58 92 53 92Z"
                      fill="#FF2A35"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M32 36C32 23 41 14 53 14C65 14 74 22 74 34C74 44 67 50 59 56C53 60 49 65 49 73H57C57 68 60 64 66 60C76 54 84 46 84 33C84 17 71 4 53 4C35 4 22 17 22 36H32ZM53 92C48 92 44 96 44 101C44 106 48 110 53 110C58 110 62 106 62 101C62 96 58 92 53 92Z"
                      fill="url(#red-neon-grad)"
                    />
                    <defs>
                      <linearGradient id="red-neon-grad" x1="20" y1="4" x2="84" y2="110" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF6B72" />
                        <stop offset="0.5" stopColor="#E60000" />
                        <stop offset="1" stopColor="#8A0005" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* RIGHT COLUMN: Interactive Accordion FAQs */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4.5 w-full max-w-[880px]">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => toggleFAQ(item.id)}
                  className={`group relative w-full rounded-[10px] sm:rounded-[12px] p-5 sm:p-6 lg:p-7 cursor-pointer transition-all duration-300 border select-none ${
                    isOpen
                      ? 'bg-[rgba(78,78,78,0.28)] border-[#D01919]/50 shadow-[0_6px_28px_rgba(208,25,25,0.12)]'
                      : 'bg-[rgba(78,78,78,0.16)] hover:bg-[rgba(78,78,78,0.22)] border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  {/* Top Question Row */}
                  <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Red Accent Slash */}
                      <span className="font-[family-name:var(--font-onest)] font-bold text-[#D01919] text-[15px] sm:text-[18px] select-none shrink-0">
                        /
                      </span>

                      {/* Question Text */}
                      <h3 className="font-['Funnel_Display',sans-serif] font-bold text-white text-[15px] sm:text-[18px] lg:text-[20px] tracking-tight uppercase leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    {/* Smooth Toggle Indicator */}
                    <span
                      className={`text-[#D01919] text-[18px] sm:text-[20px] font-bold transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    >
                      +
                    </span>
                  </div>

                  {/* Expandable Answer Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-[family-name:var(--font-onest)] font-light text-zinc-300/90 text-[14px] sm:text-[16px] lg:text-[17.5px] leading-relaxed pt-3.5 sm:pt-4.5 mt-3.5 sm:mt-4 border-t border-white/[0.08]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceFAQSection;
