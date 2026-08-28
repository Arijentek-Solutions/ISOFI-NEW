# Section-Wise Scroll-Locking & Spatial Animation Rules

When modifying or extending the hero section or page scrolling behavior in this repository, ALWAYS follow these established architecture rules:

1. **Discrete Section Locking (No Continuous Free-Scrub)**:
   - All spatial navigation must remain section-locked. Never revert to uncontrolled window free-scrolling.
   - The 5 defined milestones are:
     1. `01 Hero` ($p = 0.00$)
     2. `02 Vision` ($p = 0.26$)
     3. `03 Overview` ($p = 0.62$)
     4. `04 Core Services` ($p = 0.85$)
     5. `05 Scale Services` ($p = 1.00$)

2. **Ultra-Sensitive Instant Triggering**:
   - The wheel handler must use `{ capture: true, passive: false }` with zero threshold (`e.deltaY !== 0`) so a single notch or flick immediately initiates the transition.

3. **Strict Transition Lock**:
   - Input is strictly locked during transit (`isTransitioningRef.current === true`). Continuous scrolling must advance only to the immediate next section and fully land before subsequent scrolls are registered.

4. **Cinematic Cosine Easing & Timing**:
   - Use `easeInOutSmooth` (`(1 - Math.cos(Math.PI * t)) / 2`) with a duration around `2600ms` for gentle start and soft deceleration.

5. **Lenis & Parallax Harmony**:
   - Global Lenis smooth scrolling lives in `src/components/common/SmoothScroll.tsx`.
   - Mouse parallax uses RAF interpolation damping (`0.06` factor) for fluid 3D spatial depth.

Reference documentation: `SCROLL_ANIMATION_ARCHITECTURE.md`.
