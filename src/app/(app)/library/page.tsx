import { createClient } from "@/utils/supabase/server";
import { PageWrapper } from "@/components/PageWrapper";
import { Card } from "@/components/ui/card";
import { BookOpen, Bookmark, FileText, Calendar, Folder, Plus, Lock } from "lucide-react";

export default async function LibraryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-4">
          <h2 className="text-2xl font-bold">Not Logged In</h2>
          <p className="text-neutral-400">Please log in to view your saved library.</p>
        </div>
      </PageWrapper>
    );
  }

  const tier = user.user_metadata?.subscription_tier || "free";
  const isPro = tier === "pro" || tier === "max";

  const { data: notes } = await supabase
    .from('saved_notes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const { data: flashcards } = await supabase
    .from('saved_flashcards')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Library</h1>
          <p className="text-neutral-400">Your saved study notes and flashcards.</p>
        </div>

        {/* Folders Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-brand-cyan">
              <Folder className="w-6 h-6" />
              <h2 className="text-2xl font-semibold text-white">Folders</h2>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden border border-white/10 p-6 bg-white/5">
            {!isPro && (
              <a href="/upgrade" className="absolute inset-0 bg-black/60 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-black/70 transition-colors group">
                <div className="w-12 h-12 bg-brand-purple/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-brand-purple transition-colors">Unlock Folders</h3>
                <p className="text-neutral-300 max-w-sm">
                  Upgrade to Pro to organize your study sets, flashcards, and notes into custom folders.
                </p>
              </a>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Dummy Folders to show the blurred UI */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-white/10 transition-colors">
                <Folder className="w-8 h-8 text-brand-cyan" />
                <span className="font-medium text-sm">Mathematics</span>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-white/10 transition-colors">
                <Folder className="w-8 h-8 text-green-400" />
                <span className="font-medium text-sm">Science Biology</span>
              </div>
              <div className="p-4 rounded-lg bg-brand-purple/10 border border-brand-purple/30 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-brand-purple/20 transition-colors text-brand-purple">
                <Plus className="w-8 h-8" />
                <span className="font-medium text-sm">New Folder</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-8 border-t border-white/10">
          <div className="flex items-center space-x-3 text-brand-purple">
            <FileText className="w-6 h-6" />
            <h2 className="text-2xl font-semibold text-white">Saved Notes</h2>
          </div>
          
          {!notes || notes.length === 0 ? (
            <p className="text-neutral-500 italic">No notes saved yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {notes.map((note: any) => (
                <Card key={note.id} className="p-6 bg-white/5 border-white/10 hover:border-brand-purple/50 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-2">{note.title}</h3>
                  <div className="flex items-center text-xs text-neutral-500 mb-4">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(note.created_at).toLocaleDateString()}
                  </div>
                  <p className="text-neutral-300 line-clamp-3 mb-4 text-sm">
                    {note.summary}
                  </p>
                  <p className="text-xs font-medium text-brand-purple">
                    {note.key_concepts?.length || 0} Key Concepts
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6 pt-8 border-t border-white/10">
          <div className="flex items-center space-x-3 text-brand-blue">
            <Bookmark className="w-6 h-6" />
            <h2 className="text-2xl font-semibold text-white">Saved Flashcards</h2>
          </div>

          {!flashcards || flashcards.length === 0 ? (
            <p className="text-neutral-500 italic">No flashcards saved yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {flashcards.map((fc: any) => (
                <Card key={fc.id} className="p-6 flex flex-col justify-between bg-white/5 border-white/10">
                  <div className="mb-4">
                    <span className="text-xs font-bold text-brand-blue mb-2 block uppercase tracking-wider">Question</span>
                    <p className="text-white font-medium">{fc.question}</p>
                  </div>
                  <div className="pt-4 border-t border-white/10 mt-auto">
                    <span className="text-xs font-bold text-brand-cyan mb-2 block uppercase tracking-wider">Answer</span>
                    <p className="text-neutral-300 text-sm">{fc.answer}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
