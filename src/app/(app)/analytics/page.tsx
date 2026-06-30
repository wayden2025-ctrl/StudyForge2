import { createClient } from "@/utils/supabase/server";
import { PageWrapper } from "@/components/PageWrapper";
import { Card } from "@/components/ui/card";
import { Lock, BarChart3, TrendingUp, Zap, Target, BookOpen } from "lucide-react";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-4">
          <h2 className="text-2xl font-bold">Not Logged In</h2>
          <p className="text-neutral-400">Please log in to view your analytics.</p>
        </div>
      </PageWrapper>
    );
  }

  const tier = user.user_metadata?.subscription_tier || "free";
  const isPro = tier === "pro" || tier === "max";

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Study Analytics</h1>
          <p className="text-neutral-400">Track your progress and learning patterns.</p>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/10 p-8 bg-white/5 min-h-[60vh]">
          {!isPro && (
            <a href="/upgrade" className="absolute inset-0 bg-black/60 backdrop-blur-xl z-10 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-black/70 transition-colors group">
              <div className="w-16 h-16 bg-brand-cyan/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-8 h-8 text-brand-cyan" />
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-brand-cyan transition-colors">Advanced Study Analytics</h3>
              <p className="text-neutral-300 max-w-md text-lg mb-8">
                Upgrade to Pro to unlock deep insights into your study habits, track your streak, and visualize your learning progress over time.
              </p>
              <div className="bg-brand-cyan text-black font-bold px-8 py-3 rounded-full group-hover:bg-brand-cyan/90 transition-transform group-hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                Upgrade to Pro
              </div>
            </a>
          )}

          {/* Analytics Content (Blurred if Free) */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-white/5 border-white/10 flex flex-col justify-between h-32">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 font-medium">Study Streak</span>
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-bold text-white">12</span>
                  <span className="text-neutral-400 mb-1">Days</span>
                </div>
              </Card>
              
              <Card className="p-6 bg-white/5 border-white/10 flex flex-col justify-between h-32">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 font-medium">Materials Generated</span>
                  <Target className="w-5 h-5 text-brand-purple" />
                </div>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-bold text-white">48</span>
                  <span className="text-neutral-400 mb-1">Total</span>
                </div>
              </Card>

              <Card className="p-6 bg-white/5 border-white/10 flex flex-col justify-between h-32">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 font-medium">Flashcards Mastered</span>
                  <BookOpen className="w-5 h-5 text-brand-blue" />
                </div>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-bold text-white">156</span>
                  <span className="text-neutral-400 mb-1">Cards</span>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-white/5 border-white/10 h-80 flex flex-col">
              <div className="flex items-center space-x-2 mb-6">
                <BarChart3 className="w-5 h-5 text-brand-cyan" />
                <h3 className="text-xl font-bold">Activity This Week</h3>
              </div>
              <div className="flex-1 flex items-end justify-between px-4 pb-2">
                {/* Dummy Chart Bars */}
                {[40, 70, 45, 90, 60, 20, 100].map((height, i) => (
                  <div key={i} className="flex flex-col items-center space-y-2 w-full">
                    <div className="w-full max-w-[2rem] bg-brand-cyan/20 rounded-t-sm relative group overflow-hidden">
                      <div 
                        className="absolute bottom-0 w-full bg-brand-cyan rounded-t-sm transition-all duration-1000 ease-out"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="text-xs text-neutral-500 uppercase">{['M','T','W','T','F','S','S'][i]}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
