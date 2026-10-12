import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/formatCurrency';

export const OrderCard = ({ order }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <i className="fa-solid fa-circle-check text-xs" aria-hidden="true" />
            Delivered
          </span>
        );
      case 'Out for Delivery':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 animate-pulse">
            <i className="fa-solid fa-motorcycle text-xs" aria-hidden="true" />
            Out for Delivery
          </span>
        );
      case 'Preparing':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <i className="fa-solid fa-kitchen-set text-xs" aria-hidden="true" />
            Preparing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            <i className="fa-solid fa-receipt text-orange-600 text-xs" aria-hidden="true" />
            Order Placed
          </span>
        );
    }
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-200 space-y-4"
    >
      {/* Header: Order ID, Date, and Status Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-900 text-base sm:text-lg">
              #{order.id}
            </span>
            <span className="text-xs text-slate-400 font-bold">
              • {formattedDate}
            </span>
          </div>
          <p className="text-xs font-extrabold text-orange-600 mt-0.5">
            {order.restaurantName}
          </p>
        </div>
        <div>
          {getStatusBadge(order.status)}
        </div>
      </div>

      {/* Items preview */}
      <div className="space-y-2 py-1">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
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

      {/* Footer: Total & CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block font-bold">Total Paid</span>
          <span className="text-lg font-black text-slate-900">
            {formatPrice(order.total)}
          </span>
        </div>

        <Link
          to={`/orders/${order.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors duration-200 shadow-sm"
        >
          <span>View Details & Track</span>
          <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
};
