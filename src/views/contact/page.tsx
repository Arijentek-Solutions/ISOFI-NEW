'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import { Navbar } from '@/components/common/Navbar';
import { ConnectHero } from './hero';
import { ContactMindSection } from './ContactMindSection';
import { ContactDirectChannelsSection } from './ContactDirectChannelsSection';
import { GoodThingsSection } from './GoodThingsSection';
import { WovenLightHero } from '@/components/ui/woven-light-hero';

export function ContactPage() {
  useEffect(() => {
    AOS.refresh();
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="relative w-full min-h-screen bg-[#efefef] text-black overflow-x-hidden">
      {/* 1. Global Dynamic Contrast Navigation Bar */}
      <Navbar />

      {/* 2. Connect Hero Banner with 3D Infinity Video */}
      <ConnectHero />

      {/* 3. Tell Us What's On Your Mind Section */}
      <ContactMindSection />

      {/* 4. Direct Transmission Channels & Input Parameters Form */}
      <ContactDirectChannelsSection />

      {/* 5. Good Things Start With A Conversation CTA (Full Screen Fit) */}
      <GoodThingsSection />

      {/* 6. Footer - What Are You Building Next? */}
      <WovenLightHero />
    </div>
  );
}

export default ContactPage;
