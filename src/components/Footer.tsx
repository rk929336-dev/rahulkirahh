import { SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-obsidian-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          <span className="font-bold text-white font-display text-sm">
            {SITE.person.name}
          </span>
          <span className="text-slate-600">·</span>
          <span>Growth Architect & System Thinker</span>
        </div>

        <div className="text-slate-500">
          © {new Date().getFullYear()} {SITE.person.name}. Systems over tactics.
        </div>

        <div className="flex items-center gap-5">
          {SITE.social.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              {s.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
