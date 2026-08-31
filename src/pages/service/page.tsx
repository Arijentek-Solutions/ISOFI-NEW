'use client';

import React from 'react';
import Head from 'next/head';
import { Navbar } from '@/components/common/Navbar';
import ServiceHero from './hero';

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
      </main>
    </>
  );
}
