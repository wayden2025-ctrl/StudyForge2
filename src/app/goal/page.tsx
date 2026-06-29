"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { ArrowLeft, Target, Zap, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function GoalPage() {
  return (
    <PageWrapper className="flex flex-col min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 w-full flex-1">
        <Link href="/">
          <Button variant="ghost" className="mb-8 pl-0">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
          </Button>
        </Link>
        
        <div className="flex items-center space-x-3 mb-10">
          <Target className="w-10 h-10 text-brand-cyan" />
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">Our Goal</h1>
        </div>

        <div className="prose prose-invert max-w-none text-neutral-300">
          <p className="text-2xl leading-relaxed text-white mb-10 font-medium">
            We want students to have an <span className="text-brand-cyan">easy way to get flashcards</span> and <span className="text-brand-purple">study better.</span>
          </p>

          <p className="text-lg leading-relaxed mb-8">
            The traditional education system is broken when it comes to studying. Students are handed massive textbooks, hour-long lecture videos, and messy slide decks. You're expected to spend 80% of your time just organizing and writing down the information, leaving only 20% of your time to actually memorize and understand it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="glass-card p-6 rounded-2xl border-brand-cyan/20">
              <Zap className="w-8 h-8 text-brand-cyan mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Eliminate Busywork</h3>
              <p className="text-neutral-400">
                You shouldn't have to spend hours copying definitions from a textbook onto physical cards. We automate the busywork so you can jump straight into the learning phase.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl border-brand-purple/20">
              <BookOpen className="w-8 h-8 text-brand-purple mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Active Recall</h3>
              <p className="text-neutral-400">
                Science proves that active recall and spaced repetition are the only guaranteed ways to memorize information. Our goal is to put these powerful tools in the hands of every student.
              </p>
            </div>
          </div>

          <p className="text-lg leading-relaxed mb-8">
            StudyForge AI was built to flip the ratio. By using advanced AI, we want to instantly forge your messy materials into pristine, ready-to-use flashcards, quizzes, and summaries. 
          </p>

          <p className="text-lg leading-relaxed">
            We want you to study faster, stress less, and actually get the grades you deserve.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
