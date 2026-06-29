import { create } from 'zustand';

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
  correct: string; // The correct option exactly matching one of the options
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
  setData: (data: StudyData) => void;
  setIsLoading: (loading: boolean) => void;
  clearData: () => void;
}

export const useStudyStore = create<StudyStore>((set) => ({
  data: null,
  isLoading: false,
  setData: (data) => set({ data }),
  setIsLoading: (isLoading) => set({ isLoading }),
  clearData: () => set({ data: null }),
}));
