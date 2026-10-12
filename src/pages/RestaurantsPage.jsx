import React, { useState, useEffect } from 'react';
import { RestaurantGrid } from '../components/restaurant/RestaurantGrid';
import { api } from '../services/api';

export const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const cuisines = [
    { label: 'All Cuisines', value: 'all', icon: 'fa-solid fa-utensils' },
    { label: 'Pizza & Italian', value: 'pizza', icon: 'fa-solid fa-pizza-slice' },
    { label: 'Burgers & Fast Food', value: 'burgers', icon: 'fa-solid fa-burger' },
    { label: 'Biryani & Mughlai', value: 'biryani', icon: 'fa-solid fa-bowl-rice' },
    { label: 'Gujarati & Thalis', value: 'gujarati', icon: 'fa-solid fa-plate-wheat' },
    { label: 'Chinese & Asian', value: 'chinese', icon: 'fa-solid fa-bowl-food' },
    { label: 'South Indian', value: 'south indian', icon: 'fa-solid fa-fire-burner' },
    { label: 'Healthy & Bowls', value: 'healthy', icon: 'fa-solid fa-carrot' },
    { label: 'Desserts & Sweets', value: 'dessert', icon: 'fa-solid fa-cake-candles' }
  ];

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const data = await api.getRestaurants({
          search,
          cuisine: selectedCuisine,
          sort: sortBy
        });
        setRestaurants(data);
      } catch (err) {
        console.error("Failed to load restaurants", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchRestaurants, 150);
    return () => clearTimeout(timer);
  }, [search, selectedCuisine, sortBy]);

  const handleReset = () => {
    setSearch('');
    setSelectedCuisine('all');
    setSortBy('popular');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-700 bg-orange-50 px-3.5 py-1.5 rounded-full mb-2">
            <i className="fa-solid fa-wand-magic-sparkles text-xs" aria-hidden="true" />
            <span>Top-Tier Culinary Partners</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Discover Restaurants
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Browse through top-rated restaurants, local artisan kitchens, and fresh eateries.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by restaurant name or dish..."
            className="w-full bg-white text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-2xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none shadow-2xs font-semibold text-slate-800"
          />
          <i className="fa-solid fa-magnifying-glass text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs" aria-hidden="true" />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Clear search"
            >
              <i className="fa-solid fa-xmark text-xs" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Cuisines Bar & Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {cuisines.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setSelectedCuisine(c.value)}
              className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedCuisine === c.value
                  ? 'bg-orange-500 text-white shadow-sm ring-2 ring-orange-200'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <i className={`${c.icon} text-xs ${selectedCuisine === c.value ? 'text-white' : 'text-slate-400'}`} aria-hidden="true" />
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 px-3 py-1.5 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviewed</option>
            <option value="fastest">Fastest Delivery</option>
          </select>
        </div>
      </div>

      {/* Restaurant Grid */}
      <RestaurantGrid
        restaurants={restaurants}
        loading={loading}
        skeletonCount={6}
        onReset={handleReset}
      />
    </div>
  );
};
