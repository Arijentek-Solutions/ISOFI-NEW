"use client";

import React, { useEffect, useRef } from "react";

interface OrbitalParticle {
  radius: number;
  baseRadius: number;
  angle: number;
  speed: number;
  inclination: number;
  planeYaw: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  z: number;
  projX: number;
  projY: number;
  prevProjX: number;
  prevProjY: number;
  scatterOffset: { x: number; y: number; z: number };
}

const PARTICLE_COLORS = [
  "#FF1A1A",
  "#FF3333",
  "#D91E1E",
  "#FF6B6B",
  "#FFAA70",
  "#FFFFFF",
  "#E60000",
];

export function GravitationalSingularity({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasBackRef = useRef<HTMLCanvasElement>(null);
  const canvasFrontRef = useRef<HTMLCanvasElement>(null);

  const particlesRef = useRef<OrbitalParticle[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0, canvasX: -1000, canvasY: -1000 });
  const targetMousePosRef = useRef({ x: 0, y: 0, canvasX: -1000, canvasY: -1000 });
  const velocityBoostRef = useRef(1.0);
  const shockwaveRef = useRef({ radius: 0, force: 0, active: false, originX: 0, originY: 0 });

  const numParticles = 170;

  // Initialize orbital particle system
  useEffect(() => {
    const particles: OrbitalParticle[] = [];

    for (let i = 0; i < numParticles; i++) {
      const u = Math.random();
      // Power curve for natural density concentration around core
      const baseRadius = 130 + Math.pow(u, 1.8) * 330;
      const angle = Math.random() * Math.PI * 2;
      // Keplerian orbital speed: faster near core, slower on outer rim
      const speed =
        (0.0035 + (1 / Math.sqrt(baseRadius)) * 0.085) *
        (Math.random() > 0.15 ? 1 : -0.7);

      // Dual crossing orbital planes matching emblem's 19.48 deg tilt
      const plane = i % 2 === 0 ? 0.34 : -0.28;
      const inclination = plane + (Math.random() - 0.5) * 0.45;
      const planeYaw = (Math.random() - 0.5) * 0.6;

      const size =
        Math.random() < 0.14 ? 2.4 + Math.random() * 1.4 : 1.2 + Math.random() * 1.3;
      const color =
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      const baseAlpha = 0.45 + Math.random() * 0.45;

      particles.push({
        radius: baseRadius,
        baseRadius,
        angle,
        speed,
        inclination,
        planeYaw,
        size,
        color,
        alpha: baseAlpha,
        baseAlpha,
        z: 0,
        projX: 0,
        projY: 0,
        prevProjX: 0,
        prevProjY: 0,
        scatterOffset: { x: 0, y: 0, z: 0 },
      });
    }

    particlesRef.current = particles;
  }, []);

  // Global mouse position tracking & velocity accelerator
  useEffect(() => {
    const lastMouse = { x: 0, y: 0, time: performance.now() };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max((now - lastMouse.time) / 1000, 0.001);
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      const speed = Math.hypot(dx, dy) / (dt * 1000); // px/ms

      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
      lastMouse.time = now;

      // Dynamic velocity boost based on cursor speed
      const boost = Math.min(speed * 0.8, 2.0);
      velocityBoostRef.current = Math.max(velocityBoostRef.current, 1.0 + boost);

      // Normalized target mouse coordinates (-1 to 1)
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;

      let localX = -1000;
      let localY = -1000;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        localX = e.clientX - rect.left;
        localY = e.clientY - rect.top;
      }

      targetMousePosRef.current = { x: normX, y: normY, canvasX: localX, canvasY: localY };
    };

    // Interactive Click Shockwave Ripple
    const handlePointerDown = (e: PointerEvent) => {
      let clickX = window.innerWidth / 2;
      let clickY = window.innerHeight / 2;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        clickX = e.clientX - rect.left;
        clickY = e.clientY - rect.top;
      }

      shockwaveRef.current = {
        radius: 12,
        force: 35,
        active: true,
        originX: clickX,
        originY: clickY,
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  // Animation render loop
  useEffect(() => {
    let animId: number;
    let time = 0;

    const render = () => {
      time += 1;
      const canvasBack = canvasBackRef.current;
      const canvasFront = canvasFrontRef.current;
      if (!canvasBack || !canvasFront) {
        animId = requestAnimationFrame(render);
        return;
      }

      const ctxBack = canvasBack.getContext("2d");
      const ctxFront = canvasFront.getContext("2d");
      if (!ctxBack || !ctxFront) {
        animId = requestAnimationFrame(render);
        return;
      }

      if (canvasBack.width === 0 && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvasBack.width = (rect.width || 600) * dpr;
        canvasBack.height = (rect.height || 600) * dpr;
        canvasFront.width = canvasBack.width;
        canvasFront.height = canvasBack.height;
      }

      const width = canvasBack.width || 600;
      const height = canvasBack.height || 600;
      const centerX = width / 2;
      const centerY = height / 2;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      ctxBack.clearRect(0, 0, width, height);
      ctxFront.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mousePosRef.current.x +=
        (targetMousePosRef.current.x - mousePosRef.current.x) * 0.05;
      mousePosRef.current.y +=
        (targetMousePosRef.current.y - mousePosRef.current.y) * 0.05;
      mousePosRef.current.canvasX +=
        (targetMousePosRef.current.canvasX - mousePosRef.current.canvasX) * 0.08;
      mousePosRef.current.canvasY +=
        (targetMousePosRef.current.canvasY - mousePosRef.current.canvasY) * 0.08;

      const mX = mousePosRef.current.x;
      const mY = mousePosRef.current.y;
      const curX = mousePosRef.current.canvasX * dpr;
      const curY = mousePosRef.current.canvasY * dpr;

      // Smooth decay of kinetic velocity accelerator back to base speed 1.0x
      velocityBoostRef.current += (1.0 - velocityBoostRef.current) * 0.03;
      const currentBoost = velocityBoostRef.current;

      // Update shockwave ripple
      if (shockwaveRef.current.active) {
        shockwaveRef.current.radius += 8;
        shockwaveRef.current.force *= 0.94;
        if (shockwaveRef.current.force < 0.5) {
          shockwaveRef.current.active = false;
        }
      }

      const particles = particlesRef.current;

      // Draw faint gravitational orbit guide rings in back
      ctxBack.save();
      ctxBack.translate(centerX, centerY);
      ctxBack.rotate(0.34 + mX * 0.12);
      ctxBack.scale(1, 0.42 + mY * 0.08);
      ctxBack.beginPath();
      ctxBack.arc(0, 0, 220 * (dpr * 0.85), 0, Math.PI * 2);
      ctxBack.strokeStyle = "rgba(217, 30, 30, 0.08)";
      ctxBack.lineWidth = 1.2 * dpr;
      ctxBack.stroke();

      ctxBack.beginPath();
      ctxBack.arc(0, 0, 310 * (dpr * 0.85), 0, Math.PI * 2);
      ctxBack.strokeStyle = "rgba(255, 77, 77, 0.04)";
      ctxBack.lineWidth = 1 * dpr;
      ctxBack.stroke();
      ctxBack.restore();

      // Render 3D Orbital Singularity Particles with smooth continuous trails (no blinking)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Orbit progression with kinetic velocity boost
        p.angle += p.speed * currentBoost;

        // Base 3D parametric orbit coordinates
        let x3d = Math.cos(p.angle) * p.radius;
        let y3d = Math.sin(p.angle) * p.radius * 0.44;
        let z3d = Math.sin(p.angle) * p.radius;

        // Apply orbital inclination & plane yaw rotation
        const cosInc = Math.cos(p.inclination + mY * 0.25);
        const sinInc = Math.sin(p.inclination + mY * 0.25);
        const cosYaw = Math.cos(p.planeYaw + mX * 0.3);
        const sinYaw = Math.sin(p.planeYaw + mX * 0.3);

        const yRot = y3d * cosInc - z3d * sinInc;
        const zRot = y3d * sinInc + z3d * cosInc;

        const xFinal = x3d * cosYaw - zRot * sinYaw;
        const zFinal = x3d * sinYaw + zRot * cosYaw;
        const yFinal = yRot;

        // Gravitational magnetic pull toward cursor
        const pullDist = Math.hypot(mX * 180 - xFinal, mY * 140 - yFinal);
        const pullFactor = Math.max(0, 1 - pullDist / 450) * 35;
        const pullX = (mX * 180 - xFinal) * (pullFactor / 450);
        const pullY = (mY * 140 - yFinal) * (pullFactor / 450);

        // Projected 2D coordinates with 3D perspective depth
        const perspective = 900 / (900 + zFinal);
        let rawProjX =
          centerX + (xFinal + pullX + p.scatterOffset.x) * perspective * (dpr * 0.85);
        let rawProjY =
          centerY + (yFinal + pullY + p.scatterOffset.y) * perspective * (dpr * 0.85);

        // Direct Cursor Proximity Deflection
        if (curX > 0 && curY > 0) {
          const dxCur = rawProjX - curX;
          const dyCur = rawProjY - curY;
          const distToCur = Math.hypot(dxCur, dyCur);
          const maxInfluence = 120 * dpr;

          if (distToCur < maxInfluence && distToCur > 1) {
            const influence = 1 - distToCur / maxInfluence;
            const tangX = -dyCur / distToCur;
            const tangY = dxCur / distToCur;
            const pushX = dxCur / distToCur;
            const pushY = dyCur / distToCur;

            rawProjX += (tangX * 18 + pushX * 12) * influence;
            rawProjY += (tangY * 18 + pushY * 12) * influence;
          }
        }

        // Shockwave displacement from click origin
        if (shockwaveRef.current.active) {
          const shkX = shockwaveRef.current.originX * dpr;
          const shkY = shockwaveRef.current.originY * dpr;
          const distToShock = Math.hypot(rawProjX - shkX, rawProjY - shkY);
          const waveDelta = Math.abs(
            distToShock - shockwaveRef.current.radius * dpr
          );
          if (waveDelta < 50 * dpr) {
            const shockPush =
              (1 - waveDelta / (50 * dpr)) * shockwaveRef.current.force;
            rawProjX += ((rawProjX - shkX) / (distToShock || 1)) * shockPush;
            rawProjY += ((rawProjY - shkY) / (distToShock || 1)) * shockPush;
          }
        }

        // Return scatter offset
        p.scatterOffset.x *= 0.92;
        p.scatterOffset.y *= 0.92;

        p.prevProjX = p.projX || rawProjX;
        p.prevProjY = p.projY || rawProjY;
        p.projX = rawProjX;
        p.projY = rawProjY;
        p.z = zFinal;

        // Steady depth-based size and opacity (constant, non-blinking)
        const depthScale = Math.max(0.3, (zFinal + 400) / 800);
        const renderSize = p.size * depthScale * perspective * dpr;
        const renderAlpha = Math.min(
          0.95,
          Math.max(0.18, p.baseAlpha * depthScale)
        );

        // Choose front vs back canvas based on Z position
        const targetCtx = zFinal >= -20 ? ctxFront : ctxBack;

        targetCtx.save();
        targetCtx.globalAlpha = renderAlpha;

        // Draw light motion streak trail
        targetCtx.beginPath();
        targetCtx.moveTo(p.prevProjX, p.prevProjY);
        targetCtx.lineTo(p.projX, p.projY);
        targetCtx.strokeStyle = p.color;
        targetCtx.lineWidth = renderSize * 0.9;
        targetCtx.lineCap = "round";
        targetCtx.stroke();

        // Draw core glowing particle head
        targetCtx.beginPath();
        targetCtx.arc(p.projX, p.projY, renderSize, 0, Math.PI * 2);
        targetCtx.fillStyle = p.color;
        targetCtx.shadowColor = p.color;
        targetCtx.shadowBlur = zFinal >= 0 ? 8 : 3;
        targetCtx.fill();

        targetCtx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Resize canvas to match container dimensions
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      [canvasBackRef.current, canvasFrontRef.current].forEach((canvas) => {
        if (!canvas) return;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
    >
      {/* Back Particle Orbit Canvas (Z < 0: Passes behind emblem) */}
      <canvas
        ref={canvasBackRef}
        className="absolute inset-0 w-full h-full pointer-events-none -z-10"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Central 3D Floating Glass Emblem */}
      <div className="relative z-10 flex items-center justify-center pointer-events-auto">
        {children}
      </div>

      {/* Front Particle Orbit Canvas (Z >= 0: Passes in front with specular glints) */}
      <canvas
        ref={canvasFrontRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
}
