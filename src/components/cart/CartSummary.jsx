import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { formatPrice } from '../../utils/formatCurrency';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

export const CartSummary = ({
  actionText = "Proceed to Checkout",
  actionLink = "/checkout",
  onAction,
  disabled = false,
  loading = false,
  showCheckoutButton = true
}) => {
  const { subtotal, deliveryFee, tax, discount, total, appliedCoupon } = useCart();

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { error: toastError } = useToast();

  const isFreeDeliveryEligible = subtotal >= 499;
  const remainingForFreeDelivery = Math.max(0, 499 - subtotal);

  const handleCheckoutClick = (e) => {
    if (actionLink === '/checkout' && !isAuthenticated) {
      e.preventDefault();
      toastError("Please log in first to place your order.");
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card space-y-5">
      <h3 className="font-black text-slate-800 text-lg border-b border-slate-100 pb-3 tracking-tight">
        Order Summary
      </h3>

      {/* Free Delivery Tracker */}
      {subtotal > 0 && (
        <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-100">
          {isFreeDeliveryEligible ? (
            <div className="flex items-center gap-2.5 text-xs font-bold text-amber-900">
              <i className="fa-solid fa-circle-check text-amber-600 text-sm shrink-0" aria-hidden="true" />
              <span>You've unlocked FREE Delivery on this order!</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Add {formatPrice(remainingForFreeDelivery)} more for Free Delivery</span>
                <span>{Math.round((subtotal / 499) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / 499) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600 font-medium">
          <span>Items Subtotal</span>
          <span className="font-black text-slate-800">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-slate-600 font-medium">
          <span className="flex items-center gap-2">
            <span>Delivery Fee</span>
            {isFreeDeliveryEligible && (
              <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                FREE
              </span>
            )}
          </span>
          <span className="font-black text-slate-800">
            {deliveryFee === 0 ? "₹0" : formatPrice(deliveryFee)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-orange-600 font-bold">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-wand-magic-sparkles text-xs" aria-hidden="true" />
              <span>Coupon Discount {appliedCoupon ? `(${appliedCoupon.code})` : ''}</span>
            </span>
            <span className="font-black">-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600 font-medium">
          <span>Taxes & Charges (5% GST)</span>
          <span className="font-black text-slate-800">{formatPrice(tax)}</span>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
          <div>
            <span className="text-base font-black text-slate-900">To Pay</span>
            <p className="text-[11px] text-slate-400 font-semibold">Inclusive of all taxes</p>
          </div>
          <span className="text-2xl font-black text-orange-600">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Checkout CTA */}
      {showCheckoutButton && (
        <div className="pt-2">
          {onAction ? (
            <Button
              onClick={onAction}
              disabled={disabled || subtotal === 0}
              loading={loading}
              size="lg"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-sm"
              icon="fa-solid fa-arrow-right"
              iconPosition="right"
            >
              {actionText}
            </Button>
          ) : (
            <Link to={actionLink} onClick={handleCheckoutClick} className="block">
              <Button
                disabled={subtotal === 0}
                size="lg"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-sm"
                icon="fa-solid fa-arrow-right"
                iconPosition="right"
              >
                {actionText}
              </Button>
            </Link>
          )}
        </div>
      )}

      <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-400 font-bold">
        <i className="fa-solid fa-shield-halved text-emerald-500 text-xs" aria-hidden="true" />
        <span>Safe & Encrypted 256-bit Checkout</span>
      </div>
    </div>
  );
};
