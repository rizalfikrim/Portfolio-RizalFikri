'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (isComplete) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-bg flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="text-primary"
          >
            <motion.path
              d="M20 60 L60 20 L100 60 L60 100 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.circle
              cx="60"
              cy="60"
              r="8"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
          </motion.svg>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-2xl font-display font-bold text-primary">RF</span>
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-display text-text-primary">
            Initializing Portfolio
          </h2>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <p className="text-sm text-text-muted">
            {Math.round(progress)}% Complete
          </p>
        </motion.div>

        {/* Animated Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex space-x-2 justify-center"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};