'use client';

import React from 'react';
import Image from 'next/image';

interface CaseStudyItem {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  challenge: string;
  protocol: string;
  output: string;
  imageOnRight?: boolean;
}

const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'llm-platform',
    title: 'LOCALIZED LLM PLATFORM',
    image: '/images/case-studies/cs-llm.png',
    imageAlt: 'Localized LLM Platform 3D Server Infrastructure',
    challenge:
      'Arijentek required a modern AI platform to simplify complex LLM workflows while ensuring enterprise-level performance and understanding entire documents with fast, localized responses.',
    protocol:
      'Engineered a platform that delivers 1M token context at 500+ tokens/second, fully localized, fully on-premise with real-time streaming output.',
    output:
      '1M TOKEN CONTEXT | 523 TOKENS/SEC | 97.3% RETRIEVAL ACCURACY | $0 THIRD-PARTY API COSTS',
    imageOnRight: false,
  },
  {
    id: 'voice-engine',
    title: 'MODULE 2C VOICE ENGINE & LOCAL RAG',
    image: '/images/case-studies/cs-voice.png',
    imageAlt: 'Module 2C Voice Engine Digital Waveform and Face Mesh',
    challenge:
      'Required scalable voice AI and Local RAG solution running entirely inside infrastructure for fast, accurate responses. Voice interaction needed to feel natural, retrieving from internal documents rather than internet data.',
    protocol:
      'Designed a custom architecture for voice engine and RAG pipeline running locally. One interface for everything: speak or type, get accurate answers with source citations in any language.',
    output:
      '98% CLIENT SATISFACTION RATE | MOS 4.8 VOICE QUALITY | 600MS TTS LATENCY',
    imageOnRight: true,
  },
  {
    id: 'ops-backups',
    title: 'USA + INDIA OPERATIONS & BACKUPS',
    image: '/images/case-studies/cs-ops.png',
    imageAlt: 'USA and India Global Operations Cloud Security Infrastructure',
    challenge:
      'Required a streamlined operational system to manage cross-region workflows and infrastructure reliability across USA and India. Time zone gaps and backup failures were causing communication breakdowns and inconsistent delivery.',
    protocol:
      'Built an operating system that made geography irrelevant, eliminating friction through new handoff protocols, backup infrastructure, and client dashboards.',
    output:
      '92% ON-TIME DELIVERY | $0 DISASTER RECOVERY LOSS | 70% FASTER EXECUTION',
    imageOnRight: false,
  },
];

