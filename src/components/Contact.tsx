"use client";

import { useState } from "react";
import { SITE } from "@/data/site";
import { Mail, MessageCircle, Copy, Check, ArrowUpRight, Send, MapPin } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  instagram: <InstagramIcon />,
  linkedin: <LinkedInIcon />,
  facebook: <FacebookIcon />,
  x: <XIcon />,
};

const AGENCY_EMAIL = "contact@dizidice.com";
const WHATSAPP_URL = "https://wa.me/?text=Hi%20Rahul,%20I%20would%20like%20to%20discuss%20a%20growth%20system%20for%20my%20business.";

export default function Contact() {
  const [copied, setCopied] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(AGENCY_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmitMailto = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Growth Partnership Inquiry: ${name || "New Client"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nContact Email / Phone: ${email}\nVenture Domain: ${domain}\n\nProject Scope & Objectives:\n${message}\n`
    );
    window.location.href = `mailto:${AGENCY_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[3px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-3">
            Direct Line
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Initiate Contact
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base mt-3">
            Deploy structured growth infrastructure, organic distribution funnels, or performance marketing systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels Card */}
          <div className="lg:col-span-5 p-8 rounded-2xl obsidian-glass border border-white/10 relative overflow-hidden">
            <div className="laser-beam" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold uppercase tracking-wider text-blue-400 mb-6">
              <span className="pulsing-blue-dot" />
              <span>Available for Advisory & Growth Systems</span>
            </div>

            <h3 className="text-2xl font-bold font-display text-white mb-4">
              Direct Channels
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              Founder of DiziDice Media. Based in {SITE.person.base}. Working remotely with clients across India and the Middle East.
            </p>

            {/* Quick Action Badges: Email Copy & WhatsApp */}
            <div className="space-y-3 mb-8">
              {/* Copy Email Button */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-blue-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-white">
                    {AGENCY_EMAIL}
                  </span>
                </div>
                <button
                  type="button"
                  data-magnetic="true"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 hover:text-white border border-blue-500/30 transition-all"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* WhatsApp Link */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle size={18} className="text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    Chat on WhatsApp
                  </span>
                </div>
                <ArrowUpRight size={15} className="text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </a>
            </div>

            {/* Magnetic Social Links */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Verified Social Profiles
              </span>
              <div className="flex flex-wrap gap-2.5">
                {SITE.social.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic="true"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/40 text-xs font-semibold text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95"
                  >
                    {SOCIAL_ICONS[s.icon] || <ArrowUpRight size={14} />}
                    <span>{s.platform}</span>
                    <ArrowUpRight size={12} className="text-slate-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form UI (opens mailto: to agency email) */}
          <div className="lg:col-span-7 p-8 rounded-2xl obsidian-glass border border-white/10">
            <h3 className="text-xl font-bold font-display text-white mb-6">
              Send Project Brief
            </h3>

            <form onSubmit={handleSubmitMailto} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Work Email / Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@company.com / +91 ..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Company / Venture Domain
                </label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. yourcompany.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Growth Challenge / Objective
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your current distribution funnel, customer acquisition goal, or marketing system requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                data-magnetic="true"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/40 shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all hover:scale-102 active:scale-98"
              >
                <span>Launch Email Brief</span>
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
