"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, Award, CheckCircle2 } from "lucide-react";
import { SITE } from "@/data/site";

type TimelineFilter = "All" | "Work Experience" | "Education";

interface TimelineItem {
  id: string;
  type: "work" | "education";
  title: string;
  organization: string;
  organizationNote?: string;
  period: string;
  location?: string;
  workType?: string;
  description?: string;
  skills?: readonly string[];
  grade?: string;
  isCurrent?: boolean;
}

const UNIFIED_JOURNEY: TimelineItem[] = [
  {
    id: "edu-mba",
    type: "education",
    title: "MBA, Marketing",
    organization: "Sharda University",
    period: "Jan 2025 - Present",
    isCurrent: true,
  },
  {
    id: "work-motilal",
    type: "work",
    title: "Client Acquisition & Marketing",
    organization: "Motilal Oswal Financial Services Ltd",
    period: "Jan 2025 - Dec 2025",
    workType: "Part-time, remote",
    description: "Crafting strategies that attract investor clients and retain them with meaningful engagement.",
    isCurrent: false,
  },
  {
    id: "work-angel-specialist",
    type: "work",
    title: "Marketing Specialist",
    organization: "Angel One",
    period: "Jul 2025 - Sep 2025",
    workType: "Part-time, remote",
    description: "Marketing, building lead funnels, and onboarding.",
    isCurrent: false,
  },
  {
    id: "work-upstox",
    type: "work",
    title: "Referral Agent",
    organization: "Upstox",
    period: "Nov 2024 - Apr 2025",
    description: "Promoting and referring Upstox's stock trading and investment services.",
    isCurrent: false,
  },
  {
    id: "work-dizidice",
    type: "work",
    title: "Founder",
    organization: "DiziDice Media",
    organizationNote: "Internet Advertising Agency",
    location: "Delhi, remote",
    period: "2021 - Present",
    description: "Managing digital marketing campaigns, overseeing the team, and delivering marketing solutions.",
    skills: ["Social Media Marketing", "WordPress Development", "SEO", "Ads"],
    isCurrent: true,
  },
  {
    id: "work-angel-franchise",
    type: "work",
    title: "Franchise Owner",
    organization: "Angel One",
    location: "Hazaribagh",
    workType: "Part-time",
    period: "May 2020 - Jan 2023",
    isCurrent: false,
  },
  {
    id: "edu-bsc",
    type: "education",
    title: "BSc, Geology / Earth Science",
    organization: "Vinoba Bhave University",
    period: "2018 - 2021",
    isCurrent: false,
  },
  {
    id: "edu-isc",
    type: "education",
    title: "ISc, PCM",
    organization: "St. Columba's College, Hazaribag",
    period: "2015 - 2018",
    grade: "Grade A",
    isCurrent: false,
  },
];

const FILTERS: TimelineFilter[] = ["All", "Work Experience", "Education"];

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState<TimelineFilter>("All");

  const filteredItems = UNIFIED_JOURNEY.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Work Experience") return item.type === "work";
    if (activeFilter === "Education") return item.type === "education";
    return true;
  });

  return (
    <section id="experience" className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-3">
            Career & Academic Trajectory
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Unified Journey
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base mt-3">
            Chronological progression across venture building, fintech brokerage acquisition, and marketing academics.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === f
                    ? "text-white bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-400/40"
                    : "text-slate-400 hover:text-white bg-obsidian-900/90 border border-white/5 hover:border-white/20"
                }`}
              >
                {activeFilter === f && (
                  <motion.span
                    layoutId="timeline-filter-pill"
                    className="absolute inset-0 rounded-full bg-blue-600 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{f}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Central Spine Timeline Container */}
        <div className="relative mt-16">
          {/* Central Glowing Electric-Blue Spine (50% on desktop, left on mobile) */}
          <div className="absolute top-0 bottom-0 left-6 lg:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-transparent shadow-[0_0_15px_#1e90ff]" />

          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="relative flex flex-col lg:flex-row items-center w-full"
                  >
                    {/* Glowing Waypoint Node with Pulsing Ring on the Spine */}
                    <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-obsidian-950 transition-all ${
                          item.isCurrent
                            ? "border-blue-400 shadow-[0_0_20px_#1e90ff]"
                            : "border-slate-600 shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.isCurrent
                              ? "bg-blue-400 shadow-[0_0_10px_#60a5fa] animate-ping"
                              : "bg-slate-400"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Left or Right Alternate Card on Desktop */}
                    <div
                      className={`w-full lg:w-1/2 pl-16 lg:pl-0 ${
                        isEven ? "lg:pr-14 lg:text-right" : "lg:ml-auto lg:pl-14 lg:text-left"
                      }`}
                    >
                      <div className="group relative p-7 rounded-2xl obsidian-glass border border-white/5 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                        <div className="laser-beam opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Top Meta: Type & Period */}
                        <div
                          className={`flex items-center gap-2 mb-3 ${
                            isEven ? "lg:justify-end" : "lg:justify-start"
                          }`}
                        >
                          <span
                            className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              item.type === "work"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                            }`}
                          >
                            {item.type === "work" ? <Briefcase size={11} /> : <GraduationCap size={11} />}
                            <span>{item.type === "work" ? "Work" : "Education"}</span>
                          </span>

                          <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                            <Calendar size={11} className="text-blue-400" />
                            <span>{item.period}</span>
                          </span>

                          {item.isCurrent && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full animate-pulse">
                              Active / Present
                            </span>
                          )}
                        </div>

                        {/* Role / Degree Title */}
                        <h3 className="text-xl font-bold font-display text-white mb-1.5 group-hover:text-blue-300 transition-colors">
                          {item.title}
                        </h3>

                        {/* Organization / Institution */}
                        <div
                          className={`flex flex-wrap items-center gap-2 text-sm text-slate-300 font-semibold mb-3 ${
                            isEven ? "lg:justify-end" : "lg:justify-start"
                          }`}
                        >
                          <span>{item.organization}</span>
                          {item.organizationNote && (
                            <span className="text-xs text-slate-500 font-normal">
                              ({item.organizationNote})
                            </span>
                          )}
                          {item.workType && (
                            <span className="text-xs text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-normal">
                              {item.workType}
                            </span>
                          )}
                          {item.location && (
                            <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-normal">
                              <MapPin size={11} />
                              <span>{item.location}</span>
                            </span>
                          )}
                          {item.grade && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                              <Award size={11} />
                              <span>{item.grade}</span>
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        {item.description && (
                          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                            {item.description}
                          </p>
                        )}

                        {/* Skills */}
                        {item.skills && item.skills.length > 0 && (
                          <div
                            className={`flex flex-wrap gap-1.5 pt-3 border-t border-white/5 ${
                              isEven ? "lg:justify-end" : "lg:justify-start"
                            }`}
                          >
                            {item.skills.map((skill) => (
                              <span
                                key={skill}
                                className="text-[10px] font-medium text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-md"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
