import React from 'react';
import { motion } from 'framer-motion';

export const QuantitySelector = ({
  quantity = 1,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'md',
  showTrashOnMin = false
}) => {
  const isSm = size === 'sm';

  const btnClasses = `flex items-center justify-center rounded-lg transition-colors cursor-pointer select-none ${
    isSm ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'
  } bg-orange-100/80 hover:bg-orange-200 text-orange-800 active:bg-orange-300`;

  return (
    <div 
      className={`inline-flex items-center gap-1.5 bg-orange-50/70 border border-orange-200/60 rounded-xl p-1 shadow-2xs ${
        isSm ? 'px-1 py-0.5' : 'px-2 py-1'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        onClick={onDecrease}
        disabled={!showTrashOnMin && quantity <= min}
        aria-label="Decrease quantity"
        className={`${btnClasses} ${(!showTrashOnMin && quantity <= min) ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        {showTrashOnMin && quantity === min ? (
          <i className="fa-solid fa-trash-can text-rose-600 text-[11px]" aria-hidden="true" />
        ) : (
          <i className="fa-solid fa-minus text-[10px]" aria-hidden="true" />
        )}
      </motion.button>

      <span className={`font-black text-slate-800 text-center select-none ${isSm ? 'w-5 text-xs' : 'w-7 text-sm'}`}>
        {quantity}
      </span>

      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`${btnClasses} ${quantity >= max ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        <i className="fa-solid fa-plus text-[10px]" aria-hidden="true" />
      </motion.button>
    </div>
  );
};
