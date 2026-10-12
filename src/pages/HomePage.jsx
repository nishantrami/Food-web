import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '../components/home/Hero';
import { CategorySlider } from '../components/home/CategorySlider';
import { SpecialOffers } from '../components/home/SpecialOffers';
import { WhyFoodVerse } from '../components/home/WhyFoodVerse';
import { Testimonials } from '../components/home/Testimonials';
import { FoodGrid } from '../components/food/FoodGrid';
import { RestaurantGrid } from '../components/restaurant/RestaurantGrid';
import { Button } from '../components/common/Button';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatCurrency';

export const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { favoriteFoods } = useFavorites();
  const { itemCount, total } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [trendingFoods, setTrendingFoods] = useState([]);
  const [popularRestaurants, setPopularRestaurants] = useState([]);
  const [recommendedFoods, setRecommendedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modern Cravings Stories Collections
  const curatedStories = [
    {
      id: "fast",
      title: "Fast Dispatch",
      sub: "<25 min",
      icon: "fa-solid fa-bolt",
      bgColor: "bg-orange-500",
      iconColor: "text-white",
      link: "/explore?sort=fastest"
    },
    {
      id: "gourmet",
      title: "Chef's Table",
      sub: "4.8+ Rated",
      icon: "fa-solid fa-crown",
      bgColor: "bg-amber-500",
      iconColor: "text-white",
      link: "/explore?sort=rating"
    },
    {
      id: "veg",
      title: "Pure Plant",
      sub: "100% Green",
      icon: "fa-solid fa-leaf",
      bgColor: "bg-emerald-600",
      iconColor: "text-white",
      link: "/explore?isVeg=veg"
    },
    {
      id: "budget",
      title: "Artisan Lunch",
      sub: "Under ₹250",
      icon: "fa-solid fa-wallet",
      bgColor: "bg-yellow-500",
      iconColor: "text-slate-900",
      link: "/explore?maxPrice=250"
    },
    {
      id: "bestseller",
      title: "Signatures",
      sub: "Top Picks",
      icon: "fa-solid fa-award",
      bgColor: "bg-orange-600",
      iconColor: "text-white",
      link: "/explore?sort=popular"
    },
    {
      id: "dessert",
      title: "Pâtisserie",
      sub: "Bakes & Cocoa",
      icon: "fa-solid fa-cake-candles",
      bgColor: "bg-slate-700",
      iconColor: "text-white",
      link: "/explore?category=dessert"
    }
  ];

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      try {
        const [foodsList, restList] = await Promise.all([
          api.getFoods({ sort: 'popular' }),
          api.getRestaurants({ sort: 'popular' })
        ]);

        setTrendingFoods(foodsList.slice(0, 8));
        setPopularRestaurants(restList.slice(0, 6));

        // Personalized recommendations
        if (favoriteFoods.length > 0) {
          const recs = foodsList.filter(f => favoriteFoods.includes(f.id) || f.category === 'pizza' || f.category === 'burger');
          setRecommendedFoods(recs.slice(0, 4));
        } else {
          setRecommendedFoods(foodsList.filter(f => f.rating >= 4.8).slice(0, 4));
        }
      } catch (err) {
        console.error("Error loading home data", err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, [favoriteFoods]);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/explore?category=${categoryId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 1.5 Modern Cravings Stories Bar */}
      <section className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Quick Curations
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              What Are You Craving Today?
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {curatedStories.map((story) => (
            <Link
              key={story.id}
              to={story.link}
              className="flex items-center gap-3 p-2.5 pr-4 rounded-xl bg-white border border-slate-200 hover:border-orange-300 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_20px_rgba(234,88,12,0.06)] transition-all shrink-0 group cursor-pointer"
            >
              <div className={`w-11 h-11 rounded-xl ${story.bgColor} ${story.iconColor} flex items-center justify-center text-lg shadow-xs group-hover:scale-105 transition-transform`}>
                <i className={story.icon} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {story.title}
                </p>
                <p className="text-[10px] text-slate-400 font-bold">
                  {story.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Category Section */}
      <section className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Cuisine Variety
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore By Category
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs sm:text-sm font-bold text-slate-900 hover:text-orange-600 flex items-center gap-1.5 group"
          >
            <span>See All</span>
            <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        <CategorySlider
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </section>

      {/* 3. Trending Foods */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
              <i className="fa-solid fa-award text-orange-600 text-xs" aria-hidden="true" />
              <span>Chef Selections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Trending Dishes Right Now
            </h2>
          </div>
          <Link to="/explore?sort=popular">
            <Button variant="ghost" size="sm" icon="fa-solid fa-arrow-right" iconPosition="right">
              View All Dishes
            </Button>
          </Link>
        </div>

        <FoodGrid
          foods={trendingFoods}
          loading={loading}
          skeletonCount={8}
        />
      </section>

      {/* 4. Popular Restaurants */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <i className="fa-solid fa-star text-amber-500 text-xs" aria-hidden="true" />
              <span>Top Rated Kitchens</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Restaurants Near You
            </h2>
          </div>
          <Link to="/restaurants">
            <Button variant="ghost" size="sm" icon="fa-solid fa-arrow-right" iconPosition="right">
              Explore All Kitchens
            </Button>
          </Link>
        </div>

        <RestaurantGrid
          restaurants={popularRestaurants}
          loading={loading}
          skeletonCount={6}
        />
      </section>

      {/* 5. Personalized Recommendations */}
      <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-[0_2px_16px_rgba(15,23,42,0.03)]">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
              <i className="fa-solid fa-heart text-xs text-orange-500" aria-hidden="true" />
              <span>Handpicked For You</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentUser ? `Recommended For ${currentUser.name.split(' ')[0]}` : "Specially Curated For You"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
              Based on fresh recommendations and top customer reviews.
            </p>
          </div>
          <Link to="/explore?sort=rating">
            <Button variant="subtle" size="sm" icon="fa-solid fa-arrow-right" iconPosition="right">
              Discover More
            </Button>
          </Link>
        </div>

        <FoodGrid
          foods={recommendedFoods}
          loading={loading}
          skeletonCount={4}
        />
      </section>

      {/* 6. Special Offers & Promo Codes */}
      <SpecialOffers />

      {/* 7. Why FoodVerse */}
      <WhyFoodVerse />

      {/* 8. Customer Testimonials */}
      <Testimonials />

      {/* 9. Mobile App Experience Banner */}
      {/* 9. Mobile App Experience Banner */}
      <section className="bg-gradient-to-br from-white via-orange-50/25 to-amber-50/40 rounded-3xl sm:rounded-4xl p-8 sm:p-12 relative overflow-hidden text-slate-900 shadow-card border border-orange-200/80">
        <div className="absolute right-0 top-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-orange-400/10 to-amber-400/10 blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-rose-400/5 blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-wider shadow-2xs">
              <i className="fa-solid fa-mobile-screen-button text-xs" aria-hidden="true" />
              <span>Everywhere You Go</span>
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900">
              Order Faster With{' '}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                FoodVerse
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              Save your favorite dishes, track delivery drivers in real-time, and get exclusive promo coupons right from your pocket. Experience chef-crafted food delivered to your door in minutes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/explore">
                <Button size="lg" icon="fa-solid fa-utensils" className="rounded-2xl bg-orange-500 hover:bg-orange-600 text-white shadow-md">
                  Explore Food Catalog
                </Button>
              </Link>
              <Link to="/restaurants">
                <button
                  type="button"
                  className="inline-flex items-center justify-center font-black rounded-2xl transition-all duration-200 text-sm sm:text-base px-6 py-3.5 gap-2.5 bg-white hover:bg-orange-50 text-slate-800 hover:text-orange-600 border border-slate-200 hover:border-orange-300 shadow-xs cursor-pointer active:scale-[0.98]"
                >
                  <span>Find Kitchens</span>
                  <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
                </button>
              </Link>
            </div>

            {/* Benefit Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-orange-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <i className="fa-solid fa-circle-check text-emerald-500 text-sm" aria-hidden="true" />
                <span>Live GPS Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <i className="fa-solid fa-circle-check text-emerald-500 text-sm" aria-hidden="true" />
                <span>Average 28 Min Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <i className="fa-solid fa-circle-check text-emerald-500 text-sm" aria-hidden="true" />
                <span>No Contact Delivery</span>
              </div>
            </div>
          </div>

          {/* Smartphone Mockup with Light & Modern Aesthetic */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Floating Review Badge */}
            <div className="absolute -top-3 -left-2 sm:left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-black">
                <i className="fa-solid fa-star" aria-hidden="true" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Top Rated App</span>
                <span className="text-xs font-black text-slate-800">4.9 ★ Rating</span>
              </div>
            </div>

            {/* Modern Phone Frame */}
            <div className="w-56 sm:w-64 aspect-[9/18] bg-slate-900 rounded-[2.8rem] p-3 shadow-2xl border-4 border-slate-700/80 ring-8 ring-orange-100/60 relative flex flex-col justify-between">
              {/* Dynamic Island Notch */}
              <div className="w-20 h-4 bg-slate-950 rounded-full mx-auto relative z-20 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
              </div>

              {/* Phone Screen Canvas (Clean White Aesthetic) */}
              <div className="bg-gradient-to-b from-orange-50 via-white to-white rounded-[2.2rem] p-3.5 flex-1 mt-2 flex flex-col justify-between border border-slate-100 overflow-hidden text-slate-900 shadow-inner">
                {/* App Screen Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center text-xs shadow-xs">
                      <i className="fa-solid fa-fire" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-black text-slate-900">FoodVerse</span>
                  </div>
                  <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Open Now
                  </span>
                </div>

                {/* Main Screen Content */}
                <div className="text-center space-y-2 py-3 my-auto">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center mx-auto text-2xl shadow-md">
                    <i className="fa-solid fa-pizza-slice" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Order in 3 Taps</p>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Doorstep delivery under 30 mins</p>
                  </div>

                  {/* Sample Dish Card Inside Phone */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 flex items-center gap-2 text-left mt-2">
                    <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-burger text-sm" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-black text-slate-800 truncate">Smoked Cheeseburger</p>
                      <p className="text-[10px] text-orange-600 font-bold">₹219 • 20 mins</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Order CTA */}
                <div className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black py-2.5 rounded-xl text-center shadow-md flex items-center justify-center gap-1.5">
                  <i className="fa-solid fa-bolt text-[10px]" aria-hidden="true" />
                  <span>Order Now • 20% OFF</span>
                </div>
              </div>

              {/* Home indicator bar */}
              <div className="w-24 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Modern Floating Sticky Cart Bar */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 left-4 right-4 z-40 max-w-xl mx-auto pointer-events-auto"
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
