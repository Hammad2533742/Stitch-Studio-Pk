import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SewingMascotOverlay({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          {/* Main Dialog Card */}
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="relative w-full max-w-lg bg-[#111] border border-[#B08D57]/40 rounded-2xl p-8 shadow-2xl overflow-hidden text-center"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white font-mono-stitch text-xs tracking-widest uppercase transition-colors"
            >
              [Close ✕]
            </button>

            {/* Title Header */}
            <span className="font-mono-stitch text-[10px] tracking-[0.3em] uppercase text-[#B08D57]">
              Atelier Interactive Experience
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-white mt-1 mb-6">
              Stitching the Signature
            </h3>

            {/* Cute Animated Tailor & Sewing Machine Graphics */}
            <div className="relative w-full h-48 flex items-center justify-center my-4 bg-black/30 rounded-xl border border-white/5">
              <svg
                viewBox="0 0 300 150"
                className="w-full h-full max-w-xs"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Tailor Character (Head & Body) */}
                <g id="tailor-guy">
                  {/* Cute Head */}
                  <circle cx="90" cy="50" r="16" fill="#F3C6A5" />
                  {/* Eyes */}
                  <circle cx="85" cy="48" r="2" fill="#111" />
                  <circle cx="95" cy="48" r="2" fill="#111" />
                  {/* Cute Cheeks */}
                  <circle cx="83" cy="53" r="2" fill="#E88888" opacity="0.6" />
                  <circle cx="97" cy="53" r="2" fill="#E88888" opacity="0.6" />
                  {/* Tailor Measuring Tape around Neck */}
                  <path d="M 80 62 Q 90 75 100 62" stroke="#B08D57" strokeWidth="3" fill="none" />
                  {/* Body/Torso */}
                  <path d="M 72 66 L 108 66 L 102 110 L 78 110 Z" fill="#222" stroke="#B08D57" strokeWidth="1" />
                </g>

                {/* Animated Arms Moving with the Fabric */}
                <motion.path
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                  d="M 76 72 Q 110 85 135 90"
                  stroke="#F3C6A5"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Vintage Sewing Machine Body */}
                <path
                  d="M 140 110 L 220 110 L 220 100 L 205 100 L 205 60 L 150 60 L 150 75 L 140 75 Z"
                  fill="#1A1A1A"
                  stroke="#B08D57"
                  strokeWidth="1.5"
                />
                {/* Brass Wheel */}
                <circle cx="212" cy="75" r="10" stroke="#B08D57" strokeWidth="2" fill="#222" />

                {/* Bouncing Needle Animation */}
                <motion.line
                  x1="155"
                  y1="75"
                  x2="155"
                  y2="92"
                  stroke="#FFF"
                  strokeWidth="2"
                  animate={{ y1: [75, 82, 75], y2: [92, 97, 92] }}
                  transition={{ repeat: Infinity, duration: 0.15 }}
                />

                {/* Golden Thread Feed */}
                <path d="M 212 65 Q 180 40 155 75" stroke="#B08D57" strokeWidth="1" fill="none" strokeDasharray="2 2" />

                {/* Stitched Fabric Table Base */}
                <line x1="50" y1="110" x2="250" y2="110" stroke="#333" strokeWidth="4" />
              </svg>
            </div>

            {/* Live Thread Stitching Animation for Brand Signature */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="font-mono-stitch text-[9px] tracking-[0.2em] uppercase text-white/40 block mb-2">
                Thread Progress: Crafting Identity
              </span>

              {/* Animated SVG Path for Logo/Signature */}
              <svg viewBox="0 0 400 60" className="w-full h-12">
                <motion.path
                  d="M 20 30 Q 60 5, 100 30 T 180 30 T 260 30 T 340 30 L 380 30"
                  fill="none"
                  stroke="#B08D57"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <text x="50%" y="35" textAnchor="middle" fill="#FFF" className="font-display text-lg tracking-widest uppercase opacity-90">
                  STITCH STUDIO
                </text>
              </svg>
            </div>

            <p className="font-sans-stitch text-xs text-white/60 mt-2">
              Every stitch is placed with precision on our floor.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}