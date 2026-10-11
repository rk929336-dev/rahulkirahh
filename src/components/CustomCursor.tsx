"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const ringPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const isExpandedRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    // Disable on touch devices and reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches || window.innerWidth < 768;

    if (prefersReducedMotion || isTouch) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      // Check magnetic hover
      const target = e.target as HTMLElement | null;
      const isMagnetic = Boolean(
        target?.closest("[data-magnetic]") ||
        target?.closest("a") ||
        target?.closest("button")
      );

      if (isMagnetic !== isExpandedRef.current) {
        isExpandedRef.current = isMagnetic;
        if (ringRef.current) {
          if (isMagnetic) {
            ringRef.current.classList.add("is-expanded");
          } else {
            ringRef.current.classList.remove("is-expanded");
          }
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Smooth LERP animation for ring
    const loop = () => {
      // Ring follows mouse with LERP
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
