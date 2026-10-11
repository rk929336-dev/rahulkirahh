"use client";

import { SITE } from "@/data/site";
import { TrendingUp, GitMerge, Target, Search, Bot, Layout, Share2, Star, DollarSign, ArrowRight, Sparkles } from "lucide-react";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "Growth Strategy Consulting": <TrendingUp size={22} className="text-blue-400" />,
  "Funnel & Conversion Architecture": <GitMerge size={22} className="text-cyan-400" />,
  "Performance Marketing Systems": <Target size={22} className="text-emerald-400" />,
  "SEO & Organic Authority": <Search size={22} className="text-amber-400" />,
  "AI & Automation Workflows": <Bot size={22} className="text-indigo-400" />,
  "Website Development (WordPress)": <Layout size={22} className="text-blue-400" />,
  "Social Media Management": <Share2 size={22} className="text-pink-400" />,
  "Reviews Management": <Star size={22} className="text-yellow-400" />,
  "Affiliate Marketing": <DollarSign size={22} className="text-green-400" />,
};

export default function Services() {
  return (
    <section id="services" className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-3">
            Engagement Models
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Work With Me
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base mt-3">
            Predictable growth systems, acquisition funnels, and performance marketing engineered for scale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SITE.services.map((service) => (
            <div
              key={service}
              className="group relative p-7 rounded-2xl obsidian-glass border border-white/5 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
            >
              <div className="laser-beam opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {SERVICE_ICONS[service] || <Sparkles size={22} className="text-blue-400" />}
                </div>

                <h3 className="text-xl font-bold font-display text-white group-hover:text-blue-300 transition-colors mb-3">
                  {service}
                </h3>
              </div>

              <div className="pt-6 border-t border-white/5">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-white transition-colors"
                >
                  <span>Inquire for Partnership</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Global Section CTA */}
        <div className="p-8 md:p-10 rounded-2xl obsidian-glass border border-blue-500/30 text-center max-w-3xl mx-auto relative overflow-hidden shadow-[0_0_50px_rgba(30,144,255,0.15)]">
          <div className="laser-beam" />
          <h3 className="text-2xl md:text-3xl font-extrabold font-display text-white mb-4">
            Need a structured growth system for your venture?
          </h3>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-8">
            Let's evaluate your existing acquisition funnels, identify bottlenecks, and engineer repeatable revenue engines.
          </p>
          <a
            href="#contact"
            data-magnetic="true"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all hover:scale-105 active:scale-95"
          >
            <span>Initiate Growth Advisory</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
