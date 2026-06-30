"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { Sparkles, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <PageWrapper className="flex flex-col min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 w-full flex-1">
        <Link href="/">
          <Button variant="ghost" className="mb-8 pl-0">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
          </Button>
        </Link>
        
        <div className="flex items-center space-x-3 mb-8">
          <Sparkles className="w-10 h-10 text-brand-purple" />
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">About Notiq AI</h1>
        </div>

        <div className="prose prose-invert max-w-none prose-lg">
          <p className="text-xl text-neutral-300 leading-relaxed mb-8">
            Notiq AI was born out of a simple frustration: students spend too much time organizing and re-writing notes, and not enough time actually learning the material. We built Notiq AI to change that.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4 text-white">Our Mission</h2>
          <p className="text-neutral-400 leading-relaxed mb-6">
            Our mission is to democratize effective learning by leveraging cutting-edge Artificial Intelligence. We believe that everyone deserves a personalized tutor and the best study materials tailored exactly to their curriculum. By automating the creation of flashcards, quizzes, and summaries, we give you your time back.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4 text-white">Built by Students, for Students</h2>
          <p className="text-neutral-400 leading-relaxed mb-6">
            We understand the late-night cram sessions and the stress of midterms. That is why every feature in Notiq AI—from spaced repetition flashcards to instant multiple-choice quizzes—is designed specifically to optimize memory retention and academic performance.
          </p>

          <div className="glass-card rounded-2xl p-8 mt-12 flex flex-col sm:flex-row items-center justify-between border-brand-purple/20">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Have a question or feature request?</h3>
              <p className="text-neutral-400">We would love to hear from you. Drop us an email anytime.</p>
            </div>
            <a href="mailto:wayden2025@gmail.com" className="mt-6 sm:mt-0">
              <Button size="lg" className="bg-brand-purple hover:bg-brand-purple/80 text-white border-none">
                <Mail className="w-5 h-5 mr-2" />
                wayden2025@gmail.com
              </Button>
            </a>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
