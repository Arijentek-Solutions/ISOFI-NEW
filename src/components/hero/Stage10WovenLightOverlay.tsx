"use client";

import React, { forwardRef } from "react";
import { WovenLightHero } from "@/components/ui/woven-light-hero";

interface Stage10WovenLightOverlayProps {
  onExploreClick?: () => void;
}

export const Stage10WovenLightOverlay = forwardRef<
  HTMLDivElement,
  Stage10WovenLightOverlayProps
>(({ onExploreClick }, ref) => {
  return (
    <div
      ref={ref}
      style={{ visibility: "hidden" }}
      className="absolute inset-0 pointer-events-none w-full h-full z-30 overflow-hidden select-none"
    >
      <div className="w-full h-full pointer-events-auto overflow-y-auto">
        <WovenLightHero
          headline="WHAT ARE YOU&#10;BUILDING NEXT ?"
          subheadline="Tell us what you're trying to build, improve or automate."
          onStartProject={onExploreClick}
          onViewWork={onExploreClick}
          onSubmit={(val) => {
            console.log("Submitted project vision:", val);
          }}
        />
      </div>
    </div>
  );
});

Stage10WovenLightOverlay.displayName = "Stage10WovenLightOverlay";
