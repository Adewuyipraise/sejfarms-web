"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/** Split "1,000+" into prefix "" / target 1000 / suffix "+". */
function parseValue(raw: string) {
  const match = raw.match(/^(\D*)(\d[\d,]*)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    target: Number(match[2].replace(/,/g, "")),
    suffix: match[3],
  };
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates a numeric value counting up when it scrolls into view.
 *
 * The server renders the final value (good for SEO / no-JS). When it enters
 * the viewport the counter resets to zero and ticks up — usually paired with a
 * `<Reveal>` wrapper so the reset frame happens while the element is still
 * fading in.
 */
export function CountUp({
  value,
  duration = 1.5,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const parsed = useMemo(() => parseValue(value), [value]);

  // Start at the real value so SSR output is meaningful; the animation resets
  // to 0 only once the element is on screen.
  const [display, setDisplay] = useState(parsed?.target ?? 0);

  const target = parsed?.target ?? 0;

  useEffect(() => {
    if (!inView || reduce || !parsed) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      setDisplay(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, parsed, target, duration]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {parsed.prefix}
      {display.toLocaleString()}
      {parsed.suffix}
    </span>
  );
}
