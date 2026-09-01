'use client';

import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { CaseStudiesHero } from './hero';
import { CaseStudiesList } from './CaseStudiesList';
import { ServiceFAQSection } from '@/pages/service/ServiceFAQSection';
import { AboutClientsSection } from '@/pages/about/AboutClientsSection';
import { HaveAProblemSection } from '@/pages/service/HaveAProblemSection';
import { WovenLightHero } from '@/components/ui/woven-light-hero';

export function CaseStudiesPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#efefef] text-black overflow-x-hidden">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Case Studies Hero Section with 3D Crystal Cubes Video */}
      <CaseStudiesHero />

      {/* 3. Case Studies Showcase Deep Dives */}
      <CaseStudiesList />

      {/* 4. Practical FAQ Accordion with Robot Mascot */}
      <ServiceFAQSection />

      {/* 5. Inspired by the Needs of Our Clients & Testimonial */}
      <AboutClientsSection />

      {/* 6. Have A Problem Worth Solving? Conversion CTA */}
      <HaveAProblemSection />

      {/* 7. Footer - WHAT ARE YOU BUILDING NEXT? */}
      <WovenLightHero />
    </div>
  );
}

export default CaseStudiesPage;
