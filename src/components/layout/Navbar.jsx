import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandLogo } from '../common/BrandLogo';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const navigate = useNavigate();
  const { itemCount, subtotal } = useCart();
  const { favoriteFoods, favoriteRestaurants } = useFavorites();
  const { currentUser, isAuthenticated, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const totalFavorites = favoriteFoods.length + favoriteRestaurants.length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: 'fa-solid fa-house' },
    { name: 'Explore', path: '/explore', icon: 'fa-solid fa-compass' },
    { name: 'Restaurants', path: '/restaurants', icon: 'fa-solid fa-store' },
    { name: 'Orders', path: '/orders', icon: 'fa-solid fa-bag-shopping' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">

          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="shrink-0">
              <BrandLogo size="md" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${isActive
                    ? 'text-orange-600 bg-orange-50 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'
                  }`
                }
              >
                <i className={`${link.icon} text-xs`} aria-hidden="true" />
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Quick Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xs lg:max-w-sm relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, restaurants..."
              className="w-full bg-slate-100 hover:bg-slate-200/60 focus:bg-white text-xs sm:text-sm pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800 shadow-2xs"
            />
            <i className="fa-solid fa-magnifying-glass text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none" aria-hidden="true" />
          </form>

          {/* Right Action Icons (Favorites, Cart, Profile) */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Mobile Search Icon */}
            <Link
              to="/explore"
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              aria-label="Search"
            >
              <i className="fa-solid fa-magnifying-glass text-base" aria-hidden="true" />
            </Link>

            {/* Favorites Icon */}
            <Link
              to="/favorites"
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors duration-200 group border border-transparent hover:border-rose-100"
              aria-label="My Favorites"
            >
              <i className="fa-solid fa-heart text-base group-hover:scale-110 transition-transform" aria-hidden="true" />
              {totalFavorites > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {totalFavorites}
                </span>
              )}
            </Link>

            {/* Modern Cart Button with Live Dynamic Counter and Subtotal */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200 group shadow-xs cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <i className="fa-solid fa-cart-shopping text-base group-hover:scale-110 transition-transform text-white" aria-hidden="true" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="absolute -top-2.5 -right-3 bg-amber-400 text-slate-900 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[9px] text-orange-100 font-bold uppercase tracking-wider leading-none">
                  {itemCount === 0 ? 'Cart' : `${itemCount} Items`}
                </span>
                {itemCount > 0 && (
                  <span className="text-xs font-black text-white leading-tight">
                    ₹{subtotal}
                  </span>
                )}
              </div>
            </Link>

            {/* User Profile or Login */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 p-1 sm:pr-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold ring-1 ring-orange-200">
                    <i className="fa-solid fa-user" aria-hidden="true" />
                  </div>
                  <span className="hidden lg:block text-xs font-black text-slate-800 max-w-[100px] truncate">
                    {currentUser?.name?.split(' ')[0]}
                  </span>
                  <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 hidden sm:block" aria-hidden="true" />
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setIsProfileMenuOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-float border border-slate-200 p-2 z-40 text-sm"
                      >
                        <div className="px-3 py-2 border-b border-slate-100 mb-1">
                          <p className="font-black text-slate-900 truncate">{currentUser.name}</p>
                          <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition-colors font-bold text-xs"
                        >
                          <i className="fa-solid fa-user w-4 text-center text-slate-400" aria-hidden="true" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition-colors font-bold text-xs"
                        >
                          <i className="fa-solid fa-bag-shopping w-4 text-center text-slate-400" aria-hidden="true" />
                          <span>Order History</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#b91c1c] hover:bg-red-50 transition-colors font-bold text-xs cursor-pointer text-left"
                        >
                          <i className="fa-solid fa-arrow-right-from-bracket w-4 text-center text-[#b91c1c]" aria-hidden="true" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors duration-200 shadow-xs"
              >
                <i className="fa-solid fa-user text-xs" aria-hidden="true" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
