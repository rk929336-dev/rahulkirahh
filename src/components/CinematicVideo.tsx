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

  // Temporary On-Screen Debug Telemetry State
  const [debugTelemetry, setDebugTelemetry] = useState<{
    readyState: number;
    duration: number;
    currentTime: number;
    targetTime: number;
  }>({
    readyState: 0,
    duration: 0,
    currentTime: 0,
    targetTime: 0,
  });


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
    setDebugTelemetry((prev) => ({
      ...prev,
      readyState: video.readyState,
      duration: video.duration || 0,
    }));
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
    let lastDebugUpdate = 0;

    const loop = (now: number) => {
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

        // Throttle debug HUD updates to ~10fps
        if (now - lastDebugUpdate > 100) {
          lastDebugUpdate = now;
          setDebugTelemetry({
            readyState: video.readyState,
            duration: video.duration || 0,
            currentTime: video.currentTime || 0,
            targetTime: targetRef.current,
          });
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

      {/* Temporary On-Screen Debug Telemetry Label */}
      <div className="fixed bottom-5 left-5 z-50 bg-obsidian-950/90 border border-blue-500/40 text-slate-200 font-mono text-[11px] p-3 rounded-xl backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.85)] pointer-events-auto select-none space-y-1">
        <div className="flex items-center gap-2 border-b border-white/10 pb-1 mb-1 font-bold text-white tracking-wider">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>VIDEO TELEMETRY HUD</span>
        </div>
        <div>
          readyState:{" "}
          <span className="font-bold text-emerald-400">{debugTelemetry.readyState}</span>
        </div>
        <div>
          duration:{" "}
          <span className="font-bold text-white">{debugTelemetry.duration.toFixed(2)}s</span>
        </div>
        <div>
          currentTime:{" "}
          <span className="font-bold text-yellow-400">{debugTelemetry.currentTime.toFixed(3)}s</span>
        </div>
        <div>
          targetTime:{" "}
          <span className="font-bold text-blue-400">{debugTelemetry.targetTime.toFixed(3)}s</span>
        </div>
      </div>

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
