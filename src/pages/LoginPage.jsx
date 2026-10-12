import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { BrandLogo } from '../components/common/BrandLogo';
import { useAuth } from '../hooks/useAuth';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!password) {
      errs.password = "Password is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await login(email, password);
      navigate(from, { replace: true });
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
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Sign in to access your orders, favorites & saved addresses
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <a href="#forgot" className="text-xs font-bold text-slate-500 hover:text-orange-600">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-slate-50 border rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${
                  errors.password ? 'border-rose-400' : 'border-slate-200'
                }`}
              />
              <i className="fa-solid fa-lock text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs" aria-hidden="true" />
            </div>
            {errors.password && <p className="text-xs text-rose-500 mt-1 font-bold">{errors.password}</p>}
          </div>

          <Button
            type="submit"
            size="lg"
            loading={loading}
            icon="fa-solid fa-arrow-right"
            iconPosition="right"
            className="w-full shadow-sm mt-2 bg-orange-500 hover:bg-orange-600 text-white"
          >
            Login to FoodVerse
          </Button>
        </form>

        {/* Footer prompt */}
        <p className="text-center text-xs text-slate-500 font-medium">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-orange-600 hover:text-orange-700 underline">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
};
