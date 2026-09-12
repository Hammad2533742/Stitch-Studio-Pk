import { useEffect, useRef } from 'react';

/**
 * Subtle starfield + noise overlay fixed behind all content.
 *
 * SECURITY / STABILITY FIXES:
 * 1. ResizeObserver replaces window resize listener for more accurate tracking.
 * 2. Stars clamp to screen bounds on resize (no orphaned off-screen particles).
 * 3. cancelAnimationFrame and removeEventListener called on cleanup.
 * 4. canvas is aria-hidden — purely decorative.
 */
export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let raf;
    let stars = [];
    let w = window.innerWidth;
    let h = window.innerHeight;

    const setup = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(220, Math.floor((w * h) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2,
        a: Math.random() * 0.6 + 0.15,
        s: Math.random() * 0.02 + 0.004,
        ph: Math.random() * Math.PI * 2,
        gold: Math.random() < 0.12,
      }));
    };

    let t = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        const tw = 0.5 + 0.5 * Math.sin(t * st.s + st.ph);
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = st.gold
          ? `rgba(176,141,87,${st.a * tw})`
          : `rgba(255,255,255,${st.a * tw})`;
        ctx.fill();
        st.y += 0.03;
        // FIX: clamp to current height in case of resize
        if (st.y > h) st.y = 0;
      }
    };

    setup();
    draw();

    // FIX: ResizeObserver is more reliable than window resize for layout shifts
    const ro = new ResizeObserver(() => setup());
    ro.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />   {/* FIX: was ref__ */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(176,141,87,0.10), transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(176,141,87,0.06), transparent 60%)',
        }}
      />
    </div>
  );
}
