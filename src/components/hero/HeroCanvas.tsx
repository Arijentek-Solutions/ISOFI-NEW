import React, { forwardRef } from "react";

export const HeroCanvas = forwardRef<HTMLCanvasElement>((props, ref) => {
  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover select-none"
    />
  );
});

HeroCanvas.displayName = "HeroCanvas";
