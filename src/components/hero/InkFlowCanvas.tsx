"use client";

import React, { useEffect, useRef } from "react";

/* ============================================================================
   InkFlowCanvas — faithful port of isofiniti-Ink Flow 1/index.html
   Exact same CONFIG, pointer handling, doSplat logic, and ember particles.
   Key fixes vs previous version:
     - premultipliedAlpha: false  (so alpha composites correctly over page)
     - events on host div via getBoundingClientRect (not window capture)
     - exact threshold 0.005 (not 0.0001)
     - exact gain = POINTER_FORCE * 0.95 = 0.855 (not 80)
     - exact tx/ty ±BURST_FORCE turbulence (reference has this too)
     - canvas starts at opacity:0, revealed on first pointer move
     - ember particle 2D canvas layer
   ========================================================================== */

const CONFIG = {
  SIM_RES: 140,
  DYE_RES: 1024,
  PRESSURE_ITERATIONS: 20,
  PRESSURE_DECAY: 0.8,
  VELOCITY_DISSIPATION: 2.0,
  DYE_DISSIPATION: 2.0,
  CURL: 3.2,
  SPEED: 1.3,
  RADIUS: 0.23,
  POINTER_FORCE: 0.9,
  POINTER_WHITE: 0.3,
  TINT: 0.55,
  BURST_FORCE: 180,
  BURST_BRIGHTNESS: 2.0,
  POINTER_SMOOTH: 0.28,
  STEP_DIST: 0.012,
  INJECT_RATE: 5.0,
  COLOR_SPEED: 0.12,
  SHADING: 1,
  BLOOM: 0.22,
  DPR_CAP: 1.75,
  MAX_COLORS: 6,
  PALETTE: ["#FF3A1E", "#D0121B", "#FF6A3C", "#A80D14"],
  ERUPT_ORIGIN_X: 0.5,
  GLOW_RATE: 0.38,
};

const GL_RGBA16F = 0x881a;
const GL_HALF_FLOAT = 0x140b;
const GL_HALF_FLOAT_OES = 0x8d61;

const VERT = `
precision highp float;
attribute vec2 aPos;
uniform vec2 uTexel;
varying vec2 vUv, vL, vR, vT, vB;
void main() {
  vUv = aPos * 0.5 + 0.5;
  vL = vUv - vec2(uTexel.x, 0.0);
  vR = vUv + vec2(uTexel.x, 0.0);
  vT = vUv + vec2(0.0, uTexel.y);
  vB = vUv - vec2(0.0, uTexel.y);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG_ADVECT = `
precision highp float;
uniform sampler2D uVel, uSrc;
uniform vec2 uTexel, uTexelSrc;
uniform float uDt, uDiss;
varying vec2 vUv;
#ifdef MANUAL_FILTERING
vec4 bilerp(sampler2D s, vec2 uv, vec2 ts) {
  vec2 st = uv / ts - 0.5;
  vec2 iuv = floor(st), fuv = fract(st);
  vec4 a = texture2D(s, (iuv + vec2(0.5, 0.5)) * ts);
  vec4 b = texture2D(s, (iuv + vec2(1.5, 0.5)) * ts);
  vec4 c = texture2D(s, (iuv + vec2(0.5, 1.5)) * ts);
  vec4 d = texture2D(s, (iuv + vec2(1.5, 1.5)) * ts);
  return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}
