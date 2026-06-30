"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Act4Transformation({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.2, 0.225, 0.34, 0.375], [0, 1, 1, 0]);
  
  const titleUploadOpacity = useTransform(progress, [0.21, 0.225, 0.24, 0.25], [0, 1, 1, 0.3]);
  const titleUnderstandOpacity = useTransform(progress, [0.25, 0.26, 0.29, 0.3], [0.3, 1, 1, 0.3]);
  const titleLearnOpacity = useTransform(progress, [0.3, 0.31, 0.34, 0.35], [0.3, 1, 1, 1]);

  const pdfY = useTransform(progress, [0.21, 0.25], [-500, 0]);
  const pdfOpacity = useTransform(progress, [0.21, 0.225, 0.3, 0.31], [0, 1, 1, 0]);

  const scanY = useTransform(progress, [0.25, 0.3], ["-10%", "110%"]);
  const scanOpacity = useTransform(progress, [0.24, 0.25, 0.29, 0.3], [0, 1, 1, 0]);
  const particleScale = useTransform(progress, [0.29, 0.31], [0, 2]);
  const particleOpacity = useTransform(progress, [0.29, 0.3, 0.31, 0.325], [0, 1, 1, 0]);

  const cardsY = useTransform(progress, [0.3, 0.325], [100, 0]);
  const cardsOpacity = useTransform(progress, [0.3, 0.325], [0, 1]);
  const cardsScale = useTransform(progress, [0.3, 0.325, 0.375], [0.8, 1, 1.2]);

  return (
    <motion.div 
      style={{ opacity }} 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-40"
    >
      <div className="absolute top-32 flex items-center gap-6 text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight">
        <motion.span style={{ opacity: titleUploadOpacity }} className="text-white">Upload</motion.span>
        <span className="text-neutral-700">&rarr;</span>
        <motion.span style={{ opacity: titleUnderstandOpacity }} className="text-white">Understand</motion.span>
        <span className="text-neutral-700">&rarr;</span>
        <motion.span style={{ opacity: titleLearnOpacity }} className="text-brand-cyan">Learn</motion.span>
      </div>

      <div className="relative w-[500px] h-[500px] flex items-center justify-center mt-20">
        
        <motion.div
          style={{ y: pdfY, opacity: pdfOpacity }}
          className="absolute w-64 h-80 flex flex-col justify-center items-center text-center z-50"
        >

          <motion.div
            style={{ top: scanY, opacity: scanOpacity }}
            className="absolute left-[-10%] w-[120%] h-[4px] bg-brand-cyan shadow-[0_0_20px_4px_#06b6d4] rounded-full z-10"
          />
        </motion.div>

        <motion.div
          style={{ scale: particleScale, opacity: particleOpacity }}
          className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(6,182,212,0.8)_0%,transparent_60%)] rounded-full mix-blend-screen"
        />

        <motion.div
          style={{ y: cardsY, opacity: cardsOpacity, scale: cardsScale }}
          className="absolute flex gap-6"
        >
          <div className="w-48 h-64 bg-black/80 border border-brand-purple/50 rounded-2xl p-4 shadow-[0_0_40px_rgba(168,85,247,0.2)] backdrop-blur-xl flex flex-col justify-center items-center text-center">
            <span className="text-brand-purple text-xs font-bold tracking-widest uppercase mb-2">Flashcard</span>
            <div className="w-full h-[1px] bg-white/10 mb-4" />
            <span className="text-white text-lg font-medium leading-snug">What is the powerhouse of the cell?</span>
            <div className="mt-4 px-3 py-1 rounded-full bg-brand-purple/20 text-brand-purple text-xs font-medium">Mitochondria</div>
          </div>
          
          <div className="w-48 h-64 bg-black/80 border border-brand-cyan/50 rounded-2xl p-4 shadow-[0_0_40px_rgba(6,182,212,0.2)] backdrop-blur-xl flex flex-col">
            <span className="text-brand-cyan text-xs font-bold tracking-widest uppercase mb-4 text-center">Quiz</span>
            <span className="text-white text-sm font-medium mb-3">Which organelle produces ATP?</span>
            <div className="space-y-2 mt-auto">
              <div className="w-full text-xs text-white/50 p-2 border border-white/20 rounded-lg bg-white/5">Nucleus</div>
              <div className="w-full text-xs text-white p-2 border border-brand-cyan rounded-lg bg-brand-cyan/20 flex justify-between">Mitochondria <span className="text-brand-cyan">✓</span></div>
              <div className="w-full text-xs text-white/50 p-2 border border-white/20 rounded-lg bg-white/5">Ribosome</div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
