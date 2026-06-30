import { signup } from "./actions";
import { Sparkles, UserPlus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  if (user) {
    redirect("/app");
  }

  const params = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-purple/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-cyan/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
          <Sparkles className="w-8 h-8 text-brand-purple" />
          <span className="text-2xl font-bold text-white tracking-tight font-syne">Notiq AI</span>
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-2 text-center">Create Your Account</h2>
          <p className="text-neutral-400 text-center mb-8 text-sm">Join Notiq AI and start learning smarter</p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all"
                placeholder="John Doe"
              />
            </div>

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
                minLength={6}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all"
                placeholder="••••••••"
              />
              <p className="text-neutral-500 text-xs mt-1.5">Must be at least 6 characters</p>
            </div>

            {params?.error && (
              <p className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                {params.error}
              </p>
            )}

            {params?.message && (
              <p className="text-green-400 text-sm text-center bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                {params.message}
              </p>
            )}

            <div className="pt-2 flex flex-col gap-3">
              <button
                formAction={signup}
                className="w-full bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                Create Account <UserPlus className="w-4 h-4" />
              </button>
            </div>
          </form>

          <p className="text-neutral-500 text-sm text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-purple hover:text-brand-purple/80 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
