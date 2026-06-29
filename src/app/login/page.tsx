import { login, signup } from "./actions";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  if (user) {
    redirect("/app");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-purple/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
          <Sparkles className="w-8 h-8 text-brand-purple" />
          <span className="text-2xl font-bold text-white tracking-tight font-syne">StudyForge</span>
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-2 text-center">Welcome Back</h2>
          <p className="text-neutral-400 text-center mb-8 text-sm">Sign in to access your study materials</p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all"
                placeholder="you@school.edu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all"
                placeholder="••••••••"
              />
            </div>

            {searchParams?.error && (
              <p className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                {searchParams.error}
              </p>
            )}

            <div className="pt-2 flex flex-col gap-3">
              <button
                formAction={login}
                className="w-full bg-white text-black font-semibold rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                formAction={signup}
                className="w-full bg-transparent border border-white/20 text-white font-medium rounded-xl py-3 hover:bg-white/5 transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
