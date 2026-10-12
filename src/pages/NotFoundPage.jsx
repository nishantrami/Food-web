import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-24 h-24 rounded-4xl bg-orange-100/80 border border-orange-200 flex items-center justify-center text-4xl mx-auto shadow-sm text-orange-500">
        <i className="fa-solid fa-burger" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h1 className="text-6xl font-black text-slate-900 tracking-tight">404</h1>
        <h2 className="text-xl sm:text-2xl font-black text-slate-800">
          Oops! This page doesn't exist.
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed font-normal">
          Looks like this recipe wasn't found in our kitchen! Let's get you back to discovering great meals.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link to="/" className="w-full sm:w-auto">
          <Button size="md" icon="fa-solid fa-house" className="w-full sm:w-auto">
            Back to FoodVerse
          </Button>
        </Link>
        <Link to="/explore" className="w-full sm:w-auto">
          <Button variant="outline" size="md" icon="fa-solid fa-utensils" className="w-full sm:w-auto">
            Browse Menu
          </Button>
        </Link>
      </div>
    </div>
  );
};
