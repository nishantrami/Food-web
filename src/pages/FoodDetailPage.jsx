import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Rating } from '../components/common/Rating';
import { FavoriteButton } from '../components/common/FavoriteButton';
import { QuantitySelector } from '../components/common/QuantitySelector';
import { Button } from '../components/common/Button';
import { ErrorState } from '../components/common/ErrorState';
import { FoodCard } from '../components/food/FoodCard';
import { api } from '../services/api';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { formatPrice } from '../utils/formatCurrency';
import { FoodRecipeSection } from '../components/food/FoodRecipeSection';

export const FoodDetailPage = () => {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { error: toastError } = useToast();
  const { addItem } = useCart();
  const { isFoodFavorite, toggleFoodFavorite } = useFavorites();

  const [food, setFood] = useState(null);
  const [similarFoods, setSimilarFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState({});

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      setError(null);
      try {
        const item = await api.getFoodById(foodId);
        setFood(item);

        // Reset selections with first options if any
        const initialCustom = {};
        if (item.customizations && item.customizations.length > 0) {
          item.customizations.forEach(grp => {
            if (grp.options && grp.options.length > 0) {
              initialCustom[grp.name] = grp.options[0];
            }
          });
        }
        setSelectedCustomizations(initialCustom);

        // Fetch other foods from same restaurant or category
        const related = await api.getFoods({ category: item.category });
        setSimilarFoods(related.filter(f => f.id !== item.id).slice(0, 4));
      } catch (err) {
        setError(err.message || "Failed to load dish");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, [foodId]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse space-y-6">
        <div className="w-32 h-6 bg-slate-200 rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-slate-200 rounded-3xl" />
          <div className="space-y-4">
            <div className="w-3/4 h-8 bg-slate-200 rounded-lg" />
            <div className="w-1/2 h-6 bg-slate-200 rounded-md" />
            <div className="w-full h-24 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="max-w-md mx-auto py-20 px-4">
        <ErrorState
          title="Dish Not Found"
          message="We couldn't find this item in our menu. It might have been removed."
          onRetry={() => navigate('/explore')}
        />
      </div>
    );
  }

  const isFavorite = isFoodFavorite(food.id);

  // Calculate unit price with customizations
  let extraCost = 0;
  Object.values(selectedCustomizations).forEach(opt => {
    if (opt && opt.price) extraCost += opt.price;
  });
  const currentUnitPrice = food.price + extraCost;
  const totalPrice = currentUnitPrice * quantity;

  const handleCustomizationSelect = (groupName, option) => {
    setSelectedCustomizations(prev => ({
      ...prev,
      [groupName]: option
    }));
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toastError("Please log in first to add dishes and place orders.");
      navigate('/login', { state: { from: location } });
      return;
    }
    addItem(food, quantity, selectedCustomizations);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toastError("Please log in first to place an order.");
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    addItem(food, quantity, selectedCustomizations);
    navigate('/checkout');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">

      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
        <Link to="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/explore" className="hover:text-slate-600 transition-colors">Menu</Link>
        <span>/</span>
        <Link to={`/explore?category=${food.category}`} className="capitalize hover:text-slate-600 transition-colors">
          {food.category}
        </Link>
        <span>/</span>
        <span className="text-slate-700 font-extrabold truncate max-w-[150px]">{food.name}</span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-square w-full rounded-3xl sm:rounded-4xl overflow-hidden shadow-float bg-slate-100 group">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${food.isVeg ? 'bg-emerald-500 shadow-xs shadow-emerald-400' : 'bg-rose-600 shadow-xs shadow-rose-400'}`} />
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                {food.isVeg ? 'Pure Veg' : 'Non-Veg'}
              </span>
            </div>

            <div className="absolute top-4 right-4">
              <FavoriteButton
                size="md"
                isFavorite={isFavorite}
                onToggle={() => toggleFoodFavorite(food.id, food.name)}
              />
            </div>

            {/* Bottom floating details */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-bold drop-shadow">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl">
                  <i className="fa-solid fa-clock text-amber-300 text-xs" aria-hidden="true" />
                  <span>{food.deliveryTime}</span>
                </span>
                {food.calories && (
                  <span className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl">
                    <i className="fa-solid fa-fire text-rose-400 text-xs" aria-hidden="true" />
                    <span>{food.calories}</span>
                  </span>
                )}
              </div>
              <span className="bg-orange-500 px-3 py-1.5 rounded-xl text-white font-black text-xs uppercase tracking-wider">
                {food.spiceLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Details & Actions */}
        <div className="lg:col-span-6 space-y-6">

          <div>
            <Link
              to={`/restaurants/${food.restaurantId}`}
              className="inline-flex items-center gap-2 text-xs font-black text-orange-600 hover:text-orange-700 uppercase tracking-wider mb-1"
            >
              <i className="fa-solid fa-store text-xs" aria-hidden="true" />
              <span>{food.restaurantName}</span>
            </Link>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {food.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <Rating rating={food.rating} reviewsCount={food.reviews} size="md" />
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs font-bold text-slate-500 capitalize">
                {food.cuisine} Cuisine
              </span>
              <a
                href="#recipe"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-800 text-xs font-black transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-kitchen-set text-xs text-orange-600" aria-hidden="true" />
                <span>View Step-by-Step Recipe</span>
              </a>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-orange-50 border border-orange-100">
            <span className="text-3xl font-black text-slate-900">
              {formatPrice(currentUnitPrice)}
            </span>
            {food.originalPrice && (
              <span className="text-sm text-slate-400 line-through font-bold">
                {formatPrice(food.originalPrice + extraCost)}
              </span>
            )}
            <span className="text-xs font-black text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-md ml-auto">
              Save {Math.round((((food.originalPrice || food.price) - food.price) / (food.originalPrice || food.price)) * 100)}%
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {food.description}
          </p>

          {/* Ingredients */}
          {food.ingredients && food.ingredients.length > 0 && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Ingredients & Fresh Produce
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {food.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold px-3 py-1 rounded-xl bg-slate-100 text-slate-700"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Customization Options */}
          {food.customizations && food.customizations.length > 0 && (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              {food.customizations.map((group, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-black text-slate-700">
                    <span>Choose {group.name}</span>
                    <span className="text-[10px] text-orange-600 uppercase font-black">Required</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {group.options.map((opt, optIdx) => {
                      const isSelected = selectedCustomizations[group.name]?.label === opt.label;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleCustomizationSelect(group.name, opt)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${isSelected
                              ? 'bg-orange-500 text-white border-orange-500 shadow-sm ring-2 ring-orange-200'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                        >
                          <span className="text-xs font-bold truncate">{opt.label}</span>
                          <span className={`text-[10px] font-bold mt-1 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                            {opt.price ? `+₹${opt.price}` : 'Free'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity & Action Buttons */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-slate-700">Select Quantity</span>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity(q => q + 1)}
                onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                variant="outline"
                size="lg"
                icon="fa-solid fa-cart-shopping"
                onClick={handleAddToCart}
                className="w-full"
              >
                Add To Cart ({formatPrice(totalPrice)})
              </Button>
              <Button
                variant="primary"
                size="lg"
                icon="fa-solid fa-bolt"
                onClick={handleBuyNow}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-sm"
              >
                Buy Now
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-2 text-xs text-slate-400 font-semibold">
            <i className="fa-solid fa-shield-halved text-amber-500 text-xs shrink-0" aria-hidden="true" />
            <span>Prepared fresh upon order with verified safety hygiene standards.</span>
          </div>

        </div>
      </div>

      {/* Step-by-Step Culinary Recipe Guide */}
      <FoodRecipeSection food={food} />

      {/* Similar dishes carousel/grid */}
      {similarFoods.length > 0 && (
        <section className="pt-10 border-t border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              You Might Also Crave
            </h2>
            <Link to={`/explore?category=${food.category}`} className="text-xs font-black text-orange-600 hover:text-orange-700 flex items-center gap-1.5">
              <span>View All {food.category}</span>
              <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similarFoods.map(item => (
              <FoodCard key={item.id} food={item} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
