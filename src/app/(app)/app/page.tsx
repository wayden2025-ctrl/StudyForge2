"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { BrainLoader } from "@/components/ui/brain-loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useStudyStore } from "@/store/useStudyStore";
import { FileText, Sparkles, Upload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AppHubPage() {
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { isLoading, setIsLoading, setData, anonCount, incrementAnonCount } = useStudyStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));
  }, []);

  const isAnonBlocked = isLoggedIn === false && anonCount >= 3;

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
      if (!isLoggedIn) incrementAnonCount();
      router.push("/study");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to generate study materials. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const processFile = async (file: File) => {
    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText((prev) => (prev ? prev + "\n\n" + content : content));
      };
      reader.readAsText(file);
      return;
    }

    if (file.type === "application/pdf") {
      setIsParsing(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/parse", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Failed to parse PDF");
        
        const data = await res.json();
        setText((prev) => (prev ? prev + "\n\n" + data.text : data.text));
      } catch (error) {
        console.error(error);
        alert("Failed to read the PDF. Please try copying the text manually.");
      } finally {
        setIsParsing(false);
      }
      return;
    }

    alert("Unsupported file type. Please upload a .txt or .pdf file.");
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await processFile(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await processFile(file);
    }
    // Reset input so the same file can be uploaded again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
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
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".pdf,.txt" 
            className="hidden" 
          />
          
          <div 
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => !isParsing && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
              isDragging ? "border-brand-purple bg-brand-purple/10" : "border-white/10 hover:bg-white/5 hover:border-white/20"
            } ${isParsing ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
          >
            {isParsing ? (
              <>
                <Loader2 className="w-8 h-8 mb-4 text-brand-cyan animate-spin" />
                <h3 className="font-semibold text-lg mb-1">Reading Document...</h3>
                <p className="text-sm text-neutral-400">This might take a few seconds.</p>
              </>
            ) : (
              <>
                <div className="flex gap-4 mb-4">
                  <Upload className={`w-8 h-8 ${isDragging ? 'text-brand-purple' : 'text-brand-cyan'}`} />
                  <FileText className={`w-8 h-8 ${isDragging ? 'text-brand-purple' : 'text-neutral-500'}`} />
                </div>
                <h3 className="font-semibold text-lg mb-1">Drag & Drop Documents</h3>
                <p className="text-sm text-neutral-400">Supports .PDF and .TXT files (or click to browse)</p>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-neutral-500 font-medium text-sm">OR PASTE TEXT</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your lecture notes, textbook chapters, or transcript here... (Uploaded text will appear here!)"
            className="w-full h-64 bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-purple resize-none placeholder:text-neutral-600"
          />

          <div className="flex flex-col items-end gap-3">
            {isAnonBlocked && (
              <p className="text-red-400 text-sm bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
                You have used your 3 free anonymous generations. 
                <a href="/login" className="font-bold underline ml-1 hover:text-white transition-colors">Create a free account to continue!</a>
              </p>
            )}
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!text.trim() || isParsing || isAnonBlocked}
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
