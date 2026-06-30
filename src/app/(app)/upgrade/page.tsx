"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { CheckCircle2, Sparkles, Zap, ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UpgradePage() {
  // We'll let the user click these but they won't do anything real yet
  const handleCheckout = (planName: string) => {
    // Empty function, wait for Stripe link
    console.log("Stripe checkout for", planName);
  };

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto space-y-12 pb-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple font-medium text-sm mb-4">
            <Sparkles className="w-4 h-4" /> Upgrade Your Learning
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-syne tracking-tight">
            Unlock the Full Power of Notiq AI
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Generate unlimited flashcards, process massive PDFs, and get your study materials instantly. Choose the plan that fits your ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-4">
          {/* FREE PLAN */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col relative overflow-hidden h-full">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Basic</h3>
              <p className="text-neutral-400 text-sm h-10">For casual studying and quick reviews.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-neutral-500 font-medium">/ forever</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-sm">5 Generations per week</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-sm">Standard study notes</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-sm">5 Study Plan Generations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-sm">Flashcards & Quizzes</span>
              </li>
              <li className="flex items-start gap-3 opacity-50">
                <ShieldAlert className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
                <span className="text-neutral-400 text-sm">Standard processing speed</span>
              </li>
            </ul>

            <Button disabled variant="outline" className="w-full rounded-xl py-6 border-white/20">
              Current Plan
            </Button>
          </div>

          {/* PRO PLAN */}
          <div className="bg-gradient-to-b from-brand-purple/20 to-brand-cyan/10 border border-brand-purple/40 rounded-3xl p-8 flex flex-col relative overflow-hidden h-full shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)]">
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Best Deal
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-brand-cyan fill-brand-cyan/20" />
                <h3 className="text-xl font-bold text-white">Pro</h3>
              </div>
              <p className="text-neutral-300 text-sm h-10">For serious students who need reliable power.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$9.99</span>
                <span className="text-brand-cyan font-medium">/ month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span className="text-white text-sm font-bold">500 Generations per month</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span className="text-neutral-200 text-sm">50 Study Generations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span className="text-neutral-200 text-sm">50 Study Plan Generations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span className="text-neutral-200 text-sm">Longer text inputs</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span className="text-neutral-200 text-sm">Priority processing speed</span>
              </li>
            </ul>

            <Button 
              onClick={() => handleCheckout("pro")}
              className="w-full rounded-xl py-6 bg-gradient-to-r from-brand-purple to-brand-cyan hover:from-brand-cyan hover:to-brand-purple text-white font-bold transition-all shadow-[0_4px_20px_rgba(168,85,247,0.5)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.6)] hover:-translate-y-1 animate-pulse hover:animate-none"
            >
              Upgrade to Pro <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* MAX PLAN */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-neutral-800 text-neutral-300 text-xs font-bold px-3 py-1 rounded-full border border-neutral-700 uppercase tracking-wider">
                Power Users
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">MAX</h3>
              <p className="text-neutral-400 text-sm h-10">The ultimate study companion with zero limits.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$49.99</span>
                <span className="text-neutral-500 font-medium">/ month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-white text-sm font-bold">Unlimited Generations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-sm">Highest quality generation model</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-sm">Unlimited Plan Generations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-sm">Ultra-fast processing</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-sm">Dedicated Account Support</span>
              </li>
            </ul>

            <Button 
              onClick={() => handleCheckout("max")}
              className="w-full rounded-xl py-6 bg-white text-black hover:bg-neutral-200 font-bold transition-all shadow-[0_4px_14px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
            >
              Get MAX
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
