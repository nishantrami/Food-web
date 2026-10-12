import React from 'react';
import { categories } from '../../data/categories';

export const FoodFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults = 0
}) => {
  const cuisines = [
    "Italian", "American", "Mughlai", "Gujarati", "Chinese", "Asian", "South Indian", "Mediterranean", "French"
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
            <i className="fa-solid fa-sliders text-orange-600 text-sm" aria-hidden="true" />
            <span>Filters & Sort</span>
            <span className="text-xs bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-0.5 rounded-full font-bold">
              {totalResults}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">Refine your dining preferences</p>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-xs font-bold text-slate-700 hover:text-orange-600 flex items-center gap-1.5 p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-rotate-left text-xs" aria-hidden="true" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sorting */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Sort By
        </label>
        <select
          value={filters.sort || 'recommended'}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          className="w-full text-xs sm:text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 cursor-pointer"
        >
          <option value="recommended">Recommended (Top Rated)</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rating</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="fastest">Fastest Delivery</option>
        </select>
      </div>

      {/* Dietary Preference (Veg / Non-Veg) */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Dietary Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: '', label: 'All Dishes', icon: 'fa-solid fa-utensils' },
            { value: 'veg', label: 'Pure Veg', icon: 'fa-solid fa-leaf' },
            { value: 'non-veg', label: 'Non-Veg', icon: 'fa-solid fa-drumstick-bite' }
          ].map((type) => {
            const isSelected = filters.isVeg === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => onFilterChange('isVeg', type.value)}
                className={`text-xs font-bold py-2 px-2 rounded-lg border transition-colors text-center cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <i className={`${type.icon} text-xs ${isSelected ? 'text-white' : 'text-slate-400'}`} aria-hidden="true" />
                <span className="text-[11px]">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1">
          {categories.map((cat) => {
            const isSelected = (filters.category || 'all') === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onFilterChange('category', cat.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                }`}
              >
                <i className={`${cat.faIcon} text-xs ${isSelected ? 'text-white' : 'text-slate-400'}`} aria-hidden="true" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Minimum Rating
        </label>
        <div className="flex gap-2">
          {[
            { value: '', label: 'Any' },
            { value: '4.0', label: '4.0+' },
            { value: '4.5', label: '4.5+' },
            { value: '4.8', label: '4.8+' }
          ].map((rate) => {
            const isSelected = (filters.minRating || '') === rate.value;
            return (
              <button
                key={rate.value}
                type="button"
                onClick={() => onFilterChange('minRating', rate.value)}
                className={`flex-1 text-xs font-bold py-2 rounded-lg border transition-colors text-center cursor-pointer flex items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{rate.label}</span>
                {rate.value && <i className={`fa-solid fa-star text-[9px] ${isSelected ? 'text-white' : 'text-amber-500'}`} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Max Price
          </label>
          <span className="text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
            ₹{filters.maxPrice || 500}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="600"
          step="25"
          value={filters.maxPrice || 600}
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          className="w-full accent-orange-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[11px] text-slate-400 font-bold mt-1">
          <span>₹100</span>
          <span>₹350</span>
          <span>₹600</span>
        </div>
      </div>

      {/* Cuisines */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Cuisine
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => onFilterChange('cuisine', 'all')}
            className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
              !filters.cuisine || filters.cuisine === 'all'
                ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Cuisines
          </button>
          {cuisines.map((c) => {
            const isSelected = (filters.cuisine || '').toLowerCase() === c.toLowerCase();
            return (
              <button
                key={c}
                type="button"
                onClick={() => onFilterChange('cuisine', isSelected ? 'all' : c)}
                className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
