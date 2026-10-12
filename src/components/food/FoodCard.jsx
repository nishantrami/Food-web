import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FavoriteButton } from '../common/FavoriteButton';
import { QuantitySelector } from '../common/QuantitySelector';
import { useFavorites } from '../../hooks/useFavorites';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { formatPrice } from '../../utils/formatCurrency';

export const FoodCard = ({ food }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { error: toastError } = useToast();
  const { isFoodFavorite, toggleFoodFavorite } = useFavorites();
  const { items, addItem, increaseQty, decreaseQty } = useCart();

  const isFavorite = isFoodFavorite(food.id);

  // Check if item is already in cart
  const cartItem = items.find(
    (i) => i.id === food.id && (!i.customization || Object.keys(i.customization).length === 0)
  );

  const handleCardClick = () => {
    navigate(`/food/${food.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toastError("Please log in first to add dishes and place orders.");
      navigate('/login', { state: { from: location } });
      return;
    }
    addItem(food, 1);
  };

  // Discount calculation
  const discountPercent =
    food.originalPrice && food.originalPrice > food.price
      ? Math.round(((food.originalPrice - food.price) / food.originalPrice) * 100)
      : null;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={handleCardClick}
      className="group bg-white rounded-3xl p-3.5 sm:p-4 border border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-orange-300 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer relative overflow-hidden"
    >
      <div className="flex flex-col flex-1">
        {/* Image Container with Protected Proportions & Badges */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3.5 bg-slate-100 group/img shadow-2xs">
          <img
            src={food.image}
            alt={food.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Bottom Gradient Overlay for High Badge Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

          {/* Top Left: Authentic Dietary Indicator & Discount Pill */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
            {/* Standard Veg / Non-Veg symbol */}
            <div
              className="w-5 h-5 rounded-md bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-xs border border-slate-200"
              title={food.isVeg ? '100% Vegetarian' : 'Non-Vegetarian'}
            >
              <div
                className={`w-3.5 h-3.5 border-2 rounded-[2px] flex items-center justify-center ${
                  food.isVeg ? 'border-emerald-600' : 'border-rose-600'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    food.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}
                />
              </div>
            </div>

            {/* Discount Pill */}
            {discountPercent && (
              <span className="bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs whitespace-nowrap">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Top Right: Favorite Button */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xs hover:bg-white transition-colors">
              <FavoriteButton
                size="sm"
                isFavorite={isFavorite}
                onToggle={() => toggleFoodFavorite(food.id, food.name)}
              />
            </div>
          </div>

          {/* Bottom Bar on Image: Delivery Time & Bestseller (Guaranteed Single-Line No Wrapping) */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10 pointer-events-none">
            {/* Delivery Time Badge */}
            <span className="inline-flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-bold whitespace-nowrap shadow-xs shrink-0">
              <i className="fa-solid fa-clock text-amber-400 text-[10px]" aria-hidden="true" />
              <span>{food.deliveryTime}</span>
            </span>

            {/* Bestseller / Calories Pill */}
            {food.popular ? (
              <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-xs whitespace-nowrap shrink-0">
                <i className="fa-solid fa-crown text-[9px]" aria-hidden="true" />
                <span>Bestseller</span>
              </span>
            ) : food.calories ? (
              <span className="bg-slate-950/80 backdrop-blur-md text-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap shadow-xs shrink-0">
                {food.calories}
              </span>
            ) : null}
          </div>
        </div>

        {/* Content Details */}
        <div className="space-y-1.5 mb-3 flex-1 flex flex-col">
          {/* Row 1: Restaurant Name & Compact Rating */}
          <div className="flex items-center justify-between gap-2">
            <Link
              to={`/restaurants/${food.restaurantId}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-bold text-slate-400 hover:text-orange-600 transition-colors truncate flex-1"
              title={food.restaurantName}
            >
              {food.restaurantName}
            </Link>

            {/* Clean Pill Rating with Stars */}
            <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-extrabold text-xs px-2 py-0.5 rounded-lg border border-emerald-200/80 shrink-0 shadow-2xs">
              <span>{Number(food.rating).toFixed(1)}</span>
              <i className="fa-solid fa-star text-[9px] text-emerald-500" aria-hidden="true" />
              {food.reviews && (
                <span className="text-[10px] text-emerald-600/70 font-semibold">
                  ({food.reviews > 999 ? `${(food.reviews / 1000).toFixed(1)}k` : food.reviews})
                </span>
              )}
            </div>
          </div>

          {/* Row 2: Dish Name */}
          <h4
            className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-orange-600 transition-colors line-clamp-1 min-h-[1.5rem]"
            title={food.name}
          >
            {food.name}
          </h4>

          {/* Row 3: Description with uniform height */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal min-h-[2.25rem]">
            {food.description}
          </p>

          {/* Row 4: Spice & Category Meta (Preventing any multi-line overflow) */}
          <div className="flex items-center gap-2 pt-1 flex-wrap mt-auto">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/90 px-2 py-0.5 rounded-md whitespace-nowrap shrink-0">
              <i className="fa-solid fa-pepper-hot text-[10px] text-rose-500" aria-hidden="true" />
              <span>{food.spiceLevel || 'Mild'}</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-400 capitalize whitespace-nowrap">
              {food.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200/90 px-2 py-0.5 rounded-md whitespace-nowrap shrink-0 ml-auto" title="Includes Step-by-Step Recipe">
              <i className="fa-solid fa-kitchen-set text-[9px] text-amber-600" aria-hidden="true" />
              <span>Recipe</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Price & Add CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {formatPrice(food.price)}
          </span>
          {food.originalPrice && (
            <span className="text-xs text-slate-400 line-through font-medium">
              {formatPrice(food.originalPrice)}
            </span>
          )}
        </div>

        {cartItem ? (
          <QuantitySelector
            size="sm"
            quantity={cartItem.quantity}
            onIncrease={(e) => {
              e.stopPropagation();
              increaseQty(cartItem.cartItemId);
            }}
            onDecrease={(e) => {
              e.stopPropagation();
              decreaseQty(cartItem.cartItemId);
            }}
            showTrashOnMin={true}
          />
        ) : (
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors duration-200 cursor-pointer shadow-xs"
            aria-label={`Add ${food.name} to cart`}
          >
            <i className="fa-solid fa-plus text-[10px]" aria-hidden="true" />
            <span className="tracking-wider">ADD</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
