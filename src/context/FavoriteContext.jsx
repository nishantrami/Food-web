import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

const FavoriteContext = createContext(null);

export const FavoriteProvider = ({ children }) => {
  const [favoriteFoods, setFavoriteFoods] = useState(() => {
    try {
      const stored = localStorage.getItem('foodverse_favorites');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.foods || [1, 4, 7];
      }
    } catch (e) {
      console.error(e);
    }
    return [1, 4, 7];
  });

  const [favoriteRestaurants, setFavoriteRestaurants] = useState(() => {
    try {
      const stored = localStorage.getItem('foodverse_favorites');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.restaurants || [1, 2];
      }
    } catch (e) {
      console.error(e);
    }
    return [1, 2];
  });

  const { success, info } = useToast();

  useEffect(() => {
    localStorage.setItem('foodverse_favorites', JSON.stringify({
      foods: favoriteFoods,
      restaurants: favoriteRestaurants
    }));
  }, [favoriteFoods, favoriteRestaurants]);

  const toggleFoodFavorite = useCallback((foodId, foodName = 'Dish') => {
    setFavoriteFoods(prev => {
      const exists = prev.includes(foodId);
      if (exists) {
        info(`Removed "${foodName}" from favorites.`);
        return prev.filter(id => id !== foodId);
      } else {
        success(`Added "${foodName}" to favorites! ❤️`);
        return [...prev, foodId];
      }
    });
  }, [info, success]);

  const toggleRestaurantFavorite = useCallback((restaurantId, restaurantName = 'Restaurant') => {
    setFavoriteRestaurants(prev => {
      const exists = prev.includes(restaurantId);
      if (exists) {
        info(`Removed "${restaurantName}" from favorite restaurants.`);
        return prev.filter(id => id !== restaurantId);
      } else {
        success(`Added "${restaurantName}" to favorites! ❤️`);
        return [...prev, restaurantId];
      }
    });
  }, [info, success]);

  const isFoodFavorite = useCallback((foodId) => {
    return favoriteFoods.includes(foodId);
  }, [favoriteFoods]);

  const isRestaurantFavorite = useCallback((restaurantId) => {
    return favoriteRestaurants.includes(restaurantId);
  }, [favoriteRestaurants]);

  const value = {
    favoriteFoods,
    favoriteRestaurants,
    toggleFoodFavorite,
    toggleRestaurantFavorite,
    isFoodFavorite,
    isRestaurantFavorite
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};
