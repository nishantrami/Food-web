import React, { useRef } from 'react';
import { categories } from '../../data/categories';
import { CategoryCard } from './CategoryCard';

export const CategorySlider = ({ selectedCategory, onSelectCategory }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group">
      {/* Scroll controls (Desktop) */}
      <button
        type="button"
        onClick={() => scroll('left')}
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-float border border-slate-100 items-center justify-center text-slate-700 hover:text-orange-600 hover:scale-105 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Scroll left"
      >
        <i className="fa-solid fa-chevron-left text-xs" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => scroll('right')}
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-float border border-slate-100 items-center justify-center text-slate-700 hover:text-orange-600 hover:scale-105 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Scroll right"
      >
        <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true" />
      </button>

      {/* Categories Row */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 px-1 hide-scrollbar scroll-smooth"
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onClick={() => onSelectCategory(category.id)}
          />
        ))}
      </div>
    </div>
  );
};
