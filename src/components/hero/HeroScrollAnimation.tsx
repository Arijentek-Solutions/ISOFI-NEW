"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { START_FRAME, TOTAL_FRAMES, SCROLL_TRANSITION_DURATION, FRAME_PATH, SECTION_STEPS, easeInOutSmooth, clamp,} from "./constants";
import { HeroCanvas } from "./HeroCanvas";
import { Stage1HeroOverlay } from "./Stage1HeroOverlay";
import { Stage2OverviewOverlay } from "./Stage2OverviewOverlay";
import { Stage3ServicesOverlay } from "./Stage3ServicesOverlay";
import { Stage4SystemsOverlay } from "./Stage4SystemsOverlay";
import { Stage5VideoShowcase } from "./Stage5VideoShowcase";
import { Stage6IsofinityOverlay } from "./Stage6IsofinityOverlay";
import { Stage7FrameworkOverlay } from "./Stage7FrameworkOverlay";
import { Stage8PointOfViewOverlay } from "./Stage8PointOfViewOverlay";
import { Stage9ClientsOverlay } from "./Stage9ClientsOverlay";
import { Stage10WovenLightOverlay } from "./Stage10WovenLightOverlay";
import { ScrollHintIndicator } from "./ScrollHintIndicator";
import MobileFloatingCardsBg from "./MobileFloatingCardsBg";

// Re-export constants for external consumer compatibility
export { SECTION_STEPS };

