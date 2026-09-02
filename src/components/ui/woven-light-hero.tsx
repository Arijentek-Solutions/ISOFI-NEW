"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import * as THREE from "three";
import { SilkBackgroundAnimation } from "@/components/ui/silk-background-animation";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";

export interface WovenLightHeroProps {
  headline?: string;
  subheadline?: string;
  onSubmit?: (val: string) => void;
  onStartProject?: () => void;
  onViewWork?: () => void;
}

export const WovenLightHero: React.FC<WovenLightHeroProps> = ({
  headline = "WHAT ARE YOU\nBUILDING NEXT ?",
  subheadline = "Tell us what you're trying to build, improve or automate.",
  onSubmit,
  onStartProject,
  onViewWork,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(inputValue);
  };

  return (
    <div className="relative isolate min-h-screen lg:h-screen w-full overflow-hidden bg-black text-white selection:bg-[#D01919] selection:text-white flex flex-col justify-between pt-24 sm:pt-28 lg:pt-20 select-none">
      {/* 1. Dynamic Animated Silk Background (Very Subtle Ambient Background ~20% Opacity) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        <SilkBackgroundAnimation colorScheme="dark" showText={false} speed={1.1} />

        {/* Ambient Top Subtle Moonlight Glow (Monochrome) */}
        <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[min(1000px,90vw)] h-[350px] bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-[90px] pointer-events-none" />
      </div>

      {/* 2. Main Split Stage Content */}
      <main className="relative z-20 w-full max-w-[1920px] mx-auto px-5 sm:px-8 md:px-14 lg:px-[82px] flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-4 lg:gap-8 pointer-events-none py-2 sm:py-4 lg:py-0">
        
        {/* LEFT COLUMN: Typography & Interactive Submit Form (~55% width) - Always Visible */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center pointer-events-auto z-20 max-w-[760px] opacity-100 my-auto">
          {/* Main Headline */}
          <h1 className="font-['Funnel_Display',sans-serif] font-bold text-white tracking-[-0.02em] text-[clamp(28px,4.5vw,74px)] leading-[1.01] uppercase">
            WHAT ARE YOU <br />
            BUILDING NEXT <span className="text-[#D01919]">?</span>
          </h1>

          {/* Subtitle */}
          <p className="font-[family-name:var(--font-onest)] font-light text-zinc-300/90 text-xs sm:text-sm lg:text-[18px] xl:text-[20px] leading-relaxed mt-3 sm:mt-4 max-w-[600px]">
            {subheadline}
          </p>

          {/* Glassmorphic Input & Action Button */}
          <form onSubmit={handleSubmit} className="mt-5 sm:mt-7 flex flex-col gap-3 sm:gap-4 max-w-[600px]">
            <div className="relative w-full rounded-xl border border-white/15 bg-black/40 backdrop-blur-xl transition-all duration-300 focus-within:border-[#D01919]/70 focus-within:shadow-[0_0_30px_rgba(208,25,25,0.15)]">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your project vision or message..."
                rows={2}
                className="w-full resize-none bg-transparent p-3 sm:p-4 text-xs sm:text-sm md:text-base text-white placeholder-zinc-500 focus:outline-none"
              />
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-[#D01919] px-6 sm:px-10 py-2.5 sm:py-3 font-[family-name:var(--font-onest)] text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(208,25,25,0.35)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#b01414] hover:shadow-[0_0_35px_rgba(208,25,25,0.55)] active:scale-95"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Interactive 3D ISOFINITI Infinity Particle System (~45% width) */}
        <div className="lg:col-span-6 xl:col-span-5 h-[300px] xs:h-[360px] sm:h-[420px] md:h-[480px] lg:h-[540px] w-full relative flex items-center justify-center pointer-events-auto my-auto translate-y-6 sm:translate-y-8 lg:translate-y-10">
          {/* Subtle Ambient Vignette Behind 3D Logo (Pure Monochrome) */}
          <div className="absolute w-[240px] sm:w-[320px] lg:w-[380px] h-[240px] sm:h-[320px] lg:h-[380px] rounded-full bg-white/[0.03] blur-[70px] pointer-events-none" />

          {/* 3D Three.js Woven Emblem Canvas with Bold Red Diagonal Prisms */}
          <div className="relative w-full h-full flex items-center justify-center">
            <WovenCanvas shape="infinity" brandColor="#FF1822" />
          </div>
        </div>
      </main>

      {/* 3. Bottom Footer Status Bar matching user's exact specification */}
      <footer className="relative z-30 w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-14 lg:px-[82px] pt-6 sm:pt-8 pb-6 sm:pb-8 flex flex-col pointer-events-auto">
        {/* Menu & Legal Columns */}
        <div className="grid grid-cols-2 gap-8 sm:gap-12 md:gap-20 w-full max-w-[480px]">
          {/* Menu Column */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <span className="font-['Inter',sans-serif] text-[11px] sm:text-[12px] font-medium tracking-[1.2px] uppercase text-white/60">
              MENU
            </span>
            <div className="flex flex-col gap-2 font-['Inter',sans-serif] text-[13.5px] sm:text-[15px] font-normal text-white/90">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contacts</Link>
            </div>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <span className="font-['Inter',sans-serif] text-[11px] sm:text-[12px] font-medium tracking-[1.2px] uppercase text-white/60">
              LEGAL
            </span>
            <div className="flex flex-col gap-2 font-['Inter',sans-serif] text-[13.5px] sm:text-[15px] font-normal text-white/90">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Glowing Red Accent Divider Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-[#D01919]/40 via-[#D01919] to-[#D01919]/40 shadow-[0_0_16px_rgba(208,25,25,0.9)] opacity-85 mt-6 sm:mt-8 mb-4 sm:mb-5" />

        {/* Bottom Row: ISOFINITI Text Logo (Left) + FullIcon Bracket Emblem (Right) */}
        <div className="flex items-center justify-between w-full pt-1">
          <div className="flex items-center">
            <Logo fill="#FFFFFF" accentColor="#D01919" width={138} height={18} className="w-[124px] sm:w-[140px] h-auto" />
          </div>

          <div className="flex items-center">
            <Image
              src="/logo/FullIcon.svg"
              alt="ISOFINITI Emblem"
              width={34}
              height={34}
              className="w-7 sm:w-8 h-7 sm:h-8 object-contain"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Three.js Canvas Component (Right Side 3D Particle Generator) ---
interface WovenCanvasProps {
  shape?: "infinity" | "torusKnot";
  brandColor?: string;
}

const WovenCanvas: React.FC<WovenCanvasProps> = ({
  shape = "infinity",
  brandColor = "#FF1822",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);

    // --- Particle System Generation ---
    const particleCount = shape === "infinity" ? 75000 : 50000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const primaryRed = new THREE.Color(0xeb1a25); // Vivid Isofinity Ruby Red
    const rubyHighlight = new THREE.Color(0xff4550);
    const rubyDeep = new THREE.Color(0xa80f17);

    const glassDiamond = new THREE.Color(0xffffff); // Pure Brilliant Diamond White
    const glassCyanLight = new THREE.Color(0xd8eeff); // Bright Ice Crystal Refraction
    const glassCyanDeep = new THREE.Color(0xaad6f8); // Luminous Glass Body
    const glassShadow = new THREE.Color(0x7596b5); // Soft Bevel Reflection Tone

    if (shape === "infinity") {
      // Recreate the EXACT 3D ISOFINITI Glass Emblem Structure
      const barWidth = 0.42;
      const barDepth = 0.34;
      const halfSpan = 1.30;

      for (let i = 0; i < particleCount; i++) {
        let x = 0;
        let y = 0;
        let z = 0;
        let isRed = false;

        const sectionRand = Math.random();

        if (sectionRand < 0.20) {
          // 1. Left Vertical Pillar (Bright Crystal Glass)
          const t = Math.random();
          x = -halfSpan + (Math.random() - 0.5) * barWidth;
          y = -halfSpan + t * (halfSpan * 2);
          z = (Math.random() - 0.5) * barDepth;
        } else if (sectionRand < 0.40) {
          // 2. Right Vertical Pillar (Bright Crystal Glass)
          const t = Math.random();
          x = halfSpan + (Math.random() - 0.5) * barWidth;
          y = -halfSpan + t * (halfSpan * 2);
          z = (Math.random() - 0.5) * barDepth;
        } else if (sectionRand < 0.68) {
          // 3. Clear Glass Front Diagonal Band: Top-Left to Bottom-Right
          const t = Math.random();
          const cx = -halfSpan + t * (halfSpan * 2);
          const cy = halfSpan - t * (halfSpan * 2);
          const cz = -0.12;

          const perpOffset = (Math.random() - 0.5) * barWidth;
          x = cx + perpOffset * 0.707;
          y = cy + perpOffset * 0.707;
          z = cz + (Math.random() - 0.5) * barDepth;
        } else if (sectionRand < 0.94) {
          // 4. CROSS DIAGONAL with VIVID RED PRISMS: Bottom-Left to Top-Right
          const t = Math.random();
          const cx = -halfSpan + t * (halfSpan * 2);
          const cy = -halfSpan + t * (halfSpan * 2);
          const cz = 0.16;

          const perpOffset = (Math.random() - 0.5) * barWidth;
          x = cx - perpOffset * 0.707;
          y = cy + perpOffset * 0.707;
          z = cz + (Math.random() - 0.5) * barDepth;

          // Continuous Bold Red Accent Diagonal spanning across the center on top
          if (t >= 0.03 && t <= 0.97) {
            isRed = true;
          }
        } else {
          // 5. Bevel Edge Shimmer & Corner Accents
          const t = Math.random() * Math.PI * 2;
          const cornerIdx = Math.floor(Math.random() * 4);
          const cornerX = cornerIdx === 0 || cornerIdx === 3 ? -halfSpan : halfSpan;
          const cornerY = cornerIdx === 0 || cornerIdx === 1 ? halfSpan : -halfSpan;

          x = cornerX + Math.cos(t) * (Math.random() * 0.20);
          y = cornerY + Math.sin(t) * (Math.random() * 0.20);
          z = (Math.random() - 0.5) * (barDepth * 1.3);
        }

        // Micro crystal scatter
        x += (Math.random() - 0.5) * 0.025;
        y += (Math.random() - 0.5) * 0.025;
        z += (Math.random() - 0.5) * 0.025;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        originalPositions[i * 3] = x;
        originalPositions[i * 3 + 1] = y;
        originalPositions[i * 3 + 2] = z;

        let particleColor = new THREE.Color();
        if (isRed) {
          // Luminous Ruby Red Gradient
          const redGrad = Math.random();
          if (redGrad < 0.35) {
            particleColor = rubyHighlight.clone();
          } else if (redGrad < 0.75) {
            particleColor = primaryRed.clone();
          } else {
            particleColor = rubyDeep.clone();
          }
        } else {
          // Luminous Crystal Glass Refraction Gradient
          const rand = Math.random();
          if (rand < 0.35) {
            particleColor = glassDiamond.clone();
          } else if (rand < 0.70) {
            particleColor = glassCyanLight.clone();
          } else if (rand < 0.90) {
            particleColor = glassCyanDeep.clone();
          } else {
            particleColor = glassShadow.clone();
          }
        }

        colors[i * 3] = particleColor.r;
        colors[i * 3 + 1] = particleColor.g;
        colors[i * 3 + 2] = particleColor.b;

        velocities[i * 3] = 0;
        velocities[i * 3 + 1] = 0;
        velocities[i * 3 + 2] = 0;
      }
    } else {
      const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);
      for (let i = 0; i < particleCount; i++) {
        const vertexIndex = i % torusKnot.attributes.position.count;
        const x = torusKnot.attributes.position.getX(vertexIndex);
        const y = torusKnot.attributes.position.getY(vertexIndex);
        const z = torusKnot.attributes.position.getZ(vertexIndex);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        originalPositions[i * 3] = x;
        originalPositions[i * 3 + 1] = y;
        originalPositions[i * 3 + 2] = z;

        const color = glassDiamond.clone();
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        velocities[i * 3] = 0;
        velocities[i * 3 + 1] = 0;
        velocities[i * 3 + 2] = 0;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.021,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.90,
    });

    const points = new THREE.Points(geometry, material);
    points.position.set(0, 0.75, 0);
    scene.add(points);

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (!currentMount) return;
      const rect = currentMount.getBoundingClientRect();
      targetMouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.016;

      // Smooth damped cursor tracking for 3D parallax tilt
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      // Fixed emblem orientation (no rotation/tilt)
      points.rotation.set(0, 0, 0);

      const mouseWorldX = currentMouseX * 2.6;
      const mouseWorldY = currentMouseY * 2.6;

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const px = positions[ix];
        const py = positions[iy];
        const pz = positions[iz];

        const ox = originalPositions[ix];
        const oy = originalPositions[iy];
        const oz = originalPositions[iz];

        const dx = px - mouseWorldX;
        const dy = py - mouseWorldY;
        const distSq = dx * dx + dy * dy;

        // Smooth Organic Gaussian Field (No harsh holes or sphere tears)
        if (distSq < 2.5) {
          const dist = Math.sqrt(distSq);
          const influence = Math.exp(-distSq * 1.2); // Smooth bell curve

          // Gentle lateral wave ripple + prismatic Z-depth elevation
          const wave = Math.sin(dist * 6.0 - time * 4.0) * 0.008;
          const tangentialX = -dy * 0.005;
          const tangentialY = dx * 0.005;

          velocities[ix] += (dx / (dist + 0.1)) * influence * 0.009 + tangentialX * influence;
          velocities[iy] += (dy / (dist + 0.1)) * influence * 0.009 + tangentialY * influence;
          velocities[iz] += (influence * 0.018 + wave) * 0.8;
        }

        // Elastic Spring Return to original position
        velocities[ix] += (ox - px) * 0.045;
        velocities[iy] += (oy - py) * 0.045;
        velocities[iz] += (oz - pz) * 0.045;

        // Fluid Damping
        velocities[ix] *= 0.84;
        velocities[iy] *= 0.84;
        velocities[iz] *= 0.84;

        positions[ix] += velocities[ix];
        positions[iy] += velocities[iy];
        positions[iz] += velocities[iz];
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [shape, brandColor]);

  return <div ref={mountRef} className="w-full h-full relative cursor-default" />;
};

export default WovenLightHero;
