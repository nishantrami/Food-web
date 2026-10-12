import React from 'react';

/**
 * Reusable Font Awesome Icon Component
 * Accepts icon name with or without 'fa-' prefix, or full class string.
 * Example: <Icon name="utensils" className="text-orange-500" />
 * Example: <Icon name="fa-solid fa-pizza-slice" size="lg" />
 */
export const Icon = ({ 
  name, 
  prefix = 'fa-solid', 
  className = '', 
  spin = false,
  size,
  ...props 
}) => {
  if (!name) return null;

  let fullClass = '';
  if (name.includes('fa-')) {
    // If user passed "fa-solid fa-heart" or "fa-heart"
    fullClass = name.includes('fa-solid') || name.includes('fa-regular') || name.includes('fa-brands')
      ? name
      : `${prefix} ${name}`;
  } else {
    fullClass = `${prefix} fa-${name}`;
  }

  const sizeClass = size ? `fa-${size}` : '';
  const spinClass = spin ? 'fa-spin' : '';

  return (
    <i 
      aria-hidden="true" 
      className={`${fullClass} ${sizeClass} ${spinClass} ${className}`} 
      {...props} 
    />
  );
};

export default Icon;
