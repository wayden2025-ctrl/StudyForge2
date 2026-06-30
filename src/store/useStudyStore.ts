import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Flashcard {
  question: string;
  answer: string;
}

export interface KeyConcept {
  title: string;
  description: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: string;
}

export interface StudyData {
  summary: string;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  key_concepts: KeyConcept[];
  mnemonics: string[];
}

interface StudyStore {
  data: StudyData | null;
  isLoading: boolean;
  anonCount: number;
  setData: (data: StudyData) => void;
  setIsLoading: (loading: boolean) => void;
  clearData: () => void;
  incrementAnonCount: () => void;
}

export const useStudyStore = create<StudyStore>()(
  persist(
    (set) => ({
      data: null,
      isLoading: false,
      anonCount: 0,
      setData: (data) => set({ data }),
      setIsLoading: (isLoading) => set({ isLoading }),
      clearData: () => set({ data: null }),
      incrementAnonCount: () => set((state) => ({ anonCount: state.anonCount + 1 })),
    }),
    {
      name: 'notiq-storage',
      partialize: (state) => ({ anonCount: state.anonCount, data: state.data }),
    }
  )
);
