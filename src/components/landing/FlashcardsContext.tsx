import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Flashcard {
  question: string;
  answer?: string;
}

interface FlashcardsContextValue {
  flashcards: Flashcard[];
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
}

const FlashcardsContext = createContext<FlashcardsContextValue | undefined>(undefined);

export const useFlashcards = () => {
  const ctx = useContext(FlashcardsContext);
  if (!ctx) {
    throw new Error('useFlashcards must be used within FlashcardsProvider');
  }
  return ctx;
};

export const FlashcardsProvider = ({ children }: { children: ReactNode }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  return (
    <FlashcardsContext.Provider value={{ flashcards, setFlashcards }}>
      {children}
    </FlashcardsContext.Provider>
  );
};
