import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/common/Button';
import { formatPrice } from '../utils/formatCurrency';

export const OrderSuccessPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  // Fallback if accessed directly without state
  if (!order) {
    return <Navigate to="/orders" replace />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16 text-center space-y-8">
      
      {/* Animated Checkmark Circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30 text-5xl"
      >
        <i className="fa-solid fa-circle-check" aria-hidden="true" />
      </motion.div>

      {/* Success Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-2"
      >
        <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full">
          <i className="fa-solid fa-wand-magic-sparkles text-xs" aria-hidden="true" />
          <span>Payment Verified & Confirmed</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Order Confirmed!
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto font-medium">
          Your order <strong className="text-slate-800">#{order.id}</strong> has been received by <span className="text-orange-600 font-bold">{order.restaurantName}</span>.
        </p>
      </motion.div>

      {/* Order Info Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card text-left space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs text-slate-400 block font-bold">Estimated Delivery</span>
            <span className="text-lg font-black text-slate-900 flex items-center gap-2 mt-0.5">
              <i className="fa-solid fa-clock text-amber-500 text-base" aria-hidden="true" />
              <span>{order.estimatedDelivery || "30-40 minutes"}</span>
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-bold">Amount Paid</span>
            <span className="text-lg font-black text-slate-900">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        {/* Address & Items */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-xs text-slate-600">
            <i className="fa-solid fa-location-dot text-rose-500 text-sm mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-black text-slate-800">{order.address?.name} • {order.address?.mobile}</p>
              <p className="text-slate-500 mt-0.5 font-medium">{order.address?.street}, {order.address?.city} - {order.address?.pincode}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
              Order Items ({order.items?.length})
            </p>
            <div className="space-y-2">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-700 font-semibold">
                    <span className="font-black text-orange-600 mr-2">{item.quantity}×</span>
                    {item.name}
                  </span>
                  <span className="font-black text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
      >
        <Link to={`/orders/${order.id}`} className="w-full sm:w-auto">
          <Button size="lg" icon="fa-solid fa-bag-shopping" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white shadow-sm">
            Track Order Live
          </Button>
        </Link>
        <Link to="/explore" className="w-full sm:w-auto">
          <Button variant="secondary" size="lg" icon="fa-solid fa-arrow-right" iconPosition="right" className="w-full sm:w-auto">
            Continue Shopping
          </Button>
        </Link>
      </motion.div>

    </div>
  );
};
