import { motion } from 'framer-motion';

export default function Manifesto() {
  return (
    <section
      className="px-6 sm:px-10 py-20 max-w-[120rem] mx-auto border-y border-white/10"
      aria-label="Manifesto"
    >
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="font-display text-3xl sm:text-5xl font-light leading-tight text-white max-w-4xl"
      >
        We deal in all kinds —{' '}
        <em className="not-italic italic text-[#B08D57]">Men, Women, and Kids.</em> Excellence
        across every scale.
      </motion.h2>
    </section>
  );
}
