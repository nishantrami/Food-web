import React, { useState, useEffect } from 'react';
import { FoodGrid } from '../components/food/FoodGrid';
import { RestaurantGrid } from '../components/restaurant/RestaurantGrid';
import { EmptyState } from '../components/common/EmptyState';
import { useFavorites } from '../hooks/useFavorites';
import { api } from '../services/api';

export const FavoritesPage = () => {
  const { favoriteFoods, favoriteRestaurants } = useFavorites();
  const [activeTab, setActiveTab] = useState('foods'); // 'foods' or 'restaurants'

  const [foodsList, setFoodsList] = useState([]);
  const [restList, setRestList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      try {
        const [allFoods, allRestaurants] = await Promise.all([
          api.getFoods(),
          api.getRestaurants()
        ]);

        setFoodsList(allFoods.filter(f => favoriteFoods.includes(f.id)));
        setRestList(allRestaurants.filter(r => favoriteRestaurants.includes(r.id)));
      } catch (err) {
        console.error("Failed to load favorites", err);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [favoriteFoods, favoriteRestaurants]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-3.5 py-1.5 rounded-full mb-2">
          <i className="fa-solid fa-heart text-xs text-rose-500" aria-hidden="true" />
          <span>My Saved Cravings</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          My Favorites
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Quickly re-order the dishes and dining spots you love most.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('foods')}
          className={`flex items-center gap-2 px-4.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'foods'
              ? 'bg-orange-500 text-white shadow-sm ring-2 ring-orange-500'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <i className={`fa-solid fa-utensils text-xs ${activeTab === 'foods' ? 'text-white' : 'text-orange-500'}`} aria-hidden="true" />
          <span>Favorite Dishes</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
            activeTab === 'foods' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
          }`}>
            {favoriteFoods.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('restaurants')}
          className={`flex items-center gap-2 px-4.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'restaurants'
              ? 'bg-orange-500 text-white shadow-sm ring-2 ring-orange-500'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <i className={`fa-solid fa-store text-xs ${activeTab === 'restaurants' ? 'text-white' : 'text-orange-500'}`} aria-hidden="true" />
          <span>Favorite Restaurants</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
            activeTab === 'restaurants' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
          }`}>
            {favoriteRestaurants.length}
          </span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'foods' ? (
        foodsList.length === 0 && !loading ? (
          <EmptyState
            type="favorites"
            title="No favorite dishes yet"
            description="Tap the heart icon on any dish card to keep track of your favorite meals right here."
            actionText="Discover Delicious Foods"
            actionLink="/explore"
          />
        ) : (
          <FoodGrid
            foods={foodsList}
            loading={loading}
            skeletonCount={4}
          />
        )
      ) : (
        restList.length === 0 && !loading ? (
          <EmptyState
            type="favorites"
            title="No favorite restaurants yet"
            description="Save your favorite restaurants to check their daily menus and special offers quickly."
            actionText="Explore Restaurants"
            actionLink="/restaurants"
          />
        ) : (
          <RestaurantGrid
            restaurants={restList}
            loading={loading}
            skeletonCount={3}
          />
        )
      )}

    </div>
  );
};
