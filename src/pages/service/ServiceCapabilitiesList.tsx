'use client';

import React from 'react';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

interface ServiceCategory {
  id: string;
  titlePrefix: string;
  titleAccent: string;
  services: ServiceItem[];
  cards: { id: number; alt?: string; image?: string }[];
  direction?: 'left' | 'right';
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'design-experience',
    titlePrefix: 'Design & ',
    titleAccent: 'Experience',
    services: [
      {
        id: 'ui-ux-3d',
        number: '01',
        title: 'UI/UX DESIGN & 3D VISUALIZATION',
        description: 'Improved user retention and high-impact visual storytelling.',
        linkText: 'INITIALIZE SPECS',
        linkHref: '#specs',
      },
      {
        id: 'mobile-app',
        number: '02',
        title: 'MOBILE APP DEVELOPMENT',
        description: 'Scalable customer acquisition, brand visibility, and streamlined online sales.',
        linkText: 'INITIALIZE SPECS',
        linkHref: '#specs',
      },
    ],
    cards: [
      { id: 1, alt: 'UI/UX Blueprint Design' },
      { id: 2, alt: 'Futuristic Digital Interface' },
      { id: 3, alt: 'Mobile Ecosystem Wireframe' },
      { id: 4, alt: 'Interactive 3D Visuals' },
    ],
    direction: 'left',
  },
  {
    id: 'technology-infrastructure',
    titlePrefix: 'Technology ',
    titleAccent: '& Infrastructure',
    services: [
      {
        id: 'ai-automation',
        number: '03',
        title: 'AI TECHNOLOGY & AUTOMATION',
        description:
          'Exponentially higher productivity and a faster path to scaling without increasing headcount',
        linkText: 'INITIALIZE SPECS',
        linkHref: '#specs',
      },
      {
        id: 'saas-iaas',
        number: '04',
        title: 'SAAS & IAAS',
        description: 'Reduced capital expenditure and instant global scalability.',
        linkText: 'INITIALIZE SPECS',
        linkHref: '#specs',
      },
      {
        id: 'network-infra',
        number: '05',
        title: 'NETWORK INFRASTRUCTURE & SECURITY',
        description: 'Zero-trust security and network uptime.',
        linkText: 'INITIALIZE SPECS',
        linkHref: '#specs',
      },
      {
        id: 'cybersecurity',
        number: '06',
        title: 'CYBERSECURITY',
        description:
          'Complete protection of your intellectual property and 24/7 peace of mind.',
        linkText: 'INITIALIZE SPECS',
        linkHref: '#specs',
      },
    ],
    cards: [
      { id: 1, alt: 'Autonomous AI Neural Core' },
      { id: 2, alt: 'Cloud Network Infrastructure' },
      { id: 3, alt: 'Cybersecurity Firewall Matrix' },
      { id: 4, alt: 'Enterprise SaaS Architecture' },
    ],
    direction: 'left',
  },
  {
    id: 'growth-business',
    titlePrefix: 'Growth ',
    titleAccent: '& Business Systems',
    services: [
      {
        id: 'digital-marketing',
        number: '07',
        title: 'DIGITAL MARKETING & ECOMMERCE',
        description: 'Scalable customer acquisition, brand visibility, and streamlined online sales.',
        linkText: 'INITIALIZE SPECS',
        linkHref: '#specs',
      },
      {
        id: 'erp-implementation',
        number: '08',
        title: 'ERP IMPLEMENTATION',
        description:
          'Real-time visibility into your business operations and reduced administrative overhead.',
        linkText: 'INITIALIZE SPECS',
        linkHref: '#specs',
      },
    ],
    cards: [
      { id: 1, alt: 'Growth Engine Analytics' },
      { id: 2, alt: 'ERP Operational Dashboard' },
      { id: 3, alt: 'Omnichannel Commerce Funnel' },
      { id: 4, alt: 'Supply Chain Automation' },
    ],
    direction: 'left',
  },
];

