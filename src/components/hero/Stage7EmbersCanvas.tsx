"use client";

import React, { useEffect, useRef } from "react";

interface Stage7EmbersCanvasProps {
  isActive?: boolean;
}

export const Stage7EmbersCanvas: React.FC<Stage7EmbersCanvasProps> = ({ isActive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth || 1920;
    let H = window.innerHeight || 1080;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth || window.innerWidth || 1920;
      H = cv.clientHeight || window.innerHeight || 1080;
      cv.width = Math.max(1, Math.round(W * dpr));
      cv.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 120;
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const LOGO_CX = 0.5, LOGO_CY = 0.5, AVOID_RX = 0.15, AVOID_RY = 0.19;
    const AVOID_REACH = 1.7;

    interface Particle {
      x: number;
      y: number;
      vy: number;
      drift: number;
      swayA: number;
      swayF: number;
      r: number;
      life: number;
      side: number;
      hot: boolean;
    }

    const parts: Particle[] = [];
    function spawn(p: Particle, seeded: boolean) {
      p.x = rnd(0.03, 0.97);
      p.y = seeded ? rnd(-0.1, 1.15) : rnd(1.0, 1.2);
      p.vy = rnd(0.14, 0.34);
      p.drift = rnd(-0.016, 0.016);
      p.swayA = rnd(0.004, 0.02);
      p.swayF = rnd(0.5, 1.5);
      p.r = rnd(0.4, 1.3);
      p.life = 0;
      p.side = Math.random() < 0.5 ? -1 : 1;
      p.hot = Math.random() < 0.28;
    }

    for (let i = 0; i < COUNT; i++) {
      const p = {} as Particle;
      spawn(p, true);
      parts.push(p);
    }

    let raf = 0;
    let last = performance.now();

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      ctx!.clearRect(0, 0, W, H);
      ctx!.globalCompositeOperation = "lighter";

      for (const p of parts) {
        p.life += dt;

        const nx = (p.x - LOGO_CX) / AVOID_RX;
        const ny = (p.y - LOGO_CY) / AVOID_RY;
        const nd = Math.sqrt(nx * nx + ny * ny) || 1e-4;

        if (nd < AVOID_REACH) {
          let s = clamp01((AVOID_REACH - nd) / (AVOID_REACH - 0.7));
          s = s * s * (3 - 2 * s);
          const ox = p.x - LOGO_CX, oy = p.y - LOGO_CY;
          const od = Math.max(0.02, Math.sqrt(ox * ox + oy * oy));
          const rux = ox / od, ruy = oy / od;
          const sgn = Math.abs(ox) < 0.015 ? p.side : (ox < 0 ? 1 : -1);
          const tux = -ruy * sgn, tuy = rux * sgn;
          p.x += (tux * 0.34 + rux * 0.10) * s * dt;
          p.y += (tuy * 0.34 + ruy * 0.10) * s * dt;
        }

        p.y -= p.vy * dt;
        p.x += (p.drift + Math.sin(p.life * p.swayF) * p.swayA) * dt;
        p.x = clamp01(p.x);
        if (p.y < -0.12) spawn(p, false);

        const fadeIn = clamp01(p.life / 0.5);
        const topBoost = 0.6 + 1.4 * (1 - clamp01(p.y));
        const fade = fadeIn * topBoost;
        if (fade <= 0.001) continue;

        const px = p.x * W, py = p.y * H;
        const rad = p.r * (0.8 + 0.5 * clamp01(fadeIn)) * 3.2;
        const g = ctx!.createRadialGradient(px, py, 0, px, py, rad);

        if (p.hot) {
          g.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
          g.addColorStop(0.35, `rgba(255,190,160,${0.6 * fade})`);
          g.addColorStop(1, "rgba(255,120,90,0)");
        } else {
          g.addColorStop(0, `rgba(255,140,100,${0.85 * fade})`);
          g.addColorStop(0.5, `rgba(214,24,24,${0.45 * fade})`);
          g.addColorStop(1, "rgba(150,10,10,0)");
        }

        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(px, py, rad, 0, 6.2832);
        ctx!.fill();
      }
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[5] opacity-90"
    />
  );
};
