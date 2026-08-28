import React, { forwardRef } from "react";
import { CINEMATIC_VIDEOS } from "./constants";

export const Stage5VideoShowcase = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{ visibility: "hidden" }}
      className="absolute inset-0 pointer-events-none w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-[82px] pt-[70px] pb-6 flex items-center justify-center z-20"
    >
      {/* Unified Central Stage Container with Responsive Laptop Navbar Clearance */}
      <div className="relative w-full max-w-[min(1160px,85vw)] h-full max-h-[calc(100vh-170px)] flex items-center justify-center pointer-events-none">
        {CINEMATIC_VIDEOS.map((item, idx) => (
          <div
            key={item.id}
            data-cinematic-video={idx + 1}
            style={{ opacity: 0 }}
            className="absolute inset-0 m-auto w-full max-w-[min(1140px,84vw)] max-h-[calc(100vh-180px)] aspect-[16/9] rounded-none overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.4)] bg-[#080808]/95 pointer-events-none"
          >
            {/* Looping Ambient Fullscreen Pure Video */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-black rounded-none">
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover rounded-none pointer-events-none select-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Stage5VideoShowcase.displayName = "Stage5VideoShowcase";
