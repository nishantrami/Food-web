import React, { useState, useEffect } from 'react';
import { OrderCard } from '../components/order/OrderCard';
import { OrderSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export const OrdersPage = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser?.id) {
        setOrders([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await api.getOrders(currentUser.id);
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser?.id]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-700 bg-orange-50 px-3.5 py-1.5 rounded-full mb-2">
          <i className="fa-solid fa-wand-magic-sparkles text-xs" aria-hidden="true" />
          <span>Real-time Tracking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          My Order History
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Review recent dining deliveries and track active kitchen dispatches.
        </p>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="space-y-4">
          <OrderSkeleton />
          <OrderSkeleton />
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          type="orders"
          title="No orders found"
          description="You haven't ordered any delicious food yet. Your journey to fine dining starts with your first dish!"
          actionText="Browse Menu & Order"
          actionLink="/explore"
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

    </div>
  );
};
