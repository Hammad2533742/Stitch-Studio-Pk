import { motion, AnimatePresence } from 'framer-motion';

export default function SewingMascotOverlay({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="relative w-full max-w-lg bg-[#111] border border-[#B08D57]/40 rounded-2xl p-8 shadow-2xl overflow-hidden text-center"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white font-mono-stitch text-xs uppercase"
            >
              [Close ✕]
            </button>

            <span className="font-mono-stitch text-[10px] tracking-[0.3em] uppercase text-[#B08D57]">
              Atelier Interactive Masterpiece
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-white mt-1 mb-4">
              Stitching the Signature
            </h3>

            {/* Tailor Character Upholding Brand Name in Excitement */}
            <div className="relative w-full h-56 flex flex-col items-center justify-center bg-black/40 rounded-xl border border-white/5 my-2 p-4">
              <svg viewBox="0 0 300 130" className="w-full h-full" fill="none">
                {/* Excited Tailor Raising Hands */}
                <g id="excited-tailor">
                  <circle cx="150" cy="40" r="16" fill="#F3C6A5" />
                  <circle cx="145" cy="38" r="2" fill="#111" />
                  <circle cx="155" cy="38" r="2" fill="#111" />
                  {/* Happy Smile */}
                  <path d="M 145 44 Q 150 50 155 44" stroke="#111" strokeWidth="1.5" fill="none" />
                  {/* Tailor Body */}
                  <path d="M 132 56 L 168 56 L 160 100 L 140 100 Z" fill="#222" stroke="#B08D57" strokeWidth="1" />
                  {/* Raised Excited Arms */}
                  <motion.path
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 0.4 }}
                    d="M 135 60 L 110 25 M 165 60 L 190 25"
                    stroke="#F3C6A5"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </g>
              </svg>

              {/* Multi-Color Thread Logo Reveal Held High */}
              <motion.div
                initial={{ scale: 0.5, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: -20, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="px-6 py-2 rounded-lg border border-[#B08D57] bg-black/80 shadow-lg"
              >
                <span className="font-display text-2xl font-bold tracking-widest bg-gradient-to-r from-red-500 via-amber-300 via-emerald-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                  STITCH STUDIO®
                </span>
              </motion.div>
            </div>

            <p className="font-sans-stitch text-xs text-white/60 mt-2">
              Our signature sewn with pride, thread by thread.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}