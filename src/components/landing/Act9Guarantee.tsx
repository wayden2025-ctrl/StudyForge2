"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Act9Guarantee({ progress }: { progress: MotionValue<number> }) {
  // Visible from 0.61 to 0.75
  const opacity = useTransform(progress, [0.61, 0.63, 0.73, 0.75], [0, 1, 1, 0]);
  const yMove = useTransform(progress, [0.61, 0.75], [200, -200]);
  const scale = useTransform(progress, [0.61, 0.75], [0.9, 1.1]);

  return (
    <motion.div 
      style={{ opacity, y: yMove, scale }} 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50"
    >
      <div className="text-center relative z-20">
        <span className="text-brand-cyan text-sm font-bold tracking-[0.2em] uppercase mb-6 block">Results</span>
        <h2 className="text-[clamp(3rem,8vw,7rem)] font-extrabold tracking-tighter text-white leading-none mb-8">
          Stop guessing.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Start guaranteeing.</span>
        </h2>
        <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
          Active recall and spaced repetition are the most effective learning methods ever studied. We automate their creation so you never waste time prepping again.
        </p>
      </div>

      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
        {/* Background decorative chart bars */}
        <div className="flex items-end gap-6 h-[60vh] mt-[20vh]">
          <div className="w-16 bg-red-500/50 rounded-t-lg h-[20%]" />
          <div className="w-16 bg-orange-500/50 rounded-t-lg h-[30%]" />
          <div className="w-16 bg-yellow-500/50 rounded-t-lg h-[45%]" />
          <div className="w-16 bg-brand-cyan/50 rounded-t-lg h-[75%] shadow-[0_0_50px_rgba(6,182,212,0.8)]" />
          <div className="w-16 bg-brand-purple/50 rounded-t-lg h-[100%] shadow-[0_0_80px_rgba(168,85,247,0.8)]" />
        </div>
      </div>
    </motion.div>
  );
}