export function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stage1TextRef = useRef<HTMLDivElement>(null);
  const mobileBgRef = useRef<HTMLDivElement>(null);
  const stage2ContainerRef = useRef<HTMLDivElement>(null);
  const stage3ContainerRef = useRef<HTMLDivElement>(null);
  const stage4ContainerRef = useRef<HTMLDivElement>(null);
  const stage5ContainerRef = useRef<HTMLDivElement>(null);
  const stage6ContainerRef = useRef<HTMLDivElement>(null);
  const stage7ContainerRef = useRef<HTMLDivElement>(null);
  const stage8ContainerRef = useRef<HTMLDivElement>(null);
  const stage9ContainerRef = useRef<HTMLDivElement>(null);
  const stage10ContainerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [, setLoadedCount] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const targetMousePosRef = useRef({ x: 0, y: 0 });
  const currentMousePosRef = useRef({ x: 0, y: 0 });
  const [currentPhase, setCurrentPhase] = useState<1 | 2>(1);
  const [activeStep, setActiveStep] = useState(0);
  const [activeFrameworkIndex, setActiveFrameworkIndex] = useState(-1);
  const [activePovIndex, setActivePovIndex] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetIdleTimer = useCallback(() => {
    setShowScrollHint(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (currentStepRef.current < SECTION_STEPS.length - 1) {
      idleTimerRef.current = setTimeout(() => {
        setShowScrollHint(true);
      }, 2500); // Re-appears after 2.5s of idle inactivity
    }
  }, []);

  const currentStepRef = useRef(0);
  const startProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const transitionStartTimeRef = useRef(0);
  const currentDurationRef = useRef(SCROLL_TRANSITION_DURATION);
  const isTransitioningRef = useRef(false);
  const isNavigatingUpRef = useRef(false);

  const currentFrameRef = useRef(START_FRAME);
  const animationFrameIdRef = useRef<number | null>(null);
  const isAnimatingLockRef = useRef(false);
  const lockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const eruptionPlayedRef = useRef(false);

  // Preload all frames on desktop only to optimize mobile performance
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = START_FRAME; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        renderFrame(Math.round(currentFrameRef.current));
      };
      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
      };
      images[i] = img;
    }
    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, []);

  // Canvas drawing function with high-DPI and aspect-ratio "cover" support
  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset <= TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[frameIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[frameIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (
      canvas.width !== displayWidth * dpr ||
      canvas.height !== displayHeight * dpr
    ) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasAspect > imgAspect) {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgAspect;
      offsetX = 0;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgAspect;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  // Master Step Navigation Function with adaptive duration
  const goToStep = useCallback((stepIndex: number) => {
    const clampedIndex = Math.max(
      0,
      Math.min(SECTION_STEPS.length - 1, stepIndex)
    );
    if (clampedIndex === currentStepRef.current && !isTransitioningRef.current) {
      return;
    }

    // Immediately hide the scroll hint during transition
    setShowScrollHint(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    // Brisk duration for the 3D card rotation between Step 3 (Core) & Step 4 (Scale)
    const isCardFlipTransition =
      (clampedIndex === 4 && currentStepRef.current === 3) ||
      (clampedIndex === 3 && currentStepRef.current === 4);

    // Fast and smooth duration for video entrances and logo zoom-in
    const isVideoOrLogoTransition =
      (clampedIndex >= 6 && clampedIndex <= 9) ||
      (currentStepRef.current >= 6 && currentStepRef.current <= 9);

    // Smooth snappy duration for Framework & POV revolving steps (10-18)
    const isFastStepTransition =
      clampedIndex >= 10 && currentStepRef.current >= 10;

    currentDurationRef.current = isCardFlipTransition
      ? 750
      : isFastStepTransition
        ? 700
        : isVideoOrLogoTransition
          ? 950
          : 1100;

    isNavigatingUpRef.current = clampedIndex < currentStepRef.current;
    currentStepRef.current = clampedIndex;
    setActiveStep(clampedIndex);

    // Setup time-based smooth easing curve
    startProgressRef.current = currentProgressRef.current;
    targetProgressRef.current = SECTION_STEPS[clampedIndex].progress;
    transitionStartTimeRef.current = performance.now();
    isTransitioningRef.current = true;

    // Strictly lock input during transition so continuous scrolling cannot skip sections
    isAnimatingLockRef.current = true;
    if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
  }, []);

  // Auto-transition to "Innovative Tech" (Step 1) on initial website entry (desktop only)
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }
    const autoIntroTimer = setTimeout(() => {
      goToStep(1);
    }, 250);

    return () => {
      clearTimeout(autoIntroTimer);
    };
  }, [goToStep]);

  // Continuous animation loop (slow smooth easing curve & multi-stage transitions)
  useEffect(() => {
    const updateScene = () => {
      // 1. Time-based smooth easing with adaptive duration
      if (isTransitioningRef.current) {
        const elapsed = performance.now() - transitionStartTimeRef.current;
        const duration =
          currentDurationRef.current || SCROLL_TRANSITION_DURATION;
        const rawProgress = Math.min(1, Math.max(0, elapsed / duration));
        const eased = easeInOutSmooth(rawProgress);

        currentProgressRef.current =
          startProgressRef.current +
          (targetProgressRef.current - startProgressRef.current) * eased;

        if (rawProgress >= 1) {
          currentProgressRef.current = targetProgressRef.current;
          isTransitioningRef.current = false;

          // Re-arm the idle hint timer for discovery when user pauses
          if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
          if (currentStepRef.current < SECTION_STEPS.length - 1) {
            idleTimerRef.current = setTimeout(() => {
              setShowScrollHint(true);
            }, 2500);
          }

          // Unlock promptly when target section arrives so subsequent scrolls register immediately
          if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
          lockTimeoutRef.current = setTimeout(() => {
            isAnimatingLockRef.current = false;
          }, 40);
        }
      }

      // Smooth mouse parallax lerp for silky, weighted 3D depth
      currentMousePosRef.current.x +=
        (targetMousePosRef.current.x - currentMousePosRef.current.x) * 0.08;
      currentMousePosRef.current.y +=
        (targetMousePosRef.current.y - currentMousePosRef.current.y) * 0.08;
      const mX = currentMousePosRef.current.x;
      const mY = currentMousePosRef.current.y;

      const p = currentProgressRef.current;
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      const vw = typeof window !== "undefined" ? window.innerWidth : 1200;

      // ----------------------------------------------------
      // GLOBAL TRANSITIONS: WHITE STAGE UPWARD EXIT & DARK BG
      // Progressive slide up & slow background transition from white to black: p = 0.92 -> 1.00
      // ----------------------------------------------------
      const whiteExitP = clamp(p, 0.92, 1.0);
      const whiteExitEased = easeInOutSmooth(whiteExitP);
      const whiteExitY = -whiteExitEased * vh * 1.05;
      const whiteExitOpacity = Math.max(0, 1 - whiteExitEased * 1.25);

      const darkP = clamp(p, 0.92, 1.0);
      const darkEased = easeInOutSmooth(darkP);
      const bgVal = Math.round(239 * (1 - darkEased));

      if (containerRef.current) {
        containerRef.current.style.backgroundColor = `rgb(${bgVal}, ${bgVal}, ${bgVal})`;
      }
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute(
          "data-theme",
          darkP >= 0.35 ? "dark" : "light"
        );
      }

      // 2. Map progress 0.0 -> 0.14 to video frames (2 -> 115) smoothly
      const frameProgress = Math.min(1, Math.max(0, p / 0.14));
      const targetFrame =
        START_FRAME + frameProgress * (TOTAL_FRAMES - START_FRAME);
      currentFrameRef.current = targetFrame;

      const frameToDraw = Math.min(
        TOTAL_FRAMES,
        Math.max(START_FRAME, Math.round(currentFrameRef.current))
      );
      renderFrame(frameToDraw);

      // ----------------------------------------------------
      // STICKY NAVBAR MANAGEMENT: Hide on Stage 7, Show on all other stages
      // ----------------------------------------------------
      const navEl = document.getElementById("global-navbar");
      if (navEl) {
        const isStage7 = p >= 0.91 && p <= 1.39;
        if (isStage7) {
          navEl.style.opacity = "0";
          navEl.style.pointerEvents = "none";
          navEl.style.transform = "translate3d(0, -100%, 0)";
          navEl.style.visibility = "hidden";
        } else {
          navEl.style.opacity = "1";
          navEl.style.pointerEvents = "auto";
          navEl.style.transform = "translate3d(0, 0, 0)";
          navEl.style.visibility = "visible";
        }
      }

      // ----------------------------------------------------
      // A. CANVAS FADE OUT: p = 0.14 -> 0.22
      // ----------------------------------------------------
      if (canvasRef.current) {
        const canvasFade =
          (1 - clamp(p, 0.14, 0.22)) * whiteExitOpacity;
        const canvasScale = 1 - clamp(p, 0.14, 0.22) * 0.04;
        canvasRef.current.style.opacity = canvasFade.toFixed(3);
        canvasRef.current.style.transform = `translate3d(0, ${whiteExitY.toFixed(
          1
        )}px, 0) scale(${canvasScale.toFixed(3)})`;
      }

      // ----------------------------------------------------
      // B. STAGE 1 TYPOGRAPHY ("INNOVATIVE TECH / INFINITE GROWTH")
      // ----------------------------------------------------
      if (stage1TextRef.current) {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        if (isMobile) {
          // On mobile: Stage 1 clears out smoothly before Stage 2 arrives (p: 0.11 -> 0.16)
          const s1FadeOut = clamp((p - 0.11) / 0.05, 0, 1);
          const s1Opacity = 1 - s1FadeOut;
          const s1Active = p <= 0.16;
          stage1TextRef.current.style.opacity = s1Opacity.toFixed(3);
          stage1TextRef.current.style.transform = "translate3d(0, 0, 0)";
          stage1TextRef.current.style.pointerEvents = s1Opacity > 0.1 ? "auto" : "none";
          stage1TextRef.current.style.visibility = s1Active ? "visible" : "hidden";
        } else {
          const inP = clamp(p, 0.03, 0.14);
          const outP = clamp(p, 0.14, 0.22);
          const opacity = inP * (1 - outP) * whiteExitOpacity;
          const translateY = (1 - inP) * 30 - outP * 30 + whiteExitY;
          const s1Active = p <= 0.24;

          stage1TextRef.current.style.opacity = opacity.toFixed(3);
          stage1TextRef.current.style.transform = `translate3d(0, ${translateY.toFixed(
            2
          )}px, 0)`;
          stage1TextRef.current.style.pointerEvents =
            opacity > 0.1 ? "auto" : "none";
          stage1TextRef.current.style.visibility =
            s1Active ? "visible" : "hidden";
        }
      }

      // Mobile Stationary Background Floating Cards (p: 0.16 -> 0.90, softly blurred ONLY on Video Showcase page)
      if (mobileBgRef.current) {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        if (isMobile) {
          const bgInP = clamp((p - 0.16) / 0.04, 0, 1);
          const bgOutP = clamp((p - 0.86) / 0.04, 0, 1);
          const bgActive = p >= 0.16 && p <= 0.90;

          // Blur ONLY on Video Showcase page (p >= 0.61 && p < 0.84). Stages 2, 3, and 4 stay 100% crisp with zero blur.
          const isVideoPage = p >= 0.61 && p < 0.84;
          const convergeP = clamp((p - 0.84) / 0.04, 0, 1);
          const convergeEased = easeInOutSmooth(convergeP);

          const targetOpacity = bgInP * (1 - bgOutP) * (isVideoPage ? 0.65 : 1.0) * (1 - convergeEased);

          mobileBgRef.current.style.opacity = targetOpacity.toFixed(3);
          mobileBgRef.current.style.visibility = bgActive ? "visible" : "hidden";
          mobileBgRef.current.style.filter = isVideoPage ? "blur(5px)" : "none";

          if (convergeP > 0) {
            const scale = 1.0 - convergeEased * 0.5;
            mobileBgRef.current.style.transform = `scale(${scale.toFixed(3)})`;
          } else {
            mobileBgRef.current.style.transform = "none";
          }
        } else {
          mobileBgRef.current.style.visibility = "hidden";
        }
      }

      // ----------------------------------------------------
      // C. STAGE 2 ("YOUR BUSINESS HAS A LOT GOING ON...")
      // ----------------------------------------------------
      if (stage2ContainerRef.current) {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        if (isMobile) {
          // On mobile: Stage 2 enters ONLY AFTER Stage 1 has fully cleared (p: 0.16 -> 0.22)
          const s2InP = clamp((p - 0.16) / 0.06, 0, 1);
          const s2OutP = clamp((p - 0.27) / 0.06, 0, 1);
          const s2Opacity = s2InP * (1 - s2OutP);
          const s2Active = p >= 0.16 && p <= 0.34;

          stage2ContainerRef.current.style.opacity = s2Opacity.toFixed(3);
          stage2ContainerRef.current.style.transform = "translate3d(0, 0, 0)";
          stage2ContainerRef.current.style.visibility = s2Active ? "visible" : "hidden";
          stage2ContainerRef.current.style.pointerEvents = s2Active && s2Opacity > 0.3 ? "auto" : "none";

          const charElements = stage2ContainerRef.current.querySelectorAll("[data-headline-char]");
          charElements.forEach((el) => {
            const charEl = el as HTMLElement;
            charEl.style.opacity = s2InP > 0.1 ? "1" : "0";
            charEl.style.transform = "none";
            charEl.style.color = "rgb(15, 15, 15)";
          });

          const narrativeEl = stage2ContainerRef.current.querySelector("[data-stage2-narrative]") as HTMLElement;
          if (narrativeEl) {
            narrativeEl.style.opacity = s2InP > 0.1 ? "1" : "0";
            narrativeEl.style.transform = "none";
          }
        } else {
          // Desktop animation logic: Headline chars zoom out & narrative fade
          const charElements = stage2ContainerRef.current.querySelectorAll(
            "[data-headline-char]"
          );
          const s2ExitP = clamp(p, 0.28, 0.34);
          const s2ExitY = s2ExitP * -30;
          const s2ExitOpacity = (1 - s2ExitP) * whiteExitOpacity;
          const s2Active = p >= 0.16 && p <= 0.90;

          stage2ContainerRef.current.style.opacity = "1";
          stage2ContainerRef.current.style.visibility =
            s2Active ? "visible" : "hidden";
          stage2ContainerRef.current.style.pointerEvents =
            s2Active && p <= 0.34 ? "auto" : "none";

          if (charElements && charElements.length > 0) {
            const totalChars = charElements.length;
            const hP = clamp(p, 0.18, 0.26);

            charElements.forEach((el, index) => {
              const charEl = el as HTMLElement;
              const charStart = (index / totalChars) * 0.65;
              const charEnd = Math.min(1, charStart + 0.35);
              const charProgress = clamp(hP, charStart, charEnd);

              const scale = 1.22 - charProgress * 0.22;
              const entryOpacity = Math.min(1, charProgress * 1.6);
              const finalOpacity = entryOpacity * s2ExitOpacity;
              const translateY =
                (1 - charProgress) * -10 + s2ExitY + whiteExitY;
              const blur = (1 - charProgress) * 2.5;

              const r = Math.round(15 + (1 - charProgress) * 193);
              const g = Math.round(15 + (1 - charProgress) * 10);
              const b = Math.round(15 + (1 - charProgress) * 10);

              charEl.style.opacity = finalOpacity.toFixed(3);
              charEl.style.transform = `translate3d(0, ${translateY.toFixed(
                1
              )}px, 0) scale(${scale.toFixed(3)})`;
              charEl.style.filter =
                blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "none";
              charEl.style.color = `rgb(${r}, ${g}, ${b})`;
            });
          }

          const narrativeEl = stage2ContainerRef.current.querySelector(
            "[data-stage2-narrative]"
          ) as HTMLElement;
          if (narrativeEl) {
            const nInP = clamp(p, 0.2, 0.26);
            const nOutP = clamp(p, 0.28, 0.34);
            const nOpacity = nInP * (1 - nOutP) * whiteExitOpacity;
            const nY = (1 - nInP) * 30 - nOutP * 30 + whiteExitY;
            narrativeEl.style.opacity = nOpacity.toFixed(3);
            narrativeEl.style.transform = `translate3d(0, ${nY.toFixed(2)}px, 0)`;
          }

          const driftP = clamp(p, 0.28, 0.38);
          const convergeP = clamp(p, 0.84, 0.88);
          const convergeEased = easeInOutSmooth(convergeP);

          // Snappy collapse window so cards don't linger before Stage 6
          const zoomOutP = clamp(p, 0.86, 0.90);
          const quickZoomOut = Math.min(1, zoomOutP * 1.35);

          // Progressive bokeh blur, desaturation, and soft ambient opacity in background
          const blurAmount = driftP * 15;
          const grayscaleAmount = driftP * 70;
          const dimOpacity =
            (1 - driftP * 0.58) * (1 - quickZoomOut) * whiteExitOpacity;
          const clusterZoomOutScale = Math.max(0, 1.0 - quickZoomOut);
          const clusterDepthZ = -30 - quickZoomOut * 800;

          // --- Card 1: Web Platform ---
          const card1El = stage2ContainerRef.current.querySelector(
            "[data-card='1']"
          ) as HTMLElement;
          if (card1El) {
            const c1InP = clamp(p, 0.18, 0.26);
            const inX = (1 - c1InP) * -60;
            const inY = (1 - c1InP) * 100;
            const driftX = driftP * -40;
            const driftY = driftP * 50;

            const targetConvergeX = vw * 0.34;
            const targetConvergeY = -vh * 0.32;
            const curX =
              (inX + driftX) * (1 - convergeEased) +
              targetConvergeX * convergeEased;
            const curY =
              (inY + driftY) * (1 - convergeEased) +
              targetConvergeY * convergeEased +
              whiteExitY;
            const curRot = -24.54 * (1 - convergeEased);

            card1El.style.opacity = (c1InP * dimOpacity).toFixed(3);
            card1El.style.transform = `translate3d(${curX.toFixed(
              2
            )}px, ${curY.toFixed(
              2
            )}px, ${clusterDepthZ.toFixed(1)}px) rotate(${curRot.toFixed(
              2
            )}deg) scale(${clusterZoomOutScale.toFixed(3)})`;
            card1El.style.filter = `blur(${blurAmount.toFixed(
              1
            )}px) grayscale(${grayscaleAmount.toFixed(0)}%)`;
          }

          // --- Card 2: AI Processor Chip (Center) ---
          const card2El = stage2ContainerRef.current.querySelector(
            "[data-card='2']"
          ) as HTMLElement;
          if (card2El) {
            const c2InP = clamp(p, 0.19, 0.26);
            const inY = (1 - c2InP) * 120;
            const driftX = driftP * 120;
            const driftY = driftP * -380;
            const baseScale = (0.7 + c2InP * 0.3) * (1 - driftP * 0.12);

            const targetConvergeX = 0;
            const targetConvergeY = -vh * 0.32;
            const curX =
              driftX * (1 - convergeEased) + targetConvergeX * convergeEased;
            const curY =
              (inY + driftY) * (1 - convergeEased) +
              targetConvergeY * convergeEased +
              whiteExitY;
            const cardScale =
              baseScale * (1 - convergeEased) + 1.0 * convergeEased;
            const finalScale = cardScale * clusterZoomOutScale;

            card2El.style.opacity = (c2InP * dimOpacity).toFixed(3);
            card2El.style.transform = `translate3d(${curX.toFixed(
              2
            )}px, ${curY.toFixed(
              2
            )}px, ${clusterDepthZ.toFixed(1)}px) scale(${finalScale.toFixed(3)})`;
            card2El.style.filter = `blur(${blurAmount.toFixed(
              1
            )}px) grayscale(${grayscaleAmount.toFixed(0)}%)`;
          }

          // --- Card 3: Database & Analytics ---
          const card3El = stage2ContainerRef.current.querySelector(
            "[data-card='3']"
          ) as HTMLElement;
          if (card3El) {
            const c3InP = clamp(p, 0.2, 0.27);
            const inX = (1 - c3InP) * 60;
            const inY = (1 - c3InP) * -80;
            const driftX = driftP * 70;
            const driftY = driftP * 380;

            const targetConvergeX = -vw * 0.34;
            const targetConvergeY = vh * 0.32;
            const curX =
              (inX + driftX) * (1 - convergeEased) +
              targetConvergeX * convergeEased;
            const curY =
              (inY + driftY) * (1 - convergeEased) +
              targetConvergeY * convergeEased +
              whiteExitY;
            const curRot = 15 * (1 - convergeEased);

            card3El.style.opacity = (c3InP * dimOpacity).toFixed(3);
            card3El.style.transform = `translate3d(${curX.toFixed(
              2
            )}px, ${curY.toFixed(
              2
            )}px, ${clusterDepthZ.toFixed(1)}px) rotate(${curRot.toFixed(
              2
            )}deg) scale(${clusterZoomOutScale.toFixed(3)})`;
            card3El.style.filter = `blur(${blurAmount.toFixed(
              1
            )}px) grayscale(${grayscaleAmount.toFixed(0)}%)`;
          }
        }
      }

      // ----------------------------------------------------
      // E. STAGE 3: "BUILT AROUND WHAT YOUR BUSINESS NEEDS." + 2-PHASE FLIP DECK
      // ----------------------------------------------------
      if (stage3ContainerRef.current) {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        if (isMobile) {
          const s3InP = clamp((p - 0.28) / 0.06, 0, 1);
          const s3OutP = clamp((p - 0.48) / 0.06, 0, 1);
          const s3Opacity = s3InP * (1 - s3OutP);
          const s3Active = p >= 0.28 && p <= 0.54;

          stage3ContainerRef.current.style.opacity = s3Opacity.toFixed(3);
          stage3ContainerRef.current.style.transform = "translate3d(0, 0, 0)";
          stage3ContainerRef.current.style.visibility = s3Active ? "visible" : "hidden";
          stage3ContainerRef.current.style.pointerEvents = s3Active && s3Opacity > 0.3 ? "auto" : "none";

          const stage3Chars = stage3ContainerRef.current.querySelectorAll("[data-stage3-char]");
          stage3Chars.forEach((el) => {
            const charEl = el as HTMLElement;
            charEl.style.opacity = s3InP > 0.1 ? "1" : "0";
            charEl.style.transform = "none";
            charEl.style.color = "rgb(15, 15, 15)";
          });
        } else {
          // 1. Stage 3 Headline: Letter-by-Letter Zoom-Out (Entrance: 0.34 -> 0.38)
          const stage3Chars = stage3ContainerRef.current.querySelectorAll(
            "[data-stage3-char]"
          );
        const s3ExitP = clamp(p, 0.5, 0.56);
        const s3ExitY = s3ExitP * -30;
        const s3ExitOpacity = (1 - s3ExitP) * whiteExitOpacity;

        if (stage3Chars && stage3Chars.length > 0) {
          const totalChars = stage3Chars.length;
          const s3P = clamp(p, 0.34, 0.38);

          stage3Chars.forEach((el, index) => {
            const charEl = el as HTMLElement;
            const charStart = (index / totalChars) * 0.65;
            const charEnd = Math.min(1, charStart + 0.35);
            const charProgress = clamp(s3P, charStart, charEnd);

            const scale = 1.22 - charProgress * 0.22;
            const entryOpacity = Math.min(1, charProgress * 1.6);
            const finalOpacity = entryOpacity * s3ExitOpacity;
            const translateY =
              (1 - charProgress) * -10 + s3ExitY + whiteExitY;
            const blur = (1 - charProgress) * 2.5;

            const r = Math.round(15 + (1 - charProgress) * 193);
            const g = Math.round(15 + (1 - charProgress) * 10);
            const b = Math.round(15 + (1 - charProgress) * 10);

            charEl.style.opacity = finalOpacity.toFixed(3);
            charEl.style.transform = `translate3d(0, ${translateY.toFixed(
              1
            )}px, 0) scale(${scale.toFixed(3)})`;
            charEl.style.filter =
              blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "none";
            charEl.style.color = `rgb(${r}, ${g}, ${b})`;
          });
        }

        // 2. Stage 3 Phase Transition: Phase 1 Glides Left & Fades Out -> Phase 2 Glides in from Right & Fades In
        const s3EntranceP = clamp(p, 0.34, 0.38);
        const shiftNorm = clamp((p - 0.38) / 0.12, 0, 1);
        setCurrentPhase(shiftNorm >= 0.5 ? 2 : 1);

        const cardsExitP = clamp(p, 0.5, 0.56);
        const cardsExitY = cardsExitP * 40 + whiteExitY;
        const cardsExitOpacity = (1 - cardsExitP) * whiteExitOpacity;

        [1, 2, 3].forEach((slotIdx) => {
          const slotEl = stage3ContainerRef.current?.querySelector(
            `[data-stage3-slot='${slotIdx}']`
          ) as HTMLElement;
          const p1CardEl = stage3ContainerRef.current?.querySelector(
            `[data-card-layer='${slotIdx}-p1']`
          ) as HTMLElement;
          const p2CardEl = stage3ContainerRef.current?.querySelector(
            `[data-card-layer='${slotIdx}-p2']`
          ) as HTMLElement;

          if (slotEl) {
            const staggerEntrance = (slotIdx - 1) * 0.03;
            const slotInP = clamp((p - 0.34) / 0.04 - staggerEntrance, 0, 1);
            const slotX = (1 - slotInP) * 100;
            const entryScale = 0.94 + slotInP * 0.06;

            slotEl.style.opacity = (slotInP * cardsExitOpacity).toFixed(3);
            slotEl.style.transform = `translate3d(${slotX.toFixed(
              2
            )}px, ${cardsExitY.toFixed(2)}px, 0) scale(${entryScale.toFixed(
              3
            )})`;
          }

          if (p1CardEl && p2CardEl) {
            // Sequential wave stagger across slots (Slot 1 -> Slot 2 -> Slot 3)
            const stagger = (slotIdx - 1) * 0.12;
            const slotShiftRaw = clamp((shiftNorm - stagger) / (1 - stagger * 0.5), 0, 1);
            const slotShiftP = easeInOutSmooth(slotShiftRaw);

            // Phase 1 Card: Glides smoothly to the LEFT (-55px), fades out cleanly (1 -> 0)
            const p1X = -slotShiftP * 55;
            const p1Scale = 1.0 - slotShiftP * 0.04;
            const p1Opacity = Math.max(0, 1 - slotShiftP * 2.0);

            p1CardEl.style.transform = `translate3d(${p1X.toFixed(
              1
            )}px, 0, 0) scale(${p1Scale.toFixed(3)})`;
            p1CardEl.style.opacity = p1Opacity.toFixed(3);
            p1CardEl.style.pointerEvents = slotShiftP < 0.5 ? "auto" : "none";

            // Phase 2 Card: Glides in smoothly from the RIGHT (+55px -> 0px), scales (0.96 -> 1.0), fades in (0 -> 1)
            const p2X = (1 - slotShiftP) * 55;
            const p2Scale = 0.96 + slotShiftP * 0.04;
            const p2Opacity = Math.min(1, Math.max(0, (slotShiftP - 0.15) * 1.8));

            p2CardEl.style.transform = `translate3d(${p2X.toFixed(
              1
            )}px, 0, 0) scale(${p2Scale.toFixed(3)})`;
            p2CardEl.style.opacity = p2Opacity.toFixed(3);
            p2CardEl.style.pointerEvents = slotShiftP >= 0.5 ? "auto" : "none";
          }
        });

        const s3Active = p >= 0.32 && p <= 0.58;
        stage3ContainerRef.current.style.opacity = "1";
        stage3ContainerRef.current.style.visibility =
          s3Active ? "visible" : "hidden";
        stage3ContainerRef.current.style.pointerEvents =
          s3Active ? "auto" : "none";
        }
      }

      // ------------------------------------------------------------------
      // F. STAGE 4: "FROM COMPLEX PROBLEMS TO WORKING SYSTEMS."
      // ------------------------------------------------------------------
      if (stage4ContainerRef.current) {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        if (isMobile) {
          const s4InP = clamp((p - 0.50) / 0.05, 0, 1);
          const s4OutP = clamp((p - 0.60) / 0.05, 0, 1);
          const s4Opacity = s4InP * (1 - s4OutP);
          const s4Active = p >= 0.50 && p <= 0.65;

          stage4ContainerRef.current.style.opacity = s4Opacity.toFixed(3);
          stage4ContainerRef.current.style.transform = "translate3d(0, 0, 0)";
          stage4ContainerRef.current.style.visibility = s4Active ? "visible" : "hidden";
          stage4ContainerRef.current.style.pointerEvents = s4Active && s4Opacity > 0.3 ? "auto" : "none";

          const stage4Chars = stage4ContainerRef.current.querySelectorAll("[data-stage4-char]");
          stage4Chars.forEach((el) => {
            const charEl = el as HTMLElement;
            charEl.style.opacity = s4InP > 0.1 ? "1" : "0";
            charEl.style.transform = "none";
            charEl.style.color = "rgb(15, 15, 15)";
          });
        } else {
          const stage4Chars = stage4ContainerRef.current.querySelectorAll(
            "[data-stage4-char]"
          );
        const s4P = clamp(p, 0.54, 0.6);
        const s4ExitP = clamp(p, 0.6, 0.65);
        const s4ExitOpacity = (1 - s4ExitP) * whiteExitOpacity;
        const s4ExitY = s4ExitP * -40 + whiteExitY;

        if (stage4Chars && stage4Chars.length > 0) {
          const totalChars = stage4Chars.length;

          stage4Chars.forEach((el, index) => {
            const charEl = el as HTMLElement;
            const charStart = (index / totalChars) * 0.65;
            const charEnd = Math.min(1, charStart + 0.35);
            const charProgress = clamp(s4P, charStart, charEnd);

            const scale = 1.22 - charProgress * 0.22;
            const entryOpacity = Math.min(1, charProgress * 1.6);
            const finalOpacity = entryOpacity * s4ExitOpacity;
            const translateY = (1 - charProgress) * -10 + s4ExitY;
            const blur = (1 - charProgress) * 2.5;

            const r = Math.round(15 + (1 - charProgress) * 193);
            const g = Math.round(15 + (1 - charProgress) * 10);
            const b = Math.round(15 + (1 - charProgress) * 10);

            charEl.style.opacity = finalOpacity.toFixed(3);
            charEl.style.transform = `translate3d(0, ${translateY.toFixed(
              1
            )}px, 0) scale(${scale.toFixed(3)})`;
            charEl.style.filter =
              blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "none";
            charEl.style.color = `rgb(${r}, ${g}, ${b})`;
          });
        }

        const s4Active = p >= 0.52 && p <= 0.66;
        stage4ContainerRef.current.style.opacity = "1";
        stage4ContainerRef.current.style.visibility =
          s4Active ? "visible" : "hidden";
        stage4ContainerRef.current.style.pointerEvents =
          s4Active ? "auto" : "none";
        }
      }

      // ------------------------------------------------------------------
      // G. STAGE 5: INDIVIDUAL FULL-FOCUS VIDEO TRANSITIONS WITH 3D ROTATION
      // Step 07 (Video 1): Enter (0.60 -> 0.68), Exit (0.68 -> 0.72)
      // Step 08 (Video 2): Enter (0.70 -> 0.76), Exit (0.76 -> 0.80)
      // Step 09 (Video 3): Enter (0.78 -> 0.84), Exit (0.84 -> 0.88)
      // ------------------------------------------------------------------
      if (stage5ContainerRef.current) {
        stage5ContainerRef.current.style.transform = `translate3d(0, ${whiteExitY.toFixed(
          1
        )}px, 0)`;

        // Video 1
        const v1InP = clamp(p, 0.6, 0.68);
        const v1OutP = clamp(p, 0.68, 0.72);
        const v1El = stage5ContainerRef.current.querySelector(
          "[data-cinematic-video='1']"
        ) as HTMLElement;
        if (v1El) {
          const v1InEased = easeInOutSmooth(v1InP);
          const v1OutEased = easeInOutSmooth(v1OutP);

          const v1Y = (1 - v1InEased) * 850 - v1OutEased * 450;
          const v1DepthZ = (1 - v1InEased) * -200 - v1OutEased * 100;
          const v1RotZ = (1 - v1InEased) * -18 + v1OutEased * 15;
          const v1RotY = (1 - v1InEased) * 25 - v1OutEased * 20;
          const v1RotX = (1 - v1InEased) * 16 - v1OutEased * 10;
          const v1Scale = 0.72 + v1InEased * 0.28 - v1OutEased * 0.12;
          const v1Opacity =
            v1InEased * (1 - v1OutEased) * whiteExitOpacity;
          const v1Blur = v1OutEased * 8;

          v1El.style.opacity = v1Opacity.toFixed(3);
          v1El.style.transform = `translate3d(${mX * -18}px, ${
            v1Y + mY * -14
          }px, ${v1DepthZ.toFixed(1)}px) rotateX(${v1RotX.toFixed(
            2
          )}deg) rotateY(${v1RotY.toFixed(2)}deg) rotateZ(${v1RotZ.toFixed(
            2
          )}deg) scale(${v1Scale.toFixed(3)})`;
          v1El.style.filter =
            v1Blur > 0.2 ? `blur(${v1Blur.toFixed(1)}px)` : "none";
          v1El.style.pointerEvents = v1Opacity > 0.5 ? "auto" : "none";
        }

        // Video 2
        const v2InP = clamp(p, 0.7, 0.76);
        const v2OutP = clamp(p, 0.76, 0.8);
        const v2El = stage5ContainerRef.current.querySelector(
          "[data-cinematic-video='2']"
        ) as HTMLElement;
        if (v2El) {
          const v2InEased = easeInOutSmooth(v2InP);
          const v2OutEased = easeInOutSmooth(v2OutP);

          const v2Y = (1 - v2InEased) * 850 - v2OutEased * 450;
          const v2DepthZ = (1 - v2InEased) * -200 - v2OutEased * 100;
          const v2RotZ = (1 - v2InEased) * 18 - v2OutEased * 15;
          const v2RotY = (1 - v2InEased) * -25 + v2OutEased * 20;
          const v2RotX = (1 - v2InEased) * 16 - v2OutEased * 10;
          const v2Scale = 0.72 + v2InEased * 0.28 - v2OutEased * 0.12;
          const v2Opacity =
            v2InEased * (1 - v2OutEased) * whiteExitOpacity;
          const v2Blur = v2OutEased * 8;

          v2El.style.opacity = v2Opacity.toFixed(3);
          v2El.style.transform = `translate3d(${mX * 16}px, ${
            v2Y + mY * 18
          }px, ${v2DepthZ.toFixed(1)}px) rotateX(${v2RotX.toFixed(
            2
          )}deg) rotateY(${v2RotY.toFixed(2)}deg) rotateZ(${v2RotZ.toFixed(
            2
          )}deg) scale(${v2Scale.toFixed(3)})`;
          v2El.style.filter =
            v2Blur > 0.2 ? `blur(${v2Blur.toFixed(1)}px)` : "none";
          v2El.style.pointerEvents = v2Opacity > 0.5 ? "auto" : "none";
        }

        // Video 3
        const v3InP = clamp(p, 0.78, 0.84);
        const v3OutP = clamp(p, 0.84, 0.88);
        const v3El = stage5ContainerRef.current.querySelector(
          "[data-cinematic-video='3']"
        ) as HTMLElement;
        if (v3El) {
          const v3InEased = easeInOutSmooth(v3InP);
          const v3OutEased = easeInOutSmooth(v3OutP);

          const v3Y = (1 - v3InEased) * 850 - v3OutEased * 450;
          const v3DepthZ = (1 - v3InEased) * -200 - v3OutEased * 100;
          const v3RotZ = (1 - v3InEased) * -18 + v3OutEased * 15;
          const v3RotY = (1 - v3InEased) * 25 - v3OutEased * 20;
          const v3RotX = (1 - v3InEased) * 16 - v3OutEased * 10;
          const v3Scale = 0.72 + v3InEased * 0.28 - v3OutEased * 0.12;
          const v3Opacity =
            v3InEased * (1 - v3OutEased) * whiteExitOpacity;
          const v3Blur = v3OutEased * 8;

          v3El.style.opacity = v3Opacity.toFixed(3);
          v3El.style.transform = `translate3d(${mX * -18}px, ${
            v3Y + mY * 14
          }px, ${v3DepthZ.toFixed(1)}px) rotateX(${v3RotX.toFixed(
            2
          )}deg) rotateY(${v3RotY.toFixed(2)}deg) rotateZ(${v3RotZ.toFixed(
            2
          )}deg) scale(${v3Scale.toFixed(3)})`;
          v3El.style.filter =
            v3Blur > 0.2 ? `blur(${v3Blur.toFixed(1)}px)` : "none";
          v3El.style.pointerEvents = v3Opacity > 0.5 ? "auto" : "none";
        }

        const s5Active = p >= 0.58 && p <= 0.90;
        stage5ContainerRef.current.style.opacity = "1";
        stage5ContainerRef.current.style.visibility =
          s5Active ? "visible" : "hidden";
        stage5ContainerRef.current.style.pointerEvents =
          s5Active ? "auto" : "none";
      }

      // ------------------------------------------------------------------
      // H. STAGE 6: ISOFINITI 3D GLASS LOGO & SEQUENCED TYPOGRAPHY
      // 1. Logo Zoom-In: 0.86 -> 0.90 (Displays & settles completely in center)
      // 2. Text Reveal: 0.90 -> 0.92 (Reveals below logo after logo is complete)
      // ------------------------------------------------------------------
      if (stage6ContainerRef.current) {
        // Logo Zoom-In & Settle Physics (0.86 -> 0.90)
        const logoInP = clamp(p, 0.86, 0.9);
        const logoInEased = easeInOutSmooth(logoInP);

        const logoScale = 0.15 + logoInEased * 0.85;
        const logoOpacity = logoInEased * whiteExitOpacity;
        const logoBlur = (1 - logoInEased) * 14;
        const logoDepthZ = (1 - logoInEased) * -450;

        stage6ContainerRef.current.style.opacity = logoOpacity.toFixed(3);
        stage6ContainerRef.current.style.transform = `translate3d(0, ${whiteExitY}px, ${logoDepthZ.toFixed(
          1
        )}px) scale(${logoScale.toFixed(3)})`;
        stage6ContainerRef.current.style.filter =
          logoBlur > 0.2 ? `blur(${logoBlur.toFixed(1)}px)` : "none";

        const s6Active = p >= 0.84 && p <= 1.00;
        stage6ContainerRef.current.style.visibility =
          s6Active ? "visible" : "hidden";
        stage6ContainerRef.current.style.pointerEvents =
          s6Active && logoOpacity > 0.3 ? "auto" : "none";

        // Text Entrance (0.90 -> 0.92)
        const textEl = stage6ContainerRef.current.querySelector(
          "[data-stage6-text]"
        ) as HTMLElement;
        if (textEl) {
          const textInP = clamp(p, 0.9, 0.92);
          const textInEased = easeInOutSmooth(textInP);
          const textOpacity = textInEased * whiteExitOpacity;
          const textTranslateY = (1 - textInEased) * 25;
          const textBlur = (1 - textInEased) * 4;

          textEl.style.opacity = textOpacity.toFixed(3);
          textEl.style.transform = `translate3d(0, ${textTranslateY.toFixed(
            1
          )}px, 0)`;
          textEl.style.filter =
            textBlur > 0.2 ? `blur(${textBlur.toFixed(1)}px)` : "none";
        }
      }

      // ------------------------------------------------------------------
      // I. STAGE 7: DARK FRAMEWORK BEHIND OUR SUCCESS & DESCENDING 3D LOGO
      // Entrance: 0.92 -> 1.00 (Fluid video background, descending logo, framework)
      // Active steps: 
      //   10 (Framework Initial Landing - only Logo & Header): 1.00
      //   11 (01 Discovery, Right): 1.08
      //   12 (02 Strategy, Left): 1.16
      //   13 (03 Design & Dev, Right): 1.24
      //   14 (04 Launch & Support, Left): 1.32
      // Exit: 1.33 -> 1.39 (Smooth fade and slide up when entering Stage 8)
      // ------------------------------------------------------------------
      if (stage7ContainerRef.current) {
        const s7InP = clamp(p, 0.92, 1.0);
        const s7InEased = easeInOutSmooth(s7InP);

        const s7ExitP = clamp((p - 1.33) / (1.39 - 1.33), 0, 1);
        const s7ExitEased = easeInOutSmooth(s7ExitP);

        const s7Opacity = s7InEased * (1 - s7ExitEased);
        const s7TranslateY = s7ExitEased * -120;
        const s7Scale = 1 - s7ExitEased * 0.06;

        stage7ContainerRef.current.style.opacity = s7Opacity.toFixed(3);
        stage7ContainerRef.current.style.transform = `translate3d(0, ${s7TranslateY.toFixed(
          1
        )}px, 0) scale(${s7Scale.toFixed(3)})`;

        const s7Active = p >= 0.91 && p <= 1.39;
        stage7ContainerRef.current.style.visibility =
          s7Active ? "visible" : "hidden";
        stage7ContainerRef.current.style.pointerEvents =
          s7Active && s7Opacity > 0.3 ? "auto" : "none";

        // Map continuous progress to active Framework step:
        // In the initial landing phase (p < 1.04), activeFrameworkIndex = -1 (no step text visible!)
        // As the user scrolls into steps 11-14, 01 -> 02 -> 03 -> 04 appear sequentially
        if (p >= 1.28) {
          setActiveFrameworkIndex(3);
        } else if (p >= 1.20) {
          setActiveFrameworkIndex(2);
        } else if (p >= 1.12) {
          setActiveFrameworkIndex(1);
        } else if (p >= 1.04) {
          setActiveFrameworkIndex(0);
        } else {
          setActiveFrameworkIndex(-1);
        }

        // 1. Eruption Video: Re-arms whenever logo is at top ceiling (p <= 0.945)
        // and ignites EVERY TIME the logo drops down from above (p > 0.945 -> 1.05).
        const eruptVid = stage7ContainerRef.current.querySelector(
          "[data-stage7-eruption]"
        ) as HTMLVideoElement;
        if (eruptVid) {
          if (p <= 0.945) {
            // Logo is raised at the top — re-arm for next drop
            eruptionPlayedRef.current = false;
            eruptVid.style.opacity = "0";
            eruptVid.pause();
            eruptVid.currentTime = 0;
          } else if (p > 0.945 && p <= 1.05) {
            // Logo is dropping down from above — play eruption
            if (!eruptionPlayedRef.current) {
              eruptionPlayedRef.current = true;
              eruptVid.style.opacity = "0.9";
              eruptVid.currentTime = 0;
              eruptVid.play().catch(() => {});
            }
          }
        }

        // 2. Descending 3D Glass Motion Logo
        const logoElements = stage7ContainerRef.current.querySelectorAll(
          "[data-stage7-logo]"
        );

        if (logoElements && logoElements.length > 0) {
          const logoP = clamp((p - 0.935) / (1.0 - 0.935), 0, 1);
          const logoEased = easeInOutSmooth(logoP);
          const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
          const logoY = (1 - logoEased) * (isMobile ? -350 : -720) - (isMobile ? 0 : 45);
          const logoScale = 0.75 + logoEased * 0.25;
          const logoBlur = (1 - logoEased) * 14;
          const logoDepthZ = isMobile ? 0 : (1 - logoEased) * -400;

          logoElements.forEach((el) => {
            const logoEl = el as HTMLElement;
            logoEl.style.willChange = "transform, opacity";
            logoEl.style.opacity = clamp(
              (p - 0.93) / (0.965 - 0.93),
              0,
              1
            ).toFixed(3);
            logoEl.style.transform = `translate3d(0, ${logoY.toFixed(
              1
            )}px, ${logoDepthZ.toFixed(1)}px) scale(${logoScale.toFixed(3)})`;
            logoEl.style.filter = "none";
          });
        }

        // 3. Top Header Reveal ("The Framework Behind Our Success")
        const headerEl = stage7ContainerRef.current.querySelector(
          "[data-stage7-header]"
        ) as HTMLElement;
        if (headerEl) {
          const headInP = clamp(p, 0.94, 1.0);
          const headEased = easeInOutSmooth(headInP);
          const headY = (1 - headEased) * 25;
          headerEl.style.opacity = headEased.toFixed(3);
          headerEl.style.zIndex = "30";
          headerEl.style.transform = `translate3d(0, ${headY.toFixed(1)}px, 40px)`;
        }
      }

      // ------------------------------------------------------------------
      // J. STAGE 8: BUILT WITH A POINT OF VIEW (3D REVOLVING DECK & 4-STEP TIMELINE)
      // Entrance: 1.34 -> 1.40
      // Active steps:
      //   15 (01 Real World): 1.40
      //   16 (02 Design + Eng): 1.48
      //   17 (03 AI Purpose): 1.56
      //   18 (04 Built to Evolve): 1.64
      // Exit: 1.65 -> 1.71 (Smooth fade out when entering Stage 9 Clients)
      // ------------------------------------------------------------------
      if (stage8ContainerRef.current) {
        const s8InP = clamp((p - 1.335) / (1.395 - 1.335), 0, 1);
        const s8InEased = easeInOutSmooth(s8InP);

        const s8ExitP = clamp((p - 1.65) / (1.71 - 1.65), 0, 1);
        const s8ExitEased = easeInOutSmooth(s8ExitP);

        const s8Opacity = s8InEased * (1 - s8ExitEased);
        const s8TranslateY = (1 - s8InEased) * 50 - s8ExitEased * 80;
        const s8Scale = 1 - s8ExitEased * 0.05;

        stage8ContainerRef.current.style.opacity = s8Opacity.toFixed(3);
        stage8ContainerRef.current.style.transform = `translate3d(0, ${s8TranslateY.toFixed(
          1
        )}px, 0) scale(${s8Scale.toFixed(3)})`;

        const s8Active = p >= 1.33 && p <= 1.71;
        stage8ContainerRef.current.style.visibility =
          s8Active ? "visible" : "hidden";
        stage8ContainerRef.current.style.pointerEvents =
          s8Active && s8Opacity > 0.3 ? "auto" : "none";

        // Map continuous progress to active POV item index (0, 1, 2, 3)
        const targetPovIdx =
          p >= 1.60 ? 3 : p >= 1.52 ? 2 : p >= 1.44 ? 1 : 0;
        setActivePovIndex((prev) =>
          prev !== targetPovIdx ? targetPovIdx : prev
        );
      }

      // ------------------------------------------------------------------
      // K. STAGE 9: INSPIRED BY THE NEEDS OF OUR CLIENTS (20TH SECTION)
      // Entrance: 1.65 -> 1.72
      // Active step: 19 (20 Clients): 1.72
      // Exit: 1.73 -> 1.79 (Smooth fade and slide up when entering Stage 10)
      // ------------------------------------------------------------------
      if (stage9ContainerRef.current) {
        const s9InP = clamp((p - 1.65) / (1.715 - 1.65), 0, 1);
        const s9InEased = easeInOutSmooth(s9InP);

        const s9ExitP = clamp((p - 1.73) / (1.79 - 1.73), 0, 1);
        const s9ExitEased = easeInOutSmooth(s9ExitP);

        const s9Opacity = s9InEased * (1 - s9ExitEased);
        const s9TranslateY = (1 - s9InEased) * 45 - s9ExitEased * 60;
        const s9Scale = 1 - s9ExitEased * 0.05;

        stage9ContainerRef.current.style.opacity = s9Opacity.toFixed(3);
        stage9ContainerRef.current.style.transform = `translate3d(0, ${s9TranslateY.toFixed(
          1
        )}px, 0) scale(${s9Scale.toFixed(3)})`;

        const s9Active = p >= 1.65 && p <= 1.79;
        stage9ContainerRef.current.style.visibility =
          s9Active ? "visible" : "hidden";
        stage9ContainerRef.current.style.pointerEvents =
          s9Active && s9Opacity > 0.3 ? "auto" : "none";
      }

      // ------------------------------------------------------------------
      // L. STAGE 10: WOVEN BY LIGHT (21ST SECTION)
      // Entrance: 1.73 -> 1.80
      // Active step: 20 (21 Woven Light): 1.80
      // ------------------------------------------------------------------
      if (stage10ContainerRef.current) {
        const s10InP = clamp((p - 1.73) / (1.80 - 1.73), 0, 1);
        const s10InEased = easeInOutSmooth(s10InP);
        const s10TranslateY = (1 - s10InEased) * 60;
        const s10Scale = 0.94 + s10InEased * 0.06;

        stage10ContainerRef.current.style.opacity = s10InEased.toFixed(3);
        stage10ContainerRef.current.style.transform = `translate3d(0, ${s10TranslateY.toFixed(
          1
        )}px, 0) scale(${s10Scale.toFixed(3)})`;

        const s10Active = p >= 1.73;
        stage10ContainerRef.current.style.visibility =
          s10Active ? "visible" : "hidden";
        stage10ContainerRef.current.style.pointerEvents =
          s10Active && s10InEased > 0.3 ? "auto" : "none";
      }

      animationFrameIdRef.current = requestAnimationFrame(updateScene);
    };

    // Run initial frame setup synchronously before paint
    updateScene();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  // Multi-Input Gesture Controller: Wheel, Touch, Keyboard
  useEffect(() => {
    // 1. Ultra-responsive Wheel & Trackpad Listener
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      resetIdleTimer();

      if (isTransitioningRef.current || isAnimatingLockRef.current) return;
      if (e.deltaY === 0) return;

      if (e.deltaY > 0) {
        if (currentStepRef.current < SECTION_STEPS.length - 1) {
          goToStep(currentStepRef.current + 1);
        }
      } else {
        if (currentStepRef.current > 0) {
          goToStep(currentStepRef.current - 1);
        }
      }
    };

    // 2. Sensitive Touch Gestures (Mobile/Tablet Swipe)
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      resetIdleTimer();
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      resetIdleTimer();
      if (isTransitioningRef.current || isAnimatingLockRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;

      if (Math.abs(diffY) > 10) {
        if (diffY > 0 && currentStepRef.current < SECTION_STEPS.length - 1) {
          goToStep(currentStepRef.current + 1);
        } else if (diffY < 0 && currentStepRef.current > 0) {
          goToStep(currentStepRef.current - 1);
        }
      }
    };

    // 3. Keyboard Arrow & Page Navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      resetIdleTimer();
      if (["ArrowDown", "PageDown", "Space"].includes(e.code)) {
        e.preventDefault();
        if (
          !isAnimatingLockRef.current &&
          currentStepRef.current < SECTION_STEPS.length - 1
        ) {
          goToStep(currentStepRef.current + 1);
        }
      } else if (["ArrowUp", "PageUp"].includes(e.code)) {
        e.preventDefault();
        if (!isAnimatingLockRef.current && currentStepRef.current > 0) {
          goToStep(currentStepRef.current - 1);
        }
      } else if (e.code >= "Digit0" && e.code <= "Digit9") {
        const digitNum = parseInt(e.code.replace("Digit", ""));
        const targetIdx = digitNum === 0 ? 9 : digitNum - 1;
        if (targetIdx >= 0 && targetIdx < SECTION_STEPS.length) {
          goToStep(targetIdx);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    };
  }, [goToStep, resetIdleTimer]);

  // Window resize frame redraw
  useEffect(() => {
    const handleResize = () => {
      renderFrame(Math.round(currentFrameRef.current));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Global window pointer move listener for silky responsive parallax
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      targetMousePosRef.current = { x, y };
      setMousePos({ x, y });
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Mouse parallax tracking with silky RAF damping
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetMousePosRef.current = { x, y };
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    targetMousePosRef.current = { x: 0, y: 0 };
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: "#efefef" }}
      className="relative h-screen w-full overflow-hidden select-none"
    >
      {/* Sticky/Fixed Fullscreen Unified Spatial Stage */}
      <div className="relative h-full w-full overflow-hidden flex items-center justify-center [perspective:1400px]">
        {/* Background 3D Video Frame Canvas */}
        <HeroCanvas ref={canvasRef} />

        {/* Stage 1: Innovative Tech / Infinite Growth */}
        <Stage1HeroOverlay ref={stage1TextRef} />

        {/* Mobile Persistent 3D Floating Background Cards */}
        <MobileFloatingCardsBg ref={mobileBgRef} />

        {/* Stage 2: Your Business Has A Lot Going On + 3D Glass Cards */}
        <Stage2OverviewOverlay ref={stage2ContainerRef} mousePos={mousePos} />

        {/* Stage 3: Built Around What Your Business Needs + 2-Phase Flip Deck */}
        <Stage3ServicesOverlay
          ref={stage3ContainerRef}
          mousePos={mousePos}
          phase={currentPhase}
        />

        {/* Stage 4: From Complex Problems to Working Systems */}
        <Stage4SystemsOverlay ref={stage4ContainerRef} />

        {/* Stage 5: Cinematic Video Showcases */}
        <Stage5VideoShowcase ref={stage5ContainerRef} />

        {/* Stage 6: Isofinity 3D Glass Logo & Sequenced Typography */}
        <Stage6IsofinityOverlay ref={stage6ContainerRef} />

        {/* Stage 7: Dark Framework Behind Our Success & Descending 3D Logo */}
        <Stage7FrameworkOverlay
          ref={stage7ContainerRef}
          activeStepIndex={activeFrameworkIndex}
          isActive={activeStep >= 9 && activeStep <= 14}
          mousePos={mousePos}
        />

        {/* Stage 8: Built With A Point Of View & 3D Revolving Card Deck (Steps 16-19) */}
        <Stage8PointOfViewOverlay
          ref={stage8ContainerRef}
          activeItemIndex={activePovIndex}
        />

        {/* Stage 9: Inspired By The Needs Of Our Clients (Step 20) */}
        <Stage9ClientsOverlay
          ref={stage9ContainerRef}
          mousePos={mousePos}
        />

        {/* Stage 10: Woven by Light (Step 21) */}
        <Stage10WovenLightOverlay
          ref={stage10ContainerRef}
          onExploreClick={() => goToStep(0)}
        />


        {/* Bottom Scroll Discovery / Mouse Scroll More Indicator */}
        <ScrollHintIndicator
          showScrollHint={showScrollHint}
          activeStep={activeStep}
          totalSteps={SECTION_STEPS.length}
          onScrollNext={() =>
            goToStep(Math.min(activeStep + 1, SECTION_STEPS.length - 1))
          }
        />
      </div>
    </section>
  );
}

export default HeroScrollAnimation;