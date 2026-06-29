"use client";

import { useStudyStore } from "@/store/useStudyStore";
import { useEffect, useState } from "react";

export default function AccountUsageClient() {
  const { anonCount } = useStudyStore();
  const MAX_ANON_GENS = 3;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="animate-pulse h-16 bg-white/5 rounded-xl"></div>;
  }

  return (
    <div className="text-center">
      <div className="text-4xl font-extrabold text-white mb-2">
        {anonCount} <span className="text-lg text-neutral-500 font-medium">/ {MAX_ANON_GENS}</span>
      </div>
      <p className="text-sm text-neutral-400">Free generations used.</p>
      
      <div className="w-full h-2 bg-white/5 rounded-full mt-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-neutral-600 to-neutral-400 rounded-full transition-all" 
          style={{ width: `${(anonCount / MAX_ANON_GENS) * 100}%` }}
        />
      </div>
    </div>
  );
}
