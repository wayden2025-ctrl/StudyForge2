"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { useStudyStore } from "@/store/useStudyStore";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FlashcardsPage() {
  const { data } = useStudyStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!data || data.flashcards.length === 0) {
    return (
      <PageWrapper className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8 text-neutral-500" />
        </div>
        <h2 className="text-2xl font-bold">No flashcards found</h2>
        <p className="text-neutral-400">Please generate some study materials first.</p>
        <Link href="/app">
          <Button>Go to Input Hub</Button>
        </Link>
      </PageWrapper>
    );
  }

  const cards = data.flashcards;
  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto flex flex-col min-h-[80vh]">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Flashcards</h1>
          <p className="text-neutral-400">
            Card {currentIndex + 1} of {cards.length}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative perspective-[1500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + (isFlipped ? "-flipped" : "-front")}
              initial={{ rotateX: isFlipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: isFlipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full max-w-2xl h-80 cursor-pointer preserve-3d"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="absolute inset-0 glass-card rounded-3xl flex items-center justify-center p-8 text-center bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-medium leading-tight">
                  {isFlipped ? currentCard.answer : currentCard.question}
                </h2>
                <div className="absolute bottom-6 text-sm text-neutral-500 flex items-center">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Tap to flip
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-12 px-4">
          <Button variant="ghost" onClick={handlePrev}>
            <ChevronLeft className="w-6 h-6 mr-2" />
            Previous
          </Button>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleNext} className="text-red-400 border-red-500/30 hover:bg-red-500/10">Hard</Button>
            <Button variant="outline" onClick={handleNext} className="text-brand-blue border-brand-blue/30 hover:bg-brand-blue/10">Medium</Button>
            <Button variant="outline" onClick={handleNext} className="text-green-400 border-green-500/30 hover:bg-green-500/10">Easy</Button>
          </div>

          <Button variant="ghost" onClick={handleNext}>
            Next
            <ChevronRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
