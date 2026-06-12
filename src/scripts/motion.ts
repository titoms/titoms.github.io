(function () {
  const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Remove no-js guard so CSS transitions are fully controlled by JS
  document.documentElement.classList.remove('no-js');

  // ── Stagger: auto-assign data-delay to [data-reveal] children ──────────
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((container) => {
    const step = parseInt(container.dataset.stagger ?? '80', 10);
    const base = parseInt((container.dataset as Record<string, string>).staggerBase ?? '0', 10);
    let i = 0;
    container.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      el.dataset.delay = String(base + i * step);
      i++;
    });
  });

  // ── Scroll reveals via IntersectionObserver ─────────────────────────────
  if (REDUCE) {
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      el.classList.add('in');
    });
  } else {
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const d = +(el.dataset.delay ?? 0);
          el.style.transitionDelay = d + 'ms';
          el.classList.add('in');
          setTimeout(() => {
            el.style.transitionDelay = '';
          }, d + 750);
          revealIO.unobserve(el);
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -7% 0px' }
    );
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => revealIO.observe(el));
  }

  // ── Count-up for .count[data-count] ────────────────────────────────────
  const countEls = document.querySelectorAll<HTMLElement>('.count[data-count]');
  if (countEls.length > 0) {
    const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

    const runCount = (el: HTMLElement) => {
      const target = parseInt(el.dataset.count ?? '0', 10);
      const dur = parseInt(el.dataset.countDur ?? '1300', 10);
      const suffix = el.dataset.suffix ?? '';
      const prefix = el.dataset.prefix ?? '';
      if (REDUCE) {
        el.textContent = prefix + target + suffix;
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = prefix + Math.round(easeOut(p) * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          runCount(e.target as HTMLElement);
          countIO.unobserve(e.target);
        });
      },
      { threshold: 0.6 }
    );
    countEls.forEach((el) => countIO.observe(el));
  }

  // ── Ladder draw-on-scroll ───────────────────────────────────────────────
  const ladder = document.querySelector<HTMLElement>('.ladder');
  if (ladder) {
    if (REDUCE) {
      ladder.classList.add('run');
    } else {
      const ladderIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            (e.target as HTMLElement).classList.add('run');
            ladderIO.unobserve(e.target);
          });
        },
        { threshold: 0.3 }
      );
      ladderIO.observe(ladder);
    }
  }

  // ── Projects filter ─────────────────────────────────────────────────────
  const filterBar = document.querySelector<HTMLElement>('[data-filter-bar]');
  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const chip = (e.target as HTMLElement).closest<HTMLElement>('[data-filter]');
      if (!chip) return;
      const cat = chip.dataset.filter ?? 'all';

      filterBar.querySelectorAll<HTMLElement>('[data-filter]').forEach((c) =>
        c.classList.remove('active')
      );
      chip.classList.add('active');

      document.querySelectorAll<HTMLElement>('.filterable').forEach((card) => {
        const cats = ' ' + (card.dataset.cats ?? '') + ' ';
        const match = cat === 'all' || cats.includes(' ' + cat + ' ');
        if (match) {
          card.classList.remove('is-gone');
          requestAnimationFrame(() => card.classList.remove('is-hidden'));
        } else if (REDUCE) {
          card.classList.add('is-hidden', 'is-gone');
        } else {
          card.classList.add('is-hidden');
          setTimeout(() => card.classList.add('is-gone'), 320);
        }
      });

      const visibleCount = document.querySelectorAll('.filterable:not(.is-gone)').length;
      const emptyNote = document.querySelector<HTMLElement>('.empty-note');
      if (emptyNote) emptyNote.hidden = visibleCount > 0;
    });
  }

  // ── Pointer parallax for float-pills ───────────────────────────────────
  const scene = document.querySelector<HTMLElement>('[data-parallax-scene]');
  if (scene && !REDUCE && window.innerWidth >= 1024) {
    const pills = Array.from(scene.querySelectorAll<HTMLElement>('[data-depth]'));
    let cx = 0, cy = 0, tx = 0, ty = 0, raf = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      cx = lerp(cx, tx, 0.06);
      cy = lerp(cy, ty, 0.06);
      pills.forEach((pill) => {
        const depth = parseFloat(pill.dataset.depth ?? '0');
        pill.style.marginLeft = cx * depth + 'px';
        pill.style.marginTop = cy * depth + 'px';
      });
      if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    scene.addEventListener(
      'mousemove',
      (e) => {
        const r = scene.getBoundingClientRect();
        tx = e.clientX - r.left - r.width / 2;
        ty = e.clientY - r.top - r.height / 2;
        if (!raf) raf = requestAnimationFrame(tick);
      },
      { passive: true }
    );

    scene.addEventListener('mouseleave', () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    });
  }
})();
