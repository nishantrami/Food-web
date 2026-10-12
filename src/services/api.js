import { foods } from '../data/foods';
import { restaurants } from '../data/restaurants';
import { categories } from '../data/categories';
import { sleep, generateOrderId } from '../utils/helpers';

const STORAGE_KEYS = {
  ORDERS: 'foodverse_orders',
  USERS: 'foodverse_users',
  CURRENT_USER: 'foodverse_current_user',
  FAVORITES: 'foodverse_favorites',
  CART: 'foodverse_cart',
  CUSTOM_FOODS: 'foodverse_custom_foods'
};

// Initialise storage if absent
const initLocalStorage = () => {
  // Purge any static demo orders
  try {
    const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!storedOrders) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
    } else {
      const orders = JSON.parse(storedOrders);
      const cleanOrders = orders.filter(o => o.id !== 'FV-1024' && o.id !== 'FV-1018');
      if (cleanOrders.length !== orders.length) {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(cleanOrders));
      }
    }
  } catch {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
  }

  // Purge any static demo users
  try {
    const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!storedUsers) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
    } else {
      const usersList = JSON.parse(storedUsers);
      const cleanUsers = usersList.filter(u => u.id !== 'usr_1' && u.id !== 'usr_2' && u.email !== 'alex@foodverse.com' && u.email !== 'sarah@foodverse.com');
      if (cleanUsers.length !== usersList.length) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(cleanUsers));
      }
    }
  } catch {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }

  // Clean current user session if it was a static demo account
  try {
    const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null');
    if (currentUser?.id === 'usr_1' || currentUser?.id === 'usr_2' || currentUser?.email === 'alex@foodverse.com' || currentUser?.email === 'sarah@foodverse.com') {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  } catch {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify({ foods: [1, 4, 7], restaurants: [1, 2] }));
  }
};

initLocalStorage();

