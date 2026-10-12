import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CartProvider } from './context/CartContext';
import { FavoriteProvider } from './context/FavoriteContext';
import { WebsiteLoader } from './components/common/WebsiteLoader';
import { AdminShortcutListener } from './components/common/AdminShortcutListener';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <WebsiteLoader />
      <ToastProvider>
        <AdminAuthProvider>
          <AdminShortcutListener />
          <AuthProvider>
            <CartProvider>
              <FavoriteProvider>
                <AppRoutes />
              </FavoriteProvider>
            </CartProvider>
          </AuthProvider>
        </AdminAuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
