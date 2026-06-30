"use client";

import { motion } from "framer-motion";
import { BookOpen, BrainCircuit, LayoutDashboard, Menu, Sparkles, User, Zap, CalendarDays } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/client";

const NAV_ITEMS = [
  { name: "Input Hub", href: "/app", icon: LayoutDashboard },
  { name: "Study Plans", href: "/study-plans", icon: CalendarDays },
  { name: "Flashcards", href: "/flashcards", icon: BookOpen },
  { name: "Quiz Mode", href: "/quiz", icon: BrainCircuit },
  { name: "Study Notes", href: "/study", icon: Sparkles },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const [userLimits, setUserLimits] = useState({
    tier: "free",
    studyGens: 0,
    studyMax: 5,
    planGens: 0,
    planMax: 5
  });

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const meta = user.user_metadata || {};
        const tier = meta.subscription_tier || "free";
        let sMax = 5; let pMax = 5;
        if (tier === "pro") { sMax = 50; pMax = 50; }
        if (tier === "max") { sMax = Infinity; pMax = Infinity; }

        setUserLimits({
          tier,
          studyGens: meta.generation_count || 0,
          studyMax: sMax,
          planGens: meta.plan_generation_count || 0,
          planMax: pMax
        });
      }
    }
    loadUser();
  }, [pathname]); // reload when navigation happens so limits stay somewhat fresh

  return (
    <div className="flex min-h-screen">
      {/* Mobile Nav Toggle */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 glass rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className={`fixed inset-y-0 left-0 z-40 w-64 glass border-r border-white/5 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full px-4 py-8 flex flex-col">
          <Link href="/" className="flex items-center justify-start space-x-3 mb-10 px-2 group">
            <div className="relative w-12 h-12 transition-transform duration-300 ease-in-out group-hover:scale-110 group-active:scale-95 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Image 
                src="/logo.png" 
                alt="StudyForge Logo" 
                fill
                className="object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
              />
            </div>
            <span className="text-xl font-bold text-gradient opacity-90 transition-opacity duration-300 group-hover:opacity-100">StudyForge</span>
          </Link>
          
          <nav className="flex-1 space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  <div
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-white/10 text-white shadow-sm"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-brand-cyan" : ""}`} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Trackers */}
          <div className="px-4 mt-auto mb-4 space-y-4">
            <div>
              <div className="flex justify-between text-xs text-neutral-400 mb-1.5">
                <span className="font-medium tracking-wide uppercase text-[10px]">Study Gens</span>
                <span className="font-bold">{userLimits.studyGens} / {userLimits.studyMax === Infinity ? '∞' : userLimits.studyMax}</span>
              </div>
              <div className="w-full bg-white/5 border border-white/10 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-brand-purple to-purple-400 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (userLimits.studyGens/userLimits.studyMax)*100)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-neutral-400 mb-1.5">
                <span className="font-medium tracking-wide uppercase text-[10px]">Plan Gens</span>
                <span className="font-bold">{userLimits.planGens} / {userLimits.planMax === Infinity ? '∞' : userLimits.planMax}</span>
              </div>
              <div className="w-full bg-white/5 border border-white/10 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-brand-cyan to-blue-400 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (userLimits.planGens/userLimits.planMax)*100)}%` }}></div>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="space-y-2">
            {/* Upgrade Button */}
            <div className="pb-2 relative group">
              <Link href="/upgrade">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-blue opacity-30 blur-md rounded-xl group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="relative w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-brand-purple/30 to-brand-blue/30 border border-brand-purple/40 text-white hover:border-brand-purple/70 transition-all cursor-pointer shadow-lg">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300/50 animate-pulse" />
                    <span className="font-bold text-sm tracking-wide">Upgrade to Pro</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Account & Logout */}
            <div className="pt-2 border-t border-white/10 space-y-1">
              <Link href="/account">
                <div className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-neutral-400 hover:text-white hover:bg-white/5">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Account Settings</span>
                </div>
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-neutral-400 hover:text-white hover:bg-white/5 hover:text-red-400"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
