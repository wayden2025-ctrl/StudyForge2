"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { Card } from "@/components/ui/card";
import { useStudyStore } from "@/store/useStudyStore";
import { BookOpen, Sparkles, BrainCircuit, ChevronDown, Save, Loader2, Download, Copy, Share2, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createClient } from "@/utils/supabase/client";

export default function StudyPage() {
  const { data } = useStudyStore();
  const [expandedConcept, setExpandedConcept] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [tier, setTier] = useState("free");
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setTier(data.user?.user_metadata?.subscription_tier || "free");
    });
  }, []);

  const isPro = tier === "pro" || tier === "max";

  const handleExportPDF = () => {
    if (!isPro) {
      alert("🔒 Pro Feature: Upgrade your plan to export beautifully formatted PDFs!");
      return;
    }
    window.print();
  };

  const handleCopyNotion = () => {
    if (!isPro) {
      alert("🔒 Pro Feature: Upgrade your plan to export to Notion!");
      return;
    }
    if (!data) return;
    const markdown = `# ${data.summary}\n\n## Key Concepts\n${data.key_concepts.map(c => `- **${c.title}**: ${c.description}`).join('\n')}\n\n## Detailed Notes\n${data.detailed_notes}\n\n## Mnemonics\n${data.mnemonics.map(m => `- ${m}`).join('\n')}`;
    navigator.clipboard.writeText(markdown);
    alert("Copied to clipboard! Paste directly into Notion.");
  };

  const handleShare = async () => {
    if (!isPro) {
      setShowShareModal(true);
      return;
    }
    if (!data) return;
    setIsSharing(true);
    try {
      const res = await fetch("/api/share-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.summary,
          summary: data.summary,
          key_concepts: data.key_concepts,
          detailed_notes: data.detailed_notes,
          mnemonics: data.mnemonics,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to share");
      const shareUrl = `${window.location.origin}/share/${json.share_token}`;
      await navigator.clipboard.writeText(shareUrl);
      alert(`✅ Share link copied to clipboard!\n${shareUrl}`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSharing(false);
    }
  };

  const handleSaveNote = async () => {
    if (!data) return;
    const title = prompt("Enter a title for this study set:", "My Study Notes");
    if (!title) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/save-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          summary: data.summary,
          key_concepts: data.key_concepts,
          detailed_notes: data.detailed_notes,
          mnemonics: data.mnemonics
        })
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save note");
      
      alert("Successfully saved to your Library!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

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
      {/* Share Paywall Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0f0f0f] border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden text-center"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple to-brand-cyan" />
              <div className="w-16 h-16 bg-brand-cyan/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Share2 className="w-8 h-8 text-brand-cyan" />
              </div>
              <h2 className="text-2xl font-bold mb-4 font-syne tracking-tight text-white">Share with Friends</h2>
              <p className="text-neutral-300 mb-8 leading-relaxed font-medium">
                Sharing is a <span className="text-brand-cyan font-bold">Pro-exclusive</span> feature. Upgrade to instantly generate a link and send your AI study guides to classmates and study groups!
              </p>
              <div className="flex flex-col space-y-3">
                <Button
                  onClick={() => { setShowShareModal(false); window.location.href = '/upgrade'; }}
                  className="w-full bg-gradient-to-r from-brand-purple to-brand-cyan hover:from-brand-cyan hover:to-brand-purple text-white font-bold shadow-lg rounded-xl py-6 text-lg transition-transform hover:scale-[1.02]"
                >
                  Upgrade to Pro
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowShareModal(false)}
                  className="w-full text-neutral-400 hover:text-white rounded-xl"
                >
                  Maybe later
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Study Notes</h1>
            <p className="text-neutral-400">Your AI-generated summary and key concepts.</p>
          </div>
          <div className="hidden sm:flex space-x-3 items-center">
            {/* Export Buttons */}
            <div className="flex bg-white/5 rounded-xl p-1.5 border border-white/10 relative shadow-lg">
              {!isPro && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1.5px] rounded-xl z-10 flex items-center justify-center cursor-not-allowed group" title="Pro Feature">
                   <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-brand-purple text-white text-xs font-bold py-1.5 px-3 rounded-md transition-opacity whitespace-nowrap pointer-events-none shadow-xl">Upgrade to unlock Export</div>
                </div>
              )}
              <Button variant="ghost" className="text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2 h-auto font-medium transition-colors">
                <Download className="w-4 h-4 mr-2" /> PDF
              </Button>
              <Button variant="ghost" className="text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2 h-auto font-medium transition-colors">
                <Copy className="w-4 h-4 mr-2" /> Notion
              </Button>
            </div>
            
            <div className="w-px h-8 bg-white/10 mx-2"></div>

            <Button 
              variant="outline" 
              onClick={handleSaveNote}
              disabled={isSaving}
              className="rounded-xl px-4 py-2 h-auto border-brand-purple/50 hover:bg-brand-purple hover:text-white text-brand-purple font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
            >
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save to Library
            </Button>
            <Link href="/flashcards">
              <Button variant="outline" className="rounded-xl px-4 py-2 h-auto border-brand-blue/30 hover:bg-brand-blue hover:text-white text-brand-blue font-bold transition-all hover:border-brand-blue">
                <BookOpen className="w-4 h-4 mr-2" />
                Practice Flashcards
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="outline" className="rounded-xl px-4 py-2 h-auto border-brand-purple/30 hover:bg-brand-purple hover:text-white text-brand-purple font-bold transition-all hover:border-brand-purple">
                <BrainCircuit className="w-4 h-4 mr-2" />
                Take Quiz
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleShare}
              disabled={isSharing}
              className="rounded-xl px-4 py-2 h-auto border-brand-cyan/30 hover:bg-brand-cyan hover:text-black text-brand-cyan font-bold transition-all hover:border-brand-cyan"
            >
              {isSharing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Share2 className="w-4 h-4 mr-2" />}
              Share
            </Button>
          </div>
        </div>

        {/* Mobile Toolbar */}
        <div className="flex sm:hidden gap-2 flex-wrap">
          <Button variant="outline" onClick={handleSaveNote} disabled={isSaving} className="flex-1 min-w-[calc(50%-0.25rem)] rounded-xl py-3 h-auto border-brand-purple/30 text-brand-purple font-bold text-xs">
            {isSaving ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5" />}
            Save
          </Button>
          <Link href="/flashcards" className="flex-1 min-w-[calc(50%-0.25rem)]">
            <Button variant="outline" className="w-full rounded-xl py-3 h-auto border-brand-blue/30 text-brand-blue font-bold text-xs">
              <BookOpen className="w-4 h-4 mr-1.5" /> Flashcards
            </Button>
          </Link>
          <Link href="/quiz" className="flex-1 min-w-[calc(50%-0.25rem)]">
            <Button variant="outline" className="w-full rounded-xl py-3 h-auto border-brand-purple/30 text-brand-purple font-bold text-xs">
              <BrainCircuit className="w-4 h-4 mr-1.5" /> Quiz
            </Button>
          </Link>
          <Button variant="outline" onClick={handleShare} disabled={isSharing} className="flex-1 min-w-[calc(50%-0.25rem)] rounded-xl py-3 h-auto border-brand-cyan/30 text-brand-cyan font-bold text-xs">
            {isSharing ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Share2 className="w-4 h-4 mr-1.5" />}
            Share
          </Button>
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

        {data.detailed_notes && (
          <Card className="space-y-6 mt-8 bg-neutral-900/50 border-white/10">
            <div className="flex items-center space-x-3 text-brand-purple mb-6">
              <BookOpen className="w-6 h-6" />
              <h2 className="text-xl font-semibold text-white">Detailed Study Notes</h2>
            </div>
            <div className="prose prose-invert prose-brand max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {data.detailed_notes}
              </ReactMarkdown>
            </div>
          </Card>
        )}
      </div>
    </PageWrapper>
  );
}
