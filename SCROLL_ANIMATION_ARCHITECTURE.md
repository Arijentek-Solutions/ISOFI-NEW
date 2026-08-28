# ISOFINITI Spatial Scroll-Locking Animation Architecture

## Overview
The ISOFINITI spatial experience replaces traditional continuous page scrolling with a **discrete, section-wise scroll-locking engine**. Every intentional scroll, swipe, or key press initiates a smooth, cinematic visual travel to the exact next/previous visual milestone, preventing intermediate stops or accidental section skipping.

---

## 1. Core Principles & Philosophy
1. **Discrete Milestones over Continuous Scrubbing**:
   - The user never rests between states (no half-turned 3D models or half-faded text).
   - One scroll gesture = exact transition to the next step.
2. **Instant Micro-Scroll Triggering**:
   - Captured in the window event capture phase with zero minimum threshold (`e.deltaY !== 0`).
   - The slightest touch or single wheel notch starts the transition instantly.
3. **Strict Transition Lock**:
   - While a transition is underway, additional continuous scrolling is absorbed and ignored.
   - The system locks into landing at the target section first, and only unlocks after full arrival and a 200ms momentum buffer.
4. **Cinematic Cosine Easing (`easeInOutSmooth`)**:
   - Easing curve: `(1 - Math.cos(Math.PI * t)) / 2` over a tuned duration (`2600ms`).
   - Starts gently, glides continuously, and lands with soft deceleration.
5. **Global Lenis Integration**:
   - Smooth inertia handling across the site layout with parallax tracking.

---

## 2. The 11 Discrete Visual Stages

| Step | Identifier | Target Progress ($p$) | Visual State | Overlays & Elements |
| :---: | :---: | :---: | :--- | :--- |
| **01** | **Hero** | `0.00` | Canvas Frame 2 (Front-facing cyberpunk character with phone glow) | Clean stage, Navigation header, Scroll To Explore prompt. |
| **02** | **Vision** | `0.14` | Character rotates 180°, reveals glowing tech backpack | **Stage 1**: *"INNOVATIVE TECH"* / *"INFINITE GROWTH"* reveals and settles. |
| **03** | **Overview** | `0.26` | Canvas fades out; 3 glass cards glide in from 3D space | **Stage 2**: *"YOUR BUSINESS HAS A LOT GOING ON. WE MAKE SENSE OF IT ALL."* letter-by-letter zoom-out reveal. |
| **04** | **Core Services** | `0.38` | 3 background cards drift to peripheries with soft bokeh | **Stage 3 Front**: Phase 1 Core Service Cards (Design & 3D, Full-Stack Platforms, AI Automation) glide in from right. |
| **05** | **Scale Services** | `0.50` | Brisk 180° mid-flight 3D card rotation | **Stage 3 Back**: Phase 2 Scale Cards (Mobile Apps, Cloud DevOps, Growth Marketing) flip forward. |
| **06** | **Systems** | `0.60` | Service cards glide away downwards | **Stage 4**: *"FROM COMPLEX PROBLEMS TO WORKING SYSTEMS."* reveals, then completely fades before Video 1 arrives. |
| **07** | **Video 01** | `0.68` | Headline completely fades out and glides away upwards | **Video 1 (3D Rotating Rise)**: First video (`/videos/video1.mp4`) travels up from the bottom with 3D rotation into an enlarged rectangular borderless showcase. |
| **08** | **Video 02** | `0.76` | Video 1 rotates and glides away upwards | **Video 2 (3D Rotating Rise)**: Second video (`/videos/video2.mp4`) travels up from the bottom with counter-rotation into the enlarged rectangular showcase. |
| **09** | **Video 03** | `0.84` | Video 2 rotates and glides away upwards | **Video 3 (3D Rotating Rise)**: Third video (`/videos/video3.mp4`) travels up from the bottom with 3D rotation, settling in full expansive scale in the center. |
| **10** | **Isofinity** | `0.92` | Cards 1, 2, 3 converge to center and suddenly collapse | **3D Glass Logo & Typography Reveal**: The 3D glass `/images/isofiniti.png` emblem zooms in, followed by *"Design Is What You See."* and *"Technology Is What Makes It Move."* |
| **11** | **Framework** | `1.00` | White stage slides completely UP & disappears; Background turns deep black | **Dark Framework & Ambient Fluid Video**: Plays `/videos/watermarked_preview.mp4` with top crimson glow; `/images/isofintiblur.png` descends from above into the center; reveals *"The Framework Behind Our Success"* and *"01 — Discovery"*. |

---

## 3. Key Parameters & Configuration

```typescript
// Located in: src/components/hero/HeroScrollAnimation.tsx

// Transition timing
const SCROLL_TRANSITION_DURATION = 2600; // ms for cinematic travel

// Frame range
const START_FRAME = 2;
const TOTAL_FRAMES = 115;

// Section steps mapping
export const SECTION_STEPS = [
  { id: 0, num: "01", label: "Hero", progress: 0.0 },
  { id: 1, num: "02", label: "Vision", progress: 0.26 },
  { id: 2, num: "03", label: "Overview", progress: 0.62 },
  { id: 3, num: "04", label: "Core Services", progress: 0.85 },
  { id: 4, num: "05", label: "Scale Services", progress: 1.0 },
];

// Natural Cosine Ease-In-Out
const easeInOutSmooth = (t: number): number => {
  return (1 - Math.cos(Math.PI * t)) / 2;
};
```

---

## 4. Multi-Input Controls
* **Mouse Wheel / Trackpad**: Non-passive window capture listener with `e.preventDefault()` and `e.stopPropagation()`.
* **Touch Gestures (Mobile/Tablet)**: Touch swipe listener with vertical distance threshold (`|diffY| > 10`).
* **Keyboard Navigation**: `ArrowDown` / `ArrowUp`, `PageDown` / `PageUp`, `Spacebar`, and numeric keys `1` through `5`.
* **Cyberpunk HUD Pagination**: Fixed right-edge vertical navigation HUD with active glowing indicators, step numbers (`01`–`05`), and expandable section labels with direct click-to-jump support.
* **RAF Optical Mouse Parallax**: Smooth continuous damping (`0.06` lerp factor) providing authentic 3D spatial depth across foreground, midground, and background layers.

---

## 5. File References
* Main Component: [`src/components/hero/HeroScrollAnimation.tsx`](file:///Users/shahil/Desktop/ISOFINITI/src/components/hero/HeroScrollAnimation.tsx)
* Global Smooth Scroll: [`src/components/common/SmoothScroll.tsx`](file:///Users/shahil/Desktop/ISOFINITI/src/components/common/SmoothScroll.tsx)
* Global Styles & Lenis Reset: [`src/app/globals.css`](file:///Users/shahil/Desktop/ISOFINITI/src/app/globals.css)
* Glass Card Component: [`src/components/common/GlassServiceCard.tsx`](file:///Users/shahil/Desktop/ISOFINITI/src/components/common/GlassServiceCard.tsx)
