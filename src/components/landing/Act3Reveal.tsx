"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Act3Reveal({ progress }: { progress: MotionValue<number> }) {
  // Fade in at 0.28, hold until 0.42, fade out by 0.5
  const opacity = useTransform(progress, [0.28, 0.35, 0.42, 0.5], [0, 1, 1, 0]);
  
  // Product comes from deep Z-axis to foreground
  const z = useTransform(progress, [0.28, 0.5], [400, -200]);
  const blur = useTransform(progress, [0.28, 0.35], ["blur(20px)", "blur(0px)"]);

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

      {/* Glowing Product Core */}
      <div className="relative flex items-center justify-center mt-8">
        {/* Under-glow platform */}
        <motion.div 
          animate={{ rotateX: 60, rotateZ: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[400px] h-[400px] rounded-full border border-brand-cyan/30 shadow-[0_0_80px_rgba(6,182,212,0.2)] bg-brand-cyan/5"
        />
        
        {/* Floating Product UI Box */}
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-[340px] h-[420px] bg-black/60 border border-white/20 rounded-3xl backdrop-blur-2xl shadow-2xl p-6 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Inner scan effect */}
          <motion.div 
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[2px] bg-brand-cyan shadow-[0_0_15px_#06b6d4] z-20"
          />
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <div className="w-3/4 h-3 bg-white/20 rounded-full mb-3" />
          <div className="w-1/2 h-3 bg-white/10 rounded-full mb-8" />
          
          <div className="flex gap-2 w-full mt-auto">
            <div className="flex-1 h-20 bg-white/5 rounded-xl border border-white/10" />
            <div className="flex-1 h-20 bg-white/5 rounded-xl border border-white/10" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
