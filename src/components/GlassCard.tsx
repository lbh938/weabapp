'use client';

import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        backdrop-blur-lg bg-white/80 dark:bg-gray-900/80
        border border-white/20 dark:border-gray-700/20
        shadow-xl rounded-2xl
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
} 