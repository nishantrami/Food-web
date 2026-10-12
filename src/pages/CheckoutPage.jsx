import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartSummary } from '../components/cart/CartSummary';
import { Button } from '../components/common/Button';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { api } from '../services/api';
import { formatPrice } from '../utils/formatCurrency';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, deliveryFee, tax, discount, total, appliedCoupon, clearCart } = useCart();
  const { currentUser, isAuthenticated } = useAuth();
  const { success, error: toastError } = useToast();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'cod', 'upi', 'card'

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    street: '',
    city: 'Mumbai',
    pincode: '400050',
    deliveryInstructions: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      toastError("Please log in first to proceed to checkout.");
      navigate('/login', { state: { from: { pathname: '/checkout' } }, replace: true });
    }
  }, [isAuthenticated, navigate, toastError]);

  // Auto fill if user is authenticated
  useEffect(() => {
    if (currentUser) {
      const defAddr = currentUser.addresses?.[0];
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || prev.name,
        mobile: currentUser.phone || prev.mobile,
        street: defAddr?.street || prev.street,
        city: defAddr?.city || prev.city,
        pincode: defAddr?.pincode || prev.pincode
      }));
    }
  }, [currentUser]);

  // If cart is empty, redirect back to cart or explore
  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-black text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 text-sm mb-6 font-medium">Please add some items to proceed to checkout.</p>
        <Link to="/explore">
          <Button icon="fa-solid fa-utensils">Browse Foods</Button>
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!/^[0-9+ -]{10,14}$/.test(formData.mobile.trim())) {
      errs.mobile = "Enter a valid 10-digit mobile number";
    }
    if (!formData.street.trim()) errs.street = "Street address is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode.trim())) {
      errs.pincode = "Enter a valid 6-digit pincode";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || !currentUser) {
      toastError("Please log in first to place your order.");
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }

    if (!validate()) {
      toastError("Please complete all required delivery details.");
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        restaurantId: items[0]?.restaurantId || 1,
        restaurantName: items[0]?.restaurantName || 'FoodVerse Kitchen',
        restaurantImage: items[0]?.image,
        items,
        address: formData,
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'Online Payment (UPI)' : 'Credit / Debit Card',
        subtotal,
        deliveryFee,
        tax,
        discount,
        total,
        appliedCoupon: appliedCoupon?.code || null
      };

      const newOrder = await api.createOrder(orderPayload);
      clearCart();
      success(`Order #${newOrder.id} placed successfully!`);
      navigate('/order-success', { state: { order: newOrder } });
    } catch (err) {
      toastError(err.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <Link
          to="/cart"
          className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          aria-label="Back to Cart"
        >
          <i className="fa-solid fa-arrow-left text-sm" aria-hidden="true" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Checkout
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold">
            Confirm your delivery address and preferred payment method
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Payment Selection */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Delivery Address Form */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-black text-sm">
                1
              </div>
              <h2 className="text-lg font-black text-slate-800">
                Delivery Address
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.name ? 'border-rose-400 ring-1 ring-rose-200' : 'border-slate-200'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.mobile ? 'border-rose-400 ring-1 ring-rose-200' : 'border-slate-200'
                  }`}
                />
                {errors.mobile && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.mobile}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                  Street Address & Flat / House No. *
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="Flat 402, Skyline Towers, Sector 18"
                  className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.street ? 'border-rose-400 ring-1 ring-rose-200' : 'border-slate-200'
                  }`}
                />
                {errors.street && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.street}</p>}
              </div>

              <div>
                <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.city ? 'border-rose-400 ring-1 ring-rose-200' : 'border-slate-200'
                  }`}
                />
                {errors.city && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="400050"
                  className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.pincode ? 'border-rose-400 ring-1 ring-rose-200' : 'border-slate-200'
                  }`}
                />
                {errors.pincode && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.pincode}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                  Drop-off Instructions (Optional)
                </label>
                <input
                  type="text"
                  name="deliveryInstructions"
                  value={formData.deliveryInstructions}
                  onChange={handleInputChange}
                  placeholder="e.g. Ring the bell twice or leave at door"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

            </div>
          </section>

          {/* Step 2: Payment Method */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-card space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-black text-sm">
                2
              </div>
              <h2 className="text-lg font-black text-slate-800">
                Payment Method
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'upi',
                  name: 'UPI / Instant QR Payment',
                  desc: 'Google Pay, PhonePe, Paytm, BHIM UPI',
                  faIcon: 'fa-solid fa-mobile-screen-button',
                  badge: 'Instant & Seamless'
                },
                {
                  id: 'card',
                  name: 'Credit or Debit Card',
                  desc: 'Visa, Mastercard, RuPay, Amex',
                  faIcon: 'fa-solid fa-credit-card',
                  badge: null
                },
                {
                  id: 'cod',
                  name: 'Cash on Delivery (COD)',
                  desc: 'Pay cash or scan QR when your order arrives',
                  faIcon: 'fa-solid fa-money-bill-wave',
                  badge: 'Pay at Doorstep'
                }
              ].map((method) => {
                const isSelected = paymentMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-200'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                        isSelected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <i className={method.faIcon} aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-black text-slate-900">{method.name}</p>
                          {method.badge && (
                            <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                              {method.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 font-medium">{method.desc}</p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-orange-500 bg-orange-500' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <CartSummary
            actionText={`Place Order • ${formatPrice(total)}`}
            onAction={handlePlaceOrder}
            loading={loading}
          />
        </div>

      </div>

    </div>
  );
};
