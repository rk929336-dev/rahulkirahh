"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ExternalLink, X, RotateCw, Pause, Play, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { SITE } from "@/data/site";

const WEBSITE_FILTERS = [
  "All",
  "E-commerce",
  "B2B",
  "Local & Services",
  "Non-profit",
  "Media",
] as const;

interface WebsiteItem {
  readonly title: string;
  readonly slug: string;
  readonly industry?: string;
  readonly subtitle?: string;
  readonly tags: readonly string[];
}

export default function CaseStudies() {
  const campaigns = SITE.campaignCaseStudies;
  const websites: readonly WebsiteItem[] = SITE.websiteCaseStudies;
  const N = campaigns.length;
  const step = 360 / N;

  // Responsive radius R: 480px (desktop), 380px (tablet), 275px (mobile)
  const [radius, setRadius] = useState<number>(480);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [autoSpin, setAutoSpin] = useState<boolean>(true);
  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const [activeModalCampaign, setActiveModalCampaign] = useState<(typeof campaigns)[number] | null>(null);
  const [activeWebsiteFilter, setActiveWebsiteFilter] = useState<string>("All");

  const angleRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const pointerHistoryRef = useRef<Array<{ x: number; time: number }>>([]);
  const hasMovedSignificantlyRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const ringContainerRef = useRef<HTMLDivElement>(null);

  // Resize & Reduced Motion
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(reducedMotionQuery.matches);
    if (reducedMotionQuery.matches) {
      setAutoSpin(false);
    }

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setRadius(275);
      } else if (width < 1024) {
        setRadius(380);
      } else {
        setRadius(480);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute the current front card index
  const activeIndex = useMemo(() => {
    // Normalise angle to [0, 360)
    let bestIdx = 0;
    let minDelta = Infinity;

    for (let i = 0; i < N; i++) {
      const cardTheta = i * step;
      // Angle diff from front (0 deg)
      let diff = ((cardTheta + currentAngle) % 360 + 540) % 360 - 180;
      if (Math.abs(diff) < minDelta) {
        minDelta = Math.abs(diff);
        bestIdx = i;
      }
    }
    return bestIdx;
  }, [currentAngle, N, step]);

  // Rotate to specific card by shortest rotational delta
  const rotateToCard = useCallback(
    (index: number) => {
      const cardTheta = index * step;
      let diff = ((cardTheta + angleRef.current) % 360 + 540) % 360 - 180;
      velocityRef.current = 0;
      angleRef.current -= diff;
      setCurrentAngle(angleRef.current);
    },
    [step]
  );

  // Animation Loop (RAF) for Inertia and Auto-spin
  useEffect(() => {
    const loop = () => {
      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.005) {
          // Friction damping 0.945 per RAF frame
          angleRef.current += velocityRef.current;
          velocityRef.current *= 0.945;
          setCurrentAngle(angleRef.current);
        } else {
          velocityRef.current = 0;
          // Gentle auto-spin (0.06 deg/frame) when idle
          if (autoSpin && !isReducedMotion) {
            angleRef.current -= 0.06;
            setCurrentAngle(angleRef.current);
          }
        }
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [autoSpin, isReducedMotion]);

  // Unified Pointer Events
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    hasMovedSignificantlyRef.current = false;
    lastPointerXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    pointerHistoryRef.current = [{ x: e.clientX, time: lastTimeRef.current }];
    velocityRef.current = 0;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const now = performance.now();
    const dx = e.clientX - lastPointerXRef.current;

    if (Math.abs(dx) > 3) {
      hasMovedSignificantlyRef.current = true;
    }

    lastPointerXRef.current = e.clientX;
    lastTimeRef.current = now;

    // Track multi-sample history
    pointerHistoryRef.current.push({ x: e.clientX, time: now });
    if (pointerHistoryRef.current.length > 5) {
      pointerHistoryRef.current.shift();
    }

    // Sensitivity: 0.35 deg per pixel
    const degDelta = dx * 0.35;
    angleRef.current += degDelta;
    setCurrentAngle(angleRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    // Multi-sample velocity calculation
    const history = pointerHistoryRef.current;
    if (history.length >= 2) {
      const first = history[0];
      const last = history[history.length - 1];
      const dt = last.time - first.time;
      const totalDx = last.x - first.x;
      if (dt > 10 && dt < 250) {
        // Deg per frame velocity
        velocityRef.current = (totalDx / dt) * 4.2;
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      velocityRef.current = 0;
      angleRef.current += step;
      setCurrentAngle(angleRef.current);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      velocityRef.current = 0;
      angleRef.current -= step;
      setCurrentAngle(angleRef.current);
    } else if (e.key === "Enter") {
      e.preventDefault();
      setActiveModalCampaign(campaigns[activeIndex]);
    }
  };

  // Filtered Websites
  const filteredWebsites = useMemo(() => {
    return websites.filter((site) => {
      const tags = site.tags as readonly string[];
      if (activeWebsiteFilter === "All") return true;
      if (activeWebsiteFilter === "E-commerce") {
        return tags.includes("Ecommerce") || tags.includes("Food & Retail");
      }
      if (activeWebsiteFilter === "B2B") {
        return (
          tags.includes("B2B & Industrial") ||
          tags.includes("Construction") ||
          tags.includes("Finance & VC")
        );
      }
      if (activeWebsiteFilter === "Local & Services") {
        return tags.includes("Local Services");
      }
      if (activeWebsiteFilter === "Non-profit") {
        return tags.includes("NGO & Healthcare") || tags.includes("Non-Profit");
      }
      if (activeWebsiteFilter === "Media") {
        return tags.includes("Media & Reviews") || tags.includes("Automotive");
      }
      return true;
    });
  }, [websites, activeWebsiteFilter]);

  return (
    <section id="work" className="relative py-28 px-4 overflow-hidden scroll-mt-20" tabIndex={0} onKeyDown={handleKeyDown}>
      <div id="case-studies" className="sr-only" />
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-4">
            Campaign Case Studies
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-white mb-4">
            3D Campaign Architecture
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Zero ad-spend virality, fintech user acquisition, and mass WhatsApp distribution engines.
          </p>
        </div>

        {/* Ring Controls & State Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 max-w-3xl mx-auto mb-10 px-6 py-3 rounded-2xl bg-obsidian-900/80 border border-white/5 backdrop-blur-md">
          {/* Auto-Spin Toggle */}
          <button
            onClick={() => setAutoSpin(!autoSpin)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
              autoSpin
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-white/5 text-slate-400 border border-white/10"
            }`}
          >
            {autoSpin ? <Pause size={12} /> : <Play size={12} />}
            <span>{autoSpin ? "Auto-Spin ON" : "Auto-Spin PAUSED"}</span>
          </button>

          {/* Stepper info */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-blue-400 font-bold font-display text-base">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span>/</span>
            <span>{String(N).padStart(2, "0")}</span>
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                velocityRef.current = 0;
                angleRef.current += step;
                setCurrentAngle(angleRef.current);
              }}
              aria-label="Previous Campaign"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-blue-500/50 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => {
                velocityRef.current = 0;
                angleRef.current -= step;
                setCurrentAngle(angleRef.current);
              }}
              aria-label="Next Campaign"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-blue-500/50 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* 3D DRAGGABLE CYLINDER STAGE */}
        <div
          ref={ringContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full h-[480px] md:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none [touch-action:pan-y] [perspective:1200px]"
          style={{ perspectiveOrigin: "50% 50%" }}
        >
          {/* Cylinder Wrapper: Camera Pull-Back translateZ(-R) rotateY(angle deg) */}
          <div
            className="relative w-[300px] sm:w-[320px] md:w-[340px] h-[360px] md:h-[390px] preserve-3d transition-transform will-change-transform"
            style={{
              transform: `translateZ(-${radius}px) rotateY(${currentAngle}deg)`,
            }}
          >
            {campaigns.map((item, i) => {
              const theta_i = i * step;

              // Compute facing angle phi for backface culling
              const phi = ((theta_i + currentAngle) % 360 + 540) % 360 - 180;
              const cosPhi = Math.cos((phi * Math.PI) / 180);
              const isFront = i === activeIndex;

              // Hide card if facing away (backface culling prevents mirrored text)
              const isFacingAway = cosPhi < -0.05;

              return (
                <div
                  key={item.slug}
                  onClick={() => {
                    if (hasMovedSignificantlyRef.current) return;
                    if (isFront) {
                      setActiveModalCampaign(item);
                    } else {
                      rotateToCard(i);
                    }
                  }}
                  className={`absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 preserve-3d backface-hidden cursor-pointer transition-[opacity,filter] duration-300 ${
                    isFacingAway ? "opacity-0 pointer-events-none" : isFront ? "opacity-100 z-20" : "opacity-60 z-10"
                  }`}
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${theta_i}deg) translateZ(${radius}px)`,
                    filter: isFront ? "none" : "brightness(0.7) blur(0.5px)",
                  }}
                >
                  {/* Card Design: Dark Obsidian Glass + Electric-Blue Laser Top Beam */}
                  <div
                    className={`relative w-full h-full p-7 rounded-2xl obsidian-glass flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                      isFront
                        ? "border-blue-500/50 shadow-[0_0_50px_rgba(30,144,255,0.3),0_20px_50px_rgba(0,0,0,0.8)]"
                        : "border-white/10 hover:border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                    }`}
                  >
                    {/* Laser Top Beam */}
                    <div className="laser-beam" />

                    {/* Top Row: Category + Index */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 font-display">
                        #{String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Client Name / Campaign Title */}
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight leading-snug mb-1">
                        {item.title}
                      </h3>
                    </div>

                    {/* Headline Metric Box */}
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 my-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Headline Metric
                      </div>
                      <div className="text-lg md:text-xl font-extrabold font-display text-white bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                        {item.metric}
                      </div>
                    </div>

                    {/* CTA link to dizidice */}
                    <div className="pt-2 flex items-center justify-between border-t border-white/5">
                      <a
                        href={`${SITE.caseStudyBase}${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white transition-colors"
                      >
                        <span>Read case study</span>
                        <ExternalLink size={13} />
                      </a>

                      {isFront && (
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                          Click to expand
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6 mb-24">
          {campaigns.map((_, i) => (
            <button
              key={i}
              onClick={() => rotateToCard(i)}
              aria-label={`Jump to case study ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-blue-500 shadow-[0_0_12px_#3b82f6]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* ========================================================================= */}
        {/* WEBSITE WORK GRID (Title + Industry Tag + Link, strictly NO METRICS) */}
        {/* ========================================================================= */}
        <div className="pt-16 border-t border-white/10">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-3">
              Web Infrastructure
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold font-display text-white mb-3">
              Website Work
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
              Engineered websites and commercial platforms designed for predictable conversion and organic search authority.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {WEBSITE_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveWebsiteFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeWebsiteFilter === cat
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-blue-500"
                    : "bg-obsidian-900/90 text-slate-400 hover:text-white border border-white/5 hover:border-white/15"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Website Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWebsites.map((site) => {
              const url = `${SITE.caseStudyBase}${site.slug}`;
              return (
                <div
                  key={site.slug}
                  className="group relative p-6 rounded-2xl obsidian-glass border border-white/5 hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
                >
                  <div className="laser-beam opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Top Tag & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Globe size={16} />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                        {site.industry || site.tags[0]}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-bold font-display text-white group-hover:text-blue-300 transition-colors mb-2">
                      {site.title}
                    </h4>

                    {site.subtitle && (
                      <p className="text-xs text-slate-400 mb-4">{site.subtitle}</p>
                    )}
                  </div>

                  {/* Footer Link - STRICTLY NO METRICS SHOWN */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white transition-colors"
                    >
                      <span>Read case study</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FRONT CARD DETAIL MODAL (Strictly NO invented details) */}
      {/* ========================================================================= */}
      {activeModalCampaign && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalCampaign(null)}
        >
          <div
            className="relative w-full max-w-lg p-8 rounded-2xl obsidian-glass border border-blue-500/40 shadow-[0_0_60px_rgba(30,144,255,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="laser-beam" />

            {/* Close Button */}
            <button
              onClick={() => setActiveModalCampaign(null)}
              aria-label="Close case study modal"
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>

            {/* Category */}
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 rounded-full mb-4">
              {activeModalCampaign.category}
            </span>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-extrabold font-display text-white mb-4">
              {activeModalCampaign.title}
            </h3>

            {/* Headline Metric */}
            <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-8">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Headline Metric
              </span>
              <span className="text-xl md:text-2xl font-extrabold font-display text-white">
                {activeModalCampaign.metric}
              </span>
            </div>

            {/* Action CTA */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalCampaign(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
              <a
                href={`${SITE.caseStudyBase}${activeModalCampaign.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
              >
                <span>Read Full Case Study</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
