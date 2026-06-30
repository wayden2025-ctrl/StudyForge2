"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./landing.css";
import CinematicTimeline from "@/components/landing/CinematicTimeline";

export default function LandingPage() {
  const [isGoalExpanded, setIsGoalExpanded] = useState(false);

  useEffect(() => {
    // cursor glow
    const g = document.getElementById('cg');
    if (!g) return;
    
    let mx = 0, my = 0, cx = 0, cy = 0;
    const handleMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', handleMouseMove);
    
    let reqId: number;
    function animate() {
      cx += (mx - cx) * .08; cy += (my - cy) * .08;
      g!.style.left = cx + 'px'; g!.style.top = cy + 'px';
      reqId = requestAnimationFrame(animate);
    }
    animate();

    // nav
    const nav = document.getElementById('nav');
    const handleScroll = () => {
      if (nav) nav.classList.toggle('sc', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);

    // reveal
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          if (e.target.id === 'barchart') {
            setTimeout(() => {
              const b1 = document.getElementById('b1');
              if (b1) b1.classList.add('an');
            }, 180);
            setTimeout(() => {
              const b2 = document.getElementById('b2');
              if (b2) b2.classList.add('an');
            }, 460);
          }
        }
      });
    }, { threshold: .14 });

    document.querySelectorAll('.rev,.fstep,.sitem,.fcard2,.ctacard').forEach(el => io.observe(el));
    const bc = document.getElementById('barchart');
    if (bc) io.observe(bc);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(reqId);
      io.disconnect();
    };
  }, []);

  return (
    <div className="landing-wrapper font-sans" style={{ background: '#050505', color: '#fff', overflowX: 'clip', minHeight: '100vh', lineHeight: 1.6 }}>
      <div id="cg"></div>

      {/* NAV */}
      <nav id="nav">
        <div className="nav-inner">
          <div className="nlogo group cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95">
            <div className="relative w-10 h-10 mr-1 shadow-[0_0_10px_rgba(168,85,247,0.2)] rounded-lg overflow-hidden">
              <Image src="/logo.png" alt="StudyForge Logo" fill className="object-contain" />
            </div>
            <span className="opacity-90 group-hover:opacity-100 transition-opacity">StudyForge AI</span>
          </div>
          <div className="flex items-center gap-5">
            <Link 
              href="/upgrade" 
              className="text-white/60 hover:text-white font-medium text-[0.95rem] transition-colors"
            >
              Plans
            </Link>
            <Link 
              href="/login" 
              className="nav-signin-btn"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="nav-cta-btn"
            >
              <span>Start Free</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* CINEMATIC TIMELINE (HERO REPLACEMENT) */}
      <CinematicTimeline />



      {/* FOOTER */}
      <footer className="relative z-10">
        <div className="fgridf">
          <div className="fbrand">
            <div className="nlogo">
              <div className="nicon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
              </div>
              StudyForge AI
            </div>
            <p>The ultimate AI Study OS &mdash; transforming the way students learn, memorize, and conquer exams.</p>
          </div>
          <div className="fcolf">
            <h4>Legal</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/goal">Our Goal</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="fcolf">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:wayden2025@gmail.com">wayden2025@gmail.com</a></li>
              <li><Link href="#">Secure &amp; Private</Link></li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <span>&copy; 2026 StudyForge AI. All rights reserved.</span>
          <span>Built for students, by students.</span>
        </div>
      </footer>
    </div>
  );
}