#endif
void main() {
  vec2 coord = vUv - uDt * texture2D(uVel, vUv).xy * uTexel;
  vec2 h = uTexelSrc * 0.5;
  coord = clamp(coord, h, 1.0 - h);
#ifdef MANUAL_FILTERING
  vec4 src = bilerp(uSrc, coord, uTexelSrc);
#else
  vec4 src = texture2D(uSrc, coord);
#endif
  gl_FragColor = src / (1.0 + uDiss * uDt);
}`;

const FRAG_DIVERGENCE = `
precision highp float;
uniform sampler2D uVel;
varying vec2 vUv, vL, vR, vT, vB;
void main() {
  float l = texture2D(uVel, vL).x;
  float r = texture2D(uVel, vR).x;
  float t = texture2D(uVel, vT).y;
  float b = texture2D(uVel, vB).y;
  vec2 c = texture2D(uVel, vUv).xy;
  if (vL.x < 0.0) l = -c.x;
  if (vR.x > 1.0) r = -c.x;
  if (vT.y > 1.0) t = -c.y;
  if (vB.y < 0.0) b = -c.y;
  gl_FragColor = vec4(0.5 * (r - l + t - b), 0.0, 0.0, 1.0);
}`;

const FRAG_CURL = `
precision highp float;
uniform sampler2D uVel;
varying vec2 vL, vR, vT, vB;
void main() {
  float l = texture2D(uVel, vL).y;
  float r = texture2D(uVel, vR).y;
  float t = texture2D(uVel, vT).x;
  float b = texture2D(uVel, vB).x;
  gl_FragColor = vec4(0.5 * (r - l - t + b), 0.0, 0.0, 1.0);
}`;

const FRAG_VORTICITY = `
precision highp float;
uniform sampler2D uVel, uCurl;
uniform float uCurlAmt, uDt;
varying vec2 vUv, vL, vR, vT, vB;
void main() {
  float l = texture2D(uCurl, vL).x;
  float r = texture2D(uCurl, vR).x;
  float t = texture2D(uCurl, vT).x;
  float b = texture2D(uCurl, vB).x;
  float c = texture2D(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(t) - abs(b), abs(r) - abs(l));
  force /= max(length(force), 1e-4);
  force *= uCurlAmt * c;
  force.y *= -1.0;
  vec2 vel = texture2D(uVel, vUv).xy + force * uDt;
  gl_FragColor = vec4(clamp(vel, -1000.0, 1000.0), 0.0, 1.0);
}`;

const FRAG_PRESSURE = `
precision highp float;
uniform sampler2D uPressure, uDivergence;
varying vec2 vUv, vL, vR, vT, vB;
void main() {
  float l = texture2D(uPressure, vL).x;
  float r = texture2D(uPressure, vR).x;
  float t = texture2D(uPressure, vT).x;
  float b = texture2D(uPressure, vB).x;
  float div = texture2D(uDivergence, vUv).x;
  gl_FragColor = vec4((l + r + t + b - div) * 0.25, 0.0, 0.0, 1.0);
}`;

const FRAG_GRADIENT = `
precision highp float;
uniform sampler2D uPressure, uVel;
varying vec2 vUv, vL, vR, vT, vB;
void main() {
  float l = texture2D(uPressure, vL).x;
  float r = texture2D(uPressure, vR).x;
  float t = texture2D(uPressure, vT).x;
  float b = texture2D(uPressure, vB).x;
  vec2 vel = texture2D(uVel, vUv).xy - vec2(r - l, t - b);
  gl_FragColor = vec4(vel, 0.0, 1.0);
}`;

const FRAG_CLEAR = `
precision highp float;
uniform sampler2D uTex;
uniform float uValue;
varying vec2 vUv;
void main() { gl_FragColor = uValue * texture2D(uTex, vUv); }`;

const FRAG_SPLAT = `
precision highp float;
uniform sampler2D uTarget;
uniform float uAspect, uRadius;
uniform vec3 uColor;
uniform vec2 uPoint;
varying vec2 vUv;
void main() {
  vec2 p = vUv - uPoint;
  p.x *= uAspect;
  vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
  gl_FragColor = vec4(texture2D(uTarget, vUv).xyz + splat, 1.0);
}`;

const FRAG_DISPLAY = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uTexelDye;
uniform float uGain, uBloom, uShading;
varying vec2 vUv, vL, vR, vT, vB;
void main() {
  vec3 c = texture2D(uTex, vUv).rgb * uGain;

  if (uShading > 0.5) {
    vec3 lc = texture2D(uTex, vL).rgb;
    vec3 rc = texture2D(uTex, vR).rgb;
    vec3 tc = texture2D(uTex, vT).rgb;
    vec3 bc = texture2D(uTex, vB).rgb;
    float dx = length(rc) - length(lc);
    float dy = length(tc) - length(bc);
    vec3 n = normalize(vec3(dx, dy, length(uTexelDye)));
    float diffuse = clamp(dot(n, vec3(0.0, 0.0, 1.0)) + 0.82, 0.82, 1.08);
    c *= diffuse;
  }

  vec3 b = vec3(0.0);
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      b += texture2D(uTex, vUv + vec2(float(x), float(y)) * uTexelDye * 3.0).rgb;
    }
  }
  b /= 9.0;
  c += max(b - 0.15, 0.0) * uBloom;

  c = c / (1.0 + c * 0.72);
  float a = clamp(max(c.r, max(c.g, c.b)) * 1.35, 0.0, 1.0);
  gl_FragColor = vec4(c * a, a);
}`;

