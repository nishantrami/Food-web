import React from 'react';

export const Rating = ({ rating = 0, reviewsCount, size = 'sm', showCount = true }) => {
  const isSm = size === 'sm';
  
  return (
    <div className="inline-flex items-center gap-1.5 select-none">
      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg font-extrabold shadow-2xs ${
        rating >= 4.5 
          ? 'bg-emerald-500 text-white' 
          : rating >= 4.0 
          ? 'bg-emerald-600 text-white' 
          : 'bg-amber-500 text-white'
      } ${isSm ? 'text-[11px]' : 'text-xs px-2.5 py-1'}`}>
        <span>{Number(rating).toFixed(1)}</span>
        <i className="fa-solid fa-star text-[9px] -mt-0.5" aria-hidden="true" />
      </div>
      {showCount && reviewsCount !== undefined && (
        <span className="text-xs text-slate-400 font-semibold">
          ({reviewsCount > 999 ? `${(reviewsCount / 1000).toFixed(1)}k` : reviewsCount})
        </span>
      )}
    </div>
  );
};
