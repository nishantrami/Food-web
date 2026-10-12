import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrandLogo } from '../../components/common/BrandLogo';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ADMIN_CREDENTIALS } from '../../constants/admin';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both admin email and password.');
      return;
    }

    setLoading(true);
    try {
      await adminLogin(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleFillCredentials = () => {
    setEmail(ADMIN_CREDENTIALS.email);
    setPassword(ADMIN_CREDENTIALS.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#fffcf7] text-slate-800 flex items-center justify-center px-4 py-12 relative overflow-hidden select-none">
      {/* Warm Ambient Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-card relative z-10 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo size="lg" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 text-[11px] font-black uppercase tracking-wider mb-2">
              <i className="fa-solid fa-shield-halved text-xs text-orange-600" aria-hidden="true" />
              <span>Super Admin Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Admin Console Access
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Activated via secret shortcut <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-orange-600 font-bold">Ctrl + F</kbd>
            </p>
          </div>
        </div>

        {/* Credentials Info Helper */}
        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-bold flex items-center gap-1.5">
              <i className="fa-solid fa-key text-amber-500" aria-hidden="true" />
              Static Admin Credentials:
            </span>
            <button
              type="button"
              onClick={handleFillCredentials}
              className="text-[11px] font-black text-orange-600 hover:text-orange-700 underline cursor-pointer"
            >
              Auto-Fill
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">Email</span>
              <span className="truncate block font-bold text-slate-900">{ADMIN_CREDENTIALS.email}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-sans font-bold">Password</span>
              <span className="font-bold text-slate-900">{ADMIN_CREDENTIALS.password}</span>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@foodverse.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                required
              />
              <i className="fa-solid fa-user-shield text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs" aria-hidden="true" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                required
              />
              <i className="fa-solid fa-lock text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs" aria-hidden="true" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                aria-label="Toggle password visibility"
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-sm tracking-wide shadow-xs active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <i className="fa-solid fa-arrow-right-to-bracket text-xs" aria-hidden="true" />
                <span>Enter Admin Console</span>
              </>
            )}
          </button>
        </form>

        {/* Exit link */}
        <div className="text-center pt-1">
          <Link
            to="/"
            className="text-xs text-slate-500 hover:text-slate-700 font-semibold transition-colors inline-flex items-center gap-1.5"
          >
            <i className="fa-solid fa-arrow-left text-[10px]" aria-hidden="true" />
            <span>Return to Customer Storefront</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
