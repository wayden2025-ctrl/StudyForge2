"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CalendarDays, Sparkles, AlertCircle, CheckCircle2, ChevronRight, BookOpen, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STUDY_TIPS = [
  "Study a little every day instead of cramming the night before.",
  "Teach the topic to yourself out loud to find what you don't know.",
  "Practice with questions, not just by rereading notes.",
  "Take short breaks to help your brain stay focused.",
  "Get a full night's sleep before your test.",
  "Start with the hardest topics while your mind is fresh.",
  "Remove distractions and study in a quiet space.",
  "Review your mistakes instead of only your correct answers.",
  "Stay hydrated and eat a healthy meal before studying.",
  "Organize your notes so they're easy to review.",
  "Believe in your preparation and stay calm during the test.",
  "Deep breaths and a clear mind lead to better thinking.",
  "Focus on progress, not perfection.",
  "Turn your notes into flashcards to test your memory.",
  "Confidence comes from consistent practice, not luck.",
  "Arrive early so you can start the test relaxed.",
  "Read every question carefully before answering.",
  "Trust your first answer unless you find a clear mistake.",
  "One focused hour beats three distracted hours.",
  "Preparation today is confidence tomorrow."
];

interface StudyDay {
  day: number;
  date: string;
  topics: string[];
  activities: string[];
}

interface PlanResponse {
  summary: string;
  plan: StudyDay[];
  error?: string;
}

export default function StudyPlansPage() {
  const [material, setMaterial] = useState("");
  const [examDate, setExamDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [randomTip, setRandomTip] = useState("");

  useEffect(() => {
    setRandomTip(STUDY_TIPS[Math.floor(Math.random() * STUDY_TIPS.length)]);
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!material.trim() || !examDate) return;

    // Validate date is in the future
    const selected = new Date(examDate);
    const today = new Date();
    if (selected <= today) {
      setError("Exam date must be in the future.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: material, examDate }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate plan");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple font-medium text-xs mb-4">
              <CalendarDays className="w-3.5 h-3.5" /> Smart Scheduling
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-syne tracking-tight text-white mb-2">
              AI Study Planner
            </h1>
            <p className="text-neutral-400 max-w-lg">
              Enter your exam date and study topics, and we'll build a structured, day-by-day plan to ensure you're fully prepared.
            </p>
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass rounded-2xl p-6 border border-white/10">
              <form onSubmit={handleGenerate} className="space-y-6">
                
                {/* Date Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-brand-cyan" />
                    When is your exam?
                  </label>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan/50 transition-all"
                  />
                </div>

                {/* Text Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-purple" />
                    What do you need to study?
                  </label>
                  <textarea
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    required
                    placeholder="Paste your syllabus, textbook topics, or describe what the exam covers..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white h-48 resize-none focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple/50 transition-all placeholder:text-neutral-600"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading || !material.trim() || !examDate}
                  className="w-full bg-gradient-to-r from-brand-cyan to-brand-blue hover:from-brand-blue hover:to-brand-purple text-white border-0 py-6 text-lg font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
                >
                  {loading ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Generating Plan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Create Study Plan
                    </>
                  )}
                </Button>

                {randomTip && (
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex items-start gap-3 p-4 bg-brand-cyan/5 border border-brand-cyan/10 rounded-xl">
                      <Lightbulb className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider mb-1">Study Tip</h4>
                        <p className="text-sm text-brand-cyan/90 leading-snug">{randomTip}</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 glass rounded-2xl border border-white/5 border-dashed">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <CalendarDays className="w-8 h-8 text-neutral-500" />
                </div>
                <h3 className="text-xl font-bold text-neutral-300 mb-2">Ready to plan?</h3>
                <p className="text-neutral-500 max-w-sm">
                  Fill out the form on the left to instantly generate a tailored, day-by-day roadmap to acing your exam.
                </p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center space-y-6 min-h-[400px]">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 border-4 border-brand-cyan/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-brand-cyan rounded-full border-t-transparent animate-spin"></div>
                  <CalendarDays className="absolute inset-0 m-auto w-8 h-8 text-brand-cyan animate-pulse" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Architecting your plan...</h3>
                  <p className="text-neutral-400">Analyzing topics and optimizing your schedule.</p>
                </div>
              </div>
            )}

            {result && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="glass rounded-2xl p-6 border border-brand-cyan/20 bg-brand-cyan/5">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-cyan" />
                    Strategy Overview
                  </h3>
                  <p className="text-brand-cyan/80 text-sm leading-relaxed">
                    {result.summary}
                  </p>
                </div>

                <div className="space-y-4">
                  {result.plan.map((day, idx) => (
                    <div key={idx} className="glass rounded-xl p-5 border border-white/10 relative overflow-hidden group">
                      {/* Hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/0 via-brand-cyan/5 to-brand-blue/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      
                      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                        {/* Day Badge */}
                        <div className="shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Day</span>
                          <span className="text-2xl font-black text-white leading-none">{day.day}</span>
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full">
                              {new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                              <ChevronRight className="w-3 h-3" /> Focus Topics
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {day.topics.map((topic, i) => (
                                <span key={i} className="text-sm text-neutral-200 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                              <ChevronRight className="w-3 h-3" /> Action Items
                            </h4>
                            <ul className="space-y-1.5">
                              {day.activities.map((activity, i) => (
                                <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-1.5 shrink-0" />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
