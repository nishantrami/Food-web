import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { OrderStatus } from '../components/order/OrderStatus';
import { Button } from '../components/common/Button';
import { ErrorState } from '../components/common/ErrorState';
import { api } from '../services/api';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import { formatPrice } from '../utils/formatCurrency';

export const OrderDetailPage = () => {
  const { orderId } = useParams();
  const { currentUser } = useAuth();
  const { success } = useToast();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!currentUser?.id) {
        setError("Please log in to view this order.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await api.getOrderById(orderId, currentUser.id);
        setOrder(data);
      } catch (err) {
        setError(err.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, currentUser?.id]);

  // Demo interactive feature: advance status simulator
  const handleAdvanceStatus = () => {
    if (!order) return;
    const stages = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];
    const currentIndex = stages.indexOf(order.status);
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1];
      const updatedTimeline = order.timeline.map((step, idx) => {
        if (idx < currentIndex + 1) {
          return { ...step, completed: true, current: false };
        } else if (idx === currentIndex + 1) {
          return { ...step, completed: true, current: true, time: "Just now" };
        } else {
          return { ...step, completed: false, current: false };
        }
      });

      const updatedOrder = {
        ...order,
        status: nextStage,
        timeline: updatedTimeline
      };

      setOrder(updatedOrder);

      // Persist in LocalStorage
      try {
        const stored = JSON.parse(localStorage.getItem('foodverse_orders') || '[]');
        const updated = stored.map(o => o.id === order.id ? updatedOrder : o);
        localStorage.setItem('foodverse_orders', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }

      success(`Order status progressed to: ${nextStage}!`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse space-y-6">
        <div className="w-48 h-8 bg-slate-200 rounded-xl" />
        <div className="h-64 bg-slate-200 rounded-3xl" />
        <div className="h-48 bg-slate-200 rounded-3xl" />
      </div>
    );
  }

  if (error || !order) {
    const isAccessDenied = error && error.toLowerCase().includes("access denied");
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center text-2xl shadow-xs">
          <i className={isAccessDenied ? "fa-solid fa-lock" : "fa-solid fa-triangle-exclamation"} aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          {isAccessDenied ? "Access Restricted" : "Order Not Found"}
        </h2>
        <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">
          {isAccessDenied
            ? "This order was placed by another account. You can only view order details for orders placed with your own account."
            : (error || "We couldn't locate this order ID. It may not exist in your account.")}
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link to="/orders">
            <Button icon="fa-solid fa-bag-shopping">View My Orders</Button>
          </Link>
          <Link to="/explore">
            <Button variant="secondary" icon="fa-solid fa-utensils">Explore Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Back button & Demo action */}
      <div className="flex items-center justify-between">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-orange-600 transition-colors"
        >
          <i className="fa-solid fa-arrow-left text-xs" aria-hidden="true" />
          <span>Back to All Orders</span>
        </Link>

        {/* Demo status advancement toggle */}
        {order.status !== 'Delivered' && (
          <Button
            variant="subtle"
            size="sm"
            icon="fa-solid fa-arrows-rotate"
            onClick={handleAdvanceStatus}
          >
            Advance Status (Demo)
          </Button>
        )}
      </div>

      {/* Main Order Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-float flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-amber-400">
            Order Tracking #{order.id}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            {order.restaurantName}
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-semibold">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-left sm:text-right">
          <p className="text-xs text-slate-400 font-black uppercase tracking-wider">Estimated Delivery</p>
          <p className="text-lg font-black text-white flex items-center sm:justify-end gap-2 mt-0.5">
            <i className="fa-solid fa-clock text-amber-400 text-sm" aria-hidden="true" />
            <span>{order.estimatedDelivery || "30-40 mins"}</span>
          </p>
        </div>
      </div>

      {/* Live Timeline Component */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card">
        <h2 className="text-lg font-black text-slate-900 mb-4 pb-3 border-b border-slate-100 tracking-tight">
          Delivery Status Timeline
        </h2>
        <OrderStatus timeline={order.timeline} currentStatus={order.status} />
      </div>

      {/* Grid: Order Items & Delivery Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Items & Price Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card space-y-4">
          <h3 className="text-base font-black text-slate-900 pb-3 border-b border-slate-100 tracking-tight">
            Ordered Items ({order.items.length})
          </h3>

          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs sm:text-sm">
                <div>
                  <p className="font-black text-slate-800">
                    <span className="text-orange-600 font-black mr-1.5">{item.quantity}×</span>
                    {item.name}
                  </p>
                  {item.customizationSummary && (
                    <p className="text-[11px] text-slate-400 font-semibold">{item.customizationSummary}</p>
                  )}
                </div>
                <span className="font-black text-slate-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500 font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-semibold">
              <span>Delivery Fee</span>
              <span>{order.deliveryFee === 0 ? "FREE" : formatPrice(order.deliveryFee)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-black">
                <span>Coupon Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500 font-semibold">
              <span>GST & Charges</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline text-sm font-black text-slate-900">
              <span>Total Paid</span>
              <span className="text-lg text-orange-600">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address & Payment Info */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card space-y-5">
          <h3 className="text-base font-black text-slate-900 pb-3 border-b border-slate-100 tracking-tight">
            Destination & Payment
          </h3>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <i className="fa-solid fa-location-dot text-rose-500 text-base shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-black text-slate-800">{order.address?.name}</p>
                <p className="text-slate-500 mt-0.5 font-medium">{order.address?.street}</p>
                <p className="text-slate-500 font-medium">{order.address?.city} - {order.address?.pincode}</p>
                <p className="text-slate-700 font-bold mt-1">Phone: {order.address?.mobile}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
              <i className="fa-solid fa-credit-card text-orange-500 text-base shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-black text-slate-800">Payment Option</p>
                <p className="text-slate-500 mt-0.5 font-medium">{order.paymentMethod}</p>
                <span className="inline-block mt-1 text-[10px] font-black uppercase px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md">
                  Paid Successfully
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
