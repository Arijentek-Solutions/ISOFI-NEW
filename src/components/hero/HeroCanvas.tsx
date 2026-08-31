import React, { forwardRef } from "react";

export const HeroCanvas = forwardRef<HTMLCanvasElement>((props, ref) => {
  return (
    <canvas
      ref={ref}
      className="hidden md:block absolute inset-0 h-full w-full object-cover select-none"
    />
  );
});

HeroCanvas.displayName = "HeroCanvas";
