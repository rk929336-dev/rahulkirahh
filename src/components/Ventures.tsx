"use client";

import { SITE } from "@/data/site";
import { ExternalLink, Rocket, Link2, GraduationCap, Cpu } from "lucide-react";

const VENTURE_ICONS: Record<string, React.ReactNode> = {
  AGENCY: <Rocket size={20} className="text-blue-400" />,
  PRODUCT: <Link2 size={20} className="text-indigo-400" />,
  INITIATIVE: <GraduationCap size={20} className="text-cyan-400" />,
};

export default function Ventures() {
  return (
    <section id="ventures" className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-3">
            Ventures & Products
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            What I'm Building
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base mt-3">
            Agencies, SaaS utilities, and education initiatives scaling growth and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE.ventures.map((v) => {
            const fullUrl = v.url.startsWith("http") ? v.url : `https://${v.url}`;
            return (
              <div
                key={v.name}
                className="group relative p-7 rounded-2xl obsidian-glass border border-white/5 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
              >
                <div className="laser-beam opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {VENTURE_ICONS[v.type] || <Cpu size={20} className="text-blue-400" />}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                      {v.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {v.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {v.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <a
                    href={fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white transition-colors"
                  >
                    <span>{v.url}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
