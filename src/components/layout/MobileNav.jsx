import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';

export const MobileNav = () => {
  const { favoriteFoods, favoriteRestaurants } = useFavorites();
  const totalFavorites = favoriteFoods.length + favoriteRestaurants.length;

  const items = [
    { name: 'Home', path: '/', icon: 'fa-solid fa-house' },
    { name: 'Explore', path: '/explore', icon: 'fa-solid fa-compass' },
    { name: 'Favorites', path: '/favorites', icon: 'fa-solid fa-heart', badge: totalFavorites },
    { name: 'Orders', path: '/orders', icon: 'fa-solid fa-bag-shopping' },
    { name: 'Profile', path: '/profile', icon: 'fa-solid fa-user' }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-2 safe-area-pb">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'text-orange-500 font-black'
                    : 'text-slate-400 hover:text-slate-600 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative flex items-center justify-center">
                    <i 
                      className={`${item.icon} text-lg transition-transform ${
                        isActive ? 'scale-115 text-orange-500' : 'text-slate-400'
                      }`} 
                      aria-hidden="true" 
                    />
                    {item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] mt-1 tracking-tight font-extrabold">{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
