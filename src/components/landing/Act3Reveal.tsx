"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Act3Reveal({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.14, 0.175, 0.21, 0.25], [0, 1, 1, 0]);
  const z = useTransform(progress, [0.14, 0.25], [400, -200]);
  const blur = useTransform(progress, [0.14, 0.175], ["blur(20px)", "blur(0px)"]);

  return (
    <motion.div 
      style={{ opacity, translateZ: z, filter: blur }} 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30"
    >
      <div className="relative z-20 text-center mb-16">
        <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-extrabold tracking-tighter text-white leading-none mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          AI Study Converter
        </h2>
        <p className="text-xl md:text-3xl text-neutral-300 font-light tracking-wide">
          Turn PDFs into Flashcards & Quizzes instantly.
        </p>
      </div>

      <div className="relative flex flex-col items-center justify-end mt-8 h-[400px]">
        {/* Central card upright */}
        <motion.div
          className="w-48 h-64 bg-white/10 border border-white/20 rounded-xl shadow-lg mb-4"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        {/* Fan‑out cards below, rotating left */}
        <motion.div
          className="relative w-full h-full"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => {
            const verticalOffset = (i + 1) * 30;
            const rotateDeg = -(i + 1) * 10;
            return (
              <motion.div
                key={i}
                className="absolute w-48 h-64 bg-white/10 border border-white/20 rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.95, y: -50, rotate: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: verticalOffset,
                  rotate: rotateDeg,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: (i + 1) * 0.07 }}
              />
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
