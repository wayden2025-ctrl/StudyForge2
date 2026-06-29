"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { BrainLoader } from "@/components/ui/brain-loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useStudyStore } from "@/store/useStudyStore";
import { Sparkles, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AppHubPage() {
  const [text, setText] = useState("");
  const { isLoading, setIsLoading, setData } = useStudyStore();
  const router = useRouter();

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to generate");

      const data = await res.json();
      setData(data);
      router.push("/study"); // Auto-navigate to study notes first
    } catch (error) {
      console.error(error);
      alert("Failed to generate study materials. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <PageWrapper className="flex items-center justify-center min-h-[70vh]">
        <BrainLoader text="Forging your study materials..." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Input Hub</h1>
          <p className="text-neutral-400">Paste your notes or upload a document to get started.</p>
        </div>

        <Card className="flex flex-col space-y-4">
          <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mb-4 text-brand-cyan" />
            <h3 className="font-semibold text-lg mb-1">Drag & Drop PDF</h3>
            <p className="text-sm text-neutral-400">or click to browse files (mock UI for now)</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-neutral-500 font-medium">OR PASTE TEXT</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your lecture notes, textbook chapters, or transcript here..."
            className="w-full h-64 bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-purple resize-none placeholder:text-neutral-600"
          />

          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!text.trim()}
              className="w-full sm:w-auto"
            >
              <Sparkles className="w-5 h-5 mr-2 text-brand-blue" />
              Generate Study Materials
            </Button>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
