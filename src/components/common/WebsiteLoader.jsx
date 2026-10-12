import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandLogo } from './BrandLogo';

export const WebsiteLoader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Initializing FoodVerse...');

  useEffect(() => {
    const messages = [
      'Initializing FoodVerse...',
      'Discovering artisan kitchens...',
      'Curating chef recommendations...',
      'Almost ready to serve!'
    ];

    let messageIdx = 0;
    const messageInterval = setInterval(() => {
      messageIdx = (messageIdx + 1) % messages.length;
      setStatusMessage(messages[messageIdx]);
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 5;
      });
    }, 35);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="website-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
        >
          {/* Warm Floating Accent Glows */}
          <div className="absolute w-72 h-72 rounded-full bg-orange-100/60 blur-3xl pointer-events-none" />
          <div className="absolute w-60 h-60 rounded-full bg-yellow-100/50 blur-3xl pointer-events-none -bottom-10" />

          <div className="relative flex flex-col items-center text-center p-8 max-w-sm">
            {/* Animated Brand Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <BrandLogo size="xl" showText={true} />
            </motion.div>

            {/* Warm Progress Bar Container */}
            <div className="w-56 h-1.5 bg-orange-100 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-orange-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Live Progress Info */}
            <div className="flex items-center justify-between w-56 text-[11px] font-semibold text-slate-500">
              <span className="truncate pr-2">{statusMessage}</span>
              <span className="text-orange-600 font-bold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
