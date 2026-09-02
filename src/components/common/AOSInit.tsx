"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AOSInit() {
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        duration: 800,
        once: true,
        easing: "ease-out-cubic",
        offset: 50,
      });
      AOS.refreshHard();
    };

    // Check if pageLoader is already done (e.g. client-side route navigation)
    if (typeof window !== "undefined" && (window as unknown as { pageLoaderDone?: boolean }).pageLoaderDone) {
      initAOS();
    } else {
      const handleLoaderDone = () => {
        setTimeout(() => {
          initAOS();
        }, 120);
      };

      window.addEventListener("pageLoaderDone", handleLoaderDone);

      // Fallback in case loader is bypassed
      const fallbackTimer = setTimeout(() => {
        initAOS();
      }, 3500);

      return () => {
        window.removeEventListener("pageLoaderDone", handleLoaderDone);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  return null;
}

export default AOSInit;
