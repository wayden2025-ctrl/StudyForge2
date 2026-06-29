"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import Act1Problem from "./Act1Problem";
import Act2Shift from "./Act2Shift";
import Act3Reveal from "./Act3Reveal";
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "1500vh", background: "#050505" }}>
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden" style={{ perspective: "1200px" }}>
        
        {/* Global Ambient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-blue/10 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-purple/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        {/* Cinematic Acts Overlay */}
        <Act1Problem progress={scrollYProgress} />
        <Act2Shift progress={scrollYProgress} />
        <Act3Reveal progress={scrollYProgress} />
        <Act4Transformation progress={scrollYProgress} />
        <Act5Flashcards progress={scrollYProgress} />
        <Act6Quiz progress={scrollYProgress} />
        
        <Act8Pipeline progress={scrollYProgress} />
        <Act9Guarantee progress={scrollYProgress} />
        <Act10Mission progress={scrollYProgress} />
        <Act11Features progress={scrollYProgress} />
        
        <Act12CTA progress={scrollYProgress} />

      </div>
    </div>
  );
}
