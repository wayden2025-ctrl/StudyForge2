"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import Link from "next/link";

export default function Act7CTA({ progress }: { progress: MotionValue<number> }) {
  // Visible from 0.92 to 1.0
  const opacity = useTransform(progress, [0.90, 0.95], [0, 1]);
  const y = useTransform(progress, [0.90, 0.98], [50, 0]);

  return (
    <motion.div 
      style={{ opacity, y }} 
      className="absolute inset-0 flex flex-col items-center justify-center z-70 bg-black/40 backdrop-blur-[2px]"
    >
      <div className="relative z-20 text-center flex flex-col items-center">
        {/* Calm Glowing Orb */}
        <motion.div 
          animate={{ rotateZ: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-purple/20 via-brand-cyan/10 to-transparent blur-[100px] rounded-full pointer-events-none"
        />

        <h2 className="text-[clamp(3rem,8vw,7.5rem)] font-extrabold tracking-tighter text-white leading-none mb-6 relative z-10 drop-shadow-2xl">
          Start learning<br/>differently.
        </h2>
        <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide max-w-xl mx-auto mb-12 relative z-10">
          Turn your notes into mastery in seconds.
        </p>

        <Link 
          href="/app" 
          className="relative z-10 group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          Upload Your First PDF
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      </div>
    </motion.div>
  );
}
