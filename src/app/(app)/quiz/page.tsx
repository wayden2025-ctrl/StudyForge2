"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useStudyStore } from "@/store/useStudyStore";
import { BrainCircuit, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function QuizPage() {
  const { data } = useStudyStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!data || data.quiz.length === 0) {
    return (
      <PageWrapper className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <BrainCircuit className="w-8 h-8 text-neutral-500" />
        </div>
        <h2 className="text-2xl font-bold">No quiz found</h2>
        <p className="text-neutral-400">Please generate some study materials first.</p>
        <Link href="/app">
          <Button>Go to Input Hub</Button>
        </Link>
      </PageWrapper>
    );
  }

  const quiz = data.quiz;
  const currentQuestion = quiz[currentIndex];

  const handleSelect = (option: string) => {
    if (selectedOption) return; // Prevent changing answer
    setSelectedOption(option);
    if (option === currentQuestion.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <PageWrapper className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
        <div className="w-24 h-24 rounded-full bg-brand-cyan/20 flex items-center justify-center">
          <span className="text-4xl font-bold text-brand-cyan">{Math.round((score / quiz.length) * 100)}%</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-xl text-neutral-400">You scored {score} out of {quiz.length}</p>
        </div>
        <div className="flex space-x-4">
          <Button onClick={handleRestart}>Retake Quiz</Button>
          <Link href="/study">
            <Button variant="outline">Review Notes</Button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Quiz Mode</h1>
            <p className="text-neutral-400">Question {currentIndex + 1} of {quiz.length}</p>
          </div>
          <div className="text-brand-purple font-medium bg-brand-purple/10 px-4 py-2 rounded-full">
            Score: {score}
          </div>
        </div>

        <Card className="mb-8">
          <h2 className="text-2xl font-medium mb-8 leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQuestion.correct;
              const showCorrect = selectedOption && isCorrect;
              const showWrong = isSelected && !isCorrect;

              return (
                <motion.button
                  whileHover={!selectedOption ? { scale: 1.01 } : {}}
                  whileTap={!selectedOption ? { scale: 0.99 } : {}}
                  key={idx}
                  onClick={() => handleSelect(option)}
                  disabled={!!selectedOption}
                  className={`w-full text-left p-5 rounded-xl border text-lg transition-all flex items-center justify-between ${
                    showCorrect
                      ? "bg-green-500/20 border-green-500/50 text-green-100"
                      : showWrong
                      ? "bg-red-500/20 border-red-500/50 text-red-100"
                      : isSelected
                      ? "bg-white/10 border-white/20"
                      : "bg-black/20 border-white/5 hover:border-white/20 hover:bg-white/5 text-neutral-300"
                  }`}
                >
                  <span>{option}</span>
                  {showCorrect && <CheckCircle className="w-6 h-6 text-green-400" />}
                  {showWrong && <XCircle className="w-6 h-6 text-red-400" />}
                </motion.button>
              );
            })}
          </div>
        </Card>

        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end"
          >
            <Button size="lg" onClick={handleNext}>
              {currentIndex < quiz.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
}
