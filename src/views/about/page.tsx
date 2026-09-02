'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';
import AOS from 'aos';
import { Navbar } from '@/components/common/Navbar';
import AboutHero from './hero';
import AboutWhoWeAre from './WhoWeAre';
import WhyIsofiExists from './WhyIsofiExists';
import StartWithTheProblem from './StartWithTheProblem';
import ValueCreationThesis from './ValueCreationThesis';
import TeamShowcase from './TeamShowcase';
import ServiceFAQSection from '@/views/service/ServiceFAQSection';
import { AboutClientsSection } from './AboutClientsSection';
import HaveAProblemSection from '@/views/service/HaveAProblemSection';
import { WovenLightHero } from '@/components/ui/woven-light-hero';

export default function AboutPage() {
  useEffect(() => {
    AOS.refresh();
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Head>
        <title>About | ISOFINITI — We Build What Comes Next</title>
        <meta
          name="description"
          content="ISOFINITI is a technology and digital systems company helping businesses turn complex ideas into products, platforms and intelligent systems."
        />
      </Head>

      <main className="min-h-screen bg-[#efefef] text-black flex flex-col overflow-x-hidden selection:bg-[#D91E1E] selection:text-white">
        {/* Sticky Global Navigation Header */}
        <Navbar />

        {/* Component 1: About Hero with 3D Looping Fluid Glass Motion */}
        <AboutHero />

        {/* Component 2: Who We Are & Multidisciplinary Capability */}
        <AboutWhoWeAre />

        {/* Component 3: Why ISOFINITI Exists & The Paradigm Shift */}
        <WhyIsofiExists />

        {/* Component 4: How We Think — Start With The Problem */}
        <StartWithTheProblem />

        {/* Component 5: Standalone Value Creation Thesis Statement */}
        <ValueCreationThesis />

        {/* Component 6: Team Fan Deck & Perspective */}
        <TeamShowcase />

        {/* Component 7: Answers to Your Queries (FAQ with Thinking Robot) */}
        <ServiceFAQSection />

        {/* Component 8: Inspired by the Needs of Our Clients & Testimonial */}
        <AboutClientsSection />

        {/* Component 9: Have A Problem Worth Solving? (CTA Section) */}
        <HaveAProblemSection />

        {/* Component 10: Official Landing Page Footer & 3D Interactive Emblem */}
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