export function CaseStudiesList() {
  return (
    <section className="w-full bg-[#efefef] text-black pt-6 sm:pt-16 lg:pt-36 pb-20 sm:pb-36 lg:pb-48 px-6 sm:px-12 lg:px-[90px] xl:px-[119px] overflow-hidden select-none">
      <div className="w-full max-w-[1540px] mx-auto flex flex-col gap-28 sm:gap-40 lg:gap-56">
        {CASE_STUDIES.map((study) => {
          return (
            <div
              key={study.id}
              className={`grid grid-cols-1 lg:grid-cols-12 items-center gap-10 sm:gap-14 lg:gap-16 xl:gap-24 w-full ${
                study.imageOnRight ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* ========================================================================= */}
              {/* IMAGE SHOWCASE COLUMN (Figma exact: w=757px, h=947px portrait aspect)    */}
              {/* ========================================================================= */}
              <div
                className={`w-full lg:col-span-6 flex justify-center ${
                  study.imageOnRight ? 'lg:col-start-7' : 'lg:col-start-1'
                }`}
                data-aos={study.imageOnRight ? "fade-left" : "fade-right"}
                data-aos-duration="900"
              >
                <div className="relative w-full max-w-[740px] aspect-[757/920] rounded-[10px] bg-[#141416] border border-white/15 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)] group">
                  {/* Figma Exact Crimson Corner Bracket Accents (Top-Left) */}
                  <div className="absolute top-0 left-0 w-28 h-28 pointer-events-none z-20">
                    <div className="absolute top-0 left-0 w-[4px] sm:w-[5px] h-24 sm:h-32 bg-gradient-to-b from-[#d91e1e] to-transparent" />
                    <div className="absolute top-0 left-0 h-[4px] sm:h-[5px] w-24 sm:w-32 bg-gradient-to-r from-[#d91e1e] to-transparent" />
                  </div>

                  {/* Figma Exact Crimson Corner Bracket Accents (Bottom-Right) */}
                  <div className="absolute bottom-0 right-0 w-28 h-28 pointer-events-none z-20">
                    <div className="absolute bottom-0 right-0 w-[4px] sm:w-[5px] h-24 sm:h-32 bg-gradient-to-t from-[#d91e1e] to-transparent" />
                    <div className="absolute bottom-0 right-0 h-[4px] sm:h-[5px] w-24 sm:w-32 bg-gradient-to-l from-[#d91e1e] to-transparent" />
                  </div>

                  {/* High-Resolution Visual Artwork */}
                  <Image
                    src={study.image}
                    alt={study.imageAlt}
                    fill
                    className="object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />

                  {/* Vignette Depth Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
                </div>
              </div>

              {/* ========================================================================= */}
              {/* INFORMATION CONTENT COLUMN (Figma exact: w=659px, font size 62px)        */}
              {/* ========================================================================= */}
              <div
                className={`w-full lg:col-span-6 flex flex-col justify-center gap-8 sm:gap-11 lg:gap-12 max-w-[660px] ${
                  study.imageOnRight ? 'lg:col-start-1' : 'lg:col-start-7'
                }`}
                data-aos={study.imageOnRight ? "fade-right" : "fade-left"}
                data-aos-duration="900"
                data-aos-delay="150"
              >
                {/* Main Headline */}
                <h2 className="font-['Funnel_Display',sans-serif] font-bold text-[clamp(26px,3.2vw,44px)] xl:text-[48px] leading-[1.08] tracking-tight uppercase text-black">
                  {study.title}
                </h2>

                {/* Section 1: THREAT / CHALLENGE */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {/* Small Red Status Dot */}
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d01919] shrink-0" />
                    {/* Red Pulse Icon */}
                    <svg className="w-3.5 h-3.5 text-[#d91e1e] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                    {/* Eyebrow Label */}
                    <span className="font-['Funnel_Display',sans-serif] font-bold text-[#d91e1e] text-[12px] sm:text-[13px] tracking-[1.3px] uppercase">
                      THREAT / CHALLENGE
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-onest)] font-normal text-[#313131] text-[14.5px] sm:text-[16.5px] lg:text-[18px] xl:text-[19px] leading-[1.5] lg:leading-[29px] max-w-[560px] pl-5 sm:pl-6">
                    {study.challenge}
                  </p>
                </div>

                {/* Section 2: EXECUTED PROTOCOL */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {/* Small Red Status Dot */}
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d01919] shrink-0" />
                    {/* Red Protocol Diamond Icon */}
                    <svg className="w-3.5 h-3.5 text-[#d91e1e] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 22 12 12 22 2 12" />
                    </svg>
                    {/* Eyebrow Label */}
                    <span className="font-['Funnel_Display',sans-serif] font-bold text-[#d91e1e] text-[12px] sm:text-[13px] tracking-[1.3px] uppercase">
                      EXECUTED PROTOCOL
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-onest)] font-normal text-[#313131] text-[14.5px] sm:text-[16.5px] lg:text-[18px] xl:text-[19px] leading-[1.5] lg:leading-[29px] max-w-[560px] pl-5 sm:pl-6">
                    {study.protocol}
                  </p>
                </div>

                {/* Section 3: SYSTEM OUTPUT (Figma Frosted Output Card) */}
                <div className="w-full max-w-[620px] rounded-[16px] bg-[rgba(217,217,217,0.35)] border border-black/5 px-5 sm:px-8 py-5 sm:py-7 shadow-[0px_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#d01919] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    <span className="font-['Funnel_Display',sans-serif] font-bold text-[#d01919] text-[12px] sm:text-[13px] tracking-[1.3px] uppercase">
                      SYSTEM OUTPUT
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-onest)] font-medium text-[#313131] text-[13px] sm:text-[14.5px] lg:text-[15.5px] leading-[23px] sm:leading-[25px] uppercase tracking-wide">
                    {study.output}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CaseStudiesList;
