"use client";

import { useEffect, useRef, useState } from "react";

export default function CinematicVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const targetRef = useRef<number>(0);
  const currentRef = useRef<number>(0);
  const readyRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isTouchOrSmall, setIsTouchOrSmall] = useState<boolean>(false);




  // 1. Reduced Motion & Touch Detection
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(reducedMotionQuery.matches);
    const onReducedMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);

    const touchQuery = window.matchMedia("(hover: none)");
    const checkTouchOrSmall = () => {
      setIsTouchOrSmall(touchQuery.matches || window.innerWidth < 768);
    };
    checkTouchOrSmall();
    window.addEventListener("resize", checkTouchOrSmall, { passive: true });

    return () => {
      reducedMotionQuery.removeEventListener("change", onReducedMotionChange);
      window.removeEventListener("resize", checkTouchOrSmall);
    };
  }, []);

  // 2. Video Initialization & Event Handlers
  const handleVideoMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    readyRef.current = true;
    // Ensure video is actively playing smoothly in ambient background
    if (!isReducedMotion) {
      video.play().catch(() => {});
    }
  };

  // Perform seek throttled to ~30fps so hardware decoder is never thrash-spammed
  const lastSeekTimeRef = useRef<number>(0);

  const performSeek = (targetTime: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const now = performance.now();
    if (now - lastSeekTimeRef.current < 33) return;

    const clampedTime = Math.max(0, Math.min(targetTime, video.duration - 0.05));
    if (Math.abs(video.currentTime - clampedTime) < 0.03) return;

    lastSeekTimeRef.current = now;
    try {
      if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
        (video as any).fastSeek(clampedTime);
      } else {
        video.currentTime = clampedTime;
      }
    } catch {}
  };

  // 3. Scroll & Mouse Tracking Engine
  useEffect(() => {
    if (isReducedMotion) return;

    let cursorX = 0.5;
    let cursorY = 0.5;
    let isScrolling = false;
    let scrollDebounceTimer: NodeJS.Timeout | null = null;

    const updateTargetTime = () => {
      const video = videoRef.current;
      if (!video) return;

      const duration = video.duration || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;

      // Update ambient electric-blue scroll progress bar
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${scrollProgress})`;
      }

      if (duration > 0) {
        if (isTouchOrSmall) {
          targetRef.current = scrollProgress * duration;
        } else {
          // Desktop: scroll provides full journey; cursor X provides ±8% 3D turntable bias
          const cursorParallaxBias = (cursorX - 0.5) * 0.16;
          const combinedProgress = Math.min(Math.max(scrollProgress + cursorParallaxBias, 0), 1);
          targetRef.current = combinedProgress * duration;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchOrSmall) return;

      const normX = Math.min(Math.max(e.clientX / window.innerWidth, 0), 1);
      const normY = Math.min(Math.max(e.clientY / window.innerHeight, 0), 1);
      cursorX = normX;
      cursorY = normY;

      const dx = normX - 0.5;
      const dy = normY - 0.5;

      // Parallax 3D tilt
      if (containerRef.current) {
        containerRef.current.style.transform = `scale(1.06) translate3d(${dx * -15}px, ${dy * -15}px, 0) rotateX(${dy * -2}deg) rotateY(${dx * 2}deg)`;
      }

      // Spotlight glow
      if (glowRef.current) {
        glowRef.current.style.setProperty("--glow-x", `${(normX * 100).toFixed(1)}%`);
        glowRef.current.style.setProperty("--glow-y", `${(normY * 100).toFixed(1)}%`);
      }

      updateTargetTime();
    };

    const handleScroll = () => {
      isScrolling = true;
      const video = videoRef.current;
      if (video && !video.paused) {
        video.pause();
      }
      updateTargetTime();

      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
      scrollDebounceTimer = setTimeout(() => {
        isScrolling = false;
        // Resume ambient continuous playback once user stops scrolling
        const v = videoRef.current;
        if (v && v.paused && !isReducedMotion) {
          v.play().catch(() => {});
        }
      }, 350);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 4. LERP Loop in RAF
    const loop = () => {
      const video = videoRef.current;
      if (video) {
        if (readyRef.current && video.duration) {
          if (isScrolling) {
            // While actively scrolling, smoothly LERP towards the target timestamp
            currentRef.current += (targetRef.current - currentRef.current) * 0.12;
            performSeek(currentRef.current);
          } else {
            // When ambiently playing, keep reference time in sync
            currentRef.current = video.currentTime;
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isReducedMotion, isTouchOrSmall]);

  return (
    <>
      {/* Ambient electric-blue scroll progress bar (height 2px) */}
      <div ref={progressBarRef} className="scroll-progress-bar" />


      {/* Fixed background viewport positioned behind content (z-0) */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Parallax & Tilt container */}
        <div
          ref={containerRef}
          className="relative w-full h-full will-change-transform transition-transform duration-75 ease-out"
          style={{ transform: "scale(1.06)" }}
        >
          {/* Direct Video Element with Poster Fallback */}
          <video
            ref={videoRef}
            src="/video/portfolio-background.mp4"
            poster="/video/poster.jpg"
            playsInline
            muted
            autoPlay
            loop
            preload="auto"
            onLoadedMetadata={handleVideoMetadata}
            onCanPlay={handleVideoMetadata}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-100"
          />

          {/* Overlays (Hidden if reduced motion) */}
          {!isReducedMotion && (
            <>
              {/* Lightened Vignette - clearly shows portrait in centre */}
              <div className="cine-vignette" />

              {/* Cursor-Tracking Spotlight Glow */}
              {!isTouchOrSmall && <div id="cine-glow" ref={glowRef} />}

              {/* Scanlines */}
              <div className="cine-scan" />

              {/* Subtle SVG Noise Grain */}
              <div className="cine-grain" />
            </>
          )}

          {/* Transparent Gradient Scrim - provides readable contrast while portrait stays bright */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-obsidian-950/30 z-[5]" />
        </div>
      </div>
    </>
  );
}
