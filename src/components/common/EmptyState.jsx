import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  icon,
  type = 'search',
  title,
  description,
  actionText = 'Explore Dishes',
  actionLink = '/explore',
  onAction,
  suggestions = []
}) => {
  const defaults = {
    cart: {
      icon: "fa-solid fa-cart-shopping",
      title: "Your cart is empty",
      description: "Looks like you haven't added anything yet. Explore top dishes from our handpicked restaurants!",
      actionText: "Browse Menu",
      actionLink: "/explore"
    },
    favorites: {
      icon: "fa-solid fa-heart",
      title: "No favorites yet",
      description: "Tap the heart icon on any dish or restaurant to curate your personal dream menu here.",
      actionText: "Discover Food",
      actionLink: "/explore"
    },
    orders: {
      icon: "fa-solid fa-box-open",
      title: "No orders placed yet",
      description: "You haven't ordered anything yet. Start your first culinary adventure today!",
      actionText: "Order Now",
      actionLink: "/explore"
    },
    search: {
      icon: "fa-solid fa-magnifying-glass",
      title: "No food or restaurants found",
      description: "We couldn't find matches for your search. Try checking the spelling or browse our popular categories.",
      actionText: "Clear Search",
      actionLink: "/explore"
    },
    restaurants: {
      icon: "fa-solid fa-store",
      title: "No restaurants found",
      description: "Try adjusting your cuisine filters or distance preferences to explore more kitchens.",
      actionText: "Reset Filters",
      actionLink: "/restaurants"
    }
  };

  const config = defaults[type] || defaults.search;
  const displayIcon = icon || config.icon;
  const displayTitle = title || config.title;
  const displayDesc = description || config.description;
  const displayActionText = actionText || config.actionText;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center px-4 py-16 max-w-md mx-auto"
    >
      <div className="w-20 h-20 rounded-3xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-6 shadow-sm">
        <i className={`${displayIcon} text-3xl`} aria-hidden="true" />
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
        {displayTitle}
      </h3>
      
      <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6 max-w-sm">
        {displayDesc}
      </p>

      {suggestions && suggestions.length > 0 && (
        <div className="mb-6 w-full">
          <p className="text-xs uppercase tracking-wider font-extrabold text-slate-400 mb-2.5">
            Try searching for:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {suggestions.map((item, idx) => (
              <Link
                key={idx}
                to={`/explore?search=${encodeURIComponent(item)}`}
                className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}

      {onAction ? (
        <Button onClick={onAction} size="md" icon="fa-solid fa-arrow-right" iconPosition="right">
          {displayActionText}
        </Button>
      ) : actionLink ? (
        <Link to={actionLink}>
          <Button size="md" icon="fa-solid fa-arrow-right" iconPosition="right">
            {displayActionText}
          </Button>
        </Link>
      ) : null}
    </motion.div>
  );
};
