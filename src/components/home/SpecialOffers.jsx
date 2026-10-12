import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AVAILABLE_COUPONS } from '../../constants/coupons';
import { useToast } from '../../hooks/useToast';

export const SpecialOffers = () => {
  const { success } = useToast();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    success(`Coupon code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="my-14 sm:my-18">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
            <i className="fa-solid fa-ticket text-xs" aria-hidden="true" />
            <span>Special Member Discounts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Exclusive Coupons & Deals
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {AVAILABLE_COUPONS.map((coupon) => {
          const isCopied = copiedCode === coupon.code;
          return (
            <motion.div
              key={coupon.code}
              whileHover={{ y: -4 }}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover hover:border-orange-300 flex flex-col justify-between relative overflow-hidden group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold tracking-wider text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                    {coupon.type === 'percentage' ? `${coupon.percentage}% OFF` : `FLAT ₹${coupon.discountAmount} OFF`}
                  </span>
                  <i className="fa-solid fa-tag text-orange-500 text-sm" aria-hidden="true" />
                </div>
                
                <h3 className="font-extrabold text-slate-900 text-lg mb-1 tracking-tight">
                  {coupon.code}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 font-normal">
                  {coupon.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">
                  Min order: ₹{coupon.minOrder}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    isCopied
                      ? 'bg-amber-400 text-slate-900 shadow-xs'
                      : 'bg-orange-500 hover:bg-orange-600 text-white shadow-xs'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <i className="fa-solid fa-check text-xs" aria-hidden="true" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-copy text-xs" aria-hidden="true" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
