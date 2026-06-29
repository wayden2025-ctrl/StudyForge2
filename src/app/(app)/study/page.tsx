"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { Card } from "@/components/ui/card";
import { useStudyStore } from "@/store/useStudyStore";
import { BookOpen, Sparkles, BrainCircuit, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudyPage() {
  const { data } = useStudyStore();
  const [expandedConcept, setExpandedConcept] = useState<number | null>(null);

  if (!data) {
    return (
      <PageWrapper className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8 text-neutral-500" />
        </div>
        <h2 className="text-2xl font-bold">No study data found</h2>
        <p className="text-neutral-400">Please generate some study materials first.</p>
        <Link href="/app">
          <Button>Go to Input Hub</Button>
        </Link>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Study Notes</h1>
            <p className="text-neutral-400">Your AI-generated summary and key concepts.</p>
          </div>
          <div className="hidden sm:flex space-x-3">
            <Link href="/flashcards">
              <Button variant="outline" size="sm">
                <BookOpen className="w-4 h-4 mr-2 text-brand-blue" />
                Practice Flashcards
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="outline" size="sm">
                <BrainCircuit className="w-4 h-4 mr-2 text-brand-purple" />
                Take Quiz
              </Button>
            </Link>
          </div>
        </div>

        <Card className="space-y-6">
          <div className="flex items-center space-x-3 text-brand-cyan mb-4">
            <Sparkles className="w-6 h-6" />
            <h2 className="text-xl font-semibold text-white">Summary</h2>
          </div>
          <p className="text-neutral-300 leading-relaxed text-lg">
            {data.summary}
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="space-y-4 bg-brand-blue/5 border-brand-blue/20">
            <h2 className="text-xl font-semibold text-white mb-4">Key Concepts</h2>
            <ul className="space-y-2">
              {data.key_concepts.map((concept, idx) => {
                const isExpanded = expandedConcept === idx;
                return (
                  <li key={idx} className="flex flex-col">
                    <button
                      onClick={() => setExpandedConcept(isExpanded ? null : idx)}
                      className="flex items-start justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left w-full"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="w-6 h-6 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0 text-sm font-medium mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-neutral-200 font-medium mt-0.5">{concept.title}</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform duration-300 mt-1 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-12 pr-4 pb-3 pt-1 text-neutral-400 text-sm leading-relaxed">
                            {concept.description}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card className="space-y-6 bg-brand-purple/5 border-brand-purple/20">
            <h2 className="text-xl font-semibold text-white mb-4">Mnemonics & Tricks</h2>
            <ul className="space-y-3">
              {data.mnemonics.map((mnemonic, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center shrink-0 text-sm font-medium mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </span>
                  <span className="text-neutral-300">{mnemonic}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
