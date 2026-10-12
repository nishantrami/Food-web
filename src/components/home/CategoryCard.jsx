import React from 'react';
import { motion } from 'framer-motion';

export const CategoryCard = ({ category, isSelected, onClick }) => {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`group flex flex-col items-center p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer min-w-[92px] sm:min-w-[108px] text-center select-none ${
        isSelected
          ? 'bg-orange-500 border-orange-500 text-white shadow-xs'
          : 'bg-white hover:bg-orange-50/50 border-slate-200 hover:border-orange-300 text-slate-700 shadow-2xs'
      }`}
    >
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl mb-2 transition-transform duration-200 ${
        isSelected 
          ? 'bg-white/20 text-white' 
          : 'bg-orange-50 group-hover:bg-amber-100/70 text-orange-600'
      }`}>
        <i className={category.faIcon || 'fa-solid fa-utensils'} aria-hidden="true" />
      </div>
      <span className="text-xs sm:text-sm font-bold truncate max-w-[85px] tracking-tight">
        {category.name}
      </span>
      <span className={`text-[10px] font-medium mt-0.5 ${isSelected ? 'text-amber-200' : 'text-slate-400'}`}>
        {category.itemCount}
      </span>
    </motion.button>
  );
};