export const api = {
  // Foods
  async getFoods({ category, search, cuisine, isVeg, minRating, maxPrice, sort } = {}) {
    await sleep(250);
    let customFoods = [];
    try {
      customFoods = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_FOODS) || '[]');
    } catch {}
    let result = [...customFoods, ...foods];

    if (category && category !== 'all') {
      result = result.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      result = result.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.restaurantName.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.cuisine.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }

    if (cuisine && cuisine !== 'all') {
      result = result.filter(item => item.cuisine.toLowerCase() === cuisine.toLowerCase());
    }

    if (isVeg !== undefined && isVeg !== null && isVeg !== '') {
      result = result.filter(item => item.isVeg === (isVeg === true || isVeg === 'veg'));
    }

    if (minRating) {
      result = result.filter(item => item.rating >= Number(minRating));
    }

    if (maxPrice) {
      result = result.filter(item => item.price <= Number(maxPrice));
    }

    // Sorting
    if (sort) {
      switch (sort) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'popular':
          result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.reviews - a.reviews);
          break;
        case 'fastest':
          result.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
          break;
        default: // recommended
          result.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
      }
    }

    return result;
  },

  async getFoodById(id) {
    await sleep(200);
    let customFoods = [];
    try {
      customFoods = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_FOODS) || '[]');
    } catch {}
    const all = [...customFoods, ...foods];
    const item = all.find(f => String(f.id) === String(id));
    if (!item) throw new Error("Dish not found");
    return item;
  },

  // Restaurants
  async getRestaurants({ search, cuisine, sort } = {}) {
    await sleep(250);
    let result = [...restaurants];

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      result = result.filter(r => 
        r.name.toLowerCase().includes(q) ||
        r.cuisine.some(c => c.toLowerCase().includes(q)) ||
        r.description.toLowerCase().includes(q)
      );
    }

    if (cuisine && cuisine !== 'all') {
      result = result.filter(r => 
        r.cuisine.some(c => c.toLowerCase() === cuisine.toLowerCase())
      );
    }

    if (sort) {
      switch (sort) {
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'reviews':
          result.sort((a, b) => b.reviewsCount - a.reviewsCount);
          break;
        case 'fastest':
          result.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
          break;
        default:
          result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
      }
    }

    return result;
  },

  async getRestaurantById(id) {
    await sleep(200);
    const restaurant = restaurants.find(r => r.id === Number(id));
    if (!restaurant) throw new Error("Restaurant not found");
    return restaurant;
  },

  async getRestaurantFoods(restaurantId) {
    await sleep(200);
    return foods.filter(f => f.restaurantId === Number(restaurantId));
  },

  // Categories
  async getCategories() {
    await sleep(100);
    return categories;
  },

  // Orders
  async getOrders(userId) {
    await sleep(250);
    try {
      if (!userId) {
        return [];
      }
      const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
      return data.filter(o => o.userId === userId);
    } catch {
      return [];
    }
  },

  async getOrderById(orderId, userId) {
    await sleep(200);
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    const order = data.find(o => o.id === orderId);
    if (!order) throw new Error("Order not found");
    if (userId && order.userId && order.userId !== userId) {
      throw new Error("Access denied: You do not have permission to view this order.");
    }
    return order;
  },

  async createOrder(orderPayload) {
    await sleep(400);
    if (!orderPayload.userId || orderPayload.userId === 'guest') {
      throw new Error("You must be logged in to place an order.");
    }
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    const newOrderId = generateOrderId();
    
    const newOrder = {
      id: newOrderId,
      createdAt: new Date().toISOString(),
      status: "Order Placed",
      estimatedDelivery: "30-40 minutes",
      timeline: [
        { status: "Order Placed", time: "Just now", completed: true, current: true, description: "Your order was placed successfully." },
        { status: "Preparing", time: "Upcoming", completed: false, description: "Kitchen is preparing ingredients." },
        { status: "Out for Delivery", time: "Upcoming", completed: false, description: "Delivery rider assigned." },
        { status: "Delivered", time: "Estimated in 35 mins", completed: false, description: "Doorstep handoff." }
      ],
      ...orderPayload
    };

    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return newOrder;
  },

  // Auth & Profile
  async login(email, password) {
    await sleep(350);
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      throw new Error("No account found with this email. Please register to create an account.");
    }
    if (user.password !== password) {
      throw new Error("Incorrect password. Please try again.");
    }

    const { password: _, ...safeUser } = user;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
    return safeUser;
  },

  async register(userData) {
    await sleep(400);
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const exists = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    
    if (exists) {
      throw new Error("An account with this email already exists. Please login.");
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone || "+91 98765 00000",
      addresses: [
        {
          id: `addr_${Date.now()}`,
          label: "Home",
          street: userData.street || "Main Street",
          city: userData.city || "Mumbai",
          pincode: userData.pincode || "400001",
          isDefault: true
        }
      ]
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    const { password: _, ...safeUser } = newUser;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
    return safeUser;
  },

  async updateProfile(userId, updateData) {
    await sleep(300);
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) throw new Error("User not found");

    users[index] = { ...users[index], ...updateData };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    const { password: _, ...safeUser } = users[index];
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
    return safeUser;
  },

  // Admin Methods
  async getAllOrdersAdmin() {
    await sleep(200);
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    } catch {
      return [];
    }
  },

  async updateOrderStatusAdmin(orderId, newStatus) {
    await sleep(250);
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    const index = data.findIndex(o => o.id === orderId);
    if (index === -1) throw new Error("Order not found");

    const order = data[index];
    const stages = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];
    const targetIdx = stages.indexOf(newStatus);

    let updatedTimeline = (order.timeline || []).map((step, idx) => {
      if (targetIdx !== -1) {
        if (idx < targetIdx) return { ...step, completed: true, current: false };
        if (idx === targetIdx) return { ...step, completed: true, current: true, time: "Just now" };
        return { ...step, completed: false, current: false };
      }
      return step;
    });

    const updated = {
      ...order,
      status: newStatus,
      timeline: updatedTimeline
    };
    data[index] = updated;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(data));
    return updated;
  },

  async getAllUsersAdmin() {
    await sleep(200);
    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      return users.map(({ password: _, ...safe }) => safe);
    } catch {
      return [];
    }
  },

  async addCustomFoodAdmin(foodData) {
    await sleep(250);
    const custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_FOODS) || '[]');
    const newDish = {
      id: Date.now(),
      rating: 5.0,
      reviews: 1,
      popular: true,
      deliveryTime: "25-30 min",
      restaurantId: 1,
      restaurantName: "FoodVerse Kitchen",
      ...foodData
    };
    custom.unshift(newDish);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_FOODS, JSON.stringify(custom));
    return newDish;
  },

  async deleteFoodAdmin(foodId) {
    await sleep(200);
    const custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_FOODS) || '[]');
    const filtered = custom.filter(f => String(f.id) !== String(foodId));
    localStorage.setItem(STORAGE_KEYS.CUSTOM_FOODS, JSON.stringify(filtered));
    return true;
  }
};
