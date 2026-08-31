import { Navbar } from "@/components/common/Navbar";
import { HeroScrollAnimation } from "@/components/hero/HeroScrollAnimation";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#efefef] text-zinc-900 selection:bg-[#D01919] selection:text-white overflow-x-hidden">
      {/* Sticky Top Navbar directly overlaying the top of the canvas */}
      <div
        id="global-navbar"
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none [&>*]:pointer-events-auto transition-all duration-500 ease-out"
      >
        <Navbar />
      </div>

      <main className="w-full">
        {/* Unified Continuous Spatial Storytelling Stage */}
        <HeroScrollAnimation />
      </main>

      {/* Global GPU Ink Flow Fluid Cursor Effect - Now scoped to Stage 7 only */}
    </div>
  );
}

