import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function SewingMascotOverlay({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-6"
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-xl p-10 sm:p-14 shadow-2xl overflow-hidden text-center"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Subtitle / Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <span className="w-6 h-px bg-[#B08D57]" />
              <span className="font-mono-stitch text-[10px] tracking-[0.35em] uppercase text-[#B08D57]">
                Atelier Signature Sequence
              </span>
              <span className="w-6 h-px bg-[#B08D57]" />
            </motion.div>

            {/* Glowing Metallic Thread Frame */}
            <div className="relative py-12 px-6 border border-white/10 rounded-lg bg-black/50 overflow-hidden my-6">
              {/* Animated Sewing Thread Border Effect */}
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute inset-0 border-2 border-transparent"
                style={{
                  borderImage: 'linear-gradient(90deg, #B08D57, #E2C17C, #B08D57, #ffffff) 1',
                }}
              />

              {/* Multi-Color Stitched Brand Name */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-display text-4xl sm:text-6xl tracking-[0.15em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#B08D57] via-white to-[#E2C17C]"
              >
                STITCH STUDIO
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-4 font-mono-stitch text-xs tracking-[0.3em] uppercase text-white/50"
              >
                Crafted Thread By Thread • Est. On The Floor
              </motion.p>
            </div>

            {/* Bottom Caption */}
            <p className="font-sans-stitch text-sm text-white/60 max-w-md mx-auto leading-relaxed">
              Precision garment manufacturing across Men's, Women's, and Kid's divisions.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}