"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { CheckCircle2, Sparkles, Zap, ShieldAlert, ArrowRight, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UpgradePage() {
  // We'll let the user click these but they won't do anything real yet
  const handleCheckout = (planName: string) => {
    // Empty function, wait for Stripe link
    console.log("Stripe checkout for", planName);
  };

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto space-y-12 pb-16 px-4">
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
                <span className="text-neutral-300 text-sm">5 Study Plan Generations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-sm">Standard processing speed</span>
              </li>
            </ul>

            <Button disabled variant="outline" className="w-full rounded-xl py-6 border-white/20">
              Current Plan
            </Button>
          </div>

          {/* PRO YEARLY PLAN (Best Deal) */}
          <div className="bg-gradient-to-b from-brand-purple/20 to-brand-cyan/10 border border-brand-purple/40 rounded-3xl p-8 flex flex-col relative overflow-hidden h-full shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)] transform scale-105 z-10">
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Best Deal (Save 58%)
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-brand-cyan fill-brand-cyan/20" />
                <h3 className="text-xl font-bold text-white">Pro (Yearly)</h3>
              </div>
              <p className="text-neutral-300 text-sm h-10">Maximize your grades all year long.</p>
              <div className="mt-6 flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$7.50</span>
                  <span className="text-brand-cyan font-medium">/ month</span>
                </div>
                <span className="text-xs text-neutral-400 mt-1">Billed annually ($90/year)</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span className="text-white text-sm font-bold">Unlimited Generations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span className="text-white text-sm font-bold">Unlimited Study Plans</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span className="text-neutral-200 text-sm">Longer text inputs & Priority processing</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span className="text-white text-sm font-bold">PDF & Notion Export</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span className="text-white text-sm font-bold">Advanced Folders & Analytics</span>
              </li>
            </ul>

            <Button 
              onClick={() => handleCheckout("pro-yearly")}
              className="w-full rounded-xl py-6 bg-gradient-to-r from-brand-purple to-brand-cyan hover:from-brand-cyan hover:to-brand-purple text-white font-bold transition-all shadow-[0_4px_20px_rgba(168,85,247,0.5)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.6)] hover:-translate-y-1 animate-pulse hover:animate-none"
            >
              Get Pro Yearly <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* PRO MONTHLY PLAN */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col relative overflow-hidden h-full">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Pro (Monthly)</h3>
              <p className="text-neutral-400 text-sm h-10">Ultimate power, flexible commitment.</p>
              <div className="mt-6 flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$15.99</span>
                  <span className="text-neutral-500 font-medium">/ month</span>
                </div>
                <span className="text-xs text-neutral-400 mt-1">Billed monthly</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-white text-sm font-bold">Unlimited Generations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-white text-sm font-bold">Unlimited Study Plans</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-sm">Longer text inputs & Priority processing</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-white text-sm font-bold">PDF & Notion Export</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-white text-sm font-bold">Advanced Folders & Analytics</span>
              </li>
            </ul>

            <Button 
              onClick={() => handleCheckout("pro-monthly")}
              className="w-full rounded-xl py-6 bg-white text-black hover:bg-neutral-200 font-bold transition-all shadow-[0_4px_14px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
            >
              Get Pro Monthly
            </Button>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-syne">Compare Plans</h2>
            <p className="text-neutral-400 mt-2">See exactly what you get with Notiq AI Pro.</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-6 text-white font-medium w-1/2">Features</th>
                  <th className="p-6 text-neutral-400 font-medium text-center w-1/4">Basic (Free)</th>
                  <th className="p-6 text-brand-purple font-bold text-center w-1/4">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: "Study Generations", free: "5 / week", pro: "Unlimited" },
                  { name: "Study Plan Generations", free: "5 / week", pro: "Unlimited" },
                  { name: "Input Length limits", free: "Standard", pro: "Extended (Massive PDFs)" },
                  { name: "Processing Speed", free: "Standard", pro: "Priority Queue" },
                  { name: "High-Quality Generation Model", free: false, pro: true },
                  { name: "Export to PDF & Notion", free: false, pro: true },
                  { name: "Library Folder Organization", free: false, pro: true },
                  { name: "Advanced Study Analytics", free: false, pro: true },
                  { name: "Dedicated Account Support", free: false, pro: true },
                  { name: "Access to New Features", free: false, pro: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-neutral-300 font-medium">{row.name}</td>
                    <td className="p-6 text-center text-neutral-500">
                      {typeof row.free === "boolean" ? (
                        row.free ? <Check className="w-5 h-5 mx-auto text-neutral-400" /> : <X className="w-5 h-5 mx-auto text-neutral-600" />
                      ) : (
                        row.free
                      )}
                    </td>
                    <td className="p-6 text-center text-white">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? <Check className="w-5 h-5 mx-auto text-brand-cyan" /> : <X className="w-5 h-5 mx-auto text-neutral-600" />
                      ) : (
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">{row.pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
