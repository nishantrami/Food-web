import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rating } from '../common/Rating';
import { FavoriteButton } from '../common/FavoriteButton';
import { useFavorites } from '../../hooks/useFavorites';

export const RestaurantCard = ({ restaurant }) => {
  const { isRestaurantFavorite, toggleRestaurantFavorite } = useFavorites();
  const isFavorite = isRestaurantFavorite(restaurant.id);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_2px_12px_rgba(9,9,11,0.04)] hover:shadow-[0_12px_28px_rgba(9,9,11,0.08)] hover:border-slate-400 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Cover Image & Badges */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Favorite button */}
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton
              size="sm"
              isFavorite={isFavorite}
              onToggle={() => toggleRestaurantFavorite(restaurant.id, restaurant.name)}
            />
          </div>

          {/* Pure Veg badge */}
          {restaurant.isPureVeg && (
            <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded shadow-xs flex items-center gap-1.5">
              <i className="fa-solid fa-leaf text-[9px]" aria-hidden="true" />
              <span>100% Pure Veg</span>
            </div>
          )}

          {/* Delivery & Distance Floating Pill */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 bg-slate-900/75 px-2.5 py-1 rounded-full text-[11px] text-slate-100">
                <i className="fa-solid fa-clock text-amber-300 text-[10px]" aria-hidden="true" />
                <span>{restaurant.deliveryTime}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/75 px-2.5 py-1 rounded-full text-[11px] text-slate-100">
                <i className="fa-solid fa-location-dot text-amber-300 text-[10px]" aria-hidden="true" />
                <span>{restaurant.distance}</span>
              </span>
            </div>
            <span className="bg-slate-900/75 text-amber-300 px-2.5 py-1 rounded-full text-[11px] font-bold">
              {restaurant.priceRange}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-slate-900 text-lg leading-tight group-hover:text-orange-600 transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <Rating rating={restaurant.rating} reviewsCount={restaurant.reviewsCount} size="sm" />
          </div>

          {/* Cuisines */}
          <p className="text-xs text-slate-500 font-medium line-clamp-1">
            {restaurant.cuisine.join(' • ')}
          </p>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
            {restaurant.description}
          </p>

          {/* Offers banner if available */}
          {restaurant.offers && restaurant.offers[0] && (
            <div className="pt-0.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-orange-800 bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-lg">
                <i className="fa-solid fa-tags text-orange-600 text-[10px]" aria-hidden="true" />
                <span className="truncate">{restaurant.offers[0]}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Action */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
        <span className="text-xs font-semibold text-slate-400">
          {restaurant.costForTwo}
        </span>
        <Link
          to={`/restaurants/${restaurant.id}`}
          className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200 shadow-xs"
        >
          <span>View Menu</span>
          <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
};
