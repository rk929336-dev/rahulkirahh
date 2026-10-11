"use client";

import { SITE } from "@/data/site";
import CounterCard from "@/components/CounterCard";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Background Watermark of First Name RAHUL */}
      <div
        aria-hidden="true"
        className="hero-watermark absolute -top-10 md:top-10 right-0 md:right-10 text-[120px] sm:text-[180px] md:text-[240px] lg:text-[300px] font-black font-display tracking-tighter text-transparent select-none pointer-events-none opacity-20 md:opacity-25 leading-none z-0"
        style={{
          WebkitTextStroke: "2px rgba(30,144,255,0.35)",
          textShadow: "0 0 50px rgba(30,144,255,0.18)",
        }}
      >
        RAHUL
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Eyebrow badge: 01 / FOUNDER - GROWTH ARCHITECT - SYSTEM THINKER */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/25 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
          <span className="text-xs font-bold font-display uppercase tracking-[2.5px] text-blue-300">
            01 / FOUNDER — GROWTH ARCHITECT — SYSTEM THINKER
          </span>
        </div>

        {/* Status beacon: "Open to new projects" */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="pulsing-blue-dot shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            {SITE.hero.beacon}
          </span>
        </div>

        {/* Large Bold Uppercase Typography in 'Space Grotesk' */}
        <div className="w-full max-w-5xl mb-8 overflow-visible">
          <h1
            className="font-display font-extrabold tracking-tight uppercase leading-[1.05] overflow-visible"
            style={{ fontSize: "clamp(2.6rem, 7vw, 6.5rem)" }}
          >
            <span className="block text-white">I BUILD SCALABLE</span>
            <span className="inline-block mt-2 pr-6 pb-2 bg-gradient-to-r from-white via-[#5bb8ff] to-[#1e90ff] bg-clip-text text-transparent overflow-visible">
              GROWTH SYSTEMS
              <span className="text-blue-500 drop-shadow-[0_0_15px_#1e90ff]">.</span>
            </span>
          </h1>
        </div>

        {/* One-line value statement from short bio */}
        <div className="max-w-2xl mb-12">
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
            Founder of DiziDice Media. I help businesses move from scattered marketing efforts to structured, predictable revenue engines using strategy, automation, and performance-driven thinking.
          </p>
        </div>

        {/* Magnetic CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-20">
          <a
            href="#contact"
            data-magnetic="true"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/40 shadow-[0_0_30px_rgba(30,144,255,0.45)] transition-all hover:scale-105 active:scale-95"
          >
            <span>WORK WITH ME</span>
            <ArrowRight size={16} />
          </a>

          <a
            href="#work"
            data-magnetic="true"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 hover:text-white bg-obsidian-900/80 hover:bg-white/10 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          >
            <span>EXPLORE WORK</span>
          </a>
        </div>

        {/* Metric Telemetry Counters */}
        <div className="pt-10 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            <Sparkles size={14} className="text-blue-400" />
            <span>Selected Results</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SITE.hero.counters.map((counter, idx) => (
              <CounterCard key={counter.label} counter={counter} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 pointer-events-none animate-bounce">
        <span className="text-[10px] uppercase font-bold tracking-widest">Scroll Down</span>
        <ChevronDown size={14} />
      </div>
    </section>
  );
}