export function ServiceCapabilitiesList() {
  return (
    <section className="w-full bg-[#efefef] text-black overflow-hidden py-16 sm:py-24 lg:py-32 flex flex-col gap-24 sm:gap-32 lg:gap-40">
      {SERVICE_CATEGORIES.map((category) => (
        <div key={category.id} className="w-full flex flex-col items-center">
          {/* ========================================================================= */}
          {/* CATEGORY SECTION HEADER (Centered Title with Red Accent)                 */}
          {/* ========================================================================= */}
          <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-[82px] text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="font-['Funnel_Display',sans-serif] font-extrabold text-[clamp(34px,4.8vw,86px)] leading-[1.01] tracking-[-1.5px] sm:tracking-[-2.5px] lg:tracking-[-3.78px] text-black">
              <span>{category.titlePrefix}</span>
              <span className="text-[#D91E1E]">{category.titleAccent}</span>
            </h2>
          </div>

          {/* ========================================================================= */}
          {/* SERVICES SPECIFICATION GRID (01, 02... with Title, Copy, Link)          */}
          {/* ========================================================================= */}
          <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-[110px] mb-14 sm:mb-20 lg:mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12 sm:gap-y-16">
              {category.services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-start gap-5 sm:gap-8 lg:gap-10 group"
                >
                  {/* Huge Monospaced / Display Number (01, 02...) */}
                  <span className="font-['Funnel_Display',sans-serif] font-bold text-[clamp(54px,5.8vw,110px)] leading-[0.88] text-black shrink-0 select-none tracking-tight">
                    {service.number}
                  </span>

                  {/* Service Text Details */}
                  <div className="flex flex-col items-start pt-1 sm:pt-2 max-w-[540px]">
                    <h3 className="font-['Funnel_Display',sans-serif] font-bold text-[clamp(18px,1.8vw,32px)] leading-[1.2] text-black tracking-[0.5px] uppercase">
                      {service.title}
                    </h3>

                    <p className="font-[family-name:var(--font-onest)] font-normal text-[clamp(14px,1.2vw,20px)] leading-[1.5] sm:leading-[1.55] text-[rgba(0,0,0,0.55)] mt-2.5 sm:mt-3.5 mb-3.5 sm:mb-4.5">
                      {service.description}
                    </p>

                    <a
                      href={service.linkHref || '#specs'}
                      className="font-[family-name:var(--font-chakra)] font-bold text-[13px] sm:text-[14px] text-[#D91E1E] tracking-[1px] uppercase inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                      <span>{service.linkText || 'INITIALIZE SPECS'}</span>
                      <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* INFINITE AUTO-SCROLLING CAROUSEL: SLEEK BLANK GRAY CARDS                  */}
          {/* ========================================================================= */}
          <div className="w-full overflow-hidden select-none relative group cursor-grab active:cursor-grabbing">
            {/* Seamless Infinite Marquee Track */}
            <div className="animate-marquee-left flex items-center gap-6 sm:gap-8 lg:gap-10 py-3">
              {/* Render items twice to create seamless loop */}
              {[...category.cards, ...category.cards, ...category.cards].map(
                (card, idx) => (
                  <div
                    key={`${card.id}-${idx}`}
                    className="shrink-0 w-[240px] xs:w-[320px] sm:w-[420px] lg:w-[520px] h-[160px] xs:h-[210px] sm:h-[260px] lg:h-[320px] rounded-[16px] sm:rounded-[20px] bg-[#1c1e22] border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)] relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 lg:p-7 transition-transform duration-500 hover:scale-[1.01]"
                  >
                    {/* Subtle Internal Ambient Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-black/40 pointer-events-none" />

                    {/* Top Status Header inside Blank Card */}
                    <div className="relative z-10 flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#D91E1E]/80 animate-pulse" />
                        <span className="font-[family-name:var(--font-chakra)] text-[10px] sm:text-[11px] font-semibold tracking-[1.5px] uppercase text-zinc-400">
                          MEDIA ASSET / READY
                        </span>
                      </div>
                      <span className="font-[family-name:var(--font-chakra)] text-[11px] sm:text-[12px] font-bold text-zinc-500">
                        #0{(idx % category.cards.length) + 1}
                      </span>
                    </div>

                    {/* Center Placeholder Watermark / Ready indicator */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center py-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-3">
                        <svg
                          className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <span className="font-['Funnel_Display',sans-serif] text-xs sm:text-sm font-semibold tracking-wider text-zinc-500 uppercase">
                        {card.alt || 'MEDIA SLOT READY'}
                      </span>
                    </div>

                    {/* Bottom Meta Info */}
                    <div className="relative z-10 flex items-center justify-between text-zinc-500 font-['Onest',sans-serif] text-[11px] sm:text-[12px]">
                      <span>ISOFINITI ENGINE</span>
                      <span className="text-zinc-600">AUTO-SCROLLING</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ServiceCapabilitiesList;
