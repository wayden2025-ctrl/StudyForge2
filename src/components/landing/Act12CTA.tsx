"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import Link from "next/link";

export default function Act12CTA({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.95, 0.97], [0, 1]);
  const scale = useTransform(progress, [0.95, 1], [0.8, 1]);

  return (
    <motion.div 
      style={{ opacity, scale }} 
      className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-auto bg-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15),transparent_60%)]" />

      <div className="relative z-10 text-center max-w-4xl px-4">
        <h2 className="text-[clamp(3.5rem,8vw,7rem)] font-extrabold tracking-tighter text-white leading-none mb-8">
          Start learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">differently.</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-neutral-400 font-light mb-12">
          Join thousands of students who have already flipped the ratio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/app"
            className="group relative px-8 py-4 bg-white text-black text-lg font-bold rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-0 group-hover:opacity-20 transition-opacity" />
            Start for free &rarr;
          </Link>
          
          <Link 
            href="/login"
            className="px-8 py-4 bg-black/50 backdrop-blur-xl text-white text-lg font-semibold rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            Sign In
          </Link>
        </div>

        <p className="mt-8 text-neutral-500 text-sm">
          No credit card required. Cancel anytime.
        </p>
      </div>
    </motion.div>
  );
}
