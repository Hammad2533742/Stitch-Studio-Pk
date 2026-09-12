import { motion, AnimatePresence } from 'framer-motion';

export default function SewingMascotOverlay({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {/* Ambient Lighting Beam */}
          <div className="absolute w-[600px] h-[600px] bg-[#B08D57]/10 rounded-full blur-[140px] pointer-events-none" />

          {/* SVG Thread Weaving Canvas (No Cards, No Boxes) */}
          <div className="relative w-full max-w-4xl px-6 text-center select-none">
            <svg className="w-full h-32 sm:h-48 overflow-visible" viewBox="0 0 800 200">
              {/* Dynamic Thread Path Animation */}
              <motion.path
                d="M 50 100 Q 200 20, 400 100 T 750 100"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />

              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B08D57" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#E2C17C" stopOpacity="1" />
                  <stop offset="100%" stopColor="#B08D57" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>

            {/* Pure Typography Stitched on Canvas */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-4"
            >
              <span className="font-mono-stitch text-[10px] tracking-[0.4em] uppercase text-[#B08D57] block">
                Precision In Motion
              </span>
              <h2 className="font-display text-5xl sm:text-7xl uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2C17C] to-[#B08D57]">
                STITCH STUDIO
              </h2>
              <p className="font-mono-stitch text-xs text-white/40 tracking-[0.3em] uppercase">
                Click anywhere to return to atelier
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}