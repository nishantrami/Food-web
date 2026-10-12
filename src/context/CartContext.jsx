import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cartReducer, initialCartState, CART_ACTIONS } from '../reducers/cartReducer';
import { validateCoupon } from '../constants/coupons';
import { useToast } from './ToastContext';
import { useAuth } from '../hooks/useAuth';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { success, error: toastError, info } = useToast();

  const [state, dispatch] = useReducer(cartReducer, initialCartState, () => {
    try {
      const user = JSON.parse(localStorage.getItem('foodverse_current_user') || 'null');
      if (user?.id) {
        const stored = localStorage.getItem(`foodverse_cart_${user.id}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          return {
            ...initialCartState,
            ...parsed
          };
        }
      }
    } catch (e) {
      console.error("Failed to parse cart storage", e);
    }
    return initialCartState;
  });

  const prevUserIdRef = useRef(currentUser?.id);

  // Sync cart when logged in user changes or logs out
  useEffect(() => {
    const currentId = currentUser?.id;
    if (prevUserIdRef.current !== currentId) {
      prevUserIdRef.current = currentId;
      if (currentId) {
        try {
          const stored = localStorage.getItem(`foodverse_cart_${currentId}`);
          if (stored) {
            const parsed = JSON.parse(stored);
            dispatch({
              type: CART_ACTIONS.SET_CART,
              payload: {
                items: parsed.items || [],
                appliedCoupon: parsed.appliedCoupon || null
              }
            });
            return;
          }
        } catch (e) {
          console.error("Failed to parse user cart", e);
        }
        dispatch({
          type: CART_ACTIONS.SET_CART,
          payload: { items: [], appliedCoupon: null }
        });
      } else {
        // User logged out - clear active cart
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
      }
    }
  }, [currentUser?.id]);

  // Save cart changes to user-specific LocalStorage
  useEffect(() => {
    if (currentUser?.id) {
      localStorage.setItem(`foodverse_cart_${currentUser.id}`, JSON.stringify({
        items: state.items,
        appliedCoupon: state.appliedCoupon,
        subtotal: state.subtotal,
        deliveryFee: state.deliveryFee,
        tax: state.tax,
        discount: state.discount,
        total: state.total,
        itemCount: state.itemCount
      }));
    }
  }, [state, currentUser?.id]);

  const addItem = useCallback((food, quantity = 1, selectedCustomization = null) => {
    if (!isAuthenticated || !currentUser) {
      toastError("Please log in first to add dishes and place orders.");
      navigate('/login', { state: { from: location } });
      return false;
    }

    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { food, quantity, selectedCustomization }
    });
    success(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${food.name}" to cart!`);
    return true;
  }, [isAuthenticated, currentUser, toastError, navigate, location, success]);

  const removeItem = useCallback((cartItemId, itemName = 'Item') => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { cartItemId }
    });
    info(`Removed "${itemName}" from cart.`);
  }, [info]);

  const increaseQty = useCallback((cartItemId) => {
    if (!isAuthenticated || !currentUser) {
      toastError("Please log in first to manage your cart.");
      navigate('/login', { state: { from: location } });
      return;
    }

    dispatch({
      type: CART_ACTIONS.INCREASE_QTY,
      payload: { cartItemId }
    });
  }, [isAuthenticated, currentUser, toastError, navigate, location]);

  const decreaseQty = useCallback((cartItemId) => {
    dispatch({
      type: CART_ACTIONS.DECREASE_QTY,
      payload: { cartItemId }
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    if (currentUser?.id) {
      localStorage.removeItem(`foodverse_cart_${currentUser.id}`);
    }
  }, [currentUser?.id]);

  const applyCouponCode = useCallback((couponCode) => {
    const result = validateCoupon(couponCode, state.subtotal);
    if (!result.valid) {
      toastError(result.message);
      return false;
    }
    dispatch({
      type: CART_ACTIONS.APPLY_COUPON,
      payload: result.coupon
    });
    success(result.message);
    return true;
  }, [state.subtotal, success, toastError]);

  const removeCoupon = useCallback(() => {
    dispatch({ type: CART_ACTIONS.REMOVE_COUPON });
    info('Coupon code removed.');
  }, [info]);

  const value = {
    items: state.items,
    appliedCoupon: state.appliedCoupon,
    subtotal: state.subtotal,
    deliveryFee: state.deliveryFee,
    tax: state.tax,
    discount: state.discount,
    total: state.total,
    itemCount: state.itemCount,
    addItem,
    removeItem,
    increaseQty,
    decreaseQty,
    clearCart,
    applyCouponCode,
    removeCoupon
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
