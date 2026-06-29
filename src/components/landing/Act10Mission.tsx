"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Act10Mission({ progress }: { progress: MotionValue<number> }) {
  // Visible from 0.74 to 0.88
  const opacity = useTransform(progress, [0.74, 0.75, 0.86, 0.88], [0, 1, 1, 0]);
  
  const text1Opacity = useTransform(progress, [0.75, 0.76, 0.78, 0.79], [0, 1, 1, 0]);
  const text2Opacity = useTransform(progress, [0.79, 0.80, 0.82, 0.83], [0, 1, 1, 0]);
  const text3Opacity = useTransform(progress, [0.83, 0.84, 0.86, 0.87], [0, 1, 1, 0]);

  const text1Y = useTransform(progress, [0.75, 0.79], [50, -50]);
  const text2Y = useTransform(progress, [0.79, 0.83], [50, -50]);
  const text3Y = useTransform(progress, [0.83, 0.87], [50, -50]);

  return (
    <motion.div 
      style={{ opacity }} 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50 px-8"
    >
      <div className="absolute top-32 text-center w-full">
        <span className="text-white/30 text-sm font-bold tracking-[0.3em] uppercase block">Our Mission</span>
      </div>

      <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute max-w-4xl text-center">
        <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-white leading-tight">
          The traditional education system is <span className="text-red-400">broken</span> when it comes to studying.
        </h3>
        <p className="text-xl text-neutral-400 mt-6">
          You're expected to spend 80% of your time organizing information, leaving only 20% of your time to actually memorize it.
        </p>
      </motion.div>

      <motion.div style={{ opacity: text2Opacity, y: text2Y }} className="absolute max-w-4xl text-center">
        <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-white leading-tight">
          You shouldn't have to spend hours copying definitions.
        </h3>
        <p className="text-xl text-neutral-400 mt-6">
          We automate the busywork so you can jump straight into the learning phase. Science proves that active recall is the only guaranteed way to memorize.
        </p>
      </motion.div>

      <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute max-w-4xl text-center">
        <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-white leading-tight">
          StudyForge was built to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">flip the ratio.</span>
        </h3>
        <p className="text-xl text-neutral-400 mt-6">
          Study faster, stress less, and actually get the grades you deserve.
        </p>
      </motion.div>

    </motion.div>
  );
}
