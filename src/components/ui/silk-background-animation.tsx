'use client';

import React, { useEffect, useRef } from 'react';

export interface SilkBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showText?: boolean;
  colorScheme?: 'dark' | 'purple' | 'crimson';
  speed?: number;
  scale?: number;
}

export const SilkBackgroundAnimation: React.FC<SilkBackgroundProps> = ({
  children,
  className = "",
  showText = false,
  colorScheme = "dark",
  speed = 1.0,
  scale = 2.4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Try WebGL for ultra-smooth 60fps silky wave rendering
    const gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (gl) {
      // --- WebGL Shader Implementation ---
      const vertexShaderSource = `
        attribute vec2 a_position;
        varying vec2 v_uv;
        void main() {
          v_uv = (a_position + 1.0) * 0.5;
          v_uv.y = 1.0 - v_uv.y; // Flip Y for screen space
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      const fragmentShaderSource = `
        precision highp float;
        varying vec2 v_uv;
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform float u_scale;
        uniform int u_color_scheme;

        // Pseudo-noise function matching 21st.dev silk pattern
        float noise(vec2 p) {
          float G = 2.71828;
          float rx = G * sin(G * p.x);
          float ry = G * sin(G * p.y);
          return fract(rx * ry * (1.0 + p.x));
        }

        void main() {
          vec2 uv = v_uv;
          float aspect = u_resolution.x / u_resolution.y;
          vec2 scaledUv = vec2(uv.x * aspect, uv.y) * u_scale;

          float t = u_time * 0.025;

          // 21st.dev Silk Wave Formula
          float tex_x = scaledUv.x;
          float tex_y = scaledUv.y + 0.05 * sin(7.0 * tex_x - t);

          float wave1 = sin(5.0 * (tex_x + tex_y + cos(3.0 * tex_x + 5.0 * tex_y) + 0.03 * t) + sin(18.0 * (tex_x + tex_y - 0.12 * t)));
          float pattern = 0.55 + 0.45 * wave1;

          // Add shimmering woven texture noise
          float n = noise(floor(gl_FragCoord.xy / 2.0));
          float intensity = max(0.0, pattern - (n / 16.0) * 0.7);

          // Smooth, elegant contrast curve for soft liquid silk gradations
          intensity = pow(intensity, 1.15) * 1.05;

          vec3 baseColor;
          vec3 midColor;
          vec3 highlightColor;

          if (u_color_scheme == 0) {
            // Elegant Soft Charcoal & Liquid Silver Satin Silk (Less dark, smoother transitions)
            baseColor = vec3(0.09, 0.095, 0.11);
            midColor = vec3(0.24, 0.25, 0.28);
            highlightColor = vec3(0.68, 0.70, 0.76);
          } else if (u_color_scheme == 1) {
            // Classic Purple-Gray Silk
            baseColor = vec3(0.12, 0.11, 0.14);
            midColor = vec3(0.32, 0.28, 0.35);
            highlightColor = vec3(0.65, 0.60, 0.70);
          } else {
            // Vivid Crimson Velvet
            baseColor = vec3(0.08, 0.02, 0.03);
            midColor = vec3(0.38, 0.08, 0.12);
            highlightColor = vec3(0.88, 0.18, 0.24);
          }

          // Smooth multi-stage wave blend
          vec3 waveShade = mix(baseColor, midColor, smoothstep(0.05, 0.55, intensity));
          vec3 color = mix(waveShade, highlightColor, smoothstep(0.45, 0.95, intensity));

          // Soft subtle vignette (not overly dark at edges)
          vec2 centerUv = (v_uv - 0.5) * vec2(aspect, 1.0);
          float dist = length(centerUv);
          float vignette = clamp(1.0 - dist * 0.22, 0.0, 1.0);
          color *= vignette;

          gl_FragColor = vec4(color, 1.0);
        }
      `;

      const createShader = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      };

      const vs = createShader(gl.VERTEX_SHADER, vertexShaderSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
      if (!vs || !fs) return;

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);

      // Fullscreen quad buffer
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1.0, -1.0,
           1.0, -1.0,
          -1.0,  1.0,
          -1.0,  1.0,
           1.0, -1.0,
           1.0,  1.0,
        ]),
        gl.STATIC_DRAW
      );

      const positionLocation = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
      const timeLocation = gl.getUniformLocation(program, 'u_time');
      const scaleLocation = gl.getUniformLocation(program, 'u_scale');
      const colorSchemeLocation = gl.getUniformLocation(program, 'u_color_scheme');

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (resolutionLocation) {
          gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        }
      };

      resize();
      window.addEventListener('resize', resize);

      let startTime = performance.now();
      const colorMode = colorScheme === 'dark' ? 0 : colorScheme === 'purple' ? 1 : 2;

      const render = (timeNow: number) => {
        const elapsed = (timeNow - startTime) * 0.001 * speed * 35.0;

        gl.useProgram(program);
        if (timeLocation) gl.uniform1f(timeLocation, elapsed);
        if (scaleLocation) gl.uniform1f(scaleLocation, scale);
        if (colorSchemeLocation) gl.uniform1i(colorSchemeLocation, colorMode);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        animFrameRef.current = requestAnimationFrame(render);
      };

      animFrameRef.current = requestAnimationFrame(render);

      return () => {
        window.removeEventListener('resize', resize);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      };
    } else {
      // Fallback: 2D Canvas CPU rendering with solid filled blocks
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let time = 0;
      const resize = () => {
        canvas.width = Math.floor(window.innerWidth / 2);
        canvas.height = Math.floor(window.innerHeight / 2);
      };
      resize();
      window.addEventListener('resize', resize);

      const render2D = () => {
        const { width, height } = canvas;
        const imgData = ctx.createImageData(width, height);
        const data = imgData.data;
        const tOffset = time * 0.02 * speed;

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const u = (x / width) * scale;
            const v = (y / height) * scale;
            const tex_x = u;
            const tex_y = v + 0.04 * Math.sin(7.0 * tex_x - tOffset);

            const pattern = 0.55 + 0.45 * Math.sin(
              5.0 * (tex_x + tex_y + Math.cos(3.0 * tex_x + 5.0 * tex_y) + 0.03 * tOffset) +
              Math.sin(18.0 * (tex_x + tex_y - 0.12 * tOffset))
            );

            const intensity = Math.pow(pattern, 1.3);
            const idx = (y * width + x) * 4;

            if (colorScheme === 'crimson') {
              data[idx] = Math.floor(210 * intensity);
              data[idx + 1] = Math.floor(25 * intensity);
              data[idx + 2] = Math.floor(35 * intensity);
            } else {
              data[idx] = Math.floor(145 * intensity);
              data[idx + 1] = Math.floor(135 * intensity);
              data[idx + 2] = Math.floor(155 * intensity);
            }
            data[idx + 3] = 255;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        time += 1;
        animFrameRef.current = requestAnimationFrame(render2D);
      };

      animFrameRef.current = requestAnimationFrame(render2D);

      return () => {
        window.removeEventListener('resize', resize);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };
    }
  }, [colorScheme, speed, scale]);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-black ${className}`}>
      {/* Dynamic Silky Waves Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Gentle Contrast Vignette for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Optional Demo Typography */}
      {showText && (
        <div className="relative z-20 flex h-full items-center justify-center pointer-events-none">
          <div className="text-center px-8">
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-light tracking-[-0.05em] text-white mix-blend-difference drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              silk
            </h1>
            <div className="mt-8 text-xl font-extralight tracking-[0.2em] uppercase text-zinc-300">
              <span>flowing</span>
              <span className="mx-4 text-zinc-500">•</span>
              <span>texture</span>
              <span className="mx-4 text-zinc-500">•</span>
              <span>art</span>
            </div>
          </div>
        </div>
      )}

      {/* Slotted Content */}
      {children && <div className="relative z-20 w-full h-full">{children}</div>}
    </div>
  );
};

export const Component = SilkBackgroundAnimation;
export default SilkBackgroundAnimation;
