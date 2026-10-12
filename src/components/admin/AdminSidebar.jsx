import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminSidebar = ({
  activeTab,
  setActiveTab,
  counts = {},
  isOpen = false,
  onClose = () => {}
}) => {
  const navigate = useNavigate();
  const { adminUser, adminLogout } = useAdminAuth();

  const handleLogout = () => {
    adminLogout();
    navigate('/');
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fa-solid fa-chart-pie',
      badge: null
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: 'fa-solid fa-bag-shopping',
      badge: counts.activeOrders > 0 ? `${counts.activeOrders} active` : counts.orders
    },
    {
      id: 'menu',
      label: 'Menu & Dishes',
      icon: 'fa-solid fa-utensils',
      badge: counts.dishes
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: 'fa-solid fa-users',
      badge: counts.customers
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/90 shadow-sm flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Brand */}
        <div className="p-5 space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <BrandLogo size="sm" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 block leading-none">
                  Admin Portal
                </span>
                <span className="font-black text-xs text-slate-800">
                  FoodVerse HQ
                </span>
              </div>
            </Link>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs cursor-pointer"
            >
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          </div>

          {/* Admin Profile Card */}
          <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-100/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center text-sm font-black shadow-xs shrink-0">
              <i className="fa-solid fa-user-shield" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-slate-900 truncate">
                  {adminUser?.name || 'Super Admin'}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online" />
              </div>
              <p className="text-[11px] text-slate-500 truncate font-medium">
                {adminUser?.email || 'admin@foodverse.com'}
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 pb-1">
              Management
            </p>

            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-xs font-black'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`${item.icon} text-sm w-4 text-center ${isActive ? 'text-white' : 'text-slate-400'}`} aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== null && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-orange-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-5 border-t border-slate-100 space-y-3">
          
          {/* Secret shortcut reminder */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold flex items-center gap-1.5">
              <i className="fa-solid fa-key text-orange-500 text-xs" aria-hidden="true" />
              <span>Secret Trigger</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono font-bold text-slate-700 shadow-2xs">
              Ctrl + F
            </kbd>
          </div>

          {/* Quick Links */}
          <div className="space-y-1">
            <Link
              to="/"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <i className="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400" aria-hidden="true" />
              <span>Live Storefront</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer text-left"
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-xs text-rose-500" aria-hidden="true" />
              <span>Sign Out Admin</span>
            </button>
          </div>

        </div>

      </aside>
    </>
  );
};
