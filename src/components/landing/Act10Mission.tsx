"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Act10Mission({ progress }: { progress: MotionValue<number> }) {
  // Visible from 0.73 to 0.88
  const opacity = useTransform(progress, [0.73, 0.74, 0.86, 0.88], [0, 1, 1, 0]);
  const zLayer = useTransform(progress, [0.73, 0.88], [200, -200]);

  return (
    <motion.div 
      style={{ opacity, translateZ: zLayer }} 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-40"
    >
      <div className="flex gap-8 items-center justify-center w-full max-w-6xl px-8" style={{ perspective: "1500px" }}>
        
        {/* Card 1: Pops 0.74-0.755, Holds 0.755-0.775, Returns 0.775-0.79 */}
        <MissionCard 
          progress={progress} 
          range={[0.74, 0.755, 0.775, 0.79]} 
          xOffset={352}
          title="The System"
          subtitle="Status Quo"
          text="The traditional education system focuses on <span class='text-brand-purple font-bold'>rote memorization</span> over true mastery."
        />

        {/* Card 2: Pops 0.78-0.795, Holds 0.795-0.815, Returns 0.815-0.83 */}
        <MissionCard 
          progress={progress} 
          range={[0.78, 0.795, 0.815, 0.83]} 
          xOffset={0}
          title="The Waste"
          subtitle="The Problem"
          text="You shouldn't have to spend hours <span class='text-brand-blue font-bold'>copying notes manually</span> instead of actually learning."
        />

        {/* Card 3: Pops 0.82-0.835, Holds 0.835-0.855, Returns 0.855-0.87 */}
        <MissionCard 
          progress={progress} 
          range={[0.82, 0.835, 0.855, 0.87]} 
          xOffset={-352}
          title="The Flip"
          subtitle="Our Solution"
          text="Study Forge was built to flip the ratio: <span class='text-brand-cyan font-bold'>less busywork, more deep understanding.</span>"
        />

      </div>
    </motion.div>
  );
}

import { useState, useEffect } from "react";

function MissionCard({ 
  progress, 
  range, 
  xOffset,
  title, 
  subtitle,
  text 
}: { 
  progress: MotionValue<number>, 
  range: number[], 
  xOffset: number,
  title: string, 
  subtitle: string,
  text: string 
}) {
  const [maxScale, setMaxScale] = useState(1.5);
  const [responsiveX, setResponsiveX] = useState(xOffset);

  useEffect(() => {
    // Card base dimensions
    const cardW = 320;
    const cardH = 480;
    
    // We want the expanded card to take up to 85% of the screen height or width
    const scaleH = (window.innerHeight * 0.85) / cardH;
    const scaleW = (window.innerWidth * 0.85) / cardW;
    
    // The screen is the limit: use the smaller scale so it doesn't overflow anywhere
    const calculatedScale = Math.min(scaleH, scaleW);
    setMaxScale(calculatedScale);
    
    // Also adjust xOffset based on screen width if on mobile
    if (window.innerWidth < 768) {
      setResponsiveX(xOffset > 0 ? window.innerWidth * 0.3 : (xOffset < 0 ? -window.innerWidth * 0.3 : 0));
    }
  }, [xOffset]);

  // Translate X to move the card to the dead center (Pops, Holds, Returns)
  const x = useTransform(progress, range, [0, responsiveX, responsiveX, 0]);

  // Translate Z to bring it closer to the screen
  const z = useTransform(progress, range, [0, 450, 450, 0]);
  
  // Rotate Y to flip it around
  const rotateY = useTransform(progress, range, [0, 180, 180, 0]);
  
  // Scale to expand dynamically based on screen size
  const scale = useTransform(progress, range, [1, maxScale, maxScale, 1]);
  
  // Dynamic z-index so the expanding card always sits on top
  const zIndex = useTransform(progress, range, [10, 50, 50, 10]);
  
  // Glow opacity
  const glow = useTransform(progress, range, [0, 1, 1, 0]);
  
  // Subtle border glow when expanded
  const borderOpacity = useTransform(progress, range, [0.1, 0.5, 0.5, 0.1]);

  return (
    <motion.div
      style={{ 
        x: x,
        translateZ: z, 
        rotateY: rotateY, 
        scale: scale, 
        zIndex: zIndex,
        transformStyle: "preserve-3d" 
      }}
      className="relative w-full max-w-[320px] h-[480px] shrink-0"
    >
      {/* Front Face (Sleek Column) */}
      <motion.div 
        className="absolute inset-0 bg-[#0a0a0a] rounded-[32px] p-8 flex flex-col justify-center items-center text-center backdrop-blur-2xl shadow-2xl"
        style={{ 
          backfaceVisibility: "hidden", 
          WebkitBackfaceVisibility: "hidden",
          border: useTransform(borderOpacity, v => `1px solid rgba(255, 255, 255, ${v})`)
        }}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <span className="text-white/60 font-bold tracking-[0.25em] uppercase text-[10px]">{subtitle}</span>
        </div>
        <h3 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-2">{title}</h3>
      </motion.div>

      {/* Back Face (Expanded Text) */}
      <div 
        className="absolute inset-0 bg-[#050505] rounded-[32px] p-10 flex flex-col justify-center items-center text-center backdrop-blur-3xl overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.4)]"
        style={{ 
          backfaceVisibility: "hidden", 
          WebkitBackfaceVisibility: "hidden", 
          transform: "rotateY(180deg)",
          border: "1px solid rgba(168,85,247,0.3)"
        }}
      >
        {/* Subtle grid background for the back face (opacity reduced) */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        
        <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-white/30 mb-8 relative z-10">{title}</h4>
        
        {/* Sentences now styled larger to fill the empty space */}
        <p 
          className="text-white/95 font-extrabold text-[28px] leading-[1.2] relative z-10 tracking-tight"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        
        {/* Colorful Glow Behind Text */}
        <motion.div 
          style={{ opacity: glow }} 
          className="absolute inset-0 bg-gradient-to-br from-brand-purple/30 via-brand-blue/20 to-brand-cyan/20 blur-[60px] -z-10 rounded-full" 
        />
      </div>
    </motion.div>
  );
}
