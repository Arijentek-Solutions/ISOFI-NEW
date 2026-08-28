"use client";

import { InteractiveTravelCard } from "@/components/ui/3d-card";

export default function InteractiveTravelCardDemo() {
  return (
    <div className="flex min-h-[35rem] w-full items-center justify-center bg-black p-12">
      <div 
        style={{
          perspective: "1200px"
        }}
        className="w-80 h-96"
      >
        <InteractiveTravelCard className="w-full h-full" />
      </div>
    </div>
  );
}
