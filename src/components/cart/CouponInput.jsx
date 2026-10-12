import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { AVAILABLE_COUPONS } from '../../constants/coupons';

export const CouponInput = () => {
  const { appliedCoupon, applyCouponCode, removeCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const success = applyCouponCode(couponCode.trim());
    if (success) {
      setCouponCode('');
    }
  };

  const handleQuickApply = (code) => {
    applyCouponCode(code);
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-card space-y-4">
      <div className="flex items-center gap-2">
        <i className="fa-solid fa-tag text-orange-500 text-sm" aria-hidden="true" />
        <h3 className="font-black text-slate-800 text-sm sm:text-base tracking-tight">
          Apply Coupon Code
        </h3>
      </div>

      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3.5 bg-amber-50 border border-amber-200 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-xs">
              <i className="fa-solid fa-check" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-black text-amber-900 tracking-wider uppercase">
                '{appliedCoupon.code}' APPLIED
              </p>
              <p className="text-[11px] text-amber-800 font-bold">
                {appliedCoupon.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeCoupon}
            className="text-xs font-black text-rose-600 hover:text-rose-700 p-1.5 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          <form onSubmit={handleApply} className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="e.g. FIRST50, FOOD100"
              className="flex-1 uppercase font-black text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={!couponCode.trim()}
              className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-black text-xs transition-colors cursor-pointer shrink-0"
            >
              Apply
            </button>
          </form>

          {/* Quick coupon chips */}
          <div className="pt-1">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">
              Available Deals:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_COUPONS.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleQuickApply(c.code)}
                  className="text-[11px] font-black px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200/60 transition-colors cursor-pointer"
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
