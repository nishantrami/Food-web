import React from 'react';

const Shimmer = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200/80 rounded-xl ${className}`} />
);

export const FoodCardSkeleton = () => (
  <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-card flex flex-col h-full">
    <Shimmer className="w-full aspect-video sm:aspect-square rounded-2xl mb-4" />
    <div className="flex items-center justify-between mb-2">
      <Shimmer className="w-20 h-4 rounded-md" />
      <Shimmer className="w-12 h-5 rounded-md" />
    </div>
    <Shimmer className="w-3/4 h-5 rounded-md mb-2" />
    <Shimmer className="w-full h-3 rounded-md mb-1" />
    <Shimmer className="w-2/3 h-3 rounded-md mb-4" />
    <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
      <Shimmer className="w-16 h-6 rounded-md" />
      <Shimmer className="w-24 h-9 rounded-xl" />
    </div>
  </div>
);

export const RestaurantCardSkeleton = () => (
  <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-card flex flex-col">
    <Shimmer className="w-full h-48 rounded-none" />
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-center justify-between mb-2">
        <Shimmer className="w-32 h-6 rounded-md" />
        <Shimmer className="w-14 h-5 rounded-md" />
      </div>
      <Shimmer className="w-48 h-4 rounded-md mb-3" />
      <div className="flex items-center gap-3 mb-4">
        <Shimmer className="w-20 h-4 rounded-md" />
        <Shimmer className="w-20 h-4 rounded-md" />
      </div>
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
        <Shimmer className="w-28 h-4 rounded-md" />
        <Shimmer className="w-24 h-8 rounded-xl" />
      </div>
    </div>
  </div>
);

export const FoodDetailsSkeleton = () => (
  <div className="max-w-6xl mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      <Shimmer className="w-full aspect-square rounded-3xl" />
      <div className="flex flex-col gap-4">
        <Shimmer className="w-24 h-6 rounded-full" />
        <Shimmer className="w-3/4 h-9 rounded-xl" />
        <Shimmer className="w-48 h-5 rounded-md" />
        <Shimmer className="w-32 h-8 rounded-lg mt-2" />
        <Shimmer className="w-full h-20 rounded-xl mt-2" />
        <div className="space-y-2 mt-4">
          <Shimmer className="w-40 h-4 rounded-md" />
          <div className="flex gap-2">
            <Shimmer className="w-20 h-8 rounded-lg" />
            <Shimmer className="w-20 h-8 rounded-lg" />
            <Shimmer className="w-20 h-8 rounded-lg" />
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <Shimmer className="w-32 h-12 rounded-2xl" />
          <Shimmer className="flex-1 h-12 rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
);

export const OrderSkeleton = () => (
  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card space-y-4">
    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
      <div className="space-y-1">
        <Shimmer className="w-28 h-5 rounded-md" />
        <Shimmer className="w-36 h-3 rounded-md" />
      </div>
      <Shimmer className="w-24 h-7 rounded-full" />
    </div>
    <div className="flex items-center gap-4">
      <Shimmer className="w-16 h-16 rounded-2xl shrink-0" />
      <div className="flex-1 space-y-2">
        <Shimmer className="w-40 h-4 rounded-md" />
        <Shimmer className="w-24 h-3 rounded-md" />
      </div>
      <Shimmer className="w-16 h-6 rounded-md" />
    </div>
    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
      <Shimmer className="w-32 h-4 rounded-md" />
      <Shimmer className="w-28 h-9 rounded-xl" />
    </div>
  </div>
);
