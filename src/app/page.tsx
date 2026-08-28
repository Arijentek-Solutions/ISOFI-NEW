import { Navbar } from "@/components/common/Navbar";
import { HeroScrollAnimation } from "@/components/hero/HeroScrollAnimation";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#efefef] text-zinc-900 selection:bg-[#D01919] selection:text-white">
      {/* Floating Navbar directly overlaying the top of the canvas */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none [&>*]:pointer-events-auto">
        <Navbar />
      </div>

      <main className="w-full">
        {/* Unified Continuous Spatial Storytelling Stage */}
        <HeroScrollAnimation />
      </main>
    </div>
  );
}
