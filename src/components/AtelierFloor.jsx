import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Image } from '@/components/ui/image';
import StitchMachine3D from './StitchMachine3D';

const VIDEO_POSTER =
  'https://media.base44.com/images/public/6aa4252f63cd2cf7a693af44/014ee91dc_generated_image.png';

export default function AtelierFloor() {
  return (
    <section
      id="atelier"
      className="px-6 sm:px-10 py-24 sm:py-32 max-w-[120rem] mx-auto"
      aria-label="From the atelier floor"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
        <div>
          <span className="font-mono-stitch text-[10px] tracking-[0.35em] uppercase text-white/40">
            Section 01
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl tracking-tight text-white">
            From the atelier floor
          </h2>
        </div>
        <p className="text-white/60 font-sans-stitch text-lg leading-relaxed self-end">
          A live 3D study of the machine at the heart of the studio — fabric feeding, needle
          bobbing, stitches forming in real time. The machine, running.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* 3D panel */}
        <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 bg-[#0a0a0a]">
          <StitchMachine3D />
          <div
            className="absolute top-4 left-4 font-mono-stitch text-[10px] tracking-[0.3em] uppercase text-white/50 flex items-center gap-2"
            aria-hidden="true"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] animate-pulse" /> Live — 3D
            study
          </div>
          <div
            className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none"
            aria-hidden="true"
          >
            <span className="font-display text-2xl text-white">The machine, running.</span>
            <span className="font-mono-stitch text-[10px] tracking-[0.25em] uppercase text-[#B08D57]">
              Let's sew →
            </span>
          </div>
        </div>

        {/* Video poster / play button */}
        {/* FIX: Added type="button" and accessible label to play button */}
        <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 bg-[#111] group cursor-pointer">
          <Image
            src={VIDEO_POSTER}
            alt="Live from the Stitch Studio atelier floor"
            className="absolute inset-0 w-full h-full transition-transform duration-[1.2s] group-hover:scale-105"
            fittingType="fill"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-transparent to-transparent pointer-events-none" />
          <button
            type="button"
            aria-label="Play atelier floor video"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-[#B08D57] group-hover:border-[#B08D57] transition-colors">
              <Play className="w-6 h-6 text-white ml-1" fill="currentColor" aria-hidden="true" />
            </div>
          </button>
          <div
            className="absolute top-4 left-4 font-mono-stitch text-[10px] tracking-[0.3em] uppercase text-white/60 flex items-center gap-2 pointer-events-none"
            aria-hidden="true"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live — atelier
            floor
          </div>
          <div className="absolute bottom-4 left-4 right-4 pointer-events-none" aria-hidden="true">
            <span className="font-display text-2xl text-white">From the atelier floor</span>
            <p className="mt-1 text-sm text-white/60 font-sans-stitch">
              A live-breathing look at the machines, hands and fabric behind every run.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
