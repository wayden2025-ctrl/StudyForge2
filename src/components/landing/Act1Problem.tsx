"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Act1Problem({ progress }: { progress: MotionValue<number> }) {
  // Fade in at 0, stay visible until 0.12, fade out completely by 0.18
  const opacity = useTransform(progress, [0, 0.12, 0.18], [1, 1, 0]);
  
  // As user scrolls, push the entire scene back slightly
  const z = useTransform(progress, [0, 0.18], [0, -400]);

  return (
    <motion.div 
      style={{ opacity, translateZ: z }} 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
    >
      <div className="relative z-10 text-center">
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-extrabold tracking-tighter text-white leading-none mb-6">
          Studying is broken.
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide max-w-2xl mx-auto">
          Students waste hours rewriting notes and memorizing inefficiently.
        </p>
      </div>

      {/* Scattered Papers Layer */}
      <div className="absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => {
          // Different scroll behaviors for parallax
          const yMove = useTransform(progress, [0, 0.18], [0, (i % 2 === 0 ? -200 : 200) + i * 50]);
          const rotate = useTransform(progress, [0, 0.18], [i * 15 - 30, (i * 15 - 30) + (i % 2 === 0 ? 45 : -45)]);
          
          return (
            <motion.div
              key={i}
              style={{
                y: yMove,
                rotateZ: rotate,
                left: `${15 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              className="absolute w-48 h-64 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md shadow-2xl flex flex-col p-4 opacity-40"
            >
              <div className="w-3/4 h-2 bg-white/20 rounded-full mb-4" />
              <div className="w-full h-1.5 bg-white/10 rounded-full mb-2" />
              <div className="w-5/6 h-1.5 bg-white/10 rounded-full mb-2" />
              <div className="w-full h-1.5 bg-white/10 rounded-full mb-2" />
              <div className="w-2/3 h-1.5 bg-white/10 rounded-full mb-2" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
