import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import { RestaurantCardSkeleton } from '../common/LoadingSkeleton';
import { EmptyState } from '../common/EmptyState';

export const RestaurantGrid = ({
  restaurants = [],
  loading = false,
  skeletonCount = 6,
  onReset
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <RestaurantCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <EmptyState
        type="restaurants"
        title="No restaurants found"
        description="Try adjusting your cuisine or search query to see other kitchens."
        actionText="Explore All Restaurants"
        onAction={onReset}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};
