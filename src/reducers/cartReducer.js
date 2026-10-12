export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREASE_QTY: 'INCREASE_QTY',
  DECREASE_QTY: 'DECREASE_QTY',
  CLEAR_CART: 'CLEAR_CART',
  APPLY_COUPON: 'APPLY_COUPON',
  REMOVE_COUPON: 'REMOVE_COUPON',
  SET_CART: 'SET_CART'
};

export const calculateTotals = (items, appliedCoupon = null) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Delivery Fee: Free for orders >= ₹499, else ₹40
  const deliveryFee = subtotal === 0 ? 0 : (subtotal >= 499 ? 0 : 40);
  
  // Taxes: 5% GST
  const tax = subtotal === 0 ? 0 : Math.round(subtotal * 0.05);

  let discount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.type === 'flat') {
      discount = appliedCoupon.discountAmount;
    } else if (appliedCoupon.type === 'percentage') {
      discount = Math.min(Math.round((subtotal * appliedCoupon.percentage) / 100), appliedCoupon.maxDiscount || 9999);
    }
  }

  // Ensure discount does not exceed subtotal
  discount = Math.min(discount, subtotal);

  const total = subtotal === 0 ? 0 : Math.max(0, subtotal - discount + deliveryFee + tax);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return {
    subtotal,
    deliveryFee,
    tax,
    discount,
    total,
    itemCount
  };
};

export const initialCartState = {
  items: [],
  appliedCoupon: null,
  subtotal: 0,
  deliveryFee: 0,
  tax: 0,
  discount: 0,
  total: 0,
  itemCount: 0
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_CART: {
      const { items = [], appliedCoupon = null } = action.payload || {};
      const totals = calculateTotals(items, appliedCoupon);
      return {
        ...state,
        items,
        appliedCoupon,
        ...totals
      };
    }

    case CART_ACTIONS.ADD_ITEM: {
      const { food, quantity = 1, selectedCustomization = null } = action.payload;
      
      // Calculate item unit price including customization options if any
      let unitPrice = food.price;
      let customizationKey = 'standard';
      let customizationSummary = '';

      if (selectedCustomization && Object.keys(selectedCustomization).length > 0) {
        customizationKey = JSON.stringify(selectedCustomization);
        const parts = [];
        Object.entries(selectedCustomization).forEach(([grp, opt]) => {
          if (opt) {
            unitPrice += (opt.price || 0);
            parts.push(`${opt.label}${opt.price ? ` (+₹${opt.price})` : ''}`);
          }
        });
        customizationSummary = parts.join(', ');
      }

      const cartItemId = `${food.id}_${customizationKey}`;
      const existingIndex = state.items.findIndex(item => item.cartItemId === cartItemId);

      let newItems;
      if (existingIndex > -1) {
        newItems = state.items.map((item, idx) => 
          idx === existingIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem = {
          cartItemId,
          id: food.id,
          name: food.name,
          price: unitPrice,
          basePrice: food.price,
          image: food.image,
          restaurantId: food.restaurantId,
          restaurantName: food.restaurantName,
          isVeg: food.isVeg,
          quantity,
          customization: selectedCustomization,
          customizationSummary
        };
        newItems = [...state.items, newItem];
      }

      const totals = calculateTotals(newItems, state.appliedCoupon);
      return {
        ...state,
        items: newItems,
        ...totals
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter(item => item.cartItemId !== action.payload.cartItemId);
      const totals = calculateTotals(newItems, state.appliedCoupon);
      return {
        ...state,
        items: newItems,
        ...totals
      };
    }

    case CART_ACTIONS.INCREASE_QTY: {
      const newItems = state.items.map(item => 
        item.cartItemId === action.payload.cartItemId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const totals = calculateTotals(newItems, state.appliedCoupon);
      return {
        ...state,
        items: newItems,
        ...totals
      };
    }

    case CART_ACTIONS.DECREASE_QTY: {
      const newItems = state.items
        .map(item => {
          if (item.cartItemId === action.payload.cartItemId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter(item => item.quantity > 0);

      const totals = calculateTotals(newItems, state.appliedCoupon);
      return {
        ...state,
        items: newItems,
        ...totals
      };
    }

    case CART_ACTIONS.APPLY_COUPON: {
      const coupon = action.payload;
      const totals = calculateTotals(state.items, coupon);
      return {
        ...state,
        appliedCoupon: coupon,
        ...totals
      };
    }

    case CART_ACTIONS.REMOVE_COUPON: {
      const totals = calculateTotals(state.items, null);
      return {
        ...state,
        appliedCoupon: null,
        ...totals
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...initialCartState
      };
    }

    default:
      return state;
  }
};
