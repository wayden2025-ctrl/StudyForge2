"use client";

import { motion } from "framer-motion";
import { BookOpen, BrainCircuit, LayoutDashboard, Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { name: "Input Hub", href: "/app", icon: LayoutDashboard },
  { name: "Flashcards", href: "/flashcards", icon: BookOpen },
  { name: "Quiz Mode", href: "/quiz", icon: BrainCircuit },
  { name: "Study Notes", href: "/study", icon: Sparkles },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
          <Link href="/" className="flex items-center space-x-2 mb-12 px-2">
            <Sparkles className="w-8 h-8 text-brand-purple" />
            <span className="text-xl font-bold text-gradient">StudyForge</span>
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
