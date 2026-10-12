import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { BrandLogo } from '../components/common/BrandLogo';
import { useAuth } from '../hooks/useAuth';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!formData.password) {
      errs.password = "Password is required";
    } else if (formData.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register(formData);
      navigate('/explore');
    } catch {
      // Toast notification is fired by AuthContext
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo size="lg" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Create Your Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Join FoodVerse and discover fresh meals from top kitchens
            </p>
          </div>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className={`w-full bg-slate-50 border rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.name ? 'border-rose-400' : 'border-slate-200'
                }`}
              />
              <i className="fa-solid fa-user text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs" aria-hidden="true" />
            </div>
            {errors.name && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className={`w-full bg-slate-50 border rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.email ? 'border-rose-400' : 'border-slate-200'
                }`}
              />
              <i className="fa-solid fa-envelope text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs" aria-hidden="true" />
            </div>
            {errors.email && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone Number *
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className={`w-full bg-slate-50 border rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.phone ? 'border-rose-400' : 'border-slate-200'
                }`}
              />
              <i className="fa-solid fa-phone text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs" aria-hidden="true" />
            </div>
            {errors.phone && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password *
            </label>
            <div className="relative">
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="At least 6 characters"
                className={`w-full bg-slate-50 border rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.password ? 'border-rose-400' : 'border-slate-200'
                }`}
              />
              <i className="fa-solid fa-lock text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs" aria-hidden="true" />
            </div>
            {errors.password && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Re-enter password"
                className={`w-full bg-slate-50 border rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.confirmPassword ? 'border-rose-400' : 'border-slate-200'
                }`}
              />
              <i className="fa-solid fa-lock text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs" aria-hidden="true" />
            </div>
            {errors.confirmPassword && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.confirmPassword}</p>}
          </div>

          <Button
            type="submit"
            size="lg"
            loading={loading}
            icon="fa-solid fa-arrow-right"
            iconPosition="right"
            className="w-full shadow-sm mt-2 bg-orange-500 hover:bg-orange-600 text-white"
          >
            Create FoodVerse Account
          </Button>
        </form>

        {/* Login Prompt */}
        <p className="text-center text-xs text-slate-500 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-orange-600 hover:text-orange-700 underline">
            Sign In Here
          </Link>
        </p>

      </div>
    </div>
  );
};
