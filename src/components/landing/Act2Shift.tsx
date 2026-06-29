"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Act2Shift({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.06, 0.1, 0.14, 0.175], [0, 1, 1, 0]);
  const z = useTransform(progress, [0.06, 0.175], [200, -200]);
  const glowOpacity = useTransform(progress, [0.075, 0.125], [0, 1]);
  const scale = useTransform(progress, [0.06, 0.125], [0.8, 1]);

  return (
    <motion.div 
      style={{ opacity, translateZ: z, scale }} 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
    >
      <div className="relative z-10 text-center">
        <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-tight text-white leading-tight mb-6">
          What if your notes<br/>could study <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">themselves?</span>
        </h2>
      </div>

      <motion.div 
        style={{ opacity: glowOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/20 blur-[150px] rounded-full z-0"
      />
      
      <div className="absolute inset-0 z-0">
        {[...Array(4)].map((_, i) => {
          const xMove = useTransform(progress, [0.06, 0.14], [i % 2 === 0 ? -500 : 500, 0]);
          const yMove = useTransform(progress, [0.06, 0.14], [i < 2 ? -400 : 400, 0]);
          const rotate = useTransform(progress, [0.06, 0.14], [i * 45, 0]);
          
          return (
            <motion.div
              key={i}
              style={{ x: xMove, y: yMove, rotateZ: rotate }}
              className="absolute top-1/2 left-1/2 -ml-24 -mt-32 w-48 h-64 bg-white/10 border border-white/20 rounded-xl backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.1)] flex flex-col p-4"
            >
              <div className="w-full h-full border border-dashed border-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
