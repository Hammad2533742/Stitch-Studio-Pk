import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let raf;
    let threads = [];
    const pointer = { x: -1000, y: -1000 };
    let w = window.innerWidth;
    let h = window.innerHeight;

    const setup = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(12, Math.min(26, Math.floor(w / 72)));
      threads = Array.from({ length: count }, (_, index) => ({
        x: ((index + 0.5) / count) * w,
        phase: Math.random() * Math.PI * 2,
        amplitude: 8 + Math.random() * 18,
        speed: 0.00035 + Math.random() * 0.00025,
        opacity: 0.06 + Math.random() * 0.08,
      }));
    };

    const draw = (time) => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);

      for (const thread of threads) {
        const distance = Math.abs(pointer.x - thread.x);
        const pull = Math.max(0, 1 - distance / 260) * 18;
        ctx.beginPath();
        for (let y = -24; y <= h + 24; y += 20) {
          const x = thread.x + Math.sin(y * 0.014 + time * thread.speed + thread.phase) * thread.amplitude + pull;
          if (y === -24) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(156, 122, 70, ${thread.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    setup();
    draw();

    const ro = new ResizeObserver(() => setup());
    ro.observe(document.documentElement);
    const move = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };
    const leave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', leave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', leave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(156,122,70,0.08), transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(156,122,70,0.05), transparent 60%)',
        }}
      />
    </div>
  );
}
