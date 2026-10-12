import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FoodGrid } from '../components/food/FoodGrid';
import { FoodFilters } from '../components/food/FoodFilters';
import { Drawer } from '../components/common/Drawer';
import { Button } from '../components/common/Button';
import { api } from '../services/api';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatCurrency';

export const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { itemCount, total } = useCart();

  // Extract initial filters from URL params
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'recommended';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: initialCategory,
    cuisine: 'all',
    isVeg: '',
    minRating: '',
    maxPrice: 600,
    sort: initialSort
  });

  // Keep query in sync when searchParam updates from navbar or categories
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    const urlSearch = searchParams.get('search');
    const urlSort = searchParams.get('sort');

    setFilters(prev => ({
      ...prev,
      category: urlCategory || prev.category,
      sort: urlSort || prev.sort
    }));

    if (urlSearch !== null) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  // Fetch foods whenever filters or searchQuery changes
  useEffect(() => {
    const fetchFilteredFoods = async () => {
      setLoading(true);
      try {
        const data = await api.getFoods({
          search: searchQuery,
          category: filters.category,
          cuisine: filters.cuisine,
          isVeg: filters.isVeg,
          minRating: filters.minRating,
          maxPrice: filters.maxPrice,
          sort: filters.sort
        });
        setFoods(data);
      } catch (err) {
        console.error("Failed to fetch foods", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchFilteredFoods();
    }, 150);

    return () => clearTimeout(timer);
  }, [searchQuery, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      category: 'all',
      cuisine: 'all',
      isVeg: '',
      minRating: '',
      maxPrice: 600,
      sort: 'recommended'
    });
    setSearchParams({});
  };

  const activeFiltersCount = [
    filters.category !== 'all',
    filters.cuisine !== 'all',
    filters.isVeg !== '',
    filters.minRating !== '',
    Number(filters.maxPrice) < 600,
    filters.sort !== 'recommended',
    searchQuery.trim() !== ''
  ].filter(Boolean).length;

  // 1-Click Quick Filter Toggles (Wolt / Uber Eats style)
  const quickFilters = [
    { label: "All", active: filters.isVeg === '' && !filters.minRating && filters.sort === 'recommended', onClick: () => { handleFilterChange('isVeg', ''); handleFilterChange('minRating', ''); handleFilterChange('sort', 'recommended'); } },
    { label: "Pure Veg 🌿", active: filters.isVeg === 'veg', onClick: () => handleFilterChange('isVeg', filters.isVeg === 'veg' ? '' : 'veg') },
    { label: "Top Rated (4.5+) ⭐", active: filters.minRating === '4.5', onClick: () => handleFilterChange('minRating', filters.minRating === '4.5' ? '' : '4.5') },
    { label: "Fast Delivery ⚡", active: filters.sort === 'fastest', onClick: () => handleFilterChange('sort', filters.sort === 'fastest' ? 'recommended' : 'fastest') },
    { label: "Under ₹300 🏷️", active: Number(filters.maxPrice) === 300, onClick: () => handleFilterChange('maxPrice', Number(filters.maxPrice) === 300 ? 600 : 300) },
    { label: "Bestsellers 🔥", active: filters.sort === 'popular', onClick: () => handleFilterChange('sort', filters.sort === 'popular' ? 'recommended' : 'popular') }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 relative">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Explore All Dishes
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Discover {foods.length} delicious culinary delights from top rated kitchens
          </p>
        </div>

        {/* Search Bar & Mobile Filter Trigger */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, burgers, pizza..."
              className="w-full bg-white text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-2xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none shadow-2xs font-semibold text-slate-800"
            />
            <i className="fa-solid fa-magnifying-glass text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs" aria-hidden="true" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Clear search query"
              >
                <i className="fa-solid fa-xmark text-xs" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden relative flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-black text-xs sm:text-sm shadow-2xs hover:bg-slate-50 shrink-0 cursor-pointer"
          >
            <i className="fa-solid fa-sliders text-orange-500 text-xs" aria-hidden="true" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[11px] font-black flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Modern 1-Tap Quick Filter Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {quickFilters.map((qf, idx) => (
          <button
            key={idx}
            type="button"
            onClick={qf.onClick}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors duration-200 cursor-pointer border ${
              qf.active
                ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                : 'bg-white hover:bg-orange-50 text-slate-700 border-slate-200 hover:border-orange-300'
            }`}
          >
            {qf.label}
          </button>
        ))}
      </div>

      {/* Main Content Layout (Desktop Sidebar + Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-24">
          <FoodFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalResults={foods.length}
          />
        </aside>

        {/* Mobile Filter Drawer */}
        <Drawer
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          title="Filter & Sort Dishes"
          position="bottom"
        >
          <div className="space-y-6">
            <FoodFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResults={foods.length}
            />
            <div className="sticky bottom-0 pt-4 bg-white border-t border-slate-100">
              <Button
                size="lg"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Show {foods.length} Dishes
              </Button>
            </div>
          </div>
        </Drawer>

        {/* Food Grid Column */}
        <div className="lg:col-span-3">
          <FoodGrid
            foods={foods}
            loading={loading}
            skeletonCount={8}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Modern Floating Sticky Cart Bar */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-20 lg:bottom-6 left-4 right-4 z-40 max-w-xl mx-auto pointer-events-auto"
          >
            <div className="bg-slate-900 text-white p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 pl-1">
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-sm shadow-xs">
                  {itemCount}
                </div>
                <div>
                  <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    Cart Active
                  </p>
                  <p className="text-base font-black text-white leading-tight">
                    {formatPrice(total)} <span className="text-xs font-semibold text-slate-400">({itemCount} {itemCount === 1 ? 'dish' : 'dishes'})</span>
                  </p>
                </div>
              </div>
              <Link to="/cart">
                <Button size="md" icon="fa-solid fa-arrow-right" iconPosition="right" className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white">
                  View Cart
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
