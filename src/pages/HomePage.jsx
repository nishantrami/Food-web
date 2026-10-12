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
      <section className="bg-slate-900 rounded-3xl sm:rounded-4xl p-8 sm:p-12 relative overflow-hidden text-white shadow-xl border border-slate-800">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <i className="fa-solid fa-mobile-screen-button text-xs" aria-hidden="true" />
              <span>Everywhere You Go</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              Order Faster With FoodVerse
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl font-normal">
              Save your favorite dishes, track delivery drivers in real-time, and get exclusive promo coupons right from your pocket.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/explore">
                <Button size="lg" icon="fa-solid fa-utensils" className="rounded-2xl bg-orange-500 hover:bg-orange-600 text-white shadow-md">
                  Explore Food Catalog
                </Button>
              </Link>
              <Link to="/restaurants">
                <Button variant="secondary" size="lg" icon="fa-solid fa-arrow-right" iconPosition="right" className="rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border-slate-700">
                  Find Kitchens
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="w-48 sm:w-56 aspect-[9/16] bg-slate-950 rounded-3xl border-4 border-slate-800 p-3 shadow-2xl relative flex flex-col justify-between">
              <div className="w-16 h-4 bg-slate-800 rounded-full mx-auto" />
              <div className="text-center space-y-2 py-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center mx-auto text-2xl shadow-sm">
                  <i className="fa-solid fa-pizza-slice" aria-hidden="true" />
                </div>
                <p className="text-xs font-bold text-white">Order in 3 Taps</p>
                <p className="text-[10px] text-slate-400 font-medium">Doorstep delivery under 30 mins</p>
              </div>
              <div className="w-full bg-orange-500 text-white text-[11px] font-bold py-2 rounded-lg text-center shadow-xs">
                FoodVerse Fresh
              </div>
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
