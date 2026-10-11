"use client";

import { useCountUp } from "@/hooks/useAnimations";

interface CounterProps {
  counter: {
    value: number;
    suffix: string;
    label: string;
    subLabel?: string;
  };
  index: number;
}

export default function CounterCard({ counter, index }: CounterProps) {
  const [ref, displayValue] = useCountUp(counter.value, 1800 + index * 200);

  const formatValue = (val: number) => {
    if (counter.value >= 1000) {
      return val.toLocaleString("en-IN");
    }
    return val.toString();
  };

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className="group relative p-6 rounded-2xl obsidian-glass border border-white/5 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
    >
      <div className="laser-beam opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex items-baseline gap-1 text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight mb-2">
          <span>{formatValue(displayValue)}</span>
          <span className="text-blue-400 font-extrabold">{counter.suffix}</span>
        </div>
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300">
          {counter.label}
        </p>
      </div>

      {counter.subLabel && (
        <p className="text-xs text-slate-500 mt-2 border-t border-white/5 pt-2">
          {counter.subLabel}
        </p>
      )}
    </div>
  );
}
