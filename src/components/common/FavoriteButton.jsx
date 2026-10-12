import React from 'react';
import { motion } from 'framer-motion';

export const FavoriteButton = ({ isFavorite, onToggle, size = 'md', className = '' }) => {
  const sizeMap = {
    sm: { btn: 'w-8 h-8', icon: 'text-sm' },
    md: { btn: 'w-10 h-10', icon: 'text-base' },
    lg: { btn: 'w-12 h-12', icon: 'text-lg' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={`rounded-full shadow-md backdrop-blur-md transition-all duration-200 cursor-pointer flex items-center justify-center ${
        isFavorite 
          ? 'bg-rose-50 text-rose-500 ring-2 ring-rose-200' 
          : 'bg-white/90 hover:bg-white text-slate-400 hover:text-rose-500 hover:shadow-lg'
      } ${currentSize.btn} ${className}`}
    >
      <motion.div
        animate={isFavorite ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-center"
      >
        <i 
          className={`${isFavorite ? 'fa-solid fa-heart text-rose-500' : 'fa-regular fa-heart'} ${currentSize.icon}`} 
          aria-hidden="true" 
        />
      </motion.div>
    </motion.button>
  );
};
