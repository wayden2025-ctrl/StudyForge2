import { createClient } from "@/utils/supabase/server";
import { User, ShieldCheck, Zap, Activity } from "lucide-react";
import Link from "next/link";
import AccountUsageClient from "./AccountUsageClient";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const isAnonymous = !user;
  const userMetadata = user?.user_metadata || {};
  const generationsUsed = userMetadata.generations_used || 0;
  const MAX_AUTH_GENS = 10;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <User className="w-8 h-8 text-brand-purple" />
          Account Settings
        </h1>
        <p className="text-neutral-400">Manage your subscription, usage, and profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="md:col-span-2 glass border border-white/5 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/5 blur-[80px] rounded-full pointer-events-none" />
          
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-cyan" />
            Profile Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-neutral-400">Email Address</label>
              <div className="mt-1 flex items-center">
                <span className="text-lg text-white">{user?.email || "Anonymous User"}</span>
                {isAnonymous && (
                  <span className="ml-3 px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-neutral-300">
                    Not signed in
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-400">Current Plan</label>
              <div className="mt-1 flex items-center">
                <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">
                  Free Tier
                </span>
              </div>
            </div>

            {isAnonymous && (
              <div className="pt-4 border-t border-white/10 mt-6">
                <p className="text-sm text-neutral-400 mb-4">
                  Create an account to unlock 10 free generations and save your study materials permanently.
                </p>
                <Link 
                  href="/login"
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
                >
                  Create Account / Sign In
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Usage Card */}
        <div className="glass border border-white/5 p-6 rounded-2xl relative overflow-hidden flex flex-col">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-cyan/5 blur-[50px] rounded-full pointer-events-none" />
          
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-cyan" />
            Usage Status
          </h2>
          
          <div className="flex-1 flex flex-col justify-center">
            {isAnonymous ? (
              <AccountUsageClient />
            ) : (
              <div className="text-center">
                <div className="text-4xl font-extrabold text-white mb-2">
                  {generationsUsed} <span className="text-lg text-neutral-500 font-medium">/ {MAX_AUTH_GENS}</span>
                </div>
                <p className="text-sm text-neutral-400">Generations used this month.</p>
                
                <div className="w-full h-2 bg-white/5 rounded-full mt-6 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-blue to-brand-purple rounded-full" 
                    style={{ width: `${(generationsUsed / MAX_AUTH_GENS) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <button className="text-sm font-medium text-brand-cyan hover:text-brand-purple transition-colors">
              Upgrade Plan &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
