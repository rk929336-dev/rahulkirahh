"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Ventures", href: "#ventures", id: "ventures" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section tracking for sliding pill
      const scrollPos = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand: "Rahul Ki Rahh." with a blue period */}
        <a
          href="#"
          data-magnetic="true"
          className="group flex items-center gap-1.5 font-display font-extrabold text-lg md:text-xl text-white tracking-tight"
        >
          <span>Rahul Ki Rahh</span>
          <span className="text-blue-500 drop-shadow-[0_0_10px_#1e90ff] font-black text-2xl leading-none">
            .
          </span>
        </a>

        {/* Desktop Navigation with Sliding Pill Indicator */}
        <nav className="hidden md:flex items-center p-1.5 rounded-full bg-obsidian-900/75 border border-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                data-magnetic="true"
                onClick={() => setActiveSection(item.id)}
                className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-blue-600/90 border border-blue-400/40 shadow-[0_0_15px_rgba(30,144,255,0.4)] -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            data-magnetic="true"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all hover:scale-105 active:scale-95"
          >
            <span>Work With Me</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          aria-label="Toggle navigation drawer"
          className="md:hidden w-10 h-10 rounded-full bg-obsidian-900/80 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center backdrop-blur-md"
        >
          {mobileDrawerOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mt-3 p-6 rounded-2xl obsidian-glass border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col gap-4"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileDrawerOpen(false)}
                className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-slate-300 hover:text-blue-400 py-2 border-b border-white/5"
              >
                <span>{item.label}</span>
                <span className="text-blue-500 text-xs">→</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileDrawerOpen(false)}
              className="mt-2 text-center text-xs font-bold uppercase tracking-wider text-white bg-blue-600 py-3 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              Work With Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
