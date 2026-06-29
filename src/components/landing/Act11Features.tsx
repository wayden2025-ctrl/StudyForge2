"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Act11Features({ progress }: { progress: MotionValue<number> }) {
  // Visible from 0.86 to 0.96
  const opacity = useTransform(progress, [0.86, 0.87, 0.95, 0.97], [0, 1, 1, 0]);
  const sceneZ = useTransform(progress, [0.86, 0.97], [300, -200]);

  const features = [
    { title: "3D Flashcards", desc: "Auto-generated flip cards. Swipe to study, track what sticks.", icon: "M12 4v16M2 12h20", color: "text-brand-purple", bg: "bg-brand-purple/10 border-brand-purple/20" },
    { title: "Adaptive Quizzes", desc: "Multiple choice adjusted to your weak spots in real time.", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", color: "text-brand-blue", bg: "bg-brand-blue/10 border-brand-blue/20" },
    { title: "Smart Summaries", desc: "Dense material condensed into digestible outlines.", icon: "M21 10H3M21 6H3M21 14H3M21 18H11", color: "text-brand-cyan", bg: "bg-brand-cyan/10 border-brand-cyan/20" },
    { title: "Spaced Repetition", desc: "Cards resurface right before you'd forget them.", icon: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15", color: "text-brand-purple", bg: "bg-brand-purple/10 border-brand-purple/20" },
    { title: "Progress Analytics", desc: "See exactly where you're strong and where gaps exist.", icon: "M18 20V10M12 20V4M6 20v-6", color: "text-brand-blue", bg: "bg-brand-blue/10 border-brand-blue/20" },
    { title: "Private & Secure", desc: "Your notes never train our models. Encrypted & yours.", icon: "M7 11V7a5 5 0 0110 0v4 M3 11h18v11H3z", color: "text-brand-cyan", bg: "bg-brand-cyan/10 border-brand-cyan/20" },
  ];

  return (
    <motion.div 
      style={{ opacity, translateZ: sceneZ }} 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-60 px-8"
    >
      <div className="text-center mb-16 relative z-20">
        <span className="text-brand-cyan text-sm font-bold tracking-[0.2em] uppercase mb-4 block">What you get</span>
        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight text-white leading-tight drop-shadow-2xl">
          Everything you need.<br/>
          <span className="text-neutral-500">Nothing you don't.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {features.map((f, i) => {
          // Stagger the fly-in
          const start = 0.86 + (i * 0.005);
          const fOpacity = useTransform(progress, [start, start + 0.02], [0, 1]);
          const fY = useTransform(progress, [start, start + 0.03], [50, 0]);

          return (
            <motion.div 
              key={i}
              style={{ opacity: fOpacity, y: fY }}
              className="bg-black/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${f.bg}`}>
                <svg className={`w-6 h-6 ${f.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={f.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
