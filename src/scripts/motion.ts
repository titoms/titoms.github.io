(function () {
  const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Remove no-js guard so CSS transitions are fully controlled by JS
  document.documentElement.classList.remove('no-js');

  // ── Ambient hero particles — varied count & position per page load ───────
  if (!REDUCE) {
    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    document.querySelectorAll<HTMLElement>('.bg-field').forEach((field) => {
      const count = Math.floor(rand(9, 17));
      const frag = document.createDocumentFragment();
      for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'particle';
        const size = rand(1.2, 2.8);
        p.style.width  = `${size}px`;
        p.style.height = `${size}px`;
        p.style.top    = `${rand(0, 100)}%`;
        p.style.left   = `${rand(0, 100)}%`;
        p.style.setProperty('--p-dur',   `${rand(11, 22)}s`);
        p.style.setProperty('--p-delay', `${rand(-12, 4)}s`);
        p.style.setProperty('--p-dx',    `${rand(-40, 40)}px`);
        p.style.setProperty('--p-dy',    `${rand(-60, -10)}px`);
        p.style.setProperty('--p-op',    `${rand(0.35, 0.85).toFixed(2)}`);
        frag.appendChild(p);
      }
      field.appendChild(frag);
    });
  }

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

  // ── Vertical ladder (About page career timeline) ────────────────────────
  // Segment-based fill (like the Services horizontal ladder, but vertical).
  // Segments are drawn only between markers so the rail never crosses the
  // numbered circles. Positioning uses offsetTop/offsetLeft (transform-immune)
  // so the rail stays correctly centred even while sibling rows reveal.
  document.querySelectorAll<HTMLElement>('.ladder.vertical').forEach((vladder) => {
    const rail = vladder.querySelector<HTMLElement>('.rail');
    if (!rail) return;

    const container = vladder.closest<HTMLElement>('[data-vladder-container]') ?? vladder.parentElement;
    if (!container) return;

    // Walk offsetParent chain — ignores CSS transforms (which getBoundingClientRect doesn't).
    const offsetWithin = (el: HTMLElement, root: HTMLElement) => {
      let top = 0, left = 0;
      let cur: HTMLElement | null = el;
      while (cur && cur !== root) {
        top += cur.offsetTop;
        left += cur.offsetLeft;
        cur = cur.offsetParent as HTMLElement | null;
      }
      return { top, left };
    };

    const measure = () => {
      const nums = Array.from(container.querySelectorAll<HTMLElement>('.tl-num'));
      if (nums.length < 2) return;
      const firstNum = nums[0];
      const lastNum = nums[nums.length - 1];
      const f = offsetWithin(firstNum, container);
      const l = offsetWithin(lastNum, container);
      const railTop = f.top + firstNum.offsetHeight / 2;
      const railBottom = l.top + lastNum.offsetHeight / 2;
      const railLeft = f.left + firstNum.offsetWidth / 2 - 1; /* -1 = half rail width */
      vladder.style.setProperty('--rail-top', `${railTop}px`);
      vladder.style.setProperty('--rail-height', `${Math.max(0, railBottom - railTop)}px`);
      vladder.style.setProperty('--rail-left', `${railLeft}px`);
    };

    const nums = Array.from(container.querySelectorAll<HTMLElement>('.tl-num'));
    const rows = Array.from(container.querySelectorAll<HTMLElement>('.tl-row'));
    const n = nums.length;
    if (n < 2 || rows.length < 2) return;

    let maxReached = 0;
    let segments: HTMLElement[] = [];

    const syncSegments = () => {
      const firstNum = nums[0];
      const first = offsetWithin(firstNum, container);
      const railTop = first.top + firstNum.offsetHeight / 2;

      segments = nums.slice(0, -1).map((num, index) => {
        const next = nums[index + 1];
        const currentOffset = offsetWithin(num, container);
        const nextOffset = offsetWithin(next, container);
        const top = currentOffset.top + num.offsetHeight - railTop + 2;
        const bottom = nextOffset.top - railTop - 2;
        const segment = segments[index] ?? document.createElement('span');
        if (!segment.parentElement) {
          segment.className = 'rail-segment';
          rail.appendChild(segment);
        }
        segment.style.top = `${top}px`;
        segment.style.height = `${Math.max(0, bottom - top)}px`;
        return segment;
      });
      rail.querySelectorAll<HTMLElement>('.rail-segment').forEach((segment, index) => {
        if (index >= segments.length) segment.remove();
      });
    };

    const setProgress = () => {
      const reached = Math.min(maxReached, n - 1);
      nums.forEach((num, index) => {
        num.classList.toggle('is-reached', index <= reached);
      });
      segments.forEach((segment, index) => {
        segment.classList.toggle('is-visible', index < reached);
      });
    };

    const updateRail = () => {
      measure();
      syncSegments();
      setProgress();
    };

    updateRail();
    window.addEventListener('resize', updateRail, { passive: true });
    // Re-measure after fonts have settled (web font load can shift line heights).
    if ((document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready) {
      (document as Document & { fonts: { ready: Promise<unknown> } }).fonts.ready.then(updateRail).catch(() => {});
    }

    if (REDUCE) {
      vladder.classList.add('run');
      maxReached = n - 1;
      setProgress();
      return;
    }

    setProgress();

    const vIO = new IntersectionObserver(
      (entries) => {
        let changed = false;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const row = e.target as HTMLElement;
          const index = rows.indexOf(row);
          if (index > maxReached) {
            maxReached = index;
            changed = true;
          }
          vIO.unobserve(row);
        });
        if (!changed) return;
        setProgress();
        vladder.classList.add('run');
      },
      { threshold: 0.45, rootMargin: '0px 0px -18% 0px' }
    );

    rows.forEach((row) => vIO.observe(row));
  });

  // ── Ladder — step-by-step sequential animation (horizontal only) ────────
  const ladder = document.querySelector<HTMLElement>('.ladder:not(.vertical)');
  if (ladder) {
    const nodes    = Array.from(ladder.querySelectorAll<HTMLElement>('.lnode'));
    const railFill = ladder.querySelector<HTMLElement>('.rail-fill');
    const n        = nodes.length;

    const setFill = (index: number) => {
      if (!railFill || n < 2) return;
      railFill.style.transform = `scaleX(${index / (n - 1)})`;
    };

    if (REDUCE) {
      nodes.forEach(nd => nd.classList.add('is-done'));
      if (railFill) railFill.style.transform = 'scaleX(1)';
    } else {
      const ACTIVE_MS = 1200; // how long a step glows
      const STEP_MS   = 1700; // interval between steps starting
      const HOLD_MS   = 5000; // pause when all steps are done
      const RESET_MS  = 1100; // fade-out time before looping

      let inView  = false;
      let timers: ReturnType<typeof setTimeout>[] = [];

      const clearAll = () => { timers.forEach(clearTimeout); timers = []; };

      const reset = () => {
        clearAll();
        nodes.forEach(nd => { nd.classList.remove('is-active', 'is-done'); });
        if (railFill) railFill.style.transform = 'scaleX(0)';
      };

      const runStep = (index: number) => {
        if (!inView) return;

        if (index >= n) {
          // All done — hold, then reset and loop
          timers.push(setTimeout(() => {
            reset();
            timers.push(setTimeout(() => { if (inView) runStep(0); }, RESET_MS));
          }, HOLD_MS));
          return;
        }

        // Activate this step
        nodes[index].classList.remove('is-done');
        nodes[index].classList.add('is-active');
        setFill(index);

        // After ACTIVE_MS mark done, advance rail to next
        timers.push(setTimeout(() => {
          nodes[index].classList.remove('is-active');
          nodes[index].classList.add('is-done');
        }, ACTIVE_MS));

        // After STEP_MS move to next step
        timers.push(setTimeout(() => runStep(index + 1), STEP_MS));
      };

      const ladderIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            inView = e.isIntersecting;
            if (e.isIntersecting) { runStep(0); }
            else { reset(); }
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
