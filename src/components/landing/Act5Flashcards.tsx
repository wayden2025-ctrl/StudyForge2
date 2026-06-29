"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Act5Flashcards({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.325, 0.35, 0.4, 0.425], [0, 1, 1, 0]);
  const sceneY = useTransform(progress, [0.325, 0.425], [100, -200]);

  return (
    <motion.div 
      style={{ opacity, y: sceneY }} 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50"
    >
      <div className="relative z-20 text-center mb-16 mt-[-100px]">
        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight text-white leading-tight">
          Flashcards,<br/>generated <span className="text-brand-purple">instantly.</span>
        </h2>
      </div>

      <div className="relative w-[800px] h-[400px] flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        {[...Array(5)].map((_, i) => {
          const depth = i - 2; 
          const yOffset = useTransform(
            progress, 
            [0.325, 0.425], 
            [depth * 80 + 200, depth * -80 - 200]
          );
          
          const zOffset = depth * -150;
          const rotateY = depth * 15;
          const rotateX = depth * 5 + 10;
          
          const scale = useTransform(progress, [0.325, 0.375, 0.425], [0.8, 1, 0.8]);

          return (
            <motion.div
              key={i}
              style={{
                y: yOffset,
                z: zOffset,
                rotateY,
                rotateX,
                scale,
                x: depth * 120,
              }}
              className="absolute w-64 h-80 bg-black/80 border border-white/20 rounded-2xl p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center pointer-events-auto cursor-pointer group transition-colors hover:border-brand-purple hover:bg-black/90"
            >
              <span className="text-brand-purple text-xs font-bold tracking-widest uppercase mb-auto">Question</span>
              
              <div className="w-full text-center space-y-3">
                <div className="w-full h-3 bg-white/20 rounded-full" />
                <div className="w-5/6 h-3 bg-white/20 rounded-full mx-auto" />
                <div className="w-2/3 h-3 bg-white/20 rounded-full mx-auto" />
              </div>

              <div className="mt-auto pt-6 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center border-t border-white/10">
                <span className="text-brand-cyan text-sm font-medium">Click to reveal</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
