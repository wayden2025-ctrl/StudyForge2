import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export function BrainLoader({ text = "AI is thinking..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-brand-purple blur-xl opacity-50 rounded-full" />
        <BrainCircuit className="w-16 h-16 text-brand-cyan relative z-10" />
      </motion.div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-lg font-medium text-gradient"
      >
        {text}
      </motion.p>
    </div>
  );
}
