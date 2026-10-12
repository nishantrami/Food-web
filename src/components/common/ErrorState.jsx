import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

export const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load the requested food data right now. Please check your connection and try again.",
  onRetry
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center px-4 py-16 max-w-md mx-auto"
    >
      <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-5 shadow-sm">
        <i className="fa-solid fa-triangle-exclamation text-2xl" aria-hidden="true" />
      </div>

      <h3 className="text-xl font-black text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm mb-6 leading-relaxed">{message}</p>

      {onRetry && (
        <Button onClick={onRetry} variant="outline" icon="fa-solid fa-arrows-rotate">
          Try Again
        </Button>
      )}
    </motion.div>
  );
};
