"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Act8Pipeline({ progress }: { progress: MotionValue<number> }) {
  // Visible from 0.46 to 0.62
  const opacity = useTransform(progress, [0.46, 0.48, 0.6, 0.62], [0, 1, 1, 0]);
  
  // Pipeline progression
  const rawInputOpacity = useTransform(progress, [0.47, 0.49, 0.54, 0.55], [0, 1, 1, 0.3]);
  const forgeOpacity = useTransform(progress, [0.51, 0.53, 0.57, 0.58], [0.3, 1, 1, 0.3]);
  const masteryOpacity = useTransform(progress, [0.55, 0.57, 0.6, 0.62], [0.3, 1, 1, 1]);

  const sceneZ = useTransform(progress, [0.46, 0.62], [300, -200]);

  return (
    <motion.div 
      style={{ opacity, translateZ: sceneZ }} 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50"
    >
      <div className="text-center mb-20 relative z-20">
        <span className="text-brand-purple text-sm font-bold tracking-[0.2em] uppercase mb-4 block">How it works</span>
        <h2 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-tight text-white leading-tight">
          How the magic happens
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full px-8 relative z-20">
        {/* Step 1: Raw Input */}
        <motion.div style={{ opacity: rawInputOpacity }} className="flex-1 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <svg className="w-10 h-10 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Raw input</h3>
          <p className="text-neutral-400 leading-relaxed">Dump your notes, PDFs, or slides. Any format, any subject &mdash; no cleanup needed.</p>
        </motion.div>

        {/* Arrow */}
        <div className="text-white/20 hidden md:block">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </div>

        {/* Step 2: AI Forge */}
        <motion.div style={{ opacity: forgeOpacity }} className="flex-1 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
            <svg className="w-10 h-10 text-brand-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">AI forge</h3>
          <p className="text-neutral-400 leading-relaxed">Our models extract key concepts and build relationships between ideas automatically.</p>
        </motion.div>

        {/* Arrow */}
        <div className="text-white/20 hidden md:block">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </div>

        {/* Step 3: Mastery */}
        <motion.div style={{ opacity: masteryOpacity }} className="flex-1 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
            <svg className="w-10 h-10 text-brand-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Mastery</h3>
          <p className="text-neutral-400 leading-relaxed">Flip 3D flashcards, ace adaptive quizzes, and watch knowledge solidify.</p>
        </motion.div>
      </div>

    </motion.div>
  );
}
