import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatCurrency';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { adminUser, adminLogout } = useAdminAuth();
  const { success, error: toastError, info } = useToast();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'orders' | 'menu' | 'customers'
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Orders Tab filters
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Menu Tab filters & modal
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [menuCategoryFilter, setMenuCategoryFilter] = useState('all');
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);
  const [newDishForm, setNewDishForm] = useState({
    name: '',
    category: 'burger',
    cuisine: 'American',
    price: 199,
    originalPrice: 249,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    description: 'Freshly handcrafted with artisan ingredients and chef signature seasonings.'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersData, usersData, foodsData] = await Promise.all([
        api.getAllOrdersAdmin(),
        api.getAllUsersAdmin(),
        api.getFoods()
      ]);
      setOrders(ordersData);
      setUsers(usersData);
      setFoods(foodsData);
    } catch (err) {
      console.error(err);
      toastError("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Metrics
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + (o.total || 0), 0);
  }, [orders]);

  const activeOrdersCount = useMemo(() => {
    return orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  }, [orders]);

  const deliveredOrdersCount = useMemo(() => {
    return orders.filter(o => o.status === 'Delivered').length;
  }, [orders]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
      const q = orderSearchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        o.id.toLowerCase().includes(q) ||
        (o.address?.name && o.address.name.toLowerCase().includes(q)) ||
        (o.address?.mobile && o.address.mobile.includes(q)) ||
        (o.userName && o.userName.toLowerCase().includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [orders, orderStatusFilter, orderSearchQuery]);

  // Filtered foods
  const filteredFoods = useMemo(() => {
    return foods.filter(f => {
      const matchesCat = menuCategoryFilter === 'all' || f.category.toLowerCase() === menuCategoryFilter.toLowerCase();
      const q = menuSearchQuery.toLowerCase().trim();
      const matchesSearch = !q || f.name.toLowerCase().includes(q) || f.cuisine.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [foods, menuCategoryFilter, menuSearchQuery]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const updated = await api.updateOrderStatusAdmin(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? updated : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updated);
      }
      success(`Order #${orderId} marked as "${newStatus}"!`);
    } catch (err) {
      toastError(err.message || "Failed to update status");
    }
  };

  const handleCreateDish = async (e) => {
    e.preventDefault();
    if (!newDishForm.name.trim()) {
      toastError("Dish name is required");
      return;
    }
    try {
      const created = await api.addCustomFoodAdmin({
        name: newDishForm.name,
        category: newDishForm.category,
        cuisine: newDishForm.cuisine,
        price: Number(newDishForm.price) || 199,
        originalPrice: Number(newDishForm.originalPrice) || Number(newDishForm.price) + 50,
        isVeg: Boolean(newDishForm.isVeg),
        image: newDishForm.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        description: newDishForm.description || 'Artisan chef specialty prepared fresh on order.'
      });
      setFoods(prev => [created, ...prev]);
      setIsAddDishModalOpen(false);
      setNewDishForm({
        name: '',
        category: 'burger',
        cuisine: 'American',
        price: 199,
        originalPrice: 249,
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        description: ''
      });
      success(`Added "${created.name}" to menu catalog!`);
    } catch (err) {
      toastError(err.message || "Could not add dish");
    }
  };

  const handleDeleteDish = async (dishId, dishName) => {
    if (!window.confirm(`Are you sure you want to remove "${dishName}" from the menu?`)) return;
    try {
      await api.deleteFoodAdmin(dishId);
      setFoods(prev => prev.filter(f => f.id !== dishId));
      success(`Removed "${dishName}" from menu.`);
    } catch (err) {
      toastError(err.message || "Could not remove dish");
    }
  };

  const statusBadges = {
    'Order Placed': 'bg-blue-50 text-blue-700 border-blue-200',
    'Preparing': 'bg-amber-50 text-amber-700 border-amber-200',
    'Out for Delivery': 'bg-purple-50 text-purple-700 border-purple-200',
    'Delivered': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Cancelled': 'bg-rose-50 text-rose-700 border-rose-200'
  };

  const tabTitles = {
    dashboard: { title: 'Operations Dashboard', desc: 'Real-time revenue, order flow, and catalog metrics overview.' },
    orders: { title: 'Customer Orders Management', desc: 'Inspect, filter, and transition order fulfillment status live.' },
    menu: { title: 'Menu & Dishes Catalog', desc: 'Manage food items, pricing, dietary flags, and catalog availability.' },
    customers: { title: 'Registered Customers Directory', desc: 'Overview of verified accounts and customer ordering history.' }
  };

  return (
    <div className="min-h-screen bg-[#fffcf7] text-slate-800 flex select-none">
      
      {/* Sidebar Component */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counts={{
          orders: orders.length,
          dishes: foods.length,
          customers: users.length,
          activeOrders: activeOrdersCount
        }}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
          <div className="px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm cursor-pointer"
                aria-label="Open sidebar"
              >
                <i className="fa-solid fa-bars" aria-hidden="true" />
              </button>

              <div>
                <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  {tabTitles[activeTab]?.title}
                </h1>
                <p className="text-xs text-slate-400 font-medium hidden sm:block">
                  {tabTitles[activeTab]?.desc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={fetchData}
                title="Refresh Live Data"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-rotate-right" aria-hidden="true" />
              </button>

              <Link
                to="/"
                className="px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold transition-colors flex items-center gap-2 border border-orange-200/60"
              >
                <i className="fa-solid fa-store text-xs" aria-hidden="true" />
                <span className="hidden sm:inline">Live Storefront</span>
              </Link>
            </div>

          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Stat Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span>Total Orders</span>
                    <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xs">
                      <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">{orders.length}</p>
                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <i className="fa-solid fa-check text-[10px]" aria-hidden="true" />
                    <span>{deliveredOrdersCount} delivered successfully</span>
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span>Total Revenue</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
                      <i className="fa-solid fa-indian-rupee-sign" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-600">{formatPrice(totalRevenue)}</p>
                  <p className="text-[11px] text-slate-400 font-semibold">From live checkout payments</p>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span>Active Orders</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
                      <i className="fa-solid fa-clock-rotate-left" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-amber-600">{activeOrdersCount}</p>
                  <p className="text-[11px] text-slate-400 font-semibold">Requires preparation / transit</p>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span>Customers</span>
                    <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-xs">
                      <i className="fa-solid fa-users" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">{users.length}</p>
                  <p className="text-[11px] text-slate-400 font-semibold">{foods.length} dishes in catalog</p>
                </div>
              </div>

              {/* Quick Actions & Recent Orders Banner */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Recent Customer Orders</h3>
                    <p className="text-xs text-slate-400 font-medium">Latest incoming orders requiring attention.</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-black text-orange-600 hover:text-orange-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View All Orders</span>
                    <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="py-10 text-center text-slate-400 space-y-2">
                    <i className="fa-solid fa-box-open text-3xl text-slate-300" aria-hidden="true" />
                    <p className="text-sm font-bold text-slate-600">No customer orders placed yet</p>
                    <p className="text-xs text-slate-400">Orders placed by customers will stream here in real time.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 uppercase text-[10px] font-black text-slate-400 tracking-wider">
                        <tr>
                          <th className="py-3 px-3.5 rounded-l-xl">Order ID</th>
                          <th className="py-3 px-3.5">Customer</th>
                          <th className="py-3 px-3.5">Items</th>
                          <th className="py-3 px-3.5">Total</th>
                          <th className="py-3 px-3.5">Status</th>
                          <th className="py-3 px-3.5 rounded-r-xl text-right">Quick Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 px-3.5 font-mono font-bold text-orange-600">
                              #{order.id}
                            </td>
                            <td className="py-3 px-3.5 font-bold text-slate-800">
                              {order.address?.name || order.userName || 'Customer'}
                            </td>
                            <td className="py-3 px-3.5 text-slate-500 font-medium">
                              {order.items?.length || 0} items
                            </td>
                            <td className="py-3 px-3.5 font-black text-slate-900">
                              {formatPrice(order.total)}
                            </td>
                            <td className="py-3 px-3.5">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black border ${statusBadges[order.status] || 'bg-slate-100 text-slate-600'}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                <span>{order.status}</span>
                              </span>
                            </td>
                            <td className="py-3 px-3.5 text-right">
                              <button
                                type="button"
                                onClick={() => setSelectedOrder(order)}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              
              {/* Filter controls & Search */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-card flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                
                {/* Status Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {['all', 'Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setOrderStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        orderStatusFilter === status
                          ? 'bg-orange-500 text-white shadow-xs font-black'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {status === 'all' ? 'All Orders' : status}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative max-w-xs w-full">
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Search Order ID, Customer, Phone..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                  <i className="fa-solid fa-magnifying-glass text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none" aria-hidden="true" />
                </div>

              </div>

              {/* Orders Table Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
                {loading ? (
                  <div className="p-12 text-center text-slate-400 font-bold text-sm">
                    <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    Loading orders...
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 space-y-2">
                    <i className="fa-solid fa-receipt text-3xl text-slate-300" aria-hidden="true" />
                    <p className="font-bold text-sm text-slate-700">No matching orders found</p>
                    <p className="text-xs text-slate-400">Try adjusting your status filter or search query.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 uppercase text-[10px] font-black text-slate-400 tracking-wider border-b border-slate-100">
                        <tr>
                          <th className="py-3.5 px-4">Order ID</th>
                          <th className="py-3.5 px-4">Customer Details</th>
                          <th className="py-3.5 px-4">Ordered Items</th>
                          <th className="py-3.5 px-4">Amount</th>
                          <th className="py-3.5 px-4">Fulfillment Status</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-orange-600">
                              #{order.id}
                              <span className="block text-[10px] text-slate-400 font-sans font-medium mt-0.5">
                                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="font-bold text-slate-900 block">
                                {order.address?.name || order.userName || 'Anonymous'}
                              </span>
                              <span className="text-[11px] text-slate-500 block font-mono">
                                {order.address?.mobile || 'No mobile'}
                              </span>
                              <span className="text-[10px] text-slate-400 block truncate max-w-[150px]">
                                {order.address?.city || 'Mumbai'}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 max-w-xs">
                              <div className="space-y-0.5 truncate">
                                {order.items?.map((item, idx) => (
                                  <span key={idx} className="block truncate text-slate-700">
                                    <strong className="text-orange-600 font-black">{item.quantity}×</strong> {item.name}
                                  </span>
                                ))}
                              </div>
                              <span className="text-[10px] text-slate-400 font-semibold">
                                {order.items?.length || 0} unique items
                              </span>
                            </td>

                            <td className="py-3.5 px-4 whitespace-nowrap font-black text-slate-900 text-sm">
                              {formatPrice(order.total)}
                              <span className="block text-[10px] text-slate-400 font-normal">
                                {order.paymentMethod}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black border ${statusBadges[order.status] || 'bg-slate-100 text-slate-700'}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                <span>{order.status}</span>
                              </span>
                            </td>

                            <td className="py-3.5 px-4 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-2">
                                <select
                                  value={order.status}
                                  onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                  className="bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-2.5 py-1 outline-none focus:border-orange-500 cursor-pointer shadow-2xs"
                                >
                                  <option value="Order Placed">Order Placed</option>
                                  <option value="Preparing">Preparing</option>
                                  <option value="Out for Delivery">Out for Delivery</option>
                                  <option value="Delivered">Delivered</option>
                                </select>

                                <button
                                  type="button"
                                  onClick={() => setSelectedOrder(order)}
                                  className="p-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs transition-colors cursor-pointer"
                                  title="Inspect full details"
                                >
                                  <i className="fa-solid fa-eye" aria-hidden="true" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: MENU & DISHES */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-card flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                
                {/* Category filters */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {['all', 'pizza', 'burger', 'biryani', 'dessert', 'rolls'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setMenuCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap cursor-pointer ${
                        menuCategoryFilter === cat
                          ? 'bg-orange-500 text-white shadow-xs font-black'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-60">
                    <input
                      type="text"
                      value={menuSearchQuery}
                      onChange={(e) => setMenuSearchQuery(e.target.value)}
                      placeholder="Search dish name..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-orange-500"
                    />
                    <i className="fa-solid fa-magnifying-glass text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 text-xs" aria-hidden="true" />
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddDishModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <i className="fa-solid fa-plus text-xs" aria-hidden="true" />
                    <span>Add Dish</span>
                  </button>
                </div>

              </div>

              {/* Dishes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredFoods.map((food) => (
                  <div
                    key={food.id}
                    className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 shadow-2xs">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase shadow-xs ${
                            food.isVeg ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                          }`}>
                            {food.isVeg ? 'Veg' : 'Non-Veg'}
                          </span>
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                            {food.category}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-black text-sm text-slate-900 truncate">{food.name}</h4>
                          <span className="text-xs font-black text-amber-500 flex items-center gap-1">
                            <i className="fa-solid fa-star text-[10px]" aria-hidden="true" />
                            <span>{food.rating || '5.0'}</span>
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1 font-medium">{food.description}</p>
                      </div>
                    </div>

                    <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-black text-slate-900">{formatPrice(food.price)}</span>
                        {food.originalPrice > food.price && (
                          <span className="text-xs text-slate-400 line-through ml-1.5 font-medium">
                            {formatPrice(food.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Link
                          to={`/food/${food.id}#recipe`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-orange-600 hover:text-orange-700 px-2.5 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 font-bold transition-colors cursor-pointer flex items-center gap-1"
                          title="View Step-by-Step Recipe"
                        >
                          <i className="fa-solid fa-kitchen-set text-[10px]" aria-hidden="true" />
                          <span>Recipe</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDeleteDish(food.id, food.name)}
                          className="text-xs text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 font-bold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <i className="fa-solid fa-trash-can text-[10px]" aria-hidden="true" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
                <div className="p-5 border-b border-slate-100">
                  <h3 className="font-black text-base text-slate-900">Registered Customer Database</h3>
                  <p className="text-xs text-slate-400 font-medium">Users created through active account registration.</p>
                </div>

                {users.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 space-y-2">
                    <i className="fa-solid fa-users text-3xl text-slate-300" aria-hidden="true" />
                    <p className="font-bold text-sm text-slate-700">No registered customers yet</p>
                    <p className="text-xs text-slate-400">Newly registered users will populate here automatically.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 uppercase text-[10px] font-black text-slate-400 tracking-wider border-b border-slate-100">
                        <tr>
                          <th className="py-3.5 px-4">User ID</th>
                          <th className="py-3.5 px-4">Customer</th>
                          <th className="py-3.5 px-4">Email</th>
                          <th className="py-3.5 px-4">Phone</th>
                          <th className="py-3.5 px-4">Orders Placed</th>
                          <th className="py-3.5 px-4 text-right">Total Spent</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {users.map((u) => {
                          const userOrders = orders.filter(o => o.userId === u.id);
                          const userSpend = userOrders.reduce((sum, o) => sum + (o.total || 0), 0);
                          return (
                            <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="py-3.5 px-4 font-mono font-bold text-slate-500 whitespace-nowrap">
                                {u.id}
                              </td>
                              <td className="py-3.5 px-4 whitespace-nowrap font-bold text-slate-900">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xs">
                                    <i className="fa-solid fa-user" aria-hidden="true" />
                                  </div>
                                  <span>{u.name}</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-medium text-slate-600 whitespace-nowrap">
                                {u.email}
                              </td>
                              <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap">
                                {u.phone || 'N/A'}
                              </td>
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-black text-slate-700 text-xs">
                                  {userOrders.length} orders
                                </span>
                              </td>
                              <td className="py-3.5 px-4 whitespace-nowrap text-right font-black text-emerald-600 text-sm">
                                {formatPrice(userSpend)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Modal 1: Inspect Order Details */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto border border-slate-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900">Order Details #{selectedOrder.id}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs cursor-pointer"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true" />
                </button>
              </div>

              {/* Status Updater */}
              <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-orange-950 uppercase">Fulfillment Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                  className="bg-white border border-orange-200 text-slate-800 text-xs font-black rounded-xl px-3 py-1.5 outline-none focus:border-orange-500 cursor-pointer shadow-xs"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              {/* Customer Destination */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Delivery Destination</span>
                <p className="font-black text-slate-900 text-sm">{selectedOrder.address?.name}</p>
                <p className="text-slate-600 font-medium">{selectedOrder.address?.street}, {selectedOrder.address?.city} - {selectedOrder.address?.pincode}</p>
                <p className="text-slate-600 font-bold font-mono pt-1">Phone: {selectedOrder.address?.mobile}</p>
              </div>

              {/* Dishes */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">Ordered Dishes</span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div>
                        <span className="font-black text-orange-600 mr-2">{item.quantity}×</span>
                        <span className="font-bold text-slate-800">{item.name}</span>
                        {item.customizationSummary && (
                          <span className="block text-[11px] text-slate-400 font-medium">{item.customizationSummary}</span>
                        )}
                      </div>
                      <span className="font-black text-slate-900">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Summary */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Subtotal</span>
                  <span>{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(selectedOrder.deliveryFee)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span>-{formatPrice(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Tax & Charges</span>
                  <span>{formatPrice(selectedOrder.tax)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-orange-600">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 2: Add New Dish */}
      <AnimatePresence>
        {isAddDishModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddDishModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto border border-slate-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900">Add New Dish to Catalog</h3>
                <button
                  type="button"
                  onClick={() => setIsAddDishModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs cursor-pointer"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true" />
                </button>
              </div>

              <form onSubmit={handleCreateDish} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Dish Name *</label>
                  <input
                    type="text"
                    value={newDishForm.name}
                    onChange={(e) => setNewDishForm({ ...newDishForm, name: e.target.value })}
                    placeholder="e.g. Gourmet Truffle Smash Burger"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:bg-white focus:border-orange-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold uppercase mb-1">Category</label>
                    <select
                      value={newDishForm.category}
                      onChange={(e) => setNewDishForm({ ...newDishForm, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:bg-white focus:border-orange-500 cursor-pointer"
                    >
                      <option value="burger">Burger</option>
                      <option value="pizza">Pizza</option>
                      <option value="biryani">Biryani</option>
                      <option value="dessert">Dessert</option>
                      <option value="rolls">Rolls</option>
                      <option value="beverages">Beverages</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold uppercase mb-1">Cuisine</label>
                    <input
                      type="text"
                      value={newDishForm.cuisine}
                      onChange={(e) => setNewDishForm({ ...newDishForm, cuisine: e.target.value })}
                      placeholder="e.g. American"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:bg-white focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold uppercase mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      value={newDishForm.price}
                      onChange={(e) => setNewDishForm({ ...newDishForm, price: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:bg-white focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold uppercase mb-1">Dietary Flag</label>
                    <select
                      value={newDishForm.isVeg ? 'veg' : 'nonveg'}
                      onChange={(e) => setNewDishForm({ ...newDishForm, isVeg: e.target.value === 'veg' })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:bg-white focus:border-orange-500 cursor-pointer"
                    >
                      <option value="veg">Vegetarian</option>
                      <option value="nonveg">Non-Vegetarian</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newDishForm.image}
                    onChange={(e) => setNewDishForm({ ...newDishForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:bg-white focus:border-orange-500 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newDishForm.description}
                    onChange={(e) => setNewDishForm({ ...newDishForm, description: e.target.value })}
                    placeholder="Describe seasonings, preparation, and portion size..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:bg-white focus:border-orange-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddDishModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black shadow-xs cursor-pointer"
                  >
                    Save & Publish Dish
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
