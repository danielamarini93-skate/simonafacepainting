// Glitter: (1) a few twinkling sparkles drifting inside any [data-glitter] element,
// (2) a small glitter burst wherever a gradient button is tapped.
// Everything is off when the visitor prefers reduced motion.

const COLORS = ['#ffffff', '#f6d4ff', '#d99bff', '#ff8cf4', '#c58af0', '#ffd98a'];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function star(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, alpha: number) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  // 4-point sparkle
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y);
  ctx.quadraticCurveTo(x, y, x, y - r);
  ctx.fill();
}

function fitCanvas(c: HTMLCanvasElement) {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const { width, height } = c.getBoundingClientRect();
  c.width = Math.round(width * dpr); c.height = Math.round(height * dpr);
  const ctx = c.getContext('2d')!; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

/** Ambient twinkle inside an element. */
export function ambient(host: HTMLElement, count = 26) {
  if (reduce) return;
  const c = document.createElement('canvas');
  c.className = 'glitter-canvas'; c.setAttribute('aria-hidden', 'true');
  host.appendChild(c);
  let { ctx, width, height } = fitCanvas(c);
  const parts = Array.from({ length: count }, () => ({
    x: Math.random() * width, y: Math.random() * height,
    r: 2.5 + Math.random() * 4.5, vy: -(0.08 + Math.random() * 0.22), vx: (Math.random() - 0.5) * 0.12,
    p: Math.random() * Math.PI * 2, s: 0.6 + Math.random() * 1.4, color: COLORS[(Math.random() * COLORS.length) | 0],
  }));
  let running = false, raf = 0;
  const tick = (t: number) => {
    ctx.clearRect(0, 0, width, height);
    for (const q of parts) {
      q.y += q.vy; q.x += q.vx;
      if (q.y < -10) { q.y = height + 10; q.x = Math.random() * width; }
      const a = 0.15 + 0.85 * Math.max(0, Math.sin(t / 700 * q.s + q.p)) ** 3;
      star(ctx, q.x, q.y, q.r, q.color, a);
    }
    ctx.globalAlpha = 1;
    if (running) raf = requestAnimationFrame(tick);
  };
  new IntersectionObserver(([e]) => {
    running = e.isIntersecting;
    cancelAnimationFrame(raf);
    if (running) raf = requestAnimationFrame(tick);
  }).observe(host);
  addEventListener('resize', () => ({ ctx, width, height } = fitCanvas(c)));
}

let burstCanvas: HTMLCanvasElement | null = null;
/** One-off burst of glitter from a point on screen (viewport coordinates). */
export function burst(x: number, y: number, n = 26) {
  if (reduce) return;
  if (!burstCanvas) {
    burstCanvas = document.createElement('canvas');
    burstCanvas.className = 'glitter-burst'; burstCanvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(burstCanvas);
  }
  const { ctx, width, height } = fitCanvas(burstCanvas);
  const parts = Array.from({ length: n }, () => {
    const ang = Math.random() * Math.PI * 2, sp = 1.5 + Math.random() * 4.5;
    return { x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 2, r: 2 + Math.random() * 4, life: 1, color: COLORS[(Math.random() * COLORS.length) | 0] };
  });
  const tick = () => {
    ctx.clearRect(0, 0, width, height);
    let alive = false;
    for (const q of parts) {
      q.vy += 0.16; q.vx *= 0.98; q.x += q.vx; q.y += q.vy; q.life -= 0.022;
      if (q.life > 0) { alive = true; star(ctx, q.x, q.y, q.r, q.color, q.life); }
    }
    ctx.globalAlpha = 1;
    if (alive) requestAnimationFrame(tick); else ctx.clearRect(0, 0, width, height);
  };
  requestAnimationFrame(tick);
}

document.querySelectorAll<HTMLElement>('[data-glitter]').forEach((el) => ambient(el, +(el.dataset.glitter || 26)));
document.addEventListener('pointerdown', (e) => {
  const b = (e.target as Element).closest?.('.btn--wa, .btn--pink');
  if (b) burst(e.clientX, e.clientY);
});
