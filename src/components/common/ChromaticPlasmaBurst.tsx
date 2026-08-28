"use client";

import React, { useEffect, useRef } from "react";

interface ChromaticPlasmaBurstProps {
  progress?: number;
  className?: string;
  intensity?: number;
  speed?: number;
}

export const ChromaticPlasmaBurst: React.FC<ChromaticPlasmaBurstProps> = ({
  progress = 1.0,
  className = "",
  intensity = 1.0,
  speed = 1.2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    // Vertex Shader
    const vsSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Top-Navbar Downward Crimson Fluid Burst & Lens Flare
    const fsSource = `
      precision highp float;
      varying vec2 vUv;

      uniform float uTime;
      uniform float uProgress;
      uniform float uIntensity;
      uniform vec2 uResolution;
      uniform vec2 uMouse;

      vec2 hash22(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }

      float gnoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(dot(hash22(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
              dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
          mix(dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
              dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * gnoise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        // Origin at top center
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        vec2 uv = vec2(st.x - 0.5, 1.0 - st.y);
        uv.x *= uResolution.x / uResolution.y;

        float dist = length(uv * vec2(0.9, 1.6));
        float t = uTime * 0.7;

        // Fluid noise domain warping
        vec2 q = vec2(
          fbm(uv * 3.2 + vec2(0.0, t * 0.4)),
          fbm(uv * 3.2 + vec2(t * 0.3, 0.0))
        );

        float f = fbm(uv * 4.0 + 3.0 * q + vec2(0.0, t * 0.3));

        // Downward burst arc
        float arc = smoothstep(0.9, 0.0, dist + f * 0.22);
        
        // Colors: Radiant Crimson & Hot Ruby
        vec3 colCore = vec3(1.0, 0.95, 0.9);
        vec3 colHotRed = vec3(1.0, 0.15, 0.08);
        vec3 colCrimson = vec3(0.85, 0.05, 0.05);
        vec3 colDeepVelvet = vec3(0.45, 0.0, 0.02);

        vec3 color = mix(colDeepVelvet, colCrimson, clamp(f * 1.5, 0.0, 1.0));
        color = mix(color, colHotRed, clamp((1.0 - dist * 1.8) + f * 0.5, 0.0, 1.0));

        // Center Hotspot right under navbar
        float hotspot = pow(clamp(1.0 - length(uv * vec2(1.8, 3.5)), 0.0, 1.0), 3.0);
        color += colCore * hotspot * 1.6;

        float alpha = arc * clamp(uIntensity, 0.0, 1.0);
        alpha = clamp(alpha * (1.1 - dist * 0.9), 0.0, 1.0);

        gl_FragColor = vec4(color * alpha, alpha);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uProgressLoc = gl.getUniformLocation(program, "uProgress");
    const uIntensityLoc = gl.getUniformLocation(program, "uIntensity");
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uMouseLoc = gl.getUniformLocation(program, "uMouse");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    let startTime = performance.now();

    const render = (now: number) => {
      resize();
      const elapsed = (now - startTime) * 0.001 * speed;

      gl.useProgram(program);
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform1f(uProgressLoc, progress);
      gl.uniform1f(uIntensityLoc, intensity);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
    };
  }, [speed, intensity, progress]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
      style={{ display: "block" }}
    />
  );
};
