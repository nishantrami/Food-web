import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Pages
import { HomePage } from '../pages/HomePage';
import { ExplorePage } from '../pages/ExplorePage';
import { RestaurantsPage } from '../pages/RestaurantsPage';
import { RestaurantDetailPage } from '../pages/RestaurantDetailPage';
import { FoodDetailPage } from '../pages/FoodDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderSuccessPage } from '../pages/OrderSuccessPage';
import { OrdersPage } from '../pages/OrdersPage';
import { OrderDetailPage } from '../pages/OrderDetailPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { ProfilePage } from '../pages/ProfilePage';
import { ContactPage } from '../pages/ContactPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { AdminProtectedRoute } from './AdminProtectedRoute';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public Discovery Routes */}
        <Route index element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="restaurants" element={<RestaurantsPage />} />
        <Route path="restaurants/:restaurantId" element={<RestaurantDetailPage />} />
        <Route path="food/:foodId" element={<FoodDetailPage />} />
        <Route path="contact" element={<ContactPage />} />

        {/* Cart & Checkout */}
        <Route path="cart" element={<CartPage />} />
        <Route 
          path="checkout" 
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="order-success" 
          element={
            <ProtectedRoute>
              <OrderSuccessPage />
            </ProtectedRoute>
          } 
        />

        {/* Orders & Tracking */}
        <Route 
          path="orders" 
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="orders/:orderId" 
          element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          } 
        />

        {/* Favorites */}
        <Route path="favorites" element={<FavoritesPage />} />

        {/* User Authentication & Profile */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Secret Super Admin Console Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route 
        path="/admin" 
        element={
          <AdminProtectedRoute>
            <AdminDashboardPage />
          </AdminProtectedRoute>
        } 
      />
    </Routes>
  );
};
