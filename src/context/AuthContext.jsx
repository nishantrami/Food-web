import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('foodverse_current_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const { success, error: toastError, info } = useToast();

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('foodverse_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('foodverse_current_user');
    }
  }, [currentUser]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const user = await api.login(email, password);
      setCurrentUser(user);
      success(`Welcome back, ${user.name}!`);
      return user;
    } catch (err) {
      toastError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [success, toastError]);

  const register = useCallback(async (formData) => {
    setLoading(true);
    try {
      const user = await api.register(formData);
      setCurrentUser(user);
      success(`Account created successfully! Welcome to FoodVerse, ${user.name}.`);
      return user;
    } catch (err) {
      toastError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [success, toastError]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    info('You have been logged out.');
  }, [info]);

  const updateProfile = useCallback(async (updatedData) => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const updated = await api.updateProfile(currentUser.id, updatedData);
      setCurrentUser(updated);
      success('Profile updated successfully!');
      return updated;
    } catch (err) {
      toastError(err.message || 'Could not update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser, success, toastError]);

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
