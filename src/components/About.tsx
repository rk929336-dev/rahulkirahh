"use client";

import { Cpu, Layers, CheckCircle2 } from "lucide-react";
import { SITE } from "@/data/site";

const SKILL_GROUPS = [
  {
    category: "Growth & Distribution",
    skills: ["WhatsApp organic growth", "Referral systems", "Affiliate systems"],
  },
  {
    category: "Performance",
    skills: ["Google Ads", "Meta Ads", "Funnels", "Conversion architecture"],
  },
  {
    category: "Search",
    skills: ["SEO", "Local SEO", "SEM & Organic authority"],
  },
  {
    category: "Build",
    skills: ["WordPress", "Web development", "Landing page architecture"],
  },
  {
    category: "Automation & AI",
    skills: ["Workflow automation", "AI workflows", "Campaign link tracking"],
  },
  {
    category: "Fintech & Brokerage",
    skills: ["Lead acquisition funnels", "Investor onboarding", "Brokerage growth systems"],
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-3">
            System Architecture
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Growth Is a System
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base mt-3">
            Engineering revenue engines at the intersection of marketing psychology, automation, and performance thinking.
          </p>
        </div>

        {/* Terminal / Inspection-Panel Layout */}
        <div className="p-1 rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-transparent shadow-[0_25px_60px_rgba(0,0,0,0.8)] mb-16">
          <div className="rounded-[22px] bg-obsidian-950/90 backdrop-blur-2xl border border-white/5 overflow-hidden">
            {/* Terminal Window Header */}
            <div className="px-6 py-4 bg-obsidian-900/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 border border-red-400/30" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-400/30" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 border border-green-400/30" />
                <span className="ml-3 text-xs font-mono text-slate-400">
                  rahulkirahh://system-diagnostic.spec
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>STATE: OPERATIONAL</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Bio & Core Philosophy */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2">
                    // EXECUTIVE SUMMARY
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight leading-snug">
                    {SITE.person.shortBio}
                  </h3>
                </div>

                <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/15 relative">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    // PHILOSOPHY MANIFESTO
                  </div>
                  <p className="text-slate-200 text-base md:text-lg leading-relaxed italic">
                    "{SITE.person.philosophy}"
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
                  <span>BASE: {SITE.person.base}</span>
                  <span>·</span>
                  <span>GEOGRAPHY: Remote (India & Middle East)</span>
                </div>
              </div>

              {/* Right Column: Principles Panel (Rationale box removed) */}
              <div className="lg:col-span-5 p-6 rounded-2xl obsidian-glass border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 mb-6">
                  <Cpu size={15} />
                  <span>CORE OPERATING PRINCIPLES</span>
                </div>

                <div className="space-y-3">
                  {SITE.person.principles.map((principle, idx) => (
                    <div
                      key={principle}
                      className="w-full text-left p-4 rounded-xl border bg-white/5 border-white/5 hover:border-blue-500/30 transition-all flex items-center justify-between group"
                    >
                      <span className="font-display font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                        0{idx + 1}. {principle}
                      </span>
                      <span className="text-blue-500/60 font-mono text-xs">SYS_0{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SKILLS MATRIX (Grouped as specified) */}
        <div>
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[2px] text-blue-400 mb-8">
            <Layers size={16} />
            <span>Categorized Skills Matrix & Capabilities</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.category}
                className="group p-6 rounded-2xl obsidian-glass border border-white/5 hover:border-blue-500/30 transition-all"
              >
                <div className="laser-beam opacity-0 group-hover:opacity-100 transition-opacity" />

                <h4 className="text-base font-bold font-display text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {group.category}
                </h4>

                <div className="space-y-2">
                  {group.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 size={13} className="text-blue-400 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
