import React from 'react';

export const BrandLogo = ({
  size = 'md',
  showText = true,
  light = false,
  className = '',
  animated = false
}) => {
  // Dimensions
  const sizes = {
    sm: { icon: 32, box: 'w-8 h-8', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 40, box: 'w-10 h-10', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 54, box: 'w-14 h-14', text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 72, box: 'w-20 h-20', text: 'text-3xl', sub: 'text-sm' }
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Warm Modern Vector Emblem */}
      <div 
        className={`relative ${currentSize.box} rounded-2xl bg-orange-500 flex items-center justify-center shadow-sm shrink-0 ${
          animated ? 'animate-pulse' : ''
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5"
        >
          {/* Domed Cloche Base */}
          <path
            d="M20 68C20 65.7909 21.7909 64 24 64H76C78.2091 64 80 65.7909 80 68V70C80 71.1046 79.1046 72 78 72H22C20.8954 72 20 71.1046 20 70V68Z"
            fill="white"
          />
          {/* Main Dish Dome Cover */}
          <path
            d="M23 60C23 44 35 32 50 32C65 32 77 44 77 60H23Z"
            fill="white"
          />
          {/* Top Handle Ring */}
          <circle
            cx="50"
            cy="26"
            r="6"
            stroke="white"
            strokeWidth="4"
          />
          {/* Warm Steam / Smile Curve */}
          <path
            d="M40 48C45 52 55 52 60 48"
            stroke="#ea580c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Radiant Sunny Yellow Accent Dot */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-white shadow-xs" />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <span 
            className={`font-black tracking-tight leading-none ${currentSize.text} ${
              light ? 'text-white' : 'text-slate-800'
            }`}
          >
            Food<span className="text-orange-500">Verse</span>
          </span>
          <span 
            className={`font-semibold tracking-wider uppercase mt-1 ${currentSize.sub} ${
              light ? 'text-amber-200' : 'text-slate-400'
            }`}
          >
            Fresh • Simple • Fast
          </span>
        </div>
      )}
    </div>
  );
};
