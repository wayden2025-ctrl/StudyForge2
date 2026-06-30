import { createClient } from "@supabase/supabase-js";
import { Card } from "@/components/ui/card";
import { BookOpen, Sparkles, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

// Use the service role or anon key directly so unauthenticated visitors can view shared notes
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function SharedNotePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const { data: note, error } = await supabase
    .from("saved_notes")
    .select("*")
    .eq("share_token", token)
    .eq("is_shared", true)
    .single();

  if (error || !note) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold font-syne">Link Not Found</h1>
          <p className="text-neutral-400">This shared study guide may have been removed or the link is invalid.</p>
          <Link href="/" className="text-brand-cyan underline hover:text-white transition-colors">
            Go to Notiq AI →
          </Link>
        </div>
      </div>
    );
  }

  const keyConcepts = note.key_concepts || [];
  const mnemonics = note.mnemonics || [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-purple to-brand-cyan">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-sm md:text-base">
              This study guide was generated in seconds with Notiq AI Pro
            </span>
          </div>
          <Link
            href="/signup"
            className="bg-white text-black font-bold text-sm px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors whitespace-nowrap shadow-lg"
          >
            Try Free →
          </Link>
        </div>
      </div>

      {/* Ambient background glows */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-blue/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-purple/15 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        {/* Title */}
        <div>
          <h1 className="text-4xl font-bold font-syne tracking-tight mb-3">{note.title}</h1>
          <p className="text-neutral-400 text-lg">Shared study guide · Powered by Notiq AI</p>
        </div>

        {/* Summary */}
        <Card className="bg-white/5 border-white/10 p-6 space-y-4">
          <div className="flex items-center space-x-3 text-brand-cyan mb-2">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-xl font-bold font-syne">Summary</h2>
          </div>
          <p className="text-neutral-200 leading-relaxed text-lg">{note.summary}</p>
        </Card>

        {/* Key Concepts */}
        {keyConcepts.length > 0 && (
          <Card className="bg-white/5 border-white/10 p-6 space-y-4">
            <div className="flex items-center space-x-3 text-brand-purple mb-2">
              <BookOpen className="w-5 h-5" />
              <h2 className="text-xl font-bold font-syne">Key Concepts</h2>
            </div>
            <div className="space-y-4">
              {keyConcepts.map((concept: any, i: number) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <h3 className="font-bold text-white mb-1">{concept.title}</h3>
                  <p className="text-neutral-300 text-sm leading-relaxed">{concept.description}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Detailed Notes */}
        {note.detailed_notes && (
          <Card className="bg-white/5 border-white/10 p-6 space-y-4">
            <div className="flex items-center space-x-3 text-brand-blue mb-2">
              <Zap className="w-5 h-5" />
              <h2 className="text-xl font-bold font-syne">Detailed Notes</h2>
            </div>
            <div className="text-neutral-200 leading-relaxed whitespace-pre-wrap">{note.detailed_notes}</div>
          </Card>
        )}

        {/* Mnemonics */}
        {mnemonics.length > 0 && (
          <Card className="bg-white/5 border-white/10 p-6 space-y-4">
            <div className="flex items-center space-x-3 text-yellow-400 mb-2">
              <Sparkles className="w-5 h-5" />
              <h2 className="text-xl font-bold font-syne">Memory Tricks</h2>
            </div>
            <ul className="space-y-2">
              {mnemonics.map((m: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-yellow-400/60 shrink-0 mt-0.5">💡</span>
                  <span className="text-neutral-200">{m}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Bottom CTA */}
        <div className="text-center space-y-6 pt-8 pb-4">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-brand-purple/50 mx-auto" />
          <h2 className="text-3xl font-bold font-syne tracking-tight">
            Want your own AI study guides?
          </h2>
          <p className="text-neutral-400 text-lg max-w-md mx-auto">
            Notiq AI generates flashcards, quizzes, summaries, and detailed notes from any text in seconds. Completely free to start.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-bold px-8 py-4 rounded-full text-lg hover:from-brand-cyan hover:to-brand-purple transition-all shadow-[0_4px_20px_rgba(168,85,247,0.5)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.6)] hover:-translate-y-1"
          >
            Create Your Free Account <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
