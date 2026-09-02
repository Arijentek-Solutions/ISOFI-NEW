'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardStack, CardStackItem } from '@/components/ui/card-stack';

interface TeamMember extends CardStackItem {
  role: string;
  tagline: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    title: 'Alex Vance',
    role: 'AI / SYSTEMS ARCHITECT',
    tagline: 'Builds scalable intelligent backbones that never break under pressure.',
    imageSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Kenji Sato',
    role: 'CREATIVE TECHNOLOGIST',
    tagline: 'Transforms complex technical logic into fluid, tactile digital interactions.',
    imageSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'David Ross',
    role: 'UI/UX DESIGNER',
    tagline: 'Will detect a 1px misalignment from across the room.',
    imageSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Elena Rostova',
    role: 'PRODUCT STRATEGIST',
    tagline: 'Bridges the gap between visionary business objectives and deep engineering.',
    imageSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Maya Lin',
    role: 'LEAD INNOVATOR',
    tagline: 'Architects intelligent systems and future-ready digital platforms.',
    imageSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
  },
];

export function TeamShowcase() {
  const [activeIndex, setActiveIndex] = useState(2); // Start with center UI/UX Designer card active

  const currentMember = teamMembers[activeIndex] || teamMembers[2];

  return (
    <section
      className="relative w-full max-w-[1920px] mx-auto bg-[#efefef] text-black overflow-hidden select-none px-4 sm:px-8 lg:px-[82px] py-16 sm:py-24 lg:py-28 flex flex-col justify-center items-center"
      data-node-id="team-showcase"
    >
      {/* 5-Portrait Dynamic Fan Deck Card Stack */}
      <div
        className="relative w-full max-w-[1100px] flex items-center justify-center"
        data-aos="fade-up"
        data-aos-duration="900"
      >
        <CardStack
          items={teamMembers}
          initialIndex={2}
          cardWidth={340}
          cardHeight={460}
          overlap={0.52}
          spreadDeg={32}
          depthPx={110}
          tiltXDeg={6}
          activeLiftPx={24}
          loop={true}
          autoAdvance={false}
          showDots={true}
          onChangeIndex={(idx) => setActiveIndex(idx)}
          renderCard={(item) => (
            <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-neutral-900 shadow-xl">
              <img
                src={item.imageSrc}
                alt={item.title || 'Team member'}
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
                loading="eager"
              />
            </div>
          )}
        />
      </div>

      {/* Role / Tag & Dynamic Bio */}
      <div
        className="mt-6 sm:mt-10 text-center flex flex-col items-center min-h-[120px]"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="750"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMember.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <span
              data-node-id="1408:7073"
              className="font-[family-name:var(--font-chakra)] font-bold text-[18px] sm:text-[22px] lg:text-[26px] text-[#D91E1E] tracking-[2px] uppercase"
            >
              {currentMember.role}
            </span>

            {/* Humorous / Insightful Bio Tagline */}
            <p
              data-node-id="1408:7072"
              className="font-[family-name:var(--font-onest)] font-normal text-black/75 text-[16px] sm:text-[20px] lg:text-[24px] leading-relaxed text-center mt-2 max-w-[720px] px-4"
            >
              {currentMember.tagline}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default TeamShowcase;
