"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Act6Quiz({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.39, 0.415, 0.46, 0.48], [0, 1, 1, 0]);
  const sceneScale = useTransform(progress, [0.39, 0.475], [0.85, 1.05]);
  const sceneZ = useTransform(progress, [0.39, 0.475], [200, -100]);

  return (
    <motion.div 
      style={{ opacity, scale: sceneScale, translateZ: sceneZ }} 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-60"
    >
      <div className="relative z-20 text-center mb-12">
        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight text-white leading-tight drop-shadow-2xl">
          Test your knowledge <span className="text-brand-cyan">instantly.</span>
        </h2>
      </div>

      <div className="w-full max-w-2xl bg-black/50 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(6,182,212,0.15)] pointer-events-auto">
        <div className="flex items-center justify-between mb-8">
          <span className="text-brand-cyan text-sm font-bold tracking-widest uppercase">Question 4 of 10</span>
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
        </div>

        <div className="text-xl md:text-2xl text-white font-medium mb-10 leading-snug">
          Which machine learning technique is best suited for predicting continuous numerical values?
        </div>

        <div className="space-y-4">
          {[
            { text: "Logistic Regression", correct: false, range: [0.41, 0.42] },
            { text: "K-Means Clustering", correct: false, range: [0.415, 0.425] },
            { text: "Linear Regression", correct: true, range: [0.42, 0.43] },
            { text: "Decision Tree Classification", correct: false, range: [0.425, 0.435] },
          ].map((opt, i) => {
            const optOpacity = useTransform(progress, opt.range, [0, 1]);
            const optX = useTransform(progress, opt.range, [30, 0]);
            const glowActive = opt.correct ? useTransform(progress, [0.435, 0.445], [0, 1]) : 0;

            return (
              <motion.div key={i} style={{ opacity: optOpacity, x: optX }} className="relative">
                <motion.div 
                  style={{ opacity: glowActive }}
                  className="absolute inset-0 bg-brand-cyan/20 border-brand-cyan rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                />
                <div className={`relative px-6 py-4 rounded-xl border flex items-center gap-4 transition-all ${opt.correct ? 'border-brand-cyan/50 bg-brand-cyan/10' : 'border-white/10 bg-white/5'}`}>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${opt.correct ? 'border-brand-cyan bg-brand-cyan' : 'border-white/20'}`}>
                    {opt.correct && <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <span className={`text-lg ${opt.correct ? 'text-white' : 'text-neutral-300'}`}>{opt.text}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
