import React from 'react';
import { FoodCard } from './FoodCard';
import { FoodCardSkeleton } from '../common/LoadingSkeleton';
import { EmptyState } from '../common/EmptyState';

export const FoodGrid = ({
  foods = [],
  loading = false,
  error = null,
  skeletonCount = 8,
  emptyTitle = "No dishes found",
  emptyDescription = "Try changing your search terms or filters to discover other dishes.",
  onResetFilters
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6">
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <FoodCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (foods.length === 0) {
    return (
      <EmptyState
        type="search"
        title={emptyTitle}
        description={emptyDescription}
        actionText="Reset All Filters"
        onAction={onResetFilters}
        suggestions={["Pizza", "Burger", "Biryani", "Dessert", "Pasta"]}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
};