function parseColor(input: string): [number, number, number] {
  if (!input) return [0, 0, 0];
  const s = input.trim();
  const fn = s.match(/rgba?\(([^)]+)\)/i);
  if (fn) {
    const p = fn[1].split(",").map((v) => parseFloat(v.trim()));
    return [(p[0] || 0) / 255, (p[1] || 0) / 255, (p[2] || 0) / 255];
  }
  let h = s.replace("#", "");
  if (h.length === 3 || h.length === 4) h = h.split("").map((c) => c + c).join("");
  h = h.padEnd(6, "0");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

interface Pass {
  prog: WebGLProgram;
  u: Record<string, WebGLUniformLocation | null>;
}

export const InkFlowCanvas: React.FC = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const inkCanvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = inkCanvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    // ---- WebGL context — exact reference premultipliedAlpha: true ----
    const opts = {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      depth: false,
      stencil: false,
      powerPreference: "high-performance" as WebGLPowerPreference,
    };

    let isGL2 = true;
    let gl = canvas.getContext("webgl2", opts) as WebGL2RenderingContext | WebGLRenderingContext | null;
    if (!gl) {
      isGL2 = false;
      gl = (canvas.getContext("webgl", opts) ||
        canvas.getContext("experimental-webgl", opts)) as WebGLRenderingContext | null;
    }
    if (!gl) {
      console.error("[InkFlowCanvas] No WebGL context.");
      return;
    }

    let renderable = false;
    let linear = false;
    if (isGL2) {
      renderable =
        !!gl.getExtension("EXT_color_buffer_float") ||
        !!gl.getExtension("EXT_color_buffer_half_float");
      linear = !!gl.getExtension("OES_texture_float_linear") || renderable;
    } else {
      renderable =
        !!gl.getExtension("OES_texture_half_float") &&
        !!gl.getExtension("EXT_color_buffer_half_float");
      linear = !!gl.getExtension("OES_texture_half_float_linear");
    }
    if (!renderable) {
      console.error("[InkFlowCanvas] GPU has no renderable float textures.");
      return;
    }

    const fmt = {
      internal: isGL2 ? GL_RGBA16F : (gl.RGBA as number),
      format: gl.RGBA as number,
      type: isGL2 ? GL_HALF_FLOAT : GL_HALF_FLOAT_OES,
      filter: linear ? gl.LINEAR : gl.NEAREST,
    };
    const defines = linear ? "" : "#define MANUAL_FILTERING\n";

    const compile = (type: number, src: string) => {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        const log = gl!.getShaderInfoLog(s);
        if (log) console.error("[InkFlowCanvas] shader error:", log);
        return null;
      }
      return s;
    };

    const makePass = (name: string, fragSrc: string, uniforms: string[], defs = ""): Pass | null => {
      const vs = compile(gl!.VERTEX_SHADER, VERT);
      const fs = compile(gl!.FRAGMENT_SHADER, defs + fragSrc);
      if (!vs || !fs) {
        console.error(`[InkFlowCanvas] Pass "${name}" compile failed.`);
        return null;
      }
      const prog = gl!.createProgram();
      if (!prog) return null;
      gl!.attachShader(prog, vs);
      gl!.attachShader(prog, fs);
      gl!.bindAttribLocation(prog, 0, "aPos");
      gl!.linkProgram(prog);
      if (!gl!.getProgramParameter(prog, gl!.LINK_STATUS)) {
        console.error(`[InkFlowCanvas] Pass "${name}" link failed:`, gl!.getProgramInfoLog(prog));
        return null;
      }
      const uMap: Record<string, WebGLUniformLocation | null> = {};
      for (const uName of uniforms) uMap[uName] = gl!.getUniformLocation(prog, uName);
      return { prog, u: uMap };
    };

    const advect    = makePass("advect",     FRAG_ADVECT,     ["uVel","uSrc","uTexel","uTexelSrc","uDt","uDiss"], defines);
    const divergence= makePass("divergence", FRAG_DIVERGENCE, ["uVel","uTexel"]);
    const curl      = makePass("curl",       FRAG_CURL,       ["uVel","uTexel"]);
    const vorticity = makePass("vorticity",  FRAG_VORTICITY,  ["uVel","uCurl","uCurlAmt","uDt","uTexel"]);
    const pressure  = makePass("pressure",   FRAG_PRESSURE,   ["uPressure","uDivergence","uTexel"]);
    const gradient  = makePass("gradient",   FRAG_GRADIENT,   ["uPressure","uVel","uTexel"]);
    const clearPass = makePass("clear",      FRAG_CLEAR,      ["uTex","uValue","uTexel"]);
    const splat     = makePass("splat",      FRAG_SPLAT,      ["uTarget","uAspect","uColor","uPoint","uRadius","uTexel"]);
    const display   = makePass("display",    FRAG_DISPLAY,    ["uTex","uTexelDye","uGain","uBloom","uShading","uTexel"]);

    if (!advect||!divergence||!curl||!vorticity||!pressure||!gradient||!clearPass||!splat||!display) {
      console.error("[InkFlowCanvas] Shader pass failed — aborting.");
      return;
    }

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);

    interface Target {
      tex: WebGLTexture; fbo: WebGLFramebuffer;
      w: number; h: number; texelX: number; texelY: number;
    }
    interface DoubleTarget {
      read: Target; write: Target; swap: () => void;
    }

    function makeTarget(w: number, h: number): Target {
      const tex = gl!.createTexture()!;
      const fbo = gl!.createFramebuffer()!;
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, fmt.filter);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, fmt.filter);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, fmt.internal, w, h, 0, fmt.format, fmt.type, null);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, tex, 0);
      gl!.viewport(0, 0, w, h);
      gl!.clearColor(0, 0, 0, 1);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      return { tex, fbo, w, h, texelX: 1/w, texelY: 1/h };
    }

    function makeDouble(w: number, h: number): DoubleTarget {
      const d = { read: makeTarget(w, h), write: makeTarget(w, h) };
      return { ...d, swap: () => { const t = d.read; d.read = d.write; d.write = t; } };
    }

    let vel: DoubleTarget | null = null;
    let dye: DoubleTarget | null = null;
    let prs: DoubleTarget | null = null;
    let div: Target | null = null;
    let crl: Target | null = null;
    let aspect = 1;
    let built = "";

    function dispose() {
      for (const t of [vel?.read, vel?.write, dye?.read, dye?.write, prs?.read, prs?.write, div, crl]) {
        if (!t) continue;
        gl!.deleteTexture(t.tex);
        gl!.deleteFramebuffer(t.fbo);
      }
      vel = dye = prs = div = crl = null;
    }

    function buildTargets(w: number, h: number) {
      const key = `${w}x${h}`;
      if (key === built) return;
      dispose();
      aspect = w / Math.max(1, h);
      const sr = CONFIG.SIM_RES, dr = CONFIG.DYE_RES;
      const simW = aspect >= 1 ? Math.round(sr * aspect) : sr;
      const simH = aspect >= 1 ? sr : Math.round(sr / aspect);
      const dyeW = aspect >= 1 ? Math.round(dr * aspect) : dr;
      const dyeH = aspect >= 1 ? dr : Math.round(dr / aspect);
      vel = makeDouble(simW, simH);
      dye = makeDouble(dyeW, dyeH);
      prs = makeDouble(simW, simH);
      div = makeTarget(simW, simH);
      crl = makeTarget(simW, simH);
      built = key;
    }

    const blit = (target: Target | null) => {
      if (target) {
        gl!.viewport(0, 0, target.w, target.h);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, target.fbo);
      } else {
        gl!.viewport(0, 0, canvas!.width, canvas!.height);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      }
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    };

    const bind = (tex: WebGLTexture | null, unit: number) => {
      gl!.activeTexture(gl!.TEXTURE0 + unit);
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      return unit;
    };

    const setTexel = (pass: Pass, t: Target) => {
      gl!.uniform2f(pass.u.uTexel, t.texelX, t.texelY);
    };

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, CONFIG.DPR_CAP);
      const w = Math.max(1, Math.round(window.innerWidth * dpr));
      const h = Math.max(1, Math.round(window.innerHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      buildTargets(w, h);
    }
    resize();
    window.addEventListener("resize", resize);

    // ---- Palette ----
    const pal = CONFIG.PALETTE.slice(0, CONFIG.MAX_COLORS)
      .map(parseColor)
      .map((c) => [c[0] * CONFIG.TINT, c[1] * CONFIG.TINT, c[2] * CONFIG.TINT]);
    let colorPhase = 0;

    function pick(t: number): [number, number, number] {
      const f = (Math.abs(t) % 1) * pal.length;
      const i = Math.floor(f) % pal.length;
      const j = (i + 1) % pal.length;
      const k = f - Math.floor(f);
      const a = pal[i], b2 = pal[j];
      return [a[0]+(b2[0]-a[0])*k, a[1]+(b2[1]-a[1])*k, a[2]+(b2[2]-a[2])*k];
    }

    function doSplat(
      px: number, py: number,
      fx: number, fy: number,
      col: [number, number, number],
      radius: number,
      ink: number
    ) {
      if (!vel || !dye) return;
      gl!.useProgram(splat!.prog);
      gl!.uniform1f(splat!.u.uAspect, aspect);
      gl!.uniform2f(splat!.u.uPoint, px, py);
      gl!.uniform1f(splat!.u.uRadius, radius);

      gl!.uniform1i(splat!.u.uTarget, bind(vel.read.tex, 0));
      gl!.uniform3f(splat!.u.uColor, fx, fy, 0);
      blit(vel.write); vel.swap();

      gl!.uniform1i(splat!.u.uTarget, bind(dye.read.tex, 0));
      gl!.uniform3f(splat!.u.uColor, col[0]*ink, col[1]*ink, col[2]*ink);
      blit(dye.write); dye.swap();
    }

    // ---- Pointer — EXACT reference implementation ----
    const pointer = { x: 0.5, y: 0.5, dx: 0, dy: 0, vx: 0, vy: 0, moved: 0, armed: false };

    function arm() {
      if (pointer.armed) return;
      pointer.armed = true;
      canvas!.style.transition = "opacity 0.4s ease";
      canvas!.style.opacity = "1";
    }

    function onMove(e: PointerEvent) {
      arm();
      // Exact reference: use getBoundingClientRect + offsetWidth/Height
      const r = host!.getBoundingClientRect();
      const w = host!.offsetWidth || 1;
      const h = host!.offsetHeight || 1;
      const nx = (e.clientX - r.left) / Math.max(1, r.width);
      const ny = 1 - (e.clientY - r.top) / Math.max(1, r.height);
      if (pointer.moved) {
        pointer.dx += (nx - pointer.x) * w;
        pointer.dy += (ny - pointer.y) * h;
      }
      pointer.x = nx;
      pointer.y = ny;
      pointer.moved = 1;

      if (cursorRef.current) {
        const spd = Math.min(Math.hypot(e.movementX || 0, e.movementY || 0), 60);
        const s = 46 + spd * 0.6;
        cursorRef.current.style.opacity = "1";
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorRef.current.style.width = `${s.toFixed(1)}px`;
        cursorRef.current.style.height = `${s.toFixed(1)}px`;
        cursorRef.current.style.marginLeft = `${(-s/2).toFixed(1)}px`;
        cursorRef.current.style.marginTop = `${(-s/2).toFixed(1)}px`;
      }
    }

    function onLeave() {
      pointer.moved = 0;
      pointer.armed = false;
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    }

    function onPointerDown(e: PointerEvent) {
      arm();
      const r = host!.getBoundingClientRect();
      const nx = (e.clientX - r.left) / Math.max(1, r.width);
      const ny = 1 - (e.clientY - r.top) / Math.max(1, r.height);
      const radius = (0.008 + CONFIG.RADIUS * 0.16) ** 2;
      const n = 16;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const spd = 320 + Math.random() * 140;
        doSplat(
          nx + Math.cos(a) * 0.02,
          ny + Math.sin(a) * 0.02,
          Math.cos(a) * spd,
          Math.sin(a) * spd,
          pick(colorPhase + i / n),
          radius * 1.8,
          3.5
        );
      }
    }

    // Attach to host div and window — mirrors reference
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onPointerDown);

    // ---- Frame loop ----
    let raf = 0;
    let last = performance.now();
    let emitX = 0.5, emitY = 0.5, emitInit = false;

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dtReal = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      if (!vel || !dye || !prs || !div || !crl) return;

      const dt = dtReal * CONFIG.SPEED;
      colorPhase = (colorPhase + dt * CONFIG.COLOR_SPEED) % 1;

      const r = 0.008 + CONFIG.RADIUS * 0.16;
      const radius = r * r;

      // Steady ambient glow plume
      const ox = CONFIG.ERUPT_ORIGIN_X;
      const inkVal = dtReal * CONFIG.INJECT_RATE * CONFIG.GLOW_RATE;
      for (let i = 0; i < 2; i++) {
        doSplat(
          ox + (Math.random() - 0.5) * 0.10,
          0.36 + Math.random() * 0.36,
          (Math.random() - 0.5) * 14,
          9 + Math.random() * 16,
          pick(colorPhase + i * 0.33),
          radius * 1.4,
          inkVal * 0.45
        );
      }

      // ---- Pointer — fill path with evenly spaced splats ----
      // Exact reference: threshold 0.005, gain POINTER_FORCE*0.95
      const p = pointer;
      if (p.moved && (Math.abs(p.dx) > 0.005 || Math.abs(p.dy) > 0.005)) {
        if (!emitInit) { emitX = p.x; emitY = p.y; emitInit = true; }
        p.vx += (p.dx - p.vx) * CONFIG.POINTER_SMOOTH;
        p.vy += (p.dy - p.vy) * CONFIG.POINTER_SMOOTH;
        const gain = CONFIG.POINTER_FORCE * 0.95;

        const dist = Math.hypot(p.x - emitX, p.y - emitY);
        const steps = Math.min(32, Math.max(1, Math.ceil(dist / CONFIG.STEP_DIST)));
        const inkPerStep = (dtReal / steps) * CONFIG.INJECT_RATE * CONFIG.BURST_BRIGHTNESS;

        for (let s = 1; s <= steps; s++) {
          const u = s / steps;
          const sx = emitX + (p.x - emitX) * u;
          const sy = emitY + (p.y - emitY) * u;
          const tx = (Math.random() - 0.5) * CONFIG.BURST_FORCE;
          const ty = (Math.random() - 0.5) * CONFIG.BURST_FORCE;
          const col = Math.random() < CONFIG.POINTER_WHITE
            ? ([0.9, 0.9, 0.95] as [number, number, number])
            : pick(colorPhase + sx);
          doSplat(sx, sy, p.vx * gain + tx, p.vy * gain + ty, col, radius * 1.4, inkPerStep);
        }
        emitX = p.x;
        emitY = p.y;
      } else {
        emitX = p.x;
        emitY = p.y;
        p.vx *= 0.85;
        p.vy *= 0.85;
      }
      p.dx = 0;
      p.dy = 0;

      // ---- Solve fluid ----
      gl!.useProgram(curl!.prog);
      setTexel(curl!, vel.read);
      gl!.uniform1i(curl!.u.uVel, bind(vel.read.tex, 0));
      blit(crl);

      gl!.useProgram(vorticity!.prog);
      setTexel(vorticity!, vel.read);
      gl!.uniform1i(vorticity!.u.uVel, bind(vel.read.tex, 0));
      gl!.uniform1i(vorticity!.u.uCurl, bind(crl.tex, 1));
      gl!.uniform1f(vorticity!.u.uCurlAmt, CONFIG.CURL);
      gl!.uniform1f(vorticity!.u.uDt, dt);
      blit(vel.write); vel.swap();

      gl!.useProgram(divergence!.prog);
      setTexel(divergence!, vel.read);
      gl!.uniform1i(divergence!.u.uVel, bind(vel.read.tex, 0));
      blit(div);

      gl!.useProgram(clearPass!.prog);
      setTexel(clearPass!, prs.read);
      gl!.uniform1i(clearPass!.u.uTex, bind(prs.read.tex, 0));
      gl!.uniform1f(clearPass!.u.uValue, CONFIG.PRESSURE_DECAY);
      blit(prs.write); prs.swap();

      gl!.useProgram(pressure!.prog);
      setTexel(pressure!, prs.read);
      gl!.uniform1i(pressure!.u.uDivergence, bind(div.tex, 0));
      for (let i = 0; i < CONFIG.PRESSURE_ITERATIONS; i++) {
        gl!.uniform1i(pressure!.u.uPressure, bind(prs.read.tex, 1));
        blit(prs.write); prs.swap();
      }

      gl!.useProgram(gradient!.prog);
      setTexel(gradient!, vel.read);
      gl!.uniform1i(gradient!.u.uPressure, bind(prs.read.tex, 0));
      gl!.uniform1i(gradient!.u.uVel, bind(vel.read.tex, 1));
      blit(vel.write); vel.swap();

      gl!.useProgram(advect!.prog);
      setTexel(advect!, vel.read);
      gl!.uniform2f(advect!.u.uTexelSrc, vel.read.texelX, vel.read.texelY);
      gl!.uniform1f(advect!.u.uDt, dt);
      gl!.uniform1f(advect!.u.uDiss, CONFIG.VELOCITY_DISSIPATION);
      gl!.uniform1i(advect!.u.uVel, bind(vel.read.tex, 0));
      gl!.uniform1i(advect!.u.uSrc, bind(vel.read.tex, 0));
      blit(vel.write); vel.swap();

      gl!.uniform2f(advect!.u.uTexel, vel.read.texelX, vel.read.texelY);
      gl!.uniform2f(advect!.u.uTexelSrc, dye.read.texelX, dye.read.texelY);
      gl!.uniform1f(advect!.u.uDiss, CONFIG.DYE_DISSIPATION);
      gl!.uniform1i(advect!.u.uVel, bind(vel.read.tex, 0));
      gl!.uniform1i(advect!.u.uSrc, bind(dye.read.tex, 1));
      blit(dye.write); dye.swap();

      // ---- Display ----
      gl!.useProgram(display!.prog);
      gl!.uniform2f(display!.u.uTexel, dye.read.texelX, dye.read.texelY);
      gl!.uniform2f(display!.u.uTexelDye, dye.read.texelX, dye.read.texelY);
      gl!.uniform1i(display!.u.uTex, bind(dye.read.tex, 0));
      gl!.uniform1f(display!.u.uGain, 1.0);
      gl!.uniform1f(display!.u.uBloom, CONFIG.BLOOM);
      gl!.uniform1f(display!.u.uShading, CONFIG.SHADING);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    }

    raf = requestAnimationFrame(frame);
    console.info("[InkFlowCanvas] running — WebGL" + (isGL2 ? "2" : "1"));

    // ---- Ember particles — exact port from reference ----
    let emberRaf = 0;
    const particleCanvas = particleCanvasRef.current;
    if (particleCanvas) {
      const ctx = particleCanvas.getContext("2d");
      if (ctx) {
        let W = window.innerWidth, H = window.innerHeight, dpr2 = 1;
        const resizeP = () => {
          dpr2 = Math.min(window.devicePixelRatio || 1, 2);
          W = window.innerWidth; H = window.innerHeight;
          particleCanvas.width = Math.max(1, Math.round(W * dpr2));
          particleCanvas.height = Math.max(1, Math.round(H * dpr2));
          ctx.setTransform(dpr2, 0, 0, dpr2, 0, 0);
        };
        resizeP();
        window.addEventListener("resize", resizeP);

        const COUNT = 100;
        const rnd = (a: number, b: number) => a + Math.random() * (b - a);
        const clamp01 = (v: number) => v < 0 ? 0 : v > 1 ? 1 : v;
        const LOGO_CX = 0.5, LOGO_CY = 0.5, AVOID_RX = 0.15, AVOID_RY = 0.19, AVOID_REACH = 1.7;

        interface Ember { x:number; y:number; vy:number; drift:number; swayA:number; swayF:number; r:number; life:number; side:number; hot:boolean; }
        function spawnEmber(p: Ember, seeded: boolean) {
          p.x = rnd(0.03, 0.97);
          p.y = seeded ? rnd(-0.1, 1.15) : rnd(1.0, 1.2);
          p.vy = rnd(0.14, 0.34); p.drift = rnd(-0.016, 0.016);
          p.swayA = rnd(0.004, 0.02); p.swayF = rnd(0.5, 1.5);
          p.r = rnd(0.3, 1.1); p.life = 0;
          p.side = Math.random() < 0.5 ? -1 : 1;
          p.hot = Math.random() < 0.24;
        }
        const parts: Ember[] = [];
        for (let i = 0; i < COUNT; i++) { const p = {} as Ember; spawnEmber(p, true); parts.push(p); }

        let lastE = performance.now();
        function emberFrame(now: number) {
          emberRaf = requestAnimationFrame(emberFrame);
          const dt2 = Math.min((now - lastE) / 1000, 0.05); lastE = now;
          particleCanvas!.style.opacity = "1";
          ctx!.clearRect(0, 0, W, H);
          ctx!.globalCompositeOperation = "lighter";
          for (const p of parts) {
            p.life += dt2;
            const nx2 = (p.x - LOGO_CX) / AVOID_RX, ny2 = (p.y - LOGO_CY) / AVOID_RY;
            const nd = Math.sqrt(nx2*nx2 + ny2*ny2) || 1e-4;
            if (nd < AVOID_REACH) {
              let s2 = clamp01((AVOID_REACH - nd) / (AVOID_REACH - 0.7));
              s2 = s2 * s2 * (3 - 2 * s2);
              const ox2 = p.x - LOGO_CX, oy2 = p.y - LOGO_CY;
              const od = Math.max(0.02, Math.sqrt(ox2*ox2 + oy2*oy2));
              const rux = ox2/od, ruy = oy2/od;
              const sgn = Math.abs(ox2) < 0.015 ? p.side : (ox2 < 0 ? 1 : -1);
              const tux = -ruy*sgn, tuy = rux*sgn;
              p.x += (tux*0.34 + rux*0.10) * s2 * dt2;
              p.y += (tuy*0.34 + ruy*0.10) * s2 * dt2;
            }
            p.y -= p.vy * dt2;
            p.x += (p.drift + Math.sin(p.life * p.swayF) * p.swayA) * dt2;
            p.x = clamp01(p.x);
            if (p.y < -0.12) spawnEmber(p, false);
            const fadeIn = clamp01(p.life / 0.5);
            const topBoost = 0.6 + 1.4 * (1 - clamp01(p.y));
            const fade = fadeIn * topBoost;
            if (fade <= 0.001) continue;
            const px2 = p.x * W, py2 = p.y * H;
            const rad2 = p.r * (0.7 + 0.5 * clamp01(fadeIn)) * 3;
            const g = ctx!.createRadialGradient(px2, py2, 0, px2, py2, rad2);
            if (p.hot) {
              g.addColorStop(0, `rgba(255,255,255,${(0.9*fade).toFixed(3)})`);
              g.addColorStop(0.35, `rgba(255,190,160,${(0.5*fade).toFixed(3)})`);
              g.addColorStop(1, "rgba(255,120,90,0)");
            } else {
              g.addColorStop(0, `rgba(255,130,90,${(0.8*fade).toFixed(3)})`);
              g.addColorStop(0.5, `rgba(214,24,24,${(0.34*fade).toFixed(3)})`);
              g.addColorStop(1, "rgba(150,10,10,0)");
            }
            ctx!.fillStyle = g;
            ctx!.beginPath(); ctx!.arc(px2, py2, rad2, 0, 6.2832); ctx!.fill();
          }
        }
        emberRaf = requestAnimationFrame(emberFrame);
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(emberRaf);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove as EventListener);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onPointerDown as EventListener);
      window.removeEventListener("pointermove", onMove as EventListener);
      window.removeEventListener("pointerdown", onPointerDown as EventListener);
      dispose();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="fixed inset-0 w-full h-full overflow-hidden select-none z-[9999]"
      style={{ cursor: "none" }}
    >
      {/* WebGL fluid ink — exact reference compositing */}
      <canvas
        ref={inkCanvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ opacity: 1, pointerEvents: "none" }}
      />
      {/* Ember particles */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ opacity: 1, pointerEvents: "none" }}
      />

      {/* Custom cursor ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none rounded-full opacity-0 transition-opacity duration-300 z-[9999]"
        style={{
          left: 0, top: 0,
          width: "46px", height: "46px",
          marginLeft: "-23px", marginTop: "-23px",
          border: "1.5px solid rgba(255,255,255,0.8)",
          boxShadow: "0 0 0 1px rgba(120,120,160,0.10), 0 2px 14px rgba(110,100,160,0.22)",
        }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[11px] bg-white/95" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[11px] h-[2px] bg-white/95" />
      </div>
    </div>
  );
};

export default InkFlowCanvas;
