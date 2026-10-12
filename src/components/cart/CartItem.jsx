import React from 'react';
import { motion } from 'framer-motion';
import { QuantitySelector } from '../common/QuantitySelector';
import { formatPrice } from '../../utils/formatCurrency';

export const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all"
    >
      {/* Item Image */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <span className={`absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
          item.isVeg ? 'bg-emerald-500' : 'bg-rose-600'
        }`} />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-black text-slate-800 text-sm sm:text-base truncate">
          {item.name}
        </h4>
        
        <p className="text-xs text-slate-400 font-bold truncate">
          {item.restaurantName}
        </p>

        {item.customizationSummary && (
          <p className="text-[11px] text-orange-600 font-bold mt-0.5 truncate">
            {item.customizationSummary}
          </p>
        )}

        <div className="flex items-center gap-2 mt-1.5 sm:hidden">
          <span className="font-black text-slate-900 text-sm">
            {formatPrice(item.price * item.quantity)}
          </span>
          <span className="text-[10px] text-slate-400 font-semibold">
            ({formatPrice(item.price)} each)
          </span>
        </div>
      </div>

      {/* Quantity Selector & Trash */}
      <div className="shrink-0 flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
        <div className="hidden sm:block text-right">
          <p className="font-black text-slate-900 text-sm sm:text-base">
            {formatPrice(item.price * item.quantity)}
          </p>
          {item.quantity > 1 && (
            <p className="text-[10px] text-slate-400 font-bold">
              {formatPrice(item.price)} each
            </p>
          )}
        </div>

        <QuantitySelector
          size="sm"
          quantity={item.quantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          showTrashOnMin={true}
        />

        <button
          type="button"
          onClick={onRemove}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
          aria-label={`Remove ${item.name} from cart`}
        >
          <i className="fa-solid fa-trash-can text-xs" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
};
