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
              <Image src="/logo.png" alt="Notiq AI Logo" fill className="object-contain" />
            </div>
            <span className="opacity-90 group-hover:opacity-100 transition-opacity">Notiq AI</span>
          </div>
          <div className="flex items-center gap-5">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSesEj-InHyY389fQqPbHuM2Oi7tc-QUuJtXTuOXgE7EmBkB7w/viewform?usp=publish-editor" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-brand-cyan font-medium text-[0.95rem] transition-colors"
            >
              Feedback
            </a>
            <Link 
              href="/reviews" 
              className="text-white/60 hover:text-yellow-400 font-medium text-[0.95rem] transition-colors"
            >
              Reviews
            </Link>
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

      {/* SOCIAL PROOF / TESTIMONIALS */}
      <section className="relative z-10 py-24 px-4" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.03) 50%, transparent 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-cyan font-bold text-sm uppercase tracking-widest mb-4">Real Student Reviews</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
              Students Are Obsessed
            </h2>
            <p className="text-white/50 mt-4 text-lg max-w-lg mx-auto">See why thousands of students are switching to Notiq AI for their study sessions.</p>
            <div className="mt-6 flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mx-auto w-fit">
              <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              <span className="text-white text-sm"><strong className="font-extrabold">Authenticated by Proof</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                name: "Sarah M.",
                role: "Pre-Med Student",
                text: "okay so i was literally about to fail bio and i tried this as a last resort. made flashcards from my entire lecture in like 10 seconds?? my grade actually went up a whole letter. im not even kidding lol",
                stars: 5,
              },
              {
                name: "James L.",
                role: "Computer Science Major",
                text: "bro the notes it generates are better than the ones i take in class i shared my data structures study guide with my whole group chat and now everyone wants pro. this thing is insane",
                stars: 5,
              },
              {
                name: "Priya K.",
                role: "Law Student",
                text: "I have 200+ pages of reading every week and this tool actually summarizes everything perfectly. The quiz feature caught gaps in my knowledge I didn't even know I had. Worth every penny of pro.",
                stars: 4.5,
              },
            ].map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-300 flex flex-col items-center text-center"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="flex items-center justify-center gap-1 mb-4">
                  {Array.from({ length: Math.floor(t.stars) }).map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                  {t.stars % 1 !== 0 && (
                    <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
                      <defs><linearGradient id={`half-${i}`}><stop offset="50%" stopColor="#facc15"/><stop offset="50%" stopColor="#444" /></linearGradient></defs>
                      <path d={`M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z`} fill={`url(#half-${i})`}/>
                    </svg>
                  )}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex flex-col items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Marcus T.",
                role: "Engineering Student",
                text: "i used to pull all nighters before exams trying to rewrite my notes. now i just paste them in and get perfect study material in seconds. my sleep schedule has never been better honestly",
                stars: 5,
              },
              {
                name: "Emily R.",
                role: "Nursing Student",
                text: "the mnemonics feature is SO underrated. it gave me memory tricks for pharmacology that actually stuck. i went from a 68 to an 89 on my midterm. actual lifesaver",
                stars: 4.5,
              },
              {
                name: "Daniel W.",
                role: "History Major",
                text: "shared my study notes with my roommate through the app and he literally signed up for pro the same day. the generated quizzes feel like they were written by my professor its kinda scary",
                stars: 5,
              },
            ].map((t, i) => (
              <div
                key={i + 3}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-300 flex flex-col items-center text-center"
                style={{ animationDelay: `${(i + 3) * 0.15}s` }}
              >
                <div className="flex items-center justify-center gap-1 mb-4">
                  {Array.from({ length: Math.floor(t.stars) }).map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                  {t.stars % 1 !== 0 && (
                    <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
                      <defs><linearGradient id={`half2-${i}`}><stop offset="50%" stopColor="#facc15"/><stop offset="50%" stopColor="#444" /></linearGradient></defs>
                      <path d={`M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z`} fill={`url(#half2-${i})`}/>
                    </svg>
                  )}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex flex-col items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10">
        <div className="fgridf">
          <div className="fbrand">
            <div className="nlogo">
              <div className="nicon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
              </div>
              Notiq AI
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
          <span>&copy; 2026 Notiq AI. All rights reserved.</span>
          <span>Built for students, by students.</span>
        </div>
      </footer>
    </div>
  );
}
