"use client";

import { useScroll, useMotionValueEvent, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Act1Problem from "./Act1Problem";
import Act2Shift from "./Act2Shift";

import Act4Transformation from "./Act4Transformation";
import Act5Flashcards from "./Act5Flashcards";
import Act6Quiz from "./Act6Quiz";
import Act8Pipeline from "./Act8Pipeline";
import Act9Guarantee from "./Act9Guarantee";
import Act10Mission from "./Act10Mission";
import Act11Features from "./Act11Features";
import Act12CTA from "./Act12CTA";

export default function CinematicTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Automatically pushing to login is disabled so users can read the final CTA.
  });

  // Global Animated Card Transforms
  // Global Animated Card Transforms
  // Spawns instantly at 0.14 (when the 4 cards in Act 2 perfectly merge)
  const cardOpacity = useTransform(scrollYProgress, [0.139, 0.14, 0.31, 0.325], [0, 1, 1, 0]);
  
  // Translation (circular motion sideways and downwards to avoid text)
  const cardX = useTransform(scrollYProgress, [0.14, 0.18, 0.22], [0, 400, 0]);
  const cardY = useTransform(scrollYProgress, [0.14, 0.18, 0.22, 0.25], [0, 300, 80, 80]);
  const cardZ = useTransform(scrollYProgress, [0.14, 0.18, 0.22], [-78, 300, 0]);
  
  // Swirl Rotation & Flip
  const cardRotateZ = useTransform(scrollYProgress, [0.14, 0.18, 0.22], [0, 45, 0]);
  const cardRotateY = useTransform(scrollYProgress, [0.14, 0.22], [0, 180]);
  
  // Front Face Color Transition (Bright white to dark black)
  const frontBgColor = useTransform(scrollYProgress, [0.14, 0.19], ["rgba(255,255,255,0.1)", "rgba(0,0,0,0.9)"]);
  const frontBorderColor = useTransform(scrollYProgress, [0.14, 0.19], ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.05)"]);
  
  // Text Reveal during Scan (Overlay that shrinks from 100% to 0% height)
  const overlayHeight = useTransform(scrollYProgress, [0.25, 0.30], ["100%", "0%"]);
  
  // Scale (starts at 1 (w-48), grows to 1.333 to match Act4's w-64)
  const cardScale = useTransform(scrollYProgress, [0.14, 0.18, 0.22], [1, 1.15, 1.333]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "1300vh", background: "#050505" }}>
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden" style={{ perspective: "1200px" }}>
        
        {/* Global Ambient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-blue/10 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-purple/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        {/* Global Swirling Card */}
        <motion.div
          style={{
            opacity: cardOpacity,
            x: cardX,
            y: cardY,
            translateZ: cardZ,
            rotateZ: cardRotateZ,
            rotateY: cardRotateY,
            scale: cardScale,
            transformStyle: "preserve-3d"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 z-30"
        >
          {/* Front Face (Dashed Note from Act 2) */}
          <motion.div 
            className="absolute inset-0 rounded-xl backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.1)] flex flex-col p-4 border"
            style={{ 
              backgroundColor: frontBgColor, 
              borderColor: frontBorderColor,
              backfaceVisibility: "hidden", 
              WebkitBackfaceVisibility: "hidden" 
            }}
          >
            <div className="w-full h-full border border-dashed border-white/20 rounded-lg flex items-center justify-center bg-black/50">
              <svg className="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </motion.div>

          {/* Back Face (Cellular Biology PDF from Act 4) */}
          <div 
            className="absolute inset-0 bg-black/90 border border-white/20 rounded-xl shadow-[0_0_50px_rgba(255,255,255,0.05)] p-4 flex flex-col justify-center items-center text-center backdrop-blur-xl overflow-hidden"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            {/* The Text Content */}
            <div className="relative w-full flex flex-col items-center">
              <div className="text-white font-bold text-[15px] mb-3 border-b border-white/10 pb-2 w-full">Cellular Biology</div>
              <div className="text-neutral-300 text-[10.5px] mb-3 leading-relaxed font-medium">Cells are the basic structural and functional units of all living organisms.</div>
              <div className="text-neutral-300 text-[10.5px] leading-relaxed font-medium">The mitochondria generates most of the cell's supply of ATP, used as chemical energy.</div>
              <div className="text-neutral-300 text-[10.5px] mt-2 leading-relaxed font-medium text-brand-cyan/80">Extracting key concepts...</div>
              
              {/* The Reveal Overlay */}
              <motion.div 
                style={{ height: overlayHeight }} 
                className="absolute bottom-0 left-0 right-0 bg-[#000000] z-10"
              />
            </div>
          </div>
        </motion.div>

        {/* Cinematic Acts Overlay */}
        <Act1Problem progress={scrollYProgress} />
        <Act2Shift progress={scrollYProgress} />

        <Act4Transformation progress={scrollYProgress} />
        <Act5Flashcards progress={scrollYProgress} />
        <Act6Quiz progress={scrollYProgress} />
        
        <Act8Pipeline progress={scrollYProgress} />
        <Act9Guarantee progress={scrollYProgress} />
        <Act10Mission progress={scrollYProgress} />
        <Act11Features progress={scrollYProgress} />
        
        <Act12CTA progress={scrollYProgress} />

      </div>

      {/* Invisible Snap Targets */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[0, 0.08, 0.24, 0.35, 0.42, 0.54, 0.67, 0.80, 0.90, 1].map((snap, i) => (
          <div 
            key={i} 
            style={{ 
              position: 'absolute', 
              top: `${snap * 100}%`, 
              height: '100px', 
              scrollSnapAlign: 'start' 
            }} 
          />
        ))}
      </div>
    </div>
  );
}
