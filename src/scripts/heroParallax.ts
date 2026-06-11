export function initParallax(sceneId: string) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 1024) return;

  const scene = document.getElementById(sceneId);
  if (!scene) return;
  const layers = [...scene.querySelectorAll<HTMLElement>('[data-depth]')];
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;

  const loop = () => {
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    layers.forEach(el => {
      const d = parseFloat(el.dataset.depth ?? '0');
      if (el.classList.contains('float-pill')) {
        el.style.marginLeft = cx * d + 'px';
        el.style.marginTop = cy * d + 'px';
      } else {
        el.style.transform = `translate3d(${cx * d}px,${cy * d}px,0)`;
      }
    });
    raf = 0;
  };

  window.addEventListener('mousemove', e => {
    tx = e.clientX - window.innerWidth / 2;
    ty = e.clientY - window.innerHeight / 2;
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
}
