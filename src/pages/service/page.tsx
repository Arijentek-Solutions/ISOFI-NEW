'use client';

import React from 'react';
import Head from 'next/head';
import { Navbar } from '@/components/common/Navbar';
import ServiceHero from './hero';
import IdeaToIntelligentSystem from './IdeaToIntelligentSystem';
import ServiceCapabilitiesList from './ServiceCapabilitiesList';
import ServiceFAQSection from './ServiceFAQSection';
import HaveAProblemSection from './HaveAProblemSection';
import { WovenLightHero } from '@/components/ui/woven-light-hero';

export default function ServicePage() {
  return (
    <>
      <Head>
        <title>Services | ISOFINITI — Technology That Moves Business Forward</title>
        <meta
          name="description"
          content="We combine strategy, design, engineering, AI and automation to build digital systems that solve real business problems and create room for growth."
        />
      </Head>

      <main className="min-h-screen bg-[#efefef] text-black flex flex-col overflow-x-hidden selection:bg-[#D91E1E] selection:text-white">
        {/* Navigation Header */}
        <Navbar />

        {/* Hero Section (Figma Exact 1:1 Specs with /videos/serviceHero.mp4) */}
        <ServiceHero />

        {/* Component 2: From Idea To Intelligent System with Blurred 3D Emblems */}
        <IdeaToIntelligentSystem />

        {/* Component 3: 3 Service Categories with Auto-scrolling Cards & Specs */}
        <ServiceCapabilitiesList />

        {/* Component 4: Answers to Your Queries (FAQ with Thinking Robot) */}
        <ServiceFAQSection />

        {/* Component 5: Have A Problem Worth Solving? (CTA Section) */}
        <HaveAProblemSection />

        {/* Component 6: Official Landing Page Footer & 3D Interactive Emblem */}
        <section className="w-full relative bg-black">
          <WovenLightHero
            headline="WHAT ARE YOU&#10;BUILDING NEXT ?"
            subheadline="Tell us what you're trying to build, improve or automate."
            onSubmit={(val) => {
              console.log('Submitted project vision:', val);
            }}
          />
        </section>
      </main>
    </>
  );
}
