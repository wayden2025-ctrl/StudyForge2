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
          This is <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">Notiq AI.</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-neutral-400 font-light mb-12">
          A tool built to help you succeed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 scale-110 mt-6 mb-10">
          <Link 
            href="/signup" 
            className="nav-cta-btn shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span>Start Free</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
          
          <Link 
            href="/login" 
            className="nav-signin-btn"
          >
            Sign In
          </Link>
        </div>

        <p className="mt-12 text-neutral-400 font-medium text-lg tracking-wide">
          No credit card required. Cancel anytime.
        </p>
      </div>
    </motion.div>
  );
}
