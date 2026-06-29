"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./landing.css";

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
    <div className="landing-wrapper" style={{ background: '#050505', color: '#fff', fontFamily: "'Inter', sans-serif", overflowX: 'hidden', minHeight: '100vh', lineHeight: 1.6 }}>
      <div id="cg"></div>

      {/* NAV */}
      <nav id="nav">
        <div className="nav-inner">
          <div className="nlogo">
            <div className="nicon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
            </div>
            StudyForge AI
          </div>
          <Link href="/app" className="ncta">Start Free &rarr;</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hmesh">
          <div className="blob b1"></div>
          <div className="blob b2"></div>
          <div className="blob b3"></div>
        </div>
        <div className="hgrid"></div>

        <div className="planet" aria-hidden="true">
          <div className="oring o1">
            <div className="onode" style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)' }}>
              <svg stroke="rgba(59,130,246,.8)" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <div className="onode" style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)' }}>
              <svg stroke="rgba(168,85,247,.8)" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
          </div>
          <div className="oring o2">
            <div className="onode" style={{ position: 'absolute', top: '-20px', right: '28px' }}>
              <svg stroke="rgba(6,182,212,.8)" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <div className="onode" style={{ position: 'absolute', bottom: '-20px', left: '28px' }}>
              <svg stroke="rgba(255,255,255,.4)" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
          </div>
          <div className="oring o3">
            <div className="onode" style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)' }}>
              <svg stroke="rgba(168,85,247,.6)" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </div>
          </div>
          <div className="pcore">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(168,85,247,.9))' }}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
          </div>
        </div>

        <div className="hcontent">
          <div className="hbadge"><div className="bdot"></div>The Next-Gen Study OS</div>
          <h1 className="hh1">Learn Faster.<br/><span className="grad">Study Smarter.</span></h1>
          <p className="hsub">Transform notes, PDFs, and lectures into flashcards, quizzes, and summaries &mdash; in seconds.</p>
          <div className="hrow">
            <Link href="/app" className="bprimary">Start Free <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
          </div>
        </div>

        <div className="scrollhint" aria-hidden="true">
          <div className="sline"></div>
          <span>SCROLL</span>
        </div>
      </section>

      {/* STATS */}
      <div className="statsstrip">
        <div className="sgrid">
          <div className="sitem"><div className="snum">10&times;</div><div className="slbl2">Faster card creation</div></div>
          <div className="sitem" style={{ transitionDelay: '.1s' }}><div className="snum">94%</div><div className="slbl2">Score improvement</div></div>
          <div className="sitem" style={{ transitionDelay: '.2s' }}><div className="snum">2min</div><div className="slbl2">Notes to quiz</div></div>
        </div>
      </div>

      {/* FLOW */}
      <section className="flowsec">
        <div className="si">
          <div className="fhdr">
            <div className="slabel">How it works</div>
            <h2 className="sh2 rev">How the magic happens</h2>
            <p className="ssub rev" style={{ transitionDelay: '.1s' }}>The perfect pipeline from raw material to A+ grades.</p>
          </div>
          <div className="ftrack">

            <div className="fstep sb">
              <div className="fnum">
                <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </div>
              <div className="fbody">
                <h3>Raw input</h3>
                <p>Dump your notes, PDFs, lecture slides, or textbook chapters. Any format, any subject &mdash; no cleanup needed.</p>
              </div>
              <div className="fcard">
                <div className="fcardlbl">Supported formats</div>
                <div><span className="tag">PDF</span><span className="tag">.docx</span><span className="tag">Slides</span><span className="tag">Plain text</span><span className="tag">Images</span></div>
              </div>
            </div>

            <div className="fstep sp2" style={{ transitionDelay: '.12s' }}>
              <div className="fnum">
                <svg viewBox="0 0 24 24"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
              </div>
              <div className="fbody">
                <h3>AI forge</h3>
                <p>Our models extract key concepts, build relationships between ideas, and structure content the way your brain actually retains it.</p>
              </div>
              <div className="fcard" style={{ borderColor: 'rgba(168,85,247,.18)', boxShadow: 'var(--gs),0 0 24px rgba(168,85,247,.08)' }}>
                <div className="fcardlbl">Processing live</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '12px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--p)', boxShadow: '0 0 5px var(--p)', animation: 'blink 1.5s ease-in-out infinite' }}></div>
                  <span style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.45)' }}>Extracting key concepts&hellip;</span>
                </div>
                <div style={{ height: '3px', background: 'rgba(255,255,255,.05)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '72%', background: 'linear-gradient(90deg,var(--p),var(--b))', borderRadius: '3px', animation: 'pp 2s ease-in-out infinite' }}></div>
                </div>
              </div>
            </div>

            <div className="fstep sc2" style={{ transitionDelay: '.24s' }}>
              <div className="fnum">
                <svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div className="fbody">
                <h3>Mastery</h3>
                <p>Flip 3D flashcards, ace adaptive quizzes, and watch knowledge solidify through scientifically-proven active recall and spaced repetition.</p>
              </div>
              <div className="fcard">
                <div className="fcardlbl">Your progress</div>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end', height: '52px' }}>
                  <div style={{ flex: 1, background: 'rgba(6,182,212,.12)', borderRadius: '3px 3px 0 0', height: '28%', borderTop: '1px solid rgba(6,182,212,.28)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(6,182,212,.18)', borderRadius: '3px 3px 0 0', height: '46%', borderTop: '1px solid rgba(6,182,212,.32)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(6,182,212,.26)', borderRadius: '3px 3px 0 0', height: '62%', borderTop: '1px solid rgba(6,182,212,.38)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(6,182,212,.36)', borderRadius: '3px 3px 0 0', height: '78%', borderTop: '1px solid rgba(6,182,212,.45)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(6,182,212,.55)', borderRadius: '3px 3px 0 0', height: '100%', borderTop: '1px solid rgba(6,182,212,.65)', boxShadow: '0 0 8px rgba(6,182,212,.28)' }}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="proofsec">
        <div className="si">
          <div className="playout">
            <div>
              <div className="slabel rev">Results</div>
              <h2 className="sh2 rev" style={{ transitionDelay: '.1s' }}>Stop guessing.<br/>Start guaranteeing.</h2>
              <p className="ssub rev" style={{ transitionDelay: '.2s' }}>Active recall and spaced repetition are the most effective learning methods ever studied. We automate their creation so you never waste time prepping again.</p>
              <Link href="/goal" className="bprimary rev" style={{ marginTop: '28px', transitionDelay: '.3s', display: 'inline-flex' }}>
                Read our goal
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="chartbox" style={{ padding: '36px', display: 'flex', flexDirection: 'column' }}>
              <div className="ctitle" style={{ marginBottom: '16px' }}>Our Mission</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                We want students to have an easy way to get flashcards and study better.
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '16px' }}>
                The traditional education system is broken when it comes to studying. Students are handed massive textbooks, hour-long lecture videos, and messy slide decks. You're expected to spend 80% of your time just organizing and writing down the information, leaving only 20% of your time to actually memorize it.
              </p>
              
              <div 
                style={{ 
                  maxHeight: isGoalExpanded ? '1000px' : '0px', 
                  opacity: isGoalExpanded ? 1 : 0, 
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '16px' }}>
                  You shouldn't have to spend hours copying definitions from a textbook onto physical cards. We automate the busywork so you can jump straight into the learning phase. Science proves that active recall and spaced repetition are the only guaranteed ways to memorize information.
                </p>
                <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  StudyForge AI was built to flip the ratio. By using advanced AI, we instantly forge your messy materials into pristine, ready-to-use flashcards, quizzes, and summaries. We want you to study faster, stress less, and actually get the grades you deserve.
                </p>
              </div>

              <div style={{ marginTop: isGoalExpanded ? '20px' : '4px' }}>
                <button 
                  onClick={() => setIsGoalExpanded(!isGoalExpanded)}
                  className="ncta" 
                  style={{ background: 'rgba(168,85,247,0.1)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.3)', padding: '6px 16px', fontSize: '0.8rem' }}
                >
                  {isGoalExpanded ? 'Read Less' : 'Read Full Goal'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="featsec">
        <div className="si">
          <div className="rev"><div className="slabel">What you get</div></div>
          <h2 className="sh2 rev" style={{ transitionDelay: '.1s' }}>Everything you need.<br/>Nothing you don't.</h2>
          <div className="fgrid">
            <div className="fcard2" style={{ transitionDelay: '0s' }}>
              <div className="fibox fp">
                <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 4v16M2 12h20"/></svg>
              </div>
              <h3>3D Flashcards</h3>
              <p>Auto-generated flip cards from your material. Swipe to study, track what sticks.</p>
            </div>
            <div className="fcard2" style={{ transitionDelay: '.07s' }}>
              <div className="fibox fb">
                <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <h3>Adaptive Quizzes</h3>
              <p>Multiple choice, true/false, short-answer &mdash; adjusted to your weak spots in real time.</p>
            </div>
            <div className="fcard2" style={{ transitionDelay: '.14s' }}>
              <div className="fibox fc">
                <svg viewBox="0 0 24 24"><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="11" y2="18"/></svg>
              </div>
              <h3>Smart Summaries</h3>
              <p>Dense material condensed into digestible outlines. Get the gist before drilling the details.</p>
            </div>
            <div className="fcard2" style={{ transitionDelay: '.21s' }}>
              <div className="fibox fp">
                <svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
              </div>
              <h3>Spaced Repetition</h3>
              <p>Cards resurface right before you'd forget them &mdash; maximizing retention over time.</p>
            </div>
            <div className="fcard2" style={{ transitionDelay: '.28s' }}>
              <div className="fibox fb">
                <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <h3>Progress Analytics</h3>
              <p>See exactly where you're strong and where gaps exist. Study smarter, not longer.</p>
            </div>
            <div className="fcard2" style={{ transitionDelay: '.35s' }}>
              <div className="fibox fc">
                <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h3>Private &amp; Secure</h3>
              <p>Your notes never train our models. Everything encrypted, stays yours, forever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ctasec">
        <div className="ctacard" id="ctacard">
          <h2 className="sh2">Join the revolution.</h2>
          <p>Ready to upgrade your grades? Stop taking notes and start actually learning. Free to start, no card required.</p>
          <Link href="/app" className="bprimary">Launch App Now <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
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
