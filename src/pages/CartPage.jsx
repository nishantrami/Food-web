import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { CouponInput } from '../components/cart/CouponInput';
import { EmptyState } from '../components/common/EmptyState';
import { useCart } from '../hooks/useCart';

export const CartPage = () => {
  const { 
    items, 
    increaseQty, 
    decreaseQty, 
    removeItem, 
    clearCart,
    itemCount 
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          type="cart"
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Discover mouth-watering dishes from top-rated kitchens!"
          actionText="Explore Delicious Food"
          actionLink="/explore"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <Link
            to="/explore"
            className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            aria-label="Continue Shopping"
          >
            <i className="fa-solid fa-arrow-left text-sm" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold">
              {itemCount} {itemCount === 1 ? 'dish' : 'dishes'} ready for checkout
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-black text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3.5 py-2 rounded-xl border border-rose-200/80 transition-colors self-start sm:self-auto flex items-center gap-2 cursor-pointer"
        >
          <i className="fa-solid fa-trash-can text-xs" aria-hidden="true" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Main Grid: Cart Items & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Items List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-3">
            {items.map((item) => (
              <CartItem
                key={item.cartItemId}
                item={item}
                onIncrease={() => increaseQty(item.cartItemId)}
                onDecrease={() => decreaseQty(item.cartItemId)}
                onRemove={() => removeItem(item.cartItemId, item.name)}
              />
            ))}
          </div>

          {/* Quick link to add more items */}
          <div className="pt-2">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 p-2"
            >
              <i className="fa-solid fa-plus text-xs" aria-hidden="true" />
              <span>Add more items from the menu</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Coupon & Order Summary */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <CouponInput />
          <CartSummary />
        </div>

      </div>

    </div>
  );
};
