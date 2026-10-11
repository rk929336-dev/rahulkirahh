"use client";

import { SITE } from "@/data/site";
import { Award, ShieldCheck } from "lucide-react";

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-6 relative border-t border-b border-white/5 bg-obsidian-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-blue-400 mb-1">
              <ShieldCheck size={16} />
              <span>Verified Qualifications</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-display text-white">
              Certifications & Industry Badges
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Compact Credentials Registry ({SITE.certifications.length} verified)
          </span>
        </div>

        {/* Compact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SITE.certifications.map((cert) => (
            <div
              key={cert.name}
              className="p-4 rounded-xl obsidian-glass border border-white/5 hover:border-blue-500/30 transition-all flex items-start gap-3.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <Award size={16} />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors truncate" title={cert.name}>
                  {cert.name}
                </h4>

                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span className="font-semibold text-slate-300">{cert.issuer}</span>
                  <span>·</span>
                  <span>{cert.date}</span>
                </div>

                {"credentialId" in cert && cert.credentialId && (
                  <div className="text-[11px] font-mono text-slate-500 mt-1 truncate" title={`Credential ID: ${cert.credentialId}`}>
                    ID: {cert.credentialId}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
