import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { foods } from '../../data/foods';

import heroComboImg from '../../assets/hero-combo.jpg';
import heroBiryaniImg from '../../assets/hero-biryani.jpg';
import heroPizzaImg from '../../assets/hero-pizza.jpg';

export const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { error: toastError } = useToast();
  const { addItem, itemCount } = useCart();

  const [activeDishIndex, setActiveDishIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [orderMode, setOrderMode] = useState('delivery'); // 'delivery' | 'pickup' | 'dinein'
  const [addedDishId, setAddedDishId] = useState(null);

  // Curated Signature Dishes for the unique visual stage
  const signatureDishes = [
    {
      id: 'combo',
      title: 'Double Smash & Truffle Pizza',
      subtitle: 'Charcoal Angus Smash & Sourdough Burrata Slice',
      category: "CHEF'S SIGNATURE COMBINATION",
      price: 399,
      originalPrice: 499,
      discount: '20% OFF',
      rating: 4.9,
      reviews: '2,140+ reviews',
      deliveryTime: '20-25 min',
      calories: '680 kcal',
      prepInfo: 'Wood-Fired & Flame Grilled',
      image: heroComboImg,
      foodId: 4, // Smoked Cheeseburger in foods.js or falls back to first dish
      highlights: ['Double Melted Sharp Cheddar', 'San Marzano Sauce', 'Floating Wild Basil & Spices'],
      accentGradient: 'from-orange-500 to-amber-500',
      auraColor: 'rgba(234, 88, 12, 0.28)',
      badgeText: '🔥 Bestseller',
      badgeClass: 'bg-orange-500 text-white'
    },
    {
      id: 'biryani',
      title: 'Awadhi Shahi Dum Biryani Handi',
      subtitle: 'Aged Long-Grain Basmati with Charcoal Seekh Kebabs',
      category: 'ROYAL HERITAGE RECIPE',
      price: 369,
      originalPrice: 420,
      discount: '15% OFF',
      rating: 4.9,
      reviews: '1,890+ reviews',
      deliveryTime: '25-30 min',
      calories: '720 kcal',
      prepInfo: 'Clay Sealed Dum with Kashmiri Saffron',
      image: heroBiryaniImg,
      foodId: 7, // Hyderabadi Dum Chicken Biryani in foods.js
      highlights: ['Pure Kashmiri Saffron', 'Tender Charcoal Skewers', 'Cooling Mint & Cucumber Raita'],
      accentGradient: 'from-amber-500 to-yellow-600',
      auraColor: 'rgba(245, 158, 11, 0.28)',
      badgeText: '👑 Royal Classic',
      badgeClass: 'bg-amber-600 text-white'
    },
    {
      id: 'pizza',
      title: 'Artisan Burrata & Truffle Pizza',
      subtitle: '48h Fermented Wood-Fired Crust with Melting Burrata',
      category: 'NAPOLI STONE HEARTH',
      price: 349,
      originalPrice: 429,
      discount: '18% OFF',
      rating: 4.8,
      reviews: '1,420+ reviews',
      deliveryTime: '18-22 min',
      calories: '310 kcal/slice',
      prepInfo: 'Stone-Baked in 450°C Oak Flame',
      image: heroPizzaImg,
      foodId: 1, // Tuscan Farmhouse Pizza in foods.js
      highlights: ['Fresh Creamy Buffalo Burrata', 'San Marzano Crushed Tomatoes', 'Cold-Pressed Olive Oil Drizzle'],
      accentGradient: 'from-rose-500 to-orange-500',
      auraColor: 'rgba(239, 68, 68, 0.25)',
      badgeText: '⭐ Michelin Pick',
      badgeClass: 'bg-rose-500 text-white'
    }
  ];

  const currentDish = signatureDishes[activeDishIndex];

  const trendingCravings = [
    { name: 'Wood-Fired Pizza', icon: 'fa-solid fa-pizza-slice', search: 'pizza' },
    { name: 'Smash Burgers', icon: 'fa-solid fa-burger', search: 'burger' },
    { name: 'Royal Dum Biryani', icon: 'fa-solid fa-bowl-rice', search: 'biryani' },
    { name: 'Asian Dim Sums', icon: 'fa-solid fa-bowl-food', search: 'dimsum' },
    { name: 'Healthy Bowls', icon: 'fa-solid fa-carrot', search: 'salad' },
    { name: 'Sweet Bakes', icon: 'fa-solid fa-cake-candles', search: 'dessert' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const handleQuickCraving = (craving) => {
    navigate(`/explore?search=${encodeURIComponent(craving)}`);
  };

  const handleQuickAddDish = (dish) => {
    if (!isAuthenticated) {
      toastError("Please log in first to add dishes and place orders.");
      navigate('/login', { state: { from: location } });
      return;
    }
    const targetFood = foods.find(f => f.id === dish.foodId) || foods[0];
    addItem(targetFood, 1);
    setAddedDishId(dish.id);
    setTimeout(() => {
      setAddedDishId(null);
    }, 2000);
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-6 sm:pb-16 lg:py-16 bg-gradient-to-b from-amber-50/50 via-slate-50/40 to-transparent">
      
      {/* Ambient background soft glowing orbs */}
      <div 
        className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-1000"
        style={{ background: currentDish.auraColor }}
      />
      <div className="absolute top-1/2 left-4 w-72 h-72 rounded-full bg-orange-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          
          {/* ================= LEFT COLUMN: Dynamic UI & High-Impact Copywriting ================= */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live Dispatch & Social Proof Ticker */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-orange-100 shadow-sm text-xs font-semibold text-slate-700"
            >
              <span className="flex items-center gap-1.5 text-orange-600 font-bold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Live Kitchen Dispatch</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-slate-600 font-medium">2,480+ foodies ordering now</span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-amber-600 font-bold flex items-center gap-1">
                <i className="fa-solid fa-bolt text-[11px]" aria-hidden="true" />
                Avg 21 mins
              </span>
            </motion.div>

            {/* Master Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-slate-900 tracking-tight leading-[1.12]">
                Crave The Extraordinary. <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-rose-600 bg-clip-text text-transparent">
                  Delivered Steaming Hot.
                </span>
              </h1>
              
              {/* Supporting Subtext */}
              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Indulge in stone-baked artisan pizzas, flame-smashed brioche burgers, and fragrant royal dum biryanis — hand-crafted by the city’s top gourmet kitchens with express insulated delivery.
              </p>
            </motion.div>

            {/* Next-Gen Interactive Search & Experience Console */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-xl p-3 sm:p-3.5 rounded-3xl shadow-xl shadow-orange-950/5 border border-orange-100/80 max-w-xl mx-auto lg:mx-0 space-y-3"
            >
              {/* Order Mode Switcher Tabs */}
              <div className="flex items-center justify-between gap-1.5 p-1 bg-slate-100/90 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOrderMode('delivery')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    orderMode === 'delivery'
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <i className="fa-solid fa-motorcycle text-xs" aria-hidden="true" />
                  <span>Instant Delivery <span className="hidden sm:inline font-normal opacity-90">(20-25m)</span></span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderMode('pickup')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    orderMode === 'pickup'
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <i className="fa-solid fa-bag-shopping text-xs" aria-hidden="true" />
                  <span>Curbside Pickup <span className="hidden sm:inline font-normal opacity-90">(10m)</span></span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderMode('dinein')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    orderMode === 'dinein'
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <i className="fa-solid fa-utensils text-xs" aria-hidden="true" />
                  <span>Dine-In <span className="hidden sm:inline font-normal opacity-90">Booking</span></span>
                </button>
              </div>

              {/* Search Bar Input & Action */}
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="flex items-center gap-3 pl-3.5 pr-2 py-1 flex-1 bg-slate-50/80 rounded-2xl border border-slate-200/70 focus-within:border-orange-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-500/10 transition-all">
                  <i className="fa-solid fa-magnifying-glass text-orange-500 text-sm shrink-0" aria-hidden="true" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search dishes, burgers, wood-fired pizza, biryani..."
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none py-1.5"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="text-slate-400 hover:text-slate-600 p-1 text-xs cursor-pointer"
                    >
                      <i className="fa-solid fa-xmark" aria-hidden="true" />
                    </button>
                  )}
                </div>
                <button 
                  type="submit" 
                  className="shrink-0 rounded-2xl px-5 sm:px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 active:scale-95"
                >
                  <span>Explore Menu</span>
                  <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
                </button>
              </form>
            </motion.div>

            {/* Trending Craving Quick-Select Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2 pt-1"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Popular Cravings:
                </span>
                <span className="text-[11px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200/50">
                  Fast Dispatch
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {trendingCravings.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickCraving(item.search)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-orange-50 border border-slate-200/80 hover:border-orange-300 text-slate-700 hover:text-orange-600 text-xs font-semibold transition-all duration-150 shadow-xs hover:shadow-sm cursor-pointer group active:scale-95"
                  >
                    <i className={`${item.icon} text-xs text-orange-500 group-hover:scale-110 transition-transform`} aria-hidden="true" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Trust Metrics & Value Props */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4 grid grid-cols-3 gap-3 sm:gap-6 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0 text-center sm:text-left"
            >
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                  <span>4.9</span>
                  <i className="fa-solid fa-star text-amber-400 text-sm" aria-hidden="true" />
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">24,000+ Reviews</p>
              </div>

              <div className="border-x border-slate-200/80 px-2 sm:px-4">
                <p className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center sm:justify-start gap-1">
                  <span>20m</span>
                  <span className="text-xs font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-md">Turbo</span>
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Express Dispatch</p>
              </div>

              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                  <i className="fa-solid fa-shield-halved text-emerald-500 text-base" aria-hidden="true" />
                  <span>100%</span>
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Thermal Insulated</p>
              </div>
            </motion.div>

          </div>

          {/* ================= RIGHT COLUMN: Unique Visual Showcase & Interactive Stage ================= */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Interactive Dish Carousel Switcher Strip */}
            <div className="w-full flex items-center justify-center gap-2 mb-3 z-20">
              {signatureDishes.map((dish, idx) => (
                <button
                  key={dish.id}
                  type="button"
                  onClick={() => setActiveDishIndex(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                    activeDishIndex === idx
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                      : 'bg-white/90 backdrop-blur-md text-slate-600 border-slate-200/90 hover:bg-slate-100'
                  }`}
                >
                  <img
                    src={dish.image}
                    alt={dish.title}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="hidden sm:inline">{dish.id === 'combo' ? 'Smash & Pizza' : dish.id === 'biryani' ? 'Royal Biryani' : 'Burrata Pizza'}</span>
                  <span className="sm:hidden">Pick {idx + 1}</span>
                </button>
              ))}
            </div>

            {/* Central Master Showcase Stage */}
            <div className="relative w-full max-w-[430px] aspect-square rounded-3xl p-3 sm:p-4 bg-white/80 backdrop-blur-xl border border-white/90 shadow-2xl shadow-orange-950/10">
              
              {/* Animated Main Image Canvas */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDish.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="w-full h-full rounded-2xl overflow-hidden relative group cursor-pointer"
                  onClick={() => handleQuickAddDish(currentDish)}
                >
                  <img
                    src={currentDish.image}
                    alt={currentDish.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle vignette gradient for readable text overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/25 pointer-events-none" />

                  {/* Top-Left Tag: Prep & Kitchen Status */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/20 text-[11px] font-bold">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span>{currentDish.prepInfo}</span>
                  </div>

                  {/* Top-Right Badge: Category Seal */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wide shadow-md border border-white/20 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                    {currentDish.badgeText}
                  </div>

                  {/* Inner Overlay Info & Quick Order Bar */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-lg text-slate-800">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-left">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 block">
                          {currentDish.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                          {currentDish.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                          {currentDish.subtitle}
                        </p>
                      </div>

                      {/* Rating pill */}
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold shrink-0">
                        <i className="fa-solid fa-star text-[11px] text-amber-500" aria-hidden="true" />
                        <span>{currentDish.rating}</span>
                      </div>
                    </div>

                    {/* Price and CTA row */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base sm:text-lg font-black text-slate-900">
                          ₹{currentDish.price}
                        </span>
                        <span className="text-xs text-slate-400 line-through font-semibold">
                          ₹{currentDish.originalPrice}
                        </span>
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {currentDish.discount}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickAddDish(currentDish);
                        }}
                        className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95 ${
                          addedDishId === currentDish.id
                            ? 'bg-emerald-600 text-white shadow-emerald-500/25'
                            : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25'
                        }`}
                        title="Add dish to cart"
                      >
                        {addedDishId === currentDish.id ? (
                          <>
                            <i className="fa-solid fa-check text-xs" aria-hidden="true" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-plus text-xs" aria-hidden="true" />
                            <span>Quick Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Floating Widget 1: Express Delivery Guarantee (Floating Top-Left) */}
              <div className="absolute -top-4 -left-3 sm:-left-6 bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float-slow z-20">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-base shrink-0 shadow-inner">
                  <i className="fa-solid fa-truck-fast text-orange-600" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-slate-900">Swift Dispatch</p>
                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                    Hot within 20 mins
                  </p>
                </div>
              </div>

              {/* Floating Widget 2: Coupon Voucher (Floating Top-Right) */}
              <div className="absolute -top-3 -right-2 sm:-right-4 bg-slate-900 text-white px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-700 animate-float-reverse z-20">
                <i className="fa-solid fa-tag text-amber-400 text-sm" aria-hidden="true" />
                <div className="text-left">
                  <p className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">Special Offer</p>
                  <p className="text-xs font-black tracking-wide">CRAVE50: ₹50 OFF</p>
                </div>
              </div>

              {/* Floating Widget 3: Fresh Ingredients Tag (Floating Bottom-Right) */}
              <div className="absolute -bottom-4 -right-2 sm:right-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-2 z-20 text-slate-800">
                <span className="text-base">🌿</span>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">100% Artisanal</p>
                  <p className="text-xs font-extrabold text-slate-900">Farm-To-Table Fresh</p>
                </div>
              </div>

            </div>

            {/* Bottom Dish Indicators */}
            <div className="flex items-center gap-1.5 mt-4">
              {signatureDishes.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveDishIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeDishIndex === idx ? 'w-8 bg-orange-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Cart Status Indicator Pill if cart has items */}
            {itemCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold"
              >
                <i className="fa-solid fa-cart-shopping text-orange-500" aria-hidden="true" />
                <span>{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</span>
                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="underline hover:text-orange-900 cursor-pointer ml-1"
                >
                  View Cart →
                </button>
              </motion.div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
