'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function ContactDirectChannelsSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="direct-channels"
      className="w-full bg-[#efefef] text-black py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-[100px] overflow-hidden select-none"
      data-node-id="direct-channels-section"
    >
      <div className="w-full max-w-[1540px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: DIRECT CHANNELS                                             */}
        {/* ========================================================================= */}
        <div 
          className="lg:col-span-6 flex flex-col gap-10 sm:gap-14"
          data-aos="fade-right"
          data-aos-duration="850"
        >
          <div className="flex flex-col gap-4">
            <h2 className="font-['Funnel_Display',sans-serif] font-extrabold text-black text-[clamp(32px,3.8vw,56px)] leading-[1.05] tracking-tight uppercase">
              DIRECT CHANNELS
            </h2>
            <p className="font-[family-name:var(--font-onest)] font-light text-black/70 text-[16px] sm:text-[19px] lg:text-[21px] leading-[1.55] max-w-[540px]">
              Prefer direct transmission? Our operational team is available Monday through Friday, 9am to 6pm EST.
            </p>
          </div>

          {/* 3 Contact Channels List */}
          <div className="flex flex-col gap-8">
            {/* Channel 1: Email */}
            <div className="flex items-center gap-5 sm:gap-6 group">
              <div className="w-[64px] h-[64px] rounded-[10px] bg-white/70 border border-black/5 flex items-center justify-center shadow-sm group-hover:border-[#d91e1e]/40 transition-colors shrink-0">
                <Mail className="w-6 h-6 text-[#d91e1e]" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Funnel_Display',sans-serif] font-bold text-black/50 text-[12px] sm:text-[13px] tracking-[1.5px] uppercase">
                  PRIORITY SIGNAL (EMAIL)
                </span>
                <a
                  href="mailto:hello@isofiniti.agency"
                  className="font-[family-name:var(--font-onest)] font-medium text-black text-[18px] sm:text-[22px] hover:text-[#d91e1e] transition-colors"
                >
                  hello@isofiniti.agency
                </a>
              </div>
            </div>

            {/* Channel 2: HQ Location */}
            <div className="flex items-center gap-5 sm:gap-6 group">
              <div className="w-[64px] h-[64px] rounded-[10px] bg-white/70 border border-black/5 flex items-center justify-center shadow-sm group-hover:border-[#d91e1e]/40 transition-colors shrink-0">
                <MapPin className="w-6 h-6 text-[#d91e1e]" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Funnel_Display',sans-serif] font-bold text-black/50 text-[12px] sm:text-[13px] tracking-[1.5px] uppercase">
                  HQ COORDINATES
                </span>
                <p className="font-[family-name:var(--font-onest)] font-medium text-black text-[17px] sm:text-[20px] leading-snug">
                  1200 Innovation Drive, Sector 400 <br />
                  New York, NY 10001
                </p>
              </div>
            </div>

            {/* Channel 3: Phone */}
            <div className="flex items-center gap-5 sm:gap-6 group">
              <div className="w-[64px] h-[64px] rounded-[10px] bg-white/70 border border-black/5 flex items-center justify-center shadow-sm group-hover:border-[#d91e1e]/40 transition-colors shrink-0">
                <Phone className="w-6 h-6 text-[#d91e1e]" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Funnel_Display',sans-serif] font-bold text-black/50 text-[12px] sm:text-[13px] tracking-[1.5px] uppercase">
                  VOICE PROTOCOL (PHONE)
                </span>
                <a
                  href="tel:+15551234567"
                  className="font-[family-name:var(--font-onest)] font-medium text-black text-[18px] sm:text-[22px] hover:text-[#d91e1e] transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: INPUT PARAMETERS (Interactive Form)                         */}
        {/* ========================================================================= */}
        <div 
          className="lg:col-span-6 w-full"
          data-aos="fade-left"
          data-aos-duration="850"
          data-aos-delay="200"
        >
          <div className="w-full rounded-[14px] bg-white/85 border border-white p-7 sm:p-10 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-lg">
            <h3 className="font-['Funnel_Display',sans-serif] font-bold text-black text-[22px] sm:text-[26px] tracking-tight uppercase mb-8">
              INPUT PARAMETERS
            </h3>

            {submitted ? (
              <div className="py-16 flex flex-col items-center justify-center text-center gap-4">
                <CheckCircle2 className="w-14 h-14 text-[#d91e1e]" />
                <h4 className="font-['Funnel_Display',sans-serif] font-bold text-2xl text-black">
                  TRANSMISSION RECEIVED
                </h4>
                <p className="font-[family-name:var(--font-onest)] text-black/60 max-w-[360px]">
                  Thank you. Our technical leadership team will analyze your parameters and respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-['Funnel_Display',sans-serif] font-bold text-black text-[12px] tracking-[1.2px] uppercase">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full h-[52px] px-4 rounded-[6px] bg-[#f4f4f4] border border-black/5 text-black placeholder:text-black/35 font-[family-name:var(--font-onest)] text-base focus:outline-none focus:ring-2 focus:ring-[#d91e1e]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-['Funnel_Display',sans-serif] font-bold text-black text-[12px] tracking-[1.2px] uppercase">
                      WORK EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@enterprise.com"
                      className="w-full h-[52px] px-4 rounded-[6px] bg-[#f4f4f4] border border-black/5 text-black placeholder:text-black/35 font-[family-name:var(--font-onest)] text-base focus:outline-none focus:ring-2 focus:ring-[#d91e1e]"
                    />
                  </div>
                </div>

                {/* Row 2: Company */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Funnel_Display',sans-serif] font-bold text-black text-[12px] tracking-[1.2px] uppercase">
                    ORGANIZATION / COMPANY
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Enterprise Corp"
                    className="w-full h-[52px] px-4 rounded-[6px] bg-[#f4f4f4] border border-black/5 text-black placeholder:text-black/35 font-[family-name:var(--font-onest)] text-base focus:outline-none focus:ring-2 focus:ring-[#d91e1e]"
                  />
                </div>

                {/* Row 3: Service Dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Funnel_Display',sans-serif] font-bold text-black text-[12px] tracking-[1.2px] uppercase">
                    WHAT CAN WE HELP WITH?
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full h-[52px] px-4 rounded-[6px] bg-[#f4f4f4] border border-black/5 text-black font-[family-name:var(--font-onest)] text-base focus:outline-none focus:ring-2 focus:ring-[#d91e1e] cursor-pointer"
                  >
                    <option value="">[ Select an option ]</option>
                    <option value="digital-product">Digital Products & Platform Engineering</option>
                    <option value="ai-solutions">AI Solutions & LLM Infrastructure</option>
                    <option value="automation">Automation Workflows & Internal Tools</option>
                    <option value="cloud-systems">Cloud Architecture & Operations</option>
                    <option value="other">Other Strategic Initiative</option>
                  </select>
                </div>

                {/* Row 4: Project Scope Textarea */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Funnel_Display',sans-serif] font-bold text-black text-[12px] tracking-[1.2px] uppercase">
                    TELL US ABOUT THE PROJECT
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Define your objectives, budget, and timeline parameters..."
                    className="w-full p-4 rounded-[6px] bg-[#f4f4f4] border border-black/5 text-black placeholder:text-black/35 font-[family-name:var(--font-onest)] text-base focus:outline-none focus:ring-2 focus:ring-[#d91e1e] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-[54px] rounded-[6px] bg-[#d91e1e] hover:bg-[#b01414] active:scale-[0.99] text-white font-['Funnel_Display',sans-serif] font-bold text-[14px] sm:text-[15px] tracking-[1.5px] uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_6px_24px_rgba(217,30,30,0.35)] cursor-pointer mt-2"
                >
                  <span>EXECUTE UPLOAD</span>
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactDirectChannelsSection;
