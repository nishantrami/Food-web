import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer tracking-tight';

  const variants = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-xs focus:ring-orange-400 active:scale-[0.98]',
    accent: 'bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold shadow-xs focus:ring-amber-300 active:scale-[0.98]',
    yellow: 'bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-extrabold shadow-xs focus:ring-yellow-300 active:scale-[0.98]',
    cool: 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs focus:ring-orange-500 active:scale-[0.98]',
    secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-2xs focus:ring-slate-200 active:scale-[0.98]',
    outline: 'border-2 border-orange-500 text-orange-600 hover:bg-orange-50 focus:ring-orange-400 active:scale-[0.98]',
    subtle: 'bg-orange-50 hover:bg-orange-100 text-orange-700 focus:ring-orange-200 active:scale-[0.98]',
    ghost: 'hover:bg-slate-100 text-slate-700 focus:ring-slate-200',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs focus:ring-rose-500 active:scale-[0.98]'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2 gap-2 rounded-xl',
    md: 'text-sm px-4.5 py-2.5 gap-2.5 rounded-xl',
    lg: 'text-base px-6 py-3.5 gap-3 rounded-2xl',
    icon: 'p-2.5 rounded-xl'
  };

  const renderIcon = (ic) => {
    if (!ic) return null;
    if (typeof ic === 'string') {
      return <i className={`${ic.includes('fa-') ? ic : `fa-solid fa-${ic}`}`} aria-hidden="true" />;
    }
    const IconComp = ic;
    return <IconComp className="w-4 h-4 shrink-0" />;
  };

  return (
    <motion.button
      whileTap={disabled || loading ? {} : { scale: 0.97 }}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <i className="fa-solid fa-circle-notch fa-spin text-sm shrink-0" aria-hidden="true" />
          <span>Please wait...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && renderIcon(icon)}
          {children}
          {icon && iconPosition === 'right' && renderIcon(icon)}
        </>
      )}
    </motion.button>
  );
};
