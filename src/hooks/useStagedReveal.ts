import { useState, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useStagedReveal(
  count: number,
  { start = 650, step = 850 }: { start?: number; step?: number } = {}
) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduced) { setN(count); return; }
    const el = ref.current;
    if (!el) return;
    const timers: number[] = [];
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      timers.push(window.setTimeout(() => {
        for (let i = 1; i <= count; i++) {
          timers.push(window.setTimeout(() => setN(i), step * (i - 1)));
        }
      }, start));
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, [count, step, start, reduced]);

  return { ref, n };
}
