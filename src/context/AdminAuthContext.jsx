import React, { createContext, useContext, useState, useCallback } from 'react';
import { ADMIN_CREDENTIALS, ADMIN_STORAGE_KEYS } from '../constants/admin';
import { useToast } from './ToastContext';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const { success, error: toastError, info } = useToast();

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_STORAGE_KEYS.IS_ADMIN) === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEYS.ADMIN_USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const adminLogin = useCallback(async (email, password) => {
    if (
      email.trim().toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const user = {
        name: ADMIN_CREDENTIALS.name,
        email: ADMIN_CREDENTIALS.email,
        role: ADMIN_CREDENTIALS.role
      };
      localStorage.setItem(ADMIN_STORAGE_KEYS.IS_ADMIN, 'true');
      localStorage.setItem(ADMIN_STORAGE_KEYS.ADMIN_USER, JSON.stringify(user));
      setIsAdminAuthenticated(true);
      setAdminUser(user);
      success("Access Granted: Welcome to the Super Admin Console!");
      return user;
    } else {
      toastError("Invalid Admin Email or Password. Access Denied.");
      throw new Error("Invalid admin credentials");
    }
  }, [success, toastError]);

  const adminLogout = useCallback(() => {
    localStorage.removeItem(ADMIN_STORAGE_KEYS.IS_ADMIN);
    localStorage.removeItem(ADMIN_STORAGE_KEYS.ADMIN_USER);
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    info("Admin session terminated. Returned to public view.");
  }, [info]);

  const value = {
    isAdminAuthenticated,
    adminUser,
    adminLogin,
    adminLogout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
