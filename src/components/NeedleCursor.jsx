import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * A sewing-needle cursor that follows the pointer with a spring, scales + turns
 * gold over interactive elements. Only enabled on fine-pointer (hover) devices.
 *
 * SECURITY FIX: Used closest() safely — already correct in original.
 * STABILITY FIX: Cleanup removes both the listener and the cursor-none class.
 */
export default function NeedleCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.25 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;

    setEnabled(true);
    document.documentElement.classList.add('cursor-none');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target;
      setActive(
        !!el?.closest?.(
          'a, button, input, textarea, select, label, [role="button"], [data-cursor="active"]'
        )
      );
    };

    window.addEventListener('mousemove', move, { passive: true }); // FIX: passive listener for perf

    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.classList.remove('cursor-none');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{ x: sx, y: sy }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ scale: active ? 1.6 : 1, rotate: active ? -10 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="-translate-x-1/2 -translate-y-1/2"
      >
        <svg
          width="18"
          height="40"
          viewBox="0 0 18 40"
          fill="none"
          className={active ? 'text-[#B08D57]' : 'text-white'}
          style={{ filter: 'drop-shadow(0 0 4px rgba(176,141,87,0.35))' }}
          aria-hidden="true"
        >
          <ellipse cx="9" cy="6" rx="3.2" ry="4.6" stroke="currentColor" strokeWidth="1.4" />
          <line x1="9" y1="10.6" x2="9" y2="36" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M9 36 L6.5 32 M9 36 L11.5 32" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M9 6 C 14 10, 13 18, 9 22" stroke="#B08D57" strokeWidth="1" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
