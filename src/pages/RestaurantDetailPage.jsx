import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FoodCard } from '../components/food/FoodCard';
import { Rating } from '../components/common/Rating';
import { FavoriteButton } from '../components/common/FavoriteButton';
import { Button } from '../components/common/Button';
import { ErrorState } from '../components/common/ErrorState';
import { api } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatCurrency';

export const RestaurantDetailPage = () => {
  const { restaurantId } = useParams();
  const { isRestaurantFavorite, toggleRestaurantFavorite } = useFavorites();
  const { items, total, itemCount } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchMenu, setSearchMenu] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const [restData, menuData] = await Promise.all([
          api.getRestaurantById(restaurantId),
          api.getRestaurantFoods(restaurantId)
        ]);
        setRestaurant(restData);
        setFoods(menuData);
      } catch (err) {
        setError(err.message || "Failed to load restaurant details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-pulse">
        <div className="w-full h-64 sm:h-80 bg-slate-200 rounded-3xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="max-w-md mx-auto py-20 px-4">
        <ErrorState
          title="Restaurant Not Found"
          message="We couldn't locate this restaurant. It may be closed or temporarily unavailable."
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  const isFavorite = isRestaurantFavorite(restaurant.id);

  // Filter menu items by search and category
  const filteredFoods = foods.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchMenu.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchMenu.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories available in this restaurant
  const availableCategories = ['all', ...new Set(foods.map(f => f.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      
      {/* Back button */}
      <Link
        to="/restaurants"
        className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-orange-600 transition-colors"
      >
        <i className="fa-solid fa-arrow-left text-xs" aria-hidden="true" />
        <span>Back to All Restaurants</span>
      </Link>

      {/* Hero Cover Card */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-lg">
        <div className="h-60 sm:h-80 w-full relative">
          <img
            src={restaurant.coverImage || restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-slate-900/75" />
        </div>

        {/* Floating Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-orange-500 text-white text-[11px] font-bold uppercase px-2.5 py-1 rounded">
                {restaurant.priceRange} • {restaurant.costForTwo}
              </span>
              {restaurant.isPureVeg && (
                <span className="bg-emerald-600 text-white text-[11px] font-bold uppercase px-2.5 py-1 rounded flex items-center gap-1.5">
                  <i className="fa-solid fa-leaf text-[9px]" aria-hidden="true" />
                  <span>Pure Veg</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {restaurant.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-bold">
              {restaurant.cuisine.join(' • ')}
            </p>

            <p className="text-xs text-slate-400 line-clamp-2 max-w-xl font-normal">
              {restaurant.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-clock text-amber-400 text-xs" aria-hidden="true" />
                <span>{restaurant.deliveryTime}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-location-dot text-slate-300 text-xs" aria-hidden="true" />
                <span>{restaurant.address}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <FavoriteButton
              size="lg"
              isFavorite={isFavorite}
              onToggle={() => toggleRestaurantFavorite(restaurant.id, restaurant.name)}
            />
            <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-400 font-black text-lg">
                <i className="fa-solid fa-star text-sm" aria-hidden="true" />
                <span>{restaurant.rating}</span>
              </div>
              <span className="text-[10px] text-slate-300 font-bold block">
                {restaurant.reviewsCount}+ ratings
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Bar if any */}
      {restaurant.offers && restaurant.offers.length > 0 && (
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <i className="fa-solid fa-tags text-orange-600 text-xs" aria-hidden="true" />
            <span>Available Deals:</span>
          </div>
          {restaurant.offers.map((offer, idx) => (
            <div key={idx} className="bg-white text-slate-900 font-bold text-xs px-3 py-1.5 rounded-lg shadow-xs border border-slate-200">
              {offer}
            </div>
          ))}
        </div>
      )}

      {/* Menu Filter & Search Bar */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Restaurant Menu
            </h2>
            <p className="text-xs text-slate-400 font-bold">
              Showing {filteredFoods.length} dishes
            </p>
          </div>

          {/* Search within Menu */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchMenu}
              onChange={(e) => setSearchMenu(e.target.value)}
              placeholder="Search dishes in menu..."
              className="w-full bg-white text-xs sm:text-sm pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500 font-medium"
            />
            <i className="fa-solid fa-magnifying-glass text-orange-500 absolute left-3 top-1/2 -translate-y-1/2 text-xs" aria-hidden="true" />
          </div>
        </div>

        {/* Menu Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-4 py-2 rounded-lg capitalize transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-white hover:bg-orange-50 text-slate-700 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Dishes' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      {filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <p className="text-slate-700 font-bold mb-2">No matching dishes found in this menu</p>
          <Button variant="ghost" size="sm" onClick={() => { setSearchMenu(''); setSelectedCategory('all'); }}>
            Reset Search
          </Button>
        </div>
      )}

      {/* Sticky Bottom Cart Prompt if Cart has items */}
      {itemCount > 0 && (
        <div className="sticky bottom-16 lg:bottom-6 z-30">
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between gap-4 max-w-xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black">
                {itemCount}
              </div>
              <div>
                <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Cart Total</p>
                <p className="text-base font-black text-white">{formatPrice(total)}</p>
              </div>
            </div>
            <Link to="/cart">
              <Button size="md" icon="fa-solid fa-cart-shopping" className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white">
                View Cart & Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};
